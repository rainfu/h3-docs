# CBattleInfoEssentials类

CBattleInfoEssentials类是VCMI战斗系统中的核心类，继承自IBattleInfoCallback接口，提供了战斗信息查询的基本实现。

## 类定义

```cpp
class DLL_LINKAGE CBattleInfoEssentials : public IBattleInfoCallback
{
protected:
    bool battleDoWeKnowAbout(BattleSide side) const; // 检查是否知道指定方的信息

public:
    enum EStackOwnership // 堆栈所有权枚举
    {
        ONLY_MINE,       // 仅我的
        ONLY_ENEMY,      // 仅敌人
        MINE_AND_ENEMY   // 我的和敌人的
    };

    bool duringBattle() const; // 检查是否正在进行战斗
    BattleSide battleGetMySide() const; // 获取我的阵营
    const IBonusBearer * getBonusBearer() const override; // 获取奖励承载者

    TerrainId battleTerrainType() const override; // 获取战斗地形类型
    BattleField battleGetBattlefieldType() const override; // 获取战场类型
    int32_t battleGetEnchanterCounter(BattleSide side) const; // 获取附魔师计数

    int32_t nextObstacleId() const; // 返回下一个可用障碍ID
    std::vector<std::shared_ptr<const CObstacleInstance>> battleGetAllObstacles(std::optional<BattleSide> perspective = std::nullopt) const; // 获取所有障碍
    std::shared_ptr<const CObstacleInstance> battleGetObstacleByID(uint32_t ID) const; // 根据ID获取障碍

    TStacks battleGetStacksIf(const TStackFilter & predicate) const; // 根据条件获取堆栈（已弃用）
    battle::Units battleGetUnitsIf(const battle::UnitFilter & predicate) const override; // 根据条件获取单位

    const battle::Unit * battleGetUnitByID(uint32_t ID) const override; // 根据ID获取单位
    const battle::Unit * battleActiveUnit() const override; // 获取当前活动单位
    uint32_t battleNextUnitId() const override; // 获取下一个单位ID

    bool battleHasNativeStack(BattleSide side) const; // 检查指定方是否有原生堆栈
    const CGTownInstance * battleGetDefendedTown() const; // 获取被防守的城镇

    si8 battleTacticDist() const override; // 获取战术距离
    BattleSide battleGetTacticsSide() const override; // 获取战术方

    bool battleCanFlee(const PlayerColor & player) const; // 检查玩家是否可以逃跑
    bool battleCanSurrender(const PlayerColor & player) const; // 检查玩家是否可以投降

    static BattleSide otherSide(BattleSide side); // 获取另一方
    PlayerColor otherPlayer(const PlayerColor & player) const; // 获取另一玩家
    BattleSide playerToSide(const PlayerColor & player) const; // 将玩家转换为阵营
    PlayerColor sideToPlayer(BattleSide side) const; // 将阵营转换为玩家
    bool playerHasAccessToHeroInfo(const PlayerColor & player, const CGHeroInstance * h) const; // 检查玩家是否可以访问英雄信息
    TownFortifications battleGetFortifications() const; // 获取城镇防御工事
    bool battleHasHero(BattleSide side) const; // 检查指定方是否有英雄
    int32_t battleCastSpells(BattleSide side) const; // 获取指定方已施放的法术数量
    const CGHeroInstance * battleGetFightingHero(BattleSide side) const; // 获取战斗中的英雄
    const CArmedInstance * battleGetArmyObject(BattleSide side) const; // 获取军队对象
    InfoAboutHero battleGetHeroInfo(BattleSide side) const; // 获取英雄信息

    // 获取城墙各部分的状态：参数 [0] - 城堡，[1] - 底部塔楼，[2] - 底部城墙，
    // [3] - 城门下方，[4] - 城门上方，[5] - 上部城墙，[6] - 上部塔楼，[7] - 城门；返回值：1 - 完好，2 - 受损，3 - 毁坏；0 - 无战斗
    EWallState battleGetWallState(EWallPart partOfWall) const;
    EGateState battleGetGateState() const; // 获取城门状态
    bool battleIsGatePassable() const; // 检查城门是否可通过

    // 辅助方法
    TStacks battleGetAllStacks(bool includeTurrets = false) const; // 获取所有堆栈（包括活着的、死的、不死的或机械的）
    battle::Units battleGetAllUnits(bool includeTurrets = false) const; // 获取所有单位

    const CStack * battleGetStackByID(int ID, bool onlyAlive = true) const; // 根据ID获取堆栈
    bool battleIsObstacleVisibleForSide(const CObstacleInstance & coi, BattleSide side) const; // 检查障碍对指定方是否可见

    PlayerColor battleGetOwner(const battle::Unit * unit) const; // 获取单位的所有者（包括精神控制）
    const CGHeroInstance * battleGetOwnerHero(const battle::Unit * unit) const; // 获取单位的英雄所有者（包括精神控制）

    // 检查攻击者和防御者是否为同一玩家或不同玩家，取决于positivness参数
    // 包括精神控制
    bool battleMatchOwner(const battle::Unit * attacker, const battle::Unit * defender, const boost::logic::tribool positivness = false) const;
    bool battleMatchOwner(const PlayerColor & attacker, const battle::Unit * defender, const boost::logic::tribool positivness = false) const;
};
```

