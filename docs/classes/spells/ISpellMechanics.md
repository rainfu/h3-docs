# ISpellMechanics类

ISpellMechanics类是VCMI系统中法术机制的核心接口，定义了法术在战斗和冒险中的行为。它提供了法术效果计算、目标选择、施法条件验证等功能。

## 类定义

```cpp
///服务器回调接口
class DLL_LINKAGE SpellCastEnvironment : public ServerCallback
{
public:
    virtual ~SpellCastEnvironment() = default;

    virtual const CMap * getMap() const = 0; // 获取地图
    virtual const IGameInfoCallback * getCb() const = 0; // 获取回调

    virtual void createBoat(const int3 & visitablePosition, BoatId type, PlayerColor initiator) = 0; // 创建船
    virtual bool moveHero(ObjectInstanceID hid, int3 dst, EMovementMode mode) = 0; // 移动英雄

    virtual void genericQuery(Query * request, PlayerColor color, std::function<void(std::optional<int32_t>)> callback) = 0; // 通用查询
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

    virtual const CSpell * getSpell() const = 0; // 获取法术
    virtual Mode getMode() const = 0; // 获取模式
    virtual const Caster * getCaster() const = 0; // 获取施法者
    virtual const CBattleInfoCallback * getBattle() const = 0; // 获取战斗信息

    virtual OptionalValue getSpellLevel() const = 0; // 获取法术等级

    virtual OptionalValue getEffectPower() const = 0; // 获取效果强度
    virtual OptionalValue getEffectDuration() const = 0; // 获取效果持续时间

    virtual OptionalValue64 getEffectValue() const = 0; // 获取效果值

    virtual boost::logic::tribool isSmart() const = 0; // 是否智能
    virtual boost::logic::tribool isMassive() const = 0; // 是否群体
};

///特定施法事件的所有参数
class DLL_LINKAGE BattleCast : public IBattleCast
{
public:
    boost::logic::tribool smart; // 智能施法
    boost::logic::tribool massive; // 群体施法

    // 构造函数
    BattleCast(const CBattleInfoCallback * cb_, const Caster * caster_, const Mode mode_, const CSpell * spell_);

    virtual ~BattleCast();

    ///IBattleCast接口实现
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

    void setSpellLevel(Value value); // 设置法术等级

    void setEffectPower(Value value); // 设置效果强度
    void setEffectDuration(Value value); // 设置效果持续时间

    void setEffectValue(Value64 value); // 设置效果值

    ///仅对指定目标应用效果
    void applyEffects(ServerCallback * server, const Target & target, bool indirect = false, bool ignoreImmunity = false) const;

    ///正常施法
    void cast(ServerCallback * server, Target target);

    ///施法评估
    void castEval(ServerCallback * server, Target target);

    ///静默检查许可施法
    bool castIfPossible(ServerCallback * server, Target target);

    std::vector<Target> findPotentialTargets(bool fast = false) const; // 查找潜在目标

private:
    ///法术学校等级
    OptionalValue magicSkillLevel;

    ///实际法术强度影响效果值
    OptionalValue effectPower;
    ///实际法术强度影响效果持续时间
    OptionalValue effectDuration;

    ///天使长般施法
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

    virtual std::unique_ptr<Mechanics> create(const IBattleCast * event) const = 0; // 创建机制

    static std::unique_ptr<ISpellMechanicsFactory> get(const CSpell * s); // 获取工厂

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

    virtual bool adaptProblem(ESpellCastProblem source, Problem & target) const = 0; // 适配问题
    virtual bool adaptGenericProblem(Problem & target) const = 0; // 适配通用问题

    virtual BattleHexArray rangeInHexes(const BattleHex & centralHex) const = 0; // 范围内的六边形
    virtual std::vector<const CStack *> getAffectedStacks(const Target & target) const = 0; // 获取受影响堆栈

    virtual bool canBeCast(Problem & problem) const = 0; // 是否可施放
    virtual bool canBeCastAt(const Target & target, Problem & problem) const = 0; // 是否可施放于目标

    virtual void applyEffects(ServerCallback * server, const Target & targets, bool indirect, bool ignoreImmunity) const = 0; // 应用效果

    virtual void cast(ServerCallback * server, const Target & target) = 0; // 施放

    virtual void castEval(ServerCallback * server, const Target & target) = 0; // 评估施放

    virtual bool isReceptive(const battle::Unit * target) const = 0; // 是否接受
    virtual bool wouldResist(const battle::Unit * target) const = 0; // 是否抵抗

    virtual std::vector<AimType> getTargetTypes() const = 0; // 获取目标类型

    virtual std::vector<Destination> getPossibleDestinations(size_t index, AimType aimType, const Target & current, bool fast = false) const = 0; // 获取可能的目的地

    virtual const Spell * getSpell() const = 0; // 获取法术

    // 施法事件外观

    virtual IBattleCast::Value getEffectLevel() const = 0; // 获取效果等级
    virtual IBattleCast::Value getRangeLevel() const = 0; // 获取范围等级

    virtual IBattleCast::Value getEffectPower() const = 0; // 获取效果强度
    virtual IBattleCast::Value getEffectDuration() const = 0; // 获取效果持续时间

    virtual IBattleCast::Value64 getEffectValue() const = 0; // 获取效果值

    virtual PlayerColor getCasterColor() const = 0; // 获取施法者颜色

    // 法术外观
    virtual int32_t getSpellIndex() const = 0; // 获取法术索引
    virtual SpellID getSpellId() const = 0; // 获取法术ID
    virtual std::string getSpellName() const = 0; // 获取法术名称
    virtual int32_t getSpellLevel() const = 0; // 获取法术等级

    virtual bool isSmart() const = 0; // 是否智能
    virtual bool isMassive() const = 0; // 是否群体
    virtual bool alwaysHitFirstTarget() const = 0; // 是否总是命中第一个目标
    virtual bool requiresClearTiles() const = 0; // 是否需要清理瓦片

    virtual bool isNegativeSpell() const = 0; // 是否负面法术
    virtual bool isPositiveSpell() const = 0; // 是否正面法术
    virtual bool isMagicalEffect() const = 0; // 是否魔法效果

    virtual int64_t adjustEffectValue(const battle::Unit * target) const = 0; // 调整效果值
    virtual int64_t applySpellBonus(int64_t value, const battle::Unit * target) const = 0; // 应用法术奖励
    virtual int64_t applySpecificSpellBonus(int64_t value) const = 0; // 应用特定法术奖励
    virtual int64_t calculateRawEffectValue(int32_t basePowerMultiplier, int32_t levelPowerMultiplier) const = 0; // 计算原始效果值
    virtual Target canonicalizeTarget(const Target & aim) const = 0; // 规范化目标

    // 战斗外观
    virtual bool ownerMatches(const battle::Unit * unit) const = 0; // 所有者匹配
    virtual bool ownerMatches(const battle::Unit * unit, const boost::logic::tribool positivness) const = 0; // 所有者匹配（带正负性）

    // 全局环境外观
    virtual const CreatureService * creatures() const = 0; // 获取生物服务
#if SCRIPTING_ENABLED
    virtual const scripting::Service * scripts() const = 0; // 获取脚本服务
#endif
    virtual const Service * spells() const = 0; // 获取法术服务

    virtual const CBattleInfoCallback * battle() const = 0; // 获取战斗信息

    const Caster * caster; // 施法者

    BattleSide casterSide; // 施法者阵营

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
    const CSpell * owner; // 法术拥有者
    Mode mode; // 模式

    BaseMechanics(const IBattleCast * event); // 构造函数

private:
    IBattleCast::Value rangeLevel; // 范围等级
    IBattleCast::Value effectLevel; // 效果等级

    ///实际法术强度影响效果值
    IBattleCast::Value effectPower;
    ///实际法术强度影响效果持续时间
    IBattleCast::Value effectDuration;

    ///原始伤害/治疗量
    IBattleCast::Value64 effectValue;

    boost::logic::tribool smart; // 智能
    boost::logic::tribool massive; // 群体

    const CBattleInfoCallback * cb; // 战斗回调
};

class DLL_LINKAGE IReceptiveCheck
{
public:
    virtual ~IReceptiveCheck() = default;

    virtual bool isReceptive(const Mechanics * m, const battle::Unit * target) const = 0; // 是否接受
};

}// namespace spells

class DLL_LINKAGE AdventureSpellCastParameters
{
public:
    const spells::Caster * caster; // 施法者
    int3 pos; // 位置
};

class DLL_LINKAGE IAdventureSpellMechanics
{
public:
    IAdventureSpellMechanics(const CSpell * s); // 构造函数
    virtual ~IAdventureSpellMechanics() = default;

    virtual bool canBeCast(spells::Problem & problem, const IGameInfoCallback * cb, const spells::Caster * caster) const = 0; // 是否可施放
    virtual bool canBeCastAt(spells::Problem & problem, const IGameInfoCallback * cb, const spells::Caster * caster, const int3 & pos) const = 0; // 是否可施放于位置
    virtual bool adventureCast(SpellCastEnvironment * env, const AdventureSpellCastParameters & parameters) const = 0; // 冒险施法

    static std::unique_ptr<IAdventureSpellMechanics> createMechanics(const CSpell * s); // 创建机制

    virtual bool givesBonus(const spells::Caster * caster, BonusType which) const = 0; // 给予奖励

    template<typename EffectType>
    const EffectType * getEffectAs(const spells::Caster * caster) const
    {
        return dynamic_cast<const EffectType *>(getEffect(caster));
    }
protected:
    virtual const IAdventureSpellEffect * getEffect(const spells::Caster * caster) const = 0; // 获取效果

    const CSpell * owner; // 拥有者
};
```

