# INetworkServer接口

INetworkServer接口是VCMI中传入连接支持的基类，用于处理服务器端网络连接。

## 类定义

```cpp
/// 传入连接支持的基类
class DLL_LINKAGE INetworkServer : boost::noncopyable
{
public:
    virtual ~INetworkServer() = default;

    virtual uint16_t start(uint16_t port) = 0;
    virtual void receiveInternalConnection(std::shared_ptr<IInternalConnection> remoteConnection) = 0;
};
```

## 功能说明

INetworkServer是VCMI网络系统中处理传入连接的基类。它提供了启动服务器和接收内部连接的功能，用于实现服务器端网络连接。

## 依赖关系

- Boost库: noncopyable
- [IInternalConnection](./IInternalConnection.md): 内部连接接口
- STL库: memory等

## 函数注释

- `~INetworkServer()`: 虚析构函数，确保派生类正确析构
- `start(port)`: 启动服务器并绑定到指定端口，返回实际使用的端口号
- `receiveInternalConnection(remoteConnection)`: 接收内部连接