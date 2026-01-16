# CScrollArtifact类

CScrollArtifact类是VCMI中卷轴神器的实现类，用于处理可学习法术的卷轴类神器。

## 类定义

```cpp
class DLL_LINKAGE CScrollArtifact
{
protected:
    CScrollArtifact() = default;

public:
    bool isScroll() const;
};
```

## 功能说明

CScrollArtifact是VCMI神器系统中处理卷轴神器的实现类，用于表示包含法术知识的卷轴类神器。这类神器允许英雄学习新的法术，是游戏中法术获取的重要途径之一。该类提供简单的标识方法来确定神器是否为卷轴类型。

## 依赖关系

无外部依赖

## 构造函数

- `CScrollArtifact()`: 保护默认构造函数

## 函数注释

- `isScroll()`: 检查神器是否为卷轴类型，返回布尔值