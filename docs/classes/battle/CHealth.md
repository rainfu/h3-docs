# CHealth类

CHealth类是VCMI战斗系统中生命值的表示类，用于跟踪单位在战斗中的生命值状态。

## 类定义

```cpp
class DLL_LINKAGE CHealth
{
    sint32 healthLeft;      // 剩余生命值
    sint32 healthPerUnit;   // 每单位生命值
    sint32 totalUnits;      // 总单位数

public:
    CHealth();                                  // 默认构造函数
    CHealth(sint32 perUnit, sint32 units);     // 带参数的构造函数

    sint32 getHealthLeft() const;              // 获取剩余生命值
    sint32 getHealthPerUnit() const;           // 获取每单位生命值
    sint32 getTotalUnits() const;              // 获取总单位数
    sint32 getAbsoluteHealth() const;          // 获取绝对生命值

    void heal(sint32 amount);                  // 治疗指定数量的生命值
    void damage(sint32 amount);                // 受到指定数量的伤害
    void setHealthPerUnit(sint32 value);       // 设置每单位生命值
    void setTotalUnits(sint32 value);          // 设置总单位数

    bool isAlive() const;                      // 判断是否存活
    bool isDead() const;                       // 判断是否死亡
    bool isAtFullHealth() const;               // 判断是否满血
};
```

## 功能说明

CHealth是VCMI战斗系统中用于跟踪单位生命值状态的类。它管理单位在战斗中的生命值，包括当前剩余生命值、每单位基础生命值和总单位数。这个类对于战斗中的伤害计算和单位生死判断至关重要。

## 构造函数

- `CHealth()`: 默认构造函数，初始化所有值为0
- `CHealth(perUnit, units)`: 带参数的构造函数，设置每单位生命值和总单位数

## 函数注释

- `getHealthLeft()`: 获取剩余生命值
- `getHealthPerUnit()`: 获取每单位生命值
- `getTotalUnits()`: 获取总单位数
- `getAbsoluteHealth()`: 获取绝对生命值（剩余生命值）
- `heal(amount)`: 治疗指定数量的生命值
- `damage(amount)`: 受到指定数量的伤害
- `setHealthPerUnit(value)`: 设置每单位生命值
- `setTotalUnits(value)`: 设置总单位数
- `isAlive()`: 判断是否存活（剩余生命值大于0）
- `isDead()`: 判断是否死亡（剩余生命值小于等于0）
- `isAtFullHealth()`: 判断是否处于满血状态

## 成员变量

- `healthLeft`: 剩余生命值
- `healthPerUnit`: 每单位生命值
- `totalUnits`: 总单位数

## 设计说明

CHealth类是战斗系统中生命值管理的重要组成部分。通过精确跟踪单位的生命值状态，游戏可以正确处理战斗中的伤害、治疗和单位死亡等事件，确保战斗逻辑的正确性。