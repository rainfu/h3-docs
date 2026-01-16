# CRetaliations类

CRetaliations类是VCMI战斗系统中反击次数的表示类，用于跟踪单位在战斗中的反击能力。

## 类定义

```cpp
class DLL_LINKAGE CRetaliations
{
    sint32 retaliationsLeft;      // 剩余反击次数
    sint32 retaliationsPerRound;  // 每回合反击次数
    sint32 totalRetaliations;     // 总反击次数

public:
    CRetaliations();                                  // 默认构造函数
    CRetaliations(sint32 perRound, sint32 remaining); // 带参数的构造函数

    sint32 getCurrentlyUsed() const;                  // 当前已使用的反击次数
    sint32 getRemainingRetaliations() const;          // 剩余反击次数
    sint32 getPerRound() const;                      // 每回合反击次数
    sint32 getTotalRetaliations() const;             // 总反击次数

    void reset();                                     // 重置反击次数
    void setRetaliationsPerRound(sint32 value);       // 设置每回合反击次数
    void setRemainingRetaliations(sint32 value);      // 设置剩余反击次数
    void use();                                       // 使用一次反击机会
    void use(const CUnitState * defender);            // 使用反击机会，基于防御者属性
};
```

## 功能说明

CRetaliations是VCMI战斗系统中用于跟踪单位反击次数的类。它管理单位在战斗中的反击能力，包括每回合可反击的次数、当前剩余次数和总反击次数。这对于控制单位的反击行为至关重要，特别是在面对多次攻击时的反击限制。

## 构造函数

- `CRetaliations()`: 默认构造函数，初始化所有计数为0
- `CRetaliations(perRound, remaining)`: 带参数的构造函数，设置每回合反击次数和剩余次数

## 函数注释

- `getCurrentlyUsed()`: 获取当前已使用的反击次数
- `getRemainingRetaliations()`: 获取剩余反击次数
- `getPerRound()`: 获取每回合反击次数
- `getTotalRetaliations()`: 获取总反击次数
- `reset()`: 重置反击次数，通常在每回合开始时调用
- `setRetaliationsPerRound(value)`: 设置每回合反击次数
- `setRemainingRetaliations(value)`: 设置剩余反击次数
- `use()`: 使用一次反击机会，减少剩余次数
- `use(defender)`: 使用反击机会，基于防御者属性调整次数

## 成员变量

- `retaliationsLeft`: 剩余反击次数
- `retaliationsPerRound`: 每回合反击次数
- `totalRetaliations`: 总反击次数

## 设计说明

CRetaliations类是战斗系统中反击机制管理的重要组成部分。通过跟踪反击次数，游戏可以确保单位不会超过其反击限制，同时提供合理的反击机制。该类的重置功能允许在每个回合开始时恢复单位的反击能力，符合《英雄无敌》系列的游戏机制。