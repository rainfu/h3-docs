# Clone

## 概述

`Clone` 类是 VCMI 法术效果系统中用于处理克隆效果的核心类。它继承自 `UnitEffect`，专门负责创建目标单位的精确复制品，包括处理克隆的持续时间、标记和管理。

## 继承关系

```cpp
Effect
└── UnitEffect
    └── Clone
```

## 公共方法

### apply

```cpp
void apply(ServerCallback * server, const Mechanics * m, const EffectTarget & target) const override;
```

应用克隆效果，创建目标单位的复制品。

**参数：**
- `server`: 服务器回调接口
- `m`: 法术机制对象
- `target`: 效果目标列表

**实现逻辑：**

1. **验证目标**:
   - 检查目标是否为有效的单位
   - 确保单位数量大于0

2. **寻找位置**:
   - 为克隆体寻找可用的六角格位置
   - 如果没有可用位置，记录错误并停止

3. **创建克隆体**:
   - 生成新的单位ID
   - 创建 `battle::UnitInfo` 结构体
   - 设置克隆体的属性（数量、类型、位置等）
   - 标记为召唤单位（`summoned = true`）

4. **设置克隆标记**:
   - 将克隆体标记为克隆（`cloned = true`）
   - 设置原单位的克隆ID引用（`cloneID = unitId`）

5. **设置持续时间**:
   - 添加生命周期标记（`Bonus`），持续时间为法术效果持续时间
   - 使用 `SetStackEffect` 数据包应用效果

## 保护方法

### isReceptive

```cpp
bool isReceptive(const Mechanics * m, const battle::Unit * s) const override;
```

检查目标单位是否能接收克隆效果。

**参数：**
- `m`: 法术机制对象
- `s`: 目标单位

**返回值：**
- `true`: 单位可以被克隆
- `false`: 单位不能被克隆

**检查条件：**
- 单位的生物等级不能超过 `maxTier`
- 通过基类的其他免疫检查

### isValidTarget

```cpp
bool isValidTarget(const Mechanics * m, const battle::Unit * s) const override;
```

检查目标单位是否为有效的克隆目标。

**参数：**
- `m`: 法术机制对象
- `s`: 目标单位

**返回值：**
- `true`: 单位是有效的克隆目标
- `false`: 单位不是有效的克隆目标

**检查条件：**
- 不能克隆已经被克隆的单位（`isClone() == false`）
- 不能克隆已有活克隆体的单位（`hasClone() == false`）
- 通过基类的其他有效性检查

### serializeJsonUnitEffect

```cpp
void serializeJsonUnitEffect(JsonSerializeFormat & handler) override final;
```

序列化克隆效果的特定配置到 JSON 格式。

**序列化字段：**
- `maxTier`: 最大允许克隆的生物等级

## 私有成员

### maxTier

```cpp
int maxTier = 0;
```

最大允许克隆的生物等级。等级高于此值的单位不能被克隆。

## 克隆机制详解

### 克隆体属性

克隆体具有以下特性：

- **完全复制**: 克隆体具有与原单位相同的数量、类型和当前状态
- **独立单位**: 克隆体是战场上的独立单位，有自己的ID和位置
- **召唤单位**: 克隆体被标记为召唤单位（`summoned = true`）
- **克隆标记**: 克隆体被标记为克隆（`cloned = true`）

### 克隆关系

- **原单位引用**: 原单位存储克隆体的ID（`cloneID`）
- **唯一性限制**: 一个单位只能有一个活的克隆体
- **克隆限制**: 克隆体不能被再次克隆

### 生命周期管理

克隆体的持续时间通过 `Bonus` 系统管理：

```cpp
Bonus lifeTimeMarker(BonusDuration::N_TURNS, BonusType::NONE, BonusSource::SPELL_EFFECT, 0, BonusSourceID(SpellID(SpellID::CLONE)));
lifeTimeMarker.turnsRemain = m->getEffectDuration();
```

## 使用示例

### 基础克隆法术
```cpp
// 创建基础克隆效果
Clone cloneEffect;
cloneEffect.maxTier = 0; // 不限制等级
// 可以克隆任何等级的单位
```

### 等级限制克隆法术
```cpp
// 创建等级限制的克隆效果
Clone cloneEffect;
cloneEffect.maxTier = 4; // 只能克隆4级及以下的单位
```

## 相关类

- `UnitEffect`: 基类，提供单位效果的基本框架
- `Effect`: 效果系统的根基类
- `BattleUnitsChanged`: 战斗单位变化数据包
- `SetStackEffect`: 设置单位效果数据包
- `battle::UnitInfo`: 战斗单位信息结构体
- `Bonus`: 奖励系统，用于管理克隆体的生命周期

## 注意事项

- 克隆体是完全独立的战斗单位
- 一个单位只能同时存在一个克隆体
- 克隆体不能被再次克隆
- 支持按生物等级限制克隆目标
- 克隆体的持续时间由法术效果持续时间决定
- 克隆失败时会寻找可用的战斗位置
- 如果没有可用位置，整个克隆效果会失败