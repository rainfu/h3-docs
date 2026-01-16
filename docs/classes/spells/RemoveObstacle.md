# RemoveObstacle

## 概述

`RemoveObstacle` 类是 VCMI 法术效果系统中用于处理移除障碍物效果的核心类。它继承自 `LocationEffect`，专门负责清除战场上的各种障碍物，包括法术创建的障碍物、自然障碍物和绝对障碍物。

## 继承关系

```cpp
Effect
└── LocationEffect
    └── RemoveObstacle
```

## 公共方法

### applicable (重载1)

```cpp
bool applicable(Problem & problem, const Mechanics * m) const override;
```

检查移除障碍物效果是否可以应用（无目标版本，用于大规模法术）。

**参数：**
- `problem`: 问题描述对象
- `m`: 法术机制对象

**返回值：**
- `true`: 存在可移除的障碍物
- `false`: 没有可移除的障碍物

**检查逻辑：**
- 获取所有可能的移除目标
- 如果没有目标，返回"无合适目标"错误

### applicable (重载2)

```cpp
bool applicable(Problem & problem, const Mechanics * m, const EffectTarget & target) const override;
```

检查移除障碍物效果是否可以应用到指定目标。

**参数：**
- `problem`: 问题描述对象
- `m`: 法术机制对象
- `target`: 效果目标列表

**返回值：**
- `true`: 指定位置有可移除的障碍物
- `false`: 指定位置没有可移除的障碍物

### apply

```cpp
void apply(ServerCallback * server, const Mechanics * m, const EffectTarget & target) const override;
```

应用移除障碍物效果。

**参数：**
- `server`: 服务器回调接口
- `m`: 法术机制对象
- `target`: 效果目标列表

**实现逻辑：**

1. **获取目标障碍物**:
   - 根据法术类型（大规模或精确）获取可移除的障碍物

2. **创建移除数据包**:
   - 为每个要移除的障碍物创建 `BattleChanges::EOperation::REMOVE` 操作

3. **应用变化**:
   - 发送障碍物变化数据包到客户端

## 保护方法

### serializeJsonEffect

```cpp
void serializeJsonEffect(JsonSerializeFormat & handler) override;
```

序列化移除障碍物效果的配置到 JSON 格式。

**序列化字段：**
- `removeAbsolute`: 是否移除绝对障碍物
- `removeUsual`: 是否移除普通障碍物
- `removeAllSpells`: 是否移除所有法术创建的障碍物
- `removeSpells`: 要移除的特定法术ID列表

## 私有方法

### canRemove

```cpp
bool canRemove(const CObstacleInstance * obstacle) const;
```

检查指定的障碍物是否可以被移除。

**参数：**
- `obstacle`: 要检查的障碍物实例

**返回值：**
- `true`: 可以移除该障碍物
- `false`: 不能移除该障碍物

**移除条件：**

1. **绝对障碍物**:
   - 如果 `removeAbsolute = true` 且障碍物类型为 `ABSOLUTE_OBSTACLE`

2. **普通障碍物**:
   - 如果 `removeUsual = true` 且障碍物类型为 `USUAL`

3. **法术障碍物**:
   - 如果 `removeAllSpells = true` 且障碍物类型为 `SPELL_CREATED`
   - 或者障碍物的法术ID在 `removeSpells` 列表中

### getTargets

```cpp
std::set<const CObstacleInstance *> getTargets(const Mechanics * m, const EffectTarget & target, bool alwaysMassive) const;
```

获取可以移除的障碍物目标列表。

**参数：**
- `m`: 法术机制对象
- `target`: 效果目标列表
- `alwaysMassive`: 是否强制使用大规模模式

**返回值：**
- 可移除障碍物的集合

**目标获取逻辑：**

1. **大规模模式** (`isMassive() || alwaysMassive`):
   - 获取战场上所有障碍物
   - 筛选出可以移除的障碍物

2. **精确模式**:
   - 对每个目标位置获取该位置的所有障碍物
   - 筛选出可以移除的障碍物

## 私有成员

### removeAbsolute

```cpp
bool removeAbsolute = false;
```

是否可以移除绝对障碍物（如城墙、不可摧毁的地形）。

### removeUsual

```cpp
bool removeUsual = false;
```

是否可以移除普通障碍物（如岩石、树木等自然障碍物）。

### removeAllSpells

```cpp
bool removeAllSpells = false;
```

是否可以移除所有法术创建的障碍物。

### removeSpells

```cpp
std::set<SpellID> removeSpells;
```

可以移除的特定法术ID列表。只有这些法术创建的障碍物会被移除。

## 移除机制详解

### 障碍物类型

系统支持三种主要障碍物类型：

1. **绝对障碍物** (`ABSOLUTE_OBSTACLE`):
   - 不可摧毁的固定障碍物
   - 如城墙、不可破坏的地形

2. **普通障碍物** (`USUAL`):
   - 可以被摧毁的自然障碍物
   - 如岩石、树木、残骸

3. **法术障碍物** (`SPELL_CREATED`):
   - 由法术创建的临时障碍物
   - 如火墙、地雷、藤蔓

### 移除模式

#### 大规模移除
- 移除战场上所有符合条件的障碍物
- 适用于清理型法术

#### 精确移除
- 只移除指定位置的障碍物
- 适用于瞄准型法术

### 选择性移除

可以通过配置实现精确的障碍物选择：

- **类型选择**: 选择要移除的障碍物类型
- **法术选择**: 选择要移除的特定法术障碍物
- **全面移除**: 移除所有类型的障碍物

## 使用示例

### 移除法术障碍物
```cpp
// 配置移除火墙和地雷的效果
RemoveObstacle removeEffect;
removeEffect.removeAllSpells = false;  // 不移除所有法术障碍物
removeEffect.removeSpells = {SpellID::FIRE_WALL, SpellID::LAND_MINE};
// 只移除火墙和地雷
```

### 全面清理
```cpp
// 配置全面清理障碍物的效果
RemoveObstacle clearEffect;
removeEffect.removeAbsolute = true;    // 移除绝对障碍物
removeEffect.removeUsual = true;       // 移除普通障碍物
removeEffect.removeAllSpells = true;   // 移除所有法术障碍物
// 移除所有类型的障碍物
```

### 选择性移除
```cpp
// 配置只移除普通障碍物的效果
RemoveObstacle selectiveEffect;
selectiveEffect.removeUsual = true;    // 只移除普通障碍物
// 保留绝对和法术障碍物
```

## 相关类

- `LocationEffect`: 位置效果基类
- `Effect`: 效果系统的根基类
- `CObstacleInstance`: 障碍物实例
- `SpellCreatedObstacle`: 法术创建的障碍物
- `BattleObstaclesChanged`: 战场障碍物变化数据包
- `BattleChanges`: 战斗变化枚举

## 注意事项

- 支持三种障碍物类型的选择性移除
- 可以配置为大规模或精确移除模式
- 支持移除特定法术创建的障碍物
- 自动验证目标的有效性
- 移除操作会立即同步到所有客户端
- 不会影响非障碍物对象（如单位、城墙状态）