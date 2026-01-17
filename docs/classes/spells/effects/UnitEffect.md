<!-- 来源: E:\develop\heroes\vcmi\lib\spells\effects\UnitEffect.h -->
# UnitEffect类

UnitEffect类是VCMI法术效果系统中针对战斗单位的基类，提供了单位相关的法术效果实现框架。

## 类定义

```cpp
class UnitEffect : public Effect
```

## 概述

UnitEffect继承自Effect类，专门处理影响战斗单位的法术效果，如伤害、治疗、状态变化等。它提供了完整的单位选择、过滤和效果应用机制。

## 嵌套结构体

### SpellEffectValue
描述法术对单位生命值和数量的影响：

```cpp
struct SpellEffectValue
{
    int64_t hpDelta = 0;        // 生命值变化，正数为治疗，负数为伤害
    int64_t unitsDelta = 0;     // 单位数量变化，正数为复活/召唤，负数为击杀
    CreatureID unitType = CreatureID::NONE; // 生物类型（用于召唤/复活等）

    SpellEffectValue & operator+=(const SpellEffectValue & rhs) noexcept;
};
```

## 成员变量

### 链式效果参数
```cpp
int32_t chainLength = 0;    // 链式效果长度
double chainFactor = 0.0;   // 链式效果衰减因子
```

### 私有变量
```cpp
bool ignoreImmunity = false; // 是否忽略免疫
```

## 主要方法

### 目标类型调整
```cpp
void adjustTargetTypes(std::vector<TargetType> & types) const override;
```
调整可选择的目标类型，通常设置为单位类型。

### 影响区域调整
```cpp
void adjustAffectedHexes(
    BattleHexArray & hexes,
    const Mechanics * m,
    const Target & spellTarget) const override;
```
根据目标单位调整受影响的战斗格子。

### 适用性检查
```cpp
bool applicable(Problem & problem, const Mechanics * m) const override;
bool applicable(Problem & problem, const Mechanics * m, const EffectTarget & target) const override;
```
检查法术是否适用于当前情况或特定目标。

### 目标过滤和转换
```cpp
EffectTarget filterTarget(const Mechanics * m, const EffectTarget & target) const override;
EffectTarget transformTarget(const Mechanics * m, const Target & aimPoint, const Target & spellTarget) const override;
```
过滤和转换目标单位列表。

### 单位过滤器
```cpp
bool getStackFilter(const Mechanics * m, bool alwaysSmart, const battle::Unit * s) const;
```
获取单位过滤条件，用于选择有效的目标单位。

### 免疫过滤
```cpp
virtual bool eraseByImmunityFilter(const Mechanics * m, const battle::Unit * s) const;
```
检查单位是否因免疫而被排除。

### 生命值变化计算
```cpp
virtual SpellEffectValue getHealthChange(const Mechanics * m, const EffectTarget & spellTarget) const;
```
计算法术对目标造成的生命值变化。

## 保护方法

### 单位验证
```cpp
virtual bool isReceptive(const Mechanics * m, const battle::Unit * unit) const;
virtual bool isSmartTarget(const Mechanics * m, const battle::Unit * unit, bool alwaysSmart) const;
virtual bool isValidTarget(const Mechanics * m, const battle::Unit * unit) const;
```
验证单位是否为有效的法术目标。

### 序列化
```cpp
void serializeJsonEffect(JsonSerializeFormat & handler) override final;
virtual void serializeJsonUnitEffect(JsonSerializeFormat & handler) = 0;
```
序列化法术效果配置。

## 私有方法

### 目标转换辅助
```cpp
EffectTarget transformTargetByRange(const Mechanics * m, const Target & aimPoint, const Target & spellTarget) const;
EffectTarget transformTargetByChain(const Mechanics * m, const Target & aimPoint, const Target & spellTarget) const;
```
按范围和链式规则转换目标。

## 继承关系

```
UnitEffect
    └── Effect
        └── IEffect
```

## 子类示例

- **Timed**: 时间限制的效果
- **Damage**: 伤害效果
- **Heal**: 治疗效果
- **Summon**: 召唤效果

## 目标选择机制

UnitEffect实现了复杂的目标选择逻辑：
1. **范围选择**: 根据法术范围选择单位
2. **智能过滤**: 区分友方和敌方单位
3. **免疫检查**: 排除免疫的单位
4. **链式扩展**: 支持链式打击效果

## 使用场景

UnitEffect是战斗法术效果的基础类，用于：
- 直接伤害或治疗
- 状态效果应用
- 单位召唤或复活
- 特殊效果实现

## 注意事项

- 子类必须实现`serializeJsonUnitEffect`方法
- 目标验证逻辑可以被子类重写
- 链式效果需要正确配置衰减因子
- 免疫检查默认启用，可以通过配置忽略