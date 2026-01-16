# ForcedAction结构

ForcedAction结构是VCMI中强制行动的表示，用于描述在特定条件下必须执行的战斗行动。

## 类定义

```cpp
struct ForcedAction {
    EActionType type = EActionType::NO_ACTION;
    BattleHex position;
    const battle::Unit * target;
};
```

## 功能说明

ForcedAction是VCMI战斗系统中用于表示强制执行的行动的结构体。它通常由某些特殊效果触发，如魅惑、恐惧、混乱等状态效果，迫使单位执行特定的动作。这个结构定义了行动的类型、位置和目标，为战斗系统提供了处理强制行动的统一方式。

## 依赖关系

- [EActionType](../identifiers/EActionType.md): 行动类型枚举
- [BattleHex](./BattleHex.md): 战斗格子
- [battle::Unit](./Unit.md): 战斗单位

## 成员变量

- `type`: 行动类型，指定强制执行的行动类型，默认初始化为NO_ACTION
- `position`: 位置，指定行动发生的位置，使用BattleHex类型
- `target`: 目标，指向行动的目标单位的指针

## 设计说明

ForcedAction结构是VCMI战斗系统中处理状态效果和强制行动的关键组件。它允许游戏正确处理各种状态效果，如魅惑后的攻击、恐惧后的逃跑等。通过将强制行动分解为类型、位置和目标三个基本元素，该结构提供了足够的灵活性来表示各种类型的强制行动。

这种设计使得战斗系统能够统一处理各种状态效果，而不需要为每种状态效果实现特殊的逻辑。同时，通过使用指针指向目标单位，该结构能够在不影响性能的情况下引用战斗中的具体单位。