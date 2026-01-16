# Metatype枚举

Metatype枚举是VCMI中元类型定义，用于标识不同类型的游戏对象。

## 类定义

```cpp
enum class DLL_LINKAGE Metatype
{
    ARTIFACT,      // 神器
    CREATURE,      // 生物
    HERO,          // 英雄
    SPELL,         // 法术
    ABILITY,       // 能力
    RESOURCE,      // 资源
    TOWN,          // 城镇
    PRIMARY_SKILL, // 主要技能
    SECONDARY_SKILL, // 次要技能
    TERRAIN,       // 地形
    OBJECT,        // 对象
    BATTLE,        // 战斗相关
    PLAYER,        // 玩家
    GAME_EVENT,    // 游戏事件
    FACTION        // 派系
};
```

## 功能说明

Metatype是VCMI中用于区分不同类型游戏对象的枚举。在VCMI的类型系统中，不同的游戏元素（如神器、生物、英雄等）需要被区分为不同的元类型，以便系统可以根据类型进行适当的处理。这个枚举为系统提供了一个统一的方式来识别和分类各种游戏对象。

## 枚举值

- `ARTIFACT`: 神器类型，表示游戏中的神器对象
- `CREATURE`: 生物类型，表示游戏中的生物单位
- `HERO`: 英雄类型，表示游戏中的英雄角色
- `SPELL`: 法术类型，表示游戏中的法术
- `ABILITY`: 能力类型，表示生物或英雄的特殊能力
- `RESOURCE`: 资源类型，表示游戏中的资源
- `TOWN`: 城镇类型，表示游戏中的城镇建筑
- `PRIMARY_SKILL`: 主要技能类型，表示英雄的四大主要技能
- `SECONDARY_SKILL`: 次要技能类型，表示英雄的次要技能
- `TERRAIN`: 地形类型，表示地图上的地形类型
- `OBJECT`: 对象类型，表示地图上的各种对象
- `BATTLE`: 战斗类型，表示战斗相关对象
- `PLAYER`: 玩家类型，表示游戏玩家
- `GAME_EVENT`: 游戏事件类型，表示游戏中的各种事件
- `FACTION`: 派系类型，表示生物阵营（如城堡、壁垒等）

## 设计说明

Metatype枚举在VCMI的类型系统中起着重要作用，它提供了一种统一的方式来分类和处理不同种类的游戏对象。通过这种分类，系统可以根据对象的类型执行适当的操作，例如在UI显示、序列化、类型检查等方面提供针对性的处理。