# EntityService类

EntityService类是VCMI中实体服务基类，为游戏中所有实体服务提供通用接口。

## 类定义

```cpp
class DLL_LINKAGE EntityService
{
public:
    virtual ~EntityService() = default;

    virtual const Entity * getBaseByIndex(const int32_t index) const = 0;
    virtual void forEachBase(const std::function<void(const Entity * entity, bool & stop)> & cb) const = 0;
};
```

## 功能说明

EntityService是VCMI实体系统的基础服务类，为所有具体实体服务（如ArtifactService、CreatureService等）提供通用接口。它定义了实体服务应具备的基本功能，如通过索引获取实体和遍历所有实体。这个基类允许系统以统一的方式处理不同类型的实体服务。

## 依赖关系

- [Entity](./Entity.md): 基础实体类
- STL库: function等

## 函数注释

- `~EntityService()`: 虚析构函数，确保派生类正确析构
- `getBaseByIndex(index)`: 纯虚函数，根据索引获取基础实体
- `forEachBase(cb)`: 纯虚函数，遍历所有基础实体，回调函数接收实体指针和停止标志。回调函数的第二个参数是引用类型的布尔值，设置为true可提前停止遍历。