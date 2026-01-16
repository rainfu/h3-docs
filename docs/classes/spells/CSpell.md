# CSpell类

CSpell类是VCMI中法术系统的核心实现类，用于定义游戏中的各种法术。

## 类定义

```cpp
class DLL_LINKAGE CSpell : public spells::Spell
{
public:
    struct ProjectileInfo
    {
        /// 以弧度为单位。只有正值。负角度通过垂直翻转处理
        double minimumAngle;

        /// 资源名称
        AnimationPath resourceName;
    };

    struct AnimationItem
    {
        AnimationPath resourceName;
        std::string effectName;
        VerticalPosition verticalPosition;
        float transparency;
        int pause;

        AnimationItem();
    };

    using TAnimation = AnimationItem;
    using TAnimationQueue = std::vector<TAnimation>;

    struct DLL_LINKAGE AnimationInfo
    {
        /// 显示在所有受影响的目标上
        TAnimationQueue affect;

        /// 显示在施法者上
        TAnimationQueue cast;

        /// 显示在目标六边形上。如果法术施放时没有目标选择，则显示在整个战场上（例如ARMAGEDDON）
        TAnimationQueue hit;

        /// 显示在施法者和（第一个）目标之间。如果法术施放时没有目标选择，则忽略。
        /// 使用selectProjectile访问
        std::vector<ProjectileInfo> projectile;

        AnimationPath selectProjectile(const double angle) const;
    } animationInfo;

public:
    struct LevelInfo
    {
        si32 cost = 0;
        si32 power = 0;

        bool smartTarget = true;
        bool clearTarget = false;
        bool clearAffected = false;
        std::vector<int> range = { 0 };

        //TODO: 当AI理解特殊效果时移除这两个
        std::vector<std::shared_ptr<Bonus>> effects; //已弃用
        std::vector<std::shared_ptr<Bonus>> cumulativeEffects; //已弃用

        JsonNode battleEffects;
        JsonNode adventureEffect;
    };

    /** \brief 低级访问器。除非绝对必要，否则不要使用
     *
     * \param level. 法术学派等级
     * \return 法术等级信息结构
     *
     */
    const CSpell::LevelInfo & getLevelInfo(const int32_t level) const;

    SpellID id;
    std::string identifier;
    std::string modScope;
public:
    enum ESpellPositiveness
    {
        NEGATIVE = -1,
        NEUTRAL = 0,
        POSITIVE = 1
    };

    struct DLL_LINKAGE TargetInfo
    {
        spells::AimType type;
        bool smart;
        bool massive;
        bool clearAffected;

        TargetInfo(const CSpell * spell, const int32_t level, spells::Mode mode);
    };

    using BTVector = std::vector<BonusType>;

    std::set<SpellSchool> schools;
    std::map<FactionID, si32> probabilities; //% 获得城堡的机会

    bool onlyOnWaterMap; //在没有水的地图上禁止使用法术
    std::vector<SpellID> counteredSpells; //当此法术效果放置在生物上时被移除的法术（用于祝福-诅咒，加速-减速等类似配对）

    JsonNode targetCondition; //法术可影响的自定义条件

    CSpell();
    ~CSpell();

    int64_t calculateDamage(const spells::Caster * caster) const override;

    bool hasSchool(SpellSchool school) const override;
    bool canCastOnSelf() const override;
    bool canCastOnlyOnSelf() const override;
    bool canCastWithoutSkip() const override;

    /**
     * 对于此法术所属的每个学派调用cb
     *
     * 将stop设置为true以中止循环
     */
    void forEachSchool(const std::function<void(const SpellSchool &, bool &)> & cb) const override;

    spells::AimType getTargetType() const;

    bool hasEffects() const;
    void getEffects(std::vector<Bonus> & lst, const int level, const bool cumulative, const si32 duration, std::optional<si32 *> maxDuration = std::nullopt) const;

    bool hasBattleEffects() const;

    int32_t getCost(const int32_t skillLevel) const override;

    si32 getProbability(const FactionID & factionId) const;

    int32_t getBasePower() const override;
    int32_t getLevelPower(const int32_t skillLevel) const override;

    int32_t getIndex() const override;
    int32_t getIconIndex() const override;
    std::string getJsonKey() const override;
    std::string getModScope() const override;
    SpellID getId() const override;

    std::string getNameTextID() const override;
    std::string getNameTranslated() const override;

    std::string getDescriptionTextID(int32_t level) const override;
    std::string getDescriptionTranslated(int32_t level) const override;

    int32_t getLevel() const override;

    boost::logic::tribool getPositiveness() const override;

    bool isPositive() const override;
    bool isNegative() const override;
    bool isNeutral() const override;
    bool isMagical() const override;

    bool isDamage() const override;
    bool isOffensive() const override;

    bool isSpecial() const override;

    bool isAdventure() const override;
    bool isCombat() const override;
    bool isCreatureAbility() const override;

    void registerIcons(const IconRegistar & cb) const override;

    const ImagePath & getIconImmune() const; ///< 返回SPELL_IMMUNITY奖励的图标资源名称
    const std::string & getIconBook() const;
    const std::string & getIconEffect() const;
    const std::string & getIconScenarioBonus() const;
    const std::string & getIconScroll() const;

    const AudioPath & getCastSound() const;

    void updateFrom(const JsonNode & data);
    void serializeJson(JsonSerializeFormat & handler);

    friend class CSpellHandler;
    friend class Graphics;
    friend class test::CSpellTest;
public:
    ///内部接口（用于回调）

    ///检查一般但法术特定的问题。仅在战斗期间使用。
    bool canBeCast(const CBattleInfoCallback * cb, spells::Mode mode, const spells::Caster * caster) const;
    bool canBeCast(spells::Problem & problem, const CBattleInfoCallback * cb, spells::Mode mode, const spells::Caster * caster) const;

public:
    ///服务器逻辑。通过数据包对GameState有写访问权限。
    ///可能会在客户端侧由（未来的）非防作弊脚本执行。

    bool adventureCast(SpellCastEnvironment * env, const AdventureSpellCastParameters & parameters) const;

public://内部，仅供Mechanics类使用
    ///将caster的二级技能和affectedCreature应用于原始伤害
    int64_t adjustRawDamage(const spells::Caster * caster, const battle::Unit * affectedCreature, int64_t rawDamage) const;

    ///返回原始伤害或治疗的HP
    int64_t calculateRawEffectValue(int32_t effectLevel, int32_t basePowerMultiplier, int32_t levelPowerMultiplier) const;

    const IAdventureSpellMechanics & getAdventureMechanics() const;
    std::unique_ptr<spells::Mechanics> battleMechanics(const spells::IBattleCast * event) const;
private:
    void setIsOffensive(const bool val);
    void setIsRising(const bool val);

    JsonNode convertTargetCondition(const BTVector & immunity, const BTVector & absImmunity, const BTVector & limit, const BTVector & absLimit) const;

    //在加载或反序列化后调用。不能在构造函数中完成。
    void setupMechanics();

private:
    si32 defaultProbability;

    bool rising;
    bool damage;
    bool offensive;
    bool special;
    bool nonMagical; //对于生物能力如bind

    std::string attributes; //仅参考属性 //todo: 删除或包含在配置格式中，当前未使用

    spells::AimType targetType;

    ///图形相关
    ImagePath iconImmune;
    std::string iconBook;
    std::string iconEffect;
    std::string iconScenarioBonus;
    std::string iconScroll;

    ///声音相关
    AudioPath castSound;

    std::vector<LevelInfo> levels;

    si32 level;
    si32 power; //法术的力量
    bool combat; //此法术是战斗（true）还是冒险（false）
    bool creatureAbility; //如果是true，则只有生物可以使用此法术
    bool castOnSelf; // 如果设置，生物施法者可以对自己施放此法术
    bool castOnlyOnSelf; // 如果设置，生物施法者只能对自己施放此法术
    bool castWithoutSkip; // 如果设置，生物在施放法术后不会跳过回合
    si8 positiveness; //1如果法术对受影响的部队是正面的，0如果它是中性的，-1如果是负面的

    std::unique_ptr<spells::ISpellMechanicsFactory> mechanics;//(!) 不要序列化
    std::unique_ptr<IAdventureSpellMechanics> adventureMechanics;//(!) 不要序列化
};
```

