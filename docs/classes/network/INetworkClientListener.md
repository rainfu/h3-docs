# INetworkClientListener接口

INetworkClientListener接口是VCMI中传出连接回调的接口，必须由网络API用户实现以处理传出连接回调。

## 类定义

```cpp
/// 必须由网络API用户实现以处理传出连接回调的接口
class DLL_LINKAGE INetworkClientListener : public INetworkConnectionListener
{
public:
    virtual void onConnectionFailed(const std::string & errorMessage) = 0;
    virtual void onConnectionEstablished(const std::shared_ptr<INetworkConnection> &) = 0;
};
```

## 功能说明

INetworkClientListener是VCMI网络系统中处理传出连接回调的接口，继承自INetworkConnectionListener。它扩展了基础连接监听器功能，增加了连接建立和连接失败的回调方法，用于处理客户端网络事件。

## 依赖关系

- [INetworkConnectionListener](./INetworkConnectionListener.md): 网络连接监听器接口
- [INetworkConnection](./INetworkConnection.md): 网络连接接口
- STL库: string, memory等

## 函数注释

- `onConnectionFailed(errorMessage)`: 连接失败时的回调
- `onConnectionEstablished(connection)`: 连接建立时的回调