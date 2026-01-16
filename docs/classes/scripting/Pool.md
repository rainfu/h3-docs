# scripting::Pool接口

scripting::Pool接口是VCMI中脚本池的抽象接口，用于管理和复用脚本执行上下文。

## 类定义

```cpp
class DLL_LINKAGE Pool
{
public:
    virtual ~Pool() = default;

    virtual void serializeState(const bool saving, JsonNode & data) = 0;

    virtual std::shared_ptr<Context> getContext(const Script * script) = 0;
};
```

## 功能说明

Pool是VCMI脚本系统中的资源管理接口，负责管理和复用脚本执行上下文。它提供了一种机制来避免频繁创建和销毁脚本上下文带来的性能开销，通过复用现有的上下文实例来提高脚本执行效率。此外，它还支持序列化功能，可以在需要时保存和恢复脚本池的状态。

## 依赖关系

- STL库: shared_ptr
- [Context](./Context.md): 脚本执行上下文
- [Script](./Script.md): 脚本接口
- [JsonNode](../json/JsonNode.md): JSON节点类型

## 函数注释

- `~Pool()`: 虚析构函数，确保派生类正确销毁
- `serializeState(saving, data)`: 序列化或反序列化脚本池的状态。如果saving为true，则将状态保存到data；如果saving为false，则从data恢复状态
- `getContext(script)`: 为指定的脚本获取一个可用的执行上下文。如果可能，该方法可能会返回一个复用的上下文，或者创建一个新的上下文

## 设计说明

Pool接口采用了对象池设计模式，旨在优化脚本执行上下文的创建和销毁过程。在复杂的脚本环境中，频繁创建新的Context实例可能导致性能问题，而Pool通过复用现有实例解决了这个问题。

该接口还考虑了状态持久化的需求，通过serializeState方法支持在程序运行期间保存和恢复脚本池的状态。这种设计特别适用于需要长时间运行的脚本环境，例如游戏服务器或需要状态恢复的应用场景。

Pool与Context和Script接口协作，形成了一个完整的脚本执行管理框架，其中Pool负责资源管理，Script定义脚本内容，Context提供执行环境。