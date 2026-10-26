-- 询盘附件（报价上传的图片 / PDF / 设计稿等）
ALTER TABLE inquiry ADD COLUMN attachment_filename VARCHAR(255) DEFAULT NULL COMMENT '附件原始文件名';
ALTER TABLE inquiry ADD COLUMN attachment_path VARCHAR(512) DEFAULT NULL COMMENT '附件在 uploads 目录下的相对路径';
ALTER TABLE inquiry ADD COLUMN attachment_content_type VARCHAR(128) DEFAULT NULL COMMENT '附件 MIME 类型';
