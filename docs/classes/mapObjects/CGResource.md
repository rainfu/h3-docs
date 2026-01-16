# CGResource

## 概述

`CGResource` 类实现了VCMI中的资源对象机制，如地图上的金矿、木材堆、宝石矿等。这些对象允许英雄收集各种游戏资源，并可能触发守护生物的战斗。

## 主要组件

### CGResource 类

资源对象的核心类，继承自CArmedInstance。

#### 主要属性

- `message`: 资源对象的消息文本
- `amount`: 资源数量（0表示随机）

#### 常量

```cpp
static constexpr uint32_t RANDOM_AMOUNT = 0;
```

随机数量的常量定义。

#### 核心方法

```cpp
void onHeroVisit(IGameEventCallback & gameEvents, const CGHeroInstance * h) const override;
```

英雄访问资源对象时的处理逻辑。

```cpp
void initObj(IGameRandomizer & gameRandomizer) override;
```

初始化资源对象。

```cpp
void pickRandomObject(IGameRandomizer & gameRandomizer) override;
```

随机选择资源对象。

```cpp
void battleFinished(IGameEventCallback & gameEvents, const CGHeroInstance *hero, const BattleResult &result) const override;
```

战斗结束后处理资源收集。

```cpp
void blockingDialogAnswered(IGameEventCallback & gameEvents, const CGHeroInstance *hero, int32_t answer) const override;
```

处理阻塞对话框的回答。

```cpp
std::string getHoverText(PlayerColor player) const override;
```

获取悬停文本。

```cpp
GameResID resourceID() const;
```

获取资源ID。

```cpp
uint32_t getAmount() const;
```

获取资源数量。

#### 私有方法

```cpp
int getAmountMultiplier() const;
```

获取数量倍数。

```cpp
void collectRes(IGameEventCallback & gameEvents, const PlayerColor & player) const;
```

收集资源。

```cpp
void serializeJsonOptions(JsonSerializeFormat & handler) override;
```

序列化JSON选项。

## 机制说明

### 资源收集机制

1. **守护战斗**: 资源对象可能有守护生物，需要战斗才能收集
2. **数量随机**: 可以设置为固定数量或随机数量
3. **资源类型**: 支持所有游戏资源类型（金币、木材、水晶等）
4. **消息显示**: 可以显示自定义收集消息

### 战斗与奖励

1. **战斗触发**: 英雄访问时如果有守护者会触发战斗
2. **胜利奖励**: 战斗胜利后自动收集资源
3. **失败处理**: 战斗失败不会获得资源
4. **对话选项**: 支持玩家选择是否收集资源

## 依赖关系

- **CArmedInstance**: 武装实例基类
- **IGameEventCallback**: 游戏事件回调接口
- **CGHeroInstance**: 英雄实例类
- **ResourceInstanceConstructor**: 资源实例构造器
- **GameResID**: 游戏资源ID类型
- **MetaString**: 元字符串类

## 使用示例

### 创建资源对象

```cpp
#include "CGResource.h"

// 创建金币堆
auto goldPile = std::make_shared<CGResource>();
goldPile->resourceID() = GameResID(EGameResID::GOLD);
goldPile->amount = 1000; // 1000金币
goldPile->message = MetaString::createFromTextID("resource.gold.collected");
```

### 创建随机数量的资源

```cpp
#include "CGResource.h"

// 创建随机数量的水晶矿
auto crystalMine = std::make_shared<CGResource>();
crystalMine->resourceID() = GameResID(EGameResID::CRYSTAL);
crystalMine->amount = CGResource::RANDOM_AMOUNT; // 随机数量
crystalMine->message = MetaString::createFromTextID("resource.crystal.found");
```

### 配置守护生物

```cpp
#include "CGResource.h"

// 添加守护生物到资源对象
auto guardedResource = std::make_shared<CGResource>();
guardedResource->resourceID() = GameResID(EGameResID::WOOD);

// 通过CArmedInstance的军队系统添加守护者
guardedResource->addToSlot(SlotID(0), CStackBasicDescriptor(CreatureID::GOBLIN, 10));
```

### 处理资源收集

```cpp
#include "CGResource.h"

// 在英雄访问时处理
void onHeroVisit(IGameEventCallback & gameEvents, const CGHeroInstance * h) const override
{
    if (hasStackAtSlot(SlotID(0))) // 有守护者
    {
        // 触发战斗
        gameEvents.startBattle(h, this);
    }
    else
    {
        // 直接收集资源
        collectRes(gameEvents, h->getOwner());
    }
}
```

## 性能特性

- **内存使用**: 存储资源ID、数量和消息，内存使用较少
- **初始化**: 对象初始化时需要设置资源类型和数量
- **序列化**: 支持完整的状态序列化

## 实现注意事项

1. **资源验证**: 确保资源ID有效且数量合理
2. **随机化**: 正确处理随机数量的生成逻辑
3. **守护者管理**: 通过CArmedInstance正确管理守护生物
4. **玩家交互**: 正确处理玩家对话和选择

## 相关文档

- [CArmedInstance](army/CArmedInstance.md) - 武装实例基类
- [CGHeroInstance](CGHeroInstance.md) - 英雄实例类
- [CStackBasicDescriptor](army/CStackBasicDescriptor.md) - 生物堆栈描述符