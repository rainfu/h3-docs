# Mechanics类

Mechanics类是VCMI中法术机制的基类，定义了法术执行的基本功能和接口。

## 类定义

```cpp
class DLL_LINKAGE Mechanics
{
public:
    virtual ~Mechanics();

    virtual void forEachEffect(const std::function<bool(const effects::Effect &)> & fn) const
    { }

    template<class T>
    const T * findEffect() const
    {
        const T * found = nullptr;
        forEachEffect([&found](const effects::Effect & e)
        {
            if(auto p = dynamic_cast<const T *>(&e))
            {
                found = p;
                return true;
            }
            return false;
        });
        return found;
    }

    virtual bool adaptProblem(ESpellCastProblem source, Problem & target) const = 0;
    virtual bool adaptGenericProblem(Problem & target) const = 0;

    virtual BattleHexArray rangeInHexes(const BattleHex & centralHex) const = 0;
    virtual std::vector<const CStack *> getAffectedStacks(const Target & target) const = 0;

    virtual bool canBeCast(Problem & problem) const = 0;
    virtual bool canBeCastAt(const Target & target, Problem & problem) const = 0;

    virtual void applyEffects(ServerCallback * server, const Target & targets, bool indirect, bool ignoreImmunity) const = 0;

    virtual void cast(ServerCallback * server, const Target & target) = 0;

    virtual void castEval(ServerCallback * server, const Target & target) = 0;

    virtual bool isReceptive(const battle::Unit * target) const = 0;
    virtual bool wouldResist(const battle::Unit * target) const = 0;

    virtual std::vector<AimType> getTargetTypes() const = 0;

    virtual std::vector<Destination> getPossibleDestinations(size_t index, AimType aimType, const Target & current, bool fast = false) const = 0;

    virtual const Spell * getSpell() const = 0;

    //Cast event facade

    virtual IBattleCast::Value getEffectLevel() const = 0;
    virtual IBattleCast::Value getRangeLevel() const = 0;

    virtual IBattleCast::Value getEffectPower() const = 0;
    virtual IBattleCast::Value getEffectDuration() const = 0;

    virtual IBattleCast::Value64 getEffectValue() const = 0;

    virtual PlayerColor getCasterColor() const = 0;

    //Spell facade
    virtual int32_t getSpellIndex() const = 0;
    virtual SpellID getSpellId() const = 0;
    virtual std::string getSpellName() const = 0;
    virtual int32_t getSpellLevel() const = 0;

    virtual bool isSmart() const = 0;
    virtual bool isMassive() const = 0;
    virtual bool alwaysHitFirstTarget() const = 0;
    virtual bool requiresClearTiles() const = 0;

    virtual bool isNegativeSpell() const = 0;
    virtual bool isPositiveSpell() const = 0;
    virtual bool isMagicalEffect() const = 0;

    virtual int64_t adjustEffectValue(const battle::Unit * target) const = 0;
    virtual int64_t applySpellBonus(int64_t value, const battle::Unit * target) const = 0;
    virtual int64_t applySpecificSpellBonus(int64_t value) const = 0;
    virtual int64_t calculateRawEffectValue(int32_t basePowerMultiplier, int32_t levelPowerMultiplier) const = 0;
    virtual Target canonicalizeTarget(const Target & aim) const = 0;

    //Battle facade
    virtual bool ownerMatches(const battle::Unit * unit) const = 0;
    virtual bool ownerMatches(const battle::Unit * unit, const boost::logic::tribool positivness) const = 0;

    //Global environment facade
    virtual const CreatureService * creatures() const = 0;
#if SCRIPTING_ENABLED
    virtual const scripting::Service * scripts() const = 0;
#endif
    virtual const Service * spells() const = 0;

    virtual const CBattleInfoCallback * battle() const = 0;

    const Caster * caster;

    BattleSide casterSide;

protected:
    Mechanics();
};
```

## 功能说明

Mechanics是VCMI法术系统中法术机制的基类。它定义了法术执行所需的基本功能和接口，包括法术效果应用、目标验证、法术施放等。这个类为不同类型的法术机制提供了统一的接口，使得战斗中的法术执行有一致的行为模式。

## 依赖关系

- [effects::Effect](./effects/Effect.md): 法术效果
- [ESpellCastProblem](./ESpellCastProblem.md): 法术施放问题枚举
- [Problem](./Problem.md): 问题类
- [BattleHex](../battle/BattleHex.md): 战场六边形
- [BattleHexArray](../battle/BattleHexArray.md): 战场六边形数组
- [CStack](../battle/CStack.md): 战斗堆栈
- [Target](./Target.md): 目标类
- [ServerCallback](../network/ServerCallback.md): 服务器回调
- [Destination](./Destination.md): 目标位置
- [AimType](./AimType.md): 目标类型
- [Spell](./Spell.md): 法术接口
- [SpellID](./SpellID.md): 法术ID
- [IBattleCast](./IBattleCast.md): 战斗法术施放接口
- [PlayerColor](../players/PlayerColor.md): 玩家颜色
- [Caster](./Caster.md): 施法者接口
- [BattleSide](../battle/BattleSide.md): 战斗方
- [battle::Unit](../battle/Unit.md): 战斗单位
- [CreatureService](../entities/CreatureService.md): 生物服务
- [Service](./Service.md): 法术服务
- [CBattleInfoCallback](../battle/CBattleInfoCallback.md): 战斗信息回调
- STL库: function, vector, string等
- Boost库: tribool

## 函数注释

### 公共方法
- `forEachEffect(fn)`: 遍历所有法术效果，对每个效果执行指定函数
- `findEffect<T>()`: 查找特定类型的法术效果
- `adaptProblem(source, target)`: 将法术施放问题适配为目标问题类型
- `adaptGenericProblem(target)`: 适配通用问题
- `rangeInHexes(centralHex)`: 获取以中心六边形为中心的影响范围
- `getAffectedStacks(target)`: 获取受目标影响的堆栈
- `canBeCast(problem)`: 检查法术是否可以施放
- `canBeCastAt(target, problem)`: 检查法术是否可以施放于目标
- `applyEffects(server, targets, indirect, ignoreImmunity)`: 应用法术效果到目标
- `cast(server, target)`: 施放法术到目标
- `castEval(server, target)`: 评估法术施放到目标
- `isReceptive(target)`: 检查目标是否接受法术效果
- `wouldResist(target)`: 检查目标是否会抵抗法术
- `getTargetTypes()`: 获取法术目标类型
- `getPossibleDestinations(index, aimType, current, fast)`: 获取可能的目的地
- `getSpell()`: 获取法术对象
- `getEffectLevel()`: 获取效果等级
- `getRangeLevel()`: 获取范围等级
- `getEffectPower()`: 获取效果力量
- `getEffectDuration()`: 获取效果持续时间
- `getEffectValue()`: 获取效果值
- `getCasterColor()`: 获取施法者颜色
- `getSpellIndex()`: 获取法术索引
- `getSpellId()`: 获取法术ID
- `getSpellName()`: 获取法术名称
- `getSpellLevel()`: 获取法术等级
- `isSmart()`: 检查是否为智能法术
- `isMassive()`: 检查是否为大规模法术
- `alwaysHitFirstTarget()`: 检查是否总是击中第一个目标
- `requiresClearTiles()`: 检查是否需要清晰的瓦片
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
- `creatures()`: 获取生物服务
- `scripts()`: 获取脚本服务（如果启用）
- `spells()`: 获取法术服务
- `battle()`: 获取战斗信息回调

### 成员变量
- `caster`: 施法者指针
- `casterSide`: 施法者所在战斗方