# IConstBonusProvider接口

IConstBonusProvider接口是VCMI中常量奖励提供者接口，用于提供对实体奖励系统的只读访问。

## 类定义

```cpp
class DLL_LINKAGE IConstBonusProvider
{
public:
    virtual const IBonusBearer * getBonusBearer() const = 0;
};
```

## 功能说明

IConstBonusProvider是VCMI奖励系统中的接口，为实体提供对奖励系统的只读访问。它允许外部代码查询实体的奖励而不修改它们。这个接口是EntityWithBonuses的组成部分，使得实体能够提供对其奖励系统的访问。

## 依赖关系

- [IBonusBearer](../bonuses/IBonusBearer.md): 奖励承载者接口

## 函数注释

- `getBonusBearer()`: 纯虚函数，返回指向奖励承载者的常量指针，用于访问实体的奖励系统