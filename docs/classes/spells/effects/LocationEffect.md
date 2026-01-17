# LocationEffect

## 概述

`LocationEffect` 类是 VCMI 法术效果系统中位置相关效果的基类。它继承自 `Effect`，为所有基于位置的效果（如投石机、地震、位置障碍等）提供通用的目标处理和坐标转换机制。

## 继承关系

```cpp
Effect
└── LocationEffect
    ├── Catapult
    └── 其他位置效果类
```

## 公共方法

### adjustTargetTypes

```cpp
void adjustTargetTypes(std::vector<TargetType> & types) const override;
```

调整目标类型。位置效果基类不进行特定的目标类型调整。

**参数：**
- `types`: 目标类型向量（保持不变）

### adjustAffectedHexes

```cpp
void adjustAffectedHexes(BattleHexArray & hexes, const Mechanics * m, const Target & spellTarget) const override;
```

调整受影响的六角格，将法术目标中的所有位置添加到受影响的六角格列表中。

**参数：**
- `hexes`: 受影响的六角格数组
- `m`: 法术机制对象
- `spellTarget`: 法术目标

**实现逻辑：**
- 遍历法术目标中的所有目标
- 将每个目标的位置（`hexValue`）添加到受影响的六角格集合中

### filterTarget

```cpp
EffectTarget filterTarget(const Mechanics * m, const EffectTarget & target) const override;
```

过滤目标，只保留有效的纯位置目标（不包含单位的六角格）。

**参数：**
- `m`: 法术机制对象
- `target`: 原始目标列表

**返回值：**
- 过滤后的目标列表，只包含有效的位置目标

**过滤条件：**
- 目标不能包含单位（`!d.unitValue`）
- 目标位置必须有效（`d.hexValue.isValid()`）

### transformTarget

```cpp
EffectTarget transformTarget(const Mechanics * m, const Target & aimPoint, const Target & spellTarget) const override;
```

转换目标，默认情况下效果目标与法术目标完全一致。

**参数：**
- `m`: 法术机制对象
- `aimPoint`: 瞄准点
- `spellTarget`: 法术目标

**返回值：**
- 转换后的效果目标（默认与法术目标相同）

**实现细节：**
- 直接将法术目标转换为效果目标
- 子类可以重写此方法以实现特定的目标转换逻辑

## 设计意图

`LocationEffect` 作为位置相关效果的基类，提供了：

1. **目标验证**: 确保目标是有效的战场位置
2. **坐标管理**: 自动收集所有受影响的六角格
3. **类型安全**: 过滤掉包含单位的无效位置目标
4. **扩展性**: 为子类提供标准的目标处理框架

## 继承的使用模式

位置效果的典型继承模式：

```cpp
class SpecificLocationEffect : public LocationEffect
{
public:
    void apply(ServerCallback * server, const Mechanics * m, const EffectTarget & target) const override
    {
        // 实现特定的位置效果逻辑
        // 可以使用 filterTarget() 确保只处理位置目标
        // 可以使用 adjustAffectedHexes() 获取所有受影响的位置
    }

    // 可选重写其他方法以自定义行为
    EffectTarget transformTarget(const Mechanics * m, const Target & aimPoint, const Target & spellTarget) const override
    {
        // 自定义目标转换逻辑
    }
};
```

## 相关类

- `Effect`: 效果系统的根基类
- `Catapult`: 投石机效果，继承自 LocationEffect
- `BattleHexArray`: 战场六角格数组
- `Target`: 法术目标
- `EffectTarget`: 效果目标

## 注意事项

- 专门用于处理基于位置的效果，不涉及单位操作
- 自动过滤无效的位置目标，确保类型安全
- 默认情况下效果范围与法术范围完全一致
- 子类可以通过重写方法来自定义目标处理逻辑
- 提供标准的坐标收集机制，便于范围效果的实现