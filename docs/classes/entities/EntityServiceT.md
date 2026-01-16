# EntityServiceT类

EntityServiceT类是VCMI中实体服务模板类，为特定类型的实体提供服务接口。

## 类定义

```cpp
class DLL_LINKAGE EntityService
{
public:
    virtual ~EntityService() = default;

    virtual const Entity * getBaseByIndex(const int32_t index) const = 0;
    virtual void forEachBase(const std::function<void(const Entity * entity, bool & stop)> & cb) const = 0;
};

template <typename IdType, typename EntityType>
class DLL_LINKAGE EntityServiceT : public EntityService
{
public:
    virtual const EntityType * getById(const IdType & id) const = 0;
    virtual const EntityType * getByIndex(const int32_t index) const = 0;

    virtual void forEach(const std::function<void(const EntityType * entity, bool & stop)> & cb) const = 0;
};
```

## 功能说明

EntityServiceT是VCMI实体系统中的服务模板类，为特定类型的实体提供标准化的访问接口。它继承自EntityService基类，添加了针对特定实体类型的查询方法。这种设计允许系统以一致的方式处理不同类型的实体（如神器、生物、城镇等），同时保持类型安全。

## 依赖关系

- [EntityService](./EntityService.md): 实体服务基类
- [Entity](./Entity.md): 基础实体类
- [IdType](./IdType.md): 实体ID类型
- [EntityType](./EntityType.md): 实体类型
- STL库: function等

## 函数注释

### EntityService基类

- `~EntityService()`: 虚析构函数，确保派生类正确析构
- `getBaseByIndex(index)`: 纯虚函数，根据索引获取基础实体
- `forEachBase(cb)`: 纯虚函数，遍历所有基础实体，回调函数接收实体指针和停止标志

### EntityServiceT模板类

- `getById(id)`: 纯虚函数，根据ID获取特定类型的实体
- `getByIndex(index)`: 纯虚函数，根据索引获取特定类型的实体
- `forEach(cb)`: 纯虚函数，遍历所有特定类型的实体，回调函数接收实体指针和停止标志