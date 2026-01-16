# Summon

## 概述

`Summon` 类是 VCMI 法术效果系统中用于处理召唤生物效果的核心类。它继承自 `Effect`，专门负责在战斗中召唤新的生物单位，包括元素生物、恶魔等各种类型的召唤物。

## 继承关系

```cpp
Effect
└── Summon
```

## 公共方法

### adjustAffectedHexes

```cpp
void adjustAffectedHexes(BattleHexArray & hexes, const Mechanics * m, const Target & spellTarget) const override;
```

调整受影响的六角格。召唤效果不影响任何六角格。

**参数：**
- `hexes`: 受影响的六角格数组（在此方法中保持不变）
- `m`: 法术机制对象
- `spellTarget`: 法术目标

### adjustTargetTypes

```cpp
void adjustTargetTypes(std::vector<TargetType> & types) const override;
```

调整目标类型。召唤效果允许任何目标类型。

**参数：**
- `types`: 目标类型向量（在此方法中保持不变）

### applicable

```cpp
bool applicable(Problem & problem, const Mechanics * m) const override;
```

检查召唤效果是否可以应用。

**参数：**
- `problem`: 问题描述对象，用于存储错误信息
- `m`: 法术机制对象

**返回值：**
- `true`: 可以应用召唤效果
- `false`: 不能应用召唤效果

**检查条件：**

1. **生物类型检查**:
   - 必须指定有效的生物类型（`creature != CreatureID::NONE`）

2. **召唤数量检查**:
   - 召唤数量必须大于0

3. **独占性检查** (如果 `exclusive = true`):
   - 检查是否已存在其他类型的召唤生物
   - 如果存在，生成相应的错误消息

### apply

```cpp
void apply(ServerCallback * server, const Mechanics * m, const EffectTarget & target) const override;
```

应用召唤效果。

**参数：**
- `server`: 服务器回调接口
- `m`: 法术机制对象
- `target`: 效果目标列表

**实现逻辑：**

1. **治疗现有召唤物**:
   - 如果目标是已存在的召唤单位，使用 `heal` 方法恢复生命值

2. **召唤新生物**:
   - 创建新的 `battle::UnitInfo` 结构体
   - 设置生物类型、数量、位置和属性
   - 添加到 `BattleUnitsChanged` 数据包

3. **应用变化**:
   - 发送数据包到客户端

### filterTarget

```cpp
EffectTarget filterTarget(const Mechanics * m, const EffectTarget & target) const override;
```

过滤目标。召唤效果直接返回所有目标。

**参数：**
- `m`: 法术机制对象
- `target`: 原始目标列表

**返回值：**
- 过滤后的目标列表（与输入相同）

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

1. **查找相同类型的现有召唤物**:
   - 如果 `summonSameUnit = true` 且存在相同类型的活召唤物
   - 返回现有召唤物作为目标

2. **召唤新生物**:
   - 否则，寻找可用的六角格位置
   - 返回该位置作为目标

## 保护方法

### serializeJsonEffect

```cpp
void serializeJsonEffect(JsonSerializeFormat & handler) override final;
```

序列化召唤效果的配置到 JSON 格式。

**序列化字段：**
- `id`: 召唤生物的类型 ID
- `permanent`: 是否为永久召唤（默认 false）
- `exclusive`: 是否独占（默认 true）
- `summonByHealth`: 是否按生命值召唤（默认 false）
- `summonSameUnit`: 是否召唤相同单位（默认 false）

## 私有方法

### summonedCreatureAmount

```cpp
int32_t summonedCreatureAmount(const Mechanics * m) const;
```

计算召唤生物的数量。

**参数：**
- `m`: 法术机制对象

**返回值：**
- 召唤生物的数量

**计算逻辑：**

- **按数量召唤** (`summonByHealth = false`):
  ```
  amount = effectValueWithBonus
  ```

- **按生命值召唤** (`summonByHealth = true`):
  ```
  amount = effectValueWithBonus / creatureMaxHealth
  ```

### summonedCreatureHealth

```cpp
int32_t summonedCreatureHealth(const Mechanics * m, const battle::Unit * unit) const;
```

计算召唤生物的生命值。

**参数：**
- `m`: 法术机制对象
- `unit`: 目标单位

**返回值：**
- 召唤生物的生命值

**计算逻辑：**

- **按生命值召唤** (`summonByHealth = true`):
  ```
  health = effectValueWithBonus
  ```

- **按数量召唤** (`summonByHealth = false`):
  ```
  health = effectValueWithBonus * unitMaxHealth
  ```

## 私有成员

### creature

```cpp
CreatureID creature;
```

要召唤的生物类型 ID。

### permanent

```cpp
bool permanent = false;
```

是否为永久召唤。如果为 true，召唤物在战斗结束后仍然存在；如果为 false，仅在当前战斗中存在。

### exclusive

```cpp
bool exclusive = true;
```

是否独占。如果为 true，不能同时存在不同类型的召唤物。

### summonByHealth

```cpp
bool summonByHealth = false;
```

召唤模式：
- `false`: 按生物数量召唤（effectValue 表示要召唤的生物数量）
- `true`: 按生命值召唤（effectValue 表示总生命值，数量 = 总生命值 / 单个生物最大生命值）

### summonSameUnit

```cpp
bool summonSameUnit = false;
```

是否召唤相同单位。如果为 true，会强化已存在的相同类型召唤物而不是召唤新的。

## 使用示例

### 基本召唤法术
```cpp
// 召唤元素生物
Summon summonEffect;
summonEffect.creature = CreatureID::AIR_ELEMENTAL;
summonEffect.permanent = false;
summonEffect.exclusive = true;
// effectValue 作为召唤数量
```

### 永久召唤
```cpp
// 召唤永久存在的生物
Summon summonEffect;
summonEffect.creature = CreatureID::EARTH_ELEMENTAL;
summonEffect.permanent = true;  // 战斗结束后仍然存在
summonEffect.exclusive = false; // 允许其他召唤物
```

### 按生命值召唤
```cpp
// 按总生命值召唤
Summon summonEffect;
summonEffect.creature = CreatureID::FIRE_ELEMENTAL;
summonEffect.summonByHealth = true; // effectValue 作为总生命值
summonEffect.summonSameUnit = true; // 强化现有召唤物
```

### 非独占召唤
```cpp
// 允许同时存在多种召唤物
Summon summonEffect;
summonEffect.creature = CreatureID::WATER_ELEMENTAL;
summonEffect.exclusive = false; // 不检查其他召唤物
```

## 相关类

- `Effect`: 基类，提供效果的基本框架
- `CreatureID`: 生物类型标识符
- `BattleUnitsChanged`: 战斗单位变化数据包
- `battle::UnitInfo`: 战斗单位信息结构体
- `SlotID`: 单位槽位标识符

## 注意事项

- 支持两种召唤模式：按数量召唤和按生命值召唤
- 可以设置为永久召唤或临时召唤
- 支持独占模式，防止同时存在不同类型的召唤物
- 可以选择强化现有召唤物而不是召唤新的
- 自动寻找可用的战斗位置进行召唤
- 召唤失败时会记录错误日志