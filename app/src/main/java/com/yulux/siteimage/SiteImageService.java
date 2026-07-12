package com.yulux.siteimage;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

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

    public SiteImage getByKey(String imageKey) {
        QueryWrapper<SiteImage> wrapper = new QueryWrapper<>();
        wrapper.eq("image_key", imageKey);
        return siteImageMapper.selectOne(wrapper);
    }
}
