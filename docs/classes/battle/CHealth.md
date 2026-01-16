# CHealth类

CHealth类是VCMI战斗系统中生命值状态的表示类，用于跟踪单位在战斗中的生命值变化。

## 类定义

```cpp
class DLL_LINKAGE CHealth
{
    sint64 totalHealth;         // 总生命值
    sint64 healthAtStart;      // 开始时的生命值
    sint64 firstHPleft;        // 第一单位剩余生命值
    sint64 fullUnits;          // 完整单位数量

public:
    CHealth();                // 默认构造函数
    CHealth(sint64 total, sint64 firstHP); // 带参数的构造函数

    sint64 getTotal() const;      // 获取总生命值
    sint64 getFirstHP() const;    // 获取第一单位剩余生命值
    sint64 getFullUnits() const;  // 获取完整单位数量
    sint64 getAliveUnits() const; // 获取存活单位数量
    sint64 getAvailable() const;  // 获取可用生命值

    void reset();                 // 重置生命值状态
    void setTotal(sint64 value);  // 设置总生命值
    void setFirstHP(sint64 value); // 设置第一单位剩余生命值
    void setFullUnits(sint64 value); // 设置完整单位数量
    void takeDamage(sint64 damage);  // 承受伤害
    void heal(sint64 amount);        // 治疗
};
```

## 功能说明

CHealth是VCMI战斗系统中用于跟踪单位生命值状态的类。它管理单位在战斗中的生命值，包括总生命值、第一单位剩余生命值和完整单位数量。这对于处理战斗中的伤害、治疗和单位损失至关重要。

## 构造函数

- `CHealth()`: 默认构造函数，初始化所有值为0
- `CHealth(total, firstHP)`: 带参数的构造函数，设置总生命值和第一单位剩余生命值

## 函数注释

- `getTotal()`: 获取总生命值
- `getFirstHP()`: 获取第一单位剩余生命值
- `getFullUnits()`: 获取完整单位数量
- `getAliveUnits()`: 获取存活单位数量
- `getAvailable()`: 获取可用生命值
- `reset()`: 重置生命值状态
- `setTotal(value)`: 设置总生命值
- `setFirstHP(value)`: 设置第一单位剩余生命值
- `setFullUnits(value)`: 设置完整单位数量
- `takeDamage(damage)`: 承受伤害，减少生命值
- `heal(amount)`: 治疗，增加生命值

## 成员变量

- `totalHealth`: 总生命值
- `healthAtStart`: 开始时的生命值
- `firstHPleft`: 第一单位剩余生命值
- `fullUnits`: 完整单位数量