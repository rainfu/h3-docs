# CSpell::TargetFilter类

CSpell::TargetFilter类是VCMI中法术目标过滤器的实现，用于筛选和验证法术的目标。

## 类定义

```cpp
class TargetFilter
{
public:
    // 用于筛选目标的方法
    TargetContainer filter(const TargetContainer & targets) const;
    
    // 添加过滤条件
    TargetFilter & addCondition(const std::function<bool(const Target &)> & condition);
    
    // 清除所有过滤条件
    void clearConditions();
    
    // 设置最大目标数量限制
    TargetFilter & setMaxTargetCount(size_t count);
    
    // 设置最小目标数量要求
    TargetFilter & setMinTargetCount(size_t count);
    
    // 设置是否允许重复目标
    TargetFilter & allowDuplicates(bool allow);
    
private:
    std::vector<std::function<bool(const Target &)>> conditions;
    size_t maxTargetCount;
    size_t minTargetCount;
    bool duplicatesAllowed;
};
```

## 功能说明

TargetFilter是CSpell类的嵌套类，专门用于处理法术目标的筛选和验证。它实现了过滤器模式，允许在施放法术时根据一系列条件来筛选目标。通过组合多个条件，可以实现复杂的筛选逻辑，例如选择特定类型的目标、限制目标数量或验证目标状态。

## 依赖关系

- STL库: function, vector
- [CSpell](./CSpell.md): 法术类
- [Target](./Target.md): 目标结构

## 函数注释

- `filter(targets)`: 应用所有过滤条件到目标容器，并返回经过筛选的目标列表
- `addCondition(condition)`: 添加一个新的过滤条件函数，该函数接收一个目标并返回布尔值
- `clearConditions()`: 移除所有已添加的过滤条件
- `setMaxTargetCount(count)`: 设置允许的最大目标数量
- `setMinTargetCount(count)`: 设置需要的最小目标数量
- `allowDuplicates(allow)`: 设置是否允许目标重复

## 成员变量

- `conditions`: 存储所有过滤条件的向量
- `maxTargetCount`: 最大目标数量限制
- `minTargetCount`: 最小目标数量要求
- `duplicatesAllowed`: 是否允许重复目标的标志

## 设计说明

TargetFilter类采用了链式调用设计模式，允许连续调用多个设置方法。这种设计使代码更具可读性，类似于构建器模式。过滤器通过组合多个条件函数来实现复杂的筛选逻辑，每个条件函数都返回一个布尔值，表示目标是否满足特定条件。

在法术系统中，这种过滤机制允许精确控制哪些单位或位置可以成为法术的目标，从而确保法术按照预期的方式工作。