# AdventureSpellCastParameters结构

AdventureSpellCastParameters结构是VCMI中冒险法术施放参数的结构体，用于传递冒险法术施放时所需的参数。

## 类定义

```cpp
class DLL_LINKAGE AdventureSpellCastParameters
{
public:
    const spells::Caster * caster;
    int3 pos;
};
```

## 功能说明

AdventureSpellCastParameters是VCMI冒险法术系统中用于传递施法参数的简单数据结构。它包含施法者的信息和施法目标位置，为冒险法术的执行提供必要的上下文信息。这个结构体作为参数传递给冒险法术的执行函数，使法术能够知道谁在施放以及施放在哪里。

## 依赖关系

- [spells::Caster](./Caster.md): 施法者接口
- [int3](../math/int3.md): 三维坐标

## 成员变量说明

- `caster`: 指向施法者的常量指针，表示执行法术的角色
- `pos`: 三维坐标，表示法术施放的目标位置