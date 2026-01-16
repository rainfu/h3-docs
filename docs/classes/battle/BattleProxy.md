# BattleProxy类

BattleProxy类是VCMI战斗系统中的代理类，继承自CBattleInfoCallback和IBattleState，用于封装和转发战斗相关信息的查询请求。

## 类定义

```cpp
class DLL_LINKAGE BattleProxy : public CBattleInfoCallback, public IBattleState
{
public:
    using Subject = std::shared_ptr<CBattleInfoCallback>; // 主题类型定义

    BattleProxy(Subject subject_); // 构造函数
    ~BattleProxy();               // 析构函数

    //////////////////////////////////////////////////////////////////////////
    // IBattleInfo 接口方法
    const IBattleInfo * getBattle() const override; // 获取战斗信息
    std::optional<PlayerColor> getPlayerID() const override; // 获取玩家ID

    int32_t getActiveStackID() const override; // 获取活动堆栈ID

    TStacks getStacksIf(const TStackFilter & predicate) const override; // 根据条件获取堆栈
    battle::Units getUnitsIf(const battle::UnitFilter & predicate) const override; // 根据条件获取单位

    BattleField getBattlefieldType() const override; // 获取战场类型
    TerrainId getTerrainType() const override;       // 获取地形类型

    ObstacleCList getAllObstacles() const override;  // 获取所有障碍

    PlayerColor getSidePlayer(BattleSide side) const override;      // 获取某方玩家
    const CArmedInstance * getSideArmy(BattleSide side) const override; // 获取某方军队
    const CGHeroInstance * getSideHero(BattleSide side) const override; // 获取某方英雄

    ui8 getTacticDist() const override;      // 获取战术距离
    BattleSide getTacticsSide() const override; // 获取战术方

    const CGTownInstance * getDefendedTown() const override; // 获取防守的城镇
    EWallState getWallState(EWallPart partOfWall) const override; // 获取城墙状态
    EGateState getGateState() const override; // 获取城门状态

    int32_t getCastSpells(BattleSide side) const override;      // 获取已施放法术数
    int32_t getEnchanterCounter(BattleSide side) const override; // 获取附魔师计数

    const IBonusBearer * getBonusBearer() const override; // 获取奖励承载者

protected:
    Subject subject; // 被代理的主题对象
};
```

## 功能说明

BattleProxy是VCMI战斗系统中的代理类，实现了CBattleInfoCallback和IBattleState接口。它通过持有另一个CBattleInfoCallback对象的引用来转发请求，这样可以在不修改原始对象的情况下添加额外的功能或控制对原始对象的访问。

## 构造函数

- `BattleProxy(subject_)`: 用一个CBattleInfoCallback对象构造代理
- `~BattleProxy()`: 析构函数

## 函数注释

- `getBattle()`: 获取战斗信息对象
- `getPlayerID()`: 获取当前玩家ID
- `getActiveStackID()`: 获取当前活动堆栈的ID
- `getStacksIf(predicate)`: 根据过滤条件获取匹配的堆栈列表
- `getUnitsIf(predicate)`: 根据过滤条件获取匹配的单位列表
- `getBattlefieldType()`: 获取战场类型
- `getTerrainType()`: 获取地形类型
- `getAllObstacles()`: 获取所有障碍物信息
- `getSidePlayer(side)`: 获取指定方的玩家颜色
- `getSideArmy(side)`: 获取指定方的军队实例
- `getSideHero(side)`: 获取指定方的英雄实例
- `getTacticDist()`: 获取战术阶段的距离限制
- `getTacticsSide()`: 获取当前战术阶段的执行方
- `getDefendedTown()`: 获取被防守的城镇实例
- `getWallState(partOfWall)`: 获取城墙指定部分的状态
- `getGateState()`: 获取城门状态
- `getCastSpells(side)`: 获取指定方已施放的法术数量
- `getEnchanterCounter(side)`: 获取指定方的附魔师计数
- `getBonusBearer()`: 获取奖励承载者对象

## 成员变量

- `subject`: 被代理的CBattleInfoCallback对象的智能指针

## 设计说明

BattleProxy类使用代理模式，将所有IBattleInfo和IBattleState接口的方法调用转发到内部持有的subject对象。这种设计允许在不修改原始对象的情况下添加额外的功能，如缓存、权限控制或日志记录等。它在战斗系统中提供了灵活性，可以在不影响原始战斗信息回调对象的情况下注入额外的逻辑。