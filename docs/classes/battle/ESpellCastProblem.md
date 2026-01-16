# ESpellCastProblem枚举

ESpellCastProblem枚举是VCMI中法术施放问题的定义，用于标识法术施放失败的原因。

## 类定义

```cpp
enum class DLL_LINKAGE ESpellCastProblem
{
    OK,                           // 无问题，施法成功
    NO_SPELL,                     // 没有指定法术
    WRONG_TARGET,                 // 目标错误
    NO_MANA,                      // 法力不足
    NO_HERO,                      // 没有英雄
    WRONG_LOCATION,               // 位置错误
    NO_SPELLBOOK,                 // 没有法术书
    ANOTHER_SPELL_IN_PLAY,        // 另一个法术正在进行中
    NO_SPELLS_AT_ALL,             // 完全没有法术
    TOO_LOW_LEVEL,                // 等级太低
    TARGET_DEAD,                  // 目标已死亡
    WRONG_UNIT,                   // 单位错误
    NO_GOOD_TARGET,               // 没有合适的目標
    NO_BAD_TARGET,                // 没有合适的负面目标
    MORALE,                       // 士气影响
    UNIT_ALREADY_ACTIVATED,       // 单位已被激活
    BAD_ALIGNMENT,                // 阵营不符
    NO_MONEY,                     // 资金不足
    NO_MOVEMENT,                  // 没有移动点数
    SUMMONING_ERROR,              // 召唤错误
    NO_SPELL_POWER,               // 法术力量不足
    ALREADY_CAST_THIS_TURN,       // 本回合已施放过
    IMMUNITY,                     // 免疫
    INVALID,                      // 无效
    CUSTOM,                       // 自定义问题
    LIMITER_BLOCKING,             // 限制器阻止
    OTHER                         // 其他
};
```

## 功能说明

ESpellCastProblem是VCMI法术系统中用于标识法术施放失败原因的枚举。当玩家尝试施放法术但失败时，系统会返回相应的ESpellCastProblem值，让玩家知道为什么法术无法施放。这对于错误处理和用户体验非常重要。

## 枚举值

- `OK`: 无问题，施法成功
- `NO_SPELL`: 没有指定法术
- `WRONG_TARGET`: 目标错误
- `NO_MANA`: 法力不足
- `NO_HERO`: 没有英雄
- `WRONG_LOCATION`: 位置错误
- `NO_SPELLBOOK`: 没有法术书
- `ANOTHER_SPELL_IN_PLAY`: 另一个法术正在进行中
- `NO_SPELLS_AT_ALL`: 完全没有法术
- `TOO_LOW_LEVEL`: 等级太低
- `TARGET_DEAD`: 目标已死亡
- `WRONG_UNIT`: 单位错误
- `NO_GOOD_TARGET`: 没有合适的正面目标
- `NO_BAD_TARGET`: 没有合适的负面目标
- `MORALE`: 士气影响
- `UNIT_ALREADY_ACTIVATED`: 单位已被激活
- `BAD_ALIGNMENT`: 阵营不符
- `NO_MONEY`: 资金不足
- `NO_MOVEMENT`: 没有移动点数
- `SUMMONING_ERROR`: 召唤错误
- `NO_SPELL_POWER`: 法术力量不足
- `ALREADY_CAST_THIS_TURN`: 本回合已施放过
- `IMMUNITY`: 免疫
- `INVALID`: 无效
- `CUSTOM`: 自定义问题
- `LIMITER_BLOCKING`: 限制器阻止
- `OTHER`: 其他

## 设计说明

ESpellCastProblem枚举在VCMI的法术系统中扮演着重要的角色，它提供了详细的错误信息，帮助开发者和玩家了解法术施放失败的具体原因。这种细粒度的错误报告机制增强了游戏的可玩性和调试便利性。