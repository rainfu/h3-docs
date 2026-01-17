<!-- 来源: E:\develop\heroes\vcmi\lib\pathfinder\INodeStorage.h -->
# INodeStorage头文件

INodeStorage头文件定义了VCMI中寻路节点存储的接口类，用于管理寻路算法中的节点操作。

## INodeStorage接口类

### 类定义
```cpp
class DLL_LINKAGE INodeStorage
```

### 类型定义
- `using ELayer = EPathfindingLayer`: 寻路层类型别名

### 纯虚方法
- `virtual std::vector<CGPathNode *> getInitialNodes() = 0`: 获取初始节点列表
- `virtual void calculateNeighbours(std::vector<CGPathNode *> & result, const PathNodeInfo & source, EPathfindingLayer layer, const PathfinderConfig * pathfinderConfig, const CPathfinderHelper * pathfinderHelper) = 0`: 计算邻居节点
- `virtual std::vector<CGPathNode *> calculateTeleportations(const PathNodeInfo & source, const PathfinderConfig * pathfinderConfig, const CPathfinderHelper * pathfinderHelper) = 0`: 计算传送节点
- `virtual void commit(CDestinationNodeInfo & destination, const PathNodeInfo & source) = 0`: 提交节点信息
- `virtual void initialize(const PathfinderOptions & options, const IGameInfoCallback & gameInfo) = 0`: 初始化节点存储

### 虚析构函数
- `virtual ~INodeStorage() = default`: 虚析构函数

## 设计特点

- 纯接口设计，支持不同寻路算法的节点存储实现
- 提供完整的节点生命周期管理（初始化、邻居计算、传送、提交）
- 支持多层寻路（陆地、水面、空中等）
- 与寻路配置和助手类紧密协作