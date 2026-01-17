# Effects

## 概述

`Effects` 类是 VCMI 法术效果系统的核心管理器，负责组织和管理不同法术等级下的各种效果实例。它提供了一个分层的数据结构来存储效果，并实现了效果的添加、验证、准备和序列化功能。

## 继承关系

```
Effects
```

## 公共类型定义

### EffectsToApply
```cpp
using EffectsToApply = std::vector<std::pair<const Effect *, EffectTarget>>;
```
存储待应用效果及其目标的配对列表。

### EffectsMap
```cpp
using EffectsMap = std::map<std::string, std::shared_ptr<Effect>>;
```
以字符串名称为键，效果智能指针为值的映射表。

### EffectData
```cpp
using EffectData = std::array<EffectsMap, GameConstants::SPELL_SCHOOL_LEVELS>;
```
按法术等级组织的二维数组结构，每个等级包含一个效果映射表。

## 公共成员变量

### data
```cpp
EffectData data;
```
存储所有注册效果的核心数据结构，按法术等级索引。

## 公共方法

### 析构函数
```cpp
virtual ~Effects() = default;
```
虚析构函数，支持多态删除。

### add
```cpp
void add(const std::string & name, const std::shared_ptr<Effect>& effect, const int level);
```

添加一个效果到指定等级。

**参数：**
- `name`: 效果的唯一标识符名称
- `effect`: 效果实例的智能指针
- `level`: 法术等级 (0-4，对应1-5级法术)

### applicable (重载1)
```cpp
bool applicable(Problem & problem, const Mechanics * m) const;
```

检查效果是否适用于给定的法术机制。

**参数：**
- `problem`: 用于存储验证问题的输出参数
- `m`: 法术机制实例

**返回值：** 如果效果适用返回 true，否则返回 false

### applicable (重载2)
```cpp
bool applicable(Problem & problem, const Mechanics * m, const Target & aimPoint, const Target & spellTarget) const;
```

检查效果是否适用于特定的瞄准点和法术目标。

**参数：**
- `problem`: 用于存储验证问题的输出参数
- `m`: 法术机制实例
- `aimPoint`: 瞄准点目标
- `spellTarget`: 法术目标

**返回值：** 如果效果适用返回 true，否则返回 false

### forEachEffect
```cpp
void forEachEffect(const int level, const std::function<void(const Effect *, bool &)> & callback) const;
```

遍历指定等级的所有效果并执行回调函数。

**参数：**
- `level`: 要遍历的法术等级
- `callback`: 回调函数，接收效果指针和停止标志引用

### prepare
```cpp
EffectsToApply prepare(const Mechanics * m, const Target & aimPoint, const Target & spellTarget) const;
```

准备要应用的效果列表。

**参数：**
- `m`: 法术机制实例
- `aimPoint`: 瞄准点目标
- `spellTarget`: 法术目标

**返回值：** 包含效果和对应目标的配对列表

### serializeJson
```cpp
void serializeJson(const Registry * registry, JsonSerializeFormat & handler, const int level);
```

将指定等级的效果序列化为 JSON 格式。

**参数：**
- `registry`: 效果注册表，用于类型解析
- `handler`: JSON 序列化处理器
- `level`: 要序列化的法术等级

## 使用示例

### 基本使用
```cpp
// 创建效果管理器
spells::effects::Effects effects;

// 添加不同等级的效果
auto damageEffect = std::make_shared<Damage>();
effects.add("damage", damageEffect, 0); // 1级法术

auto healEffect = std::make_shared<Heal>();
effects.add("heal", healEffect, 1); // 2级法术
```

### 效果验证
```cpp
Problem problem;
Mechanics mechanics(/*...*/);
Target aimPoint(/*...*/);
Target spellTarget(/*...*/);

if (effects.applicable(problem, &mechanics, aimPoint, spellTarget)) {
    // 效果适用，可以继续处理
    auto effectsToApply = effects.prepare(&mechanics, aimPoint, spellTarget);
    // 应用效果...
}
```

### 遍历效果
```cpp
effects.forEachEffect(0, [](const Effect* effect, bool& stop) {
    std::cout << "Found effect: " << effect->getName() << std::endl;
    // 可以设置 stop = true 来提前终止遍历
});
```

## 相关类

- `Effect`: 基础效果类
- `Registry`: 效果注册表
- `Mechanics`: 法术机制
- `Target`: 目标定义
- `Problem`: 问题报告