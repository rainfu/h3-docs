# CUnitState类

CUnitState类是VCMI战斗系统中的单位状态类，代表战场上单位的当前状态。

## 类定义

```cpp
class DLL_LINKAGE CUnitState : public Unit
{
public:
    bool cloned;
    bool defending;
    bool defendingAnim;
    bool drainedMana;
    bool fear;
    bool hadMorale;
    bool castSpellThisTurn;
    bool ghost;
    bool ghostPending;
    bool movedThisRound;
    bool summoned;
    bool waiting;
    bool waitedThisTurn;

    CCasts casts;              // 法术施放次数
    CRetaliations counterAttacks; // 反击次数
    CHealth health;             // 生命值状态
    CShots shots;              // 射击次数

    si32 cloneID;              // 克隆体ID
    BattleHex position;         // 战场位置

    CUnitState();

    CUnitState & operator= (const CUnitState & other);

    bool doubleWide() const override;
    int32_t creatureIndex() const override;
    CreatureID creatureId() const override;
    int32_t creatureLevel() const override;
    int32_t creatureCost() const override;
    int32_t creatureIconIndex() const override;
    int32_t getCasterUnitId() const override;

    int32_t getSpellSchoolLevel(const spells::Spell * spell, SpellSchool * outSelectedSchool = nullptr) const override;
    int32_t getEffectLevel(const spells::Spell * spell) const override;
    int64_t getSpellBonus(const spells::Spell * spell, int64_t base, const Unit * affectedStack) const override;
    int64_t getSpecificSpellBonus(const spells::Spell * spell, int64_t base) const override;
    int32_t getEffectPower(const spells::Spell * spell) const override;
    int32_t getEnchantPower(const spells::Spell * spell) const override;
    int64_t getEffectValue(const spells::Spell * spell) const override;
    int64_t getEffectRange(const spells::Spell * spell) const override;

    PlayerColor getCasterOwner() const override;
    const CGHeroInstance * getHeroCaster() const override;
    void getCasterName(MetaString & text) const override;
    void getCastDescription(const spells::Spell * spell, const battle::Units & attacked, MetaString & text) const override;
    int32_t manaLimit() const override;

    bool ableToRetaliate() const override;
    bool alive() const override;
    bool isGhost() const override;
    bool isFrozen() const override;
    bool isValidTarget(bool allowDead = false) const override;
    bool isHypnotized() const override;
    bool isInvincible() const override;
    bool isClone() const override;
    bool hasClone() const override;

    bool canCast() const override;
    bool isCaster() const override;
    bool canShootBlocked() const override;
    bool canShoot() const override;
    bool isShooter() const override;

    int32_t getKilled() const override;
    int32_t getCount() const override;
    int32_t getFirstHPleft() const override;
    int64_t getAvailableHealth() const override;
    int64_t getTotalHealth() const override;
    uint32_t getMaxHealth() const override;

    BattleHex getPosition() const override;
    void setPosition(const BattleHex & hex) override;
    int32_t getInitiative(int turn = 0) const override;
    ui32 getMovementRange(int turn) const override;
    ui32 getMovementRange() const override;

    bool canMove(int turn = 0) const override;
    bool defended(int turn = 0) const override;
    bool moved(int turn = 0) const override;
    bool willMove(int turn = 0) const override;
    bool waited(int turn = 0) const override;

    std::shared_ptr<Unit> acquire() const override;
    std::shared_ptr<CUnitState> acquireState() const override;

    BattlePhases::Type battleQueuePhase(int turn) const override;

    int getTotalAttacks(bool ranged) const override;
    int getMinDamage(bool ranged) const override;
    int getMaxDamage(bool ranged) const override;
    int getAttack(bool ranged) const override;
    int getDefense(bool ranged) const override;

    void damage(int64_t & amount) override;
    HealInfo heal(int64_t & amount, EHealLevel level, EHealPower power) override;

    void localInit(const IUnitEnvironment * env_);
    void serializeJson(JsonSerializeFormat & handler);

    void afterAttack(bool ranged, bool counter);
    void afterNewRound();
    void afterGetsTurn(BattleUnitTurnReason reason);
    void makeGhost();
    void onRemoved();

private:
    const IUnitEnvironment * env;
    BonusCachePerTurn immobilizedPerTurn;
    BonusCachePerTurn stackSpeedPerTurn;
    UnitBonusValuesProxy bonusCache;

    void reset();
};
```

## 功能说明

CUnitState是VCMI战斗系统中代表战场单位状态的核心类。它继承自Unit接口，包含了单位在战斗中的完整状态信息，如生命值、位置、行动状态等。该类不仅跟踪单位的基本属性，还管理单位的战斗行为，如攻击、防御、施法等。

## 依赖关系

- [Unit](./Unit.md): 单位接口
- [BattleHex](./BattleHex.md): 战场六边形位置
- [CHealth](./CHealth.md): 生命值管理
- [CShots](./CShots.md): 射击次数管理
- [CCasts](./CCasts.md): 法术施放次数管理
- [CRetaliations](./CRetaliations.md): 反击次数管理
- [IUnitEnvironment](./IUnitEnvironment.md): 单位环境接口
- [IBonusBearer](../bonuses/IBonusBearer.md): 奖励承载者接口
- [CGHeroInstance](../entities/CHero.md): 英雄实例
- [JsonNode](../json/JsonNode.md): JSON节点
- [JsonSerializeFormat](../json/JsonSerializeFormat.md): JSON序列化格式

## 函数注释

- `CUnitState()`: 构造函数，创建单位状态对象
- `doubleWide()`: 检查单位是否占用两个格子
- `creatureIndex()`: 获取生物索引
- `creatureId()`: 获取生物ID
- `creatureLevel()`: 获取生物等级
- `getPosition()`: 获取单位在战场上的位置
- `setPosition(hex)`: 设置单位在战场上的位置
- `alive()`: 检查单位是否存活
- `ableToRetaliate()`: 检查单位是否能够反击
- `canMove(turn)`: 检查单位在指定回合是否能够移动
- `moved(turn)`: 检查单位在指定回合是否已移动
- `willMove(turn)`: 检查单位在指定回合是否将要移动
- `canCast()`: 检查单位是否能够施法
- `canShoot()`: 检查单位是否能够射击
- `getCount()`: 获取单位数量
- `getMaxHealth()`: 获取最大生命值
- `getAvailableHealth()`: 获取可用生命值
- `damage(amount)`: 对单位造成伤害
- `heal(amount, level, power)`: 治疗单位
- `localInit(env)`: 本地初始化单位状态
- `afterAttack(ranged, counter)`: 攻击后处理
- `afterNewRound()`: 新回合开始后处理
- `afterGetsTurn(reason)`: 单位获得回合后处理
- `makeGhost()`: 将单位变为幽灵状态
- `onRemoved()`: 单位被移除时的处理