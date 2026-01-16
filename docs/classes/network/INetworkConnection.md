# INetworkConnection接口

INetworkConnection接口是VCMI中网络连接的基类，用于与其他服务的连接，无论是传入还是传出。

## 类定义

```cpp
/// 与其他服务的连接基类，无论是传入还是传出
class DLL_LINKAGE INetworkConnection : boost::noncopyable
{
public:
    virtual ~INetworkConnection() = default;
    virtual void sendPacket(const std::vector<std::byte> & message) = 0;
    virtual void setAsyncWritesEnabled(bool on) = 0;
    virtual void close() = 0;
};
```

## 功能说明

INetworkConnection是VCMI网络系统中网络连接的基类。它定义了网络连接的基本操作，如发送数据包、设置异步写入和关闭连接。该接口为不同类型的网络连接提供了统一的操作接口。

## 依赖关系

- Boost库: noncopyable
- STL库: vector, byte等

## 函数注释

- `~INetworkConnection()`: 虚析构函数，确保派生类正确析构
- `sendPacket(message)`: 发送数据包
- `setAsyncWritesEnabled(on)`: 启用或禁用异步写入
- `close()`: 关闭连接
