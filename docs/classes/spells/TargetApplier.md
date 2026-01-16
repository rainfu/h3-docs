# CSpell::TargetApplier类

CSpell::TargetApplier类是VCMI中法术目标应用器的实现，用于将法术效果应用于选定的目标。

## 类定义

```cpp
class TargetApplier
{
public:
    // 将法术效果应用于单个目标
    void apply(Caster * caster, const Target & target) const;
    
    // 将法术效果应用于目标容器中的所有目标
    void apply(Caster * caster, const TargetContainer & targets) const;
    
    // 设置应用模式
    TargetApplier & setApplicationMode(ApplicationMode mode);
    
    // 设置应用参数
    TargetApplier & setParameter(const std::string & key, const Variant & value);
    
    // 添加应用前的预处理步骤
    TargetApplier & addPreApplyStep(const std::function<void(Caster *, const Target &)> & step);
    
    // 添加应用后的后处理步骤
    TargetApplier & addPostApplyStep(const std::function<void(Caster *, const Target &)> & step);
    
    // 检查是否所有目标都成功应用了效果
    bool allTargetsApplied() const;
    
    // 获取应用统计信息
    ApplicationStats getStats() const;

private:
    ApplicationMode applicationMode;
    std::map<std::string, Variant> parameters;
    std::vector<std::function<void(Caster *, const Target &)>> preApplySteps;
    std::vector<std::function<void(Caster *, const Target &)>> postApplySteps;
    ApplicationStats stats;
};
```

## 功能说明

TargetApplier是CSpell类的嵌套类，专门用于将法术的实际效果应用于目标。它处理法术的执行逻辑，包括伤害计算、状态变更、特效播放等。该类提供了一个统一的接口来处理各种类型的效果应用，无论是对单个目标还是多个目标。

## 依赖关系

- STL库: function, vector, map, string
- [CSpell](./CSpell.md): 法术类
- [Caster](./Caster.md): 施法者接口
- [Target](./Target.md): 目标结构
- [TargetContainer](./TargetContainer.md): 目标容器

## 函数注释

- `apply(caster, target)`: 将法术效果应用于单个目标
- `apply(caster, targets)`: 将法术效果应用于目标容器中的所有目标
- `setApplicationMode(mode)`: 设置效果应用模式（如立即应用、延迟应用等）
- `setParameter(key, value)`: 设置应用参数
- `addPreApplyStep(step)`: 添加应用前的预处理步骤
- `addPostApplyStep(step)`: 添加应用后的后处理步骤
- `allTargetsApplied()`: 检查是否所有目标都成功应用了效果
- `getStats()`: 获取应用统计信息

## 成员变量

- `applicationMode`: 效果应用模式
- `parameters`: 存储应用参数的映射
- `preApplySteps`: 存储应用前预处理步骤的向量
- `postApplySteps`: 存储应用后处理步骤的向量
- `stats`: 应用统计信息

## 设计说明

TargetApplier类采用了命令模式和模板方法模式，允许在应用前后插入自定义处理步骤。这种设计使得法术效果的执行过程高度可定制，同时保持了执行流程的一致性。

预处理和后处理步骤的机制允许在效果应用前后执行额外的逻辑，例如播放动画、计算伤害或更新状态。这种设计使法术系统更加灵活，能够处理各种复杂的法术效果。