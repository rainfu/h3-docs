# CGPathNode类

CGPathNode类是VCMI路径查找系统中的路径节点类，用于存储路径查找过程中的节点信息。

## 类定义

```cpp
struct DLL_LINKAGE CGPathNode
{
    using TFibHeap = boost::heap::fibonacci_heap<CGPathNode *, boost::heap::compare<NodeComparer<CGPathNode>>>;
    using ELayer = EPathfindingLayer;

    TFibHeap::handle_type pqHandle;
    TFibHeap * pq;
    CGPathNode * theNodeBefore;

    int3 coord; // 坐标
    ELayer layer;

    float cost; // 到达此瓦片的路径总成本，以回合为单位测量
    int moveRemains; // 英雄到达瓦片后剩余的移动点数
    ui8 turns; // 到达瓦片前需要等待多少回合 - 0表示当前回合
    EPathAccessibility accessible;
    EPathNodeAction action;
    bool locked;

    CGPathNode();

    STRONG_INLINE
    void reset();

    STRONG_INLINE
    bool inPQ() const;

    STRONG_INLINE
    float getCost() const;

    STRONG_INLINE
    void setCost(float value);

    STRONG_INLINE
    void update(const int3 & Coord, const ELayer Layer, const EPathAccessibility Accessible);

    STRONG_INLINE
    bool reachable() const;

    bool isTeleportAction() const;
};

enum class EPathAccessibility : ui8
{
    NOT_SET,
    ACCESSIBLE, // 瓦片可以进入和通过
    VISITABLE, // 瓦片可以作为路径中的最后一个瓦片进入
    GUARDED,  // 瓦片可以进入，但在附近怪物的控制区域内（也可能包含可访问对象）
    BLOCKVIS,  // 可以从相邻瓦片访问，但不可通行
    FLYABLE, // 只能在空中层访问
    BLOCKED // 瓦片既不能进入也不能访问
};

enum class EPathNodeAction : ui8
{
    UNKNOWN,
    EMBARK,     // 上船
    DISEMBARK,  // 下船
    NORMAL,     // 正常移动
    BATTLE,     // 战斗
    VISIT,      // 访问
    BLOCKING_VISIT, // 阻塞访问
    TELEPORT_NORMAL, // 传送（普通）
    TELEPORT_BLOCKING_VISIT, // 传送（阻塞访问）
    TELEPORT_BATTLE // 传送（战斗）
};

struct DLL_LINKAGE CGPath
{
    std::vector<CGPathNode> nodes; //逐个获取节点

    /// 路径的起始位置，与英雄位置匹配
    const CGPathNode & currNode() const;
    /// 路径中的第一个节点，这是英雄下一步要移动的位置
    const CGPathNode & nextNode() const;
    /// 路径中的最后一个节点，这是英雄最终要到达的位置
    const CGPathNode & lastNode() const;

    int3 startPos() const; // 起始点
    int3 endPos() const; // 目标点
};

struct DLL_LINKAGE CPathsInfo
{
    using ELayer = EPathfindingLayer;

    const CGHeroInstance * hero;
    int3 hpos;
    int3 sizes;
    /// 奖励树版本，用于判断此信息何时有效
    int heroBonusTreeVersion = 0;
    boost::multi_array<CGPathNode, 4> nodes; //[layer][level][w][h]

    CPathsInfo(const int3 & Sizes, const CGHeroInstance * hero_);
    ~CPathsInfo();
    const CGPathNode * getPathInfo(const int3 & tile) const;
    bool getPath(CGPath & out, const int3 & dst) const;
    const CGPathNode * getNode(const int3 & coord) const;

    STRONG_INLINE
    CGPathNode * getNode(const int3 & coord, const ELayer layer)
    {
        return &nodes[layer.getNum()][coord.z][coord.x][coord.y];
    }
};

struct DLL_LINKAGE PathNodeInfo
{
    CGPathNode * node;
    const CGObjectInstance * nodeObject;
    const CGHeroInstance * nodeHero;
    const TerrainTile * tile;
    int3 coord;
    bool guarded;
    PlayerRelations objectRelations;
    PlayerRelations heroRelations;
    bool isInitialPosition;

    PathNodeInfo();

    virtual void setNode(const IGameInfoCallback & gameInfo, CGPathNode * n);

    void updateInfo(CPathfinderHelper * hlp, const IGameInfoCallback & gameInfo);

    bool isNodeObjectVisitable() const;
};

struct DLL_LINKAGE CDestinationNodeInfo : public PathNodeInfo
{
    EPathNodeAction action;
    int turn;
    int movementLeft;
    float cost; // 与CGPathNode::cost相同
    bool blocked;
    bool isGuardianTile;

    CDestinationNodeInfo();

    void setNode(const IGameInfoCallback & gameInfo, CGPathNode * n) override;

    virtual bool isBetterWay() const;
};
```

## 功能说明

CGPathNode是VCMI路径查找系统中的核心组件，用于存储路径查找过程中每个节点的信息，包括位置、成本、可达性等。它与其他相关结构（如CGPath、CPathsInfo等）一起构成了完整的路径查找解决方案，用于确定英雄在地图上的移动路径。

## 依赖关系

- [CGHeroInstance](../entities/CHero.md): 英雄实例
- [CGObjectInstance](../mapObjects/CGObjectInstance.md): 地图对象实例
- [TerrainTile](../map/TerrainTile.md): 地形瓦片
- [int3](../int3.md): 三维坐标
- [EPathfindingLayer](../constants/EPathfindingLayer.md): 路径查找层
- [PlayerRelations](../PlayerRelations.md): 玩家关系
- boost::heap::fibonacci_heap: 斐波那契堆（用于A*路径查找算法）
- boost::multi_array: 多维数组
- STL库: vector等

## 函数注释

- `CGPathNode()`: 构造函数，创建路径节点对象
- `reset()`: 重置节点状态
- `inPQ()`: 检查节点是否在优先队列中
- `getCost()`: 获取路径成本
- `setCost(value)`: 设置路径成本
- `update(coord, layer, accessible)`: 更新节点信息
- `reachable()`: 检查节点是否可达
- `isTeleportAction()`: 检查是否是传送动作
- `currNode()`, `nextNode()`, `lastNode()`: 获取路径中的不同节点
- `startPos()`, `endPos()`: 获取路径的起始和结束位置
- `getPath(out, dst)`: 获取从当前位置到目标位置的路径
- `getNode(coord)`: 获取指定坐标的节点
- `setNode(gameInfo, n)`: 设置节点信息
- `updateInfo(hlp, gameInfo)`: 更新节点信息
- `isBetterWay()`: 检查是否是更好的路径