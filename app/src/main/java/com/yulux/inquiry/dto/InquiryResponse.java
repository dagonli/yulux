package com.yulux.inquiry.dto;

import com.yulux.inquiry.Inquiry;
import com.yulux.inquiry.InquiryStatus;
import com.yulux.inquiry.InquiryType;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * 后台列表展示用响应
 */
@Data
public class InquiryResponse {

    private Long id;
    private InquiryType type;
    private String name;
    private String email;
    private String company;
    private String country;
    private String phone;
    private String address;
    private String message;
    private Map<String, Object> payload;
    private String sourcePage;
    private InquiryStatus status;
    private String attachmentFilename;
    private String attachmentPath;
    private String attachmentContentType;
    private LocalDateTime createdAt;

    public static InquiryResponse from(Inquiry inquiry) {
        InquiryResponse r = new InquiryResponse();
        r.setId(inquiry.getId());
        r.setType(inquiry.getType());
        r.setName(inquiry.getName());
        r.setEmail(inquiry.getEmail());
        r.setCompany(inquiry.getCompany());
        r.setCountry(inquiry.getCountry());
        r.setPhone(inquiry.getPhone());
        r.setAddress(inquiry.getAddress());
        r.setMessage(inquiry.getMessage());
        r.setPayload(inquiry.getPayload());
        r.setSourcePage(inquiry.getSourcePage());
        r.setStatus(inquiry.getStatus());
        r.setAttachmentFilename(inquiry.getAttachmentFilename());
        r.setAttachmentPath(inquiry.getAttachmentPath());
        r.setAttachmentContentType(inquiry.getAttachmentContentType());
        r.setCreatedAt(inquiry.getCreatedAt());
        return r;
    }
}
