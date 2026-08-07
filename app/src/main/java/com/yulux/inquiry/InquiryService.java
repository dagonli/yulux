package com.yulux.inquiry;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.yulux.inquiry.dto.InquiryRequest;
import com.yulux.inquiry.dto.InquiryResponse;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InquiryService {

    private final InquiryMapper inquiryMapper;
    private final AttachmentStorageService attachmentStorageService;

    public InquiryService(InquiryMapper inquiryMapper, AttachmentStorageService attachmentStorageService) {
        this.inquiryMapper = inquiryMapper;
        this.attachmentStorageService = attachmentStorageService;
    }

    /**
     * 保存前端表单提交（含可选附件），返回新记录 id
     */
    public Long create(InquiryRequest request, MultipartFile file, String ipAddress, String userAgent) throws IOException {
        Inquiry inquiry = new Inquiry();
        inquiry.setType(request.getType());
        inquiry.setName(request.getName());
        inquiry.setEmail(request.getEmail());
        inquiry.setCompany(request.getCompany());
        inquiry.setCountry(request.getCountry());
        inquiry.setMessage(request.getMessage());
        inquiry.setPayload(request.getPayload());
        inquiry.setSourcePage(request.getSourcePage());
        inquiry.setStatus(InquiryStatus.NEW);
        inquiry.setIpAddress(ipAddress);
        inquiry.setUserAgent(truncate(userAgent, 512));

        AttachmentStorageService.StoredAttachment attachment = attachmentStorageService.store(file);
        if (attachment != null) {
            inquiry.setAttachmentFilename(truncate(attachment.getOriginalFilename(), 255));
            inquiry.setAttachmentPath(attachment.getRelativePath());
            inquiry.setAttachmentContentType(truncate(attachment.getContentType(), 128));
        }

        inquiryMapper.insert(inquiry);
        return inquiry.getId();
    }

    /**
     * 后台分页查询，支持按 type / status 过滤
     */
    public IPage<InquiryResponse> page(long current, long size, InquiryType type, InquiryStatus status) {
        QueryWrapper<Inquiry> wrapper = new QueryWrapper<>();
        if (type != null) {
            wrapper.eq("type", type.name());
        }
        if (status != null) {
            wrapper.eq("status", status.name());
        }
        wrapper.orderByDesc("created_at");

        Page<Inquiry> page = new Page<>(current, size);
        IPage<Inquiry> result = inquiryMapper.selectPage(page, wrapper);

        List<InquiryResponse> records = result.getRecords().stream()
                .map(InquiryResponse::from)
                .collect(Collectors.toList());

        Page<InquiryResponse> converted = new Page<>(result.getCurrent(), result.getSize(), result.getTotal());
        converted.setRecords(records);
        return converted;
    }

    /**
     * 按 id 查询实体（后台下载附件用）
     */
    public Inquiry getById(Long id) {
        return inquiryMapper.selectById(id);
    }

    private String truncate(String s, int max) {
        if (!StringUtils.hasText(s)) {
            return null;
        }
        return s.length() > max ? s.substring(0, max) : s;
    }
}
