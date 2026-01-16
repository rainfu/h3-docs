# HeroClass接口

HeroClass接口是VCMI中英雄职业的抽象接口，继承自EntityT。

## 类定义

```cpp
class DLL_LINKAGE HeroClass : public EntityT<HeroClassID>
{
};
```

## 功能说明

HeroClass是VCMI游戏中英雄职业系统的基础接口，用于表示游戏中的各种英雄职业（如骑士、游侠、术士等）。作为EntityT的特化，它为英雄职业提供了唯一的ID标识。虽然这个接口本身没有定义任何特定方法，但它作为所有英雄职业实现的基类，提供了标准化的实体管理功能。

## 依赖关系

- [EntityT](../entities/EntityT.md): 通用实体基类
- [HeroClassID](../identifiers/HeroClassID.md): 英雄职业ID类型

## 功能特点

HeroClass是一个空的接口，它继承自 `EntityT<HeroClassID>`，这意味着它自动获得了实体的基本功能，如ID管理、名称获取等。具体的职业功能通常会在实现类中添加。这个接口的存在是为了在类型系统中区分职业和其他类型的实体。