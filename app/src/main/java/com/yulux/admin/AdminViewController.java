package com.yulux.admin;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.yulux.inquiry.InquiryService;
import com.yulux.inquiry.InquiryStatus;
import com.yulux.inquiry.InquiryType;
import com.yulux.inquiry.dto.InquiryResponse;
import com.yulux.siteimage.ImageUrlResolver;
import com.yulux.siteimage.SiteImage;
import com.yulux.siteimage.SiteImageService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;

/**
 * 后台页面（Thymeleaf 服务端渲染）
 */
@Controller
public class AdminViewController {

    private final InquiryService inquiryService;
    private final SiteImageService siteImageService;
    private final ImageUrlResolver imageUrlResolver;

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
