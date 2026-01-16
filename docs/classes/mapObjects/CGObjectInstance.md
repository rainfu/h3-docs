# CGObjectInstance

## 概述

`CGObjectInstance` 是VCMI中所有地图对象的基类，定义了地图上各种对象的通用属性和行为。它继承自`IObjectInterface`，提供了对象定位、访问控制、视觉表现和交互功能的基础框架。

## 核心属性

### 基本标识
```cpp
MapObjectID ID;              // 对象类型（如城镇、英雄、生物等）
MapObjectSubID subID;        // 对象子类型
ObjectInstanceID id;         // 对象在地图对象列表中的索引
PlayerColor tempOwner;       // 对象当前所有者
```

### 位置和外观
```cpp
int3 pos;                    // 对象右下角在地图上的位置
std::shared_ptr<const ObjectTemplate> appearance;  // 定义对象在地图上的外观
std::string instanceName;    // 实例名称
```

### 行为控制
```cpp
bool blockVisit;             // 是否阻止访问
bool removable;              // 是否可移除
ui32 rmgValue;               // 随机地图生成时的价值
```

## 构造函数和析构函数

### CGObjectInstance
```cpp
CGObjectInstance(IGameInfoCallback *cb);
```
- **参数**: `cb` - 游戏信息回调接口
- **功能**: 创建地图对象实例

### ~CGObjectInstance
```cpp
~CGObjectInstance() override;
```
- **功能**: 销毁地图对象实例

## 基本信息获取

### getObjGroupIndex / getObjTypeIndex
```cpp
MapObjectID getObjGroupIndex() const override;
MapObjectSubID getObjTypeIndex() const override;
```
- **返回值**: 对象的主类型和子类型ID
- **功能**: 获取对象的类型标识符

### getTypeName / getSubtypeName
```cpp
std::string getTypeName() const;
std::string getSubtypeName() const;
```
- **返回值**: 对象类型和子类型的本地化名称
- **功能**: 获取对象的可读名称

## 位置和尺寸

### 位置访问器
```cpp
int3 visitablePos() const override;    // 可访问位置
int3 anchorPos() const override;       // 锚点位置
int3 getTopVisiblePos() const;         // 顶部可见位置
int3 getSightCenter() const;           // 视野中心点
```

### 尺寸信息
```cpp
int getWidth() const;      // 对象图形宽度（单位：格子）
int getHeight() const;     // 对象图形高度（单位：格子）
```

### 位置查询
```cpp
bool visitableAt(const int3 & pos) const;  // 指定位置是否可访问
bool blockingAt(const int3 & pos) const;   // 指定位置是否阻挡
bool coveringAt(const int3 & pos) const;   // 指定位置是否被覆盖
```

### 位置集合
```cpp
std::set<int3> getBlockedPos() const;           // 被阻挡的绝对位置集合
const std::set<int3> & getBlockedOffsets() const; // 被阻挡的相对位置集合
```

## 访问控制

### 基本访问属性
```cpp
bool isVisitable() const;           // 对象是否可访问
bool isBlockedVisitable() const;    // 是否为阻挡式访问
bool isRemovable() const;           // 是否可移除
bool isCoastVisitable() const;      // 是否可从海岸访问
```

### 所有者管理
```cpp
PlayerColor getOwner() const override;
void setOwner(const PlayerColor & ow);
```
- **功能**: 获取和设置对象的所有者

## 视觉和音频

### 音频资源
```cpp
std::optional<AudioPath> getAmbientSound(vstd::RNG & rng) const;  // 环境音效
std::optional<AudioPath> getVisitSound(vstd::RNG & rng) const;    // 访问音效
std::optional<AudioPath> getRemovalSound(vstd::RNG & rng) const;  // 移除音效
```

### 战斗相关
```cpp
virtual BattleField getBattlefield() const;  // 获取战斗场地类型
```

## 交互接口

### 名称和悬停文本
```cpp
virtual std::string getObjectName() const;                    // 对象通用名称
virtual std::string getHoverText(PlayerColor player) const;   // 玩家悬停文本
virtual std::string getHoverText(const CGHeroInstance * hero) const; // 英雄悬停文本
```

