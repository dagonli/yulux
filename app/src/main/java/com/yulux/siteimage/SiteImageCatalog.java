package com.yulux.siteimage;

import lombok.Value;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * 站点图片位目录：imageKey -> 运营可读元数据的纯代码常量映射（不含数据库状态）。
 *
 * 数据库 site_image 表只管「当前是什么图」（url/altText/galleryOrder/updatedAt），
 * 本类只管「这个位置是什么、在前端哪里、谁在共用」（显示名/页面路由/页面位置/警告/前端路径）。
 *
 * 分组规则：一个 Group = 一个「页面 + 模块」（title/route 描述页面与模块）。
 * 排序规则：GROUPS 的声明顺序 = 组间顺序；ENTRIES 的声明顺序 = 组内顺序
 * （buildGroups 按 entries() 遍历，声明顺序即渲染顺序）。
 *
 * 跨页面共用的图：在涉及的每个组各有一条 Entry（同 key 多条），任一处上传替换全站生效，
 * warning 列出全部共用位置；同一页面内多模块共用同一张图只保留一条 Entry，
 * pageLocation 列出多处。
 *
 * 画廊组（GALLERY_GROUP_ID）特殊：卡片不来自 ENTRIES，由 AdminViewController 从
 * DB 的 gallery_order 非空行动态生成（支持添加/移除）。
 *
 * imageKey 必须与迁移脚本（V2/V5）及前端 SmartImage/useResolvedImage 引用的路径
 * 逐字符一致（含前导 / 与 .webp/.png/.jpg 后缀）。
 */
public final class SiteImageCatalog {

    /** 未收录 key 的兜底组 id */
    public static final String OTHER_GROUP_ID = "other";

    /** 画廊动态组 id（卡片由 DB gallery_order 非空行生成，无静态 Entry） */
    public static final String GALLERY_GROUP_ID = "gallery";

    /** 分组定义（声明顺序即渲染顺序） */
    @Value
    public static class Group {
        String id;
        /** 组标题（人话：「页面 · 模块」） */
        String title;
        /** 页面路由（如 "/about"），渲染为组头 URL 提示；null = 不显示（预留组） */
        String route;
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

    // ===== 共用警告文案（避免 118 条里重复长句） =====

    private static final String W_CRAFT =
            "此图跨页面共用：首页工艺区 + /channel-letters-logos 页（工艺卡、询价表单技术选择器 2 处），替换后全部同时生效";
    private static final String W_CRAFT_CL =
            "此图跨页面共用：本页 2 处（Craftsmanship Lab 工艺卡、询价表单技术选择器）+ 首页工艺区，替换后全部同时生效";
    private static final String W_PROJ =
            "此图与 /gallery 画廊页共用，替换后两处同时生效；在画廊组「移除」仅退出画廊页，不影响首页";
    private static final String W_ABOUT_GALLERY =
            "此图与 /gallery 画廊页共用，替换后两处同时生效；在画廊组「移除」仅退出画廊页，不影响本页";
    private static final String W_ICON =
            "此图标跨 3 页共用：首页、/custom-neon-signs、/custom-neon-logo 的优势区，替换后 3 处同时生效";
    private static final String W_MAIN_WHITE =
            "主图跨 3 处共用：产品详情页首屏、/shop-neon 商品网格、/order-request 订单摘要（仅 ?product= 参数时显示），替换后同时生效";
    private static final String W_MAIN_PINK =
            "粉色主图跨 2 处共用：产品详情页粉色变体首屏、/shop-neon 网格变体切换，替换后同时生效（订单摘要只用白色主图）";
    private static final String W_GENERIC =
            "此图在 4 个产品详情页共用（What's in the Box / 安装引导区），替换后同时生效";
    private static final String W_MACRO =
            "此图跨页面共用：/channel-letters-logos 与 /custom-lightbox-signs 的材质规格区，替换后两处同时生效";
    private static final String W_MACRO_LB =
            "此图跨页面共用：/custom-lightbox-signs 主图轮播 + 材质规格区（本页 2 处）与 /channel-letters-logos 材质规格区，替换后全部同时生效";
    private static final String W_FRAME_CL =
            "此图跨页面共用：/channel-letters-logos 本页 3 处（Get a Quote 左图、材质规格第 4 卡、物流安装第 1 卡）"
                    + " + /custom-lightbox-signs（主图轮播第 1 张、材质规格第 4 卡），替换后全部同时生效";
    private static final String W_FRAME_LB =
            "此图跨页面共用：/custom-lightbox-signs 本页 2 处（主图轮播第 1 张、材质规格第 4 卡）"
                    + " + /channel-letters-logos 3 处（Get a Quote 左图、材质规格、物流安装），替换后全部同时生效";
    private static final String W_MAT =
            "此图跨页面共用：/custom-neon-signs 与 /custom-neon-logo 的 Material & Quality 区，替换后两处同时生效";

