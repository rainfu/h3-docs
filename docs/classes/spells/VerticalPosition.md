# VerticalPosition枚举

VerticalPosition枚举是VCMI中垂直位置的枚举类型，用于定义动画或图像在垂直方向上的位置。

## 类定义

```cpp
enum class VerticalPosition : ui8{TOP, CENTER, BOTTOM};
```

## 功能说明

VerticalPosition是VCMI中用于指定垂直方向位置的枚举类型。它定义了三个可能的位置值：顶部（TOP）、中心（CENTER）和底部（BOTTOM）。这个枚举主要用于动画系统，特别是法术动画中，用来确定动画元素在屏幕上的垂直对齐方式。

## 依赖关系

- [ui8](./ui8.md): 无符号8位整数类型
- [AnimationItem](./AnimationItem.md): 动画项结构

## 枚举值说明

- `TOP`: 顶部位置，动画或图像位于容器的顶部
- `CENTER`: 中心位置，动画或图像居中对齐
- `BOTTOM`: 底部位置，动画或图像位于容器的底部