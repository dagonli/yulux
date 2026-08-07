package com.yulux.inquiry;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * 网站表单提交记录
 */
@Data
@TableName(value = "inquiry", autoResultMap = true)
public class Inquiry {

    @TableId(type = IdType.AUTO)
    private Long id;

    /** 表单类型 */
    private InquiryType type;

    private String name;

    private String email;

    private String company;

    private String country;

    private String message;

    /** 各表单私有字段，JSON 存储 */
    @TableField(typeHandler = JacksonTypeHandler.class)
    private Map<String, Object> payload;

    private String sourcePage;

    private InquiryStatus status;

    private String ipAddress;

    private String userAgent;

    /** 附件原始文件名 */
    private String attachmentFilename;

    /** 附件在 uploads 目录下的相对路径 */
    private String attachmentPath;

    /** 附件 MIME 类型 */
    private String attachmentContentType;

    private LocalDateTime createdAt;
}
