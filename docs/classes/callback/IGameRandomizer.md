<!-- 来源: E:\develop\heroes\vcmi\lib\callback\IGameRandomizer.h -->
# IGameRandomizer接口

IGameRandomizer接口定义了VCMI游戏中随机化操作的抽象接口。它提供了神器生成、生物生成、技能升级等各种随机事件的处理方法。

## 接口定义

```cpp
class DLL_LINKAGE IGameRandomizer : boost::noncopyable
```

## 概述

IGameRandomizer是游戏随机化系统的核心接口，定义了服务器端处理各种随机事件的方法。该接口只在服务器端存在，用于确保游戏随机性的可重现性和公平性。

## 神器随机化方法

### 通用神器生成
- `ArtifactID rollArtifact()`: 随机生成一个神器
- `ArtifactID rollArtifact(EArtifactClass type)`: 根据类型随机生成神器
- `ArtifactID rollArtifact(std::set<ArtifactID> filtered)`: 从过滤列表中随机生成神器

### 市场神器生成
- `std::vector<ArtifactID> rollMarketArtifactSet()`: 生成市场神器集合

## 生物随机化方法

- `CreatureID rollCreature()`: 随机生成一个生物
- `CreatureID rollCreature(int tier)`: 根据等级随机生成生物

## 英雄技能随机化方法

### 主属性技能
- `PrimarySkill rollPrimarySkillForLevelup(const CGHeroInstance * hero)`: 为英雄升级随机主属性技能

### 副属性技能
- `SecondarySkill rollSecondarySkillForLevelup(const CGHeroInstance * hero, const std::set<SecondarySkill> & candidates)`: 为英雄升级从候选技能中随机选择副属性技能

## 工具方法

- `vstd::RNG & getDefault()`: 获取默认随机数生成器

## 参数说明

### 神器相关
- `EArtifactClass type`: 神器类别枚举（宝物、主要、辅助等）
- `std::set<ArtifactID> filtered`: 过滤掉的神器ID集合

### 生物相关
- `int tier`: 生物等级（1-7级）

### 技能相关
- `CGHeroInstance * hero`: 升级的英雄实例
- `std::set<SecondarySkill> candidates`: 可选的副属性技能集合

## 返回值说明

- `ArtifactID`: 生成的神器ID
- `CreatureID`: 生成的生物ID
- `PrimarySkill`: 选择的主属性技能类型
- `SecondarySkill`: 选择的副属性技能类型
- `std::vector<ArtifactID>`: 市场神器ID集合

## 实现类

IGameRandomizer通常由以下类实现：
- `GameRandomizer`: 主要的游戏随机化器实现
- 测试用的模拟随机化器

## 使用示例

```cpp
// 获取游戏随机化器
auto randomizer = gameCallback->getRandomizer();

// 随机生成神器
ArtifactID artifact = randomizer->rollArtifact();

// 为英雄升级随机主属性
PrimarySkill skill = randomizer->rollPrimarySkillForLevelup(hero);

// 从候选技能中选择副属性
std::set<SecondarySkill> candidates = {SecondarySkill::PATHFINDING, SecondarySkill::SCOUTING};
SecondarySkill chosenSkill = randomizer->rollSecondarySkillForLevelup(hero, candidates);
```

## 设计目标

IGameRandomizer的设计目标是：

1. **可重现性**: 通过种子确保随机结果的可重现性
2. **公平性**: 避免连续的坏运气情况
3. **灵活性**: 支持各种类型的随机化需求
4. **性能**: 高效的随机数生成

## 随机化策略

实现类可以采用不同的随机化策略：

- **纯随机**: 每次都使用完全随机的结果
- **偏置随机**: 避免连续失败，模拟人类对随机性的期望
- **权重随机**: 根据游戏平衡考虑使用不同的权重

## 相关类

- `CGHeroInstance`: 英雄实例类
- `ArtifactID`: 神器标识符
- `CreatureID`: 生物标识符
- `PrimarySkill`: 主属性技能枚举
- `SecondarySkill`: 副属性技能枚举
- `EArtifactClass`: 神器类别枚举