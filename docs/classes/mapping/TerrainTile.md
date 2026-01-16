# TerrainTile

## 概述

`TerrainTile` 结构体表示VCMI中地图上的单个地形瓦片，包含地形类型、河流、道路、可访问对象和阻挡对象等信息。它是地图系统的核心组件，定义了地图瓦片的视觉表示、通行性和交互逻辑。

## 核心属性

### 地形信息
```cpp
TerrainId terrainType;     // 地形类型ID
RiverId riverType;         // 河流类型ID
RoadId roadType;           // 道路类型ID
```

### 视觉表示
```cpp
ui8 terView;               // 地形视觉变体
ui8 riverDir;              // 河流方向
ui8 roadDir;               // 道路方向
ui8 extTileFlags;          // 扩展瓦片标志 (旋转、沿海、顺风等)
```

### 对象列表
```cpp
std::vector<ObjectInstanceID> visitableObjects;  // 可访问对象ID列表
std::vector<ObjectInstanceID> blockingObjects;   // 阻挡对象ID列表
```

## 构造函数

### TerrainTile
```cpp
TerrainTile();
```
- **功能**: 创建地形瓦片，默认初始化为空地形

## 地形通行性检查

### entrableTerrain
```cpp
bool entrableTerrain() const;
bool entrableTerrain(const TerrainTile * from) const;
bool entrableTerrain(bool allowLand, bool allowSea) const;
```
- **功能**: 检查地形是否可进入
- **参数**:
  - `from`: 来源瓦片（用于检查地形类型兼容性）
  - `allowLand/allowSea`: 是否允许陆地/海洋通行
- **返回值**: true表示可进入

### isClear
```cpp
bool isClear(const TerrainTile * from = nullptr) const;
```
- **功能**: 检查瓦片是否清空（无阻挡对象且地形可通行）
- **参数**: `from` - 来源瓦片
- **返回值**: true表示瓦片清空

## 对象访问

### topVisitableObj
```cpp
ObjectInstanceID topVisitableObj(bool excludeTop = false) const;
```
- **功能**: 获取顶部可访问对象的ID
- **参数**: `excludeTop` - 是否排除顶部对象
- **返回值**: 对象ID或-1（无对象）

## 地形类型检查

### isWater / isLand
```cpp
bool isWater() const;
bool isLand() const;
```
- **功能**: 检查瓦片是否为水域或陆地
- **返回值**: true表示是相应类型

### hasRiver / hasRoad
```cpp
bool hasRiver() const;
bool hasRoad() const;
```
- **功能**: 检查瓦片是否有河流或道路
- **返回值**: true表示有相应地貌

## 特殊效果

### hasFavorableWinds
```cpp
bool hasFavorableWinds() const;
```
- **功能**: 检查瓦片是否有顺风效果
- **返回值**: true表示有顺风效果

### getDiggingStatus
```cpp
EDiggingStatus getDiggingStatus(bool excludeTop = true) const;
```
- **功能**: 获取挖掘状态
- **参数**: `excludeTop` - 是否排除顶部对象
- **返回值**: 挖掘状态枚举

## 访问状态

### visitable / blocked
```cpp
bool visitable() const;
bool blocked() const;
```
- **功能**: 检查瓦片是否有可访问对象或阻挡对象
- **返回值**: true表示有相应类型的对象

## 类型访问器

### getTerrain / getRiver / getRoad
```cpp
const TerrainType * getTerrain() const;
const RiverType * getRiver() const;
const RoadType * getRoad() const;
```
- **功能**: 获取地形/河流/道路类型的实体对象
- **返回值**: 相应类型的指针

### getTerrainID / getRiverID / getRoadID
```cpp
TerrainId getTerrainID() const;
RiverId getRiverID() const;
RoadId getRoadID() const;
```
- **功能**: 获取地形/河流/道路的ID
- **返回值**: 相应类型的ID

## 序列化

### serialize
```cpp
template<typename Handler> void serialize(Handler &h)
```
- **功能**: 处理地形瓦片的二进制序列化
- **参数**: `h` - 序列化处理器

## 扩展标志位

`extTileFlags` 的位标志定义：

- **Bits 0-1**: 地形图形旋转
- **Bits 2-3**: 河流图形旋转  
- **Bits 4-5**: 道路图形旋转
- **Bit 6**: 沿海瓦片（允许登陆或阻挡水上移动）
- **Bit 7**: 顺风效果

## 设计意图

TerrainTile的设计目标：

1. **地形表示**: 完整描述地图瓦片的地形特征
2. **通行性计算**: 支持复杂的通行性检查逻辑
3. **对象管理**: 管理瓦片上的可访问和阻挡对象
4. **视觉渲染**: 提供渲染所需的视觉信息
5. **序列化支持**: 完整的保存和加载功能
6. **性能优化**: 内联函数提供高效的访问

## 依赖关系

- **TerrainType**: 地形类型定义
- **RiverType**: 河流类型定义  
- **RoadType**: 道路类型定义
- **CGObjectInstance**: 地图对象实例
- **ObjectInstanceID**: 对象实例标识符

这个结构体是VCMI地图系统的核心，定义了游戏世界的基本地形单元。