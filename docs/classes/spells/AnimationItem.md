# CSpell::AnimationItem结构

CSpell::AnimationItem结构是VCMI中法术动画项的结构体，用于定义单个动画元素的属性和效果。

## 类定义

```cpp
struct AnimationItem
{
    AnimationPath resourceName;
    std::string effectName;
    VerticalPosition verticalPosition;
    float transparency;
    int pause;

    AnimationItem();
};
```

## 功能说明

CSpell::AnimationItem是VCMI法术系统中定义单个动画元素的结构体。它包含动画资源路径、效果名称、垂直位置、透明度、暂停时间等属性，用于构建法术的视觉效果。这个结构体允许法术设计师为每个动画元素指定详细的行为和外观。

## 依赖关系

- [AnimationPath](./AnimationPath.md): 动画路径
- [VerticalPosition](./VerticalPosition.md): 垂直位置枚举
- STL库: string

## 函数注释

- `AnimationItem()`: 默认构造函数，初始化动画项的默认属性

## 成员变量说明

- `resourceName`: 动画资源的路径，指向实际的动画文件
- `effectName`: 效果名称，用于标识特定的视觉效果
- `verticalPosition`: 垂直位置，指定动画在屏幕上的垂直对齐方式（顶部、中心、底部）
- `transparency`: 透明度，指定动画的透明程度（0.0为完全透明，1.0为完全不透明）
- `pause`: 暂停时间，指定动画播放前的延迟时间（以毫秒为单位）