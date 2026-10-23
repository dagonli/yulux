package com.yulux.siteimage;

import lombok.Value;

import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * 站点图片位目录：imageKey -> 运营可读元数据的纯代码常量映射（不含数据库状态）。
 *
 * 数据库 site_image 表只管「当前是什么图」（url/updatedAt），本类只管
 * 「这个位置是什么、在前端哪里、谁在共用」（显示名/分组/页面位置/警告/前端路由）。
 *
 * 排序规则：GROUPS 的声明顺序 = 页面组间顺序；ENTRIES 的声明顺序 = 组内顺序。
 * 前端将来新增图片位时：DB 插入新 key 后，未收录的 key 会自动落入「其他」组
 * 并显示原始 key（不影响上传替换），再回到本类补一条 Entry 即可归入正确分组。
 *
 * imageKey 必须与 V2__seed_site_images.sql 及前端 SmartImage/useResolvedImage
 * 引用的路径逐字符一致（含前导 / 与 .webp 后缀）。
 */
public final class SiteImageCatalog {

    /** 未收录 key 的兜底组 id */
    public static final String OTHER_GROUP_ID = "other";

    /** 分组定义（声明顺序即渲染顺序） */
    @Value
    public static class Group {
        String id;
        /** 组标题（人话） */
        String title;
        /** 组说明（渲染在组标题下方） */
        String description;
        /** 前端是否已引用（false = 整组灰显 + 「前端未接入」badge） */
        boolean referenced;
    }

    /** 单个图片位静态元数据（warning / frontendPath 为 null 表示「无」） */
    @Value
    public static class Entry {
        /** 与 DB image_key、前端图片路径完全一致（含前导 /） */
        String imageKey;
        String groupId;
        /** 人话名称（卡片主标题） */
        String displayName;
        /** 页面位置/用途说明 */
        String pageLocation;
        /** 共用/未引用警告文案；null = 无警告 */
        String warning;
        /** 「在前端查看」路由（以 / 开头）；null = 不显示链接 */
        String frontendPath;
    }

    private static final List<Group> GROUPS = Collections.unmodifiableList(Arrays.asList(
            new Group("home-hero",               "首页 · 主视觉",                  "Hero 区全屏背景图", true),
            new Group("home-finder",             "首页 · 产品导航卡",              "首页 Product Finder 四张导航卡", true),
            new Group("home-cta",                "首页 · 底部 CTA",                "首页底部 Call-to-Action 区背景图", true),
            new Group("craft",                   "工艺展示图",                     "六种打灯工艺样图，全站多处共用", true),
            new Group("gallery-about",           "画廊与关于页通用图",             "画廊页分页与关于页共用的通用项目图", true),
            new Group("product-generic",         "产品详情页 · 通用流程图",        "四个产品详情页共用的装箱 / 安装 / FAQ 图", true),
            new Group("quote-factory",           "询价页 · 工厂实拍",              "/get-a-quote 页工厂实拍区块", true),
            new Group("product-better-together", "产品图 · Better Together",       "白色 / 粉色两套变体，详情页切换颜色时成组切换", true),
            new Group("product-good-vibes",      "产品图 · Good Vibes Only",       "白色 / 粉色两套变体，详情页切换颜色时成组切换", true),
            new Group("product-this-must-be",    "产品图 · This Must Be The Place", "白色 / 粉色两套变体，详情页切换颜色时成组切换", true),
            new Group("product-cheers",          "产品图 · Cheers",                "白色 / 粉色两套变体，详情页切换颜色时成组切换", true),
            new Group("unassigned",              "未接入预留位",                   "前端尚未引用的预留图片位，替换后不会出现在站点上", false)
    ));

