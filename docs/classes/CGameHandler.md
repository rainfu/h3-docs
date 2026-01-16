# CGameHandler

游戏处理器类，VCMI服务器的核心组件，负责处理所有游戏逻辑和状态管理。

## 概述

`CGameHandler` 是VCMI游戏服务器的核心类，继承自 `Environment` 和 `IGameEventCallback`。它是游戏逻辑的主要处理器，负责管理游戏状态、处理玩家操作、协调战斗、处理事件等所有核心游戏功能。

## 主要属性
- `heroPool`: 英雄池处理器
- `battles`: 战斗处理器
- `queries`: 查询处理器
- `turnOrder`: 回合顺序处理器
- `turnTimerHandler`: 回合计时器处理器
- `newTurnProcessor`: 新回合处理器
- `randomizer`: 游戏随机化器
- `statistics`: 统计数据集
- `spellEnv`: 法术施放环境
- `gs`: 游戏状态

## 核心方法
- `void startBattle(...)`: 开始战斗
- `bool moveHero(...)`: 移动英雄
- `void giveHeroBonus(...)`: 给予英雄奖励
- `void changePrimSkill(...)`: 改变主要技能
- `void changeSecSkill(...)`: 改变次要技能
- `void giveResource(...)`: 给予资源
- `void giveCreatures(...)`: 给予生物
- `bool moveStack(...)`: 移动部队
- `void castSpell(...)`: 施放法术

## 依赖关系
- 继承：`Environment`, `IGameEventCallback`
- 关联：`CGameState`, `BattleProcessor`, `QueriesProcessor`
- 使用：所有游戏逻辑模块和服务

## 用途
- 游戏逻辑处理：处理所有玩家操作和游戏事件
- 状态管理：维护和更新游戏状态
- 战斗协调：管理战斗流程和结果
- 事件处理：响应各种游戏事件
- 网络通信：处理客户端请求和服务器响应

## 实现说明
- 组合模式：通过多个专用处理器组合功能
- 事件驱动：基于回调机制处理游戏事件
- 线程安全：处理并发游戏操作
- 状态一致性：确保游戏状态的完整性和一致性