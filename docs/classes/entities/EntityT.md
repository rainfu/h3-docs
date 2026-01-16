# EntityT模板类

EntityT模板类是VCMI中类型化实体的基类，继承自Entity。

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

EntityT是VCMI中类型化实体的基类，继承自Entity类。它为特定类型的实体提供ID管理功能，允许使用强类型的ID来标识实体。这个模板类使得不同的实体类型可以使用不同的ID类型（如HeroTypeID、CreatureID等），增强了类型安全性。

## 模板参数

- `IdType`: 实体ID的类型，通常是某种枚举或强类型ID

## 依赖关系

- [Entity](./Entity.md): 通用实体基类

## 类型别名

- `IdentifierType`: 标识符类型，即模板参数IdType

## 函数注释

- `getId()`: 获取实体的强类型ID