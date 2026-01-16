# DamageEstimation类

DamageEstimation类是VCMI中伤害估算的表示，用于计算和存储战斗中可能造成的伤害范围。

## 类定义

```cpp
class DLL_LINKAGE DamageEstimation
{
public:
    int64_t min;  // 最小伤害值
    int64_t max;  // 最大伤害值

    DamageEstimation();                           // 默认构造函数
    DamageEstimation(int64_t minDmg, int64_t maxDmg); // 带参数的构造函数

    // 计算平均伤害值
    double average() const;

    // 重载 += 运算符，将另一个DamageEstimation的值累加到当前对象
    DamageEstimation & operator+=(const DamageEstimation & other);

    // 重载 -= 运算符，从当前对象减去另一个DamageEstimation的值
    DamageEstimation & operator-=(const DamageEstimation & other);

    // 重载 *= 运算符，将当前对象乘以一个因子
    DamageEstimation & operator*=(double factor);

    // 重载 /= 运算符，将当前对象除以一个因子
    DamageEstimation & operator/=(double factor);

    // 重载 + 运算符，返回两个DamageEstimation的和
    DamageEstimation operator+(const DamageEstimation & other) const;

    // 重载 - 运算符，返回两个DamageEstimation的差
    DamageEstimation operator-(const DamageEstimation & other) const;

    // 重载 * 运算符，返回当前DamageEstimation乘以一个因子的结果
    DamageEstimation operator*(double factor) const;

    // 重载 / 运算符，返回当前DamageEstimation除以一个因子的结果
    DamageEstimation operator/(double factor) const;

    // 比较运算符
    bool operator==(const DamageEstimation & other) const;
    bool operator!=(const DamageEstimation & other) const;
};
```

## 功能说明

DamageEstimation是VCMI战斗系统中用于表示伤害估算的类。它存储了战斗中可能造成的伤害范围，包括最小伤害值和最大伤害值。这种范围表示方式反映了游戏中伤害计算的不确定性，因为伤害通常有一个范围而不是固定值。该类还提供了数学运算符重载，方便在伤害计算过程中进行各种数学操作。

## 成员变量

- `min`: 最小伤害值，表示此次攻击可能造成的最低伤害
- `max`: 最大伤害值，表示此次攻击可能造成的最高伤害

## 构造函数

- `DamageEstimation()`: 默认构造函数，初始化min和max为0
- `DamageEstimation(minDmg, maxDmg)`: 带参数的构造函数，使用指定的最小和最大伤害值初始化对象

## 函数注释

- `average()`: 计算并返回最小伤害和最大伤害的平均值
- `operator+=`: 重载的加等于运算符，将另一个DamageEstimation对象的min和max值分别累加到当前对象
- `operator-=`: 重载的减等于运算符，从当前对象的min和max值中分别减去另一个DamageEstimation对象的对应值
- `operator*=`: 重载的乘等于运算符，将当前对象的min和max值都乘以指定因子
- `operator/=`: 重载的除等于运算符，将当前对象的min和max值都除以指定因子
- `operator+`: 重载的加法运算符，返回一个新的DamageEstimation对象，其值为两个操作数的对应值之和
- `operator-`: 重载的减法运算符，返回一个新的DamageEstimation对象，其值为两个操作数的对应值之差
- `operator*`: 重载的乘法运算符，返回一个新的DamageEstimation对象，其min和max值都乘以指定因子
- `operator/`: 重载的除法运算符，返回一个新的DamageEstimation对象，其min和max值都除以指定因子
- `operator==`: 重载的相等运算符，比较两个DamageEstimation对象是否相等
- `operator!=`: 重载的不等运算符，比较两个DamageEstimation对象是否不相等

## 设计说明

DamageEstimation类采用了简单而有效的设计，使用两个int64_t成员变量来表示伤害范围。这种设计既简洁又高效，适合在战斗系统中频繁使用的场景。通过重载常用的数学运算符，该类可以很容易地集成到复杂的伤害计算公式中。

该类的范围表示方法很好地反映了《英雄无敌》系列游戏中伤害计算的特点，即大多数攻击都有一个伤害范围而不是固定的伤害值。通过提供average()方法，用户还可以获得一个预期的伤害值，这对于AI决策和玩家策略制定很有用。