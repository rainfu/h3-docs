# InternalConnection类

InternalConnection类是VCMI中内部连接的实现类，用于在单个进程内的组件间进行通信。

## 类定义

```cpp
class InternalConnection final : public IInternalConnection, public std::enable_shared_from_this<InternalConnection>
{
    std::weak_ptr<IInternalConnection> otherSideWeak;
    NetworkContext & context;
    INetworkConnectionListener & listener;
    bool connectionActive = false;
public:
    InternalConnection(INetworkConnectionListener & listener, NetworkContext & context);

    void receivePacket(const std::vector<std::byte> & message) override;
    void disconnect() override;
    void connectTo(std::shared_ptr<IInternalConnection> connection) override;
    void sendPacket(const std::vector<std::byte> & message) override;
    void setAsyncWritesEnabled(bool on) override;
    void close() override;
};
```

## 功能说明

InternalConnection是VCMI网络系统中内部连接的实现类，继承自IInternalConnection接口。它用于在单个进程内的组件之间进行通信，当TCP连接不可行或不需要时使用。该类提供了接收数据包、断开连接和连接到另一个内部连接的功能。

## 依赖关系

- [IInternalConnection](./IInternalConnection.md): 内部连接接口
- [INetworkConnectionListener](./INetworkConnectionListener.md): 网络连接监听器接口
- [NetworkContext](./NetworkContext.md): 网络上下文
- Boost库: asio, enable_shared_from_this
- STL库: vector, memory, byte等

## 函数注释

### 构造函数
- `InternalConnection(listener, context)`: 构造函数，使用监听器和上下文初始化内部连接

### 公共方法
- `receivePacket(message)`: 接收数据包
- `disconnect()`: 断开连接
- `connectTo(connection)`: 连接到另一个内部连接
- `sendPacket(message)`: 发送数据包
- `setAsyncWritesEnabled(bool on)`: 设置异步写入启用状态
- `close()`: 关闭连接