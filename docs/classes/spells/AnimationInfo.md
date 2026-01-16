# CSpell::AnimationInfo结构

CSpell::AnimationInfo结构是VCMI中法术动画信息的结构体，用于定义法术在施放过程中的视觉效果。

## 类定义

```cpp
struct DLL_LINKAGE AnimationInfo
{
    /// 显示在所有受影响的目标上
    TAnimationQueue affect;

    /// 显示在施法者上
    TAnimationQueue cast;

    /// 显示在目标六边形上。如果法术施放时没有目标选择，则显示在整个战场上（例如ARMAGEDDON）
    TAnimationQueue hit;

    /// 显示在施法者和（第一个）目标之间。如果法术施放时没有目标选择，则忽略。
    /// 使用selectProjectile访问
    std::vector<ProjectileInfo> projectile;

    AnimationPath selectProjectile(const double angle) const;
};
```

## 功能说明

CSpell::AnimationInfo是VCMI法术系统中定义法术动画效果的结构体。它包含法术施放过程中各个阶段的视觉效果，包括影响目标的效果、施法者效果、命中效果以及投射物效果。这个结构体允许法术设计师为每个法术创建独特的视觉体验，增强游戏的表现力。

## 依赖关系

- [AnimationPath](./AnimationPath.md): 动画路径
- [CSpell::TAnimationQueue](./TAnimationQueue.md): 动画队列类型
- [CSpell::ProjectileInfo](./ProjectileInfo.md): 投射物信息
- STL库: vector

## 函数注释

- `selectProjectile(angle)`: 根据指定角度选择合适的投射物动画资源

## 成员变量说明

- `affect`: 影响目标时播放的动画队列
- `cast`: 施法开始时播放的动画队列
- `hit`: 命中目标时播放的动画队列
- `projectile`: 投射物动画信息列表