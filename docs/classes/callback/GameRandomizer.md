<!-- 来源: E:\develop\heroes\vcmi\lib\callback\GameRandomizer.h -->
# GameRandomizer类

GameRandomizer类是VCMI游戏回调系统中负责各种随机化操作的核心类。它实现了IGameRandomizer接口，提供了游戏中各种随机事件的处理功能。

## 类定义

```cpp
class DLL_LINKAGE GameRandomizer final : public IGameRandomizer
```

## 概述

GameRandomizer类管理游戏中的各种随机化行为，包括英雄技能升级、士气/幸运判定、生物生成、神器分配等。它使用偏置随机生成器来模拟更符合人类期望的随机分布，减少玩家对"坏运气"的挫败感。

## 主要组件

### RandomizationBias
偏置随机化辅助类，用于实现带偏置的随机判定。

**主要方法**:
- `bool roll(vstd::RNG & generator, int successChance, int totalWeight, int biasValue)`: 执行带偏置的随机判定

### RandomGeneratorWithBias
带偏置的随机生成器类，在保持统计概率的同时减少连续失败的情况。

**主要方法**:
- `bool roll(int successChance, int totalWeight, int biasValue)`: 执行带偏置的随机判定

### HeroSkillRandomizer
英雄技能随机化器，管理英雄技能升级的随机种子。

**字段**:
- `CRandomGenerator seed`: 随机种子生成器
- `int8_t magicSchoolCounter`: 魔法学院计数器
- `int8_t wisdomCounter`: 智慧计数器

## 公共方法

### 英雄技能相关
- `PrimarySkill rollPrimarySkillForLevelup(const CGHeroInstance * hero)`: 为英雄升级随机主属性技能
- `SecondarySkill rollSecondarySkillForLevelup(const CGHeroInstance * hero, const std::set<SecondarySkill> & candidates)`: 为英雄升级随机副属性技能

### 士气/幸运相关
- `bool rollGoodMorale(ObjectInstanceID actor, int moraleValue)`: 判定良好士气
- `bool rollBadMorale(ObjectInstanceID actor, int moraleValue)`: 判定不良士气
- `bool rollGoodLuck(ObjectInstanceID actor, int luckValue)`: 判定良好幸运
- `bool rollBadLuck(ObjectInstanceID actor, int luckValue)`: 判定不良幸运

### 战斗能力相关
- `bool rollCombatAbility(ObjectInstanceID actor, int percentageChance)`: 判定战斗能力

### 生物生成相关
- `CreatureID rollCreature()`: 随机生成生物
- `CreatureID rollCreature(int tier)`: 根据等级随机生成生物

### 神器分配相关
- `ArtifactID rollArtifact()`: 随机生成神器
- `ArtifactID rollArtifact(EArtifactClass type)`: 根据类型随机生成神器
- `ArtifactID rollArtifact(std::set<ArtifactID> filtered)`: 从过滤列表中随机生成神器
- `std::vector<ArtifactID> rollMarketArtifactSet()`: 生成市场神器集合

### 工具方法
- `vstd::RNG & getDefault()`: 获取默认随机数生成器
- `void setSeed(int newSeed)`: 设置随机种子

## 内部状态

GameRandomizer维护以下内部状态：

- `CRandomGenerator globalRandomNumberGenerator`: 全局随机数生成器
- `std::map<ArtifactID, int> allocatedArtifacts`: 已分配神器计数
- `std::map<HeroTypeID, HeroSkillRandomizer> heroSkillSeed`: 英雄技能种子映射
- `std::map<ObjectInstanceID, RandomGeneratorWithBias> goodMoraleSeed`: 良好士气种子映射
- `std::map<ObjectInstanceID, RandomGeneratorWithBias> badMoraleSeed`: 不良士气种子映射
- `std::map<ObjectInstanceID, RandomGeneratorWithBias> goodLuckSeed`: 良好幸运种子映射
- `std::map<ObjectInstanceID, RandomGeneratorWithBias> badLuckSeed`: 不良幸运种子映射
- `std::map<ObjectInstanceID, RandomGeneratorWithBias> combatAbilitySeed`: 战斗能力种子映射

## 序列化

GameRandomizer支持序列化操作，在RANDOMIZATION_REWORK版本后包含完整的状态信息。

## 使用示例

```cpp
// 创建游戏随机化器
GameRandomizer randomizer(gameInfo);

// 为英雄升级随机主属性
PrimarySkill newSkill = randomizer.rollPrimarySkillForLevelup(hero);

// 判定士气
bool hasGoodMorale = randomizer.rollGoodMorale(heroId, moraleValue);

// 随机生成神器
ArtifactID artifact = randomizer.rollArtifact();
```

## 设计目标

GameRandomizer的设计目标是：

1. **公平性**: 保持长期统计概率的正确性
2. **用户体验**: 减少连续失败带来的挫败感
3. **可重现性**: 通过种子确保随机结果的可重现性
4. **灵活性**: 支持各种类型的随机化需求

## 相关类

- `IGameRandomizer`: 随机化器接口
- `CRandomGenerator`: 基础随机数生成器
- `CGHeroInstance`: 英雄实例类