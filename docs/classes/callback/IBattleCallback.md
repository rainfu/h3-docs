<!-- 来源: E:\develop\heroes\vcmi\lib\callback\IBattleCallback.h -->
# IBattleCallback接口

IBattleCallback接口定义了VCMI战斗系统中回调操作的抽象接口。它提供了处理战斗动作、战术决策和玩家交互的核心方法。

## 接口定义

```cpp
class IBattleCallback
```

## 概述

IBattleCallback是战斗系统的核心回调接口，定义了客户端与服务器之间战斗相关操作的通信协议。它支持法术动作、单位动作、战术动作以及投降/撤退决策。

## 公共属性

- `bool waitTillRealize`: 如果为true，请求函数将在服务器实现后返回
- `bool unlockGsWhenWaiting`: 如果为true，在发送每个请求后，游戏状态互斥锁将被解锁以应用更改

## 纯虚方法

### 战斗动作方法
- `void battleMakeSpellAction(const BattleID & battleID, const BattleAction & action)`: 执行法术动作
- `void battleMakeUnitAction(const BattleID & battleID, const BattleAction & action)`: 执行单位动作
- `void battleMakeTacticAction(const BattleID & battleID, const BattleAction & action)`: 执行战术动作

### 决策方法
- `std::optional<BattleAction> makeSurrenderRetreatDecision(const BattleID & battleID, const BattleStateInfoForRetreat & battleState)`: 做出投降/撤退决策

### 访问器方法
- `std::shared_ptr<CPlayerBattleCallback> getBattle(const BattleID & battleID)`: 获取指定战斗的玩家战斗回调
- `std::optional<PlayerColor> getPlayerID() const`: 获取玩家ID

## 参数说明

### BattleID
战斗的唯一标识符，用于区分不同的战斗实例。

### BattleAction
战斗动作结构体，包含动作类型、执行者、目标等信息。

### BattleStateInfoForRetreat
撤退状态信息结构体，包含当前战斗状态用于决策制定。

## 实现类

IBattleCallback通常由以下类实现：
- 客户端战斗回调类
- AI战斗回调类
- 服务器战斗回调类

## 使用模式

```cpp
// 获取战斗回调
auto battleCallback = gameCallback->getBattle(battleID);

// 执行单位动作
BattleAction action;
action.actionType = EActionType::ATTACK;
// ... 设置其他参数
battleCallback->battleMakeUnitAction(battleID, action);

// 做出撤退决策
auto retreatDecision = battleCallback->makeSurrenderRetreatDecision(battleID, battleState);
if (retreatDecision)
{
    // 执行撤退动作
}
```

## 线程安全

由于涉及游戏状态互斥锁的管理，实现类需要 careful 处理线程同步：
- `waitTillRealize` 控制同步行为
- `unlockGsWhenWaiting` 控制锁的释放时机

## 相关类

- `BattleAction`: 战斗动作结构体
- `BattleStateInfoForRetreat`: 撤退状态信息
- `CPlayerBattleCallback`: 玩家战斗回调类
- `BattleID`: 战斗标识符类型