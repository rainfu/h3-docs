# Damage

## 概述

`Damage` 类是 VCMI 法术效果系统中用于处理伤害效果的核心类。它继承自 `UnitEffect`，专门负责计算和应用战斗伤害，包括普通伤害、按百分比杀伤和按数量杀伤等不同类型的伤害效果。

## 继承关系

```cpp
Effect
└── UnitEffect
    └── Damage
```

## 公共方法

### apply

```cpp
void apply(ServerCallback * server, const Mechanics * m, const EffectTarget & target) const override;
```

应用伤害效果到指定的目标单位。

**参数：**
- `server`: 服务器回调接口，用于应用战斗状态变化
- `m`: 法术机制对象，包含法术效果的上下文信息
- `target`: 效果目标列表，包含所有受影响的单位

**实现细节：**
- 遍历所有目标单位，计算每个单位的伤害值
- 使用 `damageForTarget` 方法计算具体伤害
- 创建 `BattleStackAttacked` 数据包应用伤害
- 生成战斗日志消息描述伤害效果
- 支持链式伤害效果（damage chaining）

### getHealthChange

```cpp
SpellEffectValue getHealthChange(const Mechanics * m, const EffectTarget & spellTarget) const final;
```

计算法术效果对目标造成的生命值变化。

**参数：**
- `m`: 法术机制对象
- `spellTarget`: 法术目标

**返回值：**
- `SpellEffectValue`: 包含生命值变化和单位数量变化的结构体

**实现细节：**
- 使用假的随机数生成器模拟伤害计算
- 计算实际应用的伤害量（考虑护甲等防御因素）
- 返回负的生命值变化（伤害）和负的单位数量变化（死亡）

## 保护方法

### isReceptive

```cpp
bool isReceptive(const Mechanics * m, const battle::Unit * unit) const override;
```

检查目标单位是否能接收伤害效果。

**参数：**
- `m`: 法术机制对象
- `unit`: 目标单位

**返回值：**
- `true`: 单位可以接收伤害
- `false`: 单位免疫伤害

**免疫检查：**
- 基础法术伤害免疫（SPELL_DAMAGE_REDUCTION >= 100）
- 元素法术伤害免疫（针对特定法术学派）

### serializeJsonUnitEffect

```cpp
void serializeJsonUnitEffect(JsonSerializeFormat & handler) override final;
```

序列化伤害效果的特定配置到 JSON 格式。

**序列化字段：**
- `killByPercentage`: 是否按百分比杀伤
- `killByCount`: 是否按数量杀伤

### damageForTarget

```cpp
int64_t damageForTarget(size_t targetIndex, const Mechanics * m, const battle::Unit * target) const;
```

计算对特定目标的伤害值。

**参数：**
- `targetIndex`: 目标在目标列表中的索引（用于链式伤害衰减）
- `m`: 法术机制对象
- `target`: 目标单位

**返回值：**
- 计算后的伤害值

**伤害计算逻辑：**

1. **按百分比杀伤** (`killByPercentage = true`):
   ```
   amountToKill = target->getCount() * effectValue / 100
   baseDamage = amountToKill * target->getMaxHealth()
   ```

2. **按数量杀伤** (`killByCount = true`):
   ```
   baseDamage = effectValue * target->getMaxHealth()
   ```

3. **普通伤害**:
   ```
   baseDamage = m->adjustEffectValue(target)
   ```

4. **链式伤害衰减** (如果 `chainLength > 1` 且 `targetIndex > 0`):
   ```
   indexedFactor = chainFactor ^ targetIndex
   finalDamage = indexedFactor * baseDamage
   ```

### describeEffect

```cpp
virtual void describeEffect(std::vector<MetaString> & log, const Mechanics * m, const battle::Unit * firstTarget, uint32_t kills, int64_t damage, bool multiple) const;
```

生成伤害效果的描述文本。

**参数：**
- `log`: 用于存储描述文本的向量
- `m`: 法术机制对象
- `firstTarget`: 第一个目标单位
- `kills`: 杀死的单位数量
- `damage`: 造成的总伤害
- `multiple`: 是否有多个目标

**特殊处理：**
- **死亡凝视** (Death Stare): 特殊描述文本
- **精准射击** (Accurate Shot): 使用本地化文本
- **雷霆一击** (Thunderbolt): 特殊描述格式
- **普通伤害**: 标准伤害描述格式

## 私有成员

### killByPercentage

```cpp
bool killByPercentage = false;
```

是否按目标单位数量的百分比造成伤害。

### killByCount

```cpp
bool killByCount = false;
```

是否按固定数量的单位造成伤害（每个单位受到最大生命值的伤害）。

## 使用示例

### 普通伤害法术
```cpp
// 创建伤害效果，造成固定伤害
Damage damageEffect;
damageEffect.killByPercentage = false;
damageEffect.killByCount = false;
// effectValue 直接作为伤害值
```

### 百分比杀伤法术
```cpp
// 创建按百分比杀伤的效果
Damage damageEffect;
damageEffect.killByPercentage = true;
damageEffect.killByCount = false;
// effectValue 作为百分比 (0-100)
```

### 数量杀伤法术
```cpp
// 创建按数量杀伤的效果
Damage damageEffect;
damageEffect.killByPercentage = false;
damageEffect.killByCount = true;
// effectValue 作为要杀死的单位数量
```

## 相关类

- `UnitEffect`: 基类，提供单位效果的基本框架
- `Effect`: 效果系统的根基类
- `SpellEffectValue`: 法术效果值的结构体
- `BattleStackAttacked`: 战斗单位攻击数据包
- `StacksInjured`: 受伤单位数据包

## 注意事项

- 伤害计算考虑了单位的防御、护甲等因素
- 支持链式伤害效果，后续目标伤害递减
- 特殊的伤害类型（如按百分比或按数量）通过配置标志控制
- 免疫检查包括一般法术免疫和元素法术免疫
- 战斗日志生成支持多种法术的特殊描述格式