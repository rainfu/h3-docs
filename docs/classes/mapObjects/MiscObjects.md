# MiscObjects

## 概述

`MiscObjects.h` 包含了VCMI中各种杂项地图对象的实现。这些对象包括地标、传送门、矿场、船只、魔法相关的对象等，为游戏地图添加了丰富的交互元素和功能。

## 主要对象类型

### 访问控制对象

#### CTeamVisited
队伍访问记录对象，已废弃，建议使用CRewardableObject替代。

#### CGObelisk
方尖碑对象，继承自CTeamVisited，用于记录队伍访问。

### 信息对象

#### CGSignBottle
标志和海洋瓶对象，用于显示地图信息和消息。

### 驻军对象

#### CGGarrison
驻军对象，继承自CArmedInstance和IOwnableObject，提供军队驻扎功能。

### 神器对象

#### CGArtifact
神器对象，继承自CArmedInstance，可能有守护生物保护的神器。

### 资源对象

#### CGMine
矿场对象，继承自CArmedInstance和IOwnableObject，提供资源开采功能。

### 传送对象

#### CGTeleport
传送对象基类，提供地图传送功能。

#### CGMonolith
单向传送门，继承自CGTeleport。

#### CGSubterraneanGate
地下之门，继承自CGMonolith，双向传送。

#### CGWhirlpool
漩涡，继承自CGMonolith，特殊传送效果。

### 特殊对象

#### CGSirens
塞壬对象，可能有特殊效果。

#### CGBoat
船只对象，继承自CGObjectInstance和CBonusSystemNode。

#### CGShipyard
船厂对象，继承自CGObjectInstance、IShipyard和IOwnableObject。

#### CGMagi
法师对象，可能提供魔法相关功能。

#### CGDenOfthieves
盗贼窝对象，可能提供情报功能。

#### CGTerrainPatch
地形补丁对象，用于修改局部地形。

#### HillFort
山丘堡垒对象，继承自CGObjectInstance和ICreatureUpgrader，提供生物升级功能。

## 核心机制

### 传送系统
- **单向传送**: CGMonolith提供单向地图传送
- **双向传送**: CGSubterraneanGate提供双向传送
- **特殊效果**: CGWhirlpool提供带效果的传送
- **出口管理**: TTeleportExitsList管理传送出口

### 资源开采
- **矿场系统**: CGMine提供各种资源的开采
- **所有权收益**: 通过IOwnableObject提供每日收入
- **守护保护**: 可能有守护生物保护

### 信息显示
- **标志信息**: CGSignBottle显示地图标记和消息
- **访问记录**: 记录哪些队伍访问过特定位置

### 军队管理
- **驻军功能**: CGGarrison提供军队驻扎
- **所有权控制**: 通过IOwnableObject管理拥有权

## 依赖关系

- **CGObjectInstance**: 地图对象基类
- **CArmedInstance**: 武装实例基类
- **IOwnableObject**: 可拥有对象接口
- **CBonusSystemNode**: 奖励系统节点
- **IShipyard**: 船厂接口
- **ICreatureUpgrader**: 生物升级接口
- **CArtifactInstance**: 神器实例类

## 使用示例

### 创建传送门

```cpp
#include "MiscObjects.h"

// 创建单向传送门
auto monolith = std::make_shared<CGMonolith>();
monolith->setProperty(ObjProperty::TELEPORT_CHANNEL, channelID);

// 创建地下之门（双向）
auto gate = std::make_shared<CGSubterraneanGate>();
gate->setProperty(ObjProperty::TELEPORT_CHANNEL, channelID);
```

### 创建矿场

```cpp
#include "MiscObjects.h"

// 创建金矿
auto goldMine = std::make_shared<CGMine>();
goldMine->setProperty(ObjProperty::MINE_RESOURCE, EGameResID::GOLD);
goldMine->setOwner(PlayerColor::RED);

// 矿场会自动提供每日收入
ResourceSet income = goldMine->dailyIncome(); // 返回金币收入
```

### 创建船厂

```cpp
#include "MiscObjects.h"

// 创建船厂
auto shipyard = std::make_shared<CGShipyard>();
shipyard->setOwner(PlayerColor::BLUE);

// 船厂可以建造船只
if (shipyard->canBuildBoat())
{
    shipyard->buildBoat();
}
```

### 创建标志

```cpp
#include "MiscObjects.h"

// 创建地图标志
auto sign = std::make_shared<CGSignBottle>();
sign->message = MetaString::createFromTextID("map.sign.welcome");

// 创建海洋瓶
auto bottle = std::make_shared<CGSignBottle>();
bottle->message = MetaString::createFromTextID("ocean.bottle.message");
```

## 性能特性

- **对象多样性**: 支持多种特殊对象类型
- **功能丰富**: 每个对象类型有特定功能
- **内存使用**: 根据对象类型和配置决定内存占用
- **交互复杂度**: 不同对象的交互逻辑复杂度不同

## 实现注意事项

1. **类型区分**: 正确区分不同杂项对象的具体类型和功能
2. **状态管理**: 管理对象的访问状态、所有权和特殊属性
3. **传送逻辑**: 正确实现传送门的连接和出口管理
4. **资源平衡**: 确保矿场和船厂的收益平衡

## 相关文档

- [CGObjectInstance](CGObjectInstance.md) - 地图对象基类
- [CArmedInstance](army/CArmedInstance.md) - 武装实例基类
- [IOwnableObject](IOwnableObject.md) - 可拥有对象接口
- [CRewardableObject](CRewardableObject.md) - 可奖励对象基类