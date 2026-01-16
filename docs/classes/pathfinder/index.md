# 路径查找系统 (pathfinder)

路径查找系统负责计算英雄在地图上的移动路径，包括陆地和水路的路径规划。

## 主要类和结构体

### CGPathNode
路径节点类，表示路径上的一个点。

- 功能：存储路径上一个位置的信息，包括坐标、可达性、消耗的移动点数等
- 依赖：[int3](../../classes/int3.md), [EPathAccessibility](../../classes/constants/Enumerations.md), [EPathNodeAction](../../classes/constants/Enumerations.md)
- 函数注释：
  - [reset()](#): 重置节点状态
  - [getCost()](#): 获取到达该节点的成本
  - [setCost()](#): 设置到达该节点的成本
  - [update()](#): 更新节点信息

### CGPath
路径类，表示从起点到终点的一系列节点。

- 功能：封装一条完整的路径，包含一系列路径节点
- 依赖：[CGPathNode](#cgpathnode)
- 函数注释：
  - [currNode()](#): 获取当前位置节点
  - [nextNode()](#): 获取下一个节点
  - [lastNode()](#): 获取最后一个节点

### CPathsInfo
路径信息类，管理整个地图的路径信息。

- 功能：为整个地图维护路径节点信息，提供路径查询功能
- 依赖：[CGHeroInstance](../entities/CHero.md), [CGPathNode](#cgpathnode)
- 函数注释：
  - [getPathInfo()](#): 获取指定坐标的路径节点信息
  - [getPath()](#): 获取从起点到目标点的路径
  - [getNode()](#): 获取指定坐标的节点

## 依赖关系

路径查找系统依赖以下模块：
- constants/: 使用枚举常量
- [int3](../int3.md): 表示三维坐标
- [battle](../battle/index.md): 与战斗系统交互
- [entities](../entities/index.md): 与英雄实例交互

## 类依赖排序

1. [int3](../int3.md) - 坐标表示
2. constants/ - 枚举常量
3. pathfinder/ - 路径查找系统