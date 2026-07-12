-- 询盘/表单提交表
CREATE TABLE inquiry (
    id           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
    type         VARCHAR(32)  NOT NULL COMMENT '表单类型: QUOTE / LOGO / LIGHTBOX / CUSTOM_NEON',
    name         VARCHAR(100) NOT NULL COMMENT '姓名',
    email        VARCHAR(200) NOT NULL COMMENT '邮箱',
    company      VARCHAR(200) DEFAULT NULL COMMENT '公司名称',
    country      VARCHAR(100) DEFAULT NULL COMMENT '国家/地区',
    message      TEXT COMMENT '留言/项目描述',
    payload      JSON COMMENT '各表单私有字段(JSON)',
    source_page  VARCHAR(200) DEFAULT NULL COMMENT '提交来源页面',
    status       VARCHAR(32)  NOT NULL DEFAULT 'NEW' COMMENT '处理状态: NEW / CONTACTED / CLOSED',
    ip_address   VARCHAR(64)  DEFAULT NULL COMMENT '提交方IP',
    user_agent   VARCHAR(512) DEFAULT NULL COMMENT '浏览器UA',
    created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    KEY idx_type (type),
    KEY idx_status (status),
    KEY idx_created_at (created_at),
    KEY idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='网站表单提交记录';

-- 站点图片配置表（图片配置化地基，本期只建表 + 读API）
CREATE TABLE site_image (
    id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
    image_key   VARCHAR(128) NOT NULL COMMENT '图片位标识, 如 home.hero.background',
    url         VARCHAR(512) NOT NULL COMMENT '图片访问地址',
    alt_text    VARCHAR(255) DEFAULT NULL COMMENT '替代文本',
    updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_image_key (image_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='站点可配置图片';
