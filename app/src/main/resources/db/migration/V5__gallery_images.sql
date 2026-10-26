-- 画廊动态管理 + 补录跨页面共用图片位
-- 1) 补录 17 个前端已在使用但未入库的图片位（image_key 即前端 SmartImage 引用的原始路径，
--    注意 lightbox/icons 为 .png、projects 为 .jpg，必须与前端逐字符一致）
INSERT INTO site_image (image_key, url) VALUES
('/images/projects/project-led-2.jpg',     '/images/projects/project-led-2.jpg'),
('/images/projects/project-neon-8-1.jpg',  '/images/projects/project-neon-8-1.jpg'),
('/images/projects/project-neon-12.jpg',   '/images/projects/project-neon-12.jpg'),
('/images/projects/project-led-5.jpg',     '/images/projects/project-led-5.jpg'),
('/images/projects/project-jelly.jpg',     '/images/projects/project-jelly.jpg'),
('/images/projects/project-3d-relief.jpg', '/images/projects/project-3d-relief.jpg'),
('/images/lightbox/yulux_lightbox_frameless.png',  '/images/lightbox/yulux_lightbox_frameless.png'),
('/images/lightbox/yulux_macro_shapes.png',       '/images/lightbox/yulux_macro_shapes.png'),
('/images/lightbox/yulux_macro_materials.png',    '/images/lightbox/yulux_macro_materials.png'),
('/images/lightbox/yulux_macro_illumination.png', '/images/lightbox/yulux_macro_illumination.png'),
('/images/icons/yulux_icon_neon_flex.png', '/images/icons/yulux_icon_neon_flex.png'),
('/images/icons/yulux_icon_acrylic.png',   '/images/icons/yulux_icon_acrylic.png'),
('/images/icons/yulux_icon_safety.png',    '/images/icons/yulux_icon_safety.png'),
('/images/icons/yulux_icon_quality.png',   '/images/icons/yulux_icon_quality.png'),
('/images/icons/yulux_icon_shipping.png',  '/images/icons/yulux_icon_shipping.png'),
('/images/icons/yulux_icon_response.png',  '/images/icons/yulux_icon_response.png'),
('/images/icons/yulux_icon_warranty.png',  '/images/icons/yulux_icon_warranty.png');

-- 2) 画廊排序列（NULL = 不在画廊页；后管「添加」= max+1 追加到末尾，「移除」= 置回 NULL）
ALTER TABLE site_image
    ADD COLUMN gallery_order INT NULL COMMENT '画廊排序(1起), NULL=不在画廊页, 新图追加到末尾' AFTER alt_text,
    ADD KEY idx_gallery_order (gallery_order);

-- 3) 初始画廊 12 张，顺序 = 前端 content/gallery.ts 静态列表去重保首现的顺序
--    （6 张 projects + image3, image5, image1, image4, image2, image6；
--    原列表 14 项中 image2/image5 各重复出现 2 次，按产品要求去重）
UPDATE site_image SET gallery_order = 1  WHERE image_key = '/images/projects/project-led-2.jpg';
UPDATE site_image SET gallery_order = 2  WHERE image_key = '/images/projects/project-neon-8-1.jpg';
UPDATE site_image SET gallery_order = 3  WHERE image_key = '/images/projects/project-neon-12.jpg';
UPDATE site_image SET gallery_order = 4  WHERE image_key = '/images/projects/project-led-5.jpg';
UPDATE site_image SET gallery_order = 5  WHERE image_key = '/images/projects/project-jelly.jpg';
UPDATE site_image SET gallery_order = 6  WHERE image_key = '/images/projects/project-3d-relief.jpg';
UPDATE site_image SET gallery_order = 7  WHERE image_key = '/images/image3.webp';
UPDATE site_image SET gallery_order = 8  WHERE image_key = '/images/image5.webp';
UPDATE site_image SET gallery_order = 9  WHERE image_key = '/images/image1.webp';
UPDATE site_image SET gallery_order = 10 WHERE image_key = '/images/image4.webp';
UPDATE site_image SET gallery_order = 11 WHERE image_key = '/images/image2.webp';
UPDATE site_image SET gallery_order = 12 WHERE image_key = '/images/image6.webp';