### 弹出信息
```cpp
virtual std::string getPopupText(PlayerColor player) const;   // 弹出文本
virtual std::string getPopupText(const CGHeroInstance * hero) const; // 英雄弹出文本

virtual std::vector<Component> getPopupComponents(PlayerColor player) const;   // 弹出组件
virtual std::vector<Component> getPopupComponents(const CGHeroInstance * hero) const;
```

## 游戏逻辑接口

### 英雄访问
```cpp
void onHeroVisit(IGameEventCallback & gameEvents, const CGHeroInstance * h) const override;
```
- **参数**:
  - `gameEvents`: 游戏事件回调
  - `h`: 访问的英雄
- **功能**: 处理英雄访问对象的逻辑

### 属性设置
```cpp
void setProperty(ObjProperty what, ObjPropertyID identifier) final;
```
- **功能**: 设置对象属性（同步更新）

### 生命周期钩子
```cpp
virtual void afterAddToMap(CMap * map);      // 添加到地图后
virtual void afterRemoveFromMap(CMap * map); // 从地图移除后
virtual void attachToBonusSystem(CGameState & gs);   // 附加到奖励系统
virtual void detachFromBonusSystem(CGameState & gs); // 从奖励系统分离
virtual void restoreBonusSystem(CGameState & gs);    // 恢复奖励系统
```

## 序列化接口

### 二进制序列化
```cpp
template <typename Handler> void serialize(Handler &h)
```
- **功能**: 处理对象的二进制序列化

### JSON序列化
```cpp
void serializeJson(JsonSerializeFormat & handler);
virtual void updateFrom(const JsonNode & data);
```
- **功能**: 处理对象的JSON序列化和配置更新

## 受保护方法

### 属性派生设置
```cpp
virtual void setPropertyDer(ObjProperty what, ObjPropertyID identifier);
```
- **功能**: 派生类实现的属性设置逻辑

### 类型设置
```cpp
void setType(MapObjectID ID, MapObjectSubID subID);
```
- **功能**: 设置对象的类型（主要用于地图随机化）

### 奖励给予
```cpp
void giveDummyBonus(IGameEventCallback & gameEvents, const ObjectInstanceID & heroID, BonusDuration::Type duration = BonusDuration::ONE_DAY) const;
```
- **功能**: 给予英雄虚拟奖励（用于跟踪访问状态）

## 设计意图

CGObjectInstance的设计目标：

1. **统一接口**: 为所有地图对象提供一致的访问和交互接口
2. **位置管理**: 处理对象在地图上的定位、阻挡和访问逻辑
3. **视觉表现**: 定义对象的视觉和音频表现
4. **生命周期管理**: 支持对象的创建、销毁和状态变化
5. **序列化支持**: 完整的保存/加载功能
6. **扩展性**: 通过虚方法允许派生类自定义行为
7. **类型安全**: 使用强类型ID避免错误

## 继承层次

CGObjectInstance是地图对象系统的根类，其主要派生类包括：
- `CGHeroInstance`: 英雄实例
- `CGTownInstance`: 城镇实例
- `CGCreature`: 生物实例
- `CGArtifact`: 神器实例
- 各种其他地图对象（矿山、市场、魔法井等）

