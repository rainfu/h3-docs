# CMap

地图类，VCMI游戏地图的核心数据结构，包含所有地图元素和对象。

## 概述

`CMap` 是VCMI中地图的核心类，继承自 `CMapHeader` 和 `GameCallbackHolder`。它包含了地图的所有数据：地形、对象、英雄、城镇、神器实例等，是游戏世界的完整表示。

## 主要属性
- `objects`: 地图上所有对象的中央列表
- `artInstances`: 地图上所有神器实例
- `heroesPool`: 英雄池（未在地图上但可招募的英雄）
- `towns`: 城镇索引列表
- `heroesOnMap`: 地图上英雄索引列表
- `gameSettings`: 游戏设置

## 核心方法
- `TerrainTile & getTile(const int3 & tile)`: 获取指定位置的地形瓦片
- `bool isInTheMap(const int3 & pos) const`: 检查位置是否在地图内
- `void addNewObject(...)`: 向地图添加新对象
- `void moveObject(...)`: 移动地图对象
- `CGObjectInstance * getObject(...)`: 获取指定ID的对象
- `CArtifactInstance * createArtifact(...)`: 创建神器实例
- `void addToHeroPool(...)`: 添加英雄到英雄池

## 依赖关系
- 继承：`CMapHeader`, `GameCallbackHolder`
- 关联：`CGObjectInstance`, `CArtifactInstance`, `CGHeroInstance`
- 使用：`CGameState`, `TerrainTile`, `IGameSettings`

## 用途
- 地图数据存储：保存完整的地图状态
- 对象管理：管理地图上所有对象的位置和状态
- 英雄池管理：处理可招募英雄的存储
- 神器实例管理：跟踪所有神器实例
- 地形查询：提供地形和移动相关查询

## 实现说明
- 索引管理：维护对象ID到实例的映射
- 序列化支持：完整的地图保存和加载
- 性能优化：预计算城镇和英雄索引
- 内存管理：智能指针管理对象生命周期