    private static final List<Group> GROUPS = Collections.unmodifiableList(Arrays.asList(
            new Group("home-hero",                     "首页 · 主视觉",     "/", "Hero 区全屏背景图", true),
            new Group("home-finder",                   "首页 · 产品导航卡", "/", "首页 Product Finder 四张导航卡", true),
            new Group("home-craft",                    "首页 · 工艺展示",   "/", "六种打灯工艺样图（与商业标识页共用）", true),
            new Group("home-projects",                 "首页 · 真实项目",   "/", "Real-World Projects 区 6 张实拍（与画廊页共用）", true),
            new Group("home-advantage",                "首页 · 优势图标",   "/", "Why Industry Leaders Choose Yulux 区 4 枚图标（3 页共用）", true),
            new Group("home-cta",                      "首页 · 底部 CTA",   "/", "首页底部 Call-to-Action 区背景图", true),
            new Group(GALLERY_GROUP_ID,                "画廊页 · 画廊图集", "/gallery",
                    "画廊页全部展示图（动态组）：支持添加/移除，不做排序、新图追加末尾；移除仅退出画廊页，不影响首页/关于页等共用位置", true),
            new Group("about-workbench",               "关于页 · 工厂区块", "/about", "From Our Workbench to Your Facade 区块配图", true),
            new Group("about-standard",                "关于页 · 理念区块", "/about", "The Custom-Built Standard 区块配图", true),
            new Group("shop-neon",                     "成品集合页 · 商品网格", "/shop-neon", "/shop-neon 商品网格 4 款 × 白粉两变体主图", true),
            new Group("product-better-together",       "产品详情页 · Better Together 图册",
                    "/products/better-together-wedding-neon-sign", "白/粉两套变体，详情页切换颜色时成组切换", true),
            new Group("product-better-together-generic", "产品详情页 · Better Together 通用流程图",
                    "/products/better-together-wedding-neon-sign", "4 个详情页共用的装箱/安装图", true),
            new Group("product-good-vibes",            "产品详情页 · Good Vibes Only 图册",
                    "/products/good-vibes-only-neon-sign", "白/粉两套变体，详情页切换颜色时成组切换", true),
            new Group("product-good-vibes-generic",    "产品详情页 · Good Vibes Only 通用流程图",
                    "/products/good-vibes-only-neon-sign", "4 个详情页共用的装箱/安装图", true),
            new Group("product-this-must-be",          "产品详情页 · This Must Be The Place 图册",
                    "/products/this-must-be-the-place-neon-sign", "白/粉两套变体，详情页切换颜色时成组切换", true),
            new Group("product-this-must-be-generic",  "产品详情页 · This Must Be The Place 通用流程图",
                    "/products/this-must-be-the-place-neon-sign", "4 个详情页共用的装箱/安装图", true),
            new Group("product-cheers",                "产品详情页 · Cheers 图册",
                    "/products/cheers-neon-bar-sign", "白/粉两套变体，详情页切换颜色时成组切换", true),
            new Group("product-cheers-generic",        "产品详情页 · Cheers 通用流程图",
                    "/products/cheers-neon-bar-sign", "4 个详情页共用的装箱/安装图", true),
            new Group("quote-factory",                 "询价页 · 工厂实拍", "/get-a-quote", "/get-a-quote 页工厂实拍区块", true),
            new Group("order-request",                 "订单请求页 · 产品摘要图", "/order-request",
                    "订单表单上方产品摘要卡（仅 URL 带 ?product= 时显示）", true),
            new Group("channel-letters-quote",         "商业标识页 · 询价配图", "/channel-letters-logos",
                    "Get a Quote 区左图", true),
            new Group("channel-letters-craft",         "商业标识页 · 工艺选择", "/channel-letters-logos",
                    "Craftsmanship Lab 工艺卡 + 询价表单技术选择器", true),
            new Group("channel-letters-materials",     "商业标识页 · 材质规格", "/channel-letters-logos",
                    "Quality Materials 区材质细节图", true),
            new Group("lightbox-carousel",             "灯箱页 · 主图轮播", "/custom-lightbox-signs",
                    "首屏主图轮播（材质规格区同图复用）", true),
            new Group("neon-signs-material",           "定制霓虹页 · 材质品质", "/custom-neon-signs",
                    "Material & Quality 区 3 张材质卡", true),
            new Group("neon-signs-advantage",          "定制霓虹页 · 优势图标", "/custom-neon-signs",
                    "Why Industry Leaders Choose Yulux 区 4 枚图标", true),
            new Group("neon-logo-material",            "霓虹 Logo 页 · 材质品质", "/custom-neon-logo",
                    "Material & Quality 区 3 张材质卡", true),
            new Group("neon-logo-advantage",           "霓虹 Logo 页 · 优势图标", "/custom-neon-logo",
                    "优势区 4 枚图标", true),
            new Group("unassigned",                    "预留位（前端未接入）", null,
                    "前端尚未引用的预留图片位，替换后不会出现在站点上", false)
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

            // —— 首页 · 工艺展示（跨页共用） ——
            new Entry("/images/craft-front-lit.webp", "home-craft", "工艺图 · 正发光 Front-Lit",
                    "首页 Craftsmanship Lab 区第 1 张", W_CRAFT, "/"),
            new Entry("/images/craft-side-lit.webp", "home-craft", "工艺图 · 侧发光 Side-Lit",
                    "首页 Craftsmanship Lab 区第 2 张", W_CRAFT, "/"),
            new Entry("/images/craft-back-lit.webp", "home-craft", "工艺图 · 背发光 Back-Lit",
                    "首页 Craftsmanship Lab 区第 3 张", W_CRAFT, "/"),
            new Entry("/images/craft-jelly-lit.webp", "home-craft", "工艺图 · 果冻发光 Jelly-Lit",
                    "首页 Craftsmanship Lab 区第 4 张", W_CRAFT, "/"),
            new Entry("/images/craft-full-lit.webp", "home-craft", "工艺图 · 全发光 Full-Lit",
                    "首页 Craftsmanship Lab 区第 5 张", W_CRAFT, "/"),
            new Entry("/images/craft-non-lit.webp", "home-craft", "工艺图 · 不发光 Non-Lit",
                    "首页 Craftsmanship Lab 区第 6 张", W_CRAFT, "/"),

            // —— 首页 · 真实项目（与 /gallery 共用） ——
            new Entry("/images/projects/project-led-2.jpg", "home-projects", "真实项目 · Premium LED Channel Letters",
                    "首页 Real-World Projects 区第 1 张（Los Angeles · 旗舰店）", W_PROJ, "/"),
            new Entry("/images/projects/project-neon-8-1.jpg", "home-projects", "真实项目 · Bespoke Neon Signage",
                    "首页 Real-World Projects 区第 2 张（Tokyo · 咖啡馆）", W_PROJ, "/"),
            new Entry("/images/projects/project-neon-12.jpg", "home-projects", "真实项目 · Neon Art Installation",
                    "首页 Real-World Projects 区第 3 张（London · 创意机构）", W_PROJ, "/"),
            new Entry("/images/projects/project-led-5.jpg", "home-projects", "真实项目 · Illuminated Brand Sign",
                    "首页 Real-World Projects 区第 4 张（Dubai · 酒店）", W_PROJ, "/"),
            new Entry("/images/projects/project-jelly.jpg", "home-projects", "真实项目 · Jelly-Lit Retail Sign",
                    "首页 Real-World Projects 区第 5 张（Sydney · 精品店）", W_PROJ, "/"),
            new Entry("/images/projects/project-3d-relief.jpg", "home-projects", "真实项目 · Dimensional Relief Logo",
                    "首页 Real-World Projects 区第 6 张（New York · 企业总部）", W_PROJ, "/"),

            // —— 首页 · 优势图标（3 页共用） ——
            new Entry("/images/icons/yulux_icon_quality.png", "home-advantage", "优势图标 · 定制品质",
                    "首页优势区第 1 枚（Built to Your Specifications）", W_ICON, "/"),
            new Entry("/images/icons/yulux_icon_shipping.png", "home-advantage", "优势图标 · 全球物流",
                    "首页优势区第 2 枚（Global Express & Insured Shipping）", W_ICON, "/"),
            new Entry("/images/icons/yulux_icon_response.png", "home-advantage", "优势图标 · 24h 响应",
                    "首页优势区第 3 枚（24-Hour Rapid Technical Response）", W_ICON, "/"),
            new Entry("/images/icons/yulux_icon_warranty.png", "home-advantage", "优势图标 · 两年质保",
                    "首页优势区第 4 枚（2-Year Limited Warranty）", W_ICON, "/"),

            // —— 首页 · 底部 CTA ——
            new Entry("/images/cta-background.webp", "home-cta", "首页底部 CTA 背景",
                    "首页最末「Ready to Illuminate Your Brand」区背景（CSS 背景图）", null, "/"),

            // —— 画廊组：无静态 Entry，卡片由 AdminViewController 从 DB gallery_order 动态生成 ——

            // —— 关于页 · 工厂区块（与画廊共用） ——
            new Entry("/images/image4.webp", "about-workbench", "工厂区块配图",
                    "/about 页「From Our Workbench to Your Facade」区块图", W_ABOUT_GALLERY, "/about"),

            // —— 关于页 · 理念区块（与画廊共用） ——
            new Entry("/images/image6.webp", "about-standard", "理念区块配图",
                    "/about 页「The Custom-Built Standard」区块图", W_ABOUT_GALLERY, "/about"),

            // —— 成品集合页 · 商品网格（与详情页/订单页共用） ——
            new Entry("/images/products/better-together-white-main.webp", "shop-neon", "商品图 · Better Together（白色）",
                    "/shop-neon 商品网格 Better Together 卡（默认色）", W_MAIN_WHITE, "/shop-neon"),
            new Entry("/images/products/better-together-pink-main.webp", "shop-neon", "商品图 · Better Together（粉色）",
                    "/shop-neon 商品网格 Better Together 卡（粉色变体）", W_MAIN_PINK, "/shop-neon"),
            new Entry("/images/products/good-vibes-white-main.webp", "shop-neon", "商品图 · Good Vibes Only（白色）",
                    "/shop-neon 商品网格 Good Vibes Only 卡（默认色）", W_MAIN_WHITE, "/shop-neon"),
            new Entry("/images/products/good-vibes-pink-main.webp", "shop-neon", "商品图 · Good Vibes Only（粉色）",
                    "/shop-neon 商品网格 Good Vibes Only 卡（粉色变体）", W_MAIN_PINK, "/shop-neon"),
            new Entry("/images/products/this-must-be-white-main.webp", "shop-neon", "商品图 · This Must Be The Place（白色）",
                    "/shop-neon 商品网格 This Must Be The Place 卡（默认色）", W_MAIN_WHITE, "/shop-neon"),
            new Entry("/images/products/this-must-be-pink-main.webp", "shop-neon", "商品图 · This Must Be The Place（粉色）",
                    "/shop-neon 商品网格 This Must Be The Place 卡（粉色变体）", W_MAIN_PINK, "/shop-neon"),
            new Entry("/images/products/cheers-white-main.webp", "shop-neon", "商品图 · Cheers（白色）",
                    "/shop-neon 商品网格 Cheers 卡（默认色）", W_MAIN_WHITE, "/shop-neon"),
            new Entry("/images/products/cheers-pink-main.webp", "shop-neon", "商品图 · Cheers（粉色）",
                    "/shop-neon 商品网格 Cheers 卡（粉色变体）", W_MAIN_PINK, "/shop-neon"),

            // —— 产品详情页 · Better Together 图册 ——
            new Entry("/images/products/better-together-white-main.webp", "product-better-together", "主图（白色）",
                    "详情页首屏主图", W_MAIN_WHITE, "/products/better-together-wedding-neon-sign"),
            new Entry("/images/products/better-together-white-wedding.webp", "product-better-together", "婚礼场景（白色）",
                    "详情页场景画廊", null, "/products/better-together-wedding-neon-sign"),
            new Entry("/images/products/better-together-white-bedroom.webp", "product-better-together", "卧室场景（白色）",
                    "详情页场景画廊", null, "/products/better-together-wedding-neon-sign"),
            new Entry("/images/products/better-together-white-day-night.webp", "product-better-together", "日夜对比（白色）",
                    "详情页场景画廊", null, "/products/better-together-wedding-neon-sign"),
            new Entry("/images/products/better-together-pink-main.webp", "product-better-together", "主图（粉色）",
                    "详情页粉色变体首屏主图", W_MAIN_PINK, "/products/better-together-wedding-neon-sign"),
            new Entry("/images/products/better-together-pink-wedding.webp", "product-better-together", "婚礼场景（粉色）",
                    "详情页粉色变体画廊", null, "/products/better-together-wedding-neon-sign"),
            new Entry("/images/products/better-together-pink-bedroom.webp", "product-better-together", "卧室场景（粉色）",
                    "详情页粉色变体画廊", null, "/products/better-together-wedding-neon-sign"),
            new Entry("/images/products/better-together-pink-day-night.webp", "product-better-together", "日夜对比（粉色）",
                    "详情页粉色变体画廊", null, "/products/better-together-wedding-neon-sign"),

            // —— 产品详情页 · Better Together 通用流程图（4 详情页共用） ——
            new Entry("/images/product-whats-in-box.webp", "product-better-together-generic", "包装箱清单图",
                    "详情页「What's in the Box」区", W_GENERIC, "/products/better-together-wedding-neon-sign"),
            new Entry("/images/product-install-step1.webp", "product-better-together-generic", "安装步骤图 1 · 开箱",
                    "详情页安装引导第 1 步", W_GENERIC, "/products/better-together-wedding-neon-sign"),
            new Entry("/images/product-install-step2.webp", "product-better-together-generic", "安装步骤图 2 · 挂装",
                    "详情页安装引导第 2 步", W_GENERIC, "/products/better-together-wedding-neon-sign"),
            new Entry("/images/product-install-step3.webp", "product-better-together-generic", "安装步骤图 3 · 通电",
                    "详情页安装引导第 3 步", W_GENERIC, "/products/better-together-wedding-neon-sign"),

            // —— 产品详情页 · Good Vibes Only 图册 ——
            new Entry("/images/products/good-vibes-white-main.webp", "product-good-vibes", "主图（白色）",
                    "详情页首屏主图", W_MAIN_WHITE, "/products/good-vibes-only-neon-sign"),
            new Entry("/images/products/good-vibes-white-bedroom.webp", "product-good-vibes", "卧室场景（白色）",
                    "详情页场景画廊", null, "/products/good-vibes-only-neon-sign"),
            new Entry("/images/products/good-vibes-white-studio.webp", "product-good-vibes", "工作室场景（白色）",
                    "详情页场景画廊", null, "/products/good-vibes-only-neon-sign"),
            new Entry("/images/products/good-vibes-white-day-night.webp", "product-good-vibes", "日夜对比（白色）",
                    "详情页场景画廊", null, "/products/good-vibes-only-neon-sign"),
            new Entry("/images/products/good-vibes-pink-main.webp", "product-good-vibes", "主图（粉色）",
                    "详情页粉色变体首屏主图", W_MAIN_PINK, "/products/good-vibes-only-neon-sign"),
            new Entry("/images/products/good-vibes-pink-bedroom.webp", "product-good-vibes", "卧室场景（粉色）",
                    "详情页粉色变体画廊", null, "/products/good-vibes-only-neon-sign"),
            new Entry("/images/products/good-vibes-pink-studio.webp", "product-good-vibes", "工作室场景（粉色）",
                    "详情页粉色变体画廊", null, "/products/good-vibes-only-neon-sign"),
            new Entry("/images/products/good-vibes-pink-day-night.webp", "product-good-vibes", "日夜对比（粉色）",
                    "详情页粉色变体画廊", null, "/products/good-vibes-only-neon-sign"),

            // —— 产品详情页 · Good Vibes Only 通用流程图（4 详情页共用） ——
            new Entry("/images/product-whats-in-box.webp", "product-good-vibes-generic", "包装箱清单图",
                    "详情页「What's in the Box」区", W_GENERIC, "/products/good-vibes-only-neon-sign"),
            new Entry("/images/product-install-step1.webp", "product-good-vibes-generic", "安装步骤图 1 · 开箱",
                    "详情页安装引导第 1 步", W_GENERIC, "/products/good-vibes-only-neon-sign"),
            new Entry("/images/product-install-step2.webp", "product-good-vibes-generic", "安装步骤图 2 · 挂装",
                    "详情页安装引导第 2 步", W_GENERIC, "/products/good-vibes-only-neon-sign"),
            new Entry("/images/product-install-step3.webp", "product-good-vibes-generic", "安装步骤图 3 · 通电",
                    "详情页安装引导第 3 步", W_GENERIC, "/products/good-vibes-only-neon-sign"),

            // —— 产品详情页 · This Must Be The Place 图册 ——
            new Entry("/images/products/this-must-be-white-main.webp", "product-this-must-be", "主图（白色）",
                    "详情页首屏主图", W_MAIN_WHITE, "/products/this-must-be-the-place-neon-sign"),
            new Entry("/images/products/this-must-be-white-living-room.webp", "product-this-must-be", "客厅场景（白色）",
                    "详情页场景画廊", null, "/products/this-must-be-the-place-neon-sign"),
            new Entry("/images/products/this-must-be-white-day-night.webp", "product-this-must-be", "日夜对比（白色）",
                    "详情页场景画廊", null, "/products/this-must-be-the-place-neon-sign"),
            new Entry("/images/products/this-must-be-pink-main.webp", "product-this-must-be", "主图（粉色）",
                    "详情页粉色变体首屏主图", W_MAIN_PINK, "/products/this-must-be-the-place-neon-sign"),
            new Entry("/images/products/this-must-be-pink-living-room.webp", "product-this-must-be", "客厅场景（粉色）",
                    "详情页粉色变体画廊", null, "/products/this-must-be-the-place-neon-sign"),
            new Entry("/images/products/this-must-be-pink-day-night.webp", "product-this-must-be", "日夜对比（粉色）",
                    "详情页粉色变体画廊", null, "/products/this-must-be-the-place-neon-sign"),

            // —— 产品详情页 · This Must Be The Place 通用流程图（4 详情页共用） ——
            new Entry("/images/product-whats-in-box.webp", "product-this-must-be-generic", "包装箱清单图",
                    "详情页「What's in the Box」区", W_GENERIC, "/products/this-must-be-the-place-neon-sign"),
            new Entry("/images/product-install-step1.webp", "product-this-must-be-generic", "安装步骤图 1 · 开箱",
                    "详情页安装引导第 1 步", W_GENERIC, "/products/this-must-be-the-place-neon-sign"),
            new Entry("/images/product-install-step2.webp", "product-this-must-be-generic", "安装步骤图 2 · 挂装",
                    "详情页安装引导第 2 步", W_GENERIC, "/products/this-must-be-the-place-neon-sign"),
            new Entry("/images/product-install-step3.webp", "product-this-must-be-generic", "安装步骤图 3 · 通电",
                    "详情页安装引导第 3 步", W_GENERIC, "/products/this-must-be-the-place-neon-sign"),

            // —— 产品详情页 · Cheers 图册 ——
            new Entry("/images/products/cheers-white-main.webp", "product-cheers", "主图（白色）",
                    "详情页首屏主图", W_MAIN_WHITE, "/products/cheers-neon-bar-sign"),
            new Entry("/images/products/cheers-white-bar.webp", "product-cheers", "吧台场景（白色）",
                    "详情页场景画廊", null, "/products/cheers-neon-bar-sign"),
            new Entry("/images/products/cheers-white-day-night.webp", "product-cheers", "日夜对比（白色）",
                    "详情页场景画廊", null, "/products/cheers-neon-bar-sign"),
            new Entry("/images/products/cheers-pink-main.webp", "product-cheers", "主图（粉色）",
                    "详情页粉色变体首屏主图", W_MAIN_PINK, "/products/cheers-neon-bar-sign"),
            new Entry("/images/products/cheers-pink-bar.webp", "product-cheers", "吧台场景（粉色）",
                    "详情页粉色变体画廊", null, "/products/cheers-neon-bar-sign"),
            new Entry("/images/products/cheers-pink-day-night.webp", "product-cheers", "日夜对比（粉色）",
                    "详情页粉色变体画廊", null, "/products/cheers-neon-bar-sign"),

            // —— 产品详情页 · Cheers 通用流程图（4 详情页共用） ——
            new Entry("/images/product-whats-in-box.webp", "product-cheers-generic", "包装箱清单图",
                    "详情页「What's in the Box」区", W_GENERIC, "/products/cheers-neon-bar-sign"),
            new Entry("/images/product-install-step1.webp", "product-cheers-generic", "安装步骤图 1 · 开箱",
                    "详情页安装引导第 1 步", W_GENERIC, "/products/cheers-neon-bar-sign"),
            new Entry("/images/product-install-step2.webp", "product-cheers-generic", "安装步骤图 2 · 挂装",
                    "详情页安装引导第 2 步", W_GENERIC, "/products/cheers-neon-bar-sign"),
            new Entry("/images/product-install-step3.webp", "product-cheers-generic", "安装步骤图 3 · 通电",
                    "详情页安装引导第 3 步", W_GENERIC, "/products/cheers-neon-bar-sign"),

            // —— 询价页 · 工厂实拍 ——
            new Entry("/images/quote/factory-2.webp", "quote-factory", "工厂实拍 · 车间",
                    "/get-a-quote 页左栏工厂图网格", null, "/get-a-quote"),
            new Entry("/images/quote/factory-backview.webp", "quote-factory", "工厂实拍 · 背面全景",
                    "/get-a-quote 页左栏工厂图网格", null, "/get-a-quote"),
            new Entry("/images/quote/project-1.webp", "quote-factory", "工厂实拍 · 完工项目",
                    "/get-a-quote 页左栏底部宽幅图", null, "/get-a-quote"),

            // —— 订单请求页 · 产品摘要图（仅 ?product= 时显示；与详情页/成品集合页共用） ——
            new Entry("/images/products/better-together-white-main.webp", "order-request", "订单摘要 · Better Together",
                    "订单表单上方产品摘要卡，仅 ?product=better-together-wedding-neon-sign 时显示",
                    W_MAIN_WHITE, "/order-request?product=better-together-wedding-neon-sign"),
            new Entry("/images/products/good-vibes-white-main.webp", "order-request", "订单摘要 · Good Vibes Only",
                    "订单表单上方产品摘要卡，仅 ?product=good-vibes-only-neon-sign 时显示",
                    W_MAIN_WHITE, "/order-request?product=good-vibes-only-neon-sign"),
            new Entry("/images/products/this-must-be-white-main.webp", "order-request", "订单摘要 · This Must Be The Place",
                    "订单表单上方产品摘要卡，仅 ?product=this-must-be-the-place-neon-sign 时显示",
                    W_MAIN_WHITE, "/order-request?product=this-must-be-the-place-neon-sign"),
            new Entry("/images/products/cheers-white-main.webp", "order-request", "订单摘要 · Cheers",
                    "订单表单上方产品摘要卡，仅 ?product=cheers-neon-bar-sign 时显示",
                    W_MAIN_WHITE, "/order-request?product=cheers-neon-bar-sign"),

            // —— 商业标识页 · 询价配图（跨页多处共用） ——
            new Entry("/images/lightbox/yulux_lightbox_frameless.png", "channel-letters-quote", "询价配图 · 无边框灯箱实拍",
                    "本页 3 处共用：Get a Quote 区左图、材质规格第 4 卡、物流安装第 1 卡",
                    W_FRAME_CL, "/channel-letters-logos"),

            // —— 商业标识页 · 工艺选择（与首页共用；本页 2 处） ——
            new Entry("/images/craft-front-lit.webp", "channel-letters-craft", "工艺图 · 正发光 Front-Lit",
                    "本页 2 处共用：Craftsmanship Lab 工艺卡 + 询价表单技术选择器第 1 项", W_CRAFT_CL, "/channel-letters-logos"),
            new Entry("/images/craft-side-lit.webp", "channel-letters-craft", "工艺图 · 侧发光 Side-Lit",
                    "本页 2 处共用：Craftsmanship Lab 工艺卡 + 询价表单技术选择器第 2 项", W_CRAFT_CL, "/channel-letters-logos"),
            new Entry("/images/craft-back-lit.webp", "channel-letters-craft", "工艺图 · 背发光 Back-Lit",
                    "本页 2 处共用：Craftsmanship Lab 工艺卡 + 询价表单技术选择器第 3 项", W_CRAFT_CL, "/channel-letters-logos"),
            new Entry("/images/craft-jelly-lit.webp", "channel-letters-craft", "工艺图 · 果冻发光 Jelly-Lit",
                    "本页 2 处共用：Craftsmanship Lab 工艺卡 + 询价表单技术选择器第 4 项", W_CRAFT_CL, "/channel-letters-logos"),
            new Entry("/images/craft-full-lit.webp", "channel-letters-craft", "工艺图 · 全发光 Full-Lit",
                    "本页 2 处共用：Craftsmanship Lab 工艺卡 + 询价表单技术选择器第 5 项", W_CRAFT_CL, "/channel-letters-logos"),
            new Entry("/images/craft-non-lit.webp", "channel-letters-craft", "工艺图 · 不发光 Non-Lit",
                    "本页 2 处共用：Craftsmanship Lab 工艺卡 + 询价表单技术选择器第 6 项", W_CRAFT_CL, "/channel-letters-logos"),

            // —— 商业标识页 · 材质规格（与灯箱页共用；本区第 4 卡与询价配图同图不重复收录） ——
            new Entry("/images/lightbox/yulux_macro_materials.png", "channel-letters-materials", "材质图 · 不锈钢",
                    "材质规格区「Premium Stainless Steel」卡", W_MACRO, "/channel-letters-logos"),
            new Entry("/images/lightbox/yulux_macro_shapes.png", "channel-letters-materials", "材质图 · 亚克力",
                    "材质规格区「High-Clarity Acrylic」卡", W_MACRO, "/channel-letters-logos"),
            new Entry("/images/lightbox/yulux_macro_illumination.png", "channel-letters-materials", "材质图 · LED 模组",
                    "材质规格区「Certified LED Modules」卡", W_MACRO, "/channel-letters-logos"),

            // —— 灯箱页 · 主图轮播（与材质规格区/商业标识页共用） ——
            new Entry("/images/lightbox/yulux_lightbox_frameless.png", "lightbox-carousel", "轮播图 1 · 无边框灯箱",
                    "本页 2 处：主图轮播第 1 张 + 材质规格第 4 卡", W_FRAME_LB, "/custom-lightbox-signs"),
            new Entry("/images/lightbox/yulux_macro_shapes.png", "lightbox-carousel", "轮播图 2 · 造型细节",
                    "本页 2 处：主图轮播第 2 张 + 材质规格「High-Clarity Acrylic」卡", W_MACRO_LB, "/custom-lightbox-signs"),
            new Entry("/images/lightbox/yulux_macro_materials.png", "lightbox-carousel", "轮播图 3 · 材质细节",
                    "本页 2 处：主图轮播第 3 张 + 材质规格「Premium Stainless Steel」卡", W_MACRO_LB, "/custom-lightbox-signs"),
            new Entry("/images/lightbox/yulux_macro_illumination.png", "lightbox-carousel", "轮播图 4 · 打光细节",
                    "本页 2 处：主图轮播第 4 张 + 材质规格「Certified LED Modules」卡", W_MACRO_LB, "/custom-lightbox-signs"),

            // —— 定制霓虹页 · 材质品质（与霓虹 Logo 页共用） ——
            new Entry("/images/icons/yulux_icon_neon_flex.png", "neon-signs-material", "材质图标 · LED 霓虹灯带",
                    "Material & Quality 区「High-Efficiency LED Neon Flex」卡", W_MAT, "/custom-neon-signs"),
            new Entry("/images/icons/yulux_icon_acrylic.png", "neon-signs-material", "材质图标 · 亚克力",
                    "Material & Quality 区「Commercial-Grade Acrylic」卡", W_MAT, "/custom-neon-signs"),
            new Entry("/images/icons/yulux_icon_safety.png", "neon-signs-material", "材质图标 · 电气安全",
                    "Material & Quality 区「Certified Power & Safety Systems」卡", W_MAT, "/custom-neon-signs"),

            // —— 定制霓虹页 · 优势图标（3 页共用） ——
            new Entry("/images/icons/yulux_icon_quality.png", "neon-signs-advantage", "优势图标 · 定制品质",
                    "优势区第 1 枚（Built to Your Specifications）", W_ICON, "/custom-neon-signs"),
            new Entry("/images/icons/yulux_icon_shipping.png", "neon-signs-advantage", "优势图标 · 全球物流",
                    "优势区第 2 枚（Global Express & Insured Shipping）", W_ICON, "/custom-neon-signs"),
            new Entry("/images/icons/yulux_icon_response.png", "neon-signs-advantage", "优势图标 · 24h 响应",
                    "优势区第 3 枚（24-Hour Rapid Technical Response）", W_ICON, "/custom-neon-signs"),
            new Entry("/images/icons/yulux_icon_warranty.png", "neon-signs-advantage", "优势图标 · 两年质保",
                    "优势区第 4 枚（2-Year Limited Warranty）", W_ICON, "/custom-neon-signs"),

            // —— 霓虹 Logo 页 · 材质品质（与定制霓虹页共用） ——
            new Entry("/images/icons/yulux_icon_neon_flex.png", "neon-logo-material", "材质图标 · LED 霓虹灯带",
                    "Material & Quality 区「High-Efficiency LED Neon Flex」卡", W_MAT, "/custom-neon-logo"),
            new Entry("/images/icons/yulux_icon_acrylic.png", "neon-logo-material", "材质图标 · 亚克力",
                    "Material & Quality 区「Commercial-Grade Acrylic」卡", W_MAT, "/custom-neon-logo"),
            new Entry("/images/icons/yulux_icon_safety.png", "neon-logo-material", "材质图标 · 电气安全",
                    "Material & Quality 区「Certified Power & Safety Systems」卡", W_MAT, "/custom-neon-logo"),

            // —— 霓虹 Logo 页 · 优势图标（3 页共用） ——
            new Entry("/images/icons/yulux_icon_quality.png", "neon-logo-advantage", "优势图标 · 定制品质",
                    "优势区第 1 枚（Built to Your Specifications）", W_ICON, "/custom-neon-logo"),
            new Entry("/images/icons/yulux_icon_shipping.png", "neon-logo-advantage", "优势图标 · 全球物流",
                    "优势区第 2 枚（Global Express & Insured Shipping）", W_ICON, "/custom-neon-logo"),
            new Entry("/images/icons/yulux_icon_response.png", "neon-logo-advantage", "优势图标 · 24h 响应",
                    "优势区第 3 枚（24-Hour Rapid Technical Response）", W_ICON, "/custom-neon-logo"),
            new Entry("/images/icons/yulux_icon_warranty.png", "neon-logo-advantage", "优势图标 · 两年质保",
                    "优势区第 4 枚（2-Year Limited Warranty）", W_ICON, "/custom-neon-logo"),

            // —— 预留位（前端未引用，替换不生效） ——
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
                    "前端当前未引用（预留位）", "前端未引用，替换不生效", null),
            new Entry("/images/product-faq-image.webp", "unassigned", "预留 · 详情页 FAQ 配图",
                    "前端当前未引用（预留位）", "前端未引用，替换不生效", null)
    ));

