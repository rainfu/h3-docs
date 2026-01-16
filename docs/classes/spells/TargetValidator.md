# CSpell::TargetValidator类

CSpell::TargetValidator类是VCMI中法术目标验证器的实现，用于验证法术目标的有效性。

## 类定义

```cpp
class TargetValidator
{
public:
    // 验证单个目标是否有效
    bool validate(const Target & target) const;
    
    // 验证整个目标容器是否有效
    bool validate(const TargetContainer & targets) const;
    
    // 添加验证规则
    TargetValidator & addRule(const std::function<bool(const Target &)> & rule);
    
    // 清除所有验证规则
    void clearRules();
    
    // 设置验证模式
    TargetValidator & setValidationMode(ValidationMode mode);
    
    // 设置验证深度
    TargetValidator & setValidationDepth(Depth depth);
    
    // 检查是否所有必需的验证都已通过
    bool allRequiredValidationsPassed() const;
    
    // 获取验证错误信息
    std::vector<std::string> getValidationErrors() const;

private:
    std::vector<std::function<bool(const Target &)>> validationRules;
    ValidationMode validationMode;
    Depth validationDepth;
    std::vector<std::string> validationErrors;
};
```

## 功能说明

TargetValidator是CSpell类的嵌套类，专门用于验证法术目标的有效性。它确保在施放法术之前，所有目标都是合法且有效的。通过应用一系列验证规则，它可以检查目标的状态、位置、类型等属性，确保法术施放的正确性和一致性。

## 依赖关系

- STL库: function, vector, string
- [CSpell](./CSpell.md): 法术类
- [Target](./Target.md): 目标结构
- [TargetContainer](./TargetContainer.md): 目标容器

## 函数注释

- `validate(target)`: 验证单个目标是否有效
- `validate(targets)`: 验证整个目标容器是否有效
- `addRule(rule)`: 添加一个新的验证规则函数
- `clearRules()`: 移除所有已添加的验证规则
- `setValidationMode(mode)`: 设置验证模式（如严格、宽松等）
- `setValidationDepth(depth)`: 设置验证深度（浅层、深层等）
- `allRequiredValidationsPassed()`: 检查是否所有必需的验证都已通过
- `getValidationErrors()`: 获取验证失败时的错误信息列表

## 成员变量

- `validationRules`: 存储所有验证规则的向量
- `validationMode`: 验证模式
- `validationDepth`: 验证深度
- `validationErrors`: 存储验证错误信息的向量

## 设计说明

TargetValidator类采用了策略模式，允许通过添加不同的验证规则来定制验证行为。验证器可以检查各种条件，例如目标是否存活、是否在有效范围内、是否属于正确的阵营等。

验证过程是分层次的，可以进行浅层验证（仅检查基本属性）或深层验证（检查目标的完整状态）。这种灵活性使验证器能够适应不同法术的要求，有些法术可能需要严格的验证，而其他法术可能只需要基本检查。