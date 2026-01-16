# INetworkConnectionListener接口

INetworkConnectionListener接口是VCMI中网络连接回调的基接口，用于处理任何连接的回调。

## 类定义

```cpp
/// 必须由网络API用户实现的接口，用于处理任何连接的回调
class DLL_LINKAGE INetworkConnectionListener
{
public:
    virtual void onDisconnected(const std::shared_ptr<INetworkConnection> & connection, const std::string & errorMessage) = 0;
    virtual void onPacketReceived(const std::shared_ptr<INetworkConnection> & connection, const std::vector<std::byte> & message) = 0;

    virtual ~INetworkConnectionListener() = default;
};
```

## 功能说明

INetworkConnectionListener是VCMI网络系统中处理网络连接回调的基接口。它定义了连接断开和数据包接收的回调方法，用于处理网络事件。

## 依赖关系

- [INetworkConnection](./INetworkConnection.md): 网络连接接口
- STL库: string, vector, byte, memory等

## 函数注释

- `onDisconnected(connection, errorMessage)`: 连接断开时的回调
- `onPacketReceived(connection, message)`: 数据包接收时的回调
- `~INetworkConnectionListener()`: 虚析构函数，确保派生类正确析构