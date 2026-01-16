# DamageEstimation类

DamageEstimation类是VCMI战斗系统中伤害估算的表示类，用于预测和计算战斗中的伤害值。

## 类定义

```cpp
class DLL_LINKAGE DamageEstimation
{
public:
    int64_t damageMinimal;   // 最小伤害值
    int64_t damageMaximal;   // 最大伤害值

    DamageEstimation();                           // 默认构造函数
    DamageEstimation(int64_t min, int64_t max);  // 带参数的构造函数

    int64_t getExpectedDamage(const CRandomGenerator & rand) const;  // 获取期望伤害值
    int64_t getExpectedDamage() const;                              // 获取平均期望伤害值
    int64_t getMinDamage() const;                                   // 获取最小伤害值
    int64_t getMaxDamage() const;                                   // 获取最大伤害值

    DamageEstimation & operator+=(const DamageEstimation & other);   // 加法赋值运算符
    DamageEstimation operator+(const DamageEstimation & other) const; // 加法运算符
    DamageEstimation & operator*=(double multiplier);                // 乘法赋值运算符
    DamageEstimation operator*(double multiplier) const;              // 乘法运算符
    bool operator==(const DamageEstimation & other) const;            // 相等比较运算符
    bool operator!=(const DamageEstimation & other) const;            // 不等比较运算符
};
```

## 功能说明

DamageEstimation是VCMI战斗系统中用于表示伤害估算的类。它包含最小和最大伤害值，用于预测战斗中的伤害输出。这个类不仅存储伤害范围，还提供了计算期望伤害、比较伤害值和执行数学运算的方法，对于战斗AI和策略制定非常重要。

## 成员变量

- `damageMinimal`: 最小伤害值，表示在理想条件下可能造成的最低伤害
- `damageMaximal`: 最大伤害值，表示在理想条件下可能造成的最高伤害

## 构造函数

- `DamageEstimation()`: 默认构造函数，初始化最小和最大伤害为0
- `DamageEstimation(min, max)`: 带参数的构造函数，使用指定的最小和最大伤害值初始化对象

## 函数注释

- `getExpectedDamage(rand)`: 使用随机生成器获取期望伤害值，模拟实际战斗中的随机因素
- `getExpectedDamage()`: 获取平均期望伤害值，即最小和最大伤害的平均值
- `getMinDamage()`: 获取最小伤害值
- `getMaxDamage()`: 获取最大伤害值
- `operator+=`: 将另一个DamageEstimation对象的值加到当前对象
- `operator+`: 返回两个DamageEstimation对象相加的结果
- `operator*=`: 将当前对象的伤害值乘以指定的倍数
- `operator*`: 返回当前对象与指定倍数相乘的结果
- `operator==`: 比较两个DamageEstimation对象是否相等
- `operator!=`: 比较两个DamageEstimation对象是否不相等

## 设计说明

DamageEstimation类是战斗系统中伤害计算的核心组件之一。通过提供伤害范围和期望值计算，它使得AI能够评估不同行动的潜在后果，并帮助玩家做出战略决策。该类的运算符重载使其能够方便地与其他伤害值进行组合和计算，适应复杂的战斗场景。