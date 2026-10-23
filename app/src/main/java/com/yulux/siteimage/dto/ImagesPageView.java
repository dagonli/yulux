package com.yulux.siteimage.dto;

import com.yulux.siteimage.SiteImage;
import com.yulux.siteimage.SiteImageCatalog;
import lombok.Value;

import java.util.List;

/**
 * /admin/images 页面的分组视图模型（渲染专用，无业务逻辑）。
 * 由 AdminViewController 将 DB 状态（SiteImage）与 SiteImageCatalog 元数据合并而成。
 */
public final class ImagesPageView {

    @Value
    public static class GroupView {
        /** 锚点 id（= Catalog Group.id 或 "other"） */
        String id;
        String title;
        String description;
        /** 前端是否已引用（false：模板整组灰显） */
        boolean referenced;
        /** 组内卡片（组内顺序 = Catalog 声明顺序） */
        List<CardView> cards;
    }

    @Value
    public static class CardView {
        /** DB 实体（imageKey/url/altText/updatedAt） */
        SiteImage image;
        /** 元数据（兜底时为合成 Entry，永不为 null，模板免判空） */
        SiteImageCatalog.Entry meta;
        /** ImageUrlResolver.resolve(image.url) 后台预览口径 */
        String displayUrl;
        /** frontend-base-url + meta.frontendPath；可为 null（模板显示「无前端入口」） */
        String frontendPreviewUrl;

        /** 已替换标记：seed 时 url == imageKey，上传后变为 /uploads/... 即视为已替换 */
        public boolean isReplaced() {
            return image.getUrl() != null && !image.getUrl().equals(image.getImageKey());
        }

        /** 卡片锚点 id（sanitize 后的 imageKey，供上传后 redirect 定位） */
        public String getAnchorId() {
            return SiteImageCatalog.anchorIdOf(image.getImageKey());
        }
    }

    private ImagesPageView() {
    }
}
