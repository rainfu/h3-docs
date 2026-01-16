# ResourceType接口

ResourceType接口是VCMI中资源类型的抽象接口，继承自EntityT。

## 类定义

```cpp
class DLL_LINKAGE ResourceType : public EntityT<GameResID>
{
    virtual int getPrice() const = 0;
};
```

## 功能说明

ResourceType是VCMI游戏中资源类型系统的基接口，用于表示游戏中的各种资源类型（如金币、木材、矿石等）。它提供了访问资源基本属性的方法，如资源的价格。该接口继承自EntityT，使其具备实体特征和ID管理功能。

## 依赖关系

- [EntityT](../entities/EntityT.md): 通用实体基类
- [GameResID](../identifiers/GameResID.md): 游戏资源ID类型

## 函数注释

- `getPrice()`: 获取资源的价格，这在交易和市场操作中可能会用到