# Heal

## 概述

`Heal` 类是 VCMI 法术效果系统中用于处理治疗和复活效果的核心类。它继承自 `UnitEffect`，专门负责恢复单位生命值，包括普通治疗、复活死亡单位和过度治疗等不同类型的治疗效果。

## 继承关系

```cpp
Effect
└── UnitEffect
    └── Heal
```

## 枚举类型

### EHealLevel

治疗级别枚举，定义治疗效果的类型：

- `HEAL`: 普通治疗，只治疗存活单位
- `RESURRECT`: 复活治疗，可以复活死亡单位
- `OVERHEAL`: 过度治疗，可以治疗超过最大生命值的伤害

### EHealPower

治疗持久性枚举，定义治疗效果的持续时间：

- `ONE_BATTLE`: 仅在当前战斗中有效
- `PERMANENT`: 永久性治疗效果

## 公共方法

### apply

```cpp
void apply(ServerCallback * server, const Mechanics * m, const EffectTarget & target) const override;
```

应用治疗效果到指定的目标单位。

**参数：**
- `server`: 服务器回调接口，用于应用战斗状态变化
- `m`: 法术机制对象，包含法术效果的上下文信息
- `target`: 效果目标列表，包含所有受影响的单位

**实现细节：**
- 调用重载的 `apply(int64_t, ServerCallback*, const Mechanics*, const EffectTarget&)` 方法
- 使用法术的 `effectValue` 作为治疗值

### getHealthChange

```cpp
SpellEffectValue getHealthChange(const Mechanics * m, const EffectTarget & spellTarget) const override;
```

计算法术效果对目标造成的生命值变化。

**参数：**
- `m`: 法术机制对象
- `spellTarget`: 法术目标

**返回值：**
- `SpellEffectValue`: 包含生命值变化和单位数量变化的结构体

**实现细节：**
- 遍历所有目标单位，累加治疗效果值
- 使用 `getHealEffectValue` 计算每个单位的治疗效果
- 返回正的生命值变化（治疗）和正的单位数量变化（复活）

## 保护方法

### apply (重载)

```cpp
void apply(int64_t value, ServerCallback * server, const Mechanics * m, const EffectTarget & target) const;
```

使用指定的治疗值应用治疗效果。

**参数：**
- `value`: 治疗值
- `server`: 服务器回调接口
- `m`: 法术机制对象
- `target`: 效果目标列表

**实现细节：**
- 创建 `BattleUnitsChanged` 和 `BattleLogMessage` 数据包
- 调用 `prepareHealEffect` 准备治疗效果
- 应用状态变化和日志消息

### isValidTarget

```cpp
bool isValidTarget(const Mechanics * m, const battle::Unit * unit) const override;
```

检查目标单位是否能接收治疗效果。

**参数：**
- `m`: 法术机制对象
- `unit`: 目标单位

**返回值：**
- `true`: 单位可以接收治疗
- `false`: 单位不能接收治疗

**验证逻辑：**

1. **基本有效性检查**:
   - 对于普通治疗（`HEAL`），只检查存活单位
   - 对于复活治疗（`RESURRECT`），检查所有单位（包括死亡单位）

2. **伤害检查**:
   - 单位必须有未治疗的伤害（`injuries > 0`）

3. **最小完整单位要求**:
   - 如果设置了 `minFullUnits`，治疗量必须足够复活指定数量的完整单位

4. **复活阻挡检查**:
   - 死亡单位的位置不能被其他有效单位占据

### serializeJsonUnitEffect

```cpp
void serializeJsonUnitEffect(JsonSerializeFormat & handler) override final;
```

序列化治疗效果的特定配置到 JSON 格式。

**序列化字段：**
- `healLevel`: 治疗级别（"heal", "resurrect", "overHeal"）
- `healPower`: 治疗持久性（"oneBattle", "permanent"）
- `minFullUnits`: 最小完整单位数量要求

### getHealEffectValue

```cpp
SpellEffectValue getHealEffectValue(int64_t value, const Mechanics * m, const battle::Unit * unit, std::shared_ptr<battle::Unit> newState = nullptr) const;
```

计算对特定单位的治疗效果值。

**参数：**
- `value`: 基础治疗值
- `m`: 法术机制对象
- `unit`: 目标单位
- `newState`: 新的单位状态（可选，用于模拟）

**返回值：**
- `SpellEffectValue`: 包含实际治疗量和复活单位数的结构体

**计算逻辑：**
- 设置基础治疗量（`hpDelta = value`）
- 使用单位的 `heal` 方法应用治疗
- 计算治疗前后单位数量的变化（复活的单位数）

### prepareHealEffect

```cpp
void prepareHealEffect(int64_t value, BattleUnitsChanged & pack, BattleLogMessage & logMessage, RNG & rng, const Mechanics * m, const EffectTarget & target) const;
```

准备治疗效果的数据包和日志消息。

**参数：**
- `value`: 治疗值
- `pack`: 战斗单位变化数据包
- `logMessage`: 战斗日志消息
- `rng`: 随机数生成器
- `m`: 法术机制对象
- `target`: 效果目标列表

**实现细节：**
- 遍历所有目标单位
- 计算每个单位的治疗效果
- 生成相应的日志消息：
  - 复活消息："%d %s rise from the dead!"
  - 单位治疗消息：显示治疗的生命值
- 创建单位状态变化记录

## 私有成员

### healLevel

```cpp
EHealLevel healLevel = EHealLevel::HEAL;
```

治疗级别，默认为普通治疗。

### healPower

```cpp
EHealPower healPower = EHealPower::PERMANENT;
```

治疗持久性，默认为永久治疗。

### minFullUnits

```cpp
int32_t minFullUnits = 0;
```

最小完整单位数量要求。治疗效果必须能够复活至少这个数量的完整单位。

## 使用示例

### 普通治疗法术
```cpp
// 创建普通治疗效果
Heal healEffect;
healEffect.healLevel = EHealLevel::HEAL;
healEffect.healPower = EHealPower::PERMANENT;
// effectValue 直接作为治疗量
```

### 复活法术
```cpp
// 创建复活效果
Heal healEffect;
healEffect.healLevel = EHealLevel::RESURRECT;
healEffect.healPower = EHealPower::PERMANENT;
// 可以复活死亡单位
```

### 一次性战斗治疗
```cpp
// 创建战斗中临时治疗效果
Heal healEffect;
healEffect.healLevel = EHealLevel::HEAL;
healEffect.healPower = EHealPower::ONE_BATTLE;
// 治疗效果仅在当前战斗中有效
```

### 最小单位要求
```cpp
// 设置最小完整单位要求
Heal healEffect;
healEffect.healLevel = EHealLevel::RESURRECT;
healEffect.minFullUnits = 2;
// 治疗效果必须至少复活2个完整单位
```

## 相关类

- `UnitEffect`: 基类，提供单位效果的基本框架
- `Effect`: 效果系统的根基类
- `SpellEffectValue`: 法术效果值的结构体
- `BattleUnitsChanged`: 战斗单位变化数据包
- `BattleLogMessage`: 战斗日志消息
- `EHealLevel`: 治疗级别枚举
- `EHealPower`: 治疗持久性枚举

## 注意事项

- 支持三种治疗级别：普通治疗、复活和过度治疗
- 可以设置治疗的持久性（单场战斗或永久）
- 支持最小完整单位数量的限制条件
- 复活时会检查位置是否被其他单位占据
- 自动生成相应的战斗日志消息
- 治疗效果会影响单位的可用生命值和单位数量