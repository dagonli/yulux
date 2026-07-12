package com.yulux.inquiry.dto;

import com.yulux.inquiry.InquiryType;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Map;

/**
 * 前端表单提交请求体
 */
@Data
public class InquiryRequest {

    @NotNull(message = "type is required")
    private InquiryType type;

    @NotBlank(message = "name is required")
    @Size(max = 100, message = "name too long")
    private String name;

    @NotBlank(message = "email is required")
    @Email(message = "invalid email")
    @Size(max = 200, message = "email too long")
    private String email;

    @Size(max = 200, message = "company too long")
    private String company;

    @Size(max = 100, message = "country too long")
    private String country;

    private String message;

    /** 各表单私有字段 */
    private Map<String, Object> payload;

    @Size(max = 200, message = "sourcePage too long")
    private String sourcePage;
}
