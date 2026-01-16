# RMG系统 (rmg)

RMG（Random Map Generator）系统负责随机地图的生成，包括地形、资源分布、怪物放置等功能。

## 主要类和结构体

### CRmgTemplate
RMG模板类，定义随机地图的结构和规则。

- 功能：描述随机地图的模板，包括区域划分、连接关系和生成规则
- 依赖：[int3](../../classes/int3.md), [Terrain](../entities/Terrain.md), [CTownHandler](../entities/CTownHandler.md)
- 函数注释：
  - [isValid()](#): 检查模板是否有效
  - [getZones()](#): 获取区域信息
  - [getConnections()](#): 获取连接信息

### Zone
区域类，表示地图上的一个特定区域。

- 功能：定义地图上的一个分区，包括地形类型、大小、生物等级等属性
- 依赖：[Terrain](../entities/Terrain.md), [CTownHandler](../entities/CTownHandler.md)
- 函数注释：
  - [getType()](#): 获取区域类型
  - [getTownCount()](#): 获取城镇数量
  - [getMonsterLevel()](#): 获取怪物等级

### Connection
连接类，定义两个区域之间的连接。

- 功能：表示两个区域之间的通道或连接
- 依赖：[Zone](#zone)
- 函数注释：
  - [getFirstZone()](#): 获取第一个区域
  - [getSecondZone()](#): 获取第二个区域
  - [getConnectionType()](#): 获取连接类型

### CRandomMapGenerator
随机地图生成器主类。

- 功能：协调整个随机地图的生成过程
- 依赖：[CRmgTemplate](#crmgtemplate), [Zone](#zone), [CMap](../map/CMap.md)
- 函数注释：
  - [generate()](#): 生成随机地图
  - [validate()](#): 验证生成的地图
  - [applyTemplate()](#): 应用模板到地图

### CTileInfo
地图瓦片信息类。

- 功能：存储地图上单个瓦片的详细信息
- 依赖：[Terrain](../entities/Terrain.md), [CTileset](../entities/CTileset.md)
- 函数注释：
  - [getTerrain()](#): 获取地形类型
  - [isPassable()](#): 检查是否可通过
  - [hasObject()](#): 检查是否有对象

## 依赖关系

RMG系统依赖以下模块：
- [map](../map/index.md): 地图基本结构
- [entities](../entities/index.md): 游戏实体定义
- [constants](../constants/index.md): 游戏常量
- [int3](../int3.md): 三维坐标系统

## 类依赖排序

1. [int3](../int3.md) - 坐标表示
2. [constants](../constants/index.md) - 游戏常量
3. [entities](../entities/index.md) - 游戏实体
4. [map](../map/index.md) - 地图结构
5. rmg/ - RMG系统