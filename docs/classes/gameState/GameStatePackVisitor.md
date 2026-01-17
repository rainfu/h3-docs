# GameStatePackVisitor

## 源文件

[GameStatePackVisitor.h](https://github.com/vcmi/vcmi/blob/master/lib/gameState/GameStatePackVisitor.h)

## 概述

`GameStatePackVisitor.h` 定义了两个访问者类，用于处理网络数据包并更新游戏状态。这些类实现了访问者模式，用于将网络包中的数据应用到游戏状态中。

## 类定义

### GameStatePackVisitor

```cpp
class GameStatePackVisitor final : public ICPackVisitor
```

`GameStatePackVisitor` 是游戏状态包访问者，负责处理各种游戏状态相关的网络数据包并更新 `CGameState`。

**继承关系:**
- 继承自 `ICPackVisitor`
- 使用 `final` 关键字，禁止进一步继承

**成员变量:**
- `CGameState & gs` - 引用的游戏状态对象

**构造函数:**
- `GameStatePackVisitor(CGameState & gs)` - 构造函数，接收游戏状态引用

**主要方法:**
- `void restorePreBattleState(BattleID battleID)` - 恢复战斗前的状态

**访问者方法:**
该类实现了大量 `visit*` 方法，每个方法处理特定类型的网络包：

**资源和属性相关:**
- `visitSetResources` - 设置资源
- `visitSetPrimarySkill` - 设置主要技能
- `visitSetHeroExperience` - 设置英雄经验
- `visitGiveStackExperience` - 给予部队经验
- `visitSetSecSkill` - 设置次要技能
- `visitSetMana` - 设置法力
- `visitSetMovePoints` - 设置移动点

**英雄相关:**
- `visitHeroVisitCastle` - 英雄访问城堡
- `visitHeroVisit` - 英雄访问
- `visitHeroRecruited` - 英雄被招募
- `visitGiveHero` - 给予英雄
- `visitHeroLevelUp` - 英雄升级
- `visitSetAvailableHero` - 设置可用英雄

**部队相关:**
- `visitChangeStackCount` - 改变部队数量
- `visitSetStackType` - 设置部队类型
- `visitEraseStack` - 删除部队
- `visitSwapStacks` - 交换部队
- `visitInsertNewStack` - 插入新部队
- `visitRebalanceStacks` - 重新平衡部队
- `visitBulkRebalanceStacks` - 批量重新平衡部队

**神器相关:**
- `visitGrowUpArtifact` - 神器成长
- `visitPutArtifact` - 放置神器
- `visitBulkEraseArtifacts` - 批量删除神器
- `visitBulkMoveArtifacts` - 批量移动神器
- `visitAssembledArtifact` - 组装神器
- `visitDisassembledArtifact` - 拆卸神器
- `visitDischargeArtifact` - 释放神器
- `visitNewArtifact` - 新神器
- `visitChangeArtifactsCostume` - 改变神器外观

**战斗相关:**
- `visitBattleStart` - 战斗开始
- `visitBattleSetActiveStack` - 设置战斗活跃部队
- `visitBattleTriggerEffect` - 触发战斗效果
- `visitBattleAttack` - 战斗攻击
- `visitBattleSpellCast` - 战斗法术施放
- `visitBattleStackMoved` - 战斗部队移动
- `visitBattleUnitsChanged` - 战斗单位改变
- `visitBattleObstaclesChanged` - 战斗障碍物改变
- `visitBattleUpdateGateState` - 更新城门状态
- `visitBattleSetStackProperty` - 设置部队属性
- `visitBattleNextRound` - 下一回合
- `visitBattleCancelled` - 战斗取消
- `visitBattleResultsApplied` - 战斗结果应用
- `visitBattleEnded` - 战斗结束
- `visitBattleResultAccepted` - 战斗结果接受

**游戏流程相关:**
- `visitNewTurn` - 新回合
- `visitPlayerEndsTurn` - 玩家结束回合
- `visitPlayerEndsGame` - 玩家结束游戏
- `visitPlayerStartsTurn` - 玩家开始回合
- `visitTurnTimeUpdate` - 回合时间更新
- `visitDaysWithoutTown` - 无城镇天数
- `visitPlayerCheated` - 玩家作弊

**地图和对象相关:**
- `visitFoWChange` - 视野改变
- `visitChangeObjPos` - 改变对象位置
- `visitRemoveObject` - 移除对象
- `visitTryMoveHero` - 尝试移动英雄
- `visitNewObject` - 新对象
- `visitSetObjectProperty` - 设置对象属性
- `visitChangeObjectVisitors` - 改变对象访问者

**城镇相关:**
- `visitNewStructures` - 新建筑
- `visitRazeStructures` - 摧毁建筑
- `visitSetAvailableCreatures` - 设置可用生物
- `visitSetHeroesInTown` - 设置城镇中的英雄
- `visitChangeTownName` - 改变城镇名称

**其他:**
- `visitGiveBonus` - 给予加成
- `visitRemoveBonus` - 移除加成
- `visitSetResearchedSpells` - 设置已研究法术
- `visitChangeSpells` - 改变法术
- `visitSetAvailableArtifacts` - 设置可用神器
- `visitEntitiesChanged` - 实体改变
- `visitSetCommanderProperty` - 设置指挥官属性
- `visitCommanderLevelUp` - 指挥官升级
- `visitAddQuest` - 添加任务
- `visitChangeFormation` - 改变阵型
- `visitStartAction` - 开始行动
- `visitSetRewardableConfiguration` - 设置可奖励配置

### BattleStatePackVisitor

```cpp
class DLL_LINKAGE BattleStatePackVisitor final : public ICPackVisitor
```

`BattleStatePackVisitor` 是战斗状态包访问者，专门处理战斗相关的网络数据包。

**继承关系:**
- 继承自 `ICPackVisitor`
- 使用 `final` 关键字，禁止进一步继承

**成员变量:**
- `IBattleState & battleState` - 引用的战斗状态对象

**构造函数:**
- `BattleStatePackVisitor(IBattleState & battleState)` - 构造函数，接收战斗状态引用

**访问者方法:**
- `visitSetStackEffect` - 设置部队效果
- `visitStacksInjured` - 部队受伤
- `visitBattleUnitsChanged` - 战斗单位改变
- `visitBattleObstaclesChanged` - 战斗障碍物改变
- `visitCatapultAttack` - 投石车攻击
- `visitBattleStackMoved` - 战斗部队移动

## 设计特点

- **访问者模式**: 使用访问者模式处理不同类型的网络包
- **状态同步**: 确保客户端和服务器之间的游戏状态同步
- **模块化设计**: 将游戏状态和战斗状态的包处理分离
- **全面覆盖**: 支持几乎所有类型的游戏事件和状态变化
- **不可继承**: 使用 `final` 确保实现不会被意外修改