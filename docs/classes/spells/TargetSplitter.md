# CSpell::TargetSplitter类

CSpell::TargetSplitter类是VCMI中法术目标分割器的实现，用于将复合目标拆分为单个目标。

## 类定义

```cpp
class TargetSplitter
{
public:
    // 拆分复合目标为单个目标
    TargetContainer split(const Target & target) const;
    
    // 拆分目标容器中的复合目标
    TargetContainer split(const TargetContainer & targets) const;
    
    // 设置分割模式
    TargetSplitter & setSplitMode(SplitMode mode);
    
    // 设置分割参数
    TargetSplitter & setParameter(const std::string & key, const Variant & value);
    
    // 检查目标是否可以分割
    bool canSplit(const Target & target) const;
    
    // 获取分割统计信息
    SplitStats getStats() const;

private:
    SplitMode splitMode;
    std::map<std::string, Variant> parameters;
    SplitStats stats;
};
```

## 功能说明

TargetSplitter是CSpell类的嵌套类，专门用于将复合目标拆分为单个目标。在某些情况下，法术可能接收到一个复合目标（如一组单位或一个区域），需要将其拆分为更小的单位来分别处理。该类提供了一个统一的接口来执行这些分割操作，使法术能够对每个子目标进行独立的处理。

## 依赖关系

- STL库: map, string
- [CSpell](./CSpell.md): 法术类
- [Target](./Target.md): 目标结构
- [TargetContainer](./TargetContainer.md): 目标容器
- [Variant](./Variant.md): 变体类型

## 函数注释

- `split(target)`: 拆分复合目标为单个目标
- `split(targets)`: 拆分目标容器中的复合目标
- `setSplitMode(mode)`: 设置分割模式（如按单位分割、按区域分割等）
- `setParameter(key, value)`: 设置分割参数
- `canSplit(target)`: 检查目标是否可以分割
- `getStats()`: 获取分割统计信息

## 成员变量

- `splitMode`: 分割模式
- `parameters`: 存储分割参数的映射
- `stats`: 分割统计信息

## 设计说明

TargetSplitter类在法术系统中起到关键作用，特别是在处理复合目标时。它允许法术对复杂目标进行分解，然后对每个子目标应用适当的效果。这种设计使得法术系统更加灵活，能够处理各种类型的目标结构。

该类特别适用于需要对目标内部元素进行单独处理的法术，如对群体单位中的每个个体施加效果，或对区域内的每个位置应用区域效果。通过可配置的分割模式，它可以适应不同类型的复合目标。