<!-- 来源: E:\develop\heroes\vcmi\lib\pathfinder\PathfinderUtil.h -->
# PathfinderUtil头文件

PathfinderUtil头文件定义了VCMI中寻路工具函数和可达性评估模板。

## PathfinderUtil命名空间

### 类型定义
- `using FoW = boost::multi_array<ui8, 3>`: 战争迷雾类型（3D数组）
- `using ELayer = EPathfindingLayer`: 寻路层类型别名

### 可达性评估模板函数

#### evaluateAccessibility模板函数
```cpp
template<EPathfindingLayer::Type layer>
EPathAccessibility evaluateAccessibility(const int3 & pos, const TerrainTile & tinfo, const FoW & fow, const PlayerColor player, const IGameInfoCallback & gameInfo)
```

根据寻路层评估地块的可达性：

**陆地层(LAND)和水面层(SAIL):**
- 检查战争迷雾可见性
- 处理可访问对象（圣域、英雄、怪物等）
- 区分阻挡访问、可访问、守卫等状态

**水层(WATER):**
- 检查是否被阻挡或为陆地

**空气层(AIR):**
- 始终可飞行

### 返回值类型
- `EPathAccessibility::BLOCKED`: 完全阻挡
- `EPathAccessibility::BLOCKVIS`: 阻挡访问
- `EPathAccessibility::VISITABLE`: 可访问
- `EPathAccessibility::ACCESSIBLE`: 可通行
- `EPathAccessibility::GUARDED`: 被守卫
- `EPathAccessibility::FLYABLE`: 可飞行

## 设计特点

- 模板化设计，支持不同寻路层的可达性评估
- 考虑战争迷雾、对象交互、守卫生物等复杂因素
- 提供精确的地形通行性判断
- 支持陆地、水面、空中多层寻路