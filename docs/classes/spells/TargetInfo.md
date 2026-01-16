# CSpell::TargetInfo结构

CSpell::TargetInfo结构是VCMI中法术目标信息的结构体，用于定义法术的目标属性和行为。

## 类定义

```cpp
struct DLL_LINKAGE TargetInfo
{
    spells::AimType type;
    bool smart;
    bool massive;
    bool clearAffected;

    TargetInfo(const CSpell * spell, const int32_t level, spells::Mode mode);
};
```

## 功能说明

CSpell::TargetInfo是VCMI法术系统中定义法术目标信息的结构体。它包含法术的目标类型、智能目标选择、大规模效果以及是否清除受影响单位等属性。这个结构体用于确定法术在施放时如何选择和处理目标，是法术机制的重要组成部分。

## 依赖关系

- [CSpell](./CSpell.md): 法术类
- [spells::AimType](./AimType.md): 目标类型枚举
- [spells::Mode](./Mode.md): 模式枚举
- STL库: 基本数据类型

## 函数注释

- `TargetInfo(spell, level, mode)`: 构造函数，使用法术对象、等级和模式初始化目标信息

## 成员变量说明

- `type`: 目标类型，指定法术的目标选择方式（如单位、区域等）
- `smart`: 智能目标选择标志，如果为真，则法术会选择最有效的目标
- `massive`: 大规模效果标志，如果为真，则法术会影响更大范围的目标
- `clearAffected`: 清除受影响单位标志，如果为真，则在施法后清除受影响单位列表