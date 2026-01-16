# TerrainTile

地形格子类，定义地图上每个格子的地形和属性信息。

## 概述

`TerrainTile` 描述地图上单个格子的完整信息，包括地形类型、道路、河流、可访问性、对象等。是地图系统的基本单元。

## 主要属性
- `terType`: 地形类型
- `terSubtype`: 地形子类型
- `roadType`: 道路类型
- `riverType`: 河流类型
- `visitable`: 是否可访问
- `blocked`: 是否阻挡移动
- `visitableObjects`: 可访问对象列表
- `blockingObjects`: 阻挡对象列表

## 核心方法
- `TerrainId getTerrainID() const`：获取地形ID
- `RoadId getRoadID() const`：获取道路ID
- `RiverId getRiverID() const`：获取河流ID
- `bool isVisitable() const`：检查是否可访问
- `bool isBlocked() const`：检查是否阻挡
- `bool isRoad() const`：检查是否有道路
- `bool isRiver() const`：检查是否有河流

## 依赖关系
- 关联：`TerrainId`, `RoadId`, `RiverId` 等地形类型
- 使用：地图系统、路径寻找

## 用途
- 地图渲染：地形和装饰显示
- 路径计算：移动成本和可达性
- 游戏逻辑：对象放置和交互

## 实现说明
- 位标志优化：使用位运算存储多种状态
- 层级设计：地形、道路、河流的组合
- 性能优化：紧凑的内存布局