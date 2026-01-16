# NetworkHandler类

NetworkHandler类是VCMI系统中网络处理的具体实现类，实现了INetworkHandler接口。它负责管理所有网络活动，包括TCP服务器、客户端连接、内部连接和定时器等。

## 类定义

```cpp
class NetworkHandler final : public INetworkHandler
{
    std::unique_ptr<NetworkContext> context;  // 网络上下文

public:
    NetworkHandler();  // 构造函数

    std::unique_ptr<INetworkServer> createServerTCP(INetworkServerListener & listener) override;  // 创建TCP服务器
    void connectToRemote(INetworkClientListener & listener, const std::string & host, uint16_t port) override;  // 连接到远程主机
    void createInternalConnection(INetworkClientListener & listener, INetworkServer & server) override;  // 创建内部连接
    std::shared_ptr<INetworkConnection> createAsyncConnection(INetworkConnectionListener & listener) override;  // 创建异步连接
    void createTimer(INetworkTimerListener & listener, std::chrono::milliseconds duration) override;  // 创建定时器

    void run() override;   // 运行网络处理循环
    void stop() override;  // 停止网络处理
};
```

## 功能说明

NetworkHandler类是INetworkHandler接口的具体实现，它使用NetworkContext来管理所有的网络活动。该类负责创建和管理网络服务器、客户端连接、内部连接和定时器等。

NetworkHandler是线程安全的，可以在单独的线程中运行网络处理循环。

## 重要方法

### 服务器管理
- `createServerTCP(listener)`：创建TCP服务器，允许监听指定端口的传入连接

### 客户端连接
- `connectToRemote(listener, host, port)`：连接到远程主机
- `createInternalConnection(listener, server)`：创建到服务器的内部连接

### 异步操作
- `createAsyncConnection(listener)`：创建异步连接，用于单向消息传递
- `createTimer(listener, duration)`：创建定时器，将在指定时间后触发回调

### 网络处理
- `run()`：启动网络处理循环，此方法会一直运行直到stop()被调用
- `stop()`：停止网络处理循环

## 设计说明

NetworkHandler类的设计体现了以下特点：

1. **上下文管理**：使用NetworkContext来管理所有网络相关的状态和资源
2. **接口实现**：完全实现了INetworkHandler接口的所有方法
3. **资源管理**：使用unique_ptr管理NetworkContext的生命周期
4. **线程安全**：设计为可在独立线程中运行
5. **具体实现**：使用final关键字表明这是一个最终实现，不应该被进一步继承

NetworkHandler是VCMI网络系统的中心组件，所有网络通信都通过这个类来协调和管理。