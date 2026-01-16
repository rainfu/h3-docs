# EntityWithBonuses类

EntityWithBonuses类是VCMI中带奖励的实体基类，为具有奖励系统的实体提供通用接口。

## 类定义

```cpp
template <typename IdType>
class DLL_LINKAGE EntityWithBonuses : public EntityT<IdType>, public IConstBonusProvider
{
};
```

## 功能说明

EntityWithBonuses是VCMI实体系统的一个模板基类，用于表示具有奖励系统的实体类型。它继承自EntityT<IdType>和IConstBonusProvider，为实体提供访问奖励系统的能力。这种设计模式允许实体（如神器、生物、英雄等）既具备基本实体属性，又能参与游戏的奖励计算系统。

## 依赖关系

- [EntityT](./EntityT.md): 带ID的实体基类
- [IConstBonusProvider](./IConstBonusProvider.md): 常量奖励提供者接口
- [IBonusBearer](../bonuses/IBonusBearer.md): 奖励承载者接口
- [IdType](./IdType.md): 实体ID类型

## 函数注释

EntityWithBonuses是一个模板类，本身没有特定的成员函数，而是通过继承组合了EntityT和IConstBonusProvider的功能：

- 从EntityT继承基本实体功能（索引、图标索引、JSON键、模块范围、名称等）
- 从IConstBonusProvider继承奖励系统访问功能（通过getBonusBearer方法）
- 提供了IdentifierType类型别名，用于表示实体的ID类型

这个类的典型用法是作为Artifact、Creature、HeroType等实体类型的基类，使这些实体能够拥有奖励系统功能。