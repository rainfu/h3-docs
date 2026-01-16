# CPathfinder类

CPathfinder类是VCMI中路径寻找系统的核心类，用于计算英雄在游戏世界中的移动路径。

## 类定义

```cpp
using FowTilesType = std::set<int3>;

// 优化存储 - 一个瓦片可以有0-8个相邻瓦片
// static_vector使用固定、预分配的存储（容量）和动态大小
// 这避免了大量的相邻列表查询时的动态分配
using NeighbourTilesVector = boost::container::static_vector<int3, 8>;

// 优化存储以最小化动态分配 - 大多数传送门只有一个出口，但有些可能有更多（预制地图、城堡大门）
using TeleporterTilesVector = boost::container::small_vector<int3, 4>;

class DLL_LINKAGE CPathfinder
{
public:
    friend class CPathfinderHelper;

    CPathfinder(
        const IGameInfoCallback & gameInfo,
        std::shared_ptr<PathfinderConfig> config);

    void calculatePaths(); // 为英雄计算可能的路径，使用当前英雄位置和剩余移动点数；返回新分配的CPath指针，如果不存在路径则返回nullptr

private:
    const IGameInfoCallback & gameInfo;

    using ELayer = EPathfindingLayer;

    std::shared_ptr<PathfinderConfig> config;

    boost::heap::fibonacci_heap<CGPathNode *, boost::heap::compare<NodeComparer<CGPathNode>> > pq;

    PathNodeInfo source; // 当前（源）路径节点 -> 从队列中取出它
    CDestinationNodeInfo destination; // 目标节点 -> 它是我们正在考虑的源的邻居

    bool isLayerTransitionPossible() const;
    EPathNodeAction getTeleportDestAction() const;

    bool isDestinationGuardian() const;

    void initializeGraph();

    STRONG_INLINE
    void push(CGPathNode * node);

    STRONG_INLINE
    CGPathNode * topAndPop();
};

class DLL_LINKAGE CPathfinderHelper : boost::noncopyable
{
    /// 返回特定瓦片之间移动的基本成本。不考虑对角线移动或最后一个瓦片异常
    ui32 getTileMovementCost(const TerrainTile & dest, const TerrainTile & from, const TurnInfo * ti) const;

    const IGameInfoCallback & gameInfo;
public:
    enum EPatrolState
    {
        PATROL_NONE = 0,
        PATROL_LOCKED = 1,
        PATROL_RADIUS
    } patrolState;
    FowTilesType patrolTiles;

    int turn;
    PlayerColor owner;
    const CGHeroInstance * hero;
    std::vector<std::unique_ptr<TurnInfo>> turnsInfo;
    const PathfinderOptions & options;
    bool canCastFly;
    bool canCastWaterWalk;
    bool whirlpoolProtection;

    CPathfinderHelper(const IGameInfoCallback & gameInfo, const CGHeroInstance * Hero, const PathfinderOptions & Options);
    virtual ~CPathfinderHelper();
    void initializePatrol();
    bool isHeroPatrolLocked() const;
    bool canMoveFromNode(const PathNodeInfo & source) const;
    bool isPatrolMovementAllowed(const int3 & dst) const;
    void updateTurnInfo(const int turn = 0);
    bool isLayerAvailable(const EPathfindingLayer & layer) const;
    const TurnInfo * getTurnInfo() const;
    int getMaxMovePoints(const EPathfindingLayer & layer) const;

    TeleporterTilesVector getCastleGates(const PathNodeInfo & source) const;
    bool isAllowedTeleportEntrance(const CGTeleport * obj) const;
    TeleporterTilesVector getAllowedTeleportChannelExits(const TeleportChannelID & channelID) const;
    bool addTeleportTwoWay(const CGTeleport * obj) const;
    bool addTeleportOneWay(const CGTeleport * obj) const;
    bool addTeleportOneWayRandom(const CGTeleport * obj) const;
    bool addTeleportWhirlpool(const CGWhirlpool * obj) const;
    bool canMoveBetween(const int3 & a, const int3 & b) const; // 仅检查可能使两瓦片间移动不可能的可访问对象，而不是其他条件（如瓦片本身可达性）

    void calculateNeighbourTiles(NeighbourTilesVector & result, const PathNodeInfo & source) const;
    TeleporterTilesVector getTeleportExits(const PathNodeInfo & source) const;

    void getNeighbours(
        const TerrainTile & srcTile,
        const int3 & srcCoord,
        NeighbourTilesVector & vec,
        const boost::logic::tribool & onLand,
        const bool limitCoastSailing) const;

    int getMovementCost(
        const int3 & src,
        const int3 & dst,
        const TerrainTile * ct,
        const TerrainTile * dt,
        const int remainingMovePoints = -1,
        const bool checkLast = true,
        boost::logic::tribool isDstSailLayer = boost::logic::indeterminate,
        boost::logic::tribool isDstWaterLayer = boost::logic::indeterminate) const;

    int getMovementCost(
        const PathNodeInfo & src,
        const PathNodeInfo & dst,
        const int remainingMovePoints = -1,
        const bool checkLast = true) const;

    int movementPointsAfterEmbark(int movement, int basicCost, bool disembark) const;
    bool passOneTurnLimitCheck(const PathNodeInfo & source) const;

    int getGuardiansCount(int3 tile) const;
};
```

