# IBattleCast接口

IBattleCast接口是VCMI中战斗法术施放的接口，定义了战斗中法术施放所需的基本功能。

## 类定义

```cpp
class DLL_LINKAGE IBattleCast
{
public:
    using Value = int32_t;
    using Value64 = int64_t;

    using OptionalValue = std::optional<Value>;
    using OptionalValue64 = std::optional<Value64>;

    virtual const CSpell * getSpell() const = 0;
    virtual Mode getMode() const = 0;
    virtual const Caster * getCaster() const = 0;
    virtual const CBattleInfoCallback * getBattle() const = 0;

    virtual OptionalValue getSpellLevel() const = 0;

    virtual OptionalValue getEffectPower() const = 0;
    virtual OptionalValue getEffectDuration() const = 0;

    virtual OptionalValue64 getEffectValue() const = 0;

    virtual boost::logic::tribool isSmart() const = 0;
    virtual boost::logic::tribool isMassive() const = 0;
};
```

## 功能说明

IBattleCast是VCMI战斗法术系统中战斗法术施放的接口。它定义了战斗中法术施放所需的基本功能，包括获取法术信息、施法者信息、战斗上下文以及法术效果参数。这个接口为战斗法术的执行提供了统一的访问方式，使得不同类型的法术施放实现可以以一致的方式被调用。

## 依赖关系

- [CSpell](./CSpell.md): 法术类
- [spells::Mode](./Mode.md): 模式枚举
- [spells::Caster](./Caster.md): 施法者接口
- [CBattleInfoCallback](../battle/CBattleInfoCallback.md): 战斗信息回调
- Boost库: tribool
- STL库: optional

## 类型别名说明

- `Value`: 32位整数值类型
- `Value64`: 64位整数值类型
- `OptionalValue`: 可选的32位整数值类型
- `OptionalValue64`: 可选的64位整数值类型

## 函数注释

- `getSpell()`: 获取法术对象的常量指针
- `getMode()`: 获取施法模式
- `getCaster()`: 获取施法者对象的常量指针
- `getBattle()`: 获取战斗信息回调对象的常量指针
- `getSpellLevel()`: 获取法术等级，如果未设置则返回空值
- `getEffectPower()`: 获取效果力量，如果未设置则返回空值
- `getEffectDuration()`: 获取效果持续时间，如果未设置则返回空值
- `getEffectValue()`: 获取效果值，如果未设置则返回空值
- `isSmart()`: 检查是否为智能法术，返回tri-state布尔值
- `isMassive()`: 检查是否为大规模法术，返回tri-state布尔值