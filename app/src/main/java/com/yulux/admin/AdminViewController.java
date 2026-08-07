package com.yulux.admin;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.yulux.inquiry.Inquiry;
import com.yulux.inquiry.InquiryService;
import com.yulux.inquiry.InquiryStatus;
import com.yulux.inquiry.InquiryType;
import com.yulux.inquiry.dto.InquiryResponse;
import com.yulux.siteimage.ImageUrlResolver;
import com.yulux.siteimage.SiteImage;
import com.yulux.siteimage.SiteImageService;
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
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;

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
        String encoded = URLEncoder.encode(filename, StandardCharsets.UTF_8).replace("+", "%20");

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
        java.util.List<SiteImage> images = siteImageService.listAll();
        java.util.Map<String, String> displayUrls = new java.util.LinkedHashMap<>();
        for (SiteImage img : images) {
            displayUrls.put(img.getImageKey(), imageUrlResolver.resolve(img.getUrl()));
        }
        model.addAttribute("images", images);
        model.addAttribute("displayUrls", displayUrls);
        return "images";
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
            String url = siteImageService.replaceImage(imageKey, file);
            redirectAttributes.addFlashAttribute("message", "Updated: " + imageKey);
            redirectAttributes.addFlashAttribute("updatedKey", imageKey);
            redirectAttributes.addFlashAttribute("updatedUrl", url);
        } catch (IOException | IllegalArgumentException e) {
            redirectAttributes.addFlashAttribute("error", e.getMessage());
        }
        return "redirect:/admin/images";
    }
}