    private static final List<Entry> ENTRIES = Collections.unmodifiableList(Arrays.asList(
            // —— 首页 · 主视觉 ——
            new Entry("/images/hero-background.webp", "home-hero", "首页主视觉背景",
                    "首页 Hero 区全屏背景（CSS 背景图，标语文字浮于其上）", null, "/"),

            // —— 首页 · 产品导航卡 ——
            new Entry("/images/finder-custom-neon.webp", "home-finder", "导航卡 · Custom Neon",
                    "首页 Product Finder 区第 1 张卡", null, "/"),
            new Entry("/images/finder-neon-collections.webp", "home-finder", "导航卡 · Neon Collections",
                    "首页 Product Finder 区第 2 张卡", null, "/"),
            new Entry("/images/finder-channel-letters.webp", "home-finder", "导航卡 · Channel Letters",
                    "首页 Product Finder 区第 3 张卡", null, "/"),
            new Entry("/images/finder-lightbox.webp", "home-finder", "导航卡 · Lightbox",
                    "首页 Product Finder 区第 4 张卡", null, "/"),

            // —— 首页 · 底部 CTA ——
            new Entry("/images/cta-background.webp", "home-cta", "首页底部 CTA 背景",
                    "首页最末「Ready to Illuminate」区背景（CSS 背景图）", null, "/"),

            // —— 工艺展示图（3 处共用） ——
            new Entry("/images/craft-front-lit.webp", "craft", "工艺图 · 正发光 Front-Lit",
                    "首页工艺区第 1 张",
                    "此图在 3 处共用：首页工艺区、Channel Letters 页工艺说明、同页询价表单，替换后 3 处同时生效", "/"),
            new Entry("/images/craft-side-lit.webp", "craft", "工艺图 · 侧发光 Side-Lit",
                    "首页工艺区第 2 张",
                    "此图在 3 处共用：首页工艺区、Channel Letters 页工艺说明、同页询价表单，替换后 3 处同时生效", "/"),
            new Entry("/images/craft-back-lit.webp", "craft", "工艺图 · 背发光 Back-Lit",
                    "首页工艺区第 3 张",
                    "此图在 3 处共用：首页工艺区、Channel Letters 页工艺说明、同页询价表单，替换后 3 处同时生效", "/"),
            new Entry("/images/craft-jelly-lit.webp", "craft", "工艺图 · 果冻发光 Jelly-Lit",
                    "首页工艺区第 4 张",
                    "此图在 3 处共用：首页工艺区、Channel Letters 页工艺说明、同页询价表单，替换后 3 处同时生效", "/"),
            new Entry("/images/craft-full-lit.webp", "craft", "工艺图 · 全发光 Full-Lit",
                    "首页工艺区第 5 张",
                    "此图在 3 处共用：首页工艺区、Channel Letters 页工艺说明、同页询价表单，替换后 3 处同时生效", "/"),
            new Entry("/images/craft-non-lit.webp", "craft", "工艺图 · 不发光 Non-Lit",
                    "首页工艺区第 6 张",
                    "此图在 3 处共用：首页工艺区、Channel Letters 页工艺说明、同页询价表单，替换后 3 处同时生效", "/"),

            // —— 画廊与关于页通用图（image4/5/6 多处共用） ——
            new Entry("/images/image1.webp", "gallery-about", "画廊图 1",
                    "画廊页第 2 页「办公室前台背光 logo」卡", null, "/gallery?page=2"),
            new Entry("/images/image2.webp", "gallery-about", "画廊图 2",
                    "画廊页第 2 页「婚礼桌面粉色霓虹」卡",
                    "此图被画廊第 2 页的 2 张卡片共用，替换后 2 卡同时变化", "/gallery?page=2"),
            new Entry("/images/image3.webp", "gallery-about", "画廊图 3",
                    "画廊页第 1 页「零售门店正发光字母」卡", null, "/gallery"),
            new Entry("/images/image4.webp", "gallery-about", "画廊图 4",
                    "画廊页第 2 页「办公室品牌霓虹」卡 + 关于页工厂区块",
                    "此图在 2 处共用：画廊第 2 页、关于页工厂区块", "/about"),
            new Entry("/images/image5.webp", "gallery-about", "画廊图 5",
                    "画廊页第 1 页「精品店灯箱」卡 + 第 2 页「酒店入口侧发光字母」卡",
                    "此图在画廊第 1、2 两页各被 1 张卡片使用", "/gallery"),
            new Entry("/images/image6.webp", "gallery-about", "画廊图 6",
                    "画廊页第 2 页「餐厅吧台霓虹」卡 + 关于页理念区块",
                    "此图在 2 处共用：画廊第 2 页、关于页理念区块", "/about"),

            // —— 产品详情页 · 通用流程图（4 个产品页共用） ——
            new Entry("/images/product-whats-in-box.webp", "product-generic", "包装箱清单图",
                    "详情页「What's in the Box」区",
                    "此图在 4 个产品详情页共用，替换后同时生效", "/products/better-together-wedding-neon-sign"),
            new Entry("/images/product-install-step1.webp", "product-generic", "安装步骤图 1 · 开箱",
                    "详情页安装引导第 1 步",
                    "此图在 4 个产品详情页共用，替换后同时生效", "/products/better-together-wedding-neon-sign"),
            new Entry("/images/product-install-step2.webp", "product-generic", "安装步骤图 2 · 挂装",
                    "详情页安装引导第 2 步",
                    "此图在 4 个产品详情页共用，替换后同时生效", "/products/better-together-wedding-neon-sign"),
            new Entry("/images/product-install-step3.webp", "product-generic", "安装步骤图 3 · 通电",
                    "详情页安装引导第 3 步",
                    "此图在 4 个产品详情页共用，替换后同时生效", "/products/better-together-wedding-neon-sign"),
            new Entry("/images/product-faq-image.webp", "product-generic", "FAQ 配图（预留）",
                    "详情页 FAQ 区（预留位）",
                    "前端当前未引用此图，替换暂不生效", null),

            // —— 询价页 · 工厂实拍 ——
            new Entry("/images/quote/factory-2.webp", "quote-factory", "工厂实拍 · 车间",
                    "/get-a-quote 页左栏工厂图网格", null, "/get-a-quote"),
            new Entry("/images/quote/factory-backview.webp", "quote-factory", "工厂实拍 · 背面全景",
                    "/get-a-quote 页左栏工厂图网格", null, "/get-a-quote"),
            new Entry("/images/quote/project-1.webp", "quote-factory", "工厂实拍 · 完工项目",
                    "/get-a-quote 页左栏底部宽幅图", null, "/get-a-quote"),

            // —— 产品图 · Better Together（main 图 3 处共用） ——
            new Entry("/images/products/better-together-white-main.webp", "product-better-together", "主图（白色）",
                    "详情页首屏主图",
                    "主图在 3 处共用：产品详情页、成品集合页 /shop-neon、订单请求页 /order-request",
                    "/products/better-together-wedding-neon-sign"),
            new Entry("/images/products/better-together-white-wedding.webp", "product-better-together", "婚礼场景（白色）",
                    "详情页场景画廊", null, "/products/better-together-wedding-neon-sign"),
            new Entry("/images/products/better-together-white-bedroom.webp", "product-better-together", "卧室场景（白色）",
                    "详情页场景画廊", null, "/products/better-together-wedding-neon-sign"),
            new Entry("/images/products/better-together-white-day-night.webp", "product-better-together", "日夜对比（白色）",
                    "详情页场景画廊", null, "/products/better-together-wedding-neon-sign"),
            new Entry("/images/products/better-together-pink-main.webp", "product-better-together", "主图（粉色）",
                    "详情页粉色变体首屏主图",
                    "主图在 3 处共用：产品详情页变体、成品集合页 /shop-neon、订单请求页 /order-request",
                    "/products/better-together-wedding-neon-sign"),
            new Entry("/images/products/better-together-pink-wedding.webp", "product-better-together", "婚礼场景（粉色）",
                    "详情页粉色变体画廊", null, "/products/better-together-wedding-neon-sign"),
            new Entry("/images/products/better-together-pink-bedroom.webp", "product-better-together", "卧室场景（粉色）",
                    "详情页粉色变体画廊", null, "/products/better-together-wedding-neon-sign"),
            new Entry("/images/products/better-together-pink-day-night.webp", "product-better-together", "日夜对比（粉色）",
                    "详情页粉色变体画廊", null, "/products/better-together-wedding-neon-sign"),

            // —— 产品图 · Good Vibes Only ——
            new Entry("/images/products/good-vibes-white-main.webp", "product-good-vibes", "主图（白色）",
                    "详情页首屏主图",
                    "主图在 3 处共用：产品详情页、成品集合页 /shop-neon、订单请求页 /order-request",
                    "/products/good-vibes-only-neon-sign"),
            new Entry("/images/products/good-vibes-white-bedroom.webp", "product-good-vibes", "卧室场景（白色）",
                    "详情页场景画廊", null, "/products/good-vibes-only-neon-sign"),
            new Entry("/images/products/good-vibes-white-studio.webp", "product-good-vibes", "工作室场景（白色）",
                    "详情页场景画廊", null, "/products/good-vibes-only-neon-sign"),
            new Entry("/images/products/good-vibes-white-day-night.webp", "product-good-vibes", "日夜对比（白色）",
                    "详情页场景画廊", null, "/products/good-vibes-only-neon-sign"),
            new Entry("/images/products/good-vibes-pink-main.webp", "product-good-vibes", "主图（粉色）",
                    "详情页粉色变体首屏主图",
                    "主图在 3 处共用：产品详情页变体、成品集合页 /shop-neon、订单请求页 /order-request",
                    "/products/good-vibes-only-neon-sign"),
            new Entry("/images/products/good-vibes-pink-bedroom.webp", "product-good-vibes", "卧室场景（粉色）",
                    "详情页粉色变体画廊", null, "/products/good-vibes-only-neon-sign"),
            new Entry("/images/products/good-vibes-pink-studio.webp", "product-good-vibes", "工作室场景（粉色）",
                    "详情页粉色变体画廊", null, "/products/good-vibes-only-neon-sign"),
            new Entry("/images/products/good-vibes-pink-day-night.webp", "product-good-vibes", "日夜对比（粉色）",
                    "详情页粉色变体画廊", null, "/products/good-vibes-only-neon-sign"),

            // —— 产品图 · This Must Be The Place ——
            new Entry("/images/products/this-must-be-white-main.webp", "product-this-must-be", "主图（白色）",
                    "详情页首屏主图",
                    "主图在 3 处共用：产品详情页、成品集合页 /shop-neon、订单请求页 /order-request",
                    "/products/this-must-be-the-place-neon-sign"),
            new Entry("/images/products/this-must-be-white-living-room.webp", "product-this-must-be", "客厅场景（白色）",
                    "详情页场景画廊", null, "/products/this-must-be-the-place-neon-sign"),
            new Entry("/images/products/this-must-be-white-day-night.webp", "product-this-must-be", "日夜对比（白色）",
                    "详情页场景画廊", null, "/products/this-must-be-the-place-neon-sign"),
            new Entry("/images/products/this-must-be-pink-main.webp", "product-this-must-be", "主图（粉色）",
                    "详情页粉色变体首屏主图",
                    "主图在 3 处共用：产品详情页变体、成品集合页 /shop-neon、订单请求页 /order-request",
                    "/products/this-must-be-the-place-neon-sign"),
            new Entry("/images/products/this-must-be-pink-living-room.webp", "product-this-must-be", "客厅场景（粉色）",
                    "详情页粉色变体画廊", null, "/products/this-must-be-the-place-neon-sign"),
            new Entry("/images/products/this-must-be-pink-day-night.webp", "product-this-must-be", "日夜对比（粉色）",
                    "详情页粉色变体画廊", null, "/products/this-must-be-the-place-neon-sign"),

            // —— 产品图 · Cheers ——
            new Entry("/images/products/cheers-white-main.webp", "product-cheers", "主图（白色）",
                    "详情页首屏主图",
                    "主图在 3 处共用：产品详情页、成品集合页 /shop-neon、订单请求页 /order-request",
                    "/products/cheers-neon-bar-sign"),
            new Entry("/images/products/cheers-white-bar.webp", "product-cheers", "吧台场景（白色）",
                    "详情页场景画廊", null, "/products/cheers-neon-bar-sign"),
            new Entry("/images/products/cheers-white-day-night.webp", "product-cheers", "日夜对比（白色）",
                    "详情页场景画廊", null, "/products/cheers-neon-bar-sign"),
            new Entry("/images/products/cheers-pink-main.webp", "product-cheers", "主图（粉色）",
                    "详情页粉色变体首屏主图",
                    "主图在 3 处共用：产品详情页变体、成品集合页 /shop-neon、订单请求页 /order-request",
                    "/products/cheers-neon-bar-sign"),
            new Entry("/images/products/cheers-pink-bar.webp", "product-cheers", "吧台场景（粉色）",
                    "详情页粉色变体画廊", null, "/products/cheers-neon-bar-sign"),
            new Entry("/images/products/cheers-pink-day-night.webp", "product-cheers", "日夜对比（粉色）",
                    "详情页粉色变体画廊", null, "/products/cheers-neon-bar-sign"),

            // —— 未接入预留位（前端未引用，替换不生效） ——
            new Entry("/images/trust/badge-design.webp", "unassigned", "预留 · 设计保障徽章",
                    "前端当前未引用（预留位）", "前端未引用，替换不生效", null),
            new Entry("/images/trust/badge-engineering.webp", "unassigned", "预留 · 工程保障徽章",
                    "前端当前未引用（预留位）", "前端未引用，替换不生效", null),
            new Entry("/images/trust/badge-quote.webp", "unassigned", "预留 · 报价保障徽章",
                    "前端当前未引用（预留位）", "前端未引用，替换不生效", null),
            new Entry("/images/trust/badge-revisions.webp", "unassigned", "预留 · 改稿保障徽章",
                    "前端当前未引用（预留位）", "前端未引用，替换不生效", null),
            new Entry("/images/trust/badge-shipping.webp", "unassigned", "预留 · 物流保障徽章",
                    "前端当前未引用（预留位）", "前端未引用，替换不生效", null),
            new Entry("/images/trust/badge-warranty.webp", "unassigned", "预留 · 质保徽章",
                    "前端当前未引用（预留位）", "前端未引用，替换不生效", null)
    ));

    private static final Map<String, Entry> BY_KEY;

    static {
        Map<String, Entry> map = new LinkedHashMap<>();
        for (Entry e : ENTRIES) {
            map.put(e.getImageKey(), e);
        }
        BY_KEY = Collections.unmodifiableMap(map);
    }

    private SiteImageCatalog() {
    }

    /** 全部分组（组间顺序 = 声明顺序） */
    public static List<Group> groups() {
        return GROUPS;
    }

    /** key 对应元数据；未收录返回 null（由调用方兜底成合成 Entry） */
    public static Entry byKey(String imageKey) {
        return imageKey == null ? null : BY_KEY.get(imageKey);
    }

    /** 卡片锚点 id："/images/quote/factory-2.webp" -> "img-images-quote-factory-2-webp" */
    public static String anchorIdOf(String imageKey) {
        if (imageKey == null) {
            return "img";
        }
        return "img-" + imageKey.replaceAll("[^A-Za-z0-9]+", "-")
                .replaceAll("(^-+|-+$)", "");
    }
}
