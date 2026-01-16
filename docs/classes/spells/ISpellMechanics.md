# ISpellMechanics类

ISpellMechanics类是VCMI法术系统中的法术机制接口，定义了法术效果的执行逻辑。

## 类定义

```cpp
class DLL_LINKAGE SpellCastEnvironment : public ServerCallback
{
public:
    virtual ~SpellCastEnvironment() = default;

    virtual const CMap * getMap() const = 0;
    virtual const IGameInfoCallback * getCb() const = 0;

    virtual void createBoat(const int3 & visitablePosition, BoatId type, PlayerColor initiator) = 0;
    virtual bool moveHero(ObjectInstanceID hid, int3 dst, EMovementMode mode) = 0;

    virtual void genericQuery(Query * request, PlayerColor color, std::function<void(std::optional<int32_t>)> callback) = 0;
};

namespace spells
{

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

///所有特定施法事件的参数
class DLL_LINKAGE BattleCast : public IBattleCast
{
public:
    boost::logic::tribool smart;
    boost::logic::tribool massive;

    //普通构造函数
    BattleCast(const CBattleInfoCallback * cb_, const Caster * caster_, const Mode mode_, const CSpell * spell_);

    virtual ~BattleCast();

    ///IBattleCast
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

    ///正常施法
    void cast(ServerCallback * server, Target target);

    ///施法评估
    void castEval(ServerCallback * server, Target target);

    ///带有静默检查的施法许可
    bool castIfPossible(ServerCallback * server, Target target);

    std::vector<Target> findPotentialTargets(bool fast = false) const;

private:
    ///法术学派等级
    OptionalValue magicSkillLevel;

    ///影响效果值的实际法术力量
    OptionalValue effectPower;
    ///影响持续时间的实际法术力量
    OptionalValue effectDuration;

    ///用于天使般施法
    OptionalValue64 effectValue;

    Mode mode;
    const CSpell * spell;
    const CBattleInfoCallback * cb;
    const Caster * caster;
};

class DLL_LINKAGE ISpellMechanicsFactory
{
public:
    virtual ~ISpellMechanicsFactory();

    virtual std::unique_ptr<Mechanics> create(const IBattleCast * event) const = 0;

    static std::unique_ptr<ISpellMechanicsFactory> get(const CSpell * s);

protected:
    const CSpell * spell;

    ISpellMechanicsFactory(const CSpell * s);
};

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

    //施法事件外观

    virtual IBattleCast::Value getEffectLevel() const = 0;
    virtual IBattleCast::Value getRangeLevel() const = 0;

    virtual IBattleCast::Value getEffectPower() const = 0;
    virtual IBattleCast::Value getEffectDuration() const = 0;

    virtual IBattleCast::Value64 getEffectValue() const = 0;

    virtual PlayerColor getCasterColor() const = 0;

    //法术外观
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

    //战斗外观
    virtual bool ownerMatches(const battle::Unit * unit) const = 0;
    virtual bool ownerMatches(const battle::Unit * unit, const boost::logic::tribool positivness) const = 0;

    //全局环境外观
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

    ///影响效果值的实际法术力量
    IBattleCast::Value effectPower;
    ///影响持续时间的实际法术力量
    IBattleCast::Value effectDuration;

    ///原始伤害/治疗量
    IBattleCast::Value64 effectValue;

    boost::logic::tribool smart;
    boost::logic::tribool massive;

    const CBattleInfoCallback * cb;
};

class DLL_LINKAGE IReceptiveCheck
{
public:
    virtual ~IReceptiveCheck() = default;

    virtual bool isReceptive(const Mechanics * m, const battle::Unit * target) const = 0;
};

}// namespace spells

class DLL_LINKAGE AdventureSpellCastParameters
{
public:
    const spells::Caster * caster;
    int3 pos;
};

class DLL_LINKAGE IAdventureSpellMechanics
{
public:
    IAdventureSpellMechanics(const CSpell * s);
    virtual ~IAdventureSpellMechanics() = default;

    virtual bool canBeCast(spells::Problem & problem, const IGameInfoCallback * cb, const spells::Caster * caster) const = 0;
    virtual bool canBeCastAt(spells::Problem & problem, const IGameInfoCallback * cb, const spells::Caster * caster, const int3 & pos) const = 0;
    virtual bool adventureCast(SpellCastEnvironment * env, const AdventureSpellCastParameters & parameters) const = 0;

    static std::unique_ptr<IAdventureSpellMechanics> createMechanics(const CSpell * s);

    virtual bool givesBonus(const spells::Caster * caster, BonusType which) const = 0;

    template<typename EffectType>
    const EffectType * getEffectAs(const spells::Caster * caster) const
    {
        return dynamic_cast<const EffectType *>(getEffect(caster));
    }
protected:
    virtual const IAdventureSpellEffect * getEffect(const spells::Caster * caster) const = 0;

    const CSpell * owner;
};
```

## 功能说明

ISpellMechanics是VCMI法术系统的核心接口，定义了法术效果的执行逻辑。它包含战斗法术和冒险法术两种机制，分别处理战斗中的法术效果和冒险地图上的法术效果。该系统提供了法术施放、效果应用、目标选择、抵抗判定等功能。

## 依赖关系

- [CSpell](./CSpell.md): 法术类
- [Caster](./Caster.md): 施法者类
- [CBattleInfoCallback](../battle/CBattleInfoCallback.md): 战斗信息回调
- [ServerCallback](../../include/vcmi/ServerCallback.md): 服务器回调
- [BattleHexArray](../battle/BattleHexArray.md): 战斗六边形数组
- [CStack](../battle/CStack.md): 战斗单位堆栈
- [Target](./Target.md): 目标类
- [CMap](../map/CMap.md): 地图类
- [IGameInfoCallback](../callback/IGameInfoCallback.md): 游戏信息回调
- [CreatureService](../../include/vcmi/CreatureService.md): 生物服务
- [Service](./Service.md): 法术服务
- boost::logic::tribool: 三值逻辑
- STL库: optional, vector, function, unique_ptr等

## 函数注释

- `SpellCastEnvironment`: 法术施放环境接口，提供服务器回调功能
- `IBattleCast`: 战斗施法接口，定义了战斗中施法的基本信息
- `BattleCast`: 战斗施法实现类，包含施法的具体参数和方法
- `Mechanics`: 法术机制基类，定义了法术效果的执行逻辑
- `BaseMechanics`: 基础法术机制实现类
- `ISpellMechanicsFactory`: 法术机制工厂接口
- `forEachEffect(fn)`: 遍历所有法术效果
- `findEffect<T>()`: 查找特定类型的法术效果
- `canBeCast(problem)`: 检查法术是否可以施放
- `canBeCastAt(target, problem)`: 检查法术是否可以施放在目标上
- `applyEffects(server, targets, indirect, ignoreImmunity)`: 应用法术效果
- `cast(server, target)`: 施放法术
- `castEval(server, target)`: 评估法术效果
- `isReceptive(target)`: 检查目标是否接受法术效果
- `wouldResist(target)`: 检查目标是否会抵抗法术
- `getAffectedStacks(target)`: 获取受影响的堆栈
- `getTargetTypes()`: 获取目标类型
- `getPossibleDestinations(index, aimType, current, fast)`: 获取可能的目的地
- `IAdventureSpellMechanics`: 冒险法术机制接口
- `adventureCast(env, parameters)`: 在冒险地图上施放法术