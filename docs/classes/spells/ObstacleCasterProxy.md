# ObstacleCasterProxy

## 概述

`ObstacleCasterProxy` 类继承自 `SilentCaster`，用于处理由法术创建的障碍物（如火墙、力场等）的施法行为。这些障碍物可以持续产生效果，但不应该显示施法描述或消耗法力值。

## 继承关系

```cpp
ProxyCaster
├── SilentCaster
└── ObstacleCasterProxy
```

## SilentCaster 类

### 概述
`SilentCaster` 是 `ObstacleCasterProxy` 的基类，提供静默施法功能，不会显示施法信息或消耗法力值。

### 受保护成员变量

#### owner
```cpp
const PlayerColor owner;
```
- **描述**: 施法者的所有者颜色

### 构造函数

#### SilentCaster(PlayerColor owner_, const Caster * caster)
```cpp
SilentCaster(PlayerColor owner_, const Caster * caster);
```
- **参数**:
  - `owner_`: 施法者的所有者
  - `caster`: 实际的施法者对象
- **描述**: 使用指定的所有者和施法者初始化静默施法者

### 重写方法

#### getCasterName
```cpp
void getCasterName(MetaString & text) const override;
```
- **描述**: 静默施法者不提供施法者名称，仅记录调试信息

#### getCastDescription
```cpp
void getCastDescription(const Spell * spell, const battle::Units & attacked, MetaString & text) const override;
```
- **描述**: 静默施法者不提供施法描述

#### spendMana
```cpp
void spendMana(ServerCallback * server, const int spellCost) const override;
```
- **描述**: 静默施法者不消耗法力值

#### getCasterOwner
```cpp
PlayerColor getCasterOwner() const override;
```
- **返回值**: 返回施法者的所有者，如果有实际施法者则返回其所有者，否则返回预设的所有者
- **描述**: 获取施法者的所有者

#### manaLimit
```cpp
int32_t manaLimit() const override;
```
- **返回值**: 始终返回0
- **描述**: 静默施法者没有法力值限制

## ObstacleCasterProxy 类

### 概述
`ObstacleCasterProxy` 专门用于法术创建的障碍物，代理实际的施法者但使用障碍物的属性来计算法术效果。

### 私有成员变量

#### obs
```cpp
const SpellCreatedObstacle & obs;
```
- **描述**: 对法术创建障碍物的引用，包含障碍物的属性

### 构造函数

#### ObstacleCasterProxy(PlayerColor owner_, const Caster * hero_, const SpellCreatedObstacle & obs_)
```cpp
ObstacleCasterProxy(PlayerColor owner_, const Caster * hero_, const SpellCreatedObstacle & obs_);
```
- **参数**:
  - `owner_`: 障碍物的所有者
  - `hero_`: 创建障碍物的英雄（实际施法者）
  - `obs_`: 法术创建的障碍物对象
- **描述**: 使用指定的所有者、英雄和障碍物初始化障碍物施法者代理

### 重写方法

#### getSpellSchoolLevel
```cpp
int32_t getSpellSchoolLevel(const Spell * spell, SpellSchool * outSelectedSchool = nullptr) const override;
```
- **返回值**: 返回障碍物的法术等级 (`obs.spellLevel`)
- **描述**: 使用障碍物的法术等级而不是实际施法者的等级

#### getEffectLevel
```cpp
int32_t getEffectLevel(const Spell * spell) const override;
```
- **返回值**: 返回障碍物的法术等级 (`obs.spellLevel`)
- **描述**: 使用障碍物的法术等级作为效果等级

#### getSpellBonus
```cpp
int64_t getSpellBonus(const Spell * spell, int64_t base, const battle::Unit * affectedStack) const override;
```
- **返回值**: 返回实际施法者加成和障碍物最小伤害的最大值
- **描述**: 确保法术加成至少达到障碍物的最小伤害值

#### getEffectPower
```cpp
int32_t getEffectPower(const Spell * spell) const override;
```
- **返回值**: 返回障碍物的施法者法术强度 (`obs.casterSpellPower`)
- **描述**: 使用障碍物记录的施法者法术强度

#### getEnchantPower
```cpp
int32_t getEnchantPower(const Spell * spell) const override;
```
- **返回值**: 返回障碍物的施法者法术强度 (`obs.casterSpellPower`)
- **描述**: 使用障碍物记录的施法者法术强度作为附魔强度

#### getEffectValue
```cpp
int64_t getEffectValue(const Spell * spell) const override;
```
- **返回值**: 返回实际施法者效果值和障碍物最小伤害的最大值
- **描述**: 确保效果值至少达到障碍物的最小伤害

#### getEffectRange
```cpp
int64_t getEffectRange(const Spell * spell) const override;
```
- **返回值**: 如果有实际施法者则返回其效果范围，否则返回0
- **描述**: 获取法术的效果范围

## 使用示例

### 创建障碍物施法者代理
```cpp
// 当法术创建障碍物时
SpellCreatedObstacle obstacle = /* ... 创建障碍物 */;
ObstacleCasterProxy proxyCaster(playerColor, heroCaster, obstacle);

// 障碍物现在可以作为施法者，但使用障碍物的属性
int level = proxyCaster.getSpellSchoolLevel(spell); // 返回 obstacle.spellLevel
int power = proxyCaster.getEffectPower(spell);     // 返回 obstacle.casterSpellPower
```

### 静默施法者的基本用法
```cpp
// 创建静默施法者
SilentCaster silentCaster(playerColor, actualCaster);

// 静默施法者不会显示信息或消耗法力值
silentCaster.spendMana(server, 100); // 不执行任何操作
silentCaster.getCastDescription(spell, units, text); // 不添加任何描述
```

## 设计意图

这些类的设计是为了处理持续性法术效果（如障碍物）的特殊需求：

1. **静默操作**: 障碍物不应该在每次触发效果时显示施法信息
2. **无消耗**: 持续效果不应消耗额外的法力值
3. **属性代理**: 使用障碍物的创建时的属性，而不是当前施法者的属性
4. **最小保证**: 确保效果强度不低于创建障碍物时的最低要求

这在处理如火墙、毒气等持续性法术效果时特别重要。