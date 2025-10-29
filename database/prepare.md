# 数据库环境准备

本项目支持 PostgreSQL 和 MySQL 两种数据库。本文档介绍这两种数据库的环境准备工作。

## PostgreSQL 环境准备

### 1. 安装 PostgreSQL

请自行安装 PostgreSQL 数据库。

### 2. 创建数据库

使用 postgres 超级用户登录 PostgreSQL 并创建 `nestjsx_crud` 数据库：

```sql
-- 连接到 PostgreSQL (使用 postgres 用户)
-- psql -U postgres -h 127.0.0.1

-- 创建数据库
CREATE DATABASE nestjsx_crud WITH ENCODING 'UTF8';

-- 查看数据库是否创建成功
\l
```

### 3. 配置 root 用户权限

确保 root 用户拥有 `nestjsx_crud` 数据库的所有权限，包括 public 模式的所有权限：

```sql
-- 创建 root 用户 (如果不存在)
CREATE USER root WITH PASSWORD 'root';

-- 将数据库所有权授予 root 用户
ALTER DATABASE nestjsx_crud OWNER TO root;

-- 连接到 nestjsx_crud 数据库
\c nestjsx_crud

-- 授予 root 用户对 public 模式的所有权限
GRANT ALL PRIVILEGES ON SCHEMA public TO root;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO root;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO root;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO root;

-- 设置默认权限，确保新创建的对象也授权给 root 用户
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO root;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO root;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON FUNCTIONS TO root;


```

### 4. 执行初始化操作

在项目根目录下执行以下命令来初始化数据库：

```bash
# 安装项目依赖
yarn install

# 构建项目 (必须先构建，否则会出现模块找不到的错误)
yarn build

# 准备 PostgreSQL 数据库 (删除现有表结构、同步表结构、运行种子数据)
yarn db:prepare:typeorm:postgres

# 或者分步执行：
# 1. 删除现有表结构
yarn db:drop:typeorm -d ./database/postgres.datasource

# 2. 同步表结构
yarn db:sync:typeorm -d ./database/postgres.datasource

# 3. 运行种子数据
yarn db:seeds:typeorm -d ./database/postgres.datasource
```

### 5. 运行测试

执行 PostgreSQL 相关的测试：

```bash
# 运行 PostgreSQL 测试
yarn test:postgres

# 运行所有数据库测试 (PostgreSQL + MySQL)
yarn test:all

# 运行测试并生成覆盖率报告
yarn test:coverage
```

## MySQL 环境准备

### 1. 安装 MySQL

请自行安装 MySQL 数据库。

### 2. 创建数据库

使用 root 用户登录 MySQL 并创建 `nestjsx_crud` 数据库：

```sql

-- 创建数据库
CREATE DATABASE nestjsx_crud CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 查看数据库是否创建成功
SHOW DATABASES;
```

### 3. 创建用户并授权

创建 `nestjsx_crud` 用户并赋予对 `nestjsx_crud` 数据库的所有权限：

```sql
-- 创建用户 (密码为 nestjsx_crud)
CREATE USER 'nestjsx_crud'@'%' IDENTIFIED BY 'nestjsx_crud';

-- 授予用户对 nestjsx_crud 数据库的所有权限
GRANT ALL PRIVILEGES ON nestjsx_crud.* TO 'nestjsx_crud'@'%';

-- 刷新权限
FLUSH PRIVILEGES;

-- 查看用户权限
SHOW GRANTS FOR 'nestjsx_crud'@'%';

```

### 4. 执行初始化操作

在项目根目录下执行以下命令来初始化数据库：

```bash
# 安装项目依赖
yarn install

# 构建项目 (必须先构建，否则会出现模块找不到的错误)
yarn build

# 准备 MySQL 数据库 (删除现有表结构、同步表结构、运行种子数据)
yarn db:prepare:typeorm:mysql

# 或者分步执行：
# 1. 删除现有表结构
yarn db:drop:typeorm -d ./database/mysql.datasource

# 2. 同步表结构
yarn db:sync:typeorm -d ./database/mysql.datasource

# 3. 运行种子数据
yarn db:seeds:typeorm -d ./database/mysql.datasource
```

### 5. 运行测试

执行 MySQL 相关的测试：

```bash
# 运行 MySQL 测试
yarn test:mysql

# 运行所有数据库测试 (PostgreSQL + MySQL)
yarn test:all

# 运行测试并生成覆盖率报告
yarn test:coverage
```

## 数据库配置信息

### PostgreSQL 配置信息

项目中的 PostgreSQL 数据库配置信息如下：

- **主机**: 127.0.0.1 (localhost)
- **端口**: 5432
- **数据库名**: nestjsx_crud
- **用户名**: root
- **密码**: root

### MySQL 配置信息

项目中的 MySQL 数据库配置信息如下：

- **主机**: 127.0.0.1 (localhost)
- **端口**: 3306
- **数据库名**: nestjsx_crud
- **用户名**: nestjsx_crud
- **密码**: nestjsx_crud

这些配置信息在 `database/config.ts` 文件中定义。

