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

    /** 页签视图（/admin/images 顶部按页面导航；cardCount = 该页全部模块组的卡数和） */
    @Value
    public static class PageView {
        String key;
        String title;
        /** 是否当前选中页 */
        boolean active;
        int cardCount;
    }

    @Value
    public static class GroupView {
        /** 锚点 id（= Catalog Group.id 或 "other"） */
        String id;
        String title;
        /** 页面路由（如 "/about"），渲染为组头 URL 提示；null = 不显示 */
        String route;
        String description;
        /** 前端是否已引用（false：模板整组灰显） */
        boolean referenced;
        /** 后管缩略图渲染提示：wide（16:9 cover）/ circle（圆形），对齐前端渲染口径 */
        String preview;
        /** 画廊动态组标记（卡片来自 DB gallery_order，渲染「添加图片」表单） */
        boolean gallery;
        /** 组内卡片（组内顺序 = Catalog 声明顺序） */
        List<CardView> cards;
    }

    @Value
    public static class CardView {
        /** DB 实体（imageKey/url/altText/galleryOrder/updatedAt） */
        SiteImage image;
        /** 元数据（兜底时为合成 Entry，永不为 null，模板免判空） */
        SiteImageCatalog.Entry meta;
        /** ImageUrlResolver.resolve(image.url) 后台预览口径 */
        String displayUrl;
        /** frontend-base-url + meta.frontendPath；可为 null（模板显示「无前端入口」） */
        String frontendPreviewUrl;

        /**
         * 已替换标记：seed 时 url == meta.imageKey（裸路径），上传后变为 /uploads/... 即视为已替换。
         * 槽位行的 image_key 是 groupId::路径，不能与本行 key 比较，须与 meta.imageKey 比。
         */
        public boolean isReplaced() {
            return image.getUrl() != null && !image.getUrl().equals(meta.getImageKey());
        }

        /** 新上传型画廊图（key 即 /uploads/ 路径）：模板显示「上传于」而非「默认图」 */
        public boolean isUploaded() {
            return image.getImageKey() != null && image.getImageKey().startsWith("/uploads/");
        }

        /** 卡片锚点 id（sanitize 后的 imageKey，供上传后 redirect 定位） */
        public String getAnchorId() {
            return SiteImageCatalog.anchorIdOf(image.getImageKey());
        }
    }

    private ImagesPageView() {
    }
}
