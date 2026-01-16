# IGameServer

## 概述

`IGameServer` 是一个纯虚接口类，定义了游戏处理器（GameHandler）与游戏服务器交互的统一接口。该接口抽象了服务器的具体实现，允许游戏逻辑与不同的服务器实现解耦。

## 服务器状态枚举

```cpp
enum class EServerState : ui8
{
    LOBBY,      // 大厅状态，玩家配置阶段
    GAMEPLAY,   // 游戏进行状态
    SHUTDOWN    // 关闭状态
};
```

## 核心方法

```cpp
virtual void setState(EServerState value) = 0;
```

设置服务器状态。

```cpp
virtual EServerState getState() const = 0;
```

获取当前服务器状态。

```cpp
virtual bool isPlayerHost(const PlayerColor & color) const = 0;
```

检查指定颜色的玩家是否为主机（房主）。

```cpp
virtual bool hasPlayerAt(PlayerColor player, GameConnectionID connectionID) const = 0;
```

检查指定玩家是否在指定的游戏连接上。

```cpp
virtual bool hasBothPlayersAtSameConnection(PlayerColor left, PlayerColor right) const = 0;
```

检查两个玩家是否在同一个连接上（用于单机双人游戏等场景）。

```cpp
virtual void applyPack(CPackForClient & pack) = 0;
```

应用数据包到所有相关客户端。

```cpp
virtual void sendPack(CPackForClient & pack, GameConnectionID connectionID) = 0;
```

发送数据包到指定的游戏连接。

## 依赖关系

- **GameConnectionID**: 游戏连接ID类型
- **PlayerColor**: 玩家颜色类型
- **CPackForClient**: 客户端数据包结构体

## 使用示例

### 实现接口

```cpp
#include "IGameServer.h"

class MyGameServer : public IGameServer
{
public:
    void setState(EServerState value) override
    {
        currentState = value;
    }

    EServerState getState() const override
    {
        return currentState;
    }

    bool isPlayerHost(const PlayerColor & color) const override
    {
        return hostPlayer == color;
    }

    // ... 其他方法实现

private:
    EServerState currentState = EServerState::LOBBY;
    PlayerColor hostPlayer;
};
```

### 在GameHandler中使用

```cpp
#include "IGameServer.h"

class CGameHandler
{
public:
    CGameHandler(IGameServer & server) : gameServer(server) {}

    void startGame()
    {
        // 检查服务器状态
        if (gameServer.getState() == EServerState::LOBBY)
        {
            // 开始游戏
            gameServer.setState(EServerState::GAMEPLAY);

            // 发送游戏开始包
            CPackForClient startPack;
            gameServer.applyPack(startPack);
        }
    }

private:
    IGameServer & gameServer;
};
```

## 设计模式

该接口使用了**策略模式**和**桥接模式**的设计思想：

- **策略模式**: 允许游戏处理器使用不同的服务器实现策略
- **桥接模式**: 将游戏逻辑（GameHandler）与网络通信（Server）分离

## 实现注意事项

1. **线程安全**: 接口方法需要在多线程环境中安全调用
2. **状态一致性**: setState和getState需要保持内部状态一致
3. **连接管理**: hasPlayerAt等方法需要准确反映当前连接状态
4. **性能考虑**: applyPack可能需要向多个客户端广播，注意性能优化

## 相关文档

- [CGameHandler](CGameHandler.md) - 游戏处理器类
- [CVCMIServer](CVCMIServer.md) - VCMI服务器实现
- [CPackForClient](../networkPacks/CPackForClient.md) - 客户端数据包