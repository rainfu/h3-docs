# Event类

Event类是VCMI中事件系统的基类，定义了所有事件对象的基本接口。

## 类定义

```cpp
class DLL_LINKAGE Event
{
public:
    virtual bool isEnabled() const = 0;
};
```

## 功能说明

Event是VCMI事件系统中的基础抽象类，为所有事件类型提供了一个通用接口。它是事件驱动架构中的核心组件，允许系统响应各种游戏内发生的事件。所有具体的事件类型都需要继承自此类并实现isEnabled方法。

## 依赖关系

- [EventBus](./EventBus.md): 事件总线
- [SubscriptionRegistry](./SubscriptionRegistry.md): 订阅注册表

## 函数注释

- `isEnabled()`: 纯虚函数，用于检查事件是否处于启用状态。返回true表示事件当前有效并应该被处理，返回false表示事件被禁用或不应处理。

## 设计说明

Event类采用了抽象基类的设计模式，为VCMI的事件系统提供了统一的接口。这种设计使得事件处理系统能够以统一的方式处理各种不同类型的事件，同时保持了良好的扩展性，允许添加新的事件类型而无需修改现有的事件处理代码。