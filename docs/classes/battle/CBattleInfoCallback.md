# CBattleInfoCallback类

CBattleInfoCallback类是VCMI中战斗信息回调的实现，提供了对战斗信息的全面访问和操作。

## 类定义

```cpp
class DLL_LINKAGE CBattleInfoCallback : public virtual CBattleInfoEssentials
{
public:
    std::optional<BattleSide> battleIsFinished() const override;

    std::vector<std::shared_ptr<const CObstacleInstance>> battleGetAllObstaclesOnPos(const BattleHex & tile, bool onlyBlocking = true) const override;
    std::vector<std::shared_ptr<const CObstacleInstance>> getAllAffectedObstaclesByStack(const battle::Unit * unit, const BattleHexArray & passed) const override;
    bool handleObstacleTriggersForUnit(SpellCastEnvironment & spellEnv, const battle::Unit & unit, const BattleHexArray & passed = {}) const;

    const CStack * battleGetStackByPos(const BattleHex & pos, bool onlyAlive = true) const;

    const battle::Unit * battleGetUnitByPos(const BattleHex & pos, bool onlyAlive = true) const override;

    battle::Units battleAliveUnits() const;
    battle::Units battleAliveUnits(BattleSide side) const;

    void battleGetTurnOrder(std::vector<battle::Units> & out, const size_t maxUnits, const int maxTurns, const int turn = 0, BattleSide lastMoved = BattleSide::NONE) const;

    BattleHexArray battleGetAvailableHexes(const battle::Unit * unit, bool obtainMovementRange) const;
    BattleHexArray battleGetAvailableHexes(const ReachabilityInfo & cache, const battle::Unit * unit, bool obtainMovementRange) const;

    BattleHexArray battleGetOccupiableHexes(const battle::Unit * unit, bool obtainMovementRange) const;
    BattleHexArray battleGetOccupiableHexes(const BattleHexArray & availableHexes, const battle::Unit * unit) const;

    BattleHex fromWhichHexAttack(const battle::Unit * attacker, const BattleHex & target, const BattleHex::EDir & direction) const;

    BattleHex toWhichHexMove(const battle::Unit * unit, const BattleHex & position) const;
    BattleHex toWhichHexMove(const BattleHexArray & availableHexes, const battle::Unit * unit, const BattleHex & position) const;

    bool battleCanAttackHex(const battle::Unit * attacker, const BattleHex & position, const BattleHex::EDir & direction) const;
    bool battleCanAttackHex(const BattleHexArray & availableHexes, const battle::Unit * attacker, const BattleHex & position, const BattleHex::EDir & direction) const;
    bool battleCanAttackHex(const battle::Unit * attacker, const BattleHex & position) const;
    bool battleCanAttackHex(const BattleHexArray & availableHexes, const battle::Unit * attacker, const BattleHex & position) const;

    int battleGetSurrenderCost(const PlayerColor & Player) const;
    ReachabilityInfo::TDistances battleGetDistances(const battle::Unit * unit, const BattleHex & assumedPosition) const;
    BattleHexArray battleGetAttackedHexes(const battle::Unit * attacker, const BattleHex & destinationTile, const BattleHex & attackerPos = BattleHex::INVALID) const;
    bool isEnemyUnitWithinSpecifiedRange(const BattleHex & attackerPosition, const battle::Unit * defenderUnit, unsigned int range) const;
    bool isHexWithinSpecifiedRange(const BattleHex & attackerPosition, const BattleHex & targetPosition, unsigned int range) const;

    std::pair< BattleHexArray, int > getPath(const BattleHex & start, const BattleHex & dest, const battle::Unit * stack) const;

    bool battleCanTargetEmptyHex(const battle::Unit * attacker) const;
    bool battleCanAttackUnit(const battle::Unit * attacker, const battle::Unit * target) const;
    bool battleCanShoot(const battle::Unit * attacker, const BattleHex & dest) const;
    bool battleCanShoot(const battle::Unit * attacker) const;
    bool battleIsUnitBlocked(const battle::Unit * unit) const;
    battle::Units battleAdjacentUnits(const battle::Unit * unit) const;

    DamageEstimation calculateDmgRange(const BattleAttackInfo & info) const;

    DamageEstimation battleEstimateDamage(const BattleAttackInfo & bai, DamageEstimation * retaliationDmg = nullptr) const;
    DamageEstimation battleEstimateDamage(const battle::Unit * attacker, const battle::Unit * defender, const BattleHex & attackerPosition, DamageEstimation * retaliationDmg = nullptr) const;
    DamageEstimation battleEstimateDamage(const battle::Unit * attacker, const battle::Unit * defender, int getMovementRange, DamageEstimation * retaliationDmg = nullptr) const;

    SpellEffectValUptr getSpellEffectValue(const CSpell * spell, const spells::Caster * caster, const spells::Mode spellMode, const BattleHex & targetHex) const;

    DamageEstimation estimateSpellLikeAttackDamage(const battle::Unit * shooter, const CSpell * spell,const BattleHex & aimHex) const;

    int64_t getFirstAidHealValue(const CGHeroInstance * owner, const battle::Unit * target) const;

    bool battleIsInsideWalls(const BattleHex & from) const;
    bool battleHasPenaltyOnLine(const BattleHex & from, const BattleHex & dest, bool checkWall, bool checkMoat) const;
    bool battleHasDistancePenalty(const IBonusBearer * shooter, const BattleHex & shooterPosition, const BattleHex & destHex) const;
    bool battleHasWallPenalty(const IBonusBearer * shooter, const BattleHex & shooterPosition, const BattleHex & destHex) const;
    bool battleHasShootingPenalty(const battle::Unit * shooter, const BattleHex & destHex) const;

    BattleHex wallPartToBattleHex(EWallPart part) const;
    EWallPart battleHexToWallPart(const BattleHex & hex) const;
    bool isWallPartPotentiallyAttackable(EWallPart wallPart) const;
    bool isWallPartAttackable(EWallPart wallPart) const;
    BattleHexArray getAttackableWallParts() const;

    si8 battleMinSpellLevel(BattleSide side) const;
    si8 battleMaxSpellLevel(BattleSide side) const;
    int32_t battleGetSpellCost(const spells::Spell * sp, const CGHeroInstance * caster) const;
    ESpellCastProblem battleCanCastSpell(const spells::Caster * caster, spells::Mode mode) const;

    SpellID getRandomBeneficialSpell(vstd::RNG & rand, const battle::Unit * caster, const battle::Unit * target) const;
    SpellID getRandomCastedSpell(vstd::RNG & rand, const CStack * caster, bool includeAllowed = false) const;

    std::vector<PossiblePlayerBattleAction> getClientActionsForStack(const CStack * stack, const BattleClientInterfaceData & data);
    PossiblePlayerBattleAction getCasterAction(const CSpell * spell, const spells::Caster * caster, spells::Mode mode) const;

    bool isInTacticRange(const BattleHex & dest) const;
    si8 battleGetTacticDist() const;

    AttackableTiles getPotentiallyAttackableHexes(
        const  battle::Unit* attacker,
        const  battle::Unit* defender,
        BattleHex destinationTile,
        BattleHex attackerPos,
        BattleHex defenderPos) const;

    AttackableTiles getPotentiallyAttackableHexes(
        const  battle::Unit * attacker,
        BattleHex destinationTile,
        BattleHex attackerPos) const;

    AttackableTiles getPotentiallyShootableHexes(const  battle::Unit* attacker, const BattleHex & destinationTile, const BattleHex & attackerPos) const;

    battle::Units getAttackedBattleUnits(
        const battle::Unit* attacker,
        const  battle::Unit * defender,
        BattleHex destinationTile,
        bool rangedAttack,
        BattleHex attackerPos = BattleHex::INVALID,
        BattleHex defenderPos = BattleHex::INVALID) const;
    
    std::pair<std::set<const CStack*>, bool> getAttackedCreatures(const CStack* attacker, const BattleHex & destinationTile, bool rangedAttack, BattleHex attackerPos = BattleHex::INVALID) const;
    bool isToReverse(const battle::Unit * attacker, const battle::Unit * defender, BattleHex attackerHex = BattleHex::INVALID, BattleHex defenderHex = BattleHex::INVALID) const;

    ReachabilityInfo getReachability(const battle::Unit * unit) const;
    ReachabilityInfo getReachability(const ReachabilityInfo::Parameters & params) const;
    AccessibilityInfo getAccessibility() const;
    AccessibilityInfo getAccessibility(const battle::Unit * stack) const;
    AccessibilityInfo getAccessibility(const BattleHexArray & accessibleHexes) const;
    ForcedAction getBerserkForcedAction(const battle::Unit * berserker) const;

    BattleHex getAvailableHex(const CreatureID & creID, BattleSide side, int initialPos = -1) const;
protected:
    ReachabilityInfo getFlyingReachability(const ReachabilityInfo::Parameters & params) const;
    ReachabilityInfo makeBFS(const AccessibilityInfo & accessibility, const ReachabilityInfo::Parameters & params) const;
    bool isInObstacle(const BattleHex & hex, const BattleHexArray & obstacles, const ReachabilityInfo::Parameters & params) const;
    BattleHexArray getStoppers(BattleSide whichSidePerspective) const;
};
```

