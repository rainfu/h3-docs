# CVCMIServer

## 概述

`CVCMIServer` 类是VCMI游戏服务器的核心实现，负责管理网络连接、游戏大厅、玩家设置以及游戏生命周期。该类实现了多个接口，包括游戏服务器、网络监听器和计时器监听器。

## 主要属性

- `gameplayStartTime`: 游戏开始时间点
- `lastTimerUpdateTime`: 最后计时器更新时间
- `networkHandler`: 网络处理器
- `networkServer`: 网络服务器实例
- `lobbyProcessor`: 大厅处理器
- `state`: 服务器状态
- `activeConnections`: 活跃连接列表
- `currentClientId`: 当前客户端ID
- `currentPlayerId`: 当前玩家ID
- `port`: 服务器端口
- `runByClient`: 是否由客户端启动
- `gh`: 游戏处理器

## 服务器状态枚举

```cpp
enum EServerState {
    LOBBY,      // 大厅状态
    GAMEPLAY    // 游戏进行状态
};
```

## 核心方法

### 初始化和生命周期

```cpp
CVCMIServer(uint16_t port, bool runByClient);
```

构造函数，指定端口和启动模式。

```cpp
uint16_t prepare(bool connectToLobby, bool listenForConnections);
```

准备服务器，连接大厅并开始监听连接。

```cpp
void run();
```

运行服务器主循环。

```cpp
uint16_t startAcceptingIncomingConnections(bool listenForConnections);
```

开始接受传入连接。

### 游戏管理

```cpp
bool loadSavedGame(CGameHandler & handler, const StartInfo & info);
```

加载保存的游戏。

```cpp
bool prepareToStartGame();
void prepareToRestart();
void startGameImmediately();
```

游戏启动准备和控制。

### 网络事件处理

```cpp
void onDisconnected(const std::shared_ptr<INetworkConnection> & connection, const std::string & errorMessage);
void onPacketReceived(const std::shared_ptr<INetworkConnection> & connection, const std::vector<std::byte> & message);
void onNewConnection(const std::shared_ptr<INetworkConnection> &);
void onTimer();
```

网络事件监听器实现。

### 客户端管理

```cpp
void clientConnected(std::shared_ptr<GameConnection> c, std::vector<std::string> & names, const std::string & uuid, EStartMode mode);
void clientDisconnected(std::shared_ptr<GameConnection> c);
```

客户端连接和断开处理。

```cpp
void threadHandleClient(std::shared_ptr<GameConnection> c);
```

为客户端创建处理线程。

### 消息和公告

```cpp
void announcePack(CPackForLobby & pack);
void announceTxt(const MetaString & txt, const std::string & playerName = "system");
void announceTxt(const std::string & txt, const std::string & playerName = "system");
void announceMessage(const MetaString & txt);
void announceMessage(const std::string & txt);
```

向所有客户端发送消息和数据包。

### 玩家设置管理

```cpp
void setPlayer(PlayerColor clickedColor);
void setPlayerName(PlayerColor player, const std::string & name);
void setPlayerHandicap(PlayerColor player, Handicap handicap);
```

玩家基本设置。

```cpp
void optionNextHero(PlayerColor player, int dir);
void optionSetHero(PlayerColor player, HeroTypeID id);
HeroTypeID nextAllowedHero(PlayerColor player, HeroTypeID id, int direction);
bool canUseThisHero(PlayerColor player, HeroTypeID ID);
std::vector<HeroTypeID> getUsedHeroes();
```

英雄选择和验证。

```cpp
void optionNextBonus(PlayerColor player, int dir);
void optionSetBonus(PlayerColor player, PlayerStartingBonus id);
```

起始奖励设置。

```cpp
void optionNextCastle(PlayerColor player, int dir);
void optionSetCastle(PlayerColor player, FactionID id);
```

城镇派系选择。

### 战役管理

```cpp
void setCampaignMap(CampaignScenarioID mapId);
void setCampaignBonus(int bonusId);
```

战役地图和奖励设置。

### IGameServer 接口实现

```cpp
void setState(EServerState value);
EServerState getState() const;
bool isPlayerHost(const PlayerColor & color) const;
bool hasPlayerAt(PlayerColor player, GameConnectionID connectionID) const;
bool hasBothPlayersAtSameConnection(PlayerColor left, PlayerColor right) const;
void applyPack(CPackForClient & pack);
void sendPack(CPackForClient & pack, GameConnectionID connectionID);
```

游戏服务器接口实现。

### 工具方法

```cpp
PlayerConnectionID getIdOfFirstUnallocatedPlayer() const;
void multiplayerWelcomeMessage();
void updateAndPropagateLobbyState();
```

辅助工具方法。

## 依赖关系

- **IGameServer**: 游戏服务器接口
- **INetworkServerListener**: 网络服务器监听器接口
- **INetworkTimerListener**: 网络计时器监听器接口
- **LobbyInfo**: 大厅信息基类
- **CGameHandler**: 游戏处理器
- **INetworkHandler**: 网络处理器接口

## 使用示例

### 创建和启动服务器

```cpp
#include "CVCMIServer.h"

// 创建服务器实例
CVCMIServer server(3030, false);

// 准备服务器
uint16_t actualPort = server.prepare(true, true);

// 运行服务器
server.run();
```

### 处理玩家设置

```cpp
#include "CVCMIServer.h"

// 设置玩家名称
server.setPlayerName(PlayerColor::RED, "Player1");

// 设置英雄选择
server.optionSetHero(PlayerColor::RED, HeroTypeID::ACHILLES);

// 设置城镇派系
server.optionSetCastle(PlayerColor::RED, FactionID::CASTLE);
```

### 管理客户端连接

```cpp
#include "CVCMIServer.h"

// 处理新客户端连接
void handleNewConnection(std::shared_ptr<GameConnection> connection) {
    std::vector<std::string> names;
    server.clientConnected(connection, names, uuid, mode);
}

// 处理客户端断开
void handleDisconnection(std::shared_ptr<GameConnection> connection) {
    server.clientDisconnected(connection);
}
```

### 发送游戏消息

```cpp
#include "CVCMIServer.h"

// 发送文本消息
server.announceTxt("Welcome to the game!", "system");

// 发送数据包
CPackForLobby pack;
server.announcePack(pack);
```

## 性能特性

- **并发处理**: 支持多客户端并发连接和处理
- **网络效率**: 优化的网络消息处理和广播机制
- **状态同步**: 高效的大厅状态同步和传播

## 实现注意事项

1. **线程安全**: 多线程环境下的连接管理需要注意同步
2. **状态一致性**: 服务器状态变化需要正确传播到所有客户端
3. **错误处理**: 完善的网络错误处理和客户端断开处理
4. **扩展性**: 通过接口设计支持功能扩展

## 相关文档

- [CGameHandler](CGameHandler.md) - 游戏处理器
- [IGameServer](IGameServer.md) - 游戏服务器接口
- [LobbyInfo](../LobbyInfo.md) - 大厅信息类