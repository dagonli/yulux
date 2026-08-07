package com.yulux.inquiry;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yulux.common.ApiResult;
import com.yulux.inquiry.dto.InquiryRequest;
import com.yulux.inquiry.dto.InquiryResponse;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class InquiryController {

    private final InquiryService inquiryService;
    private final ObjectMapper objectMapper;

    public InquiryController(InquiryService inquiryService, ObjectMapper objectMapper) {
        this.inquiryService = inquiryService;
        this.objectMapper = objectMapper;
    }

    /**
     * 公开接口：接收前端表单提交（multipart/form-data，支持可选附件）。
     * data 部分为 JSON 字符串（InquiryRequest），file 为可选附件。
     */
    @PostMapping(value = "/inquiries", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResult<Object> submit(@RequestPart("data") String data,
                                    @RequestPart(value = "file", required = false) MultipartFile file,
                                    HttpServletRequest servletRequest) throws IOException {
        InquiryRequest request = objectMapper.readValue(data, InquiryRequest.class);
        validate(request);

        String ip = resolveClientIp(servletRequest);
        String ua = servletRequest.getHeader("User-Agent");
        Long id = inquiryService.create(request, file, ip, ua);
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

    /**
     * multipart 提交时 @Valid 无法直接作用于反序列化后的 @RequestPart 字符串，手动校验必填项
     */
    private void validate(InquiryRequest request) {
        if (request.getType() == null) {
            throw new IllegalArgumentException("type is required");
        }
        if (!hasText(request.getName())) {
            throw new IllegalArgumentException("name is required");
        }
        if (!hasText(request.getEmail())) {
            throw new IllegalArgumentException("email is required");
        }
    }

    private boolean hasText(String s) {
        return s != null && !s.trim().isEmpty();
    }

    private String resolveClientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isEmpty()) {
            return forwarded.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
