# 本地开发与正式部署

## 固定架构

- 本地开发：本机 Supabase（本地 PostgreSQL），只保存测试数据。
- 正式部署：云端 Supabase PostgreSQL，只保存真实客户数据。
- 代码仓库：GitHub `main` 分支。
- 网站部署：Codex Sites 读取通过验证的仓库版本，运行变量在 Sites 中单独配置。

本地和正式环境使用相同的 SQL 迁移文件，但绝不共用数据库地址和密钥。

## 第一次准备本地数据库

1. 安装并启动 Docker Desktop。
2. 在项目目录运行 `pnpm db:local:setup`。
3. 脚本会启动本地 Supabase、执行 `supabase/migrations` 中的迁移，并生成不会进入 Git 的 `.env.local`。
4. 运行 `pnpm dev` 开始本地开发。

本地管理界面是 `http://127.0.0.1:54323`。

Navicat 使用 PostgreSQL 连接：

- 主机：`127.0.0.1`
- 端口：`54322`
- 数据库：`postgres`
- 用户：`postgres`
- 密码：`postgres`

## 日常数据库修改

1. 创建迁移：`pnpm supabase migration new change_name`。
2. 只在新生成的 SQL 文件中写增量修改，不修改已经上线的旧迁移。
   新表和新函数必须继续只向 `service_role` 授予服务器访问权限。
3. 本地验证：`pnpm db:local:reset`。该命令只清空本地测试库。
4. 提交源码和迁移到 GitHub。
5. 上线前备份正式数据库，再把同一批迁移应用到正式库。
6. 部署新的应用版本，继续连接原正式数据库。

不要对正式数据库运行 `db:local:reset`，也不要在正式迁移中使用 `DROP TABLE` 或 `TRUNCATE`。

## GitHub 发布流程

1. 在本地完成开发和测试。
2. 提交到功能分支并推送 GitHub。
3. GitHub 自动执行类型检查、代码检查和正式构建。
4. 验证通过后合并到 `main`。
5. 从 `main` 创建新的 Codex Sites 版本并部署。

代码部署只替换应用，不会删除或重建正式 PostgreSQL 数据库。

## 正式环境变量

以下值只配置在 Codex Sites，不写入 GitHub：

- `APP_ENVIRONMENT=production`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DATABASE_URL`（仅数据库迁移任务需要）
- `ADMIN_SETUP_SECRET`
- `SESSION_SECRET`
- `APP_ORIGIN`
