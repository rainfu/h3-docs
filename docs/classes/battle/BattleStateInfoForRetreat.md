# BattleStateInfoForRetreat类

BattleStateInfoForRetreat类是VCMI战斗系统中用于计算撤退和投降决策的信息结构，包含战斗中撤退和投降的相关状态信息。

## 类定义

```cpp
class DLL_LINKAGE BattleStateInfoForRetreat
{
public:
    bool canFlee;                           // 是否可以逃跑
    bool canSurrender;                      // 是否可以投降
    bool isLastTurnBeforeDie;               // 是否是死亡前的最后一回合
    BattleSide ourSide;                     // 我方阵营
    battle::Units ourStacks;                // 我方单位列表
    battle::Units enemyStacks;              // 敌方单位列表
    const CGHeroInstance * ourHero;         // 我方英雄
    const CGHeroInstance * enemyHero;       // 敌方英雄
    int turnsSkippedByDefense;              // 防御方跳过的回合数

    BattleStateInfoForRetreat();            // 构造函数
    uint64_t getOurStrength() const;        // 获取我方实力
    uint64_t getEnemyStrength() const;      // 获取敌方实力
};
```

## 功能说明

BattleStateInfoForRetreat是VCMI战斗系统中用于计算撤退和投降决策的辅助类。它收集战斗中的相关信息，如双方单位、英雄、战斗状态等，为AI做出撤退或投降决策提供依据。该类主要用于战斗AI的决策逻辑中，帮助判断何时应该撤退或投降。

## 构造函数

- `BattleStateInfoForRetreat()`: 默认构造函数

## 函数注释

- `getOurStrength()`: 计算并返回我方所有单位的总实力值
- `getEnemyStrength()`: 计算并返回敌方所有单位的总实力值

## 成员变量

- `canFlee`: 布尔值，指示当前是否可以逃跑（撤退）
- `canSurrender`: 布尔值，指示当前是否可以投降
- `isLastTurnBeforeDie`: 布尔值，指示是否是我方单位死亡前的最后一回合
- `ourSide`: BattleSide枚举值，表示我方的阵营（攻击方或防御方）
- `ourStacks`: 我方单位列表，包含战斗中我方的所有单位
- `enemyStacks`: 敌方单位列表，包含战斗中敌方的所有单位
- `ourHero`: 指向我方英雄实例的指针，如果我方没有英雄则为nullptr
- `enemyHero`: 指向敌方英雄实例的指针，如果敌方没有英雄则为nullptr
- `turnsSkippedByDefense`: 整数值，记录防御方跳过的回合数

## 设计说明

BattleStateInfoForRetreat类是战斗AI决策过程中的重要组成部分，它聚合了AI在决定是否撤退或投降时所需的所有关键信息。通过比较双方实力、评估当前战斗状态（如是否处于死亡边缘），AI可以做出合理的战略决策。

该类通过提供获取双方实力的方法，使AI能够量化比较当前战斗形势，从而做出更明智的决策。这是战斗系统中AI逻辑的重要支撑类。