## 功能说明

CPathfinder是VCMI路径寻找系统的核心类，负责计算英雄在游戏世界中的移动路径。它使用A*算法或其他启发式搜索算法，考虑地形、障碍物、传送门等因素，计算出最有效的路径。CPathfinderHelper类提供了辅助功能，如计算移动成本、处理传送门、巡逻区域等。

## 依赖关系

- [IGameInfoCallback](../gameState/IGameInfoCallback.md): 游戏信息回调接口
- [PathfinderConfig](./PathfinderConfig.md): 路径寻找配置
- [CGPathNode](./CGPathNode.md): 路径节点
- [PathNodeInfo](./PathNodeInfo.md): 路径节点信息
- [CDestinationNodeInfo](./CDestinationNodeInfo.md): 目标节点信息
- [CGHeroInstance](../entities/CGHeroInstance.md): 英雄实例
- [TurnInfo](./TurnInfo.md): 回合信息
- [PathfinderOptions](./PathfinderOptions.md): 路径寻找选项
- [CGTeleport](./CGTeleport.md): 传送门
- [CGWhirlpool](./CGWhirlpool.md): 漩涡
- boost::noncopyable: 防拷贝基类
- STL库: set, vector, unique_ptr, shared_ptr等

## 函数注释

### CPathfinder类

- `CPathfinder(gameInfo, config)`: 构造函数，使用游戏信息和路径寻找配置创建路径寻找器
- `calculatePaths()`: 计算英雄可能的路径，使用当前英雄位置和剩余移动点数
- `isLayerTransitionPossible()`: 检查层间转换是否可能
- `getTeleportDestAction()`: 获取传送目的地动作
- `isDestinationGuardian()`: 检查目的地是否为守护者
- `initializeGraph()`: 初始化图结构
- `push(node)`: 将节点推入优先队列
- `topAndPop()`: 弹出优先队列顶部节点

### CPathfinderHelper类

- `CPathfinderHelper(gameInfo, Hero, Options)`: 构造函数，创建路径寻找助手
- `initializePatrol()`: 初始化巡逻设置
- `isHeroPatrolLocked()`: 检查英雄是否被巡逻锁定
- `canMoveFromNode(source)`: 检查是否可以从节点移动
- `isPatrolMovementAllowed(dst)`: 检查巡逻移动是否被允许
- `updateTurnInfo(turn)`: 更新回合信息
- `isLayerAvailable(layer)`: 检查层是否可用
- `getMaxMovePoints(layer)`: 获取某层的最大移动点数
- `getCastleGates(source)`: 获取城堡大门位置
- `getTeleportExits(source)`: 获取传送出口
- `getMovementCost(...)`: 获取移动成本
- `canMoveBetween(a, b)`: 检查是否可以在两点间移动
- `calculateNeighbourTiles(result, source)`: 计算相邻瓦片
- `getNeighbours(...)`: 获取邻居瓦片
- `movementPointsAfterEmbark(...)`: 计算登船后的移动点数
- `getGuardiansCount(tile)`: 获取守护者数量