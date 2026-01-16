# CBattleInfoCallback类

CBattleInfoCallback类是战斗信息的回调接口，提供对战斗状态的详细访问。

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
    AttackableTiles getPotentiallyAttackableHexes(const battle::Unit* attacker, const battle::Unit* defender, BattleHex destinationTile, BattleHex attackerPos, BattleHex defenderPos) const;
    AttackableTiles getPotentiallyAttackableHexes(const battle::Unit * attacker, BattleHex destinationTile, BattleHex attackerPos) const;
    AttackableTiles getPotentiallyShootableHexes(const battle::Unit* attacker, const BattleHex & destinationTile, const BattleHex & attackerPos) const;
    battle::Units getAttackedBattleUnits(const battle::Unit* attacker, const battle::Unit * defender, BattleHex destinationTile, bool rangedAttack, BattleHex attackerPos = BattleHex::INVALID, BattleHex defenderPos = BattleHex::INVALID) const;
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

CBattleInfoCallback是战斗系统中最重要的接口之一，提供对战斗状态的详细访问和操作。它继承自CBattleInfoEssentials，实现了战斗信息的查询功能，包括单位位置、障碍物、可移动格子、伤害估算、射击能力判断等。

## 依赖关系

- [CBattleInfoEssentials](./CBattleInfoEssentials.md): 战斗信息基础接口
- [BattleHex](./BattleHex.md): 战斗格子
- [CStack](../entities/CStack.md): 战斗堆栈
- [CObstacleInstance](./CObstacleInstance.md): 障碍物实例
- [ReachabilityInfo](./ReachabilityInfo.md): 可达性信息
- [BattleAttackInfo](./BattleAttackInfo.md): 战斗攻击信息
- [SpellCastEnvironment](../spells/SpellCastEnvironment.md): 法术施放环境
- [CSpell](../entities/CSpell.md): 法术类
- [IBonusBearer](../bonuses/IBonusBearer.md): 奖励承载者接口

## 函数注释

- `battleIsFinished()`: 检查战斗是否结束，返回胜利方或平局
- `battleGetAllObstaclesOnPos()`: 获取指定位置的所有障碍物
- `getAllAffectedObstaclesByStack()`: 获取指定单位经过路径影响的障碍物
- `handleObstacleTriggersForUnit()`: 处理单位触发的障碍物效果
- `battleGetStackByPos()`: 获取指定位置的堆栈
- `battleGetUnitByPos()`: 获取指定位置的单位
- `battleAliveUnits()`: 获取所有存活单位
- `battleGetTurnOrder()`: 获取单位行动顺序
- `battleGetAvailableHexes()`: 获取可用的移动格子
- `battleGetOccupiableHexes()`: 获取可占据的格子
- `battleCanAttackHex()`: 检查单位能否攻击指定格子
- `battleCanShoot()`: 检查单位能否射击
- `battleEstimateDamage()`: 估算伤害范围
- `getSpellEffectValue()`: 获取法术效果值
- `battleCanCastSpell()`: 检查能否施放法术
- `getReachability()`: 获取可达性信息
- `getAccessibility()`: 获取可访问性信息