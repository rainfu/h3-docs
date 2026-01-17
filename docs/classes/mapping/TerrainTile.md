# TerrainTile

## 概述

`TerrainTile` 结构体是 VCMI 地图系统中地形块的核心数据结构。它描述了地图上单个坐标位置的地形信息，包括地形类型、河流、道路、可访问对象、阻塞对象等。每个地形块都包含了完整的视觉和逻辑信息。

## 结构体定义

```cpp
struct DLL_LINKAGE TerrainTile
```

## 构造函数

```cpp
TerrainTile();
```
默认构造函数，初始化为空的地形块。

## 地形可进入性检查

### entrableTerrain (无参数)
```cpp
inline bool entrableTerrain() const;
```
检查地形是否可进入（允许陆地和水域）。

### entrableTerrain (来源地形)
```cpp
inline bool entrableTerrain(const TerrainTile * from) const;
```
检查从指定地形块是否可以进入此地形。

### entrableTerrain (允许类型)
```cpp
inline bool entrableTerrain(bool allowLand, bool allowSea) const;
```
检查地形是否可进入，指定是否允许陆地和水域。

## 状态检查方法

### isClear
```cpp
bool isClear(const TerrainTile * from = nullptr) const;
```
检查地形块是否清空（无阻塞对象且地形可进入）。

### topVisitableObj
```cpp
ObjectInstanceID topVisitableObj(bool excludeTop = false) const;
```
获取顶部可访问对象的ID。

**参数：**
- `excludeTop`: 是否排除顶层对象

**返回值：** 对象实例ID，如果没有可访问对象返回 -1

### isWater
```cpp
inline bool isWater() const;
```
检查是否为水域地形。

### isLand
```cpp
inline bool isLand() const;
```
检查是否为陆地地形。

### getDiggingStatus
```cpp
EDiggingStatus getDiggingStatus(bool excludeTop = true) const;
```
获取挖掘状态。

### hasFavorableWinds
```cpp
inline bool hasFavorableWinds() const;
```
检查是否有顺风效果。

### visitable
```cpp
inline bool visitable() const;
```
检查是否有可访问对象。

### blocked
```cpp
inline bool blocked() const;
```
检查是否有阻塞对象。

## 类型访问方法

### getTerrain
```cpp
inline const TerrainType * getTerrain() const;
```
获取地形类型对象。

### getRiver
```cpp
inline const RiverType * getRiver() const;
```
获取河流类型对象。

### getRoad
```cpp
inline const RoadType * getRoad() const;
```
获取道路类型对象。

### getTerrainID
```cpp
inline TerrainId getTerrainID() const;
```
获取地形ID。

### getRiverID
```cpp
inline RiverId getRiverID() const;
```
获取河流ID。

### getRoadID
```cpp
inline RoadId getRoadID() const;
```
获取道路ID。

### hasRiver
```cpp
inline bool hasRiver() const;
```
检查是否有河流。

### hasRoad
```cpp
inline bool hasRoad() const;
```
检查是否有道路。

## 成员变量

### 基本类型
```cpp
TerrainId terrainType;  // 地形类型ID
RiverId riverType;      // 河流类型ID
RoadId roadType;        // 道路类型ID
```

### 视觉表示
```cpp
ui8 terView;     // 地形视图索引
ui8 riverDir;    // 河流方向
ui8 roadDir;     // 道路方向
```

### 扩展标志
```cpp
ui8 extTileFlags; // 扩展地形标志
```
**标志位含义：**
- **位 0-1**: 地形图形旋转
- **位 2-3**: 河流图形旋转
- **位 4-5**: 道路图形旋转
- **位 6**: 海岸线标志（允许登陆或阻挡移动）
- **位 7**: 顺风效果

### 对象列表
```cpp
std::vector<ObjectInstanceID> visitableObjects;  // 可访问对象ID列表
std::vector<ObjectInstanceID> blockingObjects;   // 阻塞对象ID列表
```

## 序列化方法

### serialize
```cpp
template<typename Handler>
void serialize(Handler & h)
```
模板序列化方法。

**序列化内容：**
- `terrainType`, `terView`
- `riverType`, `riverDir`
- `roadType`, `roadDir`
- `extTileFlags`
- `visitableObjects`, `blockingObjects`

**版本兼容性：**
- 新版本：直接序列化对象ID向量
- 旧版本：序列化对象指针，然后转换为ID

## 工作原理

### 地形块状态
每个地形块维护三种主要状态：

1. **地形类型**: 决定基本属性（水域/陆地、可通行性）
2. **视觉表示**: 视图索引和旋转方向
3. **对象占用**: 可访问对象和阻塞对象列表

### 可进入性逻辑
```cpp
// 基本可进入性
bool canEnter = tile.entrableTerrain(); // 允许任何类型

// 从特定地形进入
bool canEnterFrom = tile.entrableTerrain(fromTile);

// 指定类型限制
bool canEnterLand = tile.entrableTerrain(true, false); // 仅陆地
```

### 对象管理
- **可访问对象**: 英雄可以交互的对象（如宝物、城镇入口）
- **阻塞对象**: 阻挡移动的对象（如山脉、森林）
- **层级**: 对象有层级关系，`topVisitableObj()` 返回最顶层的可访问对象

### 视觉系统
- **地形视图**: 决定地形的视觉外观
- **旋转**: 支持4个方向的旋转
- **扩展标志**: 提供额外的视觉和逻辑属性

## 使用示例

```cpp
// 检查地形可进入性
if (tile.entrableTerrain()) {
    // 可以移动到此地形
}

// 获取顶部可访问对象
ObjectInstanceID topObj = tile.topVisitableObj();
if (topObj != ObjectInstanceID::NONE) {
    // 有可访问对象
}

// 检查是否有阻塞
if (tile.blocked()) {
    // 此地形被阻塞
}

// 获取地形类型信息
const TerrainType* terrain = tile.getTerrain();
if (terrain->isWater()) {
    // 水域地形
}
```

## 序列化示例

```cpp
// 保存地形块
TerrainTile tile;
tile.terrainType = TerrainId::GRASS;
tile.terView = 0;
// ... 设置其他属性

JsonSerializer serializer(output);
tile.serialize(serializer);

// 加载地形块
JsonDeserializer deserializer(input);
tile.serialize(deserializer);
```

## 相关类

- `TerrainType`: 地形类型定义
- `RiverType`: 河流类型定义
- `RoadType`: 道路类型定义
- `CGObjectInstance`: 地图对象实例
- `ObjectInstanceID`: 对象实例ID类型