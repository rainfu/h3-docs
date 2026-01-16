# CCasts类

CCasts类是VCMI战斗系统中法术施放次数的表示类，用于跟踪单位在战斗中的法术施放情况。

## 类定义

```cpp
class DLL_LINKAGE CCasts
{
    sint32 castsRemaining;      // 剩余施法次数
    sint32 castsPerRound;      // 每回合施法次数
    sint32 totalCasts;         // 总施法次数

public:
    CCasts();                                    // 默认构造函数
    CCasts(sint32 perRound, sint32 remaining);  // 带参数的构造函数

    sint32 getCurrentlyCasting() const;         // 当前正在施放的次数
    sint32 getRemainingCasts() const;           // 剩余施法次数
    sint32 getPerRound() const;                 // 每回合施法次数
    sint32 getTotalCasts() const;               // 总施法次数

    void reset();                               // 重置施法次数
    void setCastsPerRound(sint32 value);        // 设置每回合施法次数
    void setRemainingCasts(sint32 value);       // 设置剩余施法次数
    void use();                                 // 使用一次施法机会
    void use(const CUnitState * caster);        // 使用施法机会，基于施法者属性
};
```

## 功能说明

CCasts是VCMI战斗系统中用于跟踪单位法术施放次数的类。它管理单位在战斗中的施法能力，包括每回合可施放的次数、当前剩余次数和总施法次数。这对于控制生物或英雄在战斗中的法术使用频率和数量至关重要。

## 构造函数

- `CCasts()`: 默认构造函数，初始化所有计数为0
- `CCasts(perRound, remaining)`: 带参数的构造函数，设置每回合施法次数和剩余次数

## 函数注释

- `getCurrentlyCasting()`: 获取当前正在施放的次数
- `getRemainingCasts()`: 获取剩余施法次数
- `getPerRound()`: 获取每回合施法次数
- `getTotalCasts()`: 获取总施法次数
- `reset()`: 重置施法次数，通常在每回合开始时调用
- `setCastsPerRound(value)`: 设置每回合施法次数
- `setRemainingCasts(value)`: 设置剩余施法次数
- `use()`: 使用一次施法机会，减少剩余次数
- `use(caster)`: 使用施法机会，基于施法者属性调整次数

## 成员变量

- `castsRemaining`: 剩余施法次数
- `castsPerRound`: 每回合施法次数
- `totalCasts`: 总施法次数

## 设计说明

CCasts类是战斗系统中法术资源管理的重要组成部分。通过跟踪施法次数，游戏可以确保单位不会超过其法术施放限制，从而平衡战斗中的法术使用。该类的重置功能允许在每个回合开始时恢复单位的施法能力，符合《英雄无敌》系列的游戏机制。