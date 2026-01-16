# DemonSummon

## 概述

`DemonSummon` 类是 VCMI 法术效果系统中用于处理恶魔召唤效果的核心类。它继承自 `UnitEffect`，专门负责将战场上的死亡单位转化为恶魔生物，实现"以死亡为食"的黑暗召唤机制。

## 继承关系

```cpp
Effect
└── UnitEffect
    └── DemonSummon
```

## 公共方法

### apply

```cpp
void apply(ServerCallback * server, const Mechanics * m, const EffectTarget & target) const override;
```

应用恶魔召唤效果，将死亡单位转化为恶魔。

**参数：**
- `server`: 服务器回调接口，用于应用战斗状态变化
- `m`: 法术机制对象，包含法术效果的上下文信息
- `target`: 效果目标列表，包含死亡单位

**实现逻辑：**

1. **验证目标**:
   - 检查目标是否为死亡单位且非幽灵单位

2. **寻找位置**:
   - 在目标附近寻找可用的六角格放置召唤物

3. **计算召唤数量**:
   - 使用 `raisedCreatureAmount()` 计算可召唤的数量

4. **创建召唤物**:
   - 生成新的恶魔单位信息
   - 设置位置、数量和属性

5. **移除尸体**:
   - 从战场移除原始尸体，防止重复复活

6. **应用变化**:
   - 发送单位变化数据包

### getHealthChange

```cpp
SpellEffectValue getHealthChange(const Mechanics * m, const EffectTarget & spellTarget) const final;
```

计算恶魔召唤效果对目标造成的生命值变化。

**参数：**
- `m`: 法术机制对象
- `spellTarget`: 法术目标

**返回值：**
- `SpellEffectValue`: 包含单位数量变化和生物类型的结构体

**实现细节：**
- 计算可召唤的恶魔数量
- 返回单位数量变化和恶魔生物类型

## 保护方法

### isValidTarget

```cpp
bool isValidTarget(const Mechanics * m, const battle::Unit * unit) const override;
```

检查目标单位是否能接收恶魔召唤效果。

**参数：**
- `m`: 法术机制对象
- `unit`: 目标单位

**返回值：**
- `true`: 单位可以被转化为恶魔
- `false`: 单位不能被转化为恶魔

**验证条件：**

1. **死亡状态检查**:
   - 单位必须已死亡（`!unit->isDead()` 返回 false）

2. **位置阻挡检查**:
   - 检查单位位置是否被其他有效单位占据

3. **幽灵状态检查**:
   - 不能转化幽灵单位

4. **召唤数量检查**:
   - 必须能够召唤至少1个恶魔

5. **接收性检查**:
   - 使用基础的接收性检查

### serializeJsonUnitEffect

```cpp
void serializeJsonUnitEffect(JsonSerializeFormat & handler) override final;
```

序列化恶魔召唤效果的特定配置到 JSON 格式。

**序列化字段：**
- `id`: 召唤恶魔的生物类型 ID
- `permanent`: 是否为永久召唤

## 私有方法

### raisedCreatureAmount

```cpp
int32_t raisedCreatureAmount(const Mechanics * m, const battle::Unit * unit) const;
```

计算可以从指定尸体召唤的恶魔数量。

**参数：**
- `m`: 法术机制对象
- `unit`: 死亡单位（尸体）

**返回值：**
- 可召唤的恶魔数量

**计算逻辑：**

基于三个限制条件的较小值：

1. **生命值限制**:
   ```
   maxAmountFromHealth = deadTotalHealth / raisedMaxHealth
   ```

2. **数量限制**:
   ```
   maxAmountFromAmount = deadCount
   ```

3. **法术强度限制**:
   ```
   maxAmountFromSpellpower = raisedTotalHealth / raisedMaxHealth
   ```

最终数量：
```
finalAmount = min(maxAmountFromHealth, maxAmountFromAmount, maxAmountFromSpellpower)
```

## 私有成员

### creature

```cpp
CreatureID creature;
```

要召唤的恶魔生物类型 ID。

### permanent

```cpp
bool permanent = false;
```

是否为永久召唤。如果为 true，召唤的恶魔在战斗结束后仍然存在。

## 召唤机制详解

### 目标选择

恶魔召唤只能针对：
- 已死亡的非幽灵单位
- 位置未被其他有效单位占据的尸体
- 能够提供足够生命值转化为恶魔的单位

### 数量计算

召唤数量受多重因素限制：

1. **原始单位生命值**: 尸体提供的总生命值
2. **原始单位数量**: 不能召唤超过原始单位数量的恶魔
3. **法术效果值**: 法术强度决定的最大转化生命值
4. **恶魔最大生命值**: 每个恶魔的生命值上限

### 位置选择

- 在原始尸体附近寻找可用位置
- 使用与原始单位相同的阵营
- 确保新召唤物不会与现有单位重叠

### 尸体处理

- 成功召唤后，原始尸体被完全移除
- 防止尸体被重复复活或转化
- 清理战场空间

## 使用示例

### 基础恶魔召唤
```cpp
// 配置基础恶魔召唤效果
DemonSummon demonSummonEffect;
demonSummonEffect.creature = CreatureID::DEMON;  // 召唤恶魔
demonSummonEffect.permanent = false;  // 战斗结束消失
// effectValue 决定转化生命值的上限
```

### 永久恶魔召唤
```cpp
// 配置永久恶魔召唤效果
DemonSummon demonSummonEffect;
demonSummonEffect.creature = CreatureID::PIT_LORD;  // 召唤深渊领主
demonSummonEffect.permanent = true;   // 战斗结束后仍然存在
```

## 相关类

- `UnitEffect`: 基类，提供单位效果的基本框架
- `Effect`: 效果系统的根基类
- `SpellEffectValue`: 法术效果值的结构体
- `BattleUnitsChanged`: 战斗单位变化数据包
- `battle::UnitInfo`: 战斗单位信息结构体

## 注意事项

- 只能转化已死亡的非幽灵单位
- 召唤数量受尸体生命值、原始数量和法术强度三重限制
- 成功召唤后尸体被移除，防止重复利用
- 位置选择考虑战场布局，避免单位重叠
- 支持永久和临时召唤两种模式
- 自动处理位置阻挡和战场清理