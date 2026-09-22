# Yulux Sign 后端服务

存储网站表单提交（询盘）的 Spring Boot 服务。

## 技术栈

- Java 8
- Spring Boot 2.7.18
- MyBatis-Plus 3.5.5
- Flyway（数据库迁移）
- MySQL

## 前置准备

1. 安装并启动 MySQL（5.7+ 或 8.0，需支持 JSON 类型）
2. 创建数据库：

```sql
CREATE DATABASE yulux DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_general_ci;
```

表结构由 Flyway 在应用启动时自动创建（见 `src/main/resources/db/migration/V1__init.sql`），无需手动建表。

## 配置

通过环境变量覆盖默认配置（见 `application.yml`）：

| 环境变量 | 说明 | 默认值 |
|---|---|---|
| `DB_URL` | MySQL 连接串 | `jdbc:mysql://localhost:3306/yulux?...` |
| `DB_USERNAME` | 数据库用户名 | `root` |
| `DB_PASSWORD` | 数据库密码 | `root` |
| `SERVER_PORT` | 服务端口 | `8080` |
| `ADMIN_API_KEY` | 脚本调用 `/api/admin/**` 的密钥 | `dev-admin-key-change-me` |
| `ADMIN_USERNAME` | 后台登录用户名 | `admin` |
| `ADMIN_PASSWORD` | 后台登录密码 | `admin123` |
| `CORS_ALLOWED_ORIGINS` | 允许的前端来源（逗号分隔） | `http://localhost:3000` |
| `UPLOAD_DIR` | 上传图片本地存储目录 | `./uploads` |

生产环境务必覆盖 `ADMIN_API_KEY`、`ADMIN_USERNAME`、`ADMIN_PASSWORD` 和数据库密码。

## 运行

```bash
# 开发模式
mvn spring-boot:run

# 或打包后运行
mvn package -DskipTests
java -jar target/yulux-backend.jar
```

## API

### 提交表单（公开）

```
POST /api/inquiries
Content-Type: application/json

{
  "type": "QUOTE",          // QUOTE / LOGO / LIGHTBOX / CUSTOM_NEON
  "name": "John Doe",
  "email": "john@example.com",
  "company": "ACME",
  "country": "US",
  "message": "Need a custom neon sign",
  "payload": { "projectType": "Custom Neon Signs", "customerType": "Business" },
  "sourcePage": "/get-a-quote"
}
```

成功返回：`{ "ok": true, "data": { "id": 1 } }`
校验失败返回 400：`{ "ok": false, "error": "email is required" }`

### 查询提交记录（需 API Key）

```
GET /api/admin/inquiries?page=1&size=20&type=QUOTE&status=NEW
X-Api-Key: <ADMIN_API_KEY>
```

### 站点图片配置（公开，图片配置化地基）

```
GET /api/site-images
```

返回 `{ "ok": true, "data": { "/images/hero-background.webp": "/uploads/..." } }`（上传图统一返回相对路径，不写死域名，由前端负责代理/拼接）

## 后台管理（Thymeleaf）

浏览器访问（需 MySQL 已启动）：

| 地址 | 说明 |
|---|---|
| `http://localhost:8080/admin/login` | 登录（默认 `admin` / `admin123`） |
| `http://localhost:8080/admin/inquiries` | 询盘列表、筛选、详情 |
| `http://localhost:8080/admin/images` | 全站图片配置：上传即转 WebP、限宽 2000px |

上传的图片保存在 `UPLOAD_DIR`，通过 `/uploads/**` 访问（数据库里只存相对路径，不含域名）。前端 `web` 通过 `GET /api/site-images` 拉取映射，未替换的图回退到默认 `/images/*.webp`；`/uploads/**` 由 `web/next.config.ts` 的 rewrites 代理到 `NEXT_PUBLIC_API_URL`/`API_URL` 指向的后端，后台预览页则与后端同源直接加载。

## 本地联调验证

1. 启动 MySQL 并创建 `yulux` 库
2. 启动后端：`mvn spring-boot:run`
3. 用 curl 测试落库：

```bash
curl -X POST http://localhost:8080/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{"type":"QUOTE","name":"Test","email":"t@t.com","country":"US","message":"hi","payload":{"projectType":"Lightbox Signs"}}'
```

4. 查询确认：

```bash
curl http://localhost:8080/api/admin/inquiries -H "X-Api-Key: dev-admin-key-change-me"
```

5. 前端联调：`web/` 配置 `.env.local` 中 `NEXT_PUBLIC_API_URL=http://localhost:8080`，启动 `npm run dev`，在 `/get-a-quote` 提交表单，确认后端 `inquiry` 表新增记录。
