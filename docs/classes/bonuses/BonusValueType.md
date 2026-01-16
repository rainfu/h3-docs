# Bonus::valueType枚举

Bonus::valueType枚举是VCMI中奖励值类型的定义，用于区分奖励值的计算方式。

## 类定义

```cpp
enum class DLL_LINKAGE Bonus::ValueType
{
    ADDITIVE_VALUE,  // 加法值：直接相加
    PERCENT_TO_BASE, // 基础百分比：基于基础值的百分比
    PERCENT_TO_ALL,  // 全部百分比：基于全部值的百分比
    INDEPENDENT_MAX, // 独立最大值：取最大值而不叠加
    INDEPENDENT_MIN  // 独立最小值：取最小值而不叠加
};
```

## 功能说明

Bonus::valueType是VCMI奖励系统中用于定义奖励值如何计算和应用的枚举。它决定了奖励值如何与基础值和其他奖励相互作用，对最终效果的计算方式有重要影响。

## 枚举值

- `ADDITIVE_VALUE`: 加法值，奖励值直接相加到基础值或其他奖励值上
- `PERCENT_TO_BASE`: 基础百分比，奖励值作为基础值的百分比计算
- `PERCENT_TO_ALL`: 全部百分比，奖励值作为全部值（基础+奖励）的百分比计算
- `INDEPENDENT_MAX`: 独立最大值，多个同类型奖励中取最大值，不叠加
- `INDEPENDENT_MIN`: 独立最小值，多个同类型奖励中取最小值，不叠加