# 启动后端（公网访问模式）
# 用于 ngrok 暴露后端时，配置正确的前端地址和 CORS 白名单
# 使用方式: .\start-public.ps1

# 清理可能残留的数据库环境变量
Remove-Item Env:\DB_PASSWORD -ErrorAction SilentlyContinue
Remove-Item Env:\DB_USERNAME -ErrorAction SilentlyContinue
Remove-Item Env:\DB_URL -ErrorAction SilentlyContinue

# 设置公网访问配置
$env:FRONTEND_BASE_URL = "https://yulux.vercel.app"
$env:CORS_ALLOWED_ORIGINS = "https://yulux.vercel.app,http://localhost:3000"

# 注意：上传图片的 URL 不再需要 PUBLIC_BASE_URL。
# 后端只存相对路径（/uploads/xxx.webp），前台站点通过 Next.js rewrites
# 把 /uploads/** 代理到后端（取决于前端构建时配置的 NEXT_PUBLIC_API_URL），
# 后台预览页与本服务同源，两边都不需要在后端写死域名。

Write-Host "============================================" -ForegroundColor Green
Write-Host "  启动后端（公网访问模式）" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Frontend Base URL: $env:FRONTEND_BASE_URL" -ForegroundColor Cyan
Write-Host "CORS Origins:      $env:CORS_ALLOWED_ORIGINS" -ForegroundColor Cyan
Write-Host ""

# 启动服务
mvn spring-boot:run