## 功能说明

CBattleInfoCallback是VCMI战斗系统中最核心的类之一，它提供了对战斗信息的全面访问和操作功能。该类继承自CBattleInfoEssentials，实现了大量的战斗相关方法，包括单位移动、攻击范围计算、伤害估算、障碍物检测、城墙攻防等功能。

## 依赖关系

- [CBattleInfoEssentials](./CBattleInfoEssentials.md): 战斗信息基础接口
- [CStack](./CStack.md): 战斗堆栈
- [BattleHex](./BattleHex.md): 战斗格子
- [BattleHexArray](./BattleHexArray.md): 战斗格子数组
- [ReachabilityInfo](./ReachabilityInfo.md): 可达性信息
- [AccessibilityInfo](./AccessibilityInfo.md): 可访问性信息
- [BattleAttackInfo](./BattleAttackInfo.md): 战斗攻击信息
- [DamageEstimation](./DamageEstimation.md): 伤害估算
- [AttackableTiles](./AttackableTiles.md): 可攻击格子
- [ForcedAction](./ForcedAction.md): 强制行动
- [CSpell](./CSpell.md): 法术
- [CGHeroInstance](./CGHeroInstance.md): 英雄实例
- [PossiblePlayerBattleAction](./PossiblePlayerBattleAction.md): 玩家可能的战斗行动
- [BattleClientInterfaceData](./BattleClientInterfaceData.md): 战斗客户端界面数据
- [SpellCastEnvironment](./SpellCastEnvironment.md): 法术施放环境
- [CObstacleInstance](./CObstacleInstance.md): 障碍物实例
- [IBonusBearer](./IBonusBearer.md): 奖励承载者
- [vstd::RNG](./RNG.md): 随机数生成器
- [spells::Caster](./Caster.md): 法术施放者
- [spells::Mode](./Mode.md): 法术模式

