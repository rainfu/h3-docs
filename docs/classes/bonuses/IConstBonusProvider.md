# IConstBonusProvider接口

IConstBonusProvider接口是VCMI中常量奖励提供者的抽象接口。

## 类定义

```cpp
class DLL_LINKAGE IConstBonusProvider
{
public:
    virtual const IBonusBearer * getBonusBearer() const = 0;
};
```

## 功能说明

IConstBonusProvider是VCMI奖励系统中的接口，用于提供对常量奖励的访问。任何实现了这个接口的类都可以提供对其奖励承载者（IBonusBearer）的访问，进而可以查询该实体所拥有的奖励信息。这是VCMI中实现游戏实体奖励系统的基础接口之一。

## 依赖关系

- [IBonusBearer](./IBonusBearer.md): 奖励承载者接口

## 函数注释

- `getBonusBearer()`: 获取奖励承载者接口的常量指针，用于查询该实体的奖励信息