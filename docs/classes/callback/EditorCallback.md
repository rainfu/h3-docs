# EditorCallback

## 概述

`EditorCallback` 类是专门为地图编辑器设计的回调接口实现。它继承自 `MapInfoCallback`，提供了地图编辑器所需的功能，同时对游戏运行时的功能进行了适当的限制或模拟。

## 继承关系

```cpp
MapInfoCallback
└── EditorCallback
```

## 主要功能

EditorCallback 提供了以下核心功能：

1. **地图访问**: 提供对地图数据的只读访问
2. **编辑器限制**: 对游戏运行时功能进行适当限制
3. **可视化查询**: 支持地图可视化和对象查询
4. **传送系统**: 提供传送通道和入口的查询功能
5. **玩家状态**: 提供玩家相关信息的存根实现

## 核心方法

### 构造函数和初始化

#### EditorCallback
```cpp
explicit EditorCallback(const CMap * map);
```
- **参数**: `map` - 要编辑的地图对象
- **功能**: 使用指定的地图初始化编辑器回调

#### setMap
```cpp
void setMap(const CMap * map);
```
- **参数**: `map` - 新的地图对象
- **功能**: 切换到不同的地图

### 地图访问

#### getMapConstPtr
```cpp
const CMap * getMapConstPtr() const override;
```
- **返回值**: 当前地图的常量指针
- **功能**: 获取当前编辑的地图

### 游戏状态限制

#### gameState
```cpp
CGameState & gameState() override;
const CGameState & gameState() const override;
```
- **返回值**: 抛出异常或返回空
- **功能**: 编辑器中不可用的游戏状态访问
- **说明**: 在编辑器环境中不可用，会抛出异常

#### getStartInfo
```cpp
const StartInfo * getStartInfo() const override;
```
- **返回值**: nullptr
- **功能**: 获取游戏开始信息（编辑器中不可用）

#### getDate
```cpp
int getDate(Date mode) const override;
```
- **返回值**: 0
- **功能**: 获取游戏日期（编辑器中无意义）

### 地图查询

#### getTile
```cpp
const TerrainTile * getTile(int3 tile, bool verbose) const override;
const TerrainTile * getTileUnchecked(int3 tile) const override;
```
- **参数**:
  - `tile`: 瓦片坐标
  - `verbose`: 是否启用详细检查
- **返回值**: 指定坐标的地图瓦片
- **功能**: 获取地图瓦片信息

#### getTopObj
```cpp
const CGObjectInstance * getTopObj(int3 pos) const override;
```
- **参数**: `pos` - 位置坐标
- **返回值**: 该位置最顶层的对象
- **功能**: 获取位置上的主要对象

#### isTileGuardedUnchecked
```cpp
bool isTileGuardedUnchecked(int3 tile) const override;
```
- **参数**: `tile` - 瓦片坐标
- **返回值**: 瓦片是否被守卫
- **功能**: 检查瓦片守卫状态

### 路径和移动

#### calculatePaths
```cpp
void calculatePaths(const std::shared_ptr<PathfinderConfig> & config) const override;
```
- **参数**: `config` - 路径查找配置
- **功能**: 计算路径（编辑器中可能受限）

#### guardingCreaturePosition
```cpp
int3 guardingCreaturePosition(int3 pos) const override;
```
- **参数**: `pos` - 位置坐标
- **返回值**: 守卫生物的位置
- **功能**: 查找守卫指定位置的生物

#### checkForVisitableDir
```cpp
bool checkForVisitableDir(const int3 & src, const int3 & dst) const override;
```
- **参数**:
  - `src`: 起始位置
  - `dst`: 目标位置
- **返回值**: 是否可以从起始位置访问目标位置
- **功能**: 检查两个位置间的可访问性

### 传送系统

#### getVisibleTeleportObjects
```cpp
std::vector<ObjectInstanceID> getVisibleTeleportObjects(std::vector<ObjectInstanceID> ids, PlayerColor player) const override;
```
- **参数**:
  - `ids`: 传送对象ID列表
  - `player`: 玩家颜色
- **返回值**: 可见的传送对象ID列表
- **功能**: 获取玩家可见的传送对象

#### getTeleportChannelEntrances/Exits
```cpp
std::vector<ObjectInstanceID> getTeleportChannelEntrances(TeleportChannelID id, PlayerColor player) const override;
std::vector<ObjectInstanceID> getTeleportChannelExits(TeleportChannelID id, PlayerColor player) const override;
```
- **功能**: 获取传送通道的入口和出口

#### isTeleportChannelImpassable/Bidirectional
```cpp
bool isTeleportChannelImpassable(TeleportChannelID id, PlayerColor player) const override;
bool isTeleportChannelBidirectional(TeleportChannelID id, PlayerColor player) const override;
```
- **功能**: 检查传送通道的通行状态

### 可见性

#### isVisibleFor
```cpp
bool isVisibleFor(int3 pos, PlayerColor player) const override;
bool isVisibleFor(const CGObjectInstance * obj, PlayerColor player) const override;
```
- **参数**:
  - `pos`/`obj`: 位置或对象
  - `player`: 玩家颜色
- **返回值**: 对象对玩家是否可见
- **功能**: 检查可见性（编辑器中通常全部可见）

### 玩家相关（存根实现）

#### getPlayerState/getPlayerSettings
```cpp
const PlayerState * getPlayerState(PlayerColor color, bool verbose) const override;
const PlayerSettings * getPlayerSettings(PlayerColor color) const override;
```
- **返回值**: nullptr 或默认值
- **功能**: 玩家状态访问（编辑器中不可用）

#### getPlayerRelations/getHeroCount
```cpp
PlayerRelations getPlayerRelations(PlayerColor color1, PlayerColor color2) const override;
int getHeroCount(PlayerColor player, bool includeGarrisoned) const override;
```
- **返回值**: 默认值
- **功能**: 玩家关系和英雄计数

### 脚本支持

#### getGlobalContextPool (条件编译)
```cpp
scripting::Pool * getGlobalContextPool() const override;
```
- **返回值**: 全局脚本上下文池
- **功能**: 获取脚本上下文（仅在启用脚本时可用）

## 设计意图

EditorCallback 的设计目的是为了：

1. **编辑器支持**: 提供地图编辑器所需的核心功能
2. **安全限制**: 防止编辑器访问游戏运行时状态
3. **可视化**: 支持地图的可视化和对象查询
4. **传送系统**: 处理地图中的传送机制
5. **向后兼容**: 保持与游戏回调接口的一致性

## 使用场景

### 地图编辑器组件
```cpp
// 在地图编辑器中使用
class MapEditor {
private:
    EditorCallback callback;

public:
    MapEditor(const CMap* map)
        : callback(map)
    {}

    void checkTileVisibility(int3 pos) {
        // 检查瓦片是否可见（编辑器中通常都可见）
        bool visible = callback.isVisibleFor(pos, PlayerColor::NEUTRAL);
    }

    void getTeleportInfo() {
        // 获取传送通道信息
        auto entrances = callback.getTeleportChannelEntrances(TeleportChannelID(0));
    }
};
```

### 地图验证工具
```cpp
// 使用编辑器回调验证地图
void validateMap(const CMap* map) {
    EditorCallback callback(map);

    // 检查所有对象的有效性
    for(const auto* obj : map->objects) {
        auto topObj = callback.getTopObj(obj->pos);
        // 验证对象位置...
    }
}
```

这个类为VCMI地图编辑器提供了必要的功能支持，同时确保了编辑器和游戏运行时的适当分离。