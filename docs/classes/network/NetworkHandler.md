# NetworkHandler类

NetworkHandler类是VCMI中网络处理程序的实现类，负责管理网络连接和通信。

## 类定义

```cpp
class NetworkHandler final : public INetworkHandler
{
    std::unique_ptr<NetworkContext> context;

public:
    NetworkHandler();

    std::unique_ptr<INetworkServer> createServerTCP(INetworkServerListener & listener) override;
    void connectToRemote(INetworkClientListener & listener, const std::string & host, uint16_t port) override;
    void createInternalConnection(INetworkClientListener & listener, INetworkServer & server) override;
    std::shared_ptr<INetworkConnection> createAsyncConnection(INetworkConnectionListener & listener) override;
    void createTimer(INetworkTimerListener & listener, std::chrono::milliseconds duration) override;

    void run() override;
    void stop() override;
};
```

## 功能说明

NetworkHandler是VCMI网络系统中的核心处理类，继承自INetworkHandler接口。它负责管理TCP服务器、远程连接、内部连接以及异步连接等网络操作。该类封装了底层网络通信的复杂性，为上层代码提供简洁的网络操作接口。

## 依赖关系

- [INetworkHandler](./INetworkHandler.md): 网络处理接口
- [NetworkContext](./NetworkContext.md): 网络上下文
- [INetworkServer](./INetworkServer.md): 网络服务器接口
- [INetworkServerListener](./INetworkServerListener.md): 网络服务器监听器接口
- [INetworkClientListener](./INetworkClientListener.md): 网络客户端监听器接口
- [INetworkConnection](./INetworkConnection.md): 网络连接接口
- [INetworkConnectionListener](./INetworkConnectionListener.md): 网络连接监听器接口
- [INetworkTimerListener](./INetworkTimerListener.md): 网络计时器监听器接口
- STL库: string, chrono, memory等

## 函数注释

- `NetworkHandler()`: 构造函数，初始化网络处理程序
- `createServerTCP(listener)`: 创建TCP服务器并返回其接口
- `connectToRemote(listener, host, port)`: 连接到远程主机
- `createInternalConnection(listener, server)`: 创建内部连接
- `createAsyncConnection(listener)`: 创建异步连接并返回其接口
- `createTimer(listener, duration)`: 创建定时器
- `run()`: 启动网络处理循环
- `stop()`: 停止网络处理循环