# CQuest

## 概述

`CQuest` 系统实现了VCMI中的任务和谜题机制，包括先知小屋、边境守卫、钥匙大师等各种任务对象。该系统支持多种任务类型，从简单的收集任务到复杂的多条件任务。

## 主要组件

### EQuestMission 枚举

任务类型枚举，定义了所有支持的任务类型。

```cpp
enum class EQuestMission {
    NONE = 0,
    LEVEL = 1,           // 等级任务
    PRIMARY_SKILL = 2,   // 主要技能任务
    KILL_HERO = 3,       // 杀死英雄任务
    KILL_CREATURE = 4,   // 杀死生物任务
    ARTIFACT = 5,        // 神器任务
    ARMY = 6,            // 军队任务
    RESOURCES = 7,       // 资源任务
    HERO = 8,            // 英雄任务
    PLAYER = 9,          // 玩家任务
    HOTA_MULTI = 10,     // HotA多条件任务
    KEYMASTER = 11,      // 钥匙大师任务
    HOTA_HERO_CLASS = 12, // HotA英雄职业任务
    HOTA_REACH_DATE = 13, // HotA日期任务
    HOTA_GAME_DIFFICULTY = 13, // HotA难度任务
};
```

### CQuest 类

核心任务类，定义了任务的数据结构和逻辑。

#### 主要属性

- `questName`: 任务名称
- `qid`: 任务实例ID
- `lastDay`: 任务截止日期（-1表示无期限）
- `killTarget`: 击杀目标对象ID
- `mission`: 任务限制器（Rewardable::Limiter）
- `repeatedQuest`: 是否为重复任务
- `isCompleted`: 是否已完成
- `activeForPlayers`: 对哪些玩家激活
- `textOption`: 文本选项
- `completedOption`: 完成选项
- `stackToKill`: 要击杀的生物堆栈
- `stackDirection`: 堆栈方向
- `heroName`: 英雄名称备份
- `heroPortrait`: 英雄肖像
- `firstVisitText`: 首次访问文本
- `nextVisitText`: 后续访问文本
- `completedText`: 完成文本
- `isCustomFirst`: 是否自定义首次文本
- `isCustomNext`: 是否自定义后续文本
- `isCustomComplete`: 是否自定义完成文本

#### 核心方法

```cpp
static const std::string & missionName(EQuestMission index);
static const std::string & missionState(int index);
```

获取任务类型名称和状态名称。

```cpp
bool checkQuest(const CGHeroInstance * h) const;
```

检查任务是否完成。

```cpp
void getVisitText(const IGameInfoCallback * cb, MetaString &text, std::vector<Component> & components, bool FirstVisit, const CGHeroInstance * h = nullptr) const;
void getCompletionText(const IGameInfoCallback * cb, MetaString &text) const;
void getRolloverText(const IGameInfoCallback * cb, MetaString &text, bool onHover) const;
```

获取各种文本显示。

```cpp
void completeQuest(IGameEventCallback & gameEvents, const CGHeroInstance * h, bool allowFullArmyRemoval) const;
```

完成任务。

```cpp
void defineQuestName();
```

定义任务名称。

### IQuestObject 接口

任务对象的接口基类。

#### 核心方法

```cpp
virtual void getVisitText(MetaString &text, std::vector<Component> &components, bool FirstVisit, const CGHeroInstance * h = nullptr) const = 0;
virtual bool checkQuest(const CGHeroInstance * h) const;
virtual const CQuest & getQuest() const;
virtual CQuest & getQuest();
```

任务对象接口方法。

### CGSeerHut 类

先知小屋类，实现主要的任务功能。

#### 主要属性

- `seerName`: 先知名称

#### 核心方法

```cpp
void initObj(IGameRandomizer & gameRandomizer) override;
void onHeroVisit(IGameEventCallback & gameEvents, const CGHeroInstance * h) const override;
void getVisitText(MetaString &text, std::vector<Component> &components, bool FirstVisit, const CGHeroInstance * h = nullptr) const override;
```

先知小屋的主要功能。

### CGQuestGuard 类

任务守卫类，继承自CGSeerHut。

#### 核心方法

