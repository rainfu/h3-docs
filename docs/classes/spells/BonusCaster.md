# BonusCaster

## 概述

`BonusCaster` 类实现了基于奖励加成的法术施法者机制，继承自ProxyCaster。该类用于处理通过奖励系统触发的法术施法，如装备的神器或技能提供的法术能力。

## 主要组件

### BonusCaster 类

奖励施法者类，继承自ProxyCaster。

#### 主要属性

- `bonus`: 奖励加成对象

#### 构造函数

```cpp
BonusCaster(const Caster * actualCaster_, std::shared_ptr<Bonus> bonus_);
```

创建奖励施法者。

#### 核心方法

```cpp
void getCasterName(MetaString & text) const override;
```

获取施法者名称。

```cpp
void getCastDescription(const Spell * spell, const battle::Units & attacked, MetaString & text) const override;
```

获取施法描述。

```cpp
void spendMana(ServerCallback * server, const int spellCost) const override;
```

消耗法力值。

## 机制说明

### 奖励驱动施法

1. **奖励关联**: 法术施法能力来自奖励加成
2. **动态能力**: 施法能力可以根据奖励变化
3. **装备相关**: 常用于装备的神器或魔法物品
4. **技能相关**: 可以来自特定的技能或魔法能力

### 代理施法机制

1. **代理委托**: 通过ProxyCaster实现施法代理
2. **实际施法者**: 引用实际的施法者对象
3. **效果传递**: 将施法效果传递给实际施法者
4. **状态同步**: 保持代理和实际施法者状态同步

### 法力管理

1. **奖励法力**: 法力消耗可能受奖励影响
2. **特殊消耗**: 某些奖励可能改变法力消耗规则
3. **免费施法**: 某些奖励可能提供免费施法能力

## 依赖关系

- **ProxyCaster**: 代理施法者基类
- **Bonus**: 奖励加成类
- **Caster**: 施法者接口
- **Spell**: 法术类
- **ServerCallback**: 服务器回调

## 使用示例

### 创建奖励施法者

```cpp
#include "BonusCaster.h"

// 创建基于神器奖励的施法者
auto artifactBonus = std::make_shared<Bonus>(
    BonusDuration::PERMANENT,
    BonusType::SPELL,
    BonusSource::ARTIFACT,
    SpellID::FIREBALL,
    BonusSourceID(artifactId)
);

auto bonusCaster = std::make_shared<BonusCaster>(heroCaster, artifactBonus);
```

### 配置施法描述

```cpp
#include "BonusCaster.h"

// 获取施法者名称
MetaString casterName;
bonusCaster->getCasterName(casterName);

// 获取施法描述
MetaString castDescription;
bonusCaster->getCastDescription(spell, attackedUnits, castDescription);
```

### 处理法力消耗

```cpp
#include "BonusCaster.h"

// 消耗法力（可能受奖励影响）
bonusCaster->spendMana(serverCallback, spellCost);

// 某些奖励可能减少或免除法力消耗
if (bonus->val > 0) {
    // 奖励提供法力加成
    actualManaCost = std::max(0, spellCost - bonus->val);
}
```

### 奖励类型示例

```cpp
#include "BonusCaster.h"

// 神器提供的法术
auto artifactSpellBonus = std::make_shared<Bonus>(
    BonusDuration::PERMANENT,
    BonusType::SPELL,
    BonusSource::ARTIFACT,
    SpellID::LIGHTNING_BOLT,
    BonusSourceID(artifactId)
);

// 技能提供的法术
auto skillSpellBonus = std::make_shared<Bonus>(
    BonusDuration::PERMANENT,
    BonusType::SPELL,
    BonusSource::SKILL,
    SpellID::TELEPORT,
    BonusSourceID(skillId)
);

// 创建对应的施法者
auto artifactCaster = std::make_shared<BonusCaster>(caster, artifactSpellBonus);
auto skillCaster = std::make_shared<BonusCaster>(caster, skillSpellBonus);
```

## 性能特性

- **轻量级**: 只存储奖励引用
- **代理开销**: 继承ProxyCaster的代理机制开销
- **奖励查询**: 奖励属性查询通常高效

## 实现注意事项

1. **奖励有效性**: 确保奖励对象有效且正确配置
2. **代理一致性**: 正确设置和维护实际施法者引用
3. **法力计算**: 正确处理奖励对法力消耗的影响

## 相关文档

- [ProxyCaster](ProxyCaster.md) - 代理施法者基类
- [Caster](Caster.md) - 施法者接口
- [Bonus](../bonuses/Bonus.md) - 奖励加成类