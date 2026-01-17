# TavernSlot

## 源文件

[TavernSlot.h](https://github.com/vcmi/vcmi/blob/master/lib/gameState/TavernSlot.h)

## 概述

`TavernSlot.h` 定义了与游戏中酒馆英雄槽位相关的枚举类型。这些枚举用于描述酒馆中英雄的位置和状态。

## 枚举定义

### TavernHeroSlot

```cpp
enum class TavernHeroSlot : int8_t
{
    NONE = -1,
    NATIVE,    // 1st / left slot in tavern, contains hero native to player's faction on new week
    RANDOM     // 2nd / right slot in tavern, contains hero of random class
};
```

定义酒馆中的英雄槽位类型。

**枚举值:**
- `NONE = -1` - 无槽位
- `NATIVE` - 本地槽位（酒馆左侧第一个槽位，每周新英雄时包含玩家派系的本地英雄）
- `RANDOM` - 随机槽位（酒馆右侧第二个槽位，包含随机职业的英雄）

### TavernSlotRole

```cpp
enum class TavernSlotRole : int8_t
{
    NONE = -1,

    SINGLE_UNIT,  // hero was added after buying hero from this slot, and only has 1 creature in army
    FULL_ARMY,    // hero was added to tavern on new week and still has full army
    RETREATED,    // hero was owned by player before, but have retreated from battle and only has 1 creature in army
    SURRENDERED   // hero was owned by player before, but have surrendered in battle and kept some troops
};
```

定义酒馆槽位中英雄的状态和角色。

**枚举值:**
- `NONE = -1` - 无角色
- `SINGLE_UNIT` - 单个单位（从此槽位购买英雄后添加，只有1个生物在军队中）
- `FULL_ARMY` - 完整军队（在新周添加到酒馆，仍有完整军队）
- `RETREATED` - 撤退（之前属于玩家，但在战斗中撤退，只有1个生物在军队中）
- `SURRENDERED` - 投降（之前属于玩家，但在战斗中投降，保留了一些部队）

## 设计特点

- **类型安全**: 使用强类型枚举（`enum class`）避免隐式转换
- **明确语义**: 枚举值清晰地描述了酒馆机制中的不同状态
- **游戏逻辑**: 反映了英雄在酒馆中的不同获取和状态方式
- **军队管理**: 区分了英雄军队的完整性和战斗历史