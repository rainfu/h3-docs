<!-- 来源: E:\develop\heroes\vcmi\lib\rmg\TileInfo.h -->
# TileInfo头文件

TileInfo头文件定义了VCMI中随机地图生成器的地块信息类，用于存储和管理地图地块的各种属性。

## TileInfo类

### 类定义
```cpp
class TileInfo
```

### 构造函数
- `TileInfo()`: 默认构造函数

### 对象距离方法
- `float getNearestObjectDistance() const`: 获取最近对象距离
- `void setNearestObjectDistance(float value)`: 设置最近对象距离

### 地块状态检查方法
- `bool isBlocked() const`: 检查是否阻挡
- `bool shouldBeBlocked() const`: 检查是否应该阻挡
- `bool isPossible() const`: 检查是否可能
- `bool isFree() const`: 检查是否空闲
- `bool isUsed() const`: 检查是否已使用
- `bool isRoad() const`: 检查是否道路

### 地块设置方法
- `void setOccupied(ETileType value)`: 设置占用类型

### 地形和道路方法
- `TerrainId getTerrainType() const`: 获取地形类型
- `ETileType getTileType() const`: 获取地块类型
- `void setTerrainType(TerrainId value)`: 设置地形类型
- `void setRoadType(RoadId type)`: 设置道路类型

### 私有成员
- `float nearestObjectDistance`: 最近对象距离
- `ETileType occupied`: 占用类型
- `TerrainId terrain`: 地形类型
- `RoadId roadType`: 道路类型

## 设计特点

- 封装地块的所有状态信息
- 提供便捷的状态检查方法
- 支持地形、道路、占用状态管理
- 包含对象距离计算用于布局优化