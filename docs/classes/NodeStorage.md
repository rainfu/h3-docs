<!-- 来源: E:\develop\heroes\vcmi\lib\pathfinder\NodeStorage.h -->
# NodeStorage头文件

NodeStorage头文件定义了VCMI中寻路节点存储的具体实现类，继承自INodeStorage接口。

## NodeStorage类

### 类定义
```cpp
class DLL_LINKAGE NodeStorage : public INodeStorage
```

### 私有成员
- `CPathsInfo & out`: 路径信息输出引用

### 私有方法
- `STRONG_INLINE void resetTile(const int3 & tile, const EPathfindingLayer & layer, EPathAccessibility accessibility)`: 重置地块可达性

### 构造函数
- `NodeStorage(CPathsInfo & pathsInfo, const CGHeroInstance * hero)`: 构造函数

### 主要方法
- `STRONG_INLINE CGPathNode * getNode(const int3 & coord, const EPathfindingLayer layer)`: 获取指定坐标和层的节点
- `void initialize(const PathfinderOptions & options, const IGameInfoCallback & gameInfo) override`: 初始化节点存储
- `std::vector<CGPathNode *> getInitialNodes() override`: 获取初始节点列表
- `void calculateNeighbours(...) override`: 计算邻居节点
- `std::vector<CGPathNode *> calculateTeleportations(...) override`: 计算传送节点
- `void commit(CDestinationNodeInfo & destination, const PathNodeInfo & source) override`: 提交节点信息

### 析构函数
- `virtual ~NodeStorage() = default`: 虚析构函数

## 设计特点

- 实现INodeStorage接口的具体节点存储逻辑
- 与CPathsInfo紧密集成，提供路径计算结果存储
- 支持多层寻路和复杂的地形可达性计算
- 优化性能，使用内联函数处理频繁操作