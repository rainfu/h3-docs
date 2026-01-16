# FlaggableMapObject

## 概述

`FlaggableMapObject` 类实现了VCMI中可拥有旗帜的地图对象机制，如城镇、矿场、灯塔等。这些对象可以被玩家占领，并提供各种收益和加成。该类结合了对象实例、可拥有对象和奖励系统节点的功能。

## 主要组件

### FlaggableMapObject 类

可拥有旗帜的地图对象的最终类，继承自CGObjectInstance、IOwnableObject和CBonusSystemNode。

#### 私有方法

```cpp
std::shared_ptr<FlaggableInstanceConstructor> getFlaggableHandler() const;
```

获取可拥有对象处理器。

```cpp
void initBonuses();
```

初始化奖励加成。

#### 公共方法

```cpp
void onHeroVisit(IGameEventCallback & gameEvents, const CGHeroInstance * h) const override;
```

英雄访问对象的处理逻辑。

```cpp
void initObj(IGameRandomizer & gameRandomizer) override;
```

初始化对象。

```cpp
const IOwnableObject * asOwnable() const final;
```

转换为可拥有对象接口。

```cpp
ResourceSet dailyIncome() const override;
```

获取每日收入。

```cpp
std::vector<CreatureID> providedCreatures() const override;
```

获取提供的生物类型。

```cpp
void attachToBonusSystem(CGameState & gs) override;
```

附加到奖励系统。

```cpp
void detachFromBonusSystem(CGameState & gs) override;
```

从奖励系统分离。

```cpp
void restoreBonusSystem(CGameState & gs) override;
```

恢复奖励系统。

```cpp
PlayerColor getOwner() const override;
```

获取对象拥有者。

```cpp
void serializeJsonOptions(JsonSerializeFormat & handler) override;
```

序列化JSON选项。

## 机制说明

### 旗帜和拥有权

1. **玩家拥有**: 对象可以被特定玩家占领和拥有
2. **视觉标识**: 通过旗帜显示拥有权归属
3. **所有权转移**: 支持对象所有权的改变
4. **玩家特定**: 不同玩家拥有时提供不同收益

### 收益系统

1. **每日收入**: 提供固定的每日资源收入
2. **生物供应**: 某些对象可以提供特定生物的招募
3. **奖励加成**: 通过奖励系统提供各种加成效果
4. **动态更新**: 所有权改变时收益自动更新

### 奖励系统集成

1. **节点注册**: 对象作为奖励系统节点注册到游戏状态
2. **加成传播**: 向拥有者及其英雄传播奖励加成
3. **状态同步**: 确保奖励系统与对象状态同步
4. **版本兼容**: 支持序列化版本兼容性

## 依赖关系

- **CGObjectInstance**: 地图对象实例基类
- **IOwnableObject**: 可拥有对象接口
- **CBonusSystemNode**: 奖励系统节点
- **IGameEventCallback**: 游戏事件回调接口
- **CGHeroInstance**: 英雄实例类
- **ResourceSet**: 资源集合
- **Bonus**: 奖励结构

## 使用示例

### 创建可拥有对象

```cpp
#include "FlaggableMapObject.h"

// 创建可拥有对象实例
auto flaggableObj = std::make_shared<FlaggableMapObject>(cb);

// 设置拥有者
flaggableObj->setOwner(PlayerColor::RED);

// 初始化奖励系统
flaggableObj->initBonuses();
```

### 配置每日收入

```cpp
#include "FlaggableMapObject.h"

// 设置每日收入（在子类中实现）
ResourceSet FlaggableMapObject::dailyIncome() const
{
    ResourceSet income;
    if (getOwner() != PlayerColor::NEUTRAL)
    {
        income[EGameResID::GOLD] = 500; // 500金币每日
        income[EGameResID::WOOD] = 1;   // 1木材每日
    }
    return income;
}
```

### 配置生物供应

```cpp
#include "FlaggableMapObject.h"

// 设置提供的生物类型（在子类中实现）
std::vector<CreatureID> FlaggableMapObject::providedCreatures() const
{
    if (getOwner() != PlayerColor::NEUTRAL)
    {
        return {CreatureID::PEASANT, CreatureID::ARCHER};
    }
    return {};
}
```

### 处理奖励系统

```cpp
#include "FlaggableMapObject.h"

// 附加到奖励系统
void attachToBonusSystem(CGameState & gs) override
{
    // 添加对象特定的奖励
    addNewBonus(std::make_shared<Bonus>(
        BonusDuration::PERMANENT,
        BonusType::MORALE,
        BonusSource::OBJECT,
        1, // +1士气
        BonusSourceID(id)
    ));
    
    // 调用父类方法
    CBonusSystemNode::attachToBonusSystem(gs);
}

// 从奖励系统分离
void detachFromBonusSystem(CGameState & gs) override
{
    // 移除奖励
    removeBonuses(BonusSource::OBJECT, BonusSourceID(id));
    
    // 调用父类方法
    CBonusSystemNode::detachFromBonusSystem(gs);
}
```

### 处理所有权改变

```cpp
#include "FlaggableMapObject.h"

// 当对象所有权改变时
void changeOwner(PlayerColor newOwner)
{
    auto oldOwner = getOwner();
    
    // 从旧拥有者的奖励系统分离
    if (oldOwner != PlayerColor::NEUTRAL)
        detachFromBonusSystem(*gs);
    
    // 设置新拥有者
    setOwner(newOwner);
    
    // 附加到新拥有者的奖励系统
    if (newOwner != PlayerColor::NEUTRAL)
        attachToBonusSystem(*gs);
}
```

## 性能特性

- **内存使用**: 存储拥有者信息和奖励配置
- **系统开销**: 奖励系统注册和更新有一定开销
- **序列化**: 支持版本兼容的序列化
- **查询效率**: 快速的拥有者和收益查询

## 实现注意事项

1. **状态同步**: 确保对象状态与奖励系统同步
2. **所有权验证**: 正确处理所有权改变逻辑
3. **收益计算**: 准确计算不同拥有者的收益
4. **版本兼容**: 处理序列化版本差异

## 相关文档

- [CGObjectInstance](CGObjectInstance.md) - 地图对象实例基类
- [IOwnableObject](IOwnableObject.md) - 可拥有对象接口
- [CBonusSystemNode](../bonuses/CBonusSystemNode.md) - 奖励系统节点