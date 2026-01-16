# NetworkInterface相关网络接口

NetworkInterface相关网络接口是VCMI系统中的网络通信接口集合，提供了网络连接、客户端、服务器和事件监听等核心功能。

## 接口定义

```cpp
/// 与其他服务的连接基类，无论是传入还是传出
class DLL_LINKAGE INetworkConnection : boost::noncopyable
{
public:
    virtual ~INetworkConnection() = default;
    virtual void sendPacket(const std::vector<std::byte> & message) = 0;  // 发送数据包
    virtual void setAsyncWritesEnabled(bool on) = 0;                     // 启用/禁用异步写入
    virtual void close() = 0;                                            // 关闭连接
};

/// 用于进程内连接的类，当TCP不可用或不需要时使用
class IInternalConnection : public INetworkConnection
{
public:
    virtual void receivePacket(const std::vector<std::byte> & message) = 0;  // 接收数据包
    virtual void disconnect() = 0;                                         // 断开连接
    virtual void connectTo(std::shared_ptr<IInternalConnection> connection) = 0;  // 连接到另一个内部连接
};

using NetworkConnectionPtr = std::shared_ptr<INetworkConnection>;            // 网络连接智能指针
using NetworkConnectionWeakPtr = std::weak_ptr<INetworkConnection>;         // 网络连接弱指针

/// 传出连接支持的基类
class DLL_LINKAGE INetworkClient : boost::noncopyable
{
public:
    virtual ~INetworkClient() = default;

    virtual bool isConnected() const = 0;                                  // 检查是否已连接
    virtual void sendPacket(const std::vector<std::byte> & message) = 0;   // 发送数据包
};

/// 传入连接支持的基类
class DLL_LINKAGE INetworkServer : boost::noncopyable
{
public:
    virtual ~INetworkServer() = default;

    virtual uint16_t start(uint16_t port) = 0;                           // 在指定端口启动服务器
    virtual void receiveInternalConnection(std::shared_ptr<IInternalConnection> remoteConnection) = 0;  // 接收内部连接
};

/// 网络API用户必须实现的接口，用于处理任何连接回调
class DLL_LINKAGE INetworkConnectionListener
{
public:
    virtual void onDisconnected(const std::shared_ptr<INetworkConnection> & connection, const std::string & errorMessage) = 0;  // 连接断开回调
    virtual void onPacketReceived(const std::shared_ptr<INetworkConnection> & connection, const std::vector<std::byte> & message) = 0;  // 数据包接收回调

    virtual ~INetworkConnectionListener() = default;
};

/// 网络API用户必须实现的接口，用于处理传出连接回调
class DLL_LINKAGE INetworkClientListener : public INetworkConnectionListener
{
public:
    virtual void onConnectionFailed(const std::string & errorMessage) = 0;      // 连接失败回调
    virtual void onConnectionEstablished(const std::shared_ptr<INetworkConnection> &) = 0;  // 连接建立回调
};

/// 网络API用户必须实现的接口，用于处理传入连接回调
class DLL_LINKAGE INetworkServerListener : public INetworkConnectionListener
{
public:
    virtual void onNewConnection(const std::shared_ptr<INetworkConnection> &) = 0;  // 新连接回调
};

/// 网络API用户必须实现的接口，用于在网络线程上处理定时器
class DLL_LINKAGE INetworkTimerListener
{
public:
    virtual ~INetworkTimerListener() = default;

    virtual void onTimer() = 0;  // 定时器触发回调
};

/// 网络活动处理的主要类
class DLL_LINKAGE INetworkHandler : boost::noncopyable
{
public:
    virtual ~INetworkHandler() = default;

    /// 构建默认实现
    static std::unique_ptr<INetworkHandler> createHandler();

    /// 创建TCP服务器实例，允许在本地端口上接收连接
    virtual std::unique_ptr<INetworkServer> createServerTCP(INetworkServerListener & listener) = 0;

    /// 创建TCP客户端实例，允许建立到远程端口的单个传出连接
    /// 成功时：INetworkTimerListener::onConnectionEstablished() 将被调用，连接作为参数提供
    /// 失败时：INetworkTimerListener::onConnectionFailed 将被调用，提供人类可读的错误消息
    virtual void connectToRemote(INetworkClientListener & listener, const std::string & host, uint16_t port) = 0;

    /// 创建内部连接实例，连接到网络服务器，但使用进程内通信而不是TCP
    /// 成功时：INetworkTimerListener::onConnectionEstablished() 将异步调用，连接作为参数提供
    virtual void createInternalConnection(INetworkClientListener & listener, INetworkServer & server) = 0;

    /// 创建单向连接，允许以异步形式向监听器发送消息
    virtual std::shared_ptr<INetworkConnection> createAsyncConnection(INetworkConnectionListener & listener) = 0;

    /// 创建一个计时器，在指定时间间隔后调用一次
    /// 成功时：INetworkTimerListener::onTimer() 将被调用
    /// 失败时：无操作
    virtual void createTimer(INetworkTimerListener & listener, std::chrono::milliseconds duration) = 0;

    /// 在此线程上启动网络处理。直到网络处理终止才会返回
    virtual void run() = 0;
    virtual void stop() = 0;
};
```

## 功能说明

NetworkInterface相关网络接口提供了VCMI系统中网络通信的基础架构。这些接口定义了网络通信的各个方面：

1. **INetworkConnection**：定义了网络连接的基本功能，包括发送数据包、关闭连接等
2. **IInternalConnection**：扩展了INetworkConnection，提供进程内通信功能
3. **INetworkClient**：定义了客户端连接的功能
4. **INetworkServer**：定义了服务器端的功能
5. **事件监听接口**：提供了一套完整的事件回调接口
6. **INetworkHandler**：主要的网络处理器，负责管理所有网络活动

## 重要接口

### 连接接口
- `INetworkConnection`：基础网络连接接口
- `IInternalConnection`：内部进程连接接口

### 客户端和服务器接口
- `INetworkClient`：网络客户端接口
- `INetworkServer`：网络服务器接口

### 事件监听接口
- `INetworkConnectionListener`：连接事件监听器
- `INetworkClientListener`：客户端事件监听器
- `INetworkServerListener`：服务器事件监听器
- `INetworkTimerListener`：定时器事件监听器

### 网络处理器接口
- `INetworkHandler`：主要的网络处理器接口

## 设计说明

NetworkInterface接口集合采用了经典的观察者模式和策略模式，通过接口隔离实现了高度的可扩展性和可维护性：

1. **接口隔离**：每个接口都有明确的职责，避免了庞大的单一接口
2. **继承层次**：通过继承建立了清晰的接口关系，如INetworkClientListener继承自INetworkConnectionListener
3. **智能指针**：使用std::shared_ptr和std::weak_ptr管理对象生命周期
4. **工厂模式**：INetworkHandler通过createHandler()方法提供实现
5. **异步处理**：支持异步操作和回调机制，适应网络编程需求

这套接口设计为VCMI提供了灵活的网络通信能力，支持TCP连接和进程内通信等多种传输方式。