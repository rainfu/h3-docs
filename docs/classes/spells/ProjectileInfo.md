# CSpell::ProjectileInfo结构

CSpell::ProjectileInfo结构是VCMI中法术投射物信息的结构体，用于定义法术投射物的视觉效果和角度要求。

## 类定义

```cpp
struct ProjectileInfo
{
    /// 以弧度为单位。只有正值。负角度通过垂直翻转处理
    double minimumAngle;

    /// 资源名称
    AnimationPath resourceName;
};
```

## 功能说明

CSpell::ProjectileInfo是VCMI法术系统中定义法术投射物信息的结构体。它包含投射物动画的最小角度要求和资源路径，用于确定何时以及如何显示特定的投射物动画。这个结构体允许法术设计师为不同的法术创建独特的投射物效果，增强游戏的视觉表现力。

## 依赖关系

- [AnimationPath](./AnimationPath.md): 动画路径

## 成员变量说明

- `minimumAngle`: 最小角度（以弧度为单位），仅使用正值。负角度通过垂直翻转处理。
- `resourceName`: 投射物动画资源的路径，指向实际的动画文件。