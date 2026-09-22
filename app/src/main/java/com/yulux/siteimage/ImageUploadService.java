package com.yulux.siteimage;

import com.luciad.imageio.webp.WebPWriteParam;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Iterator;

/**
 * 图片上传处理：统一转 WebP、限制最大宽度、存本地磁盘
 */
@Service
public class ImageUploadService {

    private static final int MAX_WIDTH = 2000;
    private static final float WEBP_QUALITY = 0.82f;

    @Value("${yulux.upload-dir}")
    private String uploadDir;

    /**
     * 保存上传图片，转 WebP 后落盘，返回 /uploads/xxx.webp 相对路径。
     * 不在此处拼接域名：上传图片始终由本服务的 /uploads/** 静态资源提供，
     * 无论前台站点部署在哪个域名，都通过 Next.js rewrites 代理到本服务；
     * 后台预览页也和本服务同源。写成绝对地址反而会把当时的访问域名
     * （如本地开发的 http://localhost:8080）硬编码进数据库，一旦部署环境/域名变化
     * 或换机器访问就会失效。
     */
    public String storeAsWebp(String imageKey, MultipartFile file) throws IOException {
        BufferedImage source = ImageIO.read(new ByteArrayInputStream(file.getBytes()));
        if (source == null) {
            throw new IllegalArgumentException("Unsupported or invalid image file");
        }

        BufferedImage resized = resizeIfNeeded(source);
        BufferedImage rgb = toRgb(resized);

        Path dir = Paths.get(uploadDir);
        Files.createDirectories(dir);

        String filename = sanitize(imageKey) + "-" + System.currentTimeMillis() + ".webp";
        File outFile = dir.resolve(filename).toFile();

        writeWebp(rgb, outFile);

        return "/uploads/" + filename;
    }

    private BufferedImage resizeIfNeeded(BufferedImage src) {
        int width = src.getWidth();
        if (width <= MAX_WIDTH) {
            return src;
        }
        int height = (int) Math.round((double) src.getHeight() * MAX_WIDTH / width);
        BufferedImage dst = new BufferedImage(MAX_WIDTH, height, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g = dst.createGraphics();
        g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        g.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        g.drawImage(src, 0, 0, MAX_WIDTH, height, null);
        g.dispose();
        return dst;
    }

    private BufferedImage toRgb(BufferedImage src) {
        if (src.getType() == BufferedImage.TYPE_INT_RGB) {
            return src;
        }
        BufferedImage rgb = new BufferedImage(src.getWidth(), src.getHeight(), BufferedImage.TYPE_INT_RGB);
        Graphics2D g = rgb.createGraphics();
        g.setColor(java.awt.Color.WHITE);
        g.fillRect(0, 0, src.getWidth(), src.getHeight());
        g.drawImage(src, 0, 0, null);
        g.dispose();
        return rgb;
    }

    private void writeWebp(BufferedImage image, File outFile) throws IOException {
        Iterator<ImageWriter> writers = ImageIO.getImageWritersByMIMEType("image/webp");
        if (!writers.hasNext()) {
            throw new IllegalStateException("No WebP ImageWriter available");
        }
        ImageWriter writer = writers.next();
        WebPWriteParam param = new WebPWriteParam(writer.getLocale());
        param.setCompressionMode(WebPWriteParam.MODE_EXPLICIT);
        param.setCompressionType(param.getCompressionTypes()[WebPWriteParam.LOSSY_COMPRESSION]);
        param.setCompressionQuality(WEBP_QUALITY);

        try (ImageOutputStream ios = ImageIO.createImageOutputStream(outFile)) {
            writer.setOutput(ios);
            writer.write(null, new IIOImage(image, null, null), param);
        } finally {
            writer.dispose();
        }
    }

    private String sanitize(String key) {
        if (key == null || key.isEmpty()) {
            return "image";
        }
        return key.replaceAll("[^a-zA-Z0-9._-]", "-");
    }
}
