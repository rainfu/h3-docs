# CGCreature

## 概述

`CGCreature` 类表示地图上的野生生物堆栈，是VCMI中地图对象的核心组件之一。该类继承自 `CArmedInstance`，提供了野生生物的行为逻辑，包括战斗、逃跑、加入等交互方式。

## 主要属性

- **identifier**: 怪物唯一标识符（用于任务）
- **character**: 生物性格（0-4，从温和到野蛮）
- **message**: 攻击时的消息文本
- **resources**: 击败后给予的资源奖励
- **gainedArtifact**: 击败后获得的物品ID
- **neverFlees**: 是否永远不会逃跑
- **notGrowingTeam**: 是否不增长队伍数量
- **temppower**: 用于处理小堆栈的分数增长
- **stacksCount**: HotA地图中指定的分割堆栈数量
- **refusedJoining**: 是否拒绝加入

## 枚举定义

### Action 枚举
```cpp
enum Action {
    FIGHT = -2,        // 战斗
    FLEE = -1,         // 逃跑
    JOIN_FOR_FREE = 0  // 免费加入（>0表示金币价格）
};
```

### Character 枚举
```cpp
enum Character {
    COMPLIANT = 0,  // 顺从
    FRIENDLY = 1,   // 友好
    AGGRESSIVE = 2, // 好斗
    HOSTILE = 3,    // 敌对
    SAVAGE = 4      // 野蛮
};
```

## 核心方法

### 英雄访问事件

```cpp
void onHeroVisit(IGameEventCallback & gameEvents, const CGHeroInstance * h) const override;
```

英雄访问时的主要处理逻辑。

### 显示文本

```cpp
std::string getHoverText(PlayerColor player) const override;
std::string getHoverText(const CGHeroInstance * hero) const override;
std::string getPopupText(PlayerColor player) const override;
std::string getPopupText(const CGHeroInstance * hero) const override;
```

获取悬停和弹出文本。

```cpp
std::vector<Component> getPopupComponents(PlayerColor player) const override;
```

获取弹出组件列表。

### 初始化和更新

```cpp
void initObj(IGameRandomizer & gameRandomizer) override;
void pickRandomObject(IGameRandomizer & gameRandomizer) override;
void newTurn(IGameEventCallback & gameEvents, IGameRandomizer & gameRandomizer) const override;
```

对象初始化、随机选择和新回合处理。

### 战斗相关

```cpp
void battleFinished(IGameEventCallback & gameEvents, const CGHeroInstance *hero, const BattleResult &result) const override;
```

战斗结束处理。

```cpp
void blockingDialogAnswered(IGameEventCallback & gameEvents, const CGHeroInstance *hero, int32_t answer) const override;
```

阻塞对话回答处理。

### 生物信息

```cpp
CreatureID getCreatureID() const;
const CCreature * getCreature() const;
TQuantity getJoiningAmount() const;
```

获取生物ID、生物对象和加入数量。

### 堆栈管理

```cpp
bool containsUpgradedStack() const;
int getNumberOfStacks(const CGHeroInstance *hero) const;
```

检查是否包含升级堆栈和获取堆栈数量。

## 私有方法

### 行为决策

```cpp
void fight(IGameEventCallback & gameEvents, const CGHeroInstance * h) const;
void flee(IGameEventCallback & gameEvents, const CGHeroInstance * h) const;
void fleeDecision(IGameEventCallback & gameEvents, const CGHeroInstance * h, ui32 pursue) const;
void joinDecision(IGameEventCallback & gameEvents, const CGHeroInstance * h, int cost, ui32 accept) const;
```

处理战斗、逃跑和加入决策。

### 辅助方法

```cpp
int takenAction(const CGHeroInstance *h, bool allowJoin=true) const;
```

决定对抗时的行动：-2战斗，-1逃跑，>=0表示加入的金币价格。

```cpp
void giveReward(IGameEventCallback & gameEvents, const CGHeroInstance * h) const;
```

给予击败奖励。

```cpp
std::string getMonsterLevelText() const;
int getDefaultNumberOfStacks(const CGHeroInstance * hero) const;
int getNumberOfStacksFromBonus(const CGHeroInstance * hero) const;
```

获取怪物等级文本和堆栈数量计算。

## 依赖关系

- **CArmedInstance**: 武装实例基类
- **IGameEventCallback**: 游戏事件回调接口
- **CGHeroInstance**: 英雄实例类
- **CCreature**: 生物类
- **ResourceSet**: 资源集合
- **MetaString**: 元字符串类

## 使用示例

### 创建地图生物

```cpp
#include "CGCreature.h"

// 创建地图生物实例
auto creature = std::make_shared<CGCreature>();
creature->identifier = 123;
creature->character = CGCreature::AGGRESSIVE;
creature->message = MetaString::createFromTextID("core.creature.attack");
```

### 处理英雄访问

```cpp
#include "CGCreature.h"

void handleHeroVisit(const CGCreature * creature, const CGHeroInstance * hero, IGameEventCallback & events) {
    // 英雄访问地图生物
    creature->onHeroVisit(events, hero);
}
```

### 获取生物信息

```cpp
#include "CGCreature.h"

// 获取生物ID和类型
CreatureID creatureId = creature->getCreatureID();
const CCreature * creatureType = creature->getCreature();

// 检查是否可以加入
TQuantity joinAmount = creature->getJoiningAmount();
```

### 决策处理

```cpp
#include "CGCreature.h"

// 获取对抗行动
int action = creature->takenAction(hero, true);
if (action == CGCreature::FIGHT) {
    // 开始战斗
    creature->fight(events, hero);
} else if (action == CGCreature::FLEE) {
    // 生物逃跑
    creature->flee(events, hero);
} else if (action >= CGCreature::JOIN_FOR_FREE) {
    // 可以加入，action为金币价格
    creature->joinDecision(events, hero, action, acceptAnswer);
}
```

## 行为逻辑

1. **性格影响**: 生物性格从顺从到野蛮影响其行为倾向
2. **加入机制**: 生物可以免费加入或以金币价格加入英雄军队
3. **逃跑机制**: 大部分生物在不利情况下会选择逃跑
4. **奖励系统**: 击败生物可以获得资源和物品奖励
5. **成长机制**: 生物堆栈可以随时间增长（除非notGrowingTeam为true）

## 性能特性

- **内存使用**: 继承CArmedInstance的基本内存占用，加上生物特定属性
- **访问效率**: 直接属性访问，无额外计算开销
- **序列化**: 支持完整序列化，包括版本兼容性

## 实现注意事项

1. **随机性**: 使用游戏随机化器确保行为的一致性
2. **状态管理**: 正确管理refusedJoining等状态标志
3. **事件处理**: 所有交互都通过游戏事件回调进行
4. **兼容性**: 支持HotA地图格式的堆栈计数

## 相关文档

- [CArmedInstance](CArmedInstance.md) - 武装实例基类
- [CGHeroInstance](CGHeroInstance.md) - 英雄实例类
- [CCreature](../entities/CCreature.md) - 生物类