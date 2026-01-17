# Dispel

## 概述

`Dispel` 类是 VCMI 法术效果系统中用于处理驱散效果的核心类。它继承自 `UnitEffect`，专门负责移除目标单位身上的法术效果，包括正面效果、负面效果或中性效果。

## 继承关系

```cpp
Effect
└── UnitEffect
    └── Dispel
```

## 公共方法

### apply

```cpp
void apply(ServerCallback * server, const Mechanics * m, const EffectTarget & target) const override;
```

应用驱散效果到指定的目标单位。

**参数：**
- `server`: 服务器回调接口，用于应用战斗状态变化
- `m`: 法术机制对象，包含法术效果的上下文信息
- `target`: 效果目标列表，包含所有受影响的单位

**实现逻辑：**

1. **遍历目标单位**:
   - 对每个目标单位获取可驱散的法术效果

2. **生成战斗日志** (仅驱散正面效果时):
   - 为"驱散有益法术"生成特殊描述文本

3. **移除效果**:
   - 创建 `SetStackEffect` 数据包
   - 将所有符合条件的法术效果添加到移除列表

4. **应用变化**:
   - 发送效果移除数据包
   - 发送战斗日志消息

## 保护方法

### isValidTarget

```cpp
bool isValidTarget(const Mechanics * m, const battle::Unit * unit) const override;
```

检查目标单位是否能接收驱散效果。

**参数：**
- `m`: 法术机制对象
- `unit`: 目标单位

**返回值：**
- `true`: 单位有可驱散的效果
- `false`: 单位没有可驱散的效果

**验证逻辑：**
- 检查单位是否有符合驱散条件的法术效果
- 如果没有可驱散的效果，则目标无效

### serializeJsonUnitEffect

```cpp
void serializeJsonUnitEffect(JsonSerializeFormat & handler) override final;
```

序列化驱散效果的特定配置到 JSON 格式。

**序列化字段：**
- `dispelPositive`: 是否驱散正面效果
- `dispelNegative`: 是否驱散负面效果
- `dispelNeutral`: 是否驱散中性效果

## 私有方法

### getBonuses

```cpp
std::shared_ptr<const BonusList> getBonuses(const Mechanics * m, const battle::Unit * unit) const;
```

获取目标单位身上符合驱散条件的法术效果列表。

**参数：**
- `m`: 法术机制对象
- `unit`: 目标单位

**返回值：**
- 符合条件的法术效果列表

**筛选条件：**

1. **来源检查**:
   - 仅处理 `BonusSource::SPELL_EFFECT` 来源的效果

2. **特殊豁免效果**:
   - **DISRUPTING_RAY** (破坏射线): 免疫驱散
   - **ACID_BREATH_DEFENSE** (酸液吐息防御): 免疫驱散
   - **CLONE** (克隆): 克隆生命周期标记，免疫驱散

3. **冒险法术效果**:
   - 继承的冒险法术效果不被驱散

4. **自身法术效果**:
   - 当前施放的法术效果不被驱散

5. **效果类型筛选**:
   - 根据 `positive`、`negative`、`neutral` 标志筛选相应类型的效果

## 私有成员

### positive

```cpp
bool positive = false;
```

是否驱散正面法术效果（如祝福、护盾等有益效果）。

### negative

```cpp
bool negative = false;
```

是否驱散负面法术效果（如诅咒、中毒等有害效果）。

### neutral

```cpp
bool neutral = false;
```

是否驱散中性法术效果（如某些状态效果，其正面/负面属性不确定）。

## 驱散逻辑详解

### 效果类型判断

法术效果的正面/负面属性通过 `Spell::getPositiveness()` 方法确定：

- **正面效果** (`positiveness = true`): 祝福、加速、护盾等
- **负面效果** (`positiveness = false`): 诅咒、减速、虚弱等
- **中性效果** (`positiveness = indeterminate`): 某些特殊状态

### 特殊豁免规则

某些核心机制效果被设计为免疫驱散：

1. **破坏射线**: 作为永久削弱效果，不应被轻易移除
2. **酸液吐息防御**: 作为怪物固有能力，不应被驱散
3. **克隆标记**: 克隆体的生命周期管理标记，必须保持

## 使用示例

### 驱散负面效果
```cpp
// 创建驱散负面效果的法术
Dispel dispelEffect;
dispelEffect.positive = false;
dispelEffect.negative = true;   // 驱散负面效果
dispelEffect.neutral = false;
// 移除诅咒、减速等负面状态
```

### 驱散正面效果
```cpp
// 创建驱散正面效果的法术（反制祝福）
Dispel dispelEffect;
dispelEffect.positive = true;   // 驱散正面效果
dispelEffect.negative = false;
dispelEffect.neutral = false;
// 移除祝福、加速等正面状态
```

### 全面驱散
```cpp
// 创建全面驱散法术
Dispel dispelEffect;
dispelEffect.positive = true;   // 驱散正面效果
dispelEffect.negative = true;   // 驱散负面效果
dispelEffect.neutral = true;    // 驱散中性效果
// 移除所有类型的法术效果
```

### 驱散有益法术
```cpp
// 专门驱散正面效果（会生成特殊战斗日志）
Dispel dispelEffect;
dispelEffect.positive = true;
dispelEffect.negative = false;
dispelEffect.neutral = false;
// 生成"dispels helpful spells"消息
```

## 相关类

- `UnitEffect`: 基类，提供单位效果的基本框架
- `Effect`: 效果系统的根基类
- `BonusList`: 奖励效果列表
- `CSelector`: 奖励效果选择器
- `SetStackEffect`: 设置单位效果数据包
- `BattleLogMessage`: 战斗日志消息

## 注意事项

- 驱散效果只影响通过法术施加的效果，不影响装备、技能等其他来源的效果
- 某些核心机制效果（如克隆标记）被设计为免疫驱散
- 驱散正面效果时会生成特殊的战斗日志消息
- 支持灵活配置，可选择驱散特定类型的效果
- 不会驱散当前正在施放的法术效果（防止自驱散）
- 冒险法术的继承效果不会被战斗驱散影响