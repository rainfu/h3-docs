# EntityWithBonuses模板类

EntityWithBonuses模板类是VCMI中带奖励的实体类，继承自EntityT和IConstBonusProvider。

## 类定义

```cpp
template <typename IdType>
class DLL_LINKAGE EntityWithBonuses : public EntityT<IdType>, public IConstBonusProvider
{
};
```

## 功能说明

EntityWithBonuses是VCMI中带有奖励系统的实体类，结合了类型化实体的ID管理和常量奖励提供功能。这个模板类将EntityT的类型化实体特性与IConstBonusProvider的奖励访问能力结合起来，使得实体既具有唯一标识，又能提供奖励信息。许多游戏中的实体类（如英雄、生物、物品等）都会继承自这个类。

## 模板参数

- `IdType`: 实体ID的类型，通常是某种枚举或强类型ID

## 依赖关系

- [EntityT](./EntityT.md): 通用实体基类
- [IConstBonusProvider](../bonuses/IConstBonusProvider.md): 常量奖励提供者接口

## 功能特点

EntityWithBonuses是一个空的模板类，它通过多重继承结合了两个重要的功能：
1. 通过EntityT获得类型化实体的能力（ID、名称等）
2. 通过IConstBonusProvider获得奖励系统的访问能力

这使得继承自这个类的实体能够参与VCMI的奖励计算系统，这是游戏平衡和玩法多样性的关键组成部分。