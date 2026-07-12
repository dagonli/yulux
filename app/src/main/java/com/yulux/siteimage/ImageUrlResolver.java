package com.yulux.siteimage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

/**
 * 将数据库中的图片 url 解析为后台/浏览器可访问的完整地址。
 * 相对路径（/images/...）指向前端站点静态资源；绝对路径（上传后）原样返回。
 */
@Component
public class ImageUrlResolver {

    @Value("${yulux.frontend-base-url}")
    private String frontendBaseUrl;

    public String resolve(String url) {
        if (!StringUtils.hasText(url)) {
            return url;
        }
        if (url.startsWith("http://") || url.startsWith("https://")) {
            return url;
        }
        String base = frontendBaseUrl.endsWith("/")
                ? frontendBaseUrl.substring(0, frontendBaseUrl.length() - 1)
                : frontendBaseUrl;
        return url.startsWith("/") ? base + url : base + "/" + url;
    }
}
