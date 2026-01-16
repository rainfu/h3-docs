# CGameInfoCallback

## 概述

`CGameInfoCallback` 类是VCMI游戏信息回调系统的核心实现。它继承自 `MapInfoCallback`，提供了对游戏状态、玩家信息、地图数据和游戏对象的全面访问接口。

## 继承关系

```cpp
MapInfoCallback
└── CGameInfoCallback
```

## 主要功能

CGameInfoCallback 提供了以下核心功能：

1. **游戏状态访问**: 提供对游戏全局状态的访问
2. **玩家信息查询**: 获取玩家状态、资源、关系等信息
3. **地图信息获取**: 查询地图瓦片、对象和地形信息
4. **英雄和城镇管理**: 处理英雄和城镇相关的数据查询
5. **战斗和法术计算**: 提供战斗相关的估算和法术信息
6. **可见性和访问控制**: 管理玩家对游戏信息的可见性
7. **传送系统**: 处理地图中的传送通道和入口

## 核心方法

### 游戏基本信息

#### getDate
```cpp
int getDate(Date mode = Date::DAY) const override;
```
- **参数**: `mode` - 日期查询模式
- **返回值**: 相应的日期信息
- **功能**: 获取游戏日期信息
  - `Date::DAY`: 总游戏天数
  - `Date::DAY_OF_WEEK`: 星期几
  - `Date::WEEK`: 当前星期
  - `Date::MONTH`: 当前月份

#### getStartInfo
```cpp
const StartInfo * getStartInfo() const override;
const StartInfo * getInitialStartInfo() const;
```
- **返回值**: 游戏开始信息
- **功能**: 获取游戏的初始设置和玩家配置

### 玩家相关

#### getPlayerID
```cpp
virtual std::optional<PlayerColor> getPlayerID() const;
```
- **返回值**: 当前玩家的ID（如果有的话）
- **功能**: 获取当前回调上下文的玩家身份

#### getPlayerState
```cpp
const PlayerState * getPlayerState(PlayerColor color, bool verbose = true) const override;
```
- **参数**:
  - `color`: 玩家颜色
  - `verbose`: 是否启用详细错误日志
- **返回值**: 玩家状态信息
- **功能**: 获取指定玩家的完整状态

#### getResource
```cpp
int getResource(PlayerColor Player, GameResID which) const override;
```
- **参数**:
  - `Player`: 玩家颜色
  - `which`: 资源类型ID
- **返回值**: 玩家拥有的指定资源数量
- **功能**: 查询玩家的资源储备

#### getPlayerRelations
```cpp
PlayerRelations getPlayerRelations(PlayerColor color1, PlayerColor color2) const override;
```
- **参数**:
  - `color1`, `color2`: 要比较关系的两个玩家
- **返回值**: 玩家间的关系状态
- **功能**: 判断两个玩家间的外交关系

#### getPlayerStatus
```cpp
EPlayerStatus getPlayerStatus(PlayerColor player, bool verbose = true) const override;
```
- **返回值**: 玩家的当前状态
- **功能**: 获取玩家的游戏状态（活跃、失败等）

### 英雄相关

#### getHeroes
```cpp
std::vector<const CGHeroInstance*> getHeroes(PlayerColor player) const;
```
- **参数**: `player` - 玩家颜色
- **返回值**: 玩家所有英雄的列表
- **功能**: 获取指定玩家控制的所有英雄

#### getHeroCount
```cpp
int getHeroCount(PlayerColor player, bool includeGarrisoned) const override;
```
- **参数**:
  - `player`: 玩家颜色
  - `includeGarrisoned`: 是否包括驻守在城镇中的英雄
- **返回值**: 英雄数量
- **功能**: 统计玩家的英雄数量

#### getHeroInfo
```cpp
bool getHeroInfo(const CGObjectInstance * hero, InfoAboutHero & dest, const CGObjectInstance * selectedObject = nullptr) const;
```
- **参数**:
  - `hero`: 英雄对象
  - `dest`: 输出参数，接收英雄信息
  - `selectedObject`: 选中的对象（用于上下文）
- **返回值**: 是否成功获取信息
- **功能**: 获取英雄的详细信息

#### getSpellCost
```cpp
int32_t getSpellCost(const spells::Spell * sp, const CGHeroInstance * caster) const;
```
- **参数**:
  - `sp`: 法术对象
  - `caster`: 施法英雄
- **返回值**: 施放该法术所需的法力值
- **功能**: 计算法术的施放成本

#### estimateSpellDamage
```cpp
int64_t estimateSpellDamage(const CSpell * sp, const CGHeroInstance * hero) const;
```
- **参数**:
  - `sp`: 法术
  - `hero`: 施法英雄
- **返回值**: 预估的法术伤害
- **功能**: 估算法术的伤害输出

### 城镇相关

#### howManyTowns
```cpp
int howManyTowns(PlayerColor Player) const;
```
- **参数**: `Player` - 玩家颜色
- **返回值**: 玩家拥有的城镇数量
- **功能**: 统计玩家的城镇数量

#### getAvailableHeroes
```cpp
std::vector<const CGHeroInstance *> getAvailableHeroes(const CGObjectInstance * townOrTavern) const;
```
- **参数**: `townOrTavern` - 城镇或酒馆对象
- **返回值**: 可用的英雄列表
- **功能**: 获取在指定地点可招募的英雄

