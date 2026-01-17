# Teleport

## 概述

`Teleport` 类是 VCMI 法术效果系统中用于处理传送效果的核心类。它继承自 `UnitEffect`，专门负责将战斗中的单位传送到指定的位置，包括处理城墙、护城河等障碍物的通行性。

## 继承关系

```cpp
Effect
└── UnitEffect
    └── Teleport
```

## 公共方法

### adjustTargetTypes

```cpp
void adjustTargetTypes(std::vector<TargetType> & types) const override;
```

调整目标类型，确保传送法术的目标格式正确。

**参数：**
- `types`: 目标类型向量

**目标格式要求：**
- 第一个目标必须是 `CREATURE`（要传送的单位）
- 如果只有一个目标，添加 `LOCATION` 作为第二个目标（传送目的地）
- 如果有多个目标，第二个目标必须是 `LOCATION`

### applicable

```cpp
bool applicable(Problem & problem, const Mechanics * m, const EffectTarget & target) const override;
```

检查传送效果是否可以应用到指定的目标。

**参数：**
- `problem`: 问题描述对象，用于存储错误信息
- `m`: 法术机制对象
- `target`: 效果目标列表

**返回值：**
- `true`: 可以应用传送效果
- `false`: 不能应用传送效果

**检查条件：**

1. **目标数量检查**:
   - 必须有且只有2个目标（单位 + 位置）

2. **单位有效性检查**:
   - 第一个目标必须是有效的单位

3. **位置有效性检查**:
   - 目的地必须是有效的六角格
   - 目的地必须对目标单位可访问

4. **障碍物检查** (如果存在城墙):
   - 根据 `isWallPassable` 和 `isMoatPassable` 标志
   - 检查传送路径是否被城墙或护城河阻挡

### apply

```cpp
void apply(ServerCallback * server, const Mechanics * m, const EffectTarget & target) const override;
```

应用传送效果，将单位传送到指定位置。

**参数：**
- `server`: 服务器回调接口
- `m`: 法术机制对象
- `target`: 效果目标列表（单位 + 目的地）

**实现逻辑：**

1. **创建移动数据包**:
   - 设置 `BattleStackMoved` 数据包
   - 标记为传送（`teleporting = true`）
   - 距离设为0（瞬时传送）

2. **应用传送**:
   - 发送数据包到客户端

3. **触发障碍物** (如果 `triggerObstacles = true`):
   - 检查并触发目的地的障碍物效果

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
- 第一个目标：使用基类的单位转换（处理免疫等）
- 第二个目标：直接使用瞄准点的目的地位置

## 保护方法

### serializeJsonUnitEffect

```cpp
void serializeJsonUnitEffect(JsonSerializeFormat & handler) override;
```

序列化传送效果的特定配置到 JSON 格式。

**序列化字段：**
- `triggerObstacles`: 是否触发障碍物效果
- `isWallPassable`: 是否可以穿过城墙
- `isMoatPassable`: 是否可以穿过护城河

## 私有成员

### triggerObstacles

```cpp
bool triggerObstacles;
```

是否在传送后触发目的地的障碍物效果。

### isWallPassable

```cpp
bool isWallPassable;
```

是否可以穿过城墙进行传送。

### isMoatPassable

```cpp
bool isMoatPassable;
```

是否可以穿过护城河进行传送。

## 使用示例

### 基础传送法术
```cpp
// 创建基础传送效果
Teleport teleportEffect;
teleportEffect.triggerObstacles = false;
teleportEffect.isWallPassable = false;
teleportEffect.isMoatPassable = false;
// 普通传送，不能穿过障碍物
```

### 高级传送法术
```cpp
// 创建可以穿过障碍物的传送效果
Teleport teleportEffect;
teleportEffect.triggerObstacles = true;   // 传送后触发障碍物
teleportEffect.isWallPassable = true;     // 可以穿过城墙
teleportEffect.isMoatPassable = true;     // 可以穿过护城河
```

### 城墙传送法术
```cpp
// 创建只能穿过城墙的传送效果
Teleport teleportEffect;
teleportEffect.triggerObstacles = false;
teleportEffect.isWallPassable = true;     // 可以穿过城墙
teleportEffect.isMoatPassable = false;    // 不能穿过护城河
```

## 目标格式

传送法术需要两个目标：

1. **第一个目标**: 要传送的单位（`CREATURE` 类型）
2. **第二个目标**: 传送目的地（`LOCATION` 类型）

```cpp
// 法术目标格式
Target spellTarget = {
    unitToTeleport,    // 要传送的单位
    destinationHex     // 目的地六角格
};
```

## 相关类

- `UnitEffect`: 基类，提供单位效果的基本框架
- `Effect`: 效果系统的根基类
- `BattleStackMoved`: 战斗单位移动数据包
- `SpellCastEnvironment`: 法术施放环境接口
- `TownFortifications`: 城镇防御工事

## 注意事项

- 传送是瞬时的，不消耗移动点
- 支持穿过城墙和护城河的配置选项
- 可以选择是否在传送后触发障碍物效果
- 目的地必须对目标单位可访问
- 如果存在城墙，会检查传送路径是否被阻挡
- 传送效果会发送专门的移动数据包，客户端会显示传送动画