# AttackableTiles结构

AttackableTiles结构是VCMI中战斗系统中可攻击格子的表示，用于跟踪战斗中攻击动作可能影响的格子。

## 类定义

```cpp
struct DLL_LINKAGE AttackableTiles
{
    /// Hexes on which only hostile units will be targeted
    BattleHexArray hostileCreaturePositions;
    /// for Dragon Breath, hexes on which both friendly and hostile creatures will be targeted
    BattleHexArray friendlyCreaturePositions;
    /// for animation purposes, if any of targets are on specified positions, unit should play alternative animation
    BattleHexArray overrideAnimationPositions;
};
```

## 功能说明

AttackableTiles是VCMI战斗系统中用于表示攻击动作可能影响的格子集合的结构体。它包含了三个不同类型的格子数组，分别用于处理不同类型的攻击目标和动画效果。这个结构在处理范围攻击、龙息等特殊攻击效果时非常重要。

## 依赖关系

- [BattleHexArray](./BattleHexArray.md): 战斗格子数组
- [BattleHex](./BattleHex.md): 战斗格子

## 成员变量

- `hostileCreaturePositions`: 存储只攻击敌对单位的格子，这些格子上的敌对单位将成为攻击目标
- `friendlyCreaturePositions`: 存储友方和敌方单位都会被攻击的格子，主要用于龙息等特殊攻击效果
- `overrideAnimationPositions`: 用于动画目的的格子，如果目标位于这些位置，单位应播放替代动画

## 设计说明

AttackableTiles结构在战斗系统中扮演着关键角色，特别是在处理多目标攻击和特殊攻击效果时。它允许游戏引擎准确计算攻击对战场上的所有可能影响，包括友军伤害和特殊视觉效果。

该结构特别考虑了龙息这类特殊攻击，这种攻击会同时影响友方和敌方单位，因此需要单独的数组来跟踪这些格子。同样，动画覆盖位置允许游戏根据目标位置播放不同的攻击动画，增强视觉体验。