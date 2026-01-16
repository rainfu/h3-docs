# IInternalConnection接口

IInternalConnection接口是VCMI中内部连接的接口，用于在单个进程中通信，当TCP不可行或不需要时使用。

## 类定义

```cpp
/// 用于单个进程内的内部连接，当TCP不可行或不需要时使用
class IInternalConnection : public INetworkConnection
{
public:
    virtual void receivePacket(const std::vector<std::byte> & message) = 0;
    virtual void disconnect() = 0;
    virtual void connectTo(std::shared_ptr<IInternalConnection> connection) = 0;
};
```

## 功能说明

IInternalConnection是VCMI网络系统中内部连接的接口，继承自INetworkConnection。它用于在单个进程内的组件之间进行通信，当TCP连接不可行或不需要时使用。该接口提供了接收数据包、断开连接和连接到另一个内部连接的功能。

## 依赖关系

- [INetworkConnection](./INetworkConnection.md): 网络连接接口
- STL库: vector, byte, memory等

## 函数注释

- `receivePacket(message)`: 接收数据包
- `disconnect()`: 断开连接
- `connectTo(connection)`: 连接到另一个内部连接