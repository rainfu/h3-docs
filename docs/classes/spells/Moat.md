# Moat

## 概述

`Moat` 类是 VCMI 法术效果系统中用于处理护城河效果的核心类。它继承自 `Obstacle`，专门负责在攻城战中创建护城河障碍，为防御方提供战略优势，包括阻挡敌方单位、造成伤害和提供战场加成。

## 继承关系

```cpp
Effect
└── LocationEffect
    └── Obstacle
        └── Moat
```

## 公共方法

### apply

```cpp
void apply(ServerCallback * server, const Mechanics * m, const EffectTarget & target) const override;
```

应用护城河效果。

**参数：**
- `server`: 服务器回调接口
- `m`: 法术机制对象
- `target`: 效果目标列表

**实现条件：**
- 必须是大范围法术（`isMassive()`）
- 必须在攻城战中且城镇有护城河

**实现逻辑：**

1. **放置障碍物**:
   - 调用 `placeObstacles()` 在战场上创建护城河

2. **应用战场加成**:
   - 转换护城河的奖励效果
   - 为防御方单位提供战场范围的加成

## 保护方法

### serializeJsonEffect

```cpp
void serializeJsonEffect(JsonSerializeFormat & handler) override;
```

序列化护城河效果的配置到 JSON 格式。

**序列化字段：**
- `hidden`: 是否隐藏护城河
- `trap`: 是否为陷阱
- `removeOnTrigger`: 触发后是否移除
- `dispellable`: 是否可以被驱散
- `moatDamage`: 最小护城河伤害
- `moatHexes`: 护城河占据的六角格数组
- `triggerAbility`: 触发时的法术能力
- `defender`: 防御方选项（仅防御方可用）
- `bonus`: 护城河提供的战场加成

### placeObstacles

```cpp
void placeObstacles(ServerCallback * server, const Mechanics * m, const EffectTarget & target) const override;
```

在战场上放置护城河障碍物。

**参数：**
- `server`: 服务器回调接口
- `m`: 法术机制对象
- `target`: 效果目标列表

**实现逻辑：**

1. **验证条件**:
   - 确保在攻城战中
   - 确保施法者为防御方

2. **创建障碍物**:
   - 为每个护城河区域创建 `SpellCreatedObstacle`
   - 设置障碍物属性和视觉效果

3. **障碍物属性**:
   - 类型：可驱散或固定护城河
   - 永久存在（`turnsRemaining = -1`）
   - 可通行（`passable = true`）
   - 不可见于本土地形（`nativeVisible = false`）

### convertBonus

```cpp
void convertBonus(const Mechanics * m, std::vector<Bonus> & converted) const;
```

转换护城河的奖励效果为战场加成。

**参数：**
- `m`: 法术机制对象
- `converted`: 转换后的奖励列表

**转换逻辑：**

1. **设置持续时间**:
   - 护城河效果在战斗中永久有效

2. **设置来源**:
   - 如果城镇有城堡，使用城堡建筑作为来源
   - 否则使用法术作为来源

3. **设置限制器**:
   - 使用 `UnitOnHexLimiter` 限制效果只在护城河区域生效

## 私有成员

### sideOptions

```cpp
ObstacleSideOptions sideOptions;
```

防御方的障碍物选项，仅防御方可用。

### moatHexes

```cpp
std::vector<BattleHexArray> moatHexes;
```

护城河占据的六角格数组，确定护城河的形状和位置。

### bonus

```cpp
std::vector<std::shared_ptr<Bonus>> bonus;
```

护城河提供的战场加成列表。

### dispellable

```cpp
bool dispellable;
```

护城河是否可以被驱散。对于塔楼地雷等特殊效果为 true。

### moatDamage

```cpp
int moatDamage;
```

护城河造成的最小伤害值。

## 护城河机制详解

### 障碍物类型

护城河可以创建两种类型的障碍物：

1. **固定护城河** (`CObstacleInstance::MOAT`):
   - 无法被驱散的永久障碍物
   - 作为城镇防御工事的一部分

2. **可驱散护城河** (`CObstacleInstance::SPELL_CREATED`):
   - 可以通过驱散法术移除
   - 用于塔楼地雷等法术效果

### 战场加成

护城河可以为防御方提供各种战场加成：

- **移动限制**: 阻挡敌方单位的通行
- **伤害陷阱**: 敌方单位进入时受到伤害
- **战术优势**: 为防御方创造有利地形
- **法术加成**: 特定位置的法术效果增强

### 触发机制

护城河可以配置触发机制：

- **陷阱触发**: 敌方单位进入时自动触发效果
- **法术触发**: 触发特定的法术能力
- **一次性触发**: 触发后自动移除（`removeOnTrigger`）

## 使用示例

### 标准护城河
```cpp
// 配置标准护城河效果
Moat moatEffect;
moatEffect.moatDamage = 10;        // 最小伤害10
moatEffect.dispellable = false;    // 无法驱散
moatEffect.hidden = false;         // 可见护城河
// moatHexes 定义护城河形状
// bonus 定义战场加成
```

### 可驱散护城河（塔楼地雷）
```cpp
// 配置塔楼地雷效果
Moat landmineEffect;
landmineEffect.moatDamage = 25;    // 高伤害
landmineEffect.dispellable = true; // 可以驱散
landmineEffect.trap = true;        // 陷阱机制
landmineEffect.removeOnTrigger = true; // 触发后移除
```

## 相关类

- `Obstacle`: 障碍物效果基类
- `LocationEffect`: 位置效果基类
- `Effect`: 效果系统的根基类
- `ObstacleSideOptions`: 障碍物选项配置
- `SpellCreatedObstacle`: 法术创建的障碍物
- `GiveBonus`: 给予奖励数据包
- `UnitOnHexLimiter`: 六角格限制器

## 注意事项

- 只能在攻城战中使用，且必须有防御城镇
- 护城河始终由防御方施放
- 永久存在于战场中，无法自然消失
- 可通行但会触发伤害和效果
- 支持复杂的战场加成系统
- 可以配置为可驱散或永久障碍物
- 自动处理障碍物的视觉和音效表现