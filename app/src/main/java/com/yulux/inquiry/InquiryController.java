package com.yulux.inquiry;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.yulux.common.ApiResult;
import com.yulux.inquiry.dto.InquiryRequest;
import com.yulux.inquiry.dto.InquiryResponse;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Collections;

@RestController
@RequestMapping("/api")
public class InquiryController {

    private final InquiryService inquiryService;

    public InquiryController(InquiryService inquiryService) {
        this.inquiryService = inquiryService;
    }

    /**
     * 公开接口：接收前端表单提交
     */
    @PostMapping("/inquiries")
    public ApiResult<Object> submit(@Valid @RequestBody InquiryRequest request,
                                    HttpServletRequest servletRequest) {
        String ip = resolveClientIp(servletRequest);
        String ua = servletRequest.getHeader("User-Agent");
        Long id = inquiryService.create(request, ip, ua);
        return ApiResult.success(Collections.singletonMap("id", id));
    }

    /**
     * 后台接口：分页查询提交记录（需 API Key，见 SecurityConfig）
     */
    @GetMapping("/admin/inquiries")
    public ApiResult<IPage<InquiryResponse>> list(
            @RequestParam(defaultValue = "1") long page,
            @RequestParam(defaultValue = "20") long size,
            @RequestParam(required = false) InquiryType type,
            @RequestParam(required = false) InquiryStatus status) {
        return ApiResult.success(inquiryService.page(page, size, type, status));
    }

    private String resolveClientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isEmpty()) {
            return forwarded.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
