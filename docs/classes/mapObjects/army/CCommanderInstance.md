# CCommanderInstance

## 概述

`CCommanderInstance` 类实现了VCMI中指挥官系统的核心功能。指挥官是特殊的生物堆栈，可以拥有等级、技能、特殊能力和装备，为军队提供领导和加成效果。指挥官通常与英雄的军队绑定，但也可以独立存在。

## 主要组件

### CCommanderInstance 类

指挥官实例类，继承自CStackInstance。

#### 主要属性

- `alive`: 指挥官是否存活（ui8类型，为保持存档兼容性）
- `level`: 指挥官等级
- `name`: 指挥官名称（每个指挥官都有不同名称）
- `secondarySkills`: 次要技能向量（技能ID -> 等级）
- `specialSkills`: 特殊技能集合

#### 构造函数

```cpp
CCommanderInstance(IGameInfoCallback * cb);
CCommanderInstance(IGameInfoCallback * cb, const CreatureID & id);
```

创建指挥官实例。

#### 核心方法

```cpp
void setAlive(bool alive);
```

设置指挥官的存活状态。

```cpp
void levelUp();
```

指挥官升级。

```cpp
bool canGainExperience() const override;
```

检查指挥官是否可以获得经验。

```cpp
bool gainsLevel() const;
```

检查指挥官是否应该根据经验升级。

```cpp
ui64 getPower() const override;
```

获取指挥官的战斗力（指挥官本身不提供战斗力）。

```cpp
int getExpRank() const override;
int getLevel() const override;
```

获取经验等级和当前等级。

```cpp
ArtBearer bearerType() const override;
```

获取神器承载者类型。

## 机制说明

### 指挥官等级系统

1. **等级成长**: 指挥官可以升级获得更高等级
2. **经验获取**: 通过战斗获得经验值
3. **等级限制**: 等级有上限，通常低于英雄等级

### 技能系统

1. **次要技能**: 指挥官可以学习各种次要技能
2. **技能等级**: 每个技能有独立的等级
3. **特殊技能**: 指挥官独有的特殊能力
4. **技能效果**: 技能为整个军队提供加成

### 生存状态

1. **存活状态**: 指挥官可以死亡或复活
2. **战斗影响**: 指挥官死亡影响军队士气
3. **复活机制**: 某些情况下指挥官可以复活

### 神器装备

1. **装备承载**: 指挥官可以装备神器
2. **神器效果**: 装备的神器为军队提供加成
3. **装备限制**: 指挥官有装备槽位限制

## 依赖关系

- **CStackInstance**: 生物堆栈实例基类
- **CreatureID**: 生物ID类型
- **IGameInfoCallback**: 游戏信息回调接口
- **ArtBearer**: 神器承载者类型

## 使用示例

### 创建指挥官

```cpp
#include "CCommanderInstance.h"

// 创建指定生物类型的指挥官
auto commander = std::make_shared<CCommanderInstance>(cb, CreatureID::CAVALIER);

// 设置指挥官属性
commander->name = "Sir Galahad";
commander->level = 5;
commander->setAlive(true);
```

### 指挥官升级

```cpp
#include "CCommanderInstance.h"

// 检查是否可以升级
if (commander->gainsLevel())
{
    // 执行升级
    commander->levelUp();
    
    // 可能获得新技能
    if (commander->level == 5)
    {
        commander->secondarySkills[SecondarySkill::LEADERSHIP] = 1; // 学习领导术
    }
}
```

### 技能管理

```cpp
#include "CCommanderInstance.h"

// 添加次要技能
commander->secondarySkills[SecondarySkill::LOGISTICS] = 2; // 后勤学等级2

// 添加特殊技能
commander->specialSkills.insert(SpecialSkill::FLYING); // 飞行能力

// 检查技能等级
int logisticsLevel = commander->secondarySkills[SecondarySkill::LOGISTICS];
bool hasFlying = commander->specialSkills.count(SpecialSkill::FLYING);
```

### 战斗相关

```cpp
#include "CCommanderInstance.h"

// 指挥官在战斗中的处理
if (commander->alive)
{
    // 指挥官存活，提供军队加成
    int leadershipBonus = commander->secondarySkills[SecondarySkill::LEADERSHIP];
    armyMorale += leadershipBonus;
}
else
{
    // 指挥官死亡，军队士气下降
    armyMorale -= 2;
}
```

### 经验和等级

```cpp
#include "CCommanderInstance.h"

// 指挥官获得经验
if (commander->canGainExperience())
{
    // 计算经验增量
    int expGain = calculateExpGain(battleResult);
    
    // 应用经验
    commander->giveExperience(expGain);
    
    // 检查升级
    while (commander->gainsLevel())
    {
        commander->levelUp();
        // 处理升级奖励
    }
}
```

### 神器装备

```cpp
#include "CCommanderInstance.h"

// 指挥官装备神器
auto sword = std::make_shared<CArtifactInstance>(ArtifactID::SWORD_OF_HELLFIRE);
commander->addArtToSlot(ArtifactPosition::RIGHT_HAND, sword);

// 检查装备
bool hasSword = commander->hasArt(ArtifactID::SWORD_OF_HELLFIRE);
```

## 性能特性

- **内存使用**: 存储技能和装备信息，内存占用适中
- **技能查询**: 快速的技能等级和特殊技能检查
- **序列化**: 支持完整状态序列化

## 实现注意事项

1. **状态一致性**: 正确维护存活状态和等级
2. **技能验证**: 确保技能ID和等级有效
3. **经验计算**: 准确计算和应用经验值
4. **装备管理**: 正确处理神器装备和卸载

## 相关文档

- [CStackInstance](CStackInstance.md) - 生物堆栈实例基类
- [CArmedInstance](CArmedInstance.md) - 武装实例基类
- 技能系统相关文档