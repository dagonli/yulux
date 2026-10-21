package com.yulux.siteimage;

import com.yulux.common.ApiResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * 站点图片配置（图片配置化地基）。
 * 本期仅提供公开读取接口，前端动态读图与后台编辑留待后续阶段。
 */
@RestController
@RequestMapping("/api")
public class SiteImageController {

    private final SiteImageMapper siteImageMapper;
    private final ImageUrlResolver imageUrlResolver;

    public SiteImageController(SiteImageMapper siteImageMapper, ImageUrlResolver imageUrlResolver) {
        this.siteImageMapper = siteImageMapper;
        this.imageUrlResolver = imageUrlResolver;
    }

    /**
     * 返回 imageKey -> url 映射，供前端按需覆盖硬编码图片。
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
}
