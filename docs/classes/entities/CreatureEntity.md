# CreatureEntity类

CreatureEntity类是VCMI中生物实体模板类，为具有特定ID类型的生物提供通用功能。

## 类定义

```cpp
template <typename IdType>
class DLL_LINKAGE CreatureEntity : public EntityT<IdType>, public ACreature
{
};
```

## 功能说明

CreatureEntity是VCMI生物系统中的模板基类，结合了EntityT的实体功能和ACreature的生物行为。它为具有特定ID类型的生物提供了一个通用框架，允许不同种类的生物实体（如常规生物、英雄单位等）共享相同的基础功能。这种设计模式实现了关注点分离，将实体标识、生物行为和具体业务逻辑分开。

## 依赖关系

- [EntityT](./EntityT.md): 带ID的实体基类
- [ACreature](./ACreature.md): 抽象生物类
- [IdType](./IdType.md): 实体ID类型

## 函数注释

CreatureEntity是一个模板类，本身没有特定的成员函数，而是通过多重继承组合了EntityT和ACreature的功能：

- 从EntityT继承基本实体功能（索引、图标索引、JSON键、ID等）
- 从ACreature继承生物行为（移动范围、生命值、主动性等）
- 提供了IdentifierType类型别名，用于表示实体的ID类型

这个类的典型用法是作为Creature等具体生物类型的基类，使这些实体既具备基本实体属性，又具有生物行为特征。