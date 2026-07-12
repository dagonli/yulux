/**
 * 批量图片压缩脚本
 * 1. 将 public/images 下所有 PNG/JPG 转换为 WebP（质量 82，最宽 2000px）
 * 2. 删除原始文件
 * 3. 批量替换 content/、components/、app/ 中的图片路径引用
 *
 * 运行：node scripts/compress-images.mjs
 */

import sharp from "sharp";
import { readdir, stat, unlink, readFile, writeFile } from "fs/promises";
import { join, extname, basename, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const IMG_DIR = join(ROOT, "public/images");
const WEBP_QUALITY = 82;
const MAX_WIDTH = 2000;

// 需要扫描并替换图片路径的源码目录
const SRC_DIRS = ["content", "components", "app", "lib"];
const SRC_EXTS = [".ts", ".tsx", ".js", ".jsx"];

// ──────────────────────────────────────────────
// 1. 递归扫描图片目录
// ──────────────────────────────────────────────
async function walkImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walkImages(full)));
    else if (/\.(png|jpg|jpeg)$/i.test(e.name)) files.push(full);
  }
  return files;
}

// ──────────────────────────────────────────────
// 2. 递归扫描源码文件
// ──────────────────────────────────────────────
async function walkSrc(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    if (e.name === "node_modules" || e.name === ".next") continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walkSrc(full)));
    else if (SRC_EXTS.includes(extname(e.name))) files.push(full);
  }
  return files;
}

// ──────────────────────────────────────────────
// 3. 单张图片转 WebP
// ──────────────────────────────────────────────
async function convertToWebp(filePath) {
  const outPath = filePath.replace(/\.(png|jpg|jpeg)$/i, ".webp");
  const { size: before } = await stat(filePath);

  await sharp(filePath)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(outPath);

  const { size: after } = await stat(outPath);
  await unlink(filePath); // 删除原文件

  const kb = (n) => Math.round(n / 1024);
  const pct = (((before - after) / before) * 100).toFixed(1);
  console.log(`  ✓ ${basename(filePath).padEnd(50)} ${kb(before)}KB → ${kb(after)}KB  -${pct}%`);
  return { before, after };
}

// ──────────────────────────────────────────────
// 4. 替换源码中的图片引用
// ──────────────────────────────────────────────
async function updateRefs(srcFiles, convertedExts) {
  let totalReplaced = 0;
  for (const file of srcFiles) {
    let content = await readFile(file, "utf-8");
    let changed = false;
    for (const ext of convertedExts) {
      const newContent = content.replace(
        new RegExp(`\\.${ext}(?=['"\`])`, "gi"),
        ".webp"
      );
      if (newContent !== content) {
        content = newContent;
        changed = true;
      }
    }
    if (changed) {
      await writeFile(file, content, "utf-8");
      totalReplaced++;
      console.log(`  ↻ ${file.replace(ROOT, "")}`);
    }
  }
  return totalReplaced;
}

// ──────────────────────────────────────────────
// main
// ──────────────────────────────────────────────
async function main() {
  console.log("━━━ 步骤 1/3：扫描图片 ━━━\n");
  const imgFiles = await walkImages(IMG_DIR);
  console.log(`找到 ${imgFiles.length} 张待压缩图片\n`);

  console.log("━━━ 步骤 2/3：压缩并转换为 WebP ━━━\n");
  let totalBefore = 0;
  let totalAfter = 0;
  for (const f of imgFiles) {
    try {
      const { before, after } = await convertToWebp(f);
      totalBefore += before;
      totalAfter += after;
    } catch (err) {
      console.error(`  ✗ 失败: ${f} — ${err.message}`);
    }
  }
  const MB = (n) => (n / 1024 / 1024).toFixed(1);
  console.log(`\n  📊 压缩前: ${MB(totalBefore)} MB → 压缩后: ${MB(totalAfter)} MB，节省 ${MB(totalBefore - totalAfter)} MB (${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%)\n`);

  console.log("━━━ 步骤 3/3：更新源码引用 ━━━\n");
  const srcFiles = (
    await Promise.all(SRC_DIRS.map((d) => walkSrc(join(ROOT, d)).catch(() => [])))
  ).flat();
  const n = await updateRefs(srcFiles, ["png", "jpg", "jpeg"]);
  console.log(`\n  ↻ 共更新 ${n} 个文件中的图片引用\n`);

  console.log("━━━ 完成 ✅ ━━━");
  console.log("  所有图片已转换为 WebP，源码引用已同步更新。");
  console.log("  请运行 npm run build 验证构建仍然正常。");
}

main().catch(console.error);
