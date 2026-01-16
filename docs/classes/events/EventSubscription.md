# EventSubscription类

EventSubscription类是VCMI中事件订阅的基类，用于管理事件处理器的生命周期。

## 类定义

```cpp
class DLL_LINKAGE EventSubscription : public boost::noncopyable
{
public:
    virtual ~EventSubscription() = default;
};
```

## 功能说明

EventSubscription是VCMI事件系统中的基础抽象类，为所有事件订阅提供了一个通用接口。它继承自boost::noncopyable以防止复制，确保订阅对象的唯一性和生命周期管理的准确性。当订阅不再需要时，其析构函数会自动取消订阅，从而避免内存泄漏和悬空指针。

## 依赖关系

- Boost库: noncopyable
- [SubscriptionRegistry](./SubscriptionRegistry.md): 订阅注册表

## 函数注释

- `~EventSubscription()`: 虚析构函数，确保派生类正确销毁。声明为default，利用编译器生成默认的析构函数实现。

## 设计说明

EventSubscription类采用了RAII（Resource Acquisition Is Initialization）模式，通过对象的生命周期来管理事件订阅。当EventSubscription对象被销毁时，相关的事件处理器会自动从系统中移除。这种设计简化了事件管理，避免了手动取消订阅的复杂性。