# EffectsFwd

## 概述

`EffectsFwd.h` 是 VCMI 法术效果系统的向前声明头文件。它提供了效果相关类的向前声明，避免在头文件中包含完整的类定义，从而减少编译依赖和提高编译速度。

## 声明的类

### Effect
```cpp
class Effect;
```
法术效果的基类向前声明。实际定义在 `Effect.h` 中。

### Effects
```cpp
class Effects;
```
效果管理器类的向前声明。实际定义在 `Effects.h` 中。

## 命名空间

所有声明都位于以下命名空间中：
```cpp
VCMI_LIB_NAMESPACE_BEGIN
namespace spells
{
namespace effects
{
    // 类声明
}
}
VCMI_LIB_NAMESPACE_END
```

## 使用场景

这个头文件主要用于：

1. **减少编译依赖**: 在只需要类指针或引用的地方使用
2. **避免循环包含**: 当两个头文件需要相互引用时
3. **提高编译速度**: 减少不必要的头文件包含

## 示例用法

```cpp
// 只需前向声明，不需要包含完整定义
#include "EffectsFwd.h"

// 使用指针或引用
class MyClass {
    spells::effects::Effect* effectPtr;
    const spells::effects::Effects* effectsRef;
};
```

## 相关文件

- `Effect.h`: Effect 类的完整定义
- `Effects.h`: Effects 类的完整定义