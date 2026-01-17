<!-- 来源: E:\develop\heroes\vcmi\lib\callback\IBattleEventsReceiver.h -->
# IBattleEventsReceiver接口

IBattleEventsReceiver接口定义了VCMI战斗系统中事件接收的抽象接口。它提供了战斗过程中各种事件的回调方法，允许观察者和控制器响应战斗状态变化。

## 接口定义

```cpp
class DLL_LINKAGE IBattleEventsReceiver
```

## 概述

IBattleEventsReceiver是战斗事件系统的核心接口，定义了从战斗开始到结束整个过程中所有重要事件的回调方法。这些事件包括动作执行、伤害计算、法术施放、回合变化等。

## 事件回调方法

### 动作相关事件
- `void actionFinished(const BattleID & battleID, const BattleAction & action)`: 动作完成后调用
- `void actionStarted(const BattleID & battleID, const BattleAction & action)`: 动作开始前调用

### 攻击相关事件
- `void battleAttack(const BattleID & battleID, const BattleAttack * ba)`: 部队执行攻击时调用
- `void battleStacksAttacked(const BattleID & battleID, const std::vector<BattleStackAttacked> & bsa, bool ranged)`: 部队受到伤害时调用

### 战斗流程事件
- `void battleEnd(const BattleID & battleID, const BattleResult * br, QueryID queryID)`: 战斗结束时调用
- `void battleNewRoundFirst(const BattleID & battleID)`: 每回合开始前调用
- `void battleNewRound(const BattleID & battleID)`: 每回合开始时调用

### 状态变化事件
- `void battleLogMessage(const BattleID & battleID, const std::vector<MetaString> & lines)`: 战斗日志消息
- `void battleStackMoved(const BattleID & battleID, const CStack * stack, const BattleHexArray & dest, int distance, bool teleport)`: 部队移动时调用

### 法术相关事件
- `void battleSpellCast(const BattleID & battleID, const BattleSpellCast * sc)`: 法术施放时调用

### 效果相关事件
- `void battleStacksEffectsSet(const BattleID & battleID, const SetStackEffect & sse)`: 效果设置到部队时调用
- `void battleTriggerEffect(const BattleID & battleID, const BattleTriggerEffect & bte)`: 触发一次性效果时调用

### 战斗开始事件
- `void battleStartBefore(const BattleID & battleID, const CCreatureSet * army1, const CCreatureSet * army2, int3 tile, const CGHeroInstance * hero1, const CGHeroInstance * hero2)`: 战斗开始前调用
- `void battleStart(const BattleID & battleID, const CCreatureSet * army1, const CCreatureSet * army2, int3 tile, const CGHeroInstance * hero1, const CGHeroInstance * hero2, BattleSide side, bool replayAllowed)`: 战斗开始时调用

### 实体变化事件
- `void battleUnitsChanged(const BattleID & battleID, const std::vector<UnitChanges> & units)`: 战斗单位变化时调用
- `void battleObstaclesChanged(const BattleID & battleID, const std::vector<ObstacleChanges> & obstacles)`: 战斗障碍物变化时调用

### 攻城器械事件
- `void battleCatapultAttacked(const BattleID & battleID, const CatapultAttack & ca)`: 投石车攻击时调用
- `void battleGateStateChanged(const BattleID & battleID, const EGateState state)`: 城门状态变化时调用

## 参数说明

### 核心参数
- `BattleID battleID`: 战斗的唯一标识符
- `BattleAction action`: 战斗动作信息
- `BattleResult *br`: 战斗结果（战斗结束时）
- `QueryID queryID`: 查询ID（战斗结束时）

### 攻击相关
- `BattleAttack *ba`: 攻击信息结构体
- `std::vector<BattleStackAttacked> bsa`: 被攻击部队信息列表
- `bool ranged`: 是否为远程攻击

### 移动相关
- `CStack *stack`: 移动的部队
- `BattleHexArray dest`: 目的地坐标数组
- `int distance`: 移动距离
- `bool teleport`: 是否为传送移动

### 法术相关
- `BattleSpellCast *sc`: 法术施放信息

### 效果相关
- `SetStackEffect sse`: 效果设置信息
- `BattleTriggerEffect bte`: 触发效果信息

### 战斗开始相关
- `CCreatureSet *army1, *army2`: 双方军队
- `int3 tile`: 战斗发生的位置
- `CGHeroInstance *hero1, *hero2`: 双方英雄
- `BattleSide side`: 战斗方（0=左方，1=右方）
- `bool replayAllowed`: 是否允许回放

### 变化相关
- `std::vector<UnitChanges> units`: 单位变化列表
- `std::vector<ObstacleChanges> obstacles`: 障碍物变化列表
- `CatapultAttack ca`: 投石车攻击信息
- `EGateState state`: 城门状态

## 设计模式

IBattleEventsReceiver采用观察者模式，允许多个监听者订阅战斗事件：

```cpp
class MyBattleObserver : public IBattleEventsReceiver
{
    void battleStart(const BattleID & battleID, ...) override
    {
        // 处理战斗开始事件
    }

    void battleAttack(const BattleID & battleID, const BattleAttack *ba) override
    {
        // 处理攻击事件
    }
};
```

## 默认实现

所有方法都有默认的空实现，子类可以选择性重写感兴趣的事件。

## 线程安全

事件回调可能在不同线程中调用，实现类需要考虑线程安全。

## 相关类

- `BattleAction`: 战斗动作
- `BattleAttack`: 攻击信息
- `BattleResult`: 战斗结果
- `BattleSpellCast`: 法术施放
- `SetStackEffect`: 效果设置
- `BattleTriggerEffect`: 触发效果