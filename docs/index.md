# VCMI Lib 文档

VCMI (Vampire's Curse Might & Magic Interface) 客户端核心库的完整API文档。

## 📚 文档概述

本项目包含了从 VCMI 项目中提取的客户端核心库代码分析，包括：

- **类帮助文档**: 详细介绍每个核心类的功能、依赖关系和重要函数
- **依赖关系分析**: 分析类和模块之间的依赖层级和关系图
- **模块功能概览**: 介绍各子目录的功能和作用

## 🎯 核心模块

### 战斗系统 (battle/)
- `BattleInfo`: 战斗信息管理
- `Unit`: 战斗单位抽象
- `DamageCalculator`: 伤害计算
- `BattleAction`: 战斗动作
- `CStackInstance`: 栈实例

### 实体系统 (entities/)
- `CHero`: 英雄实体
- `CArtifact`: 神器实体
- `CTown`: 城镇实体
- `CCreature`: 生物实体

### 奖励系统 (bonuses/)
- `Bonus`: 奖励/加成系统
- `BonusList`: 奖励列表管理
- `CBonusSystemNode`: 奖励系统节点

### 序列化系统 (serializer/)
- `Serializeable`: 序列化标记基类
- `CSerializer`: 序列化器基类和工具

### 地图对象 (mapObjects/)
- `CGObjectInstance`: 地图对象实例基类

### 其他核心系统
- **网络系统** (network/): 网络通信
- **序列化系统** (serializer/): 数据序列化
- **文件系统** (filesystem/): 文件操作
- **路径寻找** (pathfinder/): AI路径计算

## 📖 快速开始

选择左侧导航栏中的类别开始浏览：

- [**类帮助**](./classes/) - 查看具体类的详细文档
- [**依赖关系**](./dependencies/) - 了解模块间的依赖关系
- [**模块概览**](./modules-overview/) - 了解各模块功能

## 🔗 相关链接

- [VCMI 主页](https://vcmi.eu/)
- [VCMI GitHub](https://github.com/vcmi/vcmi)
- [VCMI 论坛](https://forum.vcmi.eu/)