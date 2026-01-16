# TavernHeroesPool

## 概述

`TavernHeroesPool` 类管理游戏中的酒馆英雄池系统。该类负责维护所有可用英雄的列表，处理英雄在酒馆中的分配，以及管理不同玩家对特定英雄的访问权限。

## 主要属性

- `owner`: 指向游戏状态的指针 (CGameState*)
- `heroesPool`: 英雄池中的所有英雄列表，包括当前在酒馆中的英雄
- `perPlayerAvailability`: 每个英雄可购买玩家的映射，如果英雄不在列表中，则对所有人可用
- `currentTavern`: 当前在酒馆中可用的英雄列表

## TavernSlot 内部结构体

酒馆槽位结构体，用于表示酒馆中的英雄槽位信息。

#### 属性

- `hero`: 英雄类型ID
- `slot`: 酒馆英雄槽位
- `role`: 槽位角色 (TavernSlotRole)
- `player`: 玩家颜色

## 核心方法

```cpp
TavernHeroesPool(CGameState * owner);
```

构造函数，指定游戏状态所有者。

```cpp
void setGameState(CGameState * owner);
```

设置游戏状态所有者。

```cpp
std::vector<const CGHeroInstance *> getHeroesFor(PlayerColor color) const;
```

获取指定玩家酒馆中当前可用的英雄列表。

```cpp
std::map<HeroTypeID, CGHeroInstance* > unusedHeroesFromPool() const;
```

返回英雄池中未在酒馆中出现的英雄映射。

```cpp
bool isHeroAvailableFor(HeroTypeID hero, PlayerColor color) const;
```

检查指定英雄是否对指定玩家可用。

```cpp
TavernSlotRole getSlotRole(HeroTypeID hero) const;
```

获取指定英雄的槽位角色。

```cpp
std::shared_ptr<CGHeroInstance> takeHeroFromPool(HeroTypeID hero);
```

从英雄池中取出指定英雄，返回英雄实例的共享指针。

```cpp
void onNewDay();
```

新一天开始时重置所有英雄的魔法值和移动点数。

```cpp
void addHeroToPool(HeroTypeID hero);
```

将指定英雄添加到英雄池中。

```cpp
void setAvailability(HeroTypeID hero, std::set<PlayerColor> mask);
```

设置指定英雄仅对特定玩家集合可用。

```cpp
void setHeroForPlayer(PlayerColor player, TavernHeroSlot slot, HeroTypeID hero, CSimpleArmy & army, TavernSlotRole role, bool replenishPoints);
```

将指定英雄放置在指定玩家的酒馆槽位中。

## 依赖关系

- **GameConstants.h**: 游戏常量定义
- **TavernSlot.h**: 酒馆槽位定义
- **CGObjectInstance**: 游戏对象实例类
- **Serializeable**: 序列化基类
- **CGHeroInstance**: 英雄实例类
- **CTown**: 城镇类
- **CHeroClass**: 英雄职业类
- **CGameState**: 游戏状态类
- **CSimpleArmy**: 简单军队类

## 使用示例

### 初始化英雄池

```cpp
#include "TavernHeroesPool.h"

// 创建英雄池
TavernHeroesPool tavernPool(gameState);

// 设置游戏状态
tavernPool.setGameState(gameState);
```

### 添加英雄到池中

```cpp
#include "TavernHeroesPool.h"

// 添加英雄到英雄池
HeroTypeID heroID = HeroTypeID::SOLMYR;
tavernPool.addHeroToPool(heroID);

// 设置英雄仅对特定玩家可用
std::set<PlayerColor> players = {PlayerColor::RED, PlayerColor::BLUE};
tavernPool.setAvailability(heroID, players);
```

### 获取玩家可用英雄

```cpp
#include "TavernHeroesPool.h"

// 获取红色玩家酒馆中的英雄
auto heroes = tavernPool.getHeroesFor(PlayerColor::RED);

for (const auto * hero : heroes) {
    // 处理每个英雄
}
```

### 将英雄放入酒馆

```cpp
#include "TavernHeroesPool.h"

// 创建简单军队
CSimpleArmy army;

// 将英雄放入红色玩家的第一个槽位
tavernPool.setHeroForPlayer(
    PlayerColor::RED,
    TavernHeroSlot::FIRST,
    heroID,
    army,
    TavernSlotRole::MAIN,
    true
);
```

### 从池中取出英雄

```cpp
#include "TavernHeroesPool.h"

// 检查英雄是否可用
if (tavernPool.isHeroAvailableFor(heroID, PlayerColor::RED)) {
    // 从池中取出英雄
    auto heroInstance = tavernPool.takeHeroFromPool(heroID);
    // 使用英雄实例
}
```

### 新一天处理

```cpp
#include "TavernHeroesPool.h"

// 每天开始时调用
tavernPool.onNewDay();
```

## 性能特性

- **内存使用**: 存储所有英雄ID和可用性映射，内存使用与英雄数量成正比
- **查找效率**: 使用映射和集合进行快速查找
- **序列化**: 支持向后兼容的序列化，避免使用原始指针

## 实现注意事项

1. **英雄生命周期**: 英雄实例通过共享指针管理，确保正确的内存管理
2. **可用性控制**: 通过perPlayerAvailability映射控制英雄对特定玩家的可见性
3. **序列化兼容性**: 使用条件序列化以支持不同版本的序列化格式
4. **状态一致性**: 新一天重置会影响池中所有英雄的状态

## 相关文档

- [CGameState](CGameState.md) - 游戏状态管理类
- [CGHeroInstance](CGHeroInstance.md) - 英雄实例类
- [CSimpleArmy](../army/CSimpleArmy.md) - 简单军队类