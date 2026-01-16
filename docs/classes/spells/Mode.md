# Mode枚举

Mode枚举是VCMI中法术施放模式的定义，用于区分法术的不同施放方式和上下文。

## 类定义

```cpp
namespace spells
{
    enum class DLL_LINKAGE Mode
    {
        HERO,           // 英雄施法
        CREATURE_ACTIVE, // 生物主动施法
        CREATURE_PASSIVE,// 生物被动效果
        ENCHANTER,      // 附魔师施法
        SPELL_LIKE_ATTACK, // 攻击时施法
        OTHER
    };
}
```

## 功能说明

Mode是VCMI法术系统中用来区分法术施放模式的枚举。它定义了法术在不同情境下的施放方式，对于法术效果的计算和应用有直接影响。每种模式代表了不同的施法上下文和规则。

## 枚举值

- `HERO`: 英雄施法模式，表示由英雄主动施放的法术
- `CREATURE_ACTIVE`: 生物主动施法模式，表示由生物主动施放的法术
- `CREATURE_PASSIVE`: 生物被动效果模式，表示生物被动产生的效果
- `ENCHANTER`: 附魔师施法模式，表示由附魔师单位施放的法术
- `SPELL_LIKE_ATTACK`: 攻击时施法模式，表示在攻击时触发的法术效果
- `OTHER`: 其他模式，用于处理不属于上述任何一种的情况