```cpp
void init(vstd::RNG & rand) override;
void onHeroVisit(IGameEventCallback & gameEvents, const CGHeroInstance * h) const override;
bool passableFor(PlayerColor color) const override;
```

任务守卫的特殊行为。

### CGKeys 基类

钥匙相关对象的基类。

#### 核心方法

```cpp
bool wasMyColorVisited(const PlayerColor & player) const;
std::string getObjectName() const override;
std::string getHoverText(PlayerColor player) const override;
```

钥匙对象的通用功能。

### CGKeymasterTent 类

钥匙大师帐篷类。

#### 核心方法

```cpp
bool wasVisited(PlayerColor player) const override;
void onHeroVisit(IGameEventCallback & gameEvents, const CGHeroInstance * h) const override;
```

钥匙大师的功能。

### CGBorderGuard 类

边境守卫类。

#### 核心方法

```cpp
void initObj(IGameRandomizer & gameRandomizer) override;
void onHeroVisit(IGameEventCallback & gameEvents, const CGHeroInstance * h) const override;
void getVisitText(MetaString &text, std::vector<Component> &components, bool FirstVisit, const CGHeroInstance * h = nullptr) const override;
bool checkQuest(const CGHeroInstance * h) const override;
```

边境守卫的功能。

### CGBorderGate 类

边境大门类，继承自CGBorderGuard。

#### 核心方法

```cpp
void onHeroVisit(IGameEventCallback & gameEvents, const CGHeroInstance * h) const override;
bool passableFor(PlayerColor color) const override;
```

边境大门的特殊通行规则。

## 任务机制

1. **任务类型**: 支持多种预定义和自定义任务类型
2. **时间限制**: 可以设置任务截止日期
3. **玩家特定**: 任务可以只对特定玩家激活
4. **重复任务**: 支持可重复完成的任务
5. **多语言支持**: 使用MetaString支持本地化文本
6. **奖励系统**: 通过CRewardableObject提供奖励

## 依赖关系

- **CRewardableObject**: 可奖励对象基类
- **Serializeable**: 序列化基类
- **IGameInfoCallback**: 游戏信息回调接口
- **CGHeroInstance**: 英雄实例类
- **MetaString**: 元字符串类

## 使用示例

### 创建任务

```cpp
#include "CQuest.h"

// 创建任务实例
CQuest quest;
quest.qid = QuestInstanceID(123);
quest.questName = "Defeat the Dragon";
quest.lastDay = 100; // 100天内完成
quest.mission = Rewardable::Limiter(EQuestMission::KILL_CREATURE, CreatureID::RED_DRAGON);
```

### 配置任务文本

```cpp
#include "CQuest.h"

// 设置任务文本
quest.firstVisitText = MetaString::createFromTextID("quest.first.visit");
quest.nextVisitText = MetaString::createFromTextID("quest.next.visit");
quest.completedText = MetaString::createFromTextID("quest.completed");
```

### 检查任务完成

```cpp
#include "CQuest.h"

// 检查英雄是否完成任务
bool completed = quest.checkQuest(hero);
if (completed) {
    // 完成任务
    quest.completeQuest(gameEvents, hero, true);
}
```

### 创建先知小屋

```cpp
#include "CQuest.h"

// 创建先知小屋
auto seerHut = std::make_shared<CGSeerHut>();
seerHut->seerName = "The Ancient Seer";

// 设置任务
seerHut->getQuest().mission = Rewardable::Limiter(EQuestMission::ARTIFACT, ArtifactID::GRAIL);
```

## 性能特性

- **内存使用**: 存储任务数据和文本，内存使用相对固定
- **检查效率**: 任务完成检查通常是O(1)操作
- **序列化**: 支持完整的状态序列化

## 实现注意事项

1. **状态管理**: 正确管理任务完成状态和玩家激活状态
2. **文本替换**: 支持动态文本替换以显示具体任务目标
3. **向后兼容**: 序列化支持版本兼容性
4. **对象生命周期**: 任务目标对象可能在任务完成后被移除

## 相关文档

- [CRewardableObject](CRewardableObject.md) - 可奖励对象基类
- [CGHeroInstance](CGHeroInstance.md) - 英雄实例类
- [Rewardable::Limiter](../bonuses/Limiter.md) - 奖励限制器