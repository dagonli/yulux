# syntax=docker/dockerfile:1

# ---- 构建阶段 ----
FROM maven:3.9-eclipse-temurin-8 AS builder
WORKDIR /app
COPY pom.xml .
# 依赖缓存层：pom 未变时跳过重新下载（go-offline 覆盖不全时降级放行）
RUN mvn dependency:go-offline || true
COPY src ./src
RUN mvn clean package -Dmaven.test.skip=true

# ---- 运行阶段 ----
FROM eclipse-temurin:8-jre
WORKDIR /app
COPY --from=builder /app/target/yulux-backend.jar app.jar
EXPOSE 8080
# JAVA_OPTS 由 compose 注入（如 -Xmx512m）；exec 保证 java 为 PID 1，正确接收 SIGTERM 优雅停机
ENTRYPOINT ["sh", "-c", "exec java $JAVA_OPTS -jar app.jar"]
