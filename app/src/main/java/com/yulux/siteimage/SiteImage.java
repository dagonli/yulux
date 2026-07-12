package com.yulux.siteimage;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 站点可配置图片
 */
@Data
@TableName("site_image")
public class SiteImage {

    @TableId(type = IdType.AUTO)
    private Long id;

    /** 图片位标识, 如 home.hero.background */
    private String imageKey;

    private String url;

    private String altText;

    private LocalDateTime updatedAt;
}
