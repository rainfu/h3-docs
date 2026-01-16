# EActionType枚举

EActionType枚举是VCMI中战斗行动类型的定义，用于标识战斗中可能发生的不同类型的行动。

## 类定义

```cpp
enum class EActionType
{
    NO_ACTION = -1,      // 无行动
    ATTACK,              // 攻击
    MOVE,                // 移动
    WAIT,                // 等待
    DEFEND,              // 防御
    WALK_AND_ATTACK,     // 移动并攻击
    SHOOT,               // 射击
    WALK_AND_SHOOT,      // 移动并射击
    RETREAT,             // 撤退
    SURRENDER,           // 投降
    CAST_SPELL,          // 施放法术
    MONSTER_SPELL,       // 生物施放法术
    CATAPULT,            // 投石车攻击
    TOWER,               // 箭塔攻击
    HEAL,                // 治疗
    STACK_HEAL,          // 堆栈治疗
    REMOVE_OBSTACLE,     // 移除障碍
    TELEPORT,            // 传送
    SACRIFICE,           // 献祭
    CLONE,               // 克隆
    CHOOSE_CREATURE,     // 选择生物
    END_TACTIC_PHASE,    // 结束战术阶段
    START_TACTIC_PHASE,  // 开始战术阶段
    INVALID_ACTION       // 无效行动
};
```

## 功能说明

EActionType是VCMI战斗系统中用于标识战斗行动类型的枚举。它定义了在战斗中可能发生的所有行动类型，从基本的移动和攻击到复杂的法术施放和特殊能力使用。这个枚举对于战斗逻辑的实现至关重要，因为它允许系统区分不同类型的行动并相应地处理它们。

## 枚举值

- `NO_ACTION = -1`: 无行动，表示没有执行任何行动
- `ATTACK`: 攻击，对敌方单位进行近战攻击
- `MOVE`: 移动，单位在战场上移动到另一个位置
- `WAIT`: 等待，单位选择等待并保留行动力
- `DEFEND`: 防御，单位进入防御状态以减少受到的伤害
- `WALK_AND_ATTACK`: 移动并攻击，先移动再进行近战攻击
- `SHOOT`: 射击，对敌方单位进行远程攻击
- `WALK_AND_SHOOT`: 移动并射击，先移动再进行远程攻击
- `RETREAT`: 撤退，从战斗中撤退（如果允许）
- `SURRENDER`: 投降，向敌人投降（如果允许）
- `CAST_SPELL`: 施放法术，由英雄或单位施放法术
- `MONSTER_SPELL`: 生物施放法术，由生物单位施放法术
- `CATAPULT`: 投石车攻击，使用攻城武器攻击城墙
- `TOWER`: 箭塔攻击，从箭塔进行攻击
- `HEAL`: 治疗，治疗己方单位
- `STACK_HEAL`: 堆栈治疗，治疗整个单位堆栈
- `REMOVE_OBSTACLE`: 移除障碍，清除战场上的障碍物
- `TELEPORT`: 传送，将单位传送到战场上的另一个位置
- `SACRIFICE`: 献祭，牺牲单位以获得某种效果
- `CLONE`: 克隆，创建单位的克隆
- `CHOOSE_CREATURE`: 选择生物，选择特定生物进行某种操作
- `END_TACTIC_PHASE`: 结束战术阶段，结束当前战术阶段
- `START_TACTIC_PHASE`: 开始战术阶段，开始战术阶段
- `INVALID_ACTION`: 无效行动，表示一个无效的行动类型

## 设计说明

EActionType枚举是战斗系统的核心组件之一，它为战斗行动提供了统一的类型标识。这个枚举涵盖了战斗中可能出现的所有行动类型，从基本的移动和攻击到复杂的特殊能力使用。

该枚举的设计考虑了《英雄无敌》系列游戏中丰富的战斗机制，包括近战、远程、法术、攻城、治疗等多种行动类型。每个行动类型都有其独特的执行逻辑和规则，系统根据这个枚举值来确定如何处理特定的行动。