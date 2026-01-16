# CSpell::TargetAggregator类

CSpell::TargetAggregator类是VCMI中法术目标聚合器的实现，用于合并来自不同来源的法术目标。

## 类定义

```cpp
class TargetAggregator
{
public:
    // 添加一个目标容器
    TargetAggregator & addSource(const TargetContainer & container);
    
    // 添加一个单独的目标
    TargetAggregator & addTarget(const Target & target);
    
    // 从聚合结果中移除目标
    TargetAggregator & removeTarget(const Target & target);
    
    // 聚合所有来源的目标
    TargetContainer aggregate() const;
    
    // 设置聚合模式
    TargetAggregator & setAggregationMode(AggregationMode mode);
    
    // 设置冲突解决策略
    TargetAggregator & setConflictResolutionStrategy(ConflictResolutionStrategy strategy);
    
    // 设置过滤重复目标的选项
    TargetAggregator & setDuplicateHandling(DuplicateHandlingOption option);
    
    // 清除所有来源
    void clearSources();
    
    // 检查是否有来源
    bool hasSources() const;
    
    // 获取来源数量
    size_t getSourceCount() const;
    
    // 获取聚合统计信息
    AggregationStats getStats() const;

private:
    std::vector<TargetContainer> sources;
    std::vector<Target> directTargets;
    AggregationMode aggregationMode;
    ConflictResolutionStrategy conflictResolutionStrategy;
    DuplicateHandlingOption duplicateHandling;
    AggregationStats stats;
};
```

## 功能说明

TargetAggregator是CSpell类的嵌套类，专门用于合并来自不同来源的法术目标。在复杂的法术系统中，目标可能来自多个来源，如直接选择、范围计算、连锁效果等。该类提供了一个统一的接口来聚合这些目标，并处理可能的冲突和重复。

## 依赖关系

- STL库: vector, map
- [CSpell](./CSpell.md): 法术类
- [Target](./Target.md): 目标结构
- [TargetContainer](./TargetContainer.md): 目标容器

## 函数注释

- `addSource(container)`: 添加一个目标容器作为聚合的来源
- `addTarget(target)`: 添加一个单独的目标到聚合器
- `removeTarget(target)`: 从聚合结果中移除指定目标
- `aggregate()`: 执行聚合操作并返回合并后的目标容器
- `setAggregationMode(mode)`: 设置聚合模式（如并集、交集等）
- `setConflictResolutionStrategy(strategy)`: 设置冲突解决策略
- `setDuplicateHandling(option)`: 设置处理重复目标的选项
- `clearSources()`: 清除所有聚合来源
- `hasSources()`: 检查是否存在聚合来源
- `getSourceCount()`: 获取聚合来源的数量
- `getStats()`: 获取聚合统计信息

## 成员变量

- `sources`: 存储目标容器来源的向量
- `directTargets`: 存储直接添加的目标的向量
- `aggregationMode`: 聚合模式
- `conflictResolutionStrategy`: 冲突解决策略
- `duplicateHandling`: 重复目标处理选项
- `stats`: 聚合统计信息

## 设计说明

TargetAggregator类采用了组合模式，能够处理多个来源的目标并将其合并为一个统一的结果。该类特别适用于复杂的法术效果，这些法术可能会影响多个区域或通过不同的机制选择目标。

聚合器考虑了多种情况，如目标重复、冲突解决和不同类型的聚合操作。通过可配置的聚合模式和冲突解决策略，它可以适应不同法术的需求，从简单的合并到复杂的逻辑运算。