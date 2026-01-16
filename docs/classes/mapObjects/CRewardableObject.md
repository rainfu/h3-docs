# CRewardableObject

## 概述

`CRewardableObject` 类是VCMI中可奖励对象的基类，为所有可以向英雄提供奖励的地图对象提供统一的接口和实现。该类继承自CArmedInstance以支持守护生物，并实现了Rewardable::Interface以提供奖励系统功能。

## 主要组件

### CRewardableObject 类

可奖励对象的基类，继承自CArmedInstance和Rewardable::Interface。

#### 保护属性

- `onceVisitableObjectCleared`: 对象是否已被清除（一次性访问）
- `selectedReward`: 玩家选择的奖励ID（不序列化）

#### 保护方法

```cpp
void doStartBattle(IGameEventCallback & gameEvents, const CGHeroInstance * hero) const;
```

开始与守护者的战斗。

```cpp
void grantReward(IGameEventCallback & gameEvents, ui32 rewardID, const CGHeroInstance * hero) const override;
```

授予指定ID的奖励。

```cpp
void markAsVisited(IGameEventCallback & gameEvents, const CGHeroInstance * hero) const override;
```

标记对象为已访问。

```cpp
const IObjectInterface * getObject() const override;
```

获取对象接口。

```cpp
void markAsScouted(IGameEventCallback & gameEvents, const CGHeroInstance * hero) const override;
```

标记对象为已侦察。

```cpp
bool wasVisitedBefore(const CGHeroInstance * contextHero) const override;
```

检查对象是否已被访问（使用非玩家可见信息）。

```cpp
void serializeJsonOptions(JsonSerializeFormat & handler) override;
```

序列化JSON选项。

```cpp
std::string getDisplayTextImpl(PlayerColor player, const CGHeroInstance * hero, bool includeDescription) const;
```

获取显示文本实现。

```cpp
std::string getDescriptionMessage(PlayerColor player, const CGHeroInstance * hero) const;
```

获取描述消息。

```cpp
std::vector<Component> getPopupComponentsImpl(PlayerColor player, const CGHeroInstance * hero) const;
```

获取弹出组件实现。

```cpp
bool isGuarded() const;
```

检查对象是否被守护。

#### 公共方法

```cpp
bool wasVisited(PlayerColor player) const override;
bool wasVisited(const CGHeroInstance * h) const override;
```

检查对象是否被指定玩家或英雄访问过。

```cpp
bool wasScouted(PlayerColor player) const;
```

检查对象是否被玩家侦察过。

```cpp
void onHeroVisit(IGameEventCallback & gameEvents, const CGHeroInstance *h) const override;
```

英雄访问对象的处理逻辑。

```cpp
void battleFinished(IGameEventCallback & gameEvents, const CGHeroInstance *hero, const BattleResult &result) const override;
```

战斗结束后的处理。

```cpp
void garrisonDialogClosed(IGameEventCallback & gameEvents, const CGHeroInstance *hero) const override;
```

要塞对话框关闭的处理。

```cpp
void newTurn(IGameEventCallback & gameEvents, IGameRandomizer & gameRandomizer) const override;
```

新回合开始，可能重置对象状态。

```cpp
void heroLevelUpDone(IGameEventCallback & gameEvents, const CGHeroInstance *hero) const override;
```

英雄升级完成后的奖励处理。

```cpp
void blockingDialogAnswered(IGameEventCallback & gameEvents, const CGHeroInstance *hero, int32_t answer) const override;
```

阻塞对话框回答的处理。

```cpp
void initObj(IGameRandomizer & gameRandomizer) override;
```

初始化对象。

```cpp
bool isCoastVisitable() const override;
```

检查是否可以从海岸访问。

```cpp
void initializeGuards();
```

初始化守护者。

```cpp
void setPropertyDer(ObjProperty what, ObjPropertyID identifier) override;
```

设置派生属性。

```cpp
std::string getHoverText(PlayerColor player) const override;
std::string getHoverText(const CGHeroInstance * hero) const override;
```

获取悬停文本。

```cpp
std::string getPopupText(PlayerColor player) const override;
std::string getPopupText(const CGHeroInstance * hero) const override;
```

获取弹出文本。

```cpp
std::vector<Component> getPopupComponents(PlayerColor player) const override;
std::vector<Component> getPopupComponents(const CGHeroInstance * hero) const override;
```

获取弹出组件。

## 机制说明

### 奖励系统

