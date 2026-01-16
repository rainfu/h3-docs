# INetworkTimerListener接口

INetworkTimerListener接口是VCMI中网络线程计时器的接口，必须由网络API用户实现以处理网络线程上的计时器。

## 类定义

```cpp
/// 必须由网络API用户实现以处理网络线程上的计时器的接口
class DLL_LINKAGE INetworkTimerListener
{
public:
    virtual ~INetworkTimerListener() = default;

    virtual void onTimer() = 0;
};
```

## 功能说明

INetworkTimerListener是VCMI网络系统中处理网络线程计时器的接口。它定义了计时器触发时的回调方法，用于处理网络线程上的定时任务。

## 依赖关系

无外部依赖

## 函数注释

- `~INetworkTimerListener()`: 虚析构函数，确保派生类正确析构
- `onTimer()`: 计时器触发时的回调