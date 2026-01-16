# Metatype枚举

Metatype枚举是VCMI中元类型标识符的定义，用于区分不同类型的游戏对象。

## 类定义

```cpp
enum class Metatype : uint32_t
{
    UNKNOWN = 0,          // 未知类型
    ARTIFACT,             // 神器类型
    ARTIFACT_INSTANCE,    // 神器实例类型
    CREATURE,             // 生物类型
    CREATURE_INSTANCE,    // 生物实例类型
    FACTION,              // 派系类型
    HERO_CLASS,           // 英雄职业类型
    HERO_TYPE,            // 英雄类型
    HERO_INSTANCE,        // 英雄实例类型
    MAP_OBJECT_GROUP,     // 地图对象组类型
    MAP_OBJECT_TYPE,      // 地图对象类型
    MAP_OBJECT_INSTANCE,  // 地图对象实例类型
    SKILL,                // 技能类型
    SPELL                 // 法术类型
};
```

## 功能说明

Metatype是VCMI中用于标识对象元类型的枚举，它提供了一种标准化的方式来区分不同种类的游戏对象。这个枚举在系统内部用于类型检查、对象分类和序列化过程中的类型标识。

## 枚举值

- `UNKNOWN = 0`: 未知类型，用于表示未定义或无效的类型
- `ARTIFACT`: 神器类型，表示游戏中的神器对象
- `ARTIFACT_INSTANCE`: 神器实例类型，表示具体的神器实例
- `CREATURE`: 生物类型，表示游戏中的生物对象
- `CREATURE_INSTANCE`: 生物实例类型，表示具体的生物实例
- `FACTION`: 派系类型，表示游戏中的派系对象
- `HERO_CLASS`: 英雄职业类型，表示英雄的职业类别
- `HERO_TYPE`: 英雄类型，表示特定的英雄类型
- `HERO_INSTANCE`: 英雄实例类型，表示具体的英雄实例
- `MAP_OBJECT_GROUP`: 地图对象组类型，表示地图对象的分组
- `MAP_OBJECT_TYPE`: 地图对象类型，表示地图对象的类型
- `MAP_OBJECT_INSTANCE`: 地图对象实例类型，表示具体的地图对象实例
- `SKILL`: 技能类型，表示游戏中的技能
- `SPELL`: 法术类型，表示游戏中的法术