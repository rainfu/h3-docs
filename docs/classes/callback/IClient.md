<!-- 来源: E:\develop\heroes\vcmi\lib\callback\IClient.h -->
# IClient接口

IClient接口定义了VCMI客户端与服务器通信的抽象接口。它提供了处理玩家决策和发送请求的核心方法。

## 接口定义

```cpp
class DLL_LINKAGE IClient
```

## 概述

IClient是客户端系统的核心接口，定义了客户端与服务器之间的基本通信协议。主要用于处理玩家在战斗中的决策以及向服务器发送各种请求。

## 纯虚方法

### 决策方法
- `std::optional<BattleAction> makeSurrenderRetreatDecision(PlayerColor player, const BattleID & battleID, const BattleStateInfoForRetreat & battleState)`: 为指定玩家做出投降/撤退决策

### 通信方法
- `int sendRequest(const CPackForServer & request, PlayerColor player, bool waitTillRealize)`: 向服务器发送请求包

## 参数说明

### makeSurrenderRetreatDecision
- `PlayerColor player`: 做出决策的玩家颜色
- `BattleID battleID`: 战斗的唯一标识符
- `BattleStateInfoForRetreat battleState`: 当前战斗状态信息，用于决策制定

**返回值**: `std::optional<BattleAction>` - 如果做出决策则返回战斗动作，否则返回空值

### sendRequest
- `CPackForServer & request`: 要发送给服务器的请求包
- `PlayerColor player`: 发送请求的玩家
- `bool waitTillRealize`: 是否等待服务器实现请求

**返回值**: `int` - 请求的处理结果或ID

## 实现类

IClient通常由以下类实现：
- 网络客户端类
- 本地客户端类（用于单机游戏）
- AI客户端类

## 使用示例

```cpp
// 创建客户端实例
std::unique_ptr<IClient> client = createClient();

// 为玩家做出撤退决策
auto retreatAction = client->makeSurrenderRetreatDecision(
    PlayerColor::RED,
    battleID,
    battleState
);

if (retreatAction)
{
    // 执行撤退动作
}

// 发送请求到服务器
CPackForServer request = createSomeRequest();
int result = client->sendRequest(request, PlayerColor::RED, true);
```

## 通信模式

IClient支持两种通信模式：

1. **同步模式** (`waitTillRealize = true`): 发送请求后等待服务器处理完成
2. **异步模式** (`waitTillRealize = false`): 发送请求后立即返回，不等待处理

## 错误处理

实现类需要处理网络错误、超时等异常情况，并通过返回值或异常通知调用者。

## 相关类

- `CPackForServer`: 服务器请求包
- `BattleAction`: 战斗动作
- `BattleStateInfoForRetreat`: 撤退状态信息
- `PlayerColor`: 玩家颜色标识
- `BattleID`: 战斗标识符