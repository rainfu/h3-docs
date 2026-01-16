# CGameInterface类

CGameInterface类是VCMI系统中用于管理人类玩家/AI界面逻辑的核心类。它继承自CBattleGameInterface和IGameEventsReceiver，提供游戏事件处理和玩家交互功能。

## 类定义

```cpp
class BattleStateInfoForRetreat;
struct ObjectPosInfo;

class CCallback;
class CCommanderInstance;

using TTeleportExitsList = std::vector<std::pair<ObjectInstanceID, int3>>; // 传送出口列表类型

/// 用于管理人类玩家/AI界面逻辑的中心类
class DLL_LINKAGE CGameInterface : public CBattleGameInterface, public IGameEventsReceiver
{
public:
    virtual ~CGameInterface() = default; // 虚析构函数
    virtual void initGameInterface(std::shared_ptr<Environment> ENV, std::shared_ptr<CCallback> CB){}; // 初始化游戏界面
    virtual void yourTurn(QueryID askID){}; // 轮到玩家操作时调用（在playerStartsTurn(player)之后）

    // pskill是获得的主属性技能，界面必须从给定技能中选择一个并使用选择ID调用回调
    virtual void heroGotLevel(const CGHeroInstance *hero, PrimarySkill pskill, std::vector<SecondarySkill> &skills, QueryID queryID)=0; // 英雄升级时调用
    virtual void commanderGotLevel (const CCommanderInstance * commander, std::vector<ui32> skills, QueryID queryID)=0; // 指挥官升级时调用

    // 显示对话框，玩家必须做决定。如果是选择，则他必须在给定的组件中选择一个，
    // 如果可以取消，则允许他不选择。做出选择后，应使用选定组件的编号（1-n）或0（如果允许取消）和askID调用CCallback::selectionMade。
    virtual void showBlockingDialog(const std::string &text, const std::vector<Component> &components, QueryID askID, const int soundID, bool selection, bool cancel, bool safeToAutoaccept) = 0; // 显示阻塞对话框

    // 所有这些对象之间的堆栈操作都变为允许，界面必须在完成后调用onEnd
    virtual void showGarrisonDialog(const CArmedInstance *up, const CGHeroInstance *down, bool removableUnits, QueryID queryID) = 0; // 显示驻军对话框
    virtual void showTeleportDialog(const CGHeroInstance * hero, TeleportChannelID channel, TTeleportExitsList exits, bool impassable, QueryID askID) = 0; // 显示传送门对话框
    virtual void showMapObjectSelectDialog(QueryID askID, const Component & icon, const MetaString & title, const MetaString & description, const std::vector<ObjectInstanceID> & objects) = 0; // 显示地图对象选择对话框
    virtual void finish(){}; // 如果出于某种原因想要结束

    virtual void showWorldViewEx(const std::vector<ObjectPosInfo> & objectPositions, bool showTerrain){}; // 显示世界视图扩展

    virtual std::optional<BattleAction> makeSurrenderRetreatDecision(const BattleID & battleID, const BattleStateInfoForRetreat & battleState) = 0; // 做出投降/撤退决策

    /// 使所有英雄的所有路径无效并销毁
    virtual void invalidatePaths(){}; // 使路径无效

    virtual void setColorScheme(ColorScheme scheme){}; // 设置配色方案
};
```

## 功能说明

CGameInterface类是VCMI系统中用于管理人类玩家/AI界面逻辑的中心类。它继承了CBattleGameInterface和IGameEventsReceiver，提供了一个完整的界面系统来处理游戏事件和玩家交互。

该类是处理游戏事件和玩家交互的核心，包括英雄升级、对话框显示、传送门选择等功能。

## 重要方法

### 初始化与控制
- `initGameInterface(ENV, CB)`: 使用环境和回调初始化游戏界面
- `yourTurn(askID)`: 轮到玩家操作时调用
- `finish()`: 结束界面操作
- `invalidatePaths()`: 使所有英雄的路径无效并销毁
- `setColorScheme(scheme)`: 设置配色方案

### 玩家决策相关
- `heroGotLevel(hero, pskill, skills, queryID)`: 英雄升级时调用，让玩家选择次要技能
- `commanderGotLevel(commander, skills, queryID)`: 指挥官升级时调用，让玩家选择技能
- `showBlockingDialog(...)`: 显示阻塞对话框，要求玩家做决策
- `makeSurrenderRetreatDecision(battleID, battleState)`: 基于战斗状态做出投降或撤退决策

### 对话框显示
- `showGarrisonDialog(...)`: 显示驻军对话框
- `showTeleportDialog(...)`: 显示传送门对话框
- `showMapObjectSelectDialog(...)`: 显示地图对象选择对话框
- `showWorldViewEx(...)`: 显示扩展的世界视图

## 设计说明

CGameInterface类设计为抽象基类，定义了游戏界面应实现的一组核心功能。它结合了CBattleGameInterface和IGameEventsReceiver的接口，提供了一个统一的游戏事件处理系统。

该类的关键特点包括：

1. **多继承设计**: 同时继承战斗界面和游戏事件接收器，提供全面的游戏交互能力
2. **纯虚函数**: 定义了几个必须由派生类实现的纯虚函数
3. **可选实现**: 提供了一些可以由派生类重写的虚函数，但提供默认实现
4. **玩家交互**: 专注于处理需要玩家参与的各类游戏事件

这个类是连接游戏逻辑和用户界面的关键桥梁，所有需要用户交互的游戏事件都通过这个接口进行处理。