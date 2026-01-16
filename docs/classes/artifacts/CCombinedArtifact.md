# CCombinedArtifact类

CCombinedArtifact类是VCMI中组合神器的实现类，用于处理由多个部分组成的复合神器。

## 类定义

```cpp
class DLL_LINKAGE CCombinedArtifact
{
protected:
    CCombinedArtifact()
        : fused(false){};

    std::vector<const CArtifact *> constituents; // 组合神器由哪些部分组成，或为nullptr
    std::set<const CArtifact *> partOf; // constituents的反向映射 - 包含此神器的组合神器
    bool fused;

public:
    bool isCombined() const;
    const std::vector<const CArtifact *> & getConstituents() const;
    const std::set<const CArtifact *> & getPartOf() const;
    void setFused(bool isFused);
    bool isFused() const;
    bool hasParts() const;
};
```

## 功能说明

CCombinedArtifact是VCMI神器系统中处理组合神器的实现类，用于表示由多个部分组成的复合神器。这类神器在游戏中可以拆分为多个部件，或者由多个部件合成。该类管理组合神器的组成部分及其反向映射关系，并提供融合状态的管理。

## 依赖关系

- [CArtifact](../entities/CArtifact.md): 神器基类
- STL库: vector, set

## 构造函数

- `CCombinedArtifact()`: 保护构造函数，初始化fused为false

## 函数注释

- `isCombined()`: 检查神器是否为组合类型
- `getConstituents()`: 获取构成该组合神器的部件列表
- `getPartOf()`: 获取包含此神器的组合神器列表
- `setFused(isFused)`: 设置融合状态
- `isFused()`: 检查是否已融合
- `hasParts()`: 检查是否有组成部件