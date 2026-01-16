# CGPandoraBox

## 概述

`CGPandoraBox` 类实现了VCMI中的潘多拉魔盒和事件对象机制。这些对象可以为英雄提供奖励、触发事件或执行特殊功能。潘多拉魔盒通常包含随机奖励，而事件对象可以被配置为对特定玩家可用，并具有不同的激活条件。

## 主要组件

### CGPandoraBox 类

潘多拉魔盒的核心类，继承自CRewardableObject。

#### 主要属性

- `message`: 潘多拉魔盒的消息文本

#### 核心方法

```cpp
void initObj(IGameRandomizer & gameRandomizer) override;
```

初始化潘多拉魔盒对象。

```cpp
void onHeroVisit(IGameEventCallback & gameEvents, const CGHeroInstance * h) const override;
```

英雄访问潘多拉魔盒时的处理逻辑。

```cpp
void battleFinished(IGameEventCallback & gameEvents, const CGHeroInstance *hero, const BattleResult &result) const override;
```

战斗结束后处理奖励。

```cpp
void blockingDialogAnswered(IGameEventCallback & gameEvents, const CGHeroInstance *hero, int32_t answer) const override;
```

处理阻塞对话框的回答。

#### 保护方法

```cpp
void grantRewardWithMessage(IGameEventCallback & gameEvents, const CGHeroInstance * contextHero, int rewardIndex, bool markAsVisit) const override;
```

授予奖励并显示消息。

```cpp
virtual void init();
```

初始化潘多拉魔盒。

```cpp
void serializeJsonOptions(JsonSerializeFormat & handler) override;
```

序列化JSON选项。

### CGEvent 类

事件对象类，继承自CGPandoraBox。

#### 主要属性

- `availableFor`: 可用的玩家集合
- `removeAfterVisit`: 访问后是否移除事件
- `computerActivate`: 电脑玩家是否可以激活
- `humanActivate`: 人类玩家是否可以激活

#### 核心方法

```cpp
void onHeroVisit(IGameEventCallback & gameEvents, const CGHeroInstance * h) const override;
```

事件对象的英雄访问处理。

```cpp
void battleFinished(IGameEventCallback & gameEvents, const CGHeroInstance *hero, const BattleResult &result) const override;
```

事件对象的战斗结束处理。

#### 保护方法

```cpp
void grantRewardWithMessage(IGameEventCallback & gameEvents, const CGHeroInstance * contextHero, int rewardIndex, bool markAsVisit) const override;
```

事件对象的奖励授予。

```cpp
void init() override;
```

事件对象初始化。

```cpp
void serializeJsonOptions(JsonSerializeFormat & handler) override;
```

事件对象的JSON序列化。

#### 私有方法

```cpp
void activated(IGameEventCallback & gameEvents, const CGHeroInstance * h) const;
```

事件激活处理。

## 机制说明

### 潘多拉魔盒机制

1. **随机奖励**: 潘多拉魔盒通常包含随机生成的奖励
2. **消息显示**: 可以显示自定义消息给玩家
3. **奖励授予**: 通过CRewardableObject的奖励系统提供奖励
4. **战斗触发**: 某些潘多拉魔盒可能触发战斗

### 事件对象机制

1. **玩家特定**: 可以配置只对特定玩家可用
2. **激活条件**: 支持人类和电脑玩家的不同激活设置
3. **一次性事件**: 可以设置为访问后移除
4. **奖励系统**: 继承完整的奖励机制

## 依赖关系

- **CRewardableObject**: 可奖励对象基类
- **IGameEventCallback**: 游戏事件回调接口
- **CGHeroInstance**: 英雄实例类
- **ResourceSet**: 资源集合
- **InfoWindow**: 信息窗口结构
- **MetaString**: 元字符串类

## 使用示例

### 创建潘多拉魔盒

```cpp
#include "CGPandoraBox.h"

// 创建潘多拉魔盒实例
auto pandoraBox = std::make_shared<CGPandoraBox>();
pandoraBox->message = MetaString::createFromTextID("pandora.message");

// 设置奖励
pandoraBox->configuration.addReward(Rewardable::EEventType::EVENT_FIRST_VISIT, 
    Rewardable::Limiter(), 
    Rewardable::Reward(TPrimarySkill::EXPERIENCE, 1000));
```

### 创建事件对象

```cpp
#include "CGPandoraBox.h"

// 创建事件对象
auto event = std::make_shared<CGEvent>(cb);
event->availableFor.insert(PlayerColor::RED); // 只对红色玩家可用
event->removeAfterVisit = true; // 访问后移除
event->humanActivate = true; // 人类玩家可以激活
event->computerActivate = false; // 电脑玩家不能激活

// 设置奖励
event->configuration.addReward(Rewardable::EEventType::EVENT_FIRST_VISIT,
    Rewardable::Limiter(),
    Rewardable::Reward(TPrimarySkill::GOLD, 5000));
```

### 配置奖励

```cpp
#include "CGPandoraBox.h"

// 添加多种奖励类型
pandoraBox->configuration.addReward(
    Rewardable::EEventType::EVENT_FIRST_VISIT,
    Rewardable::Limiter(), // 无限制器
    Rewardable::Reward(TPrimarySkill::EXPERIENCE, 2000) // 2000经验
);

pandoraBox->configuration.addReward(
    Rewardable::EEventType::EVENT_FIRST_VISIT,
    Rewardable::Limiter(),
    Rewardable::Reward(ArtifactID::SPELLBOOK, 1) // 魔法书
);
```

## 性能特性

- **内存使用**: 存储奖励配置和消息文本，内存使用相对固定
- **初始化开销**: 对象初始化时需要处理奖励配置
- **序列化**: 支持完整的状态序列化，包括奖励和配置

## 实现注意事项

1. **奖励验证**: 确保奖励配置正确且不冲突
2. **玩家权限**: 正确检查玩家是否有权激活事件
3. **状态管理**: 正确管理事件对象的激活和移除状态
4. **向后兼容**: 序列化支持版本兼容性

## 相关文档

- [CRewardableObject](CRewardableObject.md) - 可奖励对象基类
- [CGHeroInstance](CGHeroInstance.md) - 英雄实例类
- [Rewardable::Reward](../bonuses/Reward.md) - 奖励系统