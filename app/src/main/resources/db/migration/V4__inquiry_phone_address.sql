-- 询盘新增联系电话与收货地址字段
-- 注意：H2 不支持单条 ALTER TABLE 逗号分隔加多列，需逐列添加
ALTER TABLE inquiry ADD COLUMN phone VARCHAR(50) DEFAULT NULL;
ALTER TABLE inquiry ADD COLUMN address VARCHAR(500) DEFAULT NULL;

COMMENT ON COLUMN inquiry.phone IS '联系电话';
COMMENT ON COLUMN inquiry.address IS '收货地址';
