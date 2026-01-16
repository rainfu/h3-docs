# IBattleInfoCallback接口

IBattleInfoCallback接口是VCMI战斗系统中用于获取战斗信息的回调接口，继承自IConstBonusProvider，为战斗相关的查询提供统一的接口。

## 接口定义

```cpp
class DLL_LINKAGE IBattleInfoCallback : public IConstBonusProvider
{
public:
#if SCRIPTING_ENABLED
    virtual scripting::Pool * getContextPool() const = 0; // 获取脚本上下文池
#endif
    virtual ~IBattleInfoCallback() = default; // 虚析构函数

    virtual const IBattleInfo * getBattle() const = 0; // 获取战斗信息
    virtual std::optional<PlayerColor> getPlayerID() const = 0; // 获取玩家ID

    virtual TerrainId battleTerrainType() const = 0; // 获取战斗地形类型
    virtual BattleField battleGetBattlefieldType() const = 0; // 获取战场类型

    /// 如果战斗正在进行中则返回none；否则返回胜利方(0/1)或平局(2)
    virtual std::optional<BattleSide> battleIsFinished() const = 0;

    virtual si8 battleTacticDist() const = 0; // 获取当前战术阶段的距离；如果不在战术阶段则为0
    virtual BattleSide battleGetTacticsSide() const = 0; // 获取处于战术阶段的一方，如果无战术阶段则未定义

    virtual uint32_t battleNextUnitId() const = 0; // 获取下一个单位ID

    virtual battle::Units battleGetUnitsIf(const battle::UnitFilter & predicate) const = 0; // 根据条件获取单位

    virtual const battle::Unit * battleGetUnitByID(uint32_t ID) const = 0; // 根据ID获取单位
    virtual const battle::Unit * battleGetUnitByPos(const BattleHex & pos, bool onlyAlive = true) const = 0; // 根据位置获取单位

    virtual const battle::Unit * battleActiveUnit() const = 0; // 获取当前活动单位

    // 阻塞障碍使地块不可通行，其他障碍造成特殊效果（如地雷、护城河、流沙）
    virtual std::vector<std::shared_ptr<const CObstacleInstance>> battleGetAllObstaclesOnPos(const BattleHex & tile, bool onlyBlocking = true) const = 0; // 获取指定位置上的所有障碍
    virtual std::vector<std::shared_ptr<const CObstacleInstance>> getAllAffectedObstaclesByStack(const battle::Unit * unit, const BattleHexArray & passed) const = 0; // 获取单位路径上所有受影响的障碍
};

// 辅助结构体
struct DamageRange
{
    int64_t min = 0; // 最小伤害
    int64_t max = 0; // 最大伤害
};

struct DamageEstimation
{
    DamageRange damage; // 伤害范围
    DamageRange kills;  // 杀敌数量范围
};
```

## 功能说明

IBattleInfoCallback是VCMI战斗系统中用于获取战斗信息的核心接口。它继承自IConstBonusProvider，为战斗相关的查询提供统一的接口。该接口定义了获取战斗状态、单位信息、地形信息、障碍信息等的方法，是战斗逻辑与信息提供者之间的桥梁。

## 函数注释

- `getContextPool()`: 获取脚本上下文池，用于脚本执行
- `getBattle()`: 获取当前战斗信息对象
- `getPlayerID()`: 获取当前玩家ID
- `battleTerrainType()`: 获取当前战斗的地形类型
- `battleGetBattlefieldType()`: 获取战场类型
- `battleIsFinished()`: 判断战斗是否结束，如果正在进行中返回none，否则返回胜利方或平局
- `battleTacticDist()`: 获取当前战术阶段的距离，如果不在战术阶段则返回0
- `battleGetTacticsSide()`: 获取当前处于战术阶段的一方，如果无战术阶段则返回未定义值
- `battleNextUnitId()`: 获取下一个可用的单位ID
- `battleGetUnitsIf(predicate)`: 根据过滤条件获取匹配的单位列表
- `battleGetUnitByID(ID)`: 根据ID获取单位
- `battleGetUnitByPos(pos, onlyAlive)`: 根据位置获取单位，可以选择是否只获取存活单位
- `battleActiveUnit()`: 获取当前活动的战斗单位
- `battleGetAllObstaclesOnPos(tile, onlyBlocking)`: 获取指定位置上的所有障碍，可以选择是否只获取阻塞类障碍
- `getAllAffectedObstaclesByStack(unit, passed)`: 获取单位路径上所有受影响的障碍

## 辅助结构体

- `DamageRange`: 表示伤害范围，包含最小值和最大值
- `DamageEstimation`: 表示伤害估算，包含伤害范围和杀敌数量范围

## 设计说明

IBattleInfoCallback接口是战斗系统的核心组件，它抽象了战斗信息的获取方式，使得不同的实现可以提供不同来源的战斗信息。该接口不仅提供了基础的战斗状态查询，还包括了复杂的单位和障碍信息查询，为战斗逻辑提供了全面的信息支持。