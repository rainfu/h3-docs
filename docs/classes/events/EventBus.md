# EventBus类

EventBus类是VCMI中事件总线的实现，用于处理系统中的事件订阅和执行。

## 类定义

```cpp
class DLL_LINKAGE EventBus : public boost::noncopyable
{
public:
    template <typename E>
    std::unique_ptr<EventSubscription> subscribeBefore(typename E::PreHandler && cb)
    {
        auto registry = E::getRegistry();
        return registry->subscribeBefore(this, std::move(cb));
    }

    template <typename E>
    std::unique_ptr<EventSubscription> subscribeAfter(typename E::PostHandler && cb)
    {
        auto registry = E::getRegistry();
        return registry->subscribeAfter(this, std::move(cb));
    }

    template <typename E>
    void executeEvent(E & event, const typename E::ExecHandler & execHandler = typename E::ExecHandler()) const
    {
        auto registry = E::getRegistry();
        registry->executeEvent(this, event, execHandler);
    }
};
```

## 功能说明

EventBus是VCMI事件系统的核心组件，提供了事件订阅和执行机制。它允许系统组件注册事件处理器（在事件执行前后），并在适当时机触发事件。该系统使用模板来支持不同类型事件的处理，实现了松耦合的设计模式。

## 依赖关系

- [SubscriptionRegistry](./SubscriptionRegistry.md): 订阅注册表
- [EventSubscription](./EventSubscription.md): 事件订阅
- [Environment](../environment/Environment.md): 环境接口
- Boost库: noncopyable
- STL库: unique_ptr

## 函数注释

- `subscribeBefore<E>(cb)`: 订阅事件执行前的回调函数，返回一个订阅的唯一指针
- `subscribeAfter<E>(cb)`: 订阅事件执行后的回调函数，返回一个订阅的唯一指针
- `executeEvent<E>(event, execHandler)`: 执行指定事件，可以选择性地传递执行处理器

## 模板参数说明

- `E`: 事件类型，必须是实现了适当处理器类型（PreHandler, PostHandler, ExecHandler）和getRegistry方法的事件类