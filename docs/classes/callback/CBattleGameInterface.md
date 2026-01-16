# CBattleGameInterface类

CBattleGameInterface类是VCMI战斗系统中的战斗游戏界面基类，用于处理战斗事件并提供战斗相关的接口。它继承自IBattleEventsReceiver接口，是实现战斗AI或人类玩家战斗交互的核心类。

## 类定义

```cpp
class CBattleCallback;
class Environment;

class DLL_LINKAGE CBattleGameInterface : public IBattleEventsReceiver
{
public:
    bool human = false;                           // 是否为人类玩家
    PlayerColor playerID;                         // 玩家颜色ID
    std::string dllName;                          // DLL名称

    virtual ~CBattleGameInterface() {};           // 虚析构函数

    virtual void initBattleInterface(std::shared_ptr<Environment> ENV, std::shared_ptr<CBattleCallback> CB){}; // 初始化战斗界面
    virtual void initBattleInterface(std::shared_ptr<Environment> ENV, std::shared_ptr<CBattleCallback> CB, AutocombatPreferences autocombatPreferences){}; // 使用自动战斗偏好初始化战斗界面

    // 战斗回调方法
    virtual void activeStack(const BattleID & battleID, const CStack * stack)=0; // 当轮到该堆栈时调用
    virtual void yourTacticPhase(const BattleID & battleID, int distance)=0;     // 当界面有机会使用战术技能时调用 -> 从此函数使用cb->battleMakeTacticAction
};
```

## 功能说明

CBattleGameInterface类是VCMI战斗系统中的核心接口类，为战斗AI或人类玩家提供战斗交互能力。它定义了战斗过程中需要实现的关键方法，包括堆栈激活和战术阶段的处理。

## 成员变量

- `human`: 布尔值，指示该接口是否代表人类玩家（true）还是AI（false）
- `playerID`: PlayerColor类型，标识该接口所代表的玩家
- `dllName`: 字符串，存储关联DLL的名称

## 初始化方法

- `initBattleInterface(ENV, CB)`: 使用环境和战斗回调初始化战斗界面
- `initBattleInterface(ENV, CB, autocombatPreferences)`: 使用环境、战斗回调和自动战斗偏好初始化战斗界面

## 战斗回调方法

- `activeStack(battleID, stack)`: 纯虚函数，当轮到指定堆栈行动时调用，实现类必须定义具体的堆栈行动逻辑
- `yourTacticPhase(battleID, distance)`: 纯虚函数，当界面有机会使用战术技能时调用，通常在此方法中使用cb->battleMakeTacticAction来执行战术操作

## 设计说明

CBattleGameInterface类是战斗系统的核心抽象层，为不同的战斗参与者（AI或人类玩家）提供统一的接口。通过继承IBattleEventsReceiver，该类可以接收并响应战斗事件。

该类设计为基类，允许派生类实现特定的战斗逻辑。例如，不同的AI实现可以继承此类并实现自己的决策逻辑，而人类玩家界面也可以继承此类来处理用户输入。

定义了AI_INTERFACE_VER常量（值为1），用于确保接口版本兼容性。这种设计允许系统在接口发生变化时进行版本检查。

AutocombatPreferences参数允许在初始化时传递自动战斗的偏好设置，使实现可以根据这些偏好调整战斗行为。