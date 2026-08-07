package com.yulux.inquiry;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

/**
 * 询盘附件存储：原样保存上传文件（图片 / PDF / AI / DXF 等），不做压缩或转码。
 * 落盘到 {upload-dir}/inquiries/ 子目录，文件名脱敏 + 时间戳防覆盖。
 */
@Service
public class AttachmentStorageService {

    /** 询盘附件在 upload-dir 下的子目录 */
    private static final String SUB_DIR = "inquiries";

    @Value("${yulux.upload-dir}")
    private String uploadDir;

    /**
     * 保存附件，返回存储结果；未选择文件时返回 null。
     */
    public StoredAttachment store(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            return null;
        }

        String originalFilename = StringUtils.hasText(file.getOriginalFilename())
                ? file.getOriginalFilename()
                : "attachment";
        String extension = extractExtension(originalFilename);
        String baseName = sanitize(stripExtension(originalFilename));

        Path dir = Paths.get(uploadDir).resolve(SUB_DIR);
        Files.createDirectories(dir);

        String storedName = baseName + "-" + System.currentTimeMillis() + extension;
        Path target = dir.resolve(storedName);
        try (InputStream in = file.getInputStream()) {
            Files.copy(in, target, StandardCopyOption.REPLACE_EXISTING);
        }

        // 相对 upload-dir 的路径，供后续拼接访问地址
        String relativePath = SUB_DIR + "/" + storedName;
        String contentType = StringUtils.hasText(file.getContentType())
                ? file.getContentType()
                : "application/octet-stream";
        return new StoredAttachment(originalFilename, relativePath, contentType);
    }

    private String extractExtension(String filename) {
        int dot = filename.lastIndexOf('.');
        if (dot < 0 || dot == filename.length() - 1) {
            return "";
        }
        // 仅保留安全扩展名，防止路径注入
        String ext = filename.substring(dot);
        return ext.replaceAll("[^a-zA-Z0-9.]", "");
    }

    private String stripExtension(String filename) {
        int dot = filename.lastIndexOf('.');
        return dot > 0 ? filename.substring(0, dot) : filename;
    }

    private String sanitize(String name) {
        String cleaned = name.replaceAll("[^a-zA-Z0-9._-]", "-");
        return cleaned.isEmpty() ? "attachment" : cleaned;
    }

    /**
     * 一次保存的附件元信息
     */
    public static class StoredAttachment {
        private final String originalFilename;
        private final String relativePath;
        private final String contentType;

        public StoredAttachment(String originalFilename, String relativePath, String contentType) {
            this.originalFilename = originalFilename;
            this.relativePath = relativePath;
            this.contentType = contentType;
        }

        public String getOriginalFilename() {
            return originalFilename;
        }

        public String getRelativePath() {
            return relativePath;
        }

        public String getContentType() {
            return contentType;
        }
    }
}
