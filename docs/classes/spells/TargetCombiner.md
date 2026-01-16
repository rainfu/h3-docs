# CSpell::TargetCombiner类

CSpell::TargetCombiner类是VCMI中法术目标组合器的实现，用于将多个目标组合成复合目标。

## 类定义

```cpp
class TargetCombiner
{
public:
    // 组合两个目标
    Target combine(const Target & first, const Target & second) const;
    
    // 组合多个目标容器
    TargetContainer combine(const std::vector<TargetContainer> & containers) const;
    
    // 设置组合模式
    TargetCombiner & setCombinationMode(CombinationMode mode);
    
    // 设置组合操作
    TargetCombiner & setOperation(const std::function<Target(const Target &, const Target &)> & operation);
    
    // 设置组合参数
    TargetCombiner & setParameter(const std::string & key, const Variant & value);
    
    // 检查是否可以组合两个目标
    bool canCombine(const Target & first, const Target & second) const;
    
    // 检查组合是否有效
    bool isValidCombination(const TargetContainer & targets) const;
    
    // 获取组合统计信息
    CombinationStats getStats() const;

private:
    CombinationMode combinationMode;
    std::function<Target(const Target &, const Target &)> combinationOperation;
    std::map<std::string, Variant> parameters;
    CombinationStats stats;
};
```

## 功能说明

TargetCombiner是CSpell类的嵌套类，专门用于将多个目标组合成复合目标。在某些复杂的法术中，可能需要将多个目标视为一个整体，例如群体治疗法术将多个受伤单位组合成一个治疗目标，或某些法术需要同时影响多个相关目标。该类提供了一个统一的接口来执行这些组合操作。

## 依赖关系

- STL库: function, vector, map, string
- [CSpell](./CSpell.md): 法术类
- [Target](./Target.md): 目标结构
- [TargetContainer](./TargetContainer.md): 目标容器
- [Variant](./Variant.md): 变体类型

## 函数注释

- `combine(first, second)`: 组合两个目标
- `combine(containers)`: 组合多个目标容器
- `setCombinationMode(mode)`: 设置组合模式（如并集、交集、叠加等）
- `setOperation(operation)`: 设置组合操作函数
- `setParameter(key, value)`: 设置组合参数
- `canCombine(first, second)`: 检查两个目标是否可以组合
- `isValidCombination(targets)`: 检查目标组合是否有效
- `getStats()`: 获取组合统计信息

## 成员变量

- `combinationMode`: 组合模式
- `combinationOperation`: 组合操作函数
- `parameters`: 存储组合参数的映射
- `stats`: 组合统计信息

## 设计说明

TargetCombiner类采用了函数式编程的思想，通过函数对象来执行组合操作。这种设计使组合过程高度可定制，每个组合操作都是一个独立的函数，可以灵活地定义如何将两个目标合并为一个。

该类特别适用于需要将多个目标视为一个整体的法术，如群体治疗、区域效果、连锁反应等。组合器能够处理复杂的组合逻辑，同时保持代码的清晰性和可扩展性。