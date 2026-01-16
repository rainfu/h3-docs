# BattleSpellMechanics

## 概述

`BattleSpellMechanics` 类实现了战斗法术的完整机制，继承自BaseMechanics。该类负责处理战斗中法术的施放逻辑，包括目标选择、效果应用、法术抵抗、反射等所有战斗法术相关的复杂逻辑。

## 主要组件

### BattleSpellMechanics 类

战斗法术机制类，继承自BaseMechanics。

#### 主要属性

- `effects`: 法术效果集合
- `targetCondition`: 目标条件检查器
- `affectedUnits`: 受影响的单位列表
- `resistantUnitIds`: 抵抗法术的单位ID集合
- `effectsToApply`: 要应用的效果集合

#### 构造函数

```cpp
BattleSpellMechanics(const IBattleCast * event, std::shared_ptr<effects::Effects> effects_, std::shared_ptr<IReceptiveCheck> targetCondition_);
```

创建战斗法术机制。

#### 核心方法

```cpp
void forEachEffect(const std::function<bool(const spells::effects::Effect &)> & fn) const override final;
```

遍历所有法术效果。

```cpp
void applyEffects(ServerCallback * server, const Target & targets, bool indirect, bool ignoreImmunity) const override;
```

应用法术效果到目标。

```cpp
bool canBeCast(Problem & problem) const override;
```

检查法术是否可以施放。

```cpp
bool canBeCastAt(const Target & target, Problem & problem) const override;
```

检查法术是否可以在指定目标上施放。

```cpp
void cast(ServerCallback * server, const Target & target) override final;
void castEval(ServerCallback * server, const Target & target) override final;
```

施放法术（正式施放和评估施放）。

```cpp
std::vector<const CStack *> getAffectedStacks(const Target & target) const override final;
```

获取受影响的堆栈列表。

```cpp
std::vector<AimType> getTargetTypes() const override final;
```

获取可用的目标类型。

```cpp
std::vector<Destination> getPossibleDestinations(size_t index, AimType aimType, const Target & current, bool fast) const override final;
```

获取可能的施放目标位置。

```cpp
bool isReceptive(const battle::Unit * target) const override;
```

检查目标是否可接受法术。

```cpp
bool isSmart() const override;
```

检查是否为智能法术。

```cpp
bool wouldResist(const battle::Unit * unit) const override;
```

检查单位是否会抵抗法术。

```cpp
BattleHexArray rangeInHexes(const BattleHex & centralHex) const override;
```

获取法术影响的六角格范围。

```cpp
Target canonicalizeTarget(const Target & aim) const override;
```

标准化目标。

```cpp
const Spell * getSpell() const override;
```

获取法术对象。

#### 私有方法

```cpp
void beforeCast(BattleSpellCast & sc, vstd::RNG & rng, const Target & target);
```

施法前准备。

```cpp
bool isReflected(const battle::Unit * unit, vstd::RNG & rng);
void reflect(BattleSpellCast & sc, vstd::RNG & rng, const battle::Unit * unit);
```

法术反射相关。

```cpp
const battle::Unit * getRandomUnit(vstd::RNG & rng, const BattleSide & side);
```

获取随机单位。

```cpp
std::set<const battle::Unit *> collectTargets() const;
```

收集目标单位。

```cpp
void doRemoveEffects(ServerCallback * server, const battle::Units & targets, const CSelector & selector);
```

移除效果。

```cpp
BattleHexArray spellRangeInHexes(const BattleHex & centralHex) const;
```

获取法术范围。

```cpp
Target transformSpellTarget(const Target & aimPoint) const;
```

转换法术目标。

```cpp
bool canCastAtTarget(const battle::Unit * target) const;
```

检查是否可以在目标上施放。

## 机制说明

### 战斗法术流程

1. **目标验证**: 检查法术是否可以在指定目标上施放
2. **施法准备**: 执行施法前准备工作
3. **效果应用**: 将法术效果应用到目标
4. **抵抗检查**: 处理单位的法术抵抗
5. **反射处理**: 处理法术反射机制

### 目标系统

1. **目标类型**: 支持多种目标类型（单位、位置、区域等）
2. **范围计算**: 计算法术影响的六角格范围
3. **目标标准化**: 将目标转换为标准格式
4. **目标收集**: 收集所有受影响的目标单位

### 抵抗与反射

1. **抵抗计算**: 根据单位属性计算抵抗概率
2. **反射机制**: 某些法术可以被反射回施法者
3. **免疫处理**: 处理法术免疫效果
4. **连锁效果**: 处理连锁闪电等连锁法术

## 依赖关系

- **BaseMechanics**: 基础法术机制
- **effects::Effects**: 法术效果系统
- **IReceptiveCheck**: 接受性检查接口
- **IBattleCast**: 战斗施法接口
- **ServerCallback**: 服务器回调
- **battle::Unit**: 战斗单位

## 使用示例

### 创建战斗法术机制

```cpp
#include "BattleSpellMechanics.h"

// 创建战斗法术机制
auto mechanics = std::make_shared<BattleSpellMechanics>(
    battleCastEvent,
    spellEffects,
    targetCondition
);
```

### 检查施法可能性

```cpp
#include "BattleSpellMechanics.h"

// 检查法术是否可以施放
Problem problem;
bool canCast = mechanics->canBeCast(problem);

if (!canCast) {
    // 处理无法施放的情况
    handleProblem(problem);
}
```

### 施放法术

```cpp
#include "BattleSpellMechanics.h"

// 施放法术到目标
Target target = getSpellTarget();
mechanics->cast(serverCallback, target);

// 或者评估施放（不实际应用效果）
mechanics->castEval(serverCallback, target);
```

### 获取目标信息

```cpp
#include "BattleSpellMechanics.h"

// 获取可用的目标类型
auto targetTypes = mechanics->getTargetTypes();

// 获取可能的施放位置
auto destinations = mechanics->getPossibleDestinations(0, AimType::CREATURE, currentTarget, false);

// 获取受影响的堆栈
auto affectedStacks = mechanics->getAffectedStacks(target);
```

### 检查单位反应

```cpp
#include "BattleSpellMechanics.h"

// 检查单位是否会抵抗
bool willResist = mechanics->wouldResist(unit);

// 检查单位是否可接受法术
bool receptive = mechanics->isReceptive(unit);
```

## 性能特性

- **复杂计算**: 目标验证和效果应用有较高计算复杂度
- **缓存优化**: 使用缓存存储抵抗和反射计算结果
- **范围查询**: 六角格范围计算相对高效

## 实现注意事项

1. **状态一致性**: 确保施法前后的状态一致性
2. **随机性处理**: 正确处理抵抗和反射的随机性
3. **效果顺序**: 确保法术效果按正确顺序应用
4. **目标验证**: 全面验证目标的有效性和可接受性

## 相关文档

- [BaseMechanics](BaseMechanics.md) - 基础法术机制
- [ISpellMechanics](ISpellMechanics.md) - 法术机制接口
- [effects::Effects](../effects/Effects.md) - 法术效果系统