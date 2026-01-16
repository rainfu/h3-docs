# CSpell::TargetMerger类

CSpell::TargetMerger类是VCMI中法术目标合并器的实现，用于将多个目标合并为一个目标或较少的目标。

## 类定义

```cpp
class TargetMerger
{
public:
    // 将多个目标合并为一个目标
    Target merge(const TargetContainer & targets) const;
    
    // 将目标容器按条件合并
    TargetContainer merge(const TargetContainer & targets, const std::function<bool(const Target &)> & condition) const;
    
    // 设置合并模式
    TargetMerger & setMergeMode(MergeMode mode);
    
    // 设置合并参数
    TargetMerger & setParameter(const std::string & key, const Variant & value);
    
    // 设置合并条件
    TargetMerger & setMergeCondition(const std::function<bool(const Target &, const Target &)> & condition);
    
    // 检查目标是否可以合并
    bool canMerge(const TargetContainer & targets) const;
    
    // 获取合并统计信息
    MergeStats getStats() const;

private:
    MergeMode mergeMode;
    std::function<bool(const Target &, const Target &)> mergeCondition;
    std::map<std::string, Variant> parameters;
    MergeStats stats;
};
```

## 功能说明

TargetMerger是CSpell类的嵌套类，专门用于将多个目标合并为一个目标或较少的目标。在某些法术效果中，可能需要将多个相似目标视为一个整体来处理，例如将多个友方单位视为一个群体进行群体治疗，或将多个位置视为一个区域进行区域效果处理。该类提供了一个统一的接口来执行这些合并操作。

## 依赖关系

- STL库: function, map, string
- [CSpell](./CSpell.md): 法术类
- [Target](./Target.md): 目标结构
- [TargetContainer](./TargetContainer.md): 目标容器
- [Variant](./Variant.md): 变体类型

## 函数注释

- `merge(targets)`: 将多个目标合并为一个目标
- `merge(targets, condition)`: 根据条件将目标容器中的目标进行合并
- `setMergeMode(mode)`: 设置合并模式（如按类型合并、按位置合并、按阵营合并等）
- `setParameter(key, value)`: 设置合并参数
- `setMergeCondition(condition)`: 设置合并条件函数，决定哪些目标可以合并
- `canMerge(targets)`: 检查目标集合是否可以合并
- `getStats()`: 获取合并统计信息

## 成员变量

- `mergeMode`: 合并模式
- `mergeCondition`: 合并条件函数
- `parameters`: 存储合并参数的映射
- `stats`: 合并统计信息

## 设计说明

TargetMerger类在法术系统中扮演重要角色，特别是在处理群体效果时。它允许法术将多个相似目标整合为一个整体来处理，从而减少计算复杂度和提高性能。这种设计使得法术系统更加高效，同时保持了效果的一致性。

该类特别适用于群体治疗、群体增益、区域效果等需要对多个目标统一处理的法术。通过可配置的合并模式和条件，它可以灵活地处理各种合并需求，从简单的按类型合并到复杂的多条件合并。