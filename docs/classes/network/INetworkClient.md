# INetworkClient接口

INetworkClient接口是VCMI中传出连接支持的基类，用于处理客户端网络连接。

## 类定义

```cpp
/// 传出连接支持的基类
class DLL_LINKAGE INetworkClient : boost::noncopyable
{
public:
    virtual ~INetworkClient() = default;

    virtual bool isConnected() const = 0;
    virtual void sendPacket(const std::vector<std::byte> & message) = 0;
};
```

## 功能说明

INetworkClient是VCMI网络系统中处理传出连接的基类。它提供了检查连接状态和发送数据包的功能，用于实现客户端网络连接。

## 依赖关系

- Boost库: noncopyable
- STL库: vector, byte等

## 函数注释

- `~INetworkClient()`: 虚析构函数，确保派生类正确析构
- `isConnected()`: 检查是否已连接
- `sendPacket(message)`: 发送数据包