    private static final Map<String, Entry> BY_KEY;

    static {
        // 同 key 多条目时取声明顺序第一条（首现语义；主流程用 entries()/entriesByKey）
        Map<String, Entry> map = new LinkedHashMap<>();
        for (Entry e : ENTRIES) {
            if (!map.containsKey(e.getImageKey())) {
                map.put(e.getImageKey(), e);
            }
        }
        BY_KEY = Collections.unmodifiableMap(map);
    }

    private SiteImageCatalog() {
    }

    /** 全部分组（组间顺序 = 声明顺序） */
    public static List<Group> groups() {
        return GROUPS;
    }

    /** 全部条目（组内顺序 = 声明顺序；buildGroups 按此遍历渲染） */
    public static List<Entry> entries() {
        return ENTRIES;
    }

    /** 某 key 的全部条目（跨组共用图，按声明顺序）；无则空列表 */
    public static List<Entry> entriesByKey(String imageKey) {
        List<Entry> result = new ArrayList<>();
        if (imageKey == null) {
            return result;
        }
        for (Entry e : ENTRIES) {
            if (imageKey.equals(e.getImageKey())) {
                result.add(e);
            }
        }
        return result;
    }

    /** key 对应首现元数据；未收录返回 null（由调用方兜底成合成 Entry） */
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
