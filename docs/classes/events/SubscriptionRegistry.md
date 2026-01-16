# SubscriptionRegistry模板类

SubscriptionRegistry模板类是VCMI中事件订阅注册表的实现，用于管理事件处理器的注册和执行。

## 类定义

```cpp
template <typename E>
class SubscriptionRegistry : public boost::noncopyable
{
public:
    using PreHandler = std::function<void(E &)>;
    using ExecHandler = std::function<void(E &)>;
    using PostHandler = std::function<void(const E &)>;
    using BusTag = const void *;

    std::unique_ptr<EventSubscription> subscribeBefore(BusTag tag, PreHandler && handler);
    void executeEvent(const EventBus * bus, E & event, const ExecHandler & execHandler);

private:
    template <typename T>
    class HandlerStorage
    {
    public:
        explicit HandlerStorage(T && handler_)
            : handler(handler_)
        {
        }

        STRONG_INLINE
        void operator()(E & event)
        {
            handler(event);
        }
    private:
        T handler;
    };

    using PreHandlerStorage = HandlerStorage<PreHandler>;
    using PostHandlerStorage = HandlerStorage<PostHandler>;

    class PreSubscription : public EventSubscription
    {
    public:
        PreSubscription(BusTag tag_, std::shared_ptr<PreHandlerStorage> handler_)
            : handler(handler_),
            tag(tag_)
        {
        }

        virtual ~PreSubscription()
        {
            auto registry = E::getRegistry();
            registry->unsubscribe(tag, handler, registry->preHandlers);
        }
    private:
        BusTag tag;
        std::shared_ptr<PreHandlerStorage> handler;
    };

    class PostSubscription : public EventSubscription
    {
    public:
        PostSubscription(BusTag tag_, std::shared_ptr<PostHandlerStorage> handler_)
            : handler(handler_),
            tag(tag_)
        {
        }

        virtual ~PostSubscription()
        {
            auto registry = E::getRegistry();
            registry->unsubscribe(tag, handler, registry->postHandlers);
        }
    private:
        BusTag tag;
        std::shared_ptr<PostHandlerStorage> handler;
    };

    std::shared_mutex mutex;

    std::map<BusTag, std::vector<std::shared_ptr<PreHandlerStorage>>> preHandlers;
    std::map<BusTag, std::vector<std::shared_ptr<PostHandlerStorage>>> postHandlers;

    template <typename T>
    void unsubscribe(BusTag tag, T what, std::map<BusTag, std::vector<T>> & from)
    {
        std::unique_lock<std::shared_mutex> lock(mutex);

        auto it = from.find(tag);

        if(it != std::end(from))
        {
            it->second -= what;

            if(it->second.empty())
            {
                from.erase(tag);
            }
        }
    }
};
```

## 功能说明

SubscriptionRegistry是VCMI事件系统中的核心组件，负责管理特定事件类型的处理器注册和执行。它实现了事件的前置处理器（pre-handler）、执行处理器（exec-handler）和后置处理器（post-handler）的调度机制。该类使用模板参数E来指定它管理的事件类型。

## 依赖关系

- STL库: function, unique_ptr, shared_ptr, map, vector
- Boost库: noncopyable
- [EventBus](./EventBus.md): 事件总线
- [EventSubscription](./EventSubscription.md): 事件订阅基类

## 类型别名

- `PreHandler`: 前置处理器类型，接受事件的引用作为参数
- `ExecHandler`: 执行处理器类型，接受事件的引用作为参数
- `PostHandler`: 后置处理器类型，接受事件的常量引用作为参数
- `BusTag`: 事件总线标签类型，用于标识不同的事件总线

## 函数注释

- `subscribeBefore(tag, handler)`: 注册一个前置处理器，当事件发生前执行。返回一个EventSubscription的智能指针，用于管理订阅的生命周期。
- `executeEvent(bus, event, execHandler)`: 执行事件处理流程，依次执行前置处理器、执行处理器和后置处理器。

## 设计说明

SubscriptionRegistry采用观察者模式，允许代码注册对特定事件的兴趣，并在事件发生时接收通知。它使用线程安全的共享互斥锁（shared_mutex）来保护内部数据结构，允许多个线程同时读取处理器列表，但在修改时进行独占锁定。

该类的实现还包括自动清理机制，当订阅对象被销毁时，对应的处理器会自动从注册表中移除。这避免了手动管理订阅生命周期的复杂性，并防止了内存泄漏。