## 功能说明

ISpellMechanics类定义了法术系统的核心接口，包括战斗和冒险中的法术行为。它分为两部分：

1. 战斗法术机制（BattleCast、Mechanics）：处理战斗中的法术施放
2. 冒险法术机制（IAdventureSpellMechanics）：处理冒险地图中的法术施放

## 重要方法

### 战斗法术机制
- `canBeCast()`：检查法术是否可以施放
- `canBeCastAt()`：检查法术是否可以施放于目标
- `cast()`：施放法术
- `applyEffects()`：应用法术效果
- `isReceptive()`：检查目标是否接受法术效果

### 冒险法术机制
- `adventureCast()`：在冒险地图中施放法术
- `canBeCast()`：检查冒险法术是否可以施放
- `canBeCastAt()`：检查冒险法术是否可以施放于位置

## 设计说明

ISpellMechanics的设计采用了策略模式和工厂模式：

1. **接口分离**：将战斗和冒险法术机制分开，便于独立实现
2. **工厂模式**：通过ISpellMechanicsFactory创建不同的法术机制实现
3. **模板方法**：在BaseMechanics中定义通用行为
4. **回调模式**：通过SpellCastEnvironment提供服务器回调接口

这套接口为VCMI提供了灵活的法术系统，支持各种不同类型的法术效果和施法行为。