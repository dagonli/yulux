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

# 如果有固定的 ngrok 域名，可以取消下面的注释并修改
# $env:PUBLIC_BASE_URL = "https://你的ngrok地址.ngrok-free.app"

Write-Host "============================================" -ForegroundColor Green
Write-Host "  启动后端（公网访问模式）" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Frontend Base URL: $env:FRONTEND_BASE_URL" -ForegroundColor Cyan
Write-Host "CORS Origins:      $env:CORS_ALLOWED_ORIGINS" -ForegroundColor Cyan
if ($env:PUBLIC_BASE_URL) {
    Write-Host "Public Base URL:   $env:PUBLIC_BASE_URL" -ForegroundColor Cyan
}
Write-Host ""

# 启动服务
mvn spring-boot:run