#### canBuildStructure
```cpp
EBuildingState canBuildStructure(const CGTownInstance *t, BuildingID ID) const;
```
- **参数**:
  - `t`: 城镇实例
  - `ID`: 建筑ID
- **返回值**: 建筑状态（可建造、已建造等）
- **功能**: 检查是否可以在城镇中建造指定建筑

#### getTownInfo
```cpp
bool getTownInfo(const CGObjectInstance * town, InfoAboutTown & dest, const CGObjectInstance * selectedObject = nullptr) const;
```
- **功能**: 获取城镇的详细信息

### 地图和对象查询

#### getObj
```cpp
const CGObjectInstance * getObj(ObjectInstanceID objId, bool verbose = true) const override;
```
- **参数**:
  - `objId`: 对象实例ID
  - `verbose`: 是否启用详细检查
- **返回值**: 地图对象实例
- **功能**: 通过ID获取地图对象

#### getTopObj
```cpp
const CGObjectInstance * getTopObj(int3 pos) const override;
```
- **参数**: `pos` - 地图坐标
- **返回值**: 指定位置最顶层的对象
- **功能**: 获取位置上的主要对象

#### getVisitableObjs
```cpp
std::vector<const CGObjectInstance *> getVisitableObjs(int3 pos, bool verbose = true) const;
```
- **参数**: `pos` - 位置坐标
- **返回值**: 该位置可访问的对象列表
- **功能**: 获取位置上所有可访问的对象

#### getTile
```cpp
const TerrainTile * getTile(int3 tile, bool verbose = true) const override;
```
- **参数**:
  - `tile`: 瓦片坐标
  - `verbose`: 是否启用边界检查
- **返回值**: 地形瓦片信息
- **功能**: 获取地图瓦片的地形信息

### 可见性和访问控制

#### isVisibleFor
```cpp
bool isVisibleFor(int3 pos, PlayerColor player) const override;
bool isVisibleFor(const CGObjectInstance * obj, PlayerColor player) const override;
```
- **参数**:
  - `pos`/`obj`: 位置或对象
  - `player`: 玩家颜色
- **返回值**: 对象对玩家是否可见
- **功能**: 检查可见性（基于迷雾状态）

#### hasAccess
```cpp
bool hasAccess(std::optional<PlayerColor> playerId) const;
```
- **参数**: `playerId` - 玩家ID
- **返回值**: 是否有访问权限
- **功能**: 检查是否有权限访问玩家信息

#### canGetFullInfo
```cpp
bool canGetFullInfo(const CGObjectInstance *obj) const;
```
- **参数**: `obj` - 游戏对象
- **返回值**: 是否可以获取完整信息
- **功能**: 检查是否可以获取对象的完整信息

### 传送系统

#### getVisibleTeleportObjects
```cpp
std::vector<ObjectInstanceID> getVisibleTeleportObjects(std::vector<ObjectInstanceID> ids, PlayerColor player) const override;
```
- **功能**: 获取玩家可见的传送对象

#### getTeleportChannelEntrances/Exits
```cpp
std::vector<ObjectInstanceID> getTeleportChannelEntrances(TeleportChannelID id, PlayerColor Player = PlayerColor::UNFLAGGABLE) const override;
std::vector<ObjectInstanceID> getTeleportChannelExits(TeleportChannelID id, PlayerColor Player = PlayerColor::UNFLAGGABLE) const override;
```
- **功能**: 获取传送通道的入口和出口

#### isTeleportChannelImpassable
```cpp
bool isTeleportChannelImpassable(TeleportChannelID id, PlayerColor player = PlayerColor::UNFLAGGABLE) const override;
```
- **功能**: 检查传送通道是否不可通行

### 其他功能

#### getFreeTiles
```cpp
void getFreeTiles(std::vector<int3> &tiles, bool skipIfNearbyGuarded) const;
```
- **功能**: 获取地图上的空闲瓦片（用于随机生成）

#### getAllowedSpells
```cpp
void getAllowedSpells(std::vector<SpellID> &out, std::optional<ui16> level = std::nullopt) const;
```
- **功能**: 获取允许使用的法术列表

## 设计意图

CGameInfoCallback 的设计目的是为了：

1. **信息访问**: 提供对游戏所有状态信息的统一访问接口
2. **访问控制**: 实现基于玩家视角的信息可见性控制
3. **性能优化**: 提供高效的数据查询方法
4. **扩展性**: 支持各种游戏对象的查询和计算
5. **AI支持**: 为AI提供必要的信息查询功能

## 使用场景

### AI决策系统
```cpp
class AIPlayer {
private:
    CGameInfoCallback& callback;

public:
    void makeDecision() {
        // 获取当前玩家状态
        auto playerState = callback.getPlayerState(callback.getPlayerID().value());

        // 获取可用英雄
        auto heroes = callback.getHeroes(callback.getPlayerID().value());

        // 检查资源
        int gold = callback.getResource(callback.getPlayerID().value(), GameResID::GOLD);

        // 做出决策...
    }
};
```

### 游戏界面显示
```cpp
class GameInterface {
private:
    CGameInfoCallback& callback;

public:
    void updateDisplay() {
        // 获取当前日期
        int day = callback.getDate(Date::DAY);

        // 获取玩家城镇
        int townCount = callback.howManyTowns(playerColor);

        // 更新界面...
    }
};
```

这个类是VCMI游戏逻辑的核心，为所有需要访问游戏信息的组件提供了统一的接口。