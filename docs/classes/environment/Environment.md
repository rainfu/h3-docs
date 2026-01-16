# Environment类

Environment类是VCMI中环境接口的定义，用于提供访问游戏环境服务的接口。

## 类定义

```cpp
class DLL_LINKAGE Environment
{
public:
    virtual ~Environment() = default;

    virtual const Services * getServices() const = 0;      // 获取服务接口
    virtual const BattleInterface * getBattle() const = 0; // 获取战斗接口
    virtual const GameInterface * getGame() const = 0;     // 获取游戏接口
    virtual PlayerColor getCurrentPlayer() const = 0;      // 获取当前玩家
    virtual PlayerColor getCurrentPlayer(bool * watching, bool * available) const = 0; // 获取当前玩家，带状态信息
    virtual const CGameInfoCallback * getLocalClientPlayer() const = 0;              // 获取本地客户端玩家接口
    virtual const CGameInfoCallback * getPlayerState(PlayerColor color) const = 0;    // 获取指定玩家状态接口
    virtual boost::optional<PlayerColor> getBattlePlayer() const = 0;                 // 获取战斗玩家
    virtual boost::optional<PlayerColor> getPlayerID() const = 0;                     // 获取玩家ID
    virtual const CBattleInfoCallback * getBattleState() const = 0;                   // 获取战斗状态
    virtual const CGameInfoCallback * getGameState() const = 0;                       // 获取游戏状态

    virtual void update() = 0;                                                        // 更新环境状态
    virtual void write(const JsonNode & data) = 0;                                    // 写入数据
    virtual void sendAndApply(CPackForServer * pack) = 0;                             // 发送并应用服务器包
    virtual void runSelection(const JsonNode & input, JsonNode & output) = 0;         // 执行选择操作
    virtual void runCustomCommand(const JsonNode & input, JsonNode & output) = 0;     // 执行自定义命令
};
```

## 功能说明

Environment是VCMI中环境接口的抽象类，它提供了一个统一的接口来访问游戏中的各种服务和状态。这个接口允许组件访问游戏环境中的关键服务，如游戏状态、战斗状态、玩家信息等，而无需直接依赖具体的实现。Environment接口是VCMI架构中实现松耦合的关键组件之一。

## 函数注释

- `getServices()`: 获取服务接口，提供对游戏服务的访问
- `getBattle()`: 获取战斗接口，提供对战斗相关功能的访问
- `getGame()`: 获取游戏接口，提供对游戏逻辑的访问
- `getCurrentPlayer()`: 获取当前活跃的玩家颜色
- `getCurrentPlayer(watching, available)`: 获取当前玩家，并输出其观看和可用状态
- `getLocalClientPlayer()`: 获取本地客户端玩家接口
- `getPlayerState(color)`: 获取指定颜色玩家的状态接口
- `getBattlePlayer()`: 获取当前战斗中的玩家
- `getPlayerID()`: 获取当前玩家ID
- `getBattleState()`: 获取当前战斗状态接口
- `getGameState()`: 获取当前游戏状态接口
- `update()`: 更新环境状态
- `write(data)`: 将数据写入环境
- `sendAndApply(pack)`: 发送服务器包并应用到游戏状态
- `runSelection(input, output)`: 执行选择操作
- `runCustomCommand(input, output)`: 执行自定义命令

## 设计说明

Environment类是VCMI架构中的关键抽象，它为组件提供了访问游戏环境的统一接口，而不需要了解底层实现细节。这种设计促进了松耦合架构，使组件更容易测试和维护。通过Environment接口，组件可以安全地访问游戏状态和服务，而不必担心直接依赖关系带来的复杂性。
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