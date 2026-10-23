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
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

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

    @GetMapping("/admin/images")
    public String images(Model model) {
        List<SiteImage> images = siteImageService.listAll();
        model.addAttribute("groups", buildGroups(images));
        return "images";
    }

    /**
     * DB 状态 + Catalog 元数据 -> 分组视图模型。
     * 未收录进 Catalog 的 key 落入「其他（未收录）」组兜底（上传替换不受影响）；
     * Catalog 有而 DB 无的组直接跳过，不渲染空区块。
     */
    private List<ImagesPageView.GroupView> buildGroups(List<SiteImage> images) {
        Map<String, List<ImagesPageView.CardView>> buckets = new LinkedHashMap<>();
        for (SiteImageCatalog.Group group : SiteImageCatalog.groups()) {
            buckets.put(group.getId(), new ArrayList<>());
        }
        List<ImagesPageView.CardView> others = new ArrayList<>();

        for (SiteImage img : images) {
            String displayUrl = imageUrlResolver.resolve(img.getUrl());
            SiteImageCatalog.Entry meta = SiteImageCatalog.byKey(img.getImageKey());
            if (meta == null) {
                others.add(new ImagesPageView.CardView(img, fallbackEntry(img.getImageKey()), displayUrl, null));
            } else {
                buckets.get(meta.getGroupId()).add(new ImagesPageView.CardView(
                        img, meta, displayUrl, frontendPreviewUrl(meta.getFrontendPath())));
            }
        }

        List<ImagesPageView.GroupView> result = new ArrayList<>();
        for (SiteImageCatalog.Group group : SiteImageCatalog.groups()) {
            List<ImagesPageView.CardView> cards = buckets.get(group.getId());
            if (!cards.isEmpty()) {
                result.add(new ImagesPageView.GroupView(
                        group.getId(), group.getTitle(), group.getDescription(),
                        group.isReferenced(), cards));
            }
        }
        if (!others.isEmpty()) {
            result.add(new ImagesPageView.GroupView(
                    SiteImageCatalog.OTHER_GROUP_ID, "其他（未收录）",
                    "数据库中存在但 Catalog 未收录的图片位，请补充 SiteImageCatalog 元数据",
                    false, others));
        }
        return result;
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
            RedirectAttributes redirectAttributes) {
        try {
            if (file.isEmpty()) {
                throw new IllegalArgumentException("Please choose a file");
            }
            siteImageService.replaceImage(imageKey, file);
            redirectAttributes.addFlashAttribute("message", "Updated: " + imageKey);
            // 上传后直接定位回刚替换的卡片锚点
            return "redirect:/admin/images#" + SiteImageCatalog.anchorIdOf(imageKey);
        } catch (IOException | IllegalArgumentException e) {
            redirectAttributes.addFlashAttribute("error", e.getMessage());
        }
        return "redirect:/admin/images";
    }
}
