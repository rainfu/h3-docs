# Catapult

## 概述

`Catapult` 类是 VCMI 法术效果系统中用于处理投石机攻城效果的核心类。它继承自 `LocationEffect`，专门负责模拟攻城器械对城墙、城门、塔楼等防御工事进行攻击的效果，包括精确打击和地震般的范围打击。

## 继承关系

```cpp
Effect
└── LocationEffect
    └── Catapult
```

## 枚举类型

### EWallPart

城墙部件枚举，定义可攻击的城防目标：

- `GATE`: 城门
- `KEEP`: 主塔
- `BOTTOM_TOWER`: 下方塔楼
- `UPPER_TOWER`: 上方塔楼
- `BOTTOM_WALL`: 下方城墙
- `BELOW_GATE`: 城门下方
- `OVER_GATE`: 城门上方
- `UPPER_WALL`: 上方城墙

### EWallState

城墙状态枚举：

- `DESTROYED`: 已摧毁
- `DAMAGED`: 已受损
- `INTACT`: 完好

## 公共方法

### applicable

```cpp
bool applicable(Problem & problem, const Mechanics * m) const override;
```

检查投石机效果是否可以应用。

**参数：**
- `problem`: 问题描述对象，用于存储错误信息
- `m`: 法术机制对象

**返回值：**
- `true`: 可以应用投石机效果
- `false`: 不能应用投石机效果

**检查条件：**

1. **城镇检查**:
   - 必须在攻城战中（有防御城镇）

2. **城墙检查**:
   - 城镇必须有城墙（`wallsHealth > 0`）

3. **施法者检查** (智能施法时):
   - 只有攻击方可以使用投石机

4. **目标检查**:
   - 必须有可攻击的城墙部件

### apply

```cpp
void apply(ServerCallback * server, const Mechanics * m, const EffectTarget & target) const override;
```

应用投石机效果。

**参数：**
- `server`: 服务器回调接口
- `m`: 法术机制对象
- `target`: 效果目标列表

**实现逻辑：**

- **大规模打击** (`isMassive() = true`): 地震效果，随机攻击多个目标
- **精确打击** (`isMassive() = false`): 投石机效果，瞄准特定目标

## 保护方法

### serializeJsonEffect

```cpp
void serializeJsonEffect(JsonSerializeFormat & handler) override;
```

序列化投石机效果的配置到 JSON 格式。

**序列化字段：**
- `targetsToAttack`: 攻击目标数量
- `chanceToHitKeep`: 击中主塔的几率（百分比）
- `chanceToHitGate`: 击中城门的几率（百分比）
- `chanceToHitTower`: 击中塔楼的几率（百分比）
- `chanceToHitWall`: 击中城墙的几率（百分比）
- `chanceToNormalHit`: 普通命中的几率（百分比）
- `chanceToCrit`: 暴击的几率（百分比）

## 私有方法

### getCatapultHitChance

```cpp
int getCatapultHitChance(EWallPart part) const;
```

获取攻击特定城墙部件的命中几率。

**参数：**
- `part`: 城墙部件类型

**返回值：**
- 命中几率（百分比）

**命中几率映射：**
- `GATE`: 使用 `gate` 几率
- `KEEP`: 使用 `keep` 几率
- `BOTTOM_TOWER/UPPER_TOWER`: 使用 `tower` 几率
- 城墙部件: 使用 `wall` 几率

### getRandomDamage

```cpp
int getRandomDamage(ServerCallback * server) const;
```

根据伤害概率分布计算随机伤害值。

**返回值：**
- 伤害值（0、1 或 2）

**伤害计算：**
- `0`: 无伤害（`noDmg` 几率）
- `1`: 普通伤害（`hit` 几率）
- `2`: 暴击伤害（`crit` 几率）

### adjustHitChance

```cpp
void adjustHitChance();
```

调整和验证命中几率的合理性，确保所有几率在 0-100 范围内且总和正确。

### applyMassive

```cpp
void applyMassive(ServerCallback * server, const Mechanics * m) const;
```

应用大规模打击效果（地震）。

**实现逻辑：**

1. **获取潜在目标**:
   - 包括所有可摧毁的城墙部件

2. **随机攻击**:
   - 按照 `targetsToAttack` 次数随机选择目标
   - 允许重复攻击同一目标

3. **计算伤害**:
   - 对每个攻击使用 `getRandomDamage()` 计算伤害

