# EntityT类

EntityT类是VCMI中带ID的实体基类，为具有唯一ID的实体提供通用接口。

## 类定义

```cpp
template <typename IdType>
class DLL_LINKAGE EntityT : public Entity
{
public:
    using IdentifierType = IdType;

    virtual IdType getId() const = 0;
};
```

## 功能说明

EntityT是VCMI实体系统的一个模板基类，用于表示具有唯一ID的实体类型。它继承自Entity类，并添加了一个纯虚函数getId()，用于获取实体的唯一标识符。这种设计模式允许不同类型的实体（如神器、生物、英雄等）具有自己的ID类型，同时保持通用的接口。

## 依赖关系

- [Entity](./Entity.md): 基础实体类
- [IdType](./IdType.md): 实体ID类型

## 函数注释

- `getId()`: 纯虚函数，返回实体的唯一ID
- `IdentifierType`: 类型别名，表示实体的ID类型

EntityT通过继承Entity获得了基本实体功能（如索引、图标索引、JSON键等），并增加了获取具体ID的能力。这个类是EntityWithBonuses的基类，后者进一步为实体添加了奖励系统功能。