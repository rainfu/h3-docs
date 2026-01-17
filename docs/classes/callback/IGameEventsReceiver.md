<!-- 来源: E:\develop\heroes\vcmi\lib\callback\IGameEventsReceiver.h -->
# IGameEventsReceiver接口

IGameEventsReceiver接口定义了VCMI游戏中事件接收的抽象接口。它提供了游戏过程中各种状态变化和用户交互事件的回调方法，允许观察者和UI组件响应游戏事件。

## 接口定义

```cpp
class DLL_LINKAGE IGameEventsReceiver
```

## 概述

IGameEventsReceiver是游戏事件系统的核心接口，定义了从游戏开始到结束整个过程中所有重要事件的回调方法。这些事件包括建筑变化、战斗结果、神器操作、英雄移动、UI显示等。

## 建筑和城镇事件

- `void buildChanged(const CGTownInstance *town, BuildingID buildingID, int what)`: 建筑状态改变（1=建造，2=拆除）

## 战斗相关事件

- `void battleResultsApplied()`: 战斗结果应用完成
- `void battleEnded()`: 战斗结束

## 守备变化事件

- `void garrisonsChanged(ObjectInstanceID id1, ObjectInstanceID id2)`: 守备部队变化

## 神器操作事件

- `void artifactPut(const ArtifactLocation &al)`: 神器放置
- `void artifactRemoved(const ArtifactLocation &al)`: 神器移除
- `void artifactAssembled(const ArtifactLocation &al)`: 神器组装
- `void artifactDisassembled(const ArtifactLocation &al)`: 神器拆解
- `void artifactMoved(const ArtifactLocation &src, const ArtifactLocation &dst)`: 神器移动
- `void bulkArtMovementStart(size_t totalNumOfArts, size_t possibleAssemblyNumOfArts)`: 批量神器移动开始
- `void askToAssembleArtifact(const ArtifactLocation & dst)`: 请求组装神器

## 英雄相关事件

### 访问和创建
- `void heroVisit(const CGHeroInstance *visitor, const CGObjectInstance *visitedObj, bool start)`: 英雄访问对象
- `void heroCreated(const CGHeroInstance*)`: 英雄创建
- `void heroInGarrisonChange(const CGTownInstance *town)`: 英雄守备状态改变

### 移动和属性
- `void heroMoved(const TryMoveHero & details, bool verbose = true)`: 英雄移动
- `void heroExperienceChanged(const CGHeroInstance * hero, si64 val)`: 英雄经验改变
- `void heroPrimarySkillChanged(const CGHeroInstance * hero, PrimarySkill which, si64 val)`: 英雄主属性技能改变
- `void heroSecondarySkillChanged(const CGHeroInstance * hero, int which, int val)`: 英雄副属性技能改变
- `void heroManaPointsChanged(const CGHeroInstance * hero)`: 英雄法力点数改变
- `void heroMovePointsChanged(const CGHeroInstance * hero)`: 英雄移动点数改变

### 城镇访问
- `void heroVisitsTown(const CGHeroInstance* hero, const CGTownInstance * town)`: 英雄访问城镇

## 资源和奖励事件

- `void receivedResource()`: 收到资源

## 用户界面事件

### 对话框显示
- `void showInfoDialog(EInfoWindowMode type, const std::string & text, const std::vector<Component> & components, int soundID)`: 显示信息对话框
- `void showRecruitmentDialog(const CGDwelling *dwelling, const CArmedInstance *dst, int level, QueryID queryID)`: 显示招募对话框
- `void showShipyardDialog(const IShipyard *obj)`: 显示船坞对话框

### 窗口显示
- `void showPuzzleMap()`: 显示谜题地图
- `void viewWorldMap()`: 查看世界地图
- `void showMarketWindow(const IMarket * market, const CGHeroInstance * visitor, QueryID queryID)`: 显示市场窗口
- `void showUniversityWindow(const IMarket *market, const CGHeroInstance *visitor, QueryID queryID)`: 显示大学窗口
- `void showHillFortWindow(const CGObjectInstance *object, const CGHeroInstance *visitor)`: 显示丘陵堡窗口
- `void showThievesGuildWindow (const CGObjectInstance * obj)`: 显示盗贼公会窗口
- `void showTavernWindow(const CGObjectInstance * object, const CGHeroInstance * visitor, QueryID queryID)`: 显示酒馆窗口
- `void showQuestLog()`: 显示任务日志

## 法术和魔法事件

- `void advmapSpellCast(const CGHeroInstance * caster, SpellID spellID)`: 冒险地图法术施放

## 地图和视野事件

- `void tileHidden(const FowTilesType &pos)`: 地块隐藏
- `void tileRevealed(const FowTilesType &pos)`: 地块揭示
- `void centerView (int3 pos, int focusTime)`: 居中视图

## 对象和实体事件

- `void newObject(const CGObjectInstance * obj)`: 新对象创建
- `void availableArtifactsChanged(const CGBlackMarket *bm = nullptr)`: 可用神器改变
- `void availableCreaturesChanged(const CGDwelling *town)`: 可用生物改变

## 奖励和效果事件

- `void heroBonusChanged(const CGHeroInstance *hero, const Bonus &bonus, bool gain)`: 英雄奖励改变
- `void playerBonusChanged(const Bonus &bonus, bool gain)`: 玩家奖励改变

## 网络和通信事件

- `void requestSent(const CPackForServer *pack, int requestID)`: 请求发送
- `void requestRealized(PackageApplied *pa)`: 请求实现

## 对象属性事件

- `void beforeObjectPropertyChanged(const SetObjectProperty * sop)`: 对象属性改变前
- `void objectPropertyChanged(const SetObjectProperty * sop)`: 对象属性改变
- `void objectRemoved(const CGObjectInstance *obj, const PlayerColor & initiator)`: 对象移除
- `void objectRemovedAfter()`: 对象移除后

## 游戏流程事件

- `void playerBlocked(int reason, bool start)`: 玩家阻塞（reason: 0=即将战斗）
- `void gameOver(PlayerColor player, const EVictoryLossCheckResult & victoryLossCheckResult)`: 游戏结束
- `void playerStartsTurn(PlayerColor player)`: 玩家回合开始
- `void playerEndsTurn(PlayerColor player)`: 玩家回合结束

## 统计和查询事件

- `void responseStatistic(StatisticDataSet & statistic)`: 响应统计数据
- `void heroExchangeStarted(ObjectInstanceID hero1, ObjectInstanceID hero2, QueryID queryID)`: 英雄交换开始

## 设计模式

IGameEventsReceiver采用观察者模式，允许多个监听者订阅游戏事件：

```cpp
class MyGameObserver : public IGameEventsReceiver
{
    void heroMoved(const TryMoveHero & details, bool verbose) override
    {
        // 处理英雄移动事件
    }

    void battleEnded() override
    {
        // 处理战斗结束事件
    }
};
```

## 默认实现

所有方法都有默认的空实现，子类可以选择性重写感兴趣的事件。

## 线程安全

事件回调可能在不同线程中调用，实现类需要考虑线程安全。

## 相关类

- `CGHeroInstance`: 英雄实例
- `CGTownInstance`: 城镇实例
- `ArtifactLocation`: 神器位置
- `Bonus`: 奖励结构体
- `TryMoveHero`: 英雄移动尝试结构体