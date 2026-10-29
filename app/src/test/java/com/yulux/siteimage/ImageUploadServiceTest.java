package com.yulux.siteimage;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.util.ReflectionTestUtils;

import javax.imageio.ImageIO;
import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.nio.file.Path;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * ImageUploadService 转码不变量：带透明的图上传后透明度必须保留（VP8L 无损 + alpha）；
 * 不透明图维持 RGB 有损路径且不凭空带 alpha；超宽图按 MAX_WIDTH 缩放。
 */
class ImageUploadServiceTest {

    @TempDir
    Path tempDir;

    private ImageUploadService newService() {
        ImageUploadService service = new ImageUploadService();
        ReflectionTestUtils.setField(service, "uploadDir", tempDir.toString());
        return service;
    }

    private static MockMultipartFile pngOf(BufferedImage image) throws Exception {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        ImageIO.write(image, "png", bos);
        return new MockMultipartFile("file", "test.png", "image/png", bos.toByteArray());
    }

    @Test
    void alphaIsPreservedForTransparentImage() throws Exception {
        // 200×150 ARGB：整幅红色，左上角一枚全透明像素
        BufferedImage src = new BufferedImage(200, 150, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g = src.createGraphics();
        g.setColor(Color.RED);
        g.fillRect(0, 0, 200, 150);
        g.dispose();
        src.setRGB(0, 0, 0x00000000);

        String url = newService().storeAsWebp("neon-logo-advantage::/images/icons/yulux_icon_quality.png", pngOf(src));

        assertThat(url).startsWith("/uploads/").endsWith(".webp");
        BufferedImage out = ImageIO.read(tempDir.resolve(url.substring("/uploads/".length())).toFile());
        // WebPReader 仅对含 alpha 的文件返回 32 位 ColorModel（hasAlpha 才为真，断言有意义）
        assertThat(out.getColorModel().hasAlpha()).as("透明通道应保留").isTrue();
        assertThat(out.getRGB(0, 0) >>> 24).as("左上角应保持全透明").isEqualTo(0);
        assertThat(out.getRGB(150, 75) >>> 24).as("不透明区域应保持不透明").isEqualTo(255);
    }

    @Test
    void opaqueImageStaysRgbAndIsDownsized() throws Exception {
        // 3000 宽的不透明图：应缩到 MAX_WIDTH=2000，且不带 alpha（走 RGB 有损路径）
        BufferedImage src = new BufferedImage(3000, 1000, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = src.createGraphics();
        g.setColor(Color.BLUE);
        g.fillRect(0, 0, 3000, 1000);
        g.dispose();

        String url = newService().storeAsWebp("neon-logo-material::/images/icons/yulux_icon_neon_flex.png", pngOf(src));

        BufferedImage out = ImageIO.read(tempDir.resolve(url.substring("/uploads/".length())).toFile());
        assertThat(out.getWidth()).isEqualTo(2000);
        assertThat(out.getHeight()).isEqualTo(667);
        assertThat(out.getColorModel().hasAlpha()).as("不透明图不应带 alpha 通道").isFalse();
    }
}
