-- 商业标识页 Heavy-Duty Protection 区第 2 卡（Free 1:1 Installation Template）
-- 补建槽位行：该卡前端原为硬编码 SVG 占位（无默认图），接入后管替换后补 seed 行。
-- url = 默认图路径（与 V2 裸路径 seed 口径一致：isReplaced() 判 url != meta.imageKey，
-- 此时相等即「默认图」态）；上传替换后 url 更新为 /uploads/xxx.webp。
INSERT INTO site_image (image_key, url) VALUES
('channel-letters-logistics::/images/product-whats-in-box.webp', '/images/product-whats-in-box.webp');
