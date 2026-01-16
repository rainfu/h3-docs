# Obstacle

## 概述

`Obstacle` 类是 VCMI 法术效果系统中用于处理障碍物效果的基类。它继承自 `LocationEffect`，为各种战场障碍物（如火墙、地雷、藤蔓等）提供通用的创建、配置和管理机制。

## 继承关系

```cpp
Effect
└── LocationEffect
    └── Obstacle
        ├── Moat
        └── 其他障碍物效果类
```

## ObstacleSideOptions 结构体

### 成员变量

#### shape

```cpp
RelativeShape shape;
```

单个障碍物的形状，相对于障碍物位置的相对坐标。

#### range

```cpp
RelativeShape range;
```

障碍物位置相对于效果目标的相对坐标。

#### appearSound

```cpp
AudioPath appearSound;
```

障碍物出现时的音效。

#### appearAnimation

```cpp
AnimationPath appearAnimation;
```

障碍物出现时的动画。

#### animation

```cpp
AnimationPath animation;
```

障碍物的持续动画。

#### offsetY

```cpp
int offsetY = 0;
```

动画的Y轴偏移量。

## 公共方法

### adjustAffectedHexes

```cpp
void adjustAffectedHexes(BattleHexArray & hexes, const Mechanics * m, const Target & spellTarget) const override;
```

调整受影响的六角格，根据障碍物的形状计算实际占据的区域。

**参数：**
- `hexes`: 受影响的六角格数组
- `m`: 法术机制对象
- `spellTarget`: 法术目标

**实现逻辑：**
- 获取施法方的障碍物选项
- 对每个目标位置，应用形状变换计算实际占据的六角格
- 将所有计算出的六角格添加到受影响区域

### applicable (重载1)

```cpp
bool applicable(Problem & problem, const Mechanics * m) const override;
```

检查障碍物效果是否可以应用（无目标版本）。

**参数：**
- `problem`: 问题描述对象
- `m`: 法术机制对象

**检查条件：**
- 如果障碍物隐藏且非本地隐藏，且敌方有本地单位，则无法应用

### applicable (重载2)

```cpp
bool applicable(Problem & problem, const Mechanics * m, const EffectTarget & target) const override;
```

检查障碍物效果是否可以应用到指定目标。

**参数：**
- `problem`: 问题描述对象
- `m`: 法术机制对象
- `target`: 效果目标列表

**检查条件（非大规模法术）：**
- 检查目标位置是否需要清空
- 验证障碍物形状范围内的所有六角格是否可用
- 如果没有空间放置，报告错误

### transformTarget

```cpp
EffectTarget transformTarget(const Mechanics * m, const Target & aimPoint, const Target & spellTarget) const override;
```

转换目标，将法术目标转换为障碍物实际放置位置。

**参数：**
- `m`: 法术机制对象
- `aimPoint`: 瞄准点
- `spellTarget`: 法术目标

**返回值：**
- 障碍物实际放置位置的列表

**转换逻辑（非大规模法术）：**
- 对每个法术目标，应用范围形状变换
- 生成障碍物的实际放置坐标

### apply

```cpp
void apply(ServerCallback * server, const Mechanics * m, const EffectTarget & target) const override;
```

应用障碍物效果。

**参数：**
- `server`: 服务器回调接口
- `m`: 法术机制对象
- `target`: 效果目标列表

**实现逻辑：**

1. **随机放置模式** (`patchCount > 0`):
   - 收集所有可用位置
   - 随机选择指定数量的位置
   - 放置障碍物

2. **精确放置模式**:
   - 在指定位置直接放置障碍物

## 保护方法

### serializeJsonEffect

```cpp
void serializeJsonEffect(JsonSerializeFormat & handler) override;
```

序列化障碍物效果的配置到 JSON 格式。

**序列化字段：**
- `hidden`: 是否隐藏障碍物
- `passable`: 是否可以通行
- `trap`: 是否为陷阱
- `removeOnTrigger`: 触发后是否移除
- `hideNative`: 是否对本地单位隐藏
- `patchCount`: 要放置的随机区域数量
- `turnsRemaining`: 剩余回合数（-1表示永久）
- `triggerAbility`: 触发时的法术能力
- `attacker`: 攻击方障碍物选项
- `defender`: 防御方障碍物选项

### placeObstacles

```cpp
virtual void placeObstacles(ServerCallback * server, const Mechanics * m, const EffectTarget & target) const;
```

