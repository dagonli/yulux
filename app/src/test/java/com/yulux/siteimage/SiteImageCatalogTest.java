package com.yulux.siteimage;

import org.junit.jupiter.api.Test;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * SiteImageCatalog 静态结构不变量：29 组 / 118 条 Entry / 77 个唯一 key。
 * 目录是手写的 100+ 条常量表，用结构断言兜住笔误（groupId 拼错、漏卡、
 * 组内重复、共用图漏组等）。约定见 C:\Users\Admin\.claude\plans\1-set-images-gleaming-pixel.md §一。
 */
class SiteImageCatalogTest {

    @Test
    void groupsAre29InDeclaredOrderWithUniqueIds() {
        List<SiteImageCatalog.Group> groups = SiteImageCatalog.groups();
        assertThat(groups).hasSize(29);
        assertThat(groups.stream().map(SiteImageCatalog.Group::getId).distinct()).hasSize(29);
        assertThat(groups.get(0).getId()).isEqualTo("home-hero");
        assertThat(groups.get(6).getId()).isEqualTo(SiteImageCatalog.GALLERY_GROUP_ID);
        assertThat(groups.get(groups.size() - 1).getId()).isEqualTo("unassigned");
    }

    @Test
    void everyEntryGroupIdExists() {
        Set<String> groupIds = SiteImageCatalog.groups().stream()
                .map(SiteImageCatalog.Group::getId).collect(Collectors.toSet());
        for (SiteImageCatalog.Entry e : SiteImageCatalog.entries()) {
            assertThat(groupIds).as("entry %s 的 groupId", e.getImageKey()).contains(e.getGroupId());
        }
    }

    @Test
    void galleryGroupHasNoStaticEntries() {
        for (SiteImageCatalog.Entry e : SiteImageCatalog.entries()) {
            assertThat(e.getGroupId())
                    .as("画廊组卡片应由 DB 动态生成，%s 不应有静态条目", e.getImageKey())
                    .isNotEqualTo(SiteImageCatalog.GALLERY_GROUP_ID);
        }
    }

    @Test
    void entryCountAndDistinctKeys() {
        List<SiteImageCatalog.Entry> entries = SiteImageCatalog.entries();
        assertThat(entries).hasSize(118);
        // 静态条目去重 73 = DB 全量 77（V2 60 + V5 17）- 4 张画廊专属图（image1/2/3/5，
        // 仅 /gallery 使用、无其他页面模块，由画廊动态组管理，无静态条目）
        assertThat(entries.stream().map(SiteImageCatalog.Entry::getImageKey).distinct())
                .hasSize(73);
    }

    @Test
    void sharedKeysAppearInEveryInvolvedGroup() {
        // 工艺图：首页 + 商业标识页
        assertThat(SiteImageCatalog.entriesByKey("/images/craft-front-lit.webp"))
                .extracting(SiteImageCatalog.Entry::getGroupId)
                .containsExactly("home-craft", "channel-letters-craft");
        // 优势图标：首页 + 定制霓虹页 + 霓虹 Logo 页
        assertThat(SiteImageCatalog.entriesByKey("/images/icons/yulux_icon_quality.png"))
                .extracting(SiteImageCatalog.Entry::getGroupId)
                .containsExactly("home-advantage", "neon-signs-advantage", "neon-logo-advantage");
        // 白色主图：成品集合页 + 详情页 + 订单请求页（组声明顺序）
        assertThat(SiteImageCatalog.entriesByKey("/images/products/better-together-white-main.webp"))
                .extracting(SiteImageCatalog.Entry::getGroupId)
                .containsExactly("shop-neon", "product-better-together", "order-request");
        // 粉色主图：成品集合页 + 详情页（订单摘要只用白色主图）
        assertThat(SiteImageCatalog.entriesByKey("/images/products/better-together-pink-main.webp"))
                .extracting(SiteImageCatalog.Entry::getGroupId)
                .containsExactly("shop-neon", "product-better-together");
        // 画廊专属图（image1 无其他静态引用，画廊卡片走 DB 动态生成）
        assertThat(SiteImageCatalog.entriesByKey("/images/image1.webp")).isEmpty();
        // image4 与关于页工厂区块共用
        assertThat(SiteImageCatalog.entriesByKey("/images/image4.webp"))
                .extracting(SiteImageCatalog.Entry::getGroupId)
                .containsExactly("about-workbench");
    }

    @Test
    void byKeyReturnsFirstDeclaredEntry() {
        SiteImageCatalog.Entry first = SiteImageCatalog.byKey("/images/craft-front-lit.webp");
        assertThat(first.getGroupId()).isEqualTo("home-craft");
        assertThat(SiteImageCatalog.byKey("/images/not-exist.webp")).isNull();
        assertThat(SiteImageCatalog.byKey(null)).isNull();
    }

    @Test
    void noDuplicateKeyWithinSameGroup() {
        Set<String> seen = new HashSet<>();
        for (SiteImageCatalog.Entry e : SiteImageCatalog.entries()) {
            String composite = e.getGroupId() + "|" + e.getImageKey();
            assertThat(seen.add(composite))
                    .as("组 %s 内 key %s 重复", e.getGroupId(), e.getImageKey())
                    .isTrue();
        }
    }

    @Test
    void referencedGroupsHaveRouteAndFrontendPath() {
        for (SiteImageCatalog.Group g : SiteImageCatalog.groups()) {
            if (g.isReferenced()) {
                assertThat(g.getRoute()).as("已接入组 %s 缺 route", g.getId()).isNotBlank();
            } else {
                assertThat(g.getRoute()).as("预留组 %s 不应有 route", g.getId()).isNull();
            }
        }
        Set<String> unassignedGroupIds = SiteImageCatalog.groups().stream()
                .filter(g -> !g.isReferenced()).map(SiteImageCatalog.Group::getId)
                .collect(Collectors.toSet());
        for (SiteImageCatalog.Entry e : SiteImageCatalog.entries()) {
            if (!unassignedGroupIds.contains(e.getGroupId())) {
                assertThat(e.getFrontendPath())
                        .as("已接入组 %s 的 %s 缺 frontendPath", e.getGroupId(), e.getImageKey())
                        .isNotBlank();
            }
        }
    }

    @Test
    void staticEntryKeysAreFrontendImagePaths() {
        for (SiteImageCatalog.Entry e : SiteImageCatalog.entries()) {
            assertThat(e.getImageKey())
                    .as("静态条目 key 应为前端 /images/ 路径：%s", e.getImageKey())
                    .startsWith("/images/");
        }
    }

    @Test
    void anchorIdIsStableIdLike() {
        assertThat(SiteImageCatalog.anchorIdOf("/images/quote/factory-2.webp"))
                .isEqualTo("img-images-quote-factory-2-webp");
        assertThat(SiteImageCatalog.anchorIdOf("/uploads/gallery-abc-123.webp"))
                .isEqualTo("img-uploads-gallery-abc-123-webp");
        assertThat(SiteImageCatalog.anchorIdOf(null)).isEqualTo("img");
    }
}
