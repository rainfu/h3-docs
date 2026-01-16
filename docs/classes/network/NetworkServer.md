# NetworkServer类

NetworkServer类是VCMI中网络服务器的实现类，用于处理传入的网络连接。

## 类定义

```cpp
class NetworkServer : public INetworkConnectionListener, public INetworkServer
{
    NetworkContext & context;
    std::shared_ptr<NetworkAcceptor> acceptor;
    std::set<std::shared_ptr<INetworkConnection>> connections;

    INetworkServerListener & listener;

    void connectionAccepted(std::shared_ptr<NetworkSocket>, const boost::system::error_code & ec);
    uint16_t startAsyncAccept();

    void onDisconnected(const std::shared_ptr<INetworkConnection> & connection, const std::string & errorMessage) override;
    void onPacketReceived(const std::shared_ptr<INetworkConnection> & connection, const std::vector<std::byte> & message) override;
public:
    NetworkServer(INetworkServerListener & listener, NetworkContext & context);

    void receiveInternalConnection(std::shared_ptr<IInternalConnection> remoteConnection) override;

    uint16_t start(uint16_t port) override;
};
```

## 功能说明

NetworkServer是VCMI网络系统中处理传入连接的服务器实现类，同时继承自INetworkConnectionListener和INetworkServer接口。它负责监听指定端口、接受新的连接、管理活跃连接，并将网络事件转发给相应的监听器。该类实现了服务器端网络操作的核心逻辑。

## 依赖关系

- [INetworkConnectionListener](./INetworkConnectionListener.md): 网络连接监听器接口
- [INetworkServer](./INetworkServer.md): 网络服务器接口
- [INetworkServerListener](./INetworkServerListener.md): 网络服务器监听器接口
- [IInternalConnection](./IInternalConnection.md): 内部连接接口
- [NetworkContext](./NetworkContext.md): 网络上下文
- [NetworkAcceptor](./NetworkAcceptor.md): 网络接受器
- [INetworkConnection](./INetworkConnection.md): 网络连接接口
- [NetworkSocket](./NetworkSocket.md): 网络套接字
- Boost库: system_error, asio
- STL库: set, memory, string, vector等

## 函数注释

### 构造函数
- `NetworkServer(listener, context)`: 构造函数，使用监听器和上下文初始化网络服务器

### 公共方法
- `receiveInternalConnection(remoteConnection)`: 接收内部连接
- `start(port)`: 启动服务器并绑定到指定端口，返回实际使用的端口号

### 私有方法
- `connectionAccepted(socket, ec)`: 连接接受时的回调处理
- `startAsyncAccept()`: 异步开始接受连接，返回绑定的端口号
- `onDisconnected(connection, errorMessage)`: 连接断开时的回调
- `onPacketReceived(connection, message)`: 数据包接收时的回调

### 成员变量
- `context`: 网络上下文引用
- `acceptor`: 网络接受器的共享指针
- `connections`: 活跃连接的集合
- `listener`: 网络服务器监听器引用