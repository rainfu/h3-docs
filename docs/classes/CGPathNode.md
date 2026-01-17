<!-- 来源: E:\develop\heroes\vcmi\lib\pathfinder\CGPathNode.h -->
# CGPathNode头文件

CGPathNode头文件定义了VCMI中路径寻找系统的核心节点和路径数据结构。

## NodeComparer模板结构体

### 模板定义
```cpp
template<typename N>
struct DLL_LINKAGE NodeComparer
```

### 运算符重载
- `bool operator()(const N * lhs, const N * rhs) const`: 比较两个节点的代价，用于优先队列排序

## EPathAccessibility枚举

定义路径节点的访问性状态：

- `NOT_SET`: 未设置
- `ACCESSIBLE`: 可进入且可通过
- `VISITABLE`: 可进入作为路径的最后一个节点
- `GUARDED`: 可进入但在附近怪物的控制区内
- `BLOCKVIS`: 可从相邻节点访问但不可通过
- `FLYABLE`: 只能在空中层访问
- `BLOCKED`: 既不能进入也不能访问

## EPathNodeAction枚举

定义路径节点上的动作类型：

- `UNKNOWN`: 未知动作
- `EMBARK`: 登船
- `DISEMBARK`: 离船
- `NORMAL`: 正常移动
- `BATTLE`: 战斗
- `VISIT`: 访问
- `BLOCKING_VISIT`: 阻塞访问
- `TELEPORT_NORMAL`: 普通传送
- `TELEPORT_BLOCKING_VISIT`: 传送阻塞访问
- `TELEPORT_BATTLE`: 传送战斗

## CGPathNode结构体

### 结构体定义
```cpp
struct DLL_LINKAGE CGPathNode
```

### 成员变量
- `TFibHeap::handle_type pqHandle`: 优先队列句柄
- `TFibHeap * pq`: 斐波那契堆指针
- `CGPathNode * theNodeBefore`: 前一个节点
- `int3 coord`: 坐标
- `ELayer layer`: 路径层
- `float cost`: 路径总代价（以回合为单位）
- `int moveRemains`: 到达该节点后剩余移动点数
- `ui8 turns`: 到达该节点需要等待的回合数
- `EPathAccessibility accessible`: 可访问性
- `EPathNodeAction action`: 动作类型
- `bool locked`: 是否锁定

### 构造函数
- `CGPathNode()`: 默认构造函数

### 公共方法
- `void reset()`: 重置节点状态
- `bool inPQ() const`: 检查节点是否在优先队列中
- `float getCost() const`: 获取节点代价
- `void setCost(float value)`: 设置节点代价并更新堆
- `void update(const int3 & Coord, const ELayer Layer, const EPathAccessibility Accessible)`: 更新节点信息
- `bool reachable() const`: 检查节点是否可到达
- `bool isTeleportAction() const`: 检查是否为传送动作

## CGPath结构体

### 结构体定义
```cpp
struct DLL_LINKAGE CGPath
```

### 成员变量
- `std::vector<CGPathNode> nodes`: 路径节点列表

### 公共方法
- `const CGPathNode & currNode() const`: 获取当前节点（起始位置）
- `const CGPathNode & nextNode() const`: 获取下一个节点
- `const CGPathNode & lastNode() const`: 获取最后一个节点
- `int3 startPos() const`: 获取起始位置
- `int3 endPos() const`: 获取目标位置

## CPathsInfo结构体

### 结构体定义
```cpp
struct DLL_LINKAGE CPathsInfo
```

### 成员变量
- `const CGHeroInstance * hero`: 英雄指针
- `int3 hpos`: 英雄位置
- `int3 sizes`: 地图尺寸
- `int heroBonusTreeVersion`: 英雄奖励树版本
- `boost::multi_array<CGPathNode, 4> nodes`: 节点多维数组 [layer][level][w][h]

### 构造函数
- `CPathsInfo(const int3 & Sizes, const CGHeroInstance * hero_)`: 构造函数

### 析构函数
- `~CPathsInfo()`: 析构函数

### 公共方法
- `const CGPathNode * getPathInfo(const int3 & tile) const`: 获取路径信息
- `bool getPath(CGPath & out, const int3 & dst) const`: 获取路径
- `const CGPathNode * getNode(const int3 & coord) const`: 获取节点
- `CGPathNode * getNode(const int3 & coord, const ELayer layer)`: 获取指定层的节点

## PathNodeInfo结构体

### 结构体定义
```cpp
struct DLL_LINKAGE PathNodeInfo
```

### 成员变量
- `CGPathNode * node`: 路径节点指针
- `const CGObjectInstance * nodeObject`: 节点对象
- `const CGHeroInstance * nodeHero`: 节点英雄
- `const TerrainTile * tile`: 地形瓦片
- `int3 coord`: 坐标
- `bool guarded`: 是否被守卫
- `PlayerRelations objectRelations`: 对象关系
- `PlayerRelations heroRelations`: 英雄关系
- `bool isInitialPosition`: 是否为初始位置

### 构造函数
- `PathNodeInfo()`: 默认构造函数

### 公共方法
- `void setNode(const IGameInfoCallback & gameInfo, CGPathNode * n)`: 设置节点
- `void updateInfo(CPathfinderHelper * hlp, const IGameInfoCallback & gameInfo)`: 更新信息
- `bool isNodeObjectVisitable() const`: 检查节点对象是否可访问

## CDestinationNodeInfo结构体

### 继承关系
```cpp
struct DLL_LINKAGE CDestinationNodeInfo : public PathNodeInfo
```

### 成员变量
- `EPathNodeAction action`: 动作
- `int turn`: 回合数
- `int movementLeft`: 剩余移动点数
- `float cost`: 代价
- `bool blocked`: 是否阻塞
- `bool isGuardianTile`: 是否为守卫瓦片

### 构造函数
- `CDestinationNodeInfo()`: 默认构造函数

### 公共方法
- `void setNode(const IGameInfoCallback & gameInfo, CGPathNode * n) override`: 设置节点（重写）
- `bool isBetterWay() const`: 检查是否为更好的路径

## 设计特点

- 使用斐波那契堆进行高效的优先队列操作
- 支持多层路径寻找（地面、地下、水上、空中）
- 包含完整的路径状态信息和动作类型
- 提供节点比较和更新机制
- 支持传送和特殊动作的路径计算