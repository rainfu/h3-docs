# VCMI LOD 资产提取器

一个用于从VCMI LOD档案文件中提取资产的TypeScript工具。

## 功能特性

- **格式过滤**：支持按文件格式过滤（def、msk等）
- **批量处理**：自动处理LOD档案中的所有文件
- **错误恢复**：单个文件出错时继续处理其他文件
- **目录管理**：自动清空输出目录，避免文件积累
- **组织输出**：按格式类型将文件组织到对应子目录

## 支持的格式

- **DEF**：精灵图定义文件，提取元数据并保存为JSON格式
- **MSK**：16位遮罩文件，转换为8位灰度PNG格式
- **其他格式**：LOD、SND、VID等（目前跳过处理）

## 使用方法

```bash
# 提取DEF格式文件
npx ts-node vcmi-lod-extractor.ts "path/to/archive.lod" "output/directory" --format def

# 提取MSK格式文件
npx ts-node vcmi-lod-extractor.ts "path/to/archive.lod" "output/directory" --format msk
```

## 参数说明

- `archive.lod`：VCMI LOD档案文件路径
- `output/directory`：输出目录路径
- `--format`：必需参数，指定要提取的文件格式（def、msk等）

## 输出结构

```
output/
├── def/          # DEF文件和对应的JSON元数据
├── msk/          # MSK转换后的PNG文件
├── images/       # 其他图片格式
├── audios/       # 音频文件
├── videos/       # 视频文件
└── other/        # 其他文件
```

## DEF文件处理

对于DEF文件，工具会：
1. 保存原始DEF文件
2. 提取元数据（类型、尺寸、调色板等）并保存为JSON格式
3. 目前PNG图像生成功能暂时禁用（需要进一步的RLE解压缩实现）

## MSK文件处理

对于MSK文件，工具会：
1. 读取16位MSK数据
2. 转换为8位灰度图像
3. 保存为PNG格式

## 错误处理

- 单个文件处理失败时会记录错误并继续处理其他文件
- 当错误数量达到10个时，程序会停止执行
- 每次运行前会自动清空输出目录

## 依赖项

- Node.js
- TypeScript
- Sharp (图像处理)
- zlib (解压缩)

## 安装依赖

```bash
npm install
```

## 构建

```bash
npm run build
```

---

# VCMI Lib API 文档

## 📖 文档概述

本项目还包含了 VCMI 客户端核心库的完整 API 文档，使用 VitePress 生成。

### 文档内容

- **类帮助文档**: 详细介绍每个核心类的功能、依赖关系和重要函数
- **依赖关系分析**: 分析类和模块之间的依赖层级和关系图

### 核心模块文档

#### 战斗系统 (battle/)
- `BattleInfo`: 战斗信息管理
- `Unit`: 战斗单位抽象
- `DamageCalculator`: 伤害计算

#### 实体系统 (entities/)
- `CHero`: 英雄实体

#### 奖励系统 (bonuses/)
- `Bonus`: 奖励/加成系统

#### 游戏状态 (gameState/)
- `CGameState`: 游戏状态管理

## 🚀 文档使用方法

### 启动文档服务器

```bash
npm run docs:dev
```

文档将在 `http://localhost:5173` 上运行。

### 构建静态文档

```bash
npm run docs:build
```

### 预览构建结果

```bash
npm run docs:preview
```

## 📂 文档结构

```
docs/
├── index.md                  # 首页
├── classes/                  # 类文档
│   ├── index.md             # 类文档索引
│   ├── battle/              # 战斗系统类
│   ├── entities/            # 实体系统类
│   ├── bonuses/             # 奖励系统类
│   └── gameState/           # 游戏状态类
└── dependencies/            # 依赖关系分析
```

## 🔧 开发工具

### 代码提取器

- **LOD 资源提取器**: 从 VCMI LOD 文件中提取游戏资源
- **客户端代码提取器**: 从完整 VCMI 项目中提取客户端相关代码

### 使用方法

```bash
# 提取 LOD 资源
npm run extract

# 提取客户端代码
npm run extract-client
```