# CShots类

CShots类是VCMI战斗系统中射击次数的表示类，用于跟踪单位在战斗中的射击能力。

## 类定义

```cpp
class DLL_LINKAGE CShots
{
    sint32 shotsRemaining;      // 剩余射击次数
    sint32 shotsPerRound;      // 每回合射击次数
    sint32 totalShots;         // 总射击次数

public:
    CShots();                 // 默认构造函数
    CShots(sint32 perRound, sint32 remaining); // 带参数的构造函数

    sint32 getCurrentlyUsed() const; // 当前已使用的射击次数
    sint32 getRemainingShots() const; // 剩余射击次数
    sint32 getPerRound() const;       // 每回合射击次数
    sint32 getTotalShots() const;     // 总射击次数

    void reset();                     // 重置射击次数
    void setShotsPerRound(sint32 value); // 设置每回合射击次数
    void setRemainingShots(sint32 value); // 设置剩余射击次数
    void use();                       // 使用一次射击机会
    void use(const CUnitState * shooter); // 使用射击机会，基于射手属性
};
```

## 功能说明

CShots是VCMI战斗系统中用于跟踪单位射击次数的类。它管理单位在战斗中的射击能力，包括每回合可射击的次数、当前剩余次数和总射击次数。这对于远程单位（如弓箭手、投石车等）的射击管理至关重要。

## 构造函数

- `CShots()`: 默认构造函数，初始化所有计数为0
- `CShots(perRound, remaining)`: 带参数的构造函数，设置每回合射击次数和剩余次数

## 函数注释

- `getCurrentlyUsed()`: 获取当前已使用的射击次数
- `getRemainingShots()`: 获取剩余射击次数
- `getPerRound()`: 获取每回合射击次数
- `getTotalShots()`: 获取总射击次数
- `reset()`: 重置射击次数，通常在每回合开始时调用
- `setShotsPerRound(value)`: 设置每回合射击次数
- `setRemainingShots(value)`: 设置剩余射击次数
- `use()`: 使用一次射击机会，减少剩余次数
- `use(shooter)`: 使用射击机会，基于射手属性调整次数

## 成员变量

- `shotsRemaining`: 剩余射击次数
- `shotsPerRound`: 每回合射击次数
- `totalShots`: 总射击次数