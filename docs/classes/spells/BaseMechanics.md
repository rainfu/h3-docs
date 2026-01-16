# BaseMechanics类

BaseMechanics类是VCMI中基础法术机制的实现类，为法术执行提供了通用的功能实现。

## 类定义

```cpp
class DLL_LINKAGE BaseMechanics : public Mechanics
{
public:
    virtual ~BaseMechanics();

    bool adaptProblem(ESpellCastProblem source, Problem & target) const override;
    bool adaptGenericProblem(Problem & target) const override;

    int32_t getSpellIndex() const override;
    SpellID getSpellId() const override;
    std::string getSpellName() const override;
    int32_t getSpellLevel() const override;

    IBattleCast::Value getEffectLevel() const override;
    IBattleCast::Value getRangeLevel() const override;

    IBattleCast::Value getEffectPower() const override;
    IBattleCast::Value getEffectDuration() const override;

    IBattleCast::Value64 getEffectValue() const override;

    PlayerColor getCasterColor() const override;

    bool isSmart() const override;
    bool isMassive() const override;
    bool requiresClearTiles() const override;
    bool alwaysHitFirstTarget() const override;

    bool isNegativeSpell() const override;
    bool isPositiveSpell() const override;
    bool isMagicalEffect() const override;

    int64_t adjustEffectValue(const battle::Unit * target) const override;
    int64_t applySpellBonus(int64_t value, const battle::Unit * target) const override;
    int64_t applySpecificSpellBonus(int64_t value) const override;
    int64_t calculateRawEffectValue(int32_t basePowerMultiplier, int32_t levelPowerMultiplier) const override;
    Target canonicalizeTarget(const Target & aim) const override;

    bool ownerMatches(const battle::Unit * unit) const override;
    bool ownerMatches(const battle::Unit * unit, const boost::logic::tribool positivness) const override;

    std::vector<AimType> getTargetTypes() const override;

    const CreatureService * creatures() const override;
    #if SCRIPTING_ENABLED
    const scripting::Service * scripts() const override;
    #endif
    const Service * spells() const override;

    const CBattleInfoCallback * battle() const override;

protected:
    const CSpell * owner;
    Mode mode;

    BaseMechanics(const IBattleCast * event);

private:
    IBattleCast::Value rangeLevel;
    IBattleCast::Value effectLevel;

    ///实际法术力量，影响效果值
    IBattleCast::Value effectPower;
    ///实际法术力量，影响效果持续时间
    IBattleCast::Value effectDuration;

    ///原始伤害/治疗量
    IBattleCast::Value64 effectValue;

    boost::logic::tribool smart;
    boost::logic::tribool massive;

    const CBattleInfoCallback * cb;
};
```

## 功能说明

BaseMechanics是VCMI法术系统中基础法术机制的实现类，继承自Mechanics基类。它为法术执行提供了通用的功能实现，包括法术属性获取、效果计算、目标验证等。这个类实现了法术机制的基本功能，为具体的法术实现提供了基础支持。

## 依赖关系

- [Mechanics](./Mechanics.md): 法术机制基类
- [ESpellCastProblem](./ESpellCastProblem.md): 法术施放问题枚举
- [Problem](./Problem.md): 问题类
- [SpellID](./SpellID.md): 法术ID
- [IBattleCast](./IBattleCast.md): 战斗法术施放接口
- [PlayerColor](../players/PlayerColor.md): 玩家颜色
- [Target](./Target.md): 目标类
- [AimType](./AimType.md): 目标类型
- [CSpell](./CSpell.md): 法术类
- [spells::Mode](./Mode.md): 模式枚举
- [battle::Unit](../battle/Unit.md): 战斗单位
- [CreatureService](../entities/CreatureService.md): 生物服务
- [Service](./Service.md): 法术服务
- [CBattleInfoCallback](../battle/CBattleInfoCallback.md): 战斗信息回调
- Boost库: tribool
- STL库: vector, string等

## 函数注释

### 构造/析构函数
- `BaseMechanics(event)`: 构造函数，使用战斗施放事件初始化基础机制
- `~BaseMechanics()`: 虚析构函数

### 重写基类方法
- `adaptProblem(source, target)`: 将法术施放问题适配为目标问题类型
- `adaptGenericProblem(target)`: 适配通用问题
- `getSpellIndex()`: 获取法术索引
- `getSpellId()`: 获取法术ID
- `getSpellName()`: 获取法术名称
- `getSpellLevel()`: 获取法术等级
- `getEffectLevel()`: 获取效果等级
- `getRangeLevel()`: 获取范围等级
- `getEffectPower()`: 获取效果力量
- `getEffectDuration()`: 获取效果持续时间
- `getEffectValue()`: 获取效果值
- `getCasterColor()`: 获取施法者颜色
- `isSmart()`: 检查是否为智能法术
- `isMassive()`: 检查是否为大规模法术
- `requiresClearTiles()`: 检查是否需要清晰的瓦片
- `alwaysHitFirstTarget()`: 检查是否总是击中第一个目标
- `isNegativeSpell()`: 检查是否为负面法术
- `isPositiveSpell()`: 检查是否为正面法术
- `isMagicalEffect()`: 检查是否为魔法效果
- `adjustEffectValue(target)`: 调整效果值
- `applySpellBonus(value, target)`: 应用法术奖励
- `applySpecificSpellBonus(value)`: 应用特定法术奖励
- `calculateRawEffectValue(basePowerMultiplier, levelPowerMultiplier)`: 计算原始效果值
- `canonicalizeTarget(aim)`: 标准化目标
- `ownerMatches(unit)`: 检查单位所有者是否匹配
- `ownerMatches(unit, positivness)`: 检查单位所有者是否匹配（考虑正负面性）
- `getTargetTypes()`: 获取目标类型
- `creatures()`: 获取生物服务
- `scripts()`: 获取脚本服务（如果启用）
- `spells()`: 获取法术服务
- `battle()`: 获取战斗信息回调

### 成员变量
- `owner`: 法术对象指针
- `mode`: 施法模式
- `rangeLevel`: 范围等级
- `effectLevel`: 效果等级
- `effectPower`: 效果力量
- `effectDuration`: 效果持续时间
- `effectValue`: 效果值（原始伤害/治疗量）
- `smart`: 智能法术标志
- `massive`: 大规模法术标志
- `cb`: 战斗信息回调指针