# IOwnableObject

## 概述

`IOwnableObject` 接口定义了VCMI中可拥有对象的标准行为，为所有可以被玩家占领并提供收益的地图对象提供统一的接口。该接口主要用于定义对象的经济收益和生物供应功能。

## 主要组件

### IOwnableObject 接口

可拥有对象的纯虚接口。

#### 纯虚方法

```cpp
virtual ResourceSet dailyIncome() const = 0;
```

获取对象的固定每日收入。不包括随机或周期性（如每周）收入来源。

```cpp
virtual std::vector<CreatureID> providedCreatures() const = 0;
```

获取对象提供的生物列表。用于城镇居民增长加成和召唤传送门。

#### 虚析构函数

```cpp
virtual ~IOwnableObject() = default;
```

默认虚析构函数。

## 机制说明

### 收益系统

1. **固定收入**: 提供稳定的每日资源收入
2. **资源类型**: 支持所有游戏资源类型的收入
3. **所有权依赖**: 通常只有被玩家占领时才提供收入
4. **累积计算**: 游戏系统会累积所有拥有对象的收入

### 生物供应

1. **居民增长**: 用于城镇的生物人口增长加成计算
2. **召唤传送门**: 为召唤传送门提供可召唤的生物类型
3. **动态列表**: 可以根据对象状态返回不同的生物列表
4. **类型限制**: 只返回该对象实际提供的生物类型

## 依赖关系

- **ResourceSet**: 资源集合类
- **CreatureID**: 生物ID类型

## 使用示例

### 实现可拥有对象

```cpp
#include "IOwnableObject.h"

class MyOwnableObject : public CGObjectInstance, public IOwnableObject
{
public:
    ResourceSet dailyIncome() const override
    {
        ResourceSet income;
        if (getOwner() != PlayerColor::NEUTRAL)
        {
            income[EGameResID::GOLD] = 500;    // 500金币每日
            income[EGameResID::WOOD] = 2;      // 2木材每日
            income[EGameResID::ORE] = 1;       // 1矿石每日
        }
        return income;
    }

    std::vector<CreatureID> providedCreatures() const override
    {
        if (getOwner() != PlayerColor::NEUTRAL)
        {
            return {CreatureID::PEASANT, CreatureID::ARCHER};
        }
        return {}; // 中立对象不提供生物
    }
};
```

### 城镇居民点实现

```cpp
#include "IOwnableObject.h"

class TownDwelling : public CGDwelling, public IOwnableObject
{
public:
    ResourceSet dailyIncome() const override
    {
        // 居民点通常不提供资源收入
        return ResourceSet();
    }

    std::vector<CreatureID> providedCreatures() const override
    {
        // 返回该居民点提供的生物类型
        return {creature}; // creature是居民点配置的生物
    }
};
```

### 矿场实现

```cpp
#include "IOwnableObject.h"

class Mine : public FlaggableMapObject, public IOwnableObject
{
public:
    ResourceSet dailyIncome() const override
    {
        ResourceSet income;
        if (getOwner() != PlayerColor::NEUTRAL)
        {
            // 根据矿场类型提供不同资源
            switch (mineType)
            {
                case MineType::GOLD:
                    income[EGameResID::GOLD] = 1000;
                    break;
                case MineType::WOOD:
                    income[EGameResID::WOOD] = 2;
                    break;
                case MineType::ORE:
                    income[EGameResID::ORE] = 2;
                    break;
                // 其他矿场类型...
            }
        }
        return income;
    }

    std::vector<CreatureID> providedCreatures() const override
    {
        // 矿场通常不提供生物
        return {};
    }
};
```

### 系统集成

```cpp
#include "IOwnableObject.h"

// 计算玩家总收入
ResourceSet calculateTotalIncome(PlayerColor player, const CGameState & gs)
{
    ResourceSet totalIncome;
    
    // 遍历所有可拥有对象
    for (const auto & obj : gs.map->objects)
    {
        if (auto ownable = dynamic_cast<const IOwnableObject *>(obj.get()))
        {
            if (obj->getOwner() == player)
            {
                totalIncome += ownable->dailyIncome();
            }
        }
    }
    
    return totalIncome;
}

// 获取可召唤生物列表
std::set<CreatureID> getSummonableCreatures(PlayerColor player, const CGameState & gs)
{
    std::set<CreatureID> creatures;
    
    for (const auto & obj : gs.map->objects)
    {
        if (auto ownable = dynamic_cast<const IOwnableObject *>(obj.get()))
        {
            if (obj->getOwner() == player)
            {
                auto provided = ownable->providedCreatures();
                creatures.insert(provided.begin(), provided.end());
            }
        }
    }
    
    return creatures;
}
```

## 性能特性

- **查询效率**: 收入和生物列表查询通常是O(1)操作
- **内存使用**: 接口本身不占用额外内存
- **计算开销**: 收益累积需要遍历所有对象

## 实现注意事项

1. **所有权检查**: 正确检查对象所有权以决定是否提供收益
2. **资源平衡**: 确保收益数值符合游戏平衡性
3. **生物一致性**: 只返回对象实际能够提供的生物类型
4. **状态依赖**: 收益可以根据对象状态动态调整

## 相关文档

- [FlaggableMapObject](FlaggableMapObject.md) - 可拥有对象的实现
- [CGDwelling](CGDwelling.md) - 居民点对象
- [ResourceSet](../ResourceSet.md) - 资源集合类