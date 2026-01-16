# GlobalLobbyProcessor

## 概述

`GlobalLobbyProcessor` 类负责处理VCMI服务器与全局游戏大厅的通信和交互。该类管理与中央大厅服务器的连接，处理房间管理、玩家账户验证以及游戏状态同步等功能。

## 主要属性

- `owner`: 拥有该处理器的VCMI服务器引用
- `controlConnection`: 与大厅服务器的控制连接
- `proxyConnections`: 代理连接映射（按字符串键索引）

## 核心方法

### 初始化

```cpp
explicit GlobalLobbyProcessor(CVCMIServer & owner);
```

构造函数，绑定VCMI服务器实例。

### 网络事件处理

```cpp
void onDisconnected(const std::shared_ptr<INetworkConnection> & connection, const std::string & errorMessage);
void onPacketReceived(const std::shared_ptr<INetworkConnection> & connection, const std::vector<std::byte> & message);
void onConnectionFailed(const std::string & errorMessage);
void onConnectionEstablished(const std::shared_ptr<INetworkConnection> &);
```

INetworkClientListener接口实现，处理网络事件。

### 消息处理

```cpp
void receiveOperationFailed(const JsonNode & json);
void receiveServerLoginSuccess(const JsonNode & json);
void receiveAccountJoinsRoom(const JsonNode & json);
```

处理从大厅服务器接收到的各种消息。

### 连接管理

```cpp
void establishNewConnection();
```

建立与大厅服务器的新连接。

```cpp
void sendMessage(const NetworkConnectionPtr & targetConnection, const JsonNode & payload);
```

向指定连接发送消息。

### 房间管理

```cpp
void sendChangeRoomDescription(const std::string & description);
```

发送房间描述变更请求。

```cpp
void sendGameStarted();
```

通知大厅服务器游戏已开始。

### 信息查询

```cpp
JsonNode getHostModList() const;
```

获取主机模组列表。

```cpp
const std::string & getHostAccountID() const;
const std::string & getHostAccountCookie() const;
const std::string & getHostAccountDisplayName() const;
```

获取主机账户信息。

## 依赖关系

- **INetworkClientListener**: 网络客户端监听器接口
- **CVCMIServer**: VCMI服务器类
- **NetworkConnectionPtr**: 网络连接指针类型
- **JsonNode**: JSON节点类

## 使用示例

### 初始化大厅处理器

```cpp
#include "GlobalLobbyProcessor.h"

// 创建大厅处理器
GlobalLobbyProcessor lobbyProcessor(server);
```

### 处理网络事件

```cpp
#include "GlobalLobbyProcessor.h"

// 连接建立
void onConnectionEstablished(const NetworkConnectionPtr & connection) {
    // 处理连接建立逻辑
}

// 接收消息
void onPacketReceived(const NetworkConnectionPtr & connection, const std::vector<std::byte> & message) {
    // 解析并处理消息
}
```

### 发送房间更新

```cpp
#include "GlobalLobbyProcessor.h"

// 更改房间描述
lobbyProcessor.sendChangeRoomDescription("New game room description");

// 通知游戏开始
lobbyProcessor.sendGameStarted();
```

### 查询主机信息

```cpp
#include "GlobalLobbyProcessor.h"

// 获取主机账户ID
const std::string & accountId = lobbyProcessor.getHostAccountID();

// 获取模组列表
JsonNode modList = lobbyProcessor.getHostModList();
```

## 通信协议

该类使用JSON格式的消息与全局大厅服务器通信，主要消息类型包括：

- **操作失败**: receiveOperationFailed
- **服务器登录成功**: receiveServerLoginSuccess  
- **账户加入房间**: receiveAccountJoinsRoom

## 架构设计

1. **连接管理**: 维护控制连接和多个代理连接
2. **消息路由**: 根据连接类型和消息内容路由到相应处理函数
3. **状态同步**: 与大厅服务器保持房间状态同步
4. **错误处理**: 处理连接失败和操作失败的情况

## 性能特性

- **连接效率**: 复用连接处理多个消息类型
- **消息处理**: 轻量级的JSON消息解析和处理
- **内存管理**: 使用智能指针管理网络连接

## 实现注意事项

1. **线程安全**: 网络事件在不同线程中调用，需要注意同步
2. **连接恢复**: 处理连接断开后的自动重连逻辑
3. **消息顺序**: 确保消息处理的顺序性和可靠性
4. **错误处理**: 完善的错误处理和日志记录

## 相关文档

- [CVCMIServer](CVCMIServer.md) - VCMI服务器类
- [INetworkClientListener](../network/INetworkClientListener.md) - 网络客户端监听器接口