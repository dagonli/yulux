package com.yulux.siteimage;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class SiteImageService {

    private final SiteImageMapper siteImageMapper;
    private final ImageUploadService imageUploadService;

    public SiteImageService(SiteImageMapper siteImageMapper, ImageUploadService imageUploadService) {
        this.siteImageMapper = siteImageMapper;
        this.imageUploadService = imageUploadService;
    }

    /**
     * 列出全部图片位（按 imageKey 排序）
     */
    public List<SiteImage> listAll() {
        QueryWrapper<SiteImage> wrapper = new QueryWrapper<>();
        wrapper.orderByAsc("image_key");
        return siteImageMapper.selectList(wrapper);
    }

    /**
     * 画廊成员（gallery_order 非空），按序返回；order 并列时按 id 稳定排序
     */
    public List<SiteImage> listGallery() {
        QueryWrapper<SiteImage> wrapper = new QueryWrapper<>();
        wrapper.isNotNull("gallery_order").orderByAsc("gallery_order", "id");
        return siteImageMapper.selectList(wrapper);
    }

    /**
     * 上传替换指定 key 的图片，转 WebP 后更新 url
     */
    public String replaceImage(String imageKey, MultipartFile file) throws IOException {
        SiteImage existing = getByKey(imageKey);
        if (existing == null) {
            throw new IllegalArgumentException("Unknown imageKey: " + imageKey);
        }
        String url = imageUploadService.storeAsWebp(imageKey, file);
        existing.setUrl(url);
        existing.setUpdatedAt(LocalDateTime.now());
        siteImageMapper.updateById(existing);
        return url;
    }

    /**
     * 新增画廊图：转 WebP 落盘后插入 site_image，排到画廊末尾。
     * image_key 直接取生成的 /uploads/ 路径（key == url）：
     * 1) SmartImage 在 site-images map 缺失时兜底 src=/uploads/... 经前端 rewrites 仍可加载；
     * 2) isReplaced()（url != key）对新图保持 false，不误显「已替换」。
     */
    @Transactional
    public SiteImage addToGallery(MultipartFile file, String altText) throws IOException {
        String uploadKey = "gallery-" + UUID.randomUUID().toString().substring(0, 8);
        String url = imageUploadService.storeAsWebp(uploadKey, file);

        List<SiteImage> current = listGallery();
        int nextOrder = current.isEmpty() ? 1 : current.get(current.size() - 1).getGalleryOrder() + 1;

        SiteImage row = new SiteImage();
        row.setImageKey(url);
        row.setUrl(url);
        row.setAltText(StringUtils.hasText(altText) ? altText.trim() : null);
        row.setGalleryOrder(nextOrder);
        try {
            siteImageMapper.insert(row);
        } catch (DuplicateKeyException e) {
            // UUID 前缀 + ms 时间戳下几乎不可能撞 key；兜底友好提示
            throw new IllegalStateException("Failed to add gallery image (key conflict), please retry");
        }
        return row;
    }

    /**
     * 移出画廊：仅将 gallery_order 置 NULL。行保留（共用图在其他页面的替换功能不受影响），
     * 也不删磁盘文件（与 replaceImage 的无清理策略一致）。
     */
    public void removeFromGallery(String imageKey) {
        SiteImage existing = getByKey(imageKey);
        if (existing == null) {
            throw new IllegalArgumentException("Unknown imageKey: " + imageKey);
        }
        // MyBatis-Plus updateById 默认忽略 null 字段，必须用 UpdateWrapper 显式置 NULL
        UpdateWrapper<SiteImage> wrapper = new UpdateWrapper<>();
        wrapper.eq("image_key", imageKey).set("gallery_order", null);
        siteImageMapper.update(null, wrapper);
    }

    public SiteImage getByKey(String imageKey) {
        QueryWrapper<SiteImage> wrapper = new QueryWrapper<>();
        wrapper.eq("image_key", imageKey);
        return siteImageMapper.selectOne(wrapper);
    }
}
