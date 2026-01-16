# IBattleState接口

IBattleState接口是VCMI战斗系统中用于管理战斗状态的接口，继承自IBattleInfo接口，提供了战斗状态变更的操作方法。

## 接口定义

```cpp
class DLL_LINKAGE IBattleInfo : public IConstBonusProvider
{
public:
    using ObstacleCList = std::vector<std::shared_ptr<const CObstacleInstance>>; // 障碍物列表类型

    virtual ~IBattleInfo() = default; // 虚析构函数

    virtual BattleID getBattleID() const = 0; // 获取战斗ID

    virtual int32_t getActiveStackID() const = 0; // 获取活动堆栈ID

    virtual TStacks getStacksIf(const TStackFilter & predicate) const = 0; // 根据条件获取堆栈
    virtual battle::Units getUnitsIf(const battle::UnitFilter & predicate) const = 0; // 根据条件获取单位

    virtual BattleField getBattlefieldType() const = 0; // 获取战场类型
    virtual TerrainId getTerrainType() const = 0;       // 获取地形类型

    virtual ObstacleCList getAllObstacles() const = 0;  // 获取所有障碍

    virtual const CGTownInstance * getDefendedTown() const = 0; // 获取被防守的城镇
    virtual EWallState getWallState(EWallPart partOfWall) const = 0; // 获取城墙状态
    virtual EGateState getGateState() const = 0; // 获取城门状态

    virtual PlayerColor getSidePlayer(BattleSide side) const = 0;      // 获取某方玩家
    virtual const CArmedInstance * getSideArmy(BattleSide side) const = 0; // 获取某方军队
    virtual const CGHeroInstance * getSideHero(BattleSide side) const = 0; // 获取某方英雄
    /// 返回指定方使用的法术列表（可被对方英雄学习）
    virtual std::vector<SpellID> getUsedSpells(BattleSide side) const = 0;

    virtual int32_t getCastSpells(BattleSide side) const = 0;      // 获取已施放法术数
    virtual int32_t getEnchanterCounter(BattleSide side) const = 0; // 获取附魔师计数

    virtual ui8 getTacticDist() const = 0;      // 获取战术距离
    virtual BattleSide getTacticsSide() const = 0; // 获取战术方

    virtual uint32_t nextUnitId() const = 0; // 获取下一个单位ID

    virtual int64_t getActualDamage(const DamageRange & damage, int32_t attackerCount, vstd::RNG & rng) const = 0; // 获取实际伤害

    virtual int3 getLocation() const = 0; // 获取位置
    virtual BattleLayout getLayout() const = 0; // 获取布局
};

class DLL_LINKAGE IBattleState : public IBattleInfo
{
public:
    virtual void nextRound() = 0; // 进入下一回合
    virtual void nextTurn(uint32_t unitId, BattleUnitTurnReason reason) = 0; // 进入下一单位回合

    virtual void addUnit(uint32_t id, const JsonNode & data) = 0; // 添加单位
    virtual void setUnitState(uint32_t id, const JsonNode & data, int64_t healthDelta) = 0; // 设置单位状态
    virtual void moveUnit(uint32_t id, const BattleHex & destination) = 0; // 移动单位
    virtual void removeUnit(uint32_t id) = 0; // 移除单位
    virtual void updateUnit(uint32_t id, const JsonNode & data) = 0; // 更新单位

    virtual void addUnitBonus(uint32_t id, const std::vector<Bonus> & bonus) = 0; // 添加单位奖励
    virtual void updateUnitBonus(uint32_t id, const std::vector<Bonus> & bonus) = 0; // 更新单位奖励
    virtual void removeUnitBonus(uint32_t id, const std::vector<Bonus> & bonus) = 0; // 移除单位奖励

    virtual void setWallState(EWallPart partOfWall, EWallState state) = 0; // 设置城墙状态

    virtual void addObstacle(const ObstacleChanges & changes) = 0; // 添加障碍
    virtual void updateObstacle(const ObstacleChanges & changes) = 0; // 更新障碍
    virtual void removeObstacle(uint32_t id) = 0; // 移除障碍
};
```

## 功能说明

IBattleState是VCMI战斗系统中用于管理战斗状态的核心接口，它扩展了IBattleInfo接口，增加了修改战斗状态的方法。IBattleInfo提供了获取战斗信息的方法，而IBattleState在此基础上提供了改变战斗状态的方法，包括单位操作、奖励管理、障碍物操作等。

## IBattleInfo函数注释

- `getBattleID()`: 获取当前战斗的唯一标识ID
- `getActiveStackID()`: 获取当前活动堆栈的ID
- `getStacksIf(predicate)`: 根据过滤条件获取匹配的堆栈列表
- `getUnitsIf(predicate)`: 根据过滤条件获取匹配的单位列表
- `getBattlefieldType()`: 获取战场类型
- `getTerrainType()`: 获取地形类型
- `getAllObstacles()`: 获取所有障碍物
- `getDefendedTown()`: 获取被防守的城镇实例
- `getWallState(partOfWall)`: 获取城墙指定部分的状态
- `getGateState()`: 获取城门状态
- `getSidePlayer(side)`: 获取指定方的玩家颜色
- `getSideArmy(side)`: 获取指定方的军队实例
- `getSideHero(side)`: 获取指定方的英雄实例
- `getUsedSpells(side)`: 获取指定方已使用的法术列表
- `getCastSpells(side)`: 获取指定方已施放的法术数量
- `getEnchanterCounter(side)`: 获取指定方的附魔师计数
- `getTacticDist()`: 获取战术阶段的距离
- `getTacticsSide()`: 获取当前处于战术阶段的一方
- `nextUnitId()`: 获取下一个可用的单位ID
- `getActualDamage(damage, attackerCount, rng)`: 根据伤害范围、攻击者数量和随机数生成器计算实际伤害
- `getLocation()`: 获取战斗发生的位置
- `getLayout()`: 获取战斗布局

## IBattleState函数注释

- `nextRound()`: 进入下一战斗回合
- `nextTurn(unitId, reason)`: 进入指定单位的回合，提供回合切换的原因
- `addUnit(id, data)`: 添加一个新的战斗单位
- `setUnitState(id, data, healthDelta)`: 设置单位状态并更新生命值
- `moveUnit(id, destination)`: 移动指定单位到目标位置
- `removeUnit(id)`: 从战斗中移除指定单位
- `updateUnit(id, data)`: 更新指定单位的信息
- `addUnitBonus(id, bonus)`: 为指定单位添加奖励
- `updateUnitBonus(id, bonus)`: 更新指定单位的奖励
- `removeUnitBonus(id, bonus)`: 移除指定单位的奖励
- `setWallState(partOfWall, state)`: 设置城墙指定部分的状态
- `addObstacle(changes)`: 添加障碍物
- `updateObstacle(changes)`: 更新障碍物
- `removeObstacle(id)`: 移除指定ID的障碍物

## 类型别名

- `ObstacleCList`: 障碍物常量指针向量的类型别名

## 设计说明

IBattleState接口是战斗状态管理的核心，它分离了战斗状态的读取和修改操作。IBattleInfo接口提供只读访问，而IBattleState接口提供状态修改功能。这种设计使得系统可以更好地控制战斗状态的变更，确保只有适当的组件能够修改战斗状态，提高了系统的安全性。