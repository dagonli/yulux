-- 询盘/表单提交表
CREATE TABLE inquiry (
    id           BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type         VARCHAR(32)  NOT NULL,
    name         VARCHAR(100) NOT NULL,
    email        VARCHAR(200) NOT NULL,
    company      VARCHAR(200) DEFAULT NULL,
    country      VARCHAR(100) DEFAULT NULL,
    message      TEXT,
    payload      TEXT,
    source_page  VARCHAR(200) DEFAULT NULL,
    status       VARCHAR(32)  NOT NULL DEFAULT 'NEW',
    ip_address   VARCHAR(64)  DEFAULT NULL,
    user_agent   VARCHAR(512) DEFAULT NULL,
    created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_type ON inquiry(type);
CREATE INDEX idx_status ON inquiry(status);
CREATE INDEX idx_created_at ON inquiry(created_at);
CREATE INDEX idx_email ON inquiry(email);

COMMENT ON TABLE inquiry IS '网站表单提交记录';
COMMENT ON COLUMN inquiry.id IS '主键';
COMMENT ON COLUMN inquiry.type IS '表单类型: QUOTE / LOGO / LIGHTBOX / CUSTOM_NEON';
COMMENT ON COLUMN inquiry.name IS '姓名';
COMMENT ON COLUMN inquiry.email IS '邮箱';
COMMENT ON COLUMN inquiry.company IS '公司名称';
COMMENT ON COLUMN inquiry.country IS '国家/地区';
COMMENT ON COLUMN inquiry.message IS '留言/项目描述';
COMMENT ON COLUMN inquiry.payload IS '各表单私有字段(JSON)';
COMMENT ON COLUMN inquiry.source_page IS '提交来源页面';
COMMENT ON COLUMN inquiry.status IS '处理状态: NEW / CONTACTED / CLOSED';
COMMENT ON COLUMN inquiry.ip_address IS '提交方IP';
COMMENT ON COLUMN inquiry.user_agent IS '浏览器UA';
COMMENT ON COLUMN inquiry.created_at IS '创建时间';

-- 站点图片配置表
CREATE TABLE site_image (
    id          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    image_key   VARCHAR(128) NOT NULL,
    url         VARCHAR(512) NOT NULL,
    alt_text    VARCHAR(255) DEFAULT NULL,
    updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX uk_image_key ON site_image(image_key);

COMMENT ON TABLE site_image IS '站点可配置图片';
COMMENT ON COLUMN site_image.id IS '主键';
COMMENT ON COLUMN site_image.image_key IS '图片位标识, 如 home.hero.background';
COMMENT ON COLUMN site_image.url IS '图片访问地址';
COMMENT ON COLUMN site_image.alt_text IS '替代文本';
COMMENT ON COLUMN site_image.updated_at IS '更新时间';
