# INetworkServerListener接口

INetworkServerListener接口是VCMI中传入连接回调的接口，必须由网络API用户实现以处理传入连接回调。

## 类定义

```cpp
/// 必须由网络API用户实现以处理传入连接回调的接口
class DLL_LINKAGE INetworkServerListener : public INetworkConnectionListener
{
public:
    virtual void onNewConnection(const std::shared_ptr<INetworkConnection> &) = 0;
};
```

## 功能说明

INetworkServerListener是VCMI网络系统中处理传入连接回调的接口，继承自INetworkConnectionListener。它扩展了基础连接监听器功能，增加了新连接到达的回调方法，用于处理服务器端网络事件。

## 依赖关系

- [INetworkConnectionListener](./INetworkConnectionListener.md): 网络连接监听器接口
- [INetworkConnection](./INetworkConnection.md): 网络连接接口
- STL库: memory等

## 函数注释

- `onNewConnection(connection)`: 新连接到达时的回调