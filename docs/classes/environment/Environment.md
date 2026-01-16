# Environment接口

Environment接口是VCMI中环境上下文的抽象接口，提供对各种服务和回调的访问。

## 类定义

```cpp
class DLL_LINKAGE Environment
{
public:
    using BattleCb = IBattleInfoCallback;
    using GameCb = IGameInfoCallback;

    virtual ~Environment() = default;

    virtual const Services * services() const = 0;
    virtual const BattleCb * battle(const BattleID & battleID) const = 0;
    virtual const GameCb * game() const = 0;
    virtual vstd::CLoggerBase * logger() const = 0;
    virtual events::EventBus * eventBus() const = 0;
};
```

## 功能说明

Environment是VCMI中环境上下文的基接口，为系统提供对各种核心服务的访问途径。它提供了一个统一的接口来访问服务、战斗和游戏信息回调、日志系统以及事件总线等功能。这个接口通常在不同的执行环境中实现，如客户端、服务器或AI模块中。

## 依赖关系

- [Services](../services/Services.md): 服务接口
- [IBattleInfoCallback](../battle/IBattleInfoCallback.md): 战斗信息回调接口
- [IGameInfoCallback](../gameState/IGameInfoCallback.md): 游戏信息回调接口
- [BattleID](../battle/BattleID.md): 战斗ID类型
- [CLoggerBase](../logging/CLoggerBase.md): 日志基类
- [EventBus](../events/EventBus.md): 事件总线
- STL库: 智能指针和容器

## 类型别名

- `BattleCb`: 战斗信息回调类型的别名，指向IBattleInfoCallback
- `GameCb`: 游戏信息回调类型的别名，指向IGameInfoCallback

## 函数注释

- `~Environment()`: 虚析构函数
- `services()`: 返回服务接口的指针
- `battle(battleID)`: 根据战斗ID返回对应的战斗信息回调接口
- `game()`: 返回游戏信息回调接口
- `logger()`: 返回日志系统接口
- `eventBus()`: 返回事件总线接口