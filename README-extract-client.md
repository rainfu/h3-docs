# VCMI 客户端文件提取工具

这个工具用于从VCMI项目中提取客户端相关的C++源文件和头文件，帮助开发者分离出单客户端的代码。

## 功能特点

- 自动识别客户端相关文件
- 保持原始目录结构
- 支持排除构建文件和无关文件
- 提供详细的统计信息

## 提取的文件类型

### 主要客户端目录
- `client/` - 核心客户端代码
- `clientapp/` - 客户端应用程序入口
- `vcmiqt/` - Qt相关客户端代码

### 共享库目录（客户端使用）
- `lib/battle/` - 战斗系统
- `lib/bonuses/` - 奖励系统
- `lib/callback/` - 回调接口
- `lib/constants/` - 常量定义
- `lib/entities/` - 实体系统
- `lib/events/` - 事件系统
- `lib/filesystem/` - 文件系统
- `lib/gameState/` - 游戏状态
- `lib/json/` - JSON处理
- `lib/logging/` - 日志系统
- `lib/mapObjects/` - 地图对象
- `lib/modding/` - 模组系统
- `lib/network/` - 网络系统
- `lib/networkPacks/` - 网络包
- `lib/pathfinder/` - 路径查找
- `lib/rmg/` - 随机地图生成
- `lib/serializer/` - 序列化
- `lib/spells/` - 法术系统
- `lib/texts/` - 文本处理
- `lib/vstd/` - 标准库扩展

## 使用方法

### 安装依赖

```bash
npm install
```

### 运行提取

```bash
# 基本用法
npm run extract-client -- ../vcmi ./vcmi-client

# 或者直接使用ts-node
npx ts-node extract-client.ts ../vcmi ./vcmi-client
```

### 参数说明

- `sourceDir`: VCMI项目根目录路径（必需）
- `targetDir`: 输出目录路径（可选，默认为 `./vcmi-client`）

### 示例

```bash
# 提取到当前目录的 vcmi-client 文件夹
npm run extract-client -- /path/to/vcmi

# 提取到指定目录
npm run extract-client -- /path/to/vcmi /path/to/output/client-only
```

## 输出结构

提取后的文件将保持相对路径结构，例如：

```
vcmi-client/
├── client/
│   ├── Client.cpp
│   ├── Client.h
│   └── ...
├── clientapp/
│   ├── EntryPoint.cpp
│   └── ...
├── lib/
│   ├── battle/
│   ├── bonuses/
│   └── ...
└── vcmiqt/
    ├── jsonutils.cpp
    └── ...
```

## 排除的文件

工具会自动排除以下类型的文件：

- 构建文件（`CMakeFiles/`、`*.cmake`等）
- 编译产物（`*.o`、`*.a`、`*.so`、`*.dll`、`*.exe`）
- 版本控制文件（`.git/`）
- Node.js文件（`node_modules/`）

## 统计信息

运行完成后会显示详细的统计信息：

- 总文件数
- C++文件数量
- 头文件数量
- 其他文件数量
- 复制的文件数
- 跳过的文件数

## 注意事项

1. 确保VCMI项目路径正确
2. 输出目录会被清空后重新创建
3. 提取的文件仅包含客户端相关的代码，不包含服务器或AI相关的代码
4. 提取的代码可能依赖于VCMI的其他组件，需要相应调整

## 技术栈

- TypeScript
- Node.js
- fs/path (内置模块)