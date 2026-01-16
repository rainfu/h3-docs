# CSpell::TargetTransformer类

CSpell::TargetTransformer类是VCMI中法术目标变换器的实现，用于修改或转换法术目标。

## 类定义

```cpp
class TargetTransformer
{
public:
    // 变换单个目标
    Target transform(const Target & target) const;
    
    // 变换目标容器中的所有目标
    TargetContainer transform(const TargetContainer & targets) const;
    
    // 设置变换模式
    TargetTransformer & setTransformationMode(TransformationMode mode);
    
    // 添加变换操作
    TargetTransformer & addTransformation(const std::function<Target(const Target &)> & transformation);
    
    // 设置变换参数
    TargetTransformer & setParameter(const std::string & key, const Variant & value);
    
    // 清除所有变换操作
    void clearTransformations();
    
    // 检查变换是否有效
    bool isValidTransformation(const Target & target) const;
    
    // 获取变换统计信息
    TransformationStats getStats() const;

private:
    TransformationMode transformationMode;
    std::vector<std::function<Target(const Target &)>> transformations;
    std::map<std::string, Variant> parameters;
    TransformationStats stats;
};
```

## 功能说明

TargetTransformer是CSpell类的嵌套类，专门用于修改或转换法术目标。在某些情况下，法术可能需要改变其目标的某些属性或位置，例如传送法术可能会改变目标位置，变形法术可能会改变目标的属性。该类提供了一个统一的接口来执行这些变换操作。

## 依赖关系

- STL库: function, vector, map, string
- [CSpell](./CSpell.md): 法术类
- [Target](./Target.md): 目标结构
- [TargetContainer](./TargetContainer.md): 目标容器
- [Variant](./Variant.md): 变体类型

## 函数注释

- `transform(target)`: 变换单个目标
- `transform(targets)`: 变换目标容器中的所有目标
- `setTransformationMode(mode)`: 设置变换模式（如位置变换、属性变换等）
- `addTransformation(transformation)`: 添加一个变换操作函数
- `setParameter(key, value)`: 设置变换参数
- `clearTransformations()`: 清除所有变换操作
- `isValidTransformation(target)`: 检查目标是否可以进行有效变换
- `getStats()`: 获取变换统计信息

## 成员变量

- `transformationMode`: 变换模式
- `transformations`: 存储变换操作的向量
- `parameters`: 存储变换参数的映射
- `stats`: 变换统计信息

## 设计说明

TargetTransformer类采用了函数式编程的思想，通过函数对象来执行变换操作。这种设计使变换过程高度可定制，每个变换操作都是一个独立的函数，可以组合起来形成复杂的变换序列。

该类特别适用于需要修改目标属性的法术，如传送、变形、复活等。通过链式调用，可以轻松添加多个变换操作，这些操作将按顺序应用于目标。