## 功能说明

CSpell是VCMI法术系统的核心实现类，代表游戏中的各种法术。它继承自spells::Spell接口，实现了法术的各种属性和功能，包括法术的动画效果、等级信息、伤害计算、目标类型等。该类还包含法术的视觉和听觉效果，如动画、音效和图标。

## 依赖关系

- [spells::Spell](./Spell.md): 法术接口
- [SpellID](./SpellID.md): 法术ID
- [AnimationPath](./AnimationPath.md): 动画路径
- [ImagePath](./ImagePath.md): 图像路径
- [AudioPath](./AudioPath.md): 音频路径
- [JsonNode](../json/JsonNode.md): JSON节点
- [CBattleInfoCallback](../battle/CBattleInfoCallback.md): 战斗信息回调
- [JsonSerializeFormat](../json/JsonSerializeFormat.md): JSON序列化格式
- [IAdventureSpellMechanics](./IAdventureSpellMechanics.md): 冒险法术机制
- [spells::Mechanics](./Mechanics.md): 法术机制
- STL库: vector, map, set, string, unique_ptr, shared_ptr等

## 函数注释

- `calculateDamage(caster)`: 计算法术伤害
- `hasSchool(school)`: 检查法术是否属于指定学派
- `canCastOnSelf()`: 检查是否可以对自己施放
- `canCastOnlyOnSelf()`: 检查是否只能对自己施放
- `canCastWithoutSkip()`: 检查施放后是否不需要跳过回合
- `forEachSchool(cb)`: 对每个法术学派执行回调函数
- `getTargetType()`: 获取目标类型
- `hasEffects()`: 检查法术是否有效果
- `getEffects(lst, level, cumulative, duration, maxDuration)`: 获取法术效果
- `getCost(skillLevel)`: 获取法术消耗
- `getProbability(factionId)`: 获取法术概率
- `getBasePower()`: 获取基础力量
- `getLevelPower(skillLevel)`: 获取等级力量
- `getIndex()`: 获取索引
- `getIconIndex()`: 获取图标索引
- `getJsonKey()`: 获取JSON键
- `getModScope()`: 获取模块范围
- `getId()`: 获取法术ID
- `getNameTextID()`: 获取名称文本ID
- `getNameTranslated()`: 获取翻译后的名称
- `getDescriptionTextID(level)`: 获取描述文本ID
- `getDescriptionTranslated(level)`: 获取翻译后的描述
- `getLevel()`: 获取等级
- `getPositiveness()`: 获取正负面性
- `isPositive()`: 检查是否为正面法术
- `isNegative()`: 检查是否为负面法术
- `isNeutral()`: 检查是否为中性法术
- `isMagical()`: 检查是否为魔法法术
- `isDamage()`: 检查是否为伤害法术
- `isOffensive()`: 检查是否为进攻法术
- `isSpecial()`: 检查是否为特殊法术
- `isAdventure()`: 检查是否为冒险法术
- `isCombat()`: 检查是否为战斗法术
- `isCreatureAbility()`: 检查是否为生物能力
- `registerIcons(cb)`: 注册图标
- `getIconImmune()`: 获取免疫图标
- `getIconBook()`: 获取法术书图标
- `getIconEffect()`: 获取效果图标
- `getIconScenarioBonus()`: 获取场景奖励图标
- `getIconScroll()`: 获取卷轴图标
- `getCastSound()`: 获取施法音效
- `canBeCast(cb, mode, caster)`: 检查是否可以施放法术
- `adventureCast(env, parameters)`: 冒险模式施法
- `adjustRawDamage(caster, affectedCreature, rawDamage)`: 调整原始伤害
- `calculateRawEffectValue(effectLevel, basePowerMultiplier, levelPowerMultiplier)`: 计算原始效果值
- `getAdventureMechanics()`: 获取冒险机制
- `battleMechanics(event)`: 获取战斗机制