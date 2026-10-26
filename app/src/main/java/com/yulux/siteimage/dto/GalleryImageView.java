package com.yulux.siteimage.dto;

import lombok.Value;

/**
 * /api/gallery-images 响应项：/gallery 画廊页动态图集（gallery_order 非空行按序）。
 */
@Value
public class GalleryImageView {
    /** 图片位标识（前端 SmartImage 以此为 src 查 site-images map 解析当前 url） */
    String key;
    /** resolveForFrontend 归一化后的相对路径 */
    String url;
    /** 替代文本；无则为空串 */
    String alt;
}
