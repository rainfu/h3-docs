# CSpell::TargetSelector类

CSpell::TargetSelector类是VCMI中法术目标选择器的实现，用于从可用目标中选择最适合的法术目标。

## 类定义

```cpp
class TargetSelector
{
public:
    // 从候选目标中选择目标
    TargetContainer select(const TargetContainer & candidates, Caster * caster) const;
    
    // 设置选择策略
    TargetSelector & setSelectionStrategy(SelectionStrategy strategy);
    
    // 设置目标优先级
    TargetSelector & setPriorityFunction(const std::function<int(const Target &)> & priorityFunc);
    
    // 添加选择条件
    TargetSelector & addCondition(const std::function<bool(const Target &)> & condition);
    
    // 设置最大选择数量
    TargetSelector & setMaxSelectionCount(int count);
    
    // 设置最小选择数量
    TargetSelector & setMinSelectionCount(int count);
    
    // 设置随机化选项
    TargetSelector & setRandomizationOption(RandomizationOption option);
    
    // 清除所有条件
    void clearConditions();
    
    // 检查是否有有效选择
    bool hasValidSelection(const TargetContainer & candidates, Caster * caster) const;
    
    // 获取选择统计信息
    SelectionStats getStats() const;

private:
    SelectionStrategy selectionStrategy;
    std::function<int(const Target &)> priorityFunction;
    std::vector<std::function<bool(const Target &)>> conditions;
    int maxSelectionCount;
    int minSelectionCount;
    RandomizationOption randomizationOption;
    SelectionStats stats;
};
```

## 功能说明

TargetSelector是CSpell类的嵌套类，专门用于从候选目标中选择最适合的法术目标。它根据法术的特性和施法者的需求，使用不同的策略来选择目标。该类实现了复杂的目标选择逻辑，考虑优先级、条件限制和数量约束等因素。

## 依赖关系

- STL库: function, vector
- [CSpell](./CSpell.md): 法术类
- [Caster](./Caster.md): 施法者接口
- [Target](./Target.md): 目标结构
- [TargetContainer](./TargetContainer.md): 目标容器

## 函数注释

- `select(candidates, caster)`: 从候选目标中选择法术目标
- `setSelectionStrategy(strategy)`: 设置选择策略（如最优优先、随机选择等）
- `setPriorityFunction(priorityFunc)`: 设置目标优先级计算函数
- `addCondition(condition)`: 添加选择条件，只有满足条件的目标才会被选中
- `setMaxSelectionCount(count)`: 设置最大选择数量
- `setMinSelectionCount(count)`: 设置最小选择数量
- `setRandomizationOption(option)`: 设置随机化选项（影响选择的随机性程度）
- `clearConditions()`: 清除所有选择条件
- `hasValidSelection(candidates, caster)`: 检查在给定候选目标中是否存在有效选择
- `getStats()`: 获取选择统计信息

## 成员变量

- `selectionStrategy`: 目标选择策略
- `priorityFunction`: 目标优先级计算函数
- `conditions`: 存储选择条件的向量
- `maxSelectionCount`: 最大选择数量
- `minSelectionCount`: 最小选择数量
- `randomizationOption`: 随机化选项
- `stats`: 选择统计信息

## 设计说明

TargetSelector类采用了策略模式和过滤器模式，允许通过不同的策略和条件来选择目标。该类特别适用于AI施法，AI需要从多个可能的目标中选择最有利的施法目标。

选择器考虑了多种因素，如目标的价值、威胁程度、施法者的目的等。通过可配置的选择策略和优先级函数，它可以适应不同的法术和战术需求，从简单的优先选择最强目标到复杂的综合评估。