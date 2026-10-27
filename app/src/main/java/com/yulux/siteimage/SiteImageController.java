package com.yulux.siteimage;

import com.yulux.common.ApiResult;
import com.yulux.siteimage.dto.GalleryImageView;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * 站点图片配置（公开读取接口，供 Next.js 前端动态读图）。
 */
@RestController
@RequestMapping("/api")
public class SiteImageController {

    private final SiteImageMapper siteImageMapper;
    private final SiteImageService siteImageService;
    private final ImageUrlResolver imageUrlResolver;

    public SiteImageController(SiteImageMapper siteImageMapper, SiteImageService siteImageService,
                               ImageUrlResolver imageUrlResolver) {
        this.siteImageMapper = siteImageMapper;
        this.siteImageService = siteImageService;
        this.imageUrlResolver = imageUrlResolver;
    }

    /**
     * 返回 imageKey -> url 映射，供前端按需覆盖硬编码图片。
     * 键两种：模块槽位行 groupId::图片路径（前端 SmartImage 传 slot 按同格式解析）、
     * 画廊行 / 旧裸路径（前端直接按 src 兜底解析）。
     * url 经 {@link ImageUrlResolver#resolveForFrontend} 归一化：全部保持相对路径
     * （/images/... 是前端本地资源；/uploads/xxx.webp 即使历史数据里误写了
     * 绝对域名也会自动还原），避免 next/image 因未配置远程域名而报错。
     */
    @GetMapping("/site-images")
    public ApiResult<Map<String, String>> all() {
        Map<String, String> map = new LinkedHashMap<>();
        for (SiteImage img : siteImageMapper.selectList(null)) {
            map.put(img.getImageKey(), imageUrlResolver.resolveForFrontend(img.getUrl()));
        }
        return ApiResult.success(map);
    }

    /**
     * 画廊图集（gallery_order 非空行按序），供 /gallery 页动态渲染。
     * key 为图片位标识（新增图即 /uploads/ 路径），前端 SmartImage 以 key 为 src
     * 查 site-images map 解析当前 url。
     */
    @GetMapping("/gallery-images")
    public ApiResult<List<GalleryImageView>> galleryImages() {
        List<GalleryImageView> list = new ArrayList<>();
        for (SiteImage img : siteImageService.listGallery()) {
            list.add(new GalleryImageView(img.getImageKey(),
                    imageUrlResolver.resolveForFrontend(img.getUrl()),
                    img.getAltText() == null ? "" : img.getAltText()));
        }
        return ApiResult.success(list);
    }
}