在战场上放置障碍物。子类可以重写此方法以实现特定的放置逻辑。

**参数：**
- `server`: 服务器回调接口
- `m`: 法术机制对象
- `target`: 障碍物放置位置列表

**实现逻辑：**

1. **获取选项**:
   - 根据施法方获取障碍物选项

2. **创建障碍物**:
   - 为每个目标位置创建 `SpellCreatedObstacle`
   - 设置障碍物的所有属性和效果

3. **应用形状**:
   - 根据形状配置计算障碍物实际占据的区域

## 私有方法

### isHexAvailable

```cpp
static bool isHexAvailable(const CBattleInfoCallback * cb, const BattleHex & hex, const bool mustBeClear);
```

检查指定六角格是否可用作障碍物位置。

**参数：**
- `cb`: 战斗信息回调接口
- `hex`: 要检查的六角格
- `mustBeClear`: 是否必须为空地

**检查条件：**
- 六角格必须有效且可用
- 如果需要清空，则不能有单位或非护城河障碍物
- 城墙位置的特殊处理（不可摧毁部分、塔楼等）

### noRoomToPlace

```cpp
static bool noRoomToPlace(Problem & problem, const Mechanics * m);
```

报告没有空间放置障碍物的错误。

**参数：**
- `problem`: 问题描述对象
- `m`: 法术机制对象

**返回值：**
- 始终返回 false

## 私有成员

### patchCount

```cpp
int32_t patchCount = 0;
```

要放置的随机区域数量。对于大规模法术应 >= 1。

### passable

```cpp
bool passable = false;
```

障碍物是否可以通行。

### turnsRemaining

```cpp
int32_t turnsRemaining = -1;
```

障碍物剩余的回合数。-1 表示永久存在。

### sideOptions

```cpp
BattleSideArray<ObstacleSideOptions> sideOptions;
```

按阵营区分的障碍物选项配置。

### 其他配置标志

```cpp
bool hidden = false;        // 是否隐藏
bool trigger = false;       // 是否有触发机制
bool trap = false;          // 是否为陷阱
bool removeOnTrigger = false; // 触发后移除
bool hideNative = false;    // 对本地单位隐藏
SpellID triggerAbility;     // 触发法术能力
```

## 障碍物机制详解

### 放置模式

#### 精确放置
- 在指定的确切位置放置障碍物
- 适用于瞄准型法术（如火墙）

#### 随机放置
- 在可用位置中随机选择指定数量的位置
- 适用于范围型法术（如地雷）

### 形状系统

障碍物使用相对坐标系统定义形状：

- **shape**: 定义单个障碍物的形状
- **range**: 定义多个障碍物的相对位置

### 触发机制

障碍物可以配置各种触发效果：

- **陷阱触发**: 单位进入时自动触发
- **法术触发**: 触发特定的法术能力
- **一次性**: 触发后自动移除

### 可见性控制

- **hidden**: 完全隐藏，对所有单位不可见
- **hideNative**: 对本地地形单位隐藏
- **nativeVisible**: 对本地单位是否可见

## 使用示例

### 火墙障碍物
```cpp
// 配置火墙效果
Obstacle firewallEffect;
firewallEffect.passable = false;     // 不可通行
firewallEffect.trap = true;          // 陷阱机制
firewallEffect.triggerAbility = SpellID::FIRE_WALL; // 触发火墙伤害
firewallEffect.turnsRemaining = 3;   // 持续3回合
// sideOptions 配置形状和动画
```

### 地雷场
```cpp
// 配置地雷场效果
Obstacle landmineEffect;
landmineEffect.patchCount = 5;       // 放置5个地雷
landmineEffect.hidden = true;        // 隐藏地雷
landmineEffect.trap = true;          // 陷阱触发
landmineEffect.removeOnTrigger = true; // 触发后移除
```

## 相关类

- `LocationEffect`: 位置效果基类
- `Effect`: 效果系统的根基类
- `ObstacleSideOptions`: 障碍物选项配置
- `SpellCreatedObstacle`: 法术创建的障碍物
- `BattleObstaclesChanged`: 战场障碍物变化数据包
- `BattleHexArray`: 战场六角格数组

## 注意事项

- 支持复杂的形状定义和多位置放置
- 可以配置为临时或永久障碍物
- 支持触发机制和陷阱效果
- 自动处理可见性和本地单位隐藏
- 提供精确和随机两种放置模式
- 考虑城墙和防御工事的位置限制
- 支持阵营特定的视觉和音效配置