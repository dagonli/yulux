package com.yulux.siteimage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

/**
 * 将数据库中的图片 url 解析为浏览器可访问的地址。
 *
 * - /uploads/...（后台上传的图片，由本服务的 /uploads/** 静态资源提供）：
 *   始终返回相对路径。后台预览页与本服务同源，可直接用相对路径加载；
 *   前台站点则通过 Next.js rewrites 把 /uploads/** 代理到本服务，同样无需绝对地址。
 *   如果历史数据里已经把域名拼进了 url（例如误配置时写成
 *   http://localhost:8080/uploads/xxx.webp），这里会自动截断还原成相对路径，
 *   起到自愈效果，不需要手动改库。
 * - /images/...（前台 Next.js public 目录下的默认图）：仅在后台预览页里需要
 *   拼上 frontend-base-url，因为后台页面本身跑在后端域名下，而这些默认图
 *   实际存放在前端站点。
 * - 其它已经是完整 http(s) 地址的（如外链 CDN 图）：原样返回。
 */
@Component
public class ImageUrlResolver {

    private static final String UPLOADS_MARKER = "/uploads/";

    @Value("${yulux.frontend-base-url}")
    private String frontendBaseUrl;

    public String resolve(String url) {
        if (!StringUtils.hasText(url)) {
            return url;
        }

        // 历史数据可能被误写成 http://<某个域名>/uploads/xxx.webp，
        // 统一还原成相对路径，避免把当时的域名/端口硬编码进页面。
        int uploadsIdx = url.indexOf(UPLOADS_MARKER);
        if (uploadsIdx >= 0) {
            return url.substring(uploadsIdx);
        }

        if (url.startsWith("http://") || url.startsWith("https://")) {
            return url;
        }

        // 本地开发或未配置前端域名时，返回相对路径，让浏览器根据当前 host 加载
        if (!StringUtils.hasText(frontendBaseUrl) || frontendBaseUrl.contains("localhost")) {
            return url.startsWith("/") ? url : "/" + url;
        }
        String base = frontendBaseUrl.endsWith("/")
                ? frontendBaseUrl.substring(0, frontendBaseUrl.length() - 1)
                : frontendBaseUrl;
        return url.startsWith("/") ? base + url : base + "/" + url;
    }
}