## 函数注释

- `battleIsFinished()`: 判断战斗是否结束，如果战斗仍在进行返回空值，否则返回获胜方
- `battleGetAllObstaclesOnPos(tile, onlyBlocking)`: 获取指定位置的所有障碍物
- `battleGetStackByPos(pos, onlyAlive)`: 根据位置获取战斗堆栈
- `battleGetUnitByPos(pos, onlyAlive)`: 根据位置获取战斗单位
- `battleAliveUnits()`: 获取所有存活单位
- `battleGetAvailableHexes(unit, obtainMovementRange)`: 获取单位可移动的格子
- `battleCanAttackUnit(attacker, target)`: 判断攻击者能否攻击目标
- `battleCanShoot(attacker, dest)`: 判断单位能否向指定位置射击
- `battleEstimateDamage(...)`: 估算战斗伤害
- `battleGetSurrenderCost(Player)`: 获取投降费用
- `getRandomBeneficialSpell(rand, caster, target)`: 获取随机有益法术
- `isInTacticRange(dest)`: 判断目标是否在战术范围内
- `getAttackedBattleUnits(...)`: 获取被攻击的战斗单位
- `getReachability(unit)`: 获取单位的可达性信息
- `getBerserkForcedAction(berserker)`: 获取狂暴单位的强制行动
- `getAvailableHex(creID, side, initialPos)`: 获取添加新单位的可用位置

## 设计说明

CBattleInfoCallback是VCMI战斗系统的核心类，它封装了战斗中几乎所有信息的访问方法。该类采用继承自CBattleInfoEssentials的设计，遵循了面向对象设计原则，提供了统一的接口。它的方法涵盖了战斗的各个方面，从基本的单位位置查询到复杂的伤害计算和路径规划。

该类的设计体现了单一职责原则，专注于战斗信息的提供和管理。同时，通过virtual继承，允许派生类根据需要重写部分功能，增加了系统的灵活性和可扩展性。