## 功能说明

CBattleInfoEssentials是VCMI战斗系统中的核心类，它实现了IBattleInfoCallback接口，提供了战斗信息查询的基本实现。这个类封装了战斗中所有基本的信息查询方法，是战斗逻辑中访问战斗状态的主要接口。

## 枚举

- `EStackOwnership`: 堆栈所有权枚举，定义了堆栈归属的类型（仅我的、仅敌人的、我的和敌人的）

## 函数注释

- `duringBattle()`: 检查战斗是否正在进行中
- `battleGetMySide()`: 获取当前玩家所处的战斗阵营
- `getBonusBearer()`: 获取战斗奖励承载者对象
- `battleTerrainType()`: 获取战斗发生的地形类型
- `battleGetBattlefieldType()`: 获取战场类型
- `battleGetEnchanterCounter(side)`: 获取指定方的附魔师计数
- `nextObstacleId()`: 获取下一个可用的障碍ID
- `battleGetAllObstacles(perspective)`: 获取战场上的所有障碍物
- `battleGetObstacleByID(ID)`: 根据ID获取特定障碍物
- `battleGetStacksIf(predicate)`: 根据条件获取符合条件的堆栈（已弃用）
- `battleGetUnitsIf(predicate)`: 根据条件获取符合条件的单位
- `battleGetUnitByID(ID)`: 根据ID获取单位
- `battleActiveUnit()`: 获取当前活动的战斗单位
- `battleNextUnitId()`: 获取下一个单位ID
- `battleHasNativeStack(side)`: 检查指定阵营是否有原生堆栈
- `battleGetDefendedTown()`: 如果当前战斗是围攻战，返回被防守的城镇
- `battleTacticDist()`: 获取战术阶段的距离
- `battleGetTacticsSide()`: 获取处于战术阶段的一方
- `battleCanFlee(player)`: 检查指定玩家是否可以逃跑
- `battleCanSurrender(player)`: 检查指定玩家是否可以投降
- `otherSide(side)`: 获取与指定方相对的另一方
- `otherPlayer(player)`: 获取与指定玩家相对的另一玩家
- `playerToSide(player)`: 将玩家颜色转换为战斗阵营
- `sideToPlayer(side)`: 将战斗阵营转换为玩家颜色
- `playerHasAccessToHeroInfo(player, hero)`: 检查玩家是否可以访问指定英雄的信息
- `battleGetFortifications()`: 获取城镇防御工事信息
- `battleHasHero(side)`: 检查指定方是否有英雄
- `battleCastSpells(side)`: 获取指定方已施放的法术数量
- `battleGetFightingHero(side)`: 获取战斗中的英雄实例
- `battleGetArmyObject(side)`: 获取指定方的军队对象
- `battleGetHeroInfo(side)`: 获取指定方的英雄信息
- `battleGetWallState(partOfWall)`: 获取城墙指定部分的状态
- `battleGetGateState()`: 获取城门状态
- `battleIsGatePassable()`: 检查城门是否可以通过
- `battleGetAllStacks(includeTurrets)`: 获取所有堆栈（包括活着的、死的、不死的或机械的）
- `battleGetAllUnits(includeTurrets)`: 获取所有单位
- `battleGetStackByID(ID, onlyAlive)`: 根据ID获取堆栈
- `battleIsObstacleVisibleForSide(obstacle, side)`: 检查障碍对指定方是否可见
- `battleGetOwner(unit)`: 获取单位的所有者（包括精神控制）
- `battleGetOwnerHero(unit)`: 获取单位的英雄所有者（包括精神控制）
- `battleMatchOwner(attacker, defender, positivness)`: 检查攻击者和防御者是否为同一玩家或不同玩家

## 设计说明

CBattleInfoEssentials类是战斗系统的核心组件，它为战斗逻辑提供了统一的接口来查询战斗状态。通过继承IBattleInfoCallback，它确保了与战斗系统其他部分的兼容性。该类提供了全面的战斗信息访问方法，涵盖了单位、障碍、地形、城墙、英雄等多个方面，是战斗AI和战斗界面获取战斗数据的主要途径。