这个类构成了VCMI地图系统的核心，为游戏世界中的各种交互元素提供了基础框架。

    TObjectTypeHandler getObjectHandler() const;

    bool passableFor(PlayerColor color) const;
    int getSightRadius() const;
    int3 getVisitableOffset() const;
    std::string getObjectName() const;
    std::string getHoverText(PlayerColor player) const;
    std::string getHoverText(const CGHeroInstance * hero) const;
    std::string getPopupText(PlayerColor player) const;
    std::string getPopupText(const CGHeroInstance * hero) const;
    std::vector<Component> getPopupComponents(PlayerColor player) const;
    std::vector<Component> getPopupComponents(const CGHeroInstance * hero) const;

    const IOwnableObject * asOwnable() const override;

    void initObj(IGameRandomizer & gameRandomizer) override;
    void pickRandomObject(IGameRandomizer & gameRandomizer) override;
    void onHeroVisit(IGameEventCallback & gameEvents, const CGHeroInstance * h) const override;
    void setProperty(ObjProperty what, ObjPropertyID identifier) final;

    virtual void afterAddToMap(CMap * map);
    virtual void afterRemoveFromMap(CMap * map);
    virtual void attachToBonusSystem(CGameState & gs);
    virtual void detachFromBonusSystem(CGameState & gs);
    virtual void restoreBonusSystem(CGameState & gs);

    template <typename Handler> void serialize(Handler &h);
    void serializeJson(JsonSerializeFormat & handler);
    virtual void updateFrom(const JsonNode & data);

protected:
    virtual void setPropertyDer(ObjProperty what, ObjPropertyID identifier);
    void setType(MapObjectID ID, MapObjectSubID subID);
    void giveDummyBonus(IGameEventCallback & gameEvents, const ObjectInstanceID & heroID, BonusDuration::Type duration = BonusDuration::ONE_DAY) const;
    virtual void serializeJsonOptions(JsonSerializeFormat & handler);
    void serializeJsonOwner(JsonSerializeFormat & handler);
};
```

## 功能说明

CGObjectInstance是VCMI中所有地图对象的基类，它代表了游戏地图上的任何对象（如英雄、城镇、资源、怪物等）。这个类提供了地图对象的基本属性和行为，包括位置、外观、所有权、访问性等。它还实现了IObjectInterface接口，提供了与游戏事件交互的方法。

## 依赖关系

- [IObjectInterface](./IObjectInterface.md): 对象接口
- [ObjectTemplate](./ObjectTemplate.md): 对象外观模板
- [IGameInfoCallback](../callback/IGameInfoCallback.md): 游戏信息回调
- [IGameEventCallback](../events/IGameEventCallback.md): 游戏事件回调
- [CGameState](../gameState/CGameState.md): 游戏状态
- [CMap](../map/CMap.md): 游戏地图
- [CGHeroInstance](../entities/CHero.md): 英雄实例
- [Component](../ui/Component.md): 组件
- [AudioPath](../filesystem/ResourcePath.md): 音频路径
- [JsonSerializeFormat](../json/JsonSerializeFormat.md): JSON序列化格式

## 函数注释

- `CGObjectInstance(cb)`: 构造函数，创建地图对象实例
- `getObjGroupIndex()`: 获取对象组索引
- `getObjTypeIndex()`: 获取对象类型索引
- `getTypeName()`: 获取对象类型名称
- `getSubtypeName()`: 获取对象子类型名称
- `getSightCenter()`: 获取视野中心点
- `getWidth()`, `getHeight()`: 获取对象图形的宽度和高度（以瓦片为单位）
- `visitablePos()`: 获取可访问位置
- `anchorPos()`: 获取锚点位置
- `isVisitable()`: 检查对象是否可访问
- `getOwner()`: 获取对象拥有者
- `setOwner(ow)`: 设置对象拥有者
- `onHeroVisit(gameEvents, h)`: 英雄访问时的回调
- `getHoverText(player)`, `getHoverText(hero)`: 获取悬停文本
- `getPopupText(player)`, `getPopupText(hero)`: 获取弹出文本
- `getSightRadius()`: 获取视野半径
- `getObjectName()`: 获取对象名称
- `passableFor(color)`: 检查对象对特定玩家是否可通行
- `isRemovable()`: 检查对象是否可移除
- `getBlockedPos()`: 获取被对象阻挡的位置
- `afterAddToMap(map)`: 添加到地图后的回调
- `afterRemoveFromMap(map)`: 从地图移除后的回调
- `attachToBonusSystem(gs)`: 附加到奖励系统
- `detachFromBonusSystem(gs)`: 从奖励系统分离
- `serialize(h)`: 二进制序列化
- `serializeJson(handler)`: JSON序列化