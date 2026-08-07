-- 询盘附件（报价上传的图片 / PDF / 设计稿等）
ALTER TABLE inquiry
    ADD COLUMN attachment_filename     VARCHAR(255) DEFAULT NULL,
    ADD COLUMN attachment_path         VARCHAR(512) DEFAULT NULL,
    ADD COLUMN attachment_content_type VARCHAR(128) DEFAULT NULL;

COMMENT ON COLUMN inquiry.attachment_filename     IS '附件原始文件名';
COMMENT ON COLUMN inquiry.attachment_path         IS '附件在 uploads 目录下的相对路径';
COMMENT ON COLUMN inquiry.attachment_content_type IS '附件 MIME 类型';
