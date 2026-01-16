# Sacrifice

## 概述

`Sacrifice` 类是 VCMI 法术效果系统中用于处理牺牲效果的核心类。它继承自 `Heal`，实现了一种特殊的治疗机制：牺牲一个活着的单位来复活另一个死亡的单位，通过牺牲生命来换取复活。

## 继承关系

```cpp
Effect
└── UnitEffect
    └── Heal
        └── Sacrifice
```

## 公共方法

### adjustTargetTypes

```cpp
void adjustTargetTypes(std::vector<TargetType> & types) const override;
```

调整目标类型，确保牺牲法术需要两个单位目标。

**参数：**
- `types`: 目标类型向量

**目标格式要求：**
- 第一个目标必须是 `CREATURE`（要复活的单位）
- 如果只有一个目标，添加第二个 `CREATURE`（要牺牲的单位）
- 如果有多个目标，第二个目标必须是 `CREATURE`

### applicable (重载1)

```cpp
bool applicable(Problem & problem, const Mechanics * m) const override;
```

检查牺牲效果是否可以应用（无目标版本）。

**参数：**
- `problem`: 问题描述对象
- `m`: 法术机制对象

**返回值：**
- `true`: 同时存在可牺牲的活单位和可复活的死单位
- `false`: 缺少必要的单位组合

**检查条件：**
- 必须同时存在：
  - 可牺牲的活着的非机械单位
  - 可复活的死亡单位

### applicable (重载2)

```cpp
bool applicable(Problem & problem, const Mechanics * m, const EffectTarget & target) const override;
```

检查牺牲效果是否可以应用到指定目标。

**参数：**
- `problem`: 问题描述对象
- `m`: 法术机制对象
- `target`: 效果目标列表

**返回值：**
- `true`: 目标组合有效
- `false`: 目标组合无效

**验证条件：**
- 必须有且只有2个目标
- 第一个目标（复活目标）必须是死亡单位
- 第二个目标（牺牲目标）必须是活着的有效单位

### apply

```cpp
void apply(ServerCallback * server, const Mechanics * m, const EffectTarget & target) const override;
```

应用牺牲效果。

**参数：**
- `server`: 服务器回调接口
- `m`: 法术机制对象
- `target`: 效果目标列表（复活目标 + 牺牲目标）

**实现逻辑：**

1. **验证目标**:
   - 确保有两个有效目标

2. **执行治疗**:
   - 计算牺牲单位的治疗值
   - 对复活目标应用治疗效果

3. **移除牺牲单位**:
   - 从战场移除牺牲单位

### transformTarget

```cpp
EffectTarget transformTarget(const Mechanics * m, const Target & aimPoint, const Target & spellTarget) const override;
```

转换目标，将法术目标转换为效果目标。

**参数：**
- `m`: 法术机制对象
- `aimPoint`: 瞄准点
- `spellTarget`: 法术目标

**返回值：**
- 效果目标列表

**转换逻辑：**
- 第一个目标：使用基类的治疗目标转换
- 第二个目标：添加有效的牺牲单位

### getHealthChange

```cpp
SpellEffectValue getHealthChange(const Mechanics * m, const EffectTarget & spellTarget) const final;
```

计算牺牲效果的生命值变化。

**参数：**
- `m`: 法术机制对象
- `spellTarget`: 法术目标

**返回值：**
- `SpellEffectValue`: 包含生命值变化和单位数量变化的结构体

**计算逻辑：**

- **复活目标死亡时**:
  ```
  hpDelta = 基础生命值 × 单位数量
  unitsDelta = 单位数量
  ```

- **复活目标存活时**:
  ```
  hpDelta = calculateHealEffectValue()
  unitsDelta = -牺牲单位数量
  ```

## 保护方法

### isValidTarget

```cpp
bool isValidTarget(const Mechanics * m, const battle::Unit * unit) const override;
```

检查目标单位是否能接收牺牲效果。

**参数：**
- `m`: 法术机制对象
- `unit`: 目标单位

**返回值：**
- `true`: 单位可以作为目标
- `false`: 单位不能作为目标

**验证逻辑：**
- 单位必须是有效的目标（包括死亡单位）

## 私有方法

### calculateHealEffectValue

```cpp
static int64_t calculateHealEffectValue(const Mechanics * m, const battle::Unit * victim);
```

计算牺牲单位的治疗效果值。

**参数：**
- `m`: 法术机制对象
- `victim`: 牺牲单位

**返回值：**
- 治疗效果值

**计算公式：**
```
治疗值 = (法术强度 + 牺牲单位最大生命值 + 基础效果值) × 牺牲单位数量
```

## 牺牲机制详解

### 双目标系统

牺牲法术需要精确的两个目标：

1. **复活目标**: 要复活的死亡单位
2. **牺牲目标**: 要牺牲的活着的单位

### 治疗计算

牺牲的治疗效果基于牺牲单位的属性：

- **法术强度**: 施法者的法术强度
- **单位生命值**: 牺牲单位的最大生命值
- **单位数量**: 牺牲单位的堆叠数量
- **基础加成**: 法术的基础效果值

### 单位验证

#### 可牺牲单位
- 必须是活着的单位
- 必须是非机械单位（没有MECHANICAL加成）
- 必须通过接收性检查

#### 可复活单位
- 必须是死亡单位
- 必须通过基础治疗目标验证

### 执行流程

1. **验证阶段**: 检查两个目标的有效性
2. **计算阶段**: 计算牺牲单位的治疗潜力
3. **治疗阶段**: 对复活目标应用治疗效果
4. **清理阶段**: 移除牺牲单位

## 使用示例

### 标准牺牲法术
```cpp
// 配置牺牲法术效果
Sacrifice sacrificeEffect;
sacrificeEffect.healLevel = EHealLevel::RESURRECT;  // 复活级别
sacrificeEffect.healPower = EHealPower::PERMANENT;  // 永久治疗
// effectValue 用于计算治疗强度
```

### 目标选择
```cpp
// 法术目标格式
Target spellTarget = {
    deadUnit,    // 要复活的死亡单位
    liveUnit     // 要牺牲的活单位
};
```

## 相关类

- `Heal`: 治疗效果基类
- `UnitEffect`: 单位效果基类
- `Effect`: 效果系统的根基类
- `SpellEffectValue`: 法术效果值的结构体
- `BattleUnitsChanged`: 战斗单位变化数据包

## 注意事项

- 需要精确的两个单位目标
- 牺牲单位会被完全移除战场
- 治疗效果基于牺牲单位的属性计算
- 只对非机械活单位有效
- 支持复活和治疗两种模式
- 自动验证目标的存活状态
- 治疗效果可以超过单位的最大生命值