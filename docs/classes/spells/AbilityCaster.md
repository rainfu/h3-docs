# AbilityCaster

## 概述

`AbilityCaster` 类实现了基于能力的法术施法者机制，继承自ProxyCaster。该类用于处理具有固定法术等级的能力施法，如生物的特殊能力或神器的法术效果。

## 主要组件

### AbilityCaster 类

能力施法者类，继承自ProxyCaster。

#### 主要属性

- `baseSpellLevel`: 基础法术等级

#### 构造函数

```cpp
AbilityCaster(const battle::Unit * actualCaster_, int32_t baseSpellLevel_);
```

创建能力施法者。

#### 核心方法

```cpp
int32_t getSpellSchoolLevel(const Spell * spell, SpellSchool * outSelectedSchool = nullptr) const override;
```

获取法术在特定学派的等级。

```cpp
int32_t getEffectLevel(const Spell * spell) const override;
```

获取法术效果等级。

```cpp
void getCastDescription(const Spell * spell, const battle::Units & attacked, MetaString & text) const override;
```

获取施法描述。

```cpp
void spendMana(ServerCallback * server, const int32_t spellCost) const override;
```

消耗法力值。

## 机制说明

### 固定等级系统

1. **基础等级**: 使用预设的基础法术等级
2. **等级限制**: 不受施法者实际等级影响
3. **能力施法**: 用于生物特殊能力和神器效果
4. **等级一致性**: 所有法术使用相同的固定等级

### 代理施法

1. **代理机制**: 通过ProxyCaster实现施法代理
2. **实际施法者**: 引用实际的战斗单位作为施法者
3. **效果委托**: 将施法效果委托给实际施法者
4. **状态同步**: 保持代理和实际施法者状态同步

## 依赖关系

- **ProxyCaster**: 代理施法者基类
- **battle::Unit**: 战斗单位
- **Spell**: 法术类
- **SpellSchool**: 法术学派
- **ServerCallback**: 服务器回调

## 使用示例

### 创建能力施法者

```cpp
#include "AbilityCaster.h"

// 创建具有3级法术等级的能力施法者
auto abilityCaster = std::make_shared<AbilityCaster>(unit, 3);

// 使用能力施法者施放法术
abilityCaster->cast(spell, target);
```

### 配置法术等级

```cpp
#include "AbilityCaster.h"

// 获取法术等级
int schoolLevel = abilityCaster->getSpellSchoolLevel(spell, &selectedSchool);
int effectLevel = abilityCaster->getEffectLevel(spell);

// 等级总是返回基础等级
assert(schoolLevel == 3);
assert(effectLevel == 3);
```

### 施法描述

```cpp
#include "AbilityCaster.h"

// 获取施法描述
MetaString description;
abilityCaster->getCastDescription(spell, attackedUnits, description);

// 描述会包含施法者的能力信息
```

## 性能特性

- **轻量级**: 只存储基础等级信息
- **快速查询**: 等级查询是O(1)操作
- **代理开销**: 继承ProxyCaster的代理机制开销

## 实现注意事项

1. **等级固定**: 确保等级不会动态改变
2. **代理正确性**: 正确设置和维护实际施法者引用
3. **法力管理**: 正确处理法力消耗逻辑

## 相关文档

- [ProxyCaster](ProxyCaster.md) - 代理施法者基类
- [Caster](Caster.md) - 施法者接口