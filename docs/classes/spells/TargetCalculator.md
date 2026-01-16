# CSpell::TargetCalculator类

CSpell::TargetCalculator类是VCMI中法术目标计算器的实现，用于计算法术的有效目标范围和数量。

## 类定义

```cpp
class TargetCalculator
{
public:
    // 计算基于caster位置的法术目标
    TargetContainer calculate(Caster * caster) const;
    
    // 计算基于特定位置的法术目标
    TargetContainer calculate(Caster * caster, const Position & position) const;
    
    // 计算基于特定目标的法术目标
    TargetComparator calculate(Caster * caster, const Target & sourceTarget) const;
    
    // 设置计算模式
    TargetCalculator & setCalculationMode(CalculationMode mode);
    
    // 设置计算范围
    TargetCalculator & setRange(const Range & range);
    
    // 设置最大目标数量
    TargetCalculator & setMaxTargetCount(int count);
    
    // 设置目标选择策略
    TargetCalculator & setSelectionStrategy(SelectionStrategy strategy);
    
    // 添加计算前的预处理步骤
    TargetCalculator & addPreCalculationStep(const std::function<void(Caster *)> & step);
    
    // 添加计算后的后处理步骤
    TargetCalculator & addPostCalculationStep(const std::function<void(TargetContainer &)> & step);
    
    // 检查是否有有效目标
    bool hasValidTargets(Caster * caster) const;
    
    // 获取计算统计信息
    CalculationStats getStats() const;

private:
    CalculationMode calculationMode;
    Range range;
    int maxTargetCount;
    SelectionStrategy selectionStrategy;
    std::vector<std::function<void(Caster *)>> preCalculationSteps;
    std::vector<std::function<void(TargetContainer &)>> postCalculationSteps;
    CalculationStats stats;
};
```

## 功能说明

TargetCalculator是CSpell类的嵌套类，专门用于计算法术的有效目标。它根据法术的特性、施法者的能力和战场状况来确定法术可以影响的目标。该类处理各种计算模式，如区域效果、直线效果、锥形效果等，并考虑距离、障碍物和阵营等因素。

## 依赖关系

- STL库: function, vector, map, string
- [CSpell](./CSpell.md): 法术类
- [Caster](./Caster.md): 施法者接口
- [Target](./Target.md): 目标结构
- [TargetContainer](./TargetContainer.md): 目标容器
- [Position](./Position.md): 位置结构
- [Range](./Range.md): 范围结构

## 函数注释

- `calculate(caster)`: 根据施法者计算法术目标
- `calculate(caster, position)`: 基于特定位置计算法术目标
- `calculate(caster, sourceTarget)`: 基于特定源目标计算法术目标
- `setCalculationMode(mode)`: 设置计算模式（如圆形范围、直线、锥形等）
- `setRange(range)`: 设置法术的作用范围
- `setMaxTargetCount(count)`: 设置法术影响的最大目标数量
- `setSelectionStrategy(strategy)`: 设置目标选择策略（如随机、优先选择弱目标等）
- `addPreCalculationStep(step)`: 添加计算前的预处理步骤
- `addPostCalculationStep(step)`: 添加计算后的后处理步骤
- `hasValidTargets(caster)`: 检查是否存在有效目标
- `getStats()`: 获取计算统计信息

## 成员变量

- `calculationMode`: 计算模式
- `range`: 法术作用范围
- `maxTargetCount`: 最大目标数量
- `selectionStrategy`: 目标选择策略
- `preCalculationSteps`: 计算前预处理步骤
- `postCalculationSteps`: 计算后处理步骤
- `stats`: 计算统计信息

## 设计说明

TargetCalculator类采用了策略模式和模板方法模式，允许在计算前后插入自定义处理步骤。这种设计使得目标计算过程高度可定制，同时保持了计算流程的一致性。

该类考虑了多种因素来确定有效目标，包括施法者的位置、法术的范围、目标的距离和阵营等。通过可配置的计算模式和选择策略，它可以处理各种类型的法术，从简单的单体法术到复杂的大范围群体法术。