# SubscriptionRegistry类

SubscriptionRegistry类是VCMI中事件订阅注册表的模板类，用于管理事件处理器的注册和执行。

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

    std::unique_ptr<EventSubscription> subscribeBefore(BusTag tag, PreHandler && handler)
    {
        std::unique_lock<std::shared_mutex> lock(mutex);

        auto storage = std::make_shared<PreHandlerStorage>(std::move(handler));
        preHandlers[tag].push_back(storage);
        return std::make_unique<PreSubscription>(tag, storage);
    }

    std::unique_ptr<EventSubscription> subscribeAfter(BusTag tag, PostHandler && handler)
    {
        std::unique_lock<std::shared_mutex> lock(mutex);

        auto storage = std::make_shared<PostHandlerStorage>(std::move(handler));
        postHandlers[tag].push_back(storage);
        return std::make_unique<PostSubscription>(tag, storage);
    }

    void executeEvent(const EventBus * bus, E & event, const ExecHandler & execHandler)
    {
        std::shared_lock<std::shared_mutex> lock(mutex);
        {
            auto it = preHandlers.find(bus);

            if(it != std::end(preHandlers))
            {
                for(auto & h : it->second)
                    (*h)(event);
            }
        }

        if(event.isEnabled())
        {
            if(execHandler)
                execHandler(event);

            auto it = postHandlers.find(bus);

            if(it != std::end(postHandlers))
            {
                for(auto & h : it->second)
                    (*h)(event);
            }
        }
    }

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

SubscriptionRegistry是VCMI事件系统的核心组件之一，用于管理特定事件类型E的处理器注册表。它维护了事件执行前和执行后的处理器列表，并提供注册和执行机制。该类使用线程安全的互斥锁来保护多线程环境下的访问。

## 依赖关系

- [EventBus](./EventBus.md): 事件总线
- [EventSubscription](./EventSubscription.md): 事件订阅
- Boost库: noncopyable
- STL库: function, map, vector, shared_mutex, shared_ptr, unique_ptr

## 类型别名

- `PreHandler`: 事件执行前的处理器类型
- `ExecHandler`: 事件执行时的处理器类型
- `PostHandler`: 事件执行后的处理器类型
- `BusTag`: 事件总线标签类型，为const void指针

## 函数注释

- `subscribeBefore(tag, handler)`: 注册事件执行前的处理器，返回订阅对象的唯一指针
- `subscribeAfter(tag, handler)`: 注册事件执行后的处理器，返回订阅对象的唯一指针
- `executeEvent(bus, event, execHandler)`: 在指定的事件总线上执行事件，按顺序调用前置处理器、执行处理器和后置处理器

## 内部类说明

- `HandlerStorage`: 用于存储处理器函数的内部模板类
- `PreSubscription`: 用于管理前置处理器订阅的内部类
- `PostSubscription`: 用于管理后置处理器订阅的内部类