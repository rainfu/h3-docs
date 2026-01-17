<!-- 来源: E:\develop\heroes\vcmi\lib\pathfinder\CPathfinder.h -->
# CPathfinder头文件

CPathfinder头文件定义了VCMI中主要的路径寻找器类和辅助类，用于计算英雄的移动路径。

## 类型定义

### 邻接瓦片向量
```cpp
using NeighbourTilesVector = boost::container::static_vector<int3, 8>;
```
优化存储结构，用于存储0-8个邻接瓦片，避免动态分配。

### 传送瓦片向量
```cpp
using TeleporterTilesVector = boost::container::small_vector<int3, 4>;
```
优化存储结构，用于存储传送出口瓦片。

## CPathfinder类

### 类定义
```cpp
class DLL_LINKAGE CPathfinder
```

### 构造函数
- `CPathfinder(const IGameInfoCallback & gameInfo, std::shared_ptr<PathfinderConfig> config)`: 构造函数

### 公共方法
- `void calculatePaths()`: 计算英雄可能的路径，使用当前英雄位置和剩余移动点数

### 私有成员
- `const IGameInfoCallback & gameInfo`: 游戏信息回调引用
- `std::shared_ptr<PathfinderConfig> config`: 路径寻找配置
- `boost::heap::fibonacci_heap<CGPathNode *, boost::heap::compare<NodeComparer<CGPathNode>> > pq`: 斐波那契堆优先队列
- `PathNodeInfo source`: 当前（源）路径节点
- `CDestinationNodeInfo destination`: 目标节点

### 私有方法
- `bool isLayerTransitionPossible() const`: 检查层间转换是否可能
- `EPathNodeAction getTeleportDestAction() const`: 获取传送目标动作
- `bool isDestinationGuardian() const`: 检查目标是否为守卫
- `void initializeGraph()`: 初始化图结构
- `void push(CGPathNode * node)`: 推入节点到优先队列
- `CGPathNode * topAndPop()`: 获取并弹出顶部节点

## CPathfinderHelper类

### 类定义
```cpp
class DLL_LINKAGE CPathfinderHelper : boost::noncopyable
```

### 枚举类型
```cpp
enum EPatrolState
{
    PATROL_NONE = 0,    // 无巡逻
    PATROL_LOCKED = 1,  // 巡逻锁定
    PATROL_RADIUS       // 巡逻半径
}
```

### 成员变量
- `const IGameInfoCallback & gameInfo`: 游戏信息回调引用
- `EPatrolState patrolState`: 巡逻状态
- `FowTilesType patrolTiles`: 巡逻瓦片集合
- `int turn`: 当前回合
- `PlayerColor owner`: 所有者颜色
- `const CGHeroInstance * hero`: 英雄指针
- `std::vector<std::unique_ptr<TurnInfo>> turnsInfo`: 回合信息列表
- `const PathfinderOptions & options`: 路径寻找选项
- `bool canCastFly`: 是否可以施放飞行
- `bool canCastWaterWalk`: 是否可以施放水上行走
- `bool whirlpoolProtection`: 是否有漩涡保护

### 构造函数
- `CPathfinderHelper(const IGameInfoCallback & gameInfo, const CGHeroInstance * Hero, const PathfinderOptions & Options)`: 构造函数

### 析构函数
- `virtual ~CPathfinderHelper()`: 虚析构函数

### 公共方法
- `void initializePatrol()`: 初始化巡逻
- `bool isHeroPatrolLocked() const`: 检查英雄巡逻是否锁定
- `bool canMoveFromNode(const PathNodeInfo & source) const`: 检查是否可以从节点移动
- `bool isPatrolMovementAllowed(const int3 & dst) const`: 检查巡逻移动是否允许
- `void updateTurnInfo(const int turn = 0)`: 更新回合信息
- `bool isLayerAvailable(const EPathfindingLayer & layer) const`: 检查层是否可用
- `const TurnInfo * getTurnInfo() const`: 获取回合信息
- `int getMaxMovePoints(const EPathfindingLayer & layer) const`: 获取最大移动点数

### 传送相关方法
- `TeleporterTilesVector getCastleGates(const PathNodeInfo & source) const`: 获取城堡大门
- `bool isAllowedTeleportEntrance(const CGTeleport * obj) const`: 检查传送入口是否允许
- `TeleporterTilesVector getAllowedTeleportChannelExits(const TeleportChannelID & channelID) const`: 获取允许的传送通道出口
- `bool addTeleportTwoWay(const CGTeleport * obj) const`: 添加双向传送
- `bool addTeleportOneWay(const CGTeleport * obj) const`: 添加单向传送
- `bool addTeleportOneWayRandom(const CGTeleport * obj) const`: 添加单向随机传送
- `bool addTeleportWhirlpool(const CGWhirlpool * obj) const`: 添加漩涡传送
- `bool canMoveBetween(const int3 & a, const int3 & b) const`: 检查瓦片间是否可以移动

### 邻接和移动成本计算
- `void calculateNeighbourTiles(NeighbourTilesVector & result, const PathNodeInfo & source) const`: 计算邻接瓦片
- `TeleporterTilesVector getTeleportExits(const PathNodeInfo & source) const`: 获取传送出口
- `void getNeighbours(const TerrainTile & srcTile, const int3 & srcCoord, NeighbourTilesVector & vec, const boost::logic::tribool & onLand, const bool limitCoastSailing) const`: 获取邻居瓦片
- `int getMovementCost(...)`: 获取移动成本（多个重载版本）
- `int movementPointsAfterEmbark(int movement, int basicCost, bool disembark) const`: 计算登船后的移动点数
- `bool passOneTurnLimitCheck(const PathNodeInfo & source) const`: 通过单回合限制检查
- `int getGuardiansCount(int3 tile) const`: 获取守卫数量

## 设计特点

- 使用A*算法结合斐波那契堆进行高效路径寻找
- 支持多层路径寻找（地面、水上、空中、地下）
- 处理复杂的传送机制（单向、双向、随机、漩涡）
- 支持英雄巡逻限制和特殊移动能力
- 优化内存使用，避免动态分配
- 提供完整的移动成本计算和邻接关系分析