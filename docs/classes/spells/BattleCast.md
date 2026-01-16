# BattleCast类

BattleCast类是VCMI中战斗法术施放的实现类，封装了战斗中法术施放的所有相关信息。

## 类定义

```cpp
///特定施放事件的所有参数
class DLL_LINKAGE BattleCast : public IBattleCast
{
public:
    boost::logic::tribool smart;
    boost::logic::tribool massive;

    //普通构造函数
    BattleCast(const CBattleInfoCallback * cb_, const Caster * caster_, const Mode mode_, const CSpell * spell_);

    virtual ~BattleCast();

    ///IBattleCast接口
    const CSpell * getSpell() const override;
    Mode getMode() const override;
    const Caster * getCaster() const override;
    const CBattleInfoCallback * getBattle() const override;

    OptionalValue getSpellLevel() const override;

    OptionalValue getEffectPower() const override;
    OptionalValue getEffectDuration() const override;

    OptionalValue64 getEffectValue() const override;

    boost::logic::tribool isSmart() const override;
    boost::logic::tribool isMassive() const override;

    void setSpellLevel(Value value);

    void setEffectPower(Value value);
    void setEffectDuration(Value value);

    void setEffectValue(Value64 value);

    ///仅对指定目标应用效果
    void applyEffects(ServerCallback * server, const Target & target, bool indirect = false, bool ignoreImmunity = false) const;

    ///正常施放
    void cast(ServerCallback * server, Target target);

    ///施放评估
    void castEval(ServerCallback * server, Target target);

    ///带有静默检查的施放，如果允许施放则执行
    bool castIfPossible(ServerCallback * server, Target target);

    std::vector<Target> findPotentialTargets(bool fast = false) const;

private:
    ///法术学派等级
    OptionalValue magicSkillLevel;

    ///实际法术力量，影响效果值
    OptionalValue effectPower;
    ///实际法术力量，影响效果持续时间
    OptionalValue effectDuration;

    ///用于大天使般的施放
    OptionalValue64 effectValue;

    Mode mode;
    const CSpell * spell;
    const CBattleInfoCallback * cb;
    const Caster * caster;
};
```

## 功能说明

BattleCast是VCMI战斗法术系统中封装法术施放相关信息的类，继承自IBattleCast接口。它包含了战斗中法术施放的所有参数，如法术、施法者、战斗上下文、效果强度等。该类提供了施放法术、评估法术效果、查找潜在目标等功能，是战斗法术机制的核心组件之一。

## 依赖关系

- [IBattleCast](./IBattleCast.md): 战斗法术施放接口
- [CSpell](./CSpell.md): 法术类
- [spells::Caster](./Caster.md): 施法者接口
- [spells::Mode](./Mode.md): 模式枚举
- [CBattleInfoCallback](../battle/CBattleInfoCallback.md): 战斗信息回调
- [Target](./Target.md): 目标类
- [ServerCallback](../network/ServerCallback.md): 服务器回调
- Boost库: tribool
- STL库: vector, optional等

## 函数注释

### 构造/析构函数
- `BattleCast(cb_, caster_, mode_, spell_)`: 构造函数，使用战斗回调、施法者、模式和法术初始化
- `~BattleCast()`: 虚析构函数

### 实现IBattleCast接口的方法
- `getSpell()`: 获取法术对象
- `getMode()`: 获取施法模式
- `getCaster()`: 获取施法者
- `getBattle()`: 获取战斗信息回调
- `getSpellLevel()`: 获取法术等级
- `getEffectPower()`: 获取效果力量
- `getEffectDuration()`: 获取效果持续时间
- `getEffectValue()`: 获取效果值
- `isSmart()`: 检查是否为智能法术
- `isMassive()`: 检查是否为大规模法术

### 设置方法
- `setSpellLevel(value)`: 设置法术等级
- `setEffectPower(value)`: 设置效果力量
- `setEffectDuration(value)`: 设置效果持续时间
- `setEffectValue(value)`: 设置效果值

### 战斗法术操作
- `applyEffects(server, target, indirect, ignoreImmunity)`: 对指定目标应用效果
- `cast(server, target)`: 正常施放法术
- `castEval(server, target)`: 评估法术施放
- `castIfPossible(server, target)`: 如果可能则施放法术
- `findPotentialTargets(fast)`: 查找潜在目标

## 成员变量说明

- `smart`: 智能目标选择标志
- `massive`: 大规模效果标志
- `magicSkillLevel`: 法术学派等级
- `effectPower`: 效果力量
- `effectDuration`: 效果持续时间
- `effectValue`: 效果值
- `mode`: 施法模式
- `spell`: 法术对象
- `cb`: 战斗信息回调
- `caster`: 施法者