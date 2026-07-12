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

    public SiteImageController(SiteImageMapper siteImageMapper) {
        this.siteImageMapper = siteImageMapper;
    }

    /**
     * 返回 imageKey -> url 映射，供前端按需覆盖硬编码图片
     */
    @GetMapping("/site-images")
    public ApiResult<Map<String, String>> all() {
        Map<String, String> map = new LinkedHashMap<>();
        for (SiteImage img : siteImageMapper.selectList(null)) {
            map.put(img.getImageKey(), img.getUrl());
        }
        return ApiResult.success(map);
    }
}
