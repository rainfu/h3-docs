# INetworkConnection类及相关网络类

INetworkConnection是VCMI网络系统的基类，定义了网络连接的基本接口。此外还包括相关的网络接口类。

## 类定义

### INetworkConnection
```cpp
class DLL_LINKAGE INetworkConnection : boost::noncopyable
{
public:
    virtual ~INetworkConnection() = default;
    virtual void sendPacket(const std::vector<std::byte> & message) = 0;
    virtual void setAsyncWritesEnabled(bool on) = 0;
    virtual void close() = 0;
};
```

### IInternalConnection
```cpp
class IInternalConnection : public INetworkConnection
{
public:
    virtual void receivePacket(const std::vector<std::byte> & message) = 0;
    virtual void disconnect() = 0;
    virtual void connectTo(std::shared_ptr<IInternalConnection> connection) = 0;
};
```

### INetworkClient
```cpp
class DLL_LINKAGE INetworkClient : boost::noncopyable
{
public:
    virtual ~INetworkClient() = default;

    virtual bool isConnected() const = 0;
    virtual void sendPacket(const std::vector<std::byte> & message) = 0;
};
```

### INetworkServer
```cpp
class DLL_LINKAGE INetworkServer : boost::noncopyable
{
public:
    virtual ~INetworkServer() = default;

    virtual uint16_t start(uint16_t port) = 0;
    virtual void receiveInternalConnection(std::shared_ptr<IInternalConnection> remoteConnection) = 0;
};
```

### INetworkConnectionListener
```cpp
class DLL_LINKAGE INetworkConnectionListener
{
public:
    virtual void onDisconnected(const std::shared_ptr<INetworkConnection> & connection, const std::string & errorMessage) = 0;
    virtual void onPacketReceived(const std::shared_ptr<INetworkConnection> & connection, const std::vector<std::byte> & message) = 0;

    virtual ~INetworkConnectionListener() = default;
};
```

### INetworkHandler
```cpp
class DLL_LINKAGE INetworkHandler : boost::noncopyable
{
public:
    virtual ~INetworkHandler() = default;

    static std::unique_ptr<INetworkHandler> createHandler();

    virtual std::unique_ptr<INetworkServer> createServerTCP(INetworkServerListener & listener) = 0;
    virtual void connectToRemote(INetworkClientListener & listener, const std::string & host, uint16_t port) = 0;
    virtual void createInternalConnection(INetworkClientListener & listener, INetworkServer & server) = 0;
    virtual std::shared_ptr<INetworkConnection> createAsyncConnection(INetworkConnectionListener & listener) = 0;
    virtual void createTimer(INetworkTimerListener & listener, std::chrono::milliseconds duration) = 0;
    virtual void run() = 0;
    virtual void stop() = 0;
};
```

## 功能说明

- **INetworkConnection**: 网络连接的基类，定义了发送数据包、设置异步写入和关闭连接的基本操作
- **IInternalConnection**: 内部连接接口，用于进程内通信，支持接收数据包、断开连接和连接到其他内部连接
- **INetworkClient**: 网络客户端接口，用于管理传出连接，检查连接状态和发送数据包
- **INetworkServer**: 网络服务器接口，用于监听传入连接，启动服务器并接收内部连接
- **INetworkConnectionListener**: 连接事件监听器接口，处理连接断开和数据包接收事件
- **INetworkHandler**: 网络处理程序接口，负责管理所有网络活动，创建服务器和客户端连接

## 依赖关系

- boost::noncopyable: 禁止复制的基类
- STL库: `<vector>`, `<memory>`, `<string>`
- std::chrono: 用于定时器功能

## 函数注释

### INetworkConnection
- `sendPacket(message)`: 发送数据包
- `setAsyncWritesEnabled(on)`: 设置异步写入是否启用
- `close()`: 关闭连接

### IInternalConnection
- `receivePacket(message)`: 接收数据包
- `disconnect()`: 断开连接
- `connectTo(connection)`: 连接到另一个内部连接

### INetworkClient
- `isConnected()`: 检查是否已连接
- `sendPacket(message)`: 发送数据包

### INetworkServer
- `start(port)`: 在指定端口启动服务器
- `receiveInternalConnection(remoteConnection)`: 接收内部连接

### INetworkConnectionListener
- `onDisconnected(connection, errorMessage)`: 当连接断开时调用
- `onPacketReceived(connection, message)`: 当收到数据包时调用

### INetworkHandler
- `createHandler()`: 创建网络处理程序实例
- `createServerTCP(listener)`: 创建TCP服务器
- `connectToRemote(listener, host, port)`: 连接到远程主机
- `createInternalConnection(listener, server)`: 创建内部连接
- `createAsyncConnection(listener)`: 创建异步连接
- `createTimer(listener, duration)`: 创建定时器
- `run()`: 启动网络处理
- `stop()`: 停止网络处理