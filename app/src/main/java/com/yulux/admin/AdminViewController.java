package com.yulux.admin;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.yulux.inquiry.Inquiry;
import com.yulux.inquiry.InquiryService;
import com.yulux.inquiry.InquiryStatus;
import com.yulux.inquiry.InquiryType;
import com.yulux.inquiry.dto.InquiryResponse;
import com.yulux.siteimage.ImageUrlResolver;
import com.yulux.siteimage.SiteImage;
import com.yulux.siteimage.SiteImageCatalog;
import com.yulux.siteimage.SiteImageService;
import com.yulux.siteimage.dto.ImagesPageView;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

/**
 * 后台页面（Thymeleaf 服务端渲染）
 */
@Controller
public class AdminViewController {

    private final InquiryService inquiryService;
    private final SiteImageService siteImageService;
    private final ImageUrlResolver imageUrlResolver;

    @Value("${yulux.upload-dir}")
    private String uploadDir;

    @Value("${yulux.frontend-base-url}")
    private String frontendBaseUrl;

    public AdminViewController(InquiryService inquiryService, SiteImageService siteImageService,
                               ImageUrlResolver imageUrlResolver) {
        this.inquiryService = inquiryService;
        this.siteImageService = siteImageService;
        this.imageUrlResolver = imageUrlResolver;
    }

    @GetMapping("/admin/login")
    public String login() {
        return "login";
    }

    @GetMapping({"/admin", "/admin/inquiries"})
    public String inquiries(
            @RequestParam(defaultValue = "1") long page,
            @RequestParam(defaultValue = "20") long size,
            @RequestParam(required = false) InquiryType type,
            @RequestParam(required = false) InquiryStatus status,
            Model model) {
        IPage<InquiryResponse> result = inquiryService.page(page, size, type, status);
        model.addAttribute("page", result);
        model.addAttribute("records", result.getRecords());
        model.addAttribute("selectedType", type);
        model.addAttribute("selectedStatus", status);
        model.addAttribute("types", InquiryType.values());
        model.addAttribute("statuses", InquiryStatus.values());
        return "inquiries";
    }