1. **多重奖励**: 支持多种奖励类型的组合
2. **玩家选择**: 当有多个奖励选项时允许玩家选择
3. **条件检查**: 奖励可以有前提条件
4. **访问控制**: 支持一次性访问和重复访问

### 守护机制

1. **战斗触发**: 对象可以有守护生物，需要战斗才能获得奖励
2. **胜利奖励**: 战斗胜利后获得奖励
3. **失败处理**: 战斗失败的相应处理
4. **要塞管理**: 支持要塞对话框交互

### 访问控制

1. **玩家跟踪**: 记录哪些玩家访问过对象
2. **英雄特定**: 可以根据特定英雄的状态决定奖励
3. **侦察系统**: 玩家可以侦察对象了解其内容
4. **状态重置**: 新回合可以重置对象状态

## 依赖关系

- **CArmedInstance**: 武装实例基类，提供军队管理
- **Rewardable::Interface**: 奖励接口，提供奖励系统
- **IGameEventCallback**: 游戏事件回调接口
- **CGHeroInstance**: 英雄实例类
- **IObjectInterface**: 对象接口
- **Component**: UI组件类

## 使用示例

### 创建可奖励对象

```cpp
#include "CRewardableObject.h"

// 创建可奖励对象实例
auto rewardableObj = std::make_shared<CRewardableObject>(cb);

// 添加奖励配置
rewardableObj->configuration.addReward(
    Rewardable::EEventType::EVENT_FIRST_VISIT,
    Rewardable::Limiter(), // 无限制器
    Rewardable::Reward(TPrimarySkill::EXPERIENCE, 1000)
);

// 添加守护者
rewardableObj->addToSlot(SlotID(0), CStackBasicDescriptor(CreatureID::GOBLIN, 5));
```

### 配置多重奖励

```cpp
#include "CRewardableObject.h"

// 配置多个奖励选项供玩家选择
rewardableObj->configuration.addReward(
    Rewardable::EEventType::EVENT_FIRST_VISIT,
    Rewardable::Limiter(),
    {
        Rewardable::Reward(TPrimarySkill::GOLD, 2000),
        Rewardable::Reward(ArtifactID::SPELLBOOK, 1),
        Rewardable::Reward(TPrimarySkill::EXPERIENCE, 1500)
    } // 玩家可以选择其中之一
);
```

### 处理英雄访问

```cpp
#include "CRewardableObject.h"

void onHeroVisit(IGameEventCallback & gameEvents, const CGHeroInstance *h) const override
{
    if (isGuarded() && !wasVisited(h))
    {
        // 有守护者且未访问过，触发战斗
        doStartBattle(gameEvents, h);
    }
    else
    {
        // 直接给予奖励或显示选择
        Rewardable::Interface::onHeroVisit(gameEvents, h);
    }
}
```

### 自定义奖励授予

```cpp
#include "CRewardableObject.h"

void grantReward(IGameEventCallback & gameEvents, ui32 rewardID, const CGHeroInstance * hero) const override
{
    // 自定义奖励逻辑
    const auto & reward = configuration.getReward(rewardID);
    
    // 应用奖励
    for (const auto & item : reward.items)
    {
        // 根据奖励类型应用
        switch (item.type)
        {
            case Rewardable::EType::EXPERIENCE:
                gameEvents.giveExperience(hero, item.value);
                break;
            case Rewardable::EType::GOLD:
                gameEvents.giveResource(hero->getOwner(), EGameResID::GOLD, item.value);
                break;
            // 其他奖励类型...
        }
    }
    
    // 标记为已访问
    markAsVisited(gameEvents, hero);
}
```

## 性能特性

- **内存使用**: 存储奖励配置、访问状态和守护者信息
- **访问检查**: 快速的玩家和英雄访问状态检查
- **奖励计算**: 根据奖励复杂度决定计算开销
- **序列化**: 支持完整状态序列化

## 实现注意事项

1. **状态一致性**: 正确维护访问状态和奖励状态
2. **奖励验证**: 确保奖励配置有效且不冲突
3. **战斗集成**: 正确处理守护者战斗和奖励授予
4. **UI交互**: 正确实现弹出窗口和对话框逻辑

## 相关文档

- [CArmedInstance](army/CArmedInstance.md) - 武装实例基类
- [Rewardable::Interface](../rewardable/Interface.md) - 奖励接口
- [CGHeroInstance](CGHeroInstance.md) - 英雄实例类