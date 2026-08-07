-- 询盘附件（报价上传的图片 / PDF / 设计稿等）
-- 注意：H2 不支持单条 ALTER TABLE 逗号分隔加多列，需逐列添加
ALTER TABLE inquiry ADD COLUMN attachment_filename VARCHAR(255) DEFAULT NULL;
ALTER TABLE inquiry ADD COLUMN attachment_path VARCHAR(512) DEFAULT NULL;
ALTER TABLE inquiry ADD COLUMN attachment_content_type VARCHAR(128) DEFAULT NULL;

COMMENT ON COLUMN inquiry.attachment_filename IS '附件原始文件名';
COMMENT ON COLUMN inquiry.attachment_path IS '附件在 uploads 目录下的相对路径';
COMMENT ON COLUMN inquiry.attachment_content_type IS '附件 MIME 类型';