    /**
     * 下载询盘附件（需后台登录，session 鉴权）
     */
    @GetMapping("/admin/inquiries/{id}/attachment")
    @ResponseBody
    public ResponseEntity<Resource> downloadAttachment(@PathVariable Long id) {
        Inquiry inquiry = inquiryService.getById(id);
        if (inquiry == null || !StringUtils.hasText(inquiry.getAttachmentPath())) {
            return ResponseEntity.notFound().build();
        }

        // 防目录穿越：规范化后必须仍在 upload-dir 之内
        Path base = Paths.get(uploadDir).toAbsolutePath().normalize();
        Path file = base.resolve(inquiry.getAttachmentPath()).normalize();
        if (!file.startsWith(base) || !file.toFile().isFile()) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = new FileSystemResource(file.toFile());
        String filename = StringUtils.hasText(inquiry.getAttachmentFilename())
                ? inquiry.getAttachmentFilename()
                : "attachment";
        String encoded;
        try {
            encoded = URLEncoder.encode(filename, "UTF-8").replace("+", "%20");
        } catch (UnsupportedEncodingException e) {
            // UTF-8 始终可用，理论上不会走到这里
            throw new IllegalStateException(e);
        }

        MediaType mediaType = MediaType.APPLICATION_OCTET_STREAM;
        if (StringUtils.hasText(inquiry.getAttachmentContentType())) {
            try {
                mediaType = MediaType.parseMediaType(inquiry.getAttachmentContentType());
            } catch (Exception ignored) {
                // 非法 content-type 时回退为二进制流
            }
        }

        return ResponseEntity.ok()
                .contentType(mediaType)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + encoded + "\"; filename*=UTF-8''" + encoded)
                .body(resource);
    }

    /** /admin/images 默认页签（首页） */
    private static final String DEFAULT_PAGE_KEY = "home";

    /**
     * 图片管理页：顶部页签按页面（路由归并的模块组）导航，默认首页，
     * 仅渲染选中页面的模块组（不一次全量铺开）。page 参数为 SiteImageCatalog.Page.key。
     */
    @GetMapping("/admin/images")
    public String images(Model model,
                         @RequestParam(value = "page", required = false) String pageKey) {
        List<SiteImage> images = siteImageService.listAll();
        List<ImagesPageView.GroupView> allGroups = buildGroups(images);
        SiteImageCatalog.Page current = resolvePage(pageKey);

        List<ImagesPageView.PageView> pages = new ArrayList<>();
        for (SiteImageCatalog.Page p : SiteImageCatalog.pages()) {
            int count = 0;
            for (ImagesPageView.GroupView g : allGroups) {
                if (Objects.equals(g.getRoute(), p.getRoute())) {
                    count += g.getCards().size();
                }
            }
            pages.add(new ImagesPageView.PageView(p.getKey(), p.getTitle(), p.equals(current), count));
        }

        List<ImagesPageView.GroupView> shown = new ArrayList<>();
        for (ImagesPageView.GroupView g : allGroups) {
            if (Objects.equals(g.getRoute(), current.getRoute())) {
                shown.add(g);
            }
        }

        model.addAttribute("pages", pages);
        model.addAttribute("currentPageKey", current.getKey());
        model.addAttribute("groups", shown);
        return "images";
    }

    /** 校验页签 key：缺失/非法回退默认页（首页） */
    private SiteImageCatalog.Page resolvePage(String pageKey) {
        SiteImageCatalog.Page page = SiteImageCatalog.pageOfKey(pageKey);
        return page != null ? page : SiteImageCatalog.pageOfKey(DEFAULT_PAGE_KEY);
    }

    /** 上传/画廊操作后回到原页签（可选卡片锚点） */
    private String imagesRedirect(String pageKey, String anchor) {
        String page = resolvePage(pageKey).getKey();
        return "redirect:/admin/images?page=" + page + (anchor == null ? "" : "#" + anchor);
    }

    /** /gallery 画廊页每页张数，须与前端 web/content/gallery.ts 的 ITEMS_PER_PAGE 保持一致 */
    private static final int GALLERY_PAGE_SIZE = 8;

    /**
     * DB 状态 + Catalog 元数据 -> 分组视图模型。
     * 按 Catalog entries() 声明顺序遍历（组内顺序 = 声明顺序），按槽位键
     * （groupId::图片路径，见 SiteImageCatalog.slotKey）回查 DB 行；DB 缺行的条目跳过
     * （如迁移未执行）。画廊组卡片由 gallery_order 非空行动态生成，即使 0 张也渲染
     * （保留「添加图片」入口）；未收录且不在画廊的 key 落「其他」组兜底（上传替换不受影响）。
     */
    private List<ImagesPageView.GroupView> buildGroups(List<SiteImage> images) {
        Map<String, SiteImage> dbByKey = new LinkedHashMap<>();
        for (SiteImage img : images) {
            dbByKey.put(img.getImageKey(), img);
        }

        List<SiteImage> galleryImages = siteImageService.listGallery();
        Set<String> galleryKeys = new HashSet<>();
        for (SiteImage g : galleryImages) {
            galleryKeys.add(g.getImageKey());
        }

        Set<String> catalogKeys = new HashSet<>();
        for (SiteImageCatalog.Entry e : SiteImageCatalog.entries()) {
            catalogKeys.add(SiteImageCatalog.slotKey(e.getGroupId(), e.getImageKey()));
        }

        List<ImagesPageView.GroupView> result = new ArrayList<>();
        for (SiteImageCatalog.Group group : SiteImageCatalog.groups()) {
            if (SiteImageCatalog.GALLERY_GROUP_ID.equals(group.getId())) {
                List<ImagesPageView.CardView> cards = new ArrayList<>();
                for (SiteImage img : galleryImages) {
                    cards.add(galleryCard(img));
                }
                result.add(new ImagesPageView.GroupView(group.getId(), group.getTitle(), group.getRoute(),
                        group.getDescription(), group.isReferenced(), group.getPreview(), true, cards));
                continue;
            }
            List<ImagesPageView.CardView> cards = new ArrayList<>();
            for (SiteImageCatalog.Entry entry : SiteImageCatalog.entries()) {
                if (!entry.getGroupId().equals(group.getId())) {
                    continue;
                }
                SiteImage img = dbByKey.get(SiteImageCatalog.slotKey(entry.getGroupId(), entry.getImageKey()));
                if (img == null) {
                    continue;
                }
                cards.add(new ImagesPageView.CardView(img, entry,
                        imageUrlResolver.resolve(img.getUrl()),
                        frontendPreviewUrl(entry.getFrontendPath())));
            }
            if (!cards.isEmpty()) {
                result.add(new ImagesPageView.GroupView(group.getId(), group.getTitle(), group.getRoute(),
                        group.getDescription(), group.isReferenced(), group.getPreview(), false, cards));
            }
        }

        List<ImagesPageView.CardView> others = new ArrayList<>();
        for (SiteImage img : images) {
            String key = img.getImageKey();
            if (catalogKeys.contains(key) || galleryKeys.contains(key)) {
                continue;
            }
            others.add(new ImagesPageView.CardView(img, fallbackEntry(key),
                    imageUrlResolver.resolve(img.getUrl()), null));
        }
        if (!others.isEmpty()) {
            result.add(new ImagesPageView.GroupView(
                    SiteImageCatalog.OTHER_GROUP_ID, "其他（未收录）", null,
                    "数据库中存在但 Catalog 未收录、也不在画廊中的图片位，请补充 SiteImageCatalog 元数据",
                    false, "wide", false, others));
        }
        return result;
    }

    /**
     * 画廊动态卡片：合成 Entry。画廊行与其他页面槽位行互不影响（替换仅本页生效，
     * 「移除」仅退出画廊页）；页码/位次按 GALLERY_PAGE_SIZE 计算。
     */
    private ImagesPageView.CardView galleryCard(SiteImage img) {
        int order = img.getGalleryOrder();
        int pageNo = (order - 1) / GALLERY_PAGE_SIZE + 1;
        int posInPage = (order - 1) % GALLERY_PAGE_SIZE + 1;

        SiteImageCatalog.Entry meta = new SiteImageCatalog.Entry(img.getImageKey(),
                SiteImageCatalog.GALLERY_GROUP_ID,
                "画廊图 #" + order,
                "/gallery 画廊页第 " + pageNo + " 页第 " + posInPage + " 张",
                null,
                "/gallery?page=" + pageNo);
        return new ImagesPageView.CardView(img, meta,
                imageUrlResolver.resolve(img.getUrl()), frontendPreviewUrl(meta.getFrontendPath()));
    }

    /** 未收录 key 的合成元数据（模板因此永远拿到非 null meta） */
    private SiteImageCatalog.Entry fallbackEntry(String imageKey) {
        return new SiteImageCatalog.Entry(imageKey, SiteImageCatalog.OTHER_GROUP_ID,
                imageKey, "未收录的图片位（元数据缺失）",
                "前端新增的图片位，请在 SiteImageCatalog 中补充元数据", null);
    }

    /** frontend-base-url + 前端路由；无路由返回 null（模板不渲染链接） */
    private String frontendPreviewUrl(String frontendPath) {
        if (!StringUtils.hasText(frontendPath)) {
            return null;
        }
        String base = frontendBaseUrl.endsWith("/")
                ? frontendBaseUrl.substring(0, frontendBaseUrl.length() - 1)
                : frontendBaseUrl;
        return base + frontendPath;
    }

    @PostMapping("/admin/images/upload")
    public String uploadImage(
            @RequestParam("imageKey") String imageKey,
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "page", required = false) String page,
            RedirectAttributes redirectAttributes) {
        try {
            if (file.isEmpty()) {
                throw new IllegalArgumentException("Please choose a file");
            }
            siteImageService.replaceImage(imageKey, file);
            redirectAttributes.addFlashAttribute("message", "Updated: " + imageKey);
            // 上传后回到原页签并直接定位到刚替换的卡片锚点
            return imagesRedirect(page, SiteImageCatalog.anchorIdOf(imageKey));
        } catch (IOException | IllegalArgumentException e) {
            redirectAttributes.addFlashAttribute("error", e.getMessage());
        }
        return imagesRedirect(page, SiteImageCatalog.anchorIdOf(imageKey));
    }

    /** 画廊添加：上传新图转 WebP，追加到画廊末尾（不做排序） */
    @PostMapping("/admin/images/gallery/add")
    public String addGalleryImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "altText", required = false) String altText,
            @RequestParam(value = "page", required = false) String page,
            RedirectAttributes redirectAttributes) {
        try {
            if (file.isEmpty()) {
                throw new IllegalArgumentException("Please choose a file");
            }
            SiteImage added = siteImageService.addToGallery(file, altText);
            redirectAttributes.addFlashAttribute("message", "Added to gallery: " + added.getImageKey());
            return imagesRedirect(page, SiteImageCatalog.anchorIdOf(added.getImageKey()));
        } catch (IOException | IllegalArgumentException | IllegalStateException e) {
            redirectAttributes.addFlashAttribute("error", e.getMessage());
        }
        return imagesRedirect(page, SiteImageCatalog.GALLERY_GROUP_ID);
    }

    /** 画廊移除：仅退出画廊页（gallery_order 置 NULL），其他页面槽位行不受影响 */
    @PostMapping("/admin/images/gallery/remove")
    public String removeGalleryImage(
            @RequestParam("imageKey") String imageKey,
            @RequestParam(value = "page", required = false) String page,
            RedirectAttributes redirectAttributes) {
        try {
            siteImageService.removeFromGallery(imageKey);
            redirectAttributes.addFlashAttribute("message", "Removed from gallery: " + imageKey);
        } catch (IllegalArgumentException e) {
            redirectAttributes.addFlashAttribute("error", e.getMessage());
        }
        return imagesRedirect(page, SiteImageCatalog.GALLERY_GROUP_ID);
    }
}
