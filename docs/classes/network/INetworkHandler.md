# INetworkHandler接口

INetworkHandler接口是VCMI中网络处理的主要接口，负责处理所有网络活动。

## 类定义

```cpp
/// 主要处理所有网络活动的类
class DLL_LINKAGE INetworkHandler : boost::noncopyable
{
public:
    virtual ~INetworkHandler() = default;

    /// 构造默认实现
    static std::unique_ptr<INetworkHandler> createHandler();

    /// 创建允许在本地端口接收连接的TCP服务器实例
    virtual std::unique_ptr<INetworkServer> createServerTCP(INetworkServerListener & listener) = 0;

    /// 创建允许建立到远程端口的单个传出连接的TCP客户端实例
    /// 成功时：INetworkTimerListener::onConnectionEstablished() 将被调用，连接作为参数提供
    /// 失败时：INetworkTimerListener::onConnectionFailed 将被调用，并附带人类可读的错误消息
    virtual void connectToRemote(INetworkClientListener & listener, const std::string & host, uint16_t port) = 0;

    /// 创建一个内部连接实例，该连接连接到网络服务器，但使用进程内通信而不是TCP
    /// 成功时：INetworkTimerListener::onConnectionEstablished() 将异步调用，连接作为参数提供
    virtual void createInternalConnection(INetworkClientListener & listener, INetworkServer & server) = 0;

    /// 创建一个单向连接，允许以异步形式向侦听器发送消息
    virtual std::shared_ptr<INetworkConnection> createAsyncConnection(INetworkConnectionListener & listener) = 0;

    /// 创建一个定时器，将在指定间隔后调用一次
    /// 成功时：INetworkTimerListener::onTimer() 将被调用
    /// 失败时：无操作
    virtual void createTimer(INetworkTimerListener & listener, std::chrono::milliseconds duration) = 0;

    /// 在此线程上启动网络处理。在终止网络处理之前不会返回
    virtual void run() = 0;
    virtual void stop() = 0;
};
```

## 功能说明

INetworkHandler是VCMI网络系统的主要接口，负责处理所有网络活动。它提供了创建TCP服务器和客户端、内部连接、异步连接和定时器的功能。该接口封装了底层网络通信的复杂性，为上层代码提供简洁的网络操作接口。

## 依赖关系

- [INetworkServer](./INetworkServer.md): 网络服务器接口
- [INetworkServerListener](./INetworkServerListener.md): 网络服务器监听器接口
- [INetworkClientListener](./INetworkClientListener.md): 网络客户端监听器接口
- [INetworkConnection](./INetworkConnection.md): 网络连接接口
- [INetworkConnectionListener](./INetworkConnectionListener.md): 网络连接监听器接口
- [INetworkTimerListener](./INetworkTimerListener.md): 网络计时器监听器接口
- Boost库: noncopyable
- STL库: string, chrono, memory等

## 函数注释

- `~INetworkHandler()`: 虚析构函数，确保派生类正确析构
- `createHandler()`: 静态工厂方法，创建默认的网络处理程序实现
- `createServerTCP(listener)`: 创建TCP服务器并返回其接口
- `connectToRemote(listener, host, port)`: 连接到远程主机
- `createInternalConnection(listener, server)`: 创建内部连接
- `createAsyncConnection(listener)`: 创建异步连接并返回其接口
- `createTimer(listener, duration)`: 创建定时器
- `run()`: 启动网络处理循环
- `stop()`: 停止网络处理循环