4. **移除塔楼射手**:
   - 如果塔楼被摧毁，移除其中的防御单位

### applyTargeted

```cpp
void applyTargeted(ServerCallback * server, const Mechanics * m, const EffectTarget & target) const;
```

应用精确打击效果（投石机）。

**参数：**
- `target`: 包含目标位置的效果目标

**实现逻辑：**

1. **确定目标部件**:
   - 将目标六角格转换为城墙部件

2. **多次攻击**:
   - 按照 `targetsToAttack` 次数进行攻击

3. **命中判定**:
   - 首先尝试命中指定目标
   - 如果未命中，随机选择其他可攻击目标

4. **伤害计算和应用**:
   - 计算伤害并应用到目标部件

### removeTowerShooters

```cpp
void removeTowerShooters(ServerCallback * server, const Mechanics * m) const;
```

当塔楼被摧毁时，移除其中的防御射手单位。

**移除逻辑：**
- 检查主塔、下方塔楼、上方塔楼的状态
- 如果塔楼被摧毁，移除该位置的所有非幽灵单位

### getPotentialTargets

```cpp
std::vector<EWallPart> getPotentialTargets(const Mechanics * m, bool bypassGateCheck, bool bypassTowerCheck) const;
```

获取当前可攻击的城墙部件列表。

**参数：**
- `bypassGateCheck`: 是否跳过城门检查
- `bypassTowerCheck`: 是否跳过塔楼检查

**目标优先级（H3风格）：**
1. **城墙部件**: BOTTOM_WALL, BELOW_GATE, OVER_GATE, UPPER_WALL
2. **城门**: GATE（如果城墙已空或跳过检查）
3. **塔楼**: BOTTOM_TOWER, KEEP, UPPER_TOWER（如果前面目标已空或跳过检查）

## 私有成员

### targetsToAttack

```cpp
int targetsToAttack = 0;
```

每次投石机攻击的目标数量。

### 命中几率配置

```cpp
int gate = 0;  // 击中城门的几率
int keep = 0;  // 击中主塔的几率
int tower = 0; // 击中塔楼的几率
int wall = 0;  // 击中城墙的几率
```

### 伤害几率配置

```cpp
int hit = 0;   // 普通命中几率
int crit = 0;  // 暴击几率
int noDmg = 0; // 无伤害几率（自动计算）
```

## 攻击模式

### 精确打击模式（投石机）

- 瞄准特定城墙部件
- 基于部件类型计算命中几率
- 未命中时随机选择其他目标
- 每次攻击只影响一个部件

### 大规模打击模式（地震）

- 随机攻击多个城墙部件
- 允许重复攻击同一目标
- 忽略命中几率，直接造成伤害
- 模拟地震的范围破坏效果

## 使用示例

### 标准投石机
```cpp
// 配置标准投石机效果
Catapult catapultEffect;
catapultEffect.targetsToAttack = 1;
catapultEffect.wall = 80;   // 80% 命中城墙
catapultEffect.gate = 50;   // 50% 命中城门
catapultEffect.tower = 30;  // 30% 命中塔楼
catapultEffect.keep = 20;   // 20% 命中主塔
catapultEffect.hit = 70;    // 70% 普通伤害
catapultEffect.crit = 20;   // 20% 暴击伤害
// noDmg = 10% (自动计算)
```

### 地震法术
```cpp
// 配置地震效果（大规模打击）
Catapult earthquakeEffect;
earthquakeEffect.targetsToAttack = 3;  // 攻击3个目标
earthquakeEffect.hit = 60;    // 60% 普通伤害
earthquakeEffect.crit = 30;   // 30% 暴击伤害
// 命中几率不适用（直接命中）
```

## 相关类

- `LocationEffect`: 基类，提供位置效果的基本框架
- `Effect`: 效果系统的根基类
- `CatapultAttack`: 投石机攻击数据包
- `TownFortifications`: 城镇防御工事
- `EWallPart`: 城墙部件枚举
- `EWallState`: 城墙状态枚举

## 注意事项

- 只在攻城战中有效，必须有防御城镇和城墙
- 支持两种攻击模式：精确打击和大范围打击
- 命中几率根据目标类型不同而异
- 伤害有三种可能：无伤害、普通伤害、暴击伤害
- 塔楼摧毁时会自动移除其中的防御单位
- 遵循 H3 的目标优先级：城墙 → 城门 → 塔楼
- 自动调整几率值确保配置有效性