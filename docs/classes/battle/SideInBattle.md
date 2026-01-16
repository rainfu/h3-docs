# SideInBattle结构体

SideInBattle结构体是VCMI战斗系统中表示战斗中一方（通常是玩家）的详细信息的结构体，继承自GameCallbackHolder，用于跟踪战斗中特定一方的状态和统计数据。

## 类定义

```cpp
struct DLL_LINKAGE SideInBattle : public GameCallbackHolder
{
    using GameCallbackHolder::GameCallbackHolder; // 继承父类构造函数

    PlayerColor color = PlayerColor::CANNOT_DETERMINE; // 玩家颜色
    ObjectInstanceID heroID;                            // 英雄ID（如果该方不由英雄指挥则可能为空）
    ObjectInstanceID armyObjectID;                      // 参与战斗的军队对象ID（高级地图对象）

    uint32_t castSpellsCount = 0;                     // 该方在本回合已施放的法术数量
    std::vector<SpellID> usedSpellsHistory;           // 已使用法术历史（用于鹰眼技能等）
    int32_t enchanterCounter = 0;                     // 附魔师计数器
    int32_t initialMana = 0;                          // 初始法力值
    int32_t additionalMana = 0;                       // 额外法力值

    void init(const CGHeroInstance * Hero, const CArmedInstance * Army, const CGTownInstance * town); // 初始化方法
    const CArmedInstance * getArmy() const;           // 获取军队实例
    const CGHeroInstance * getHero() const;           // 获取英雄实例

    template <typename Handler> void serialize(Handler &h); // 序列化函数
};
```

## 功能说明

SideInBattle是VCMI战斗系统中用于表示战斗中一方（通常是玩家）的结构体，它继承自GameCallbackHolder，因此具备了处理游戏回调的能力。该结构体用于跟踪战斗中特定一方的状态、统计数据和相关对象引用。

## 成员变量

- `color`: 玩家颜色，表示该方所属的玩家，初始值为无法确定
- `heroID`: 英雄实例ID，表示该方的指挥英雄（如果该方不由英雄指挥则可能为空）
- `armyObjectID`: 军队对象实例ID，表示参与战斗的高级地图对象
- `castSpellsCount`: 该方在当前回合已施放的法术数量
- `usedSpellsHistory`: 已使用法术的历史记录向量，用于鹰眼等技能的效果
- `enchanterCounter`: 附魔师计数器，记录附魔师技能的使用次数
- `initialMana`: 初始法力值，记录该方英雄的初始法力值
- `additionalMana`: 额外法力值，记录战斗中获得的额外法力值

## 函数注释

- `init(Hero, Army, town)`: 初始化方法，使用指定的英雄、军队和城镇信息初始化该方信息
- `getArmy()`: 获取该方的军队实例指针
- `getHero()`: 获取该方的英雄实例指针
- `serialize(h)`: 模板方法，用于序列化/反序列化结构体数据，支持数据的保存和加载

## 设计说明

SideInBattle结构体是战斗系统中用于管理战斗双方信息的核心组件。它不仅跟踪基本的身份信息（如玩家颜色、英雄ID和军队ID），还记录了战斗过程中动态变化的信息（如已施放法术数量、法力值等）。

该结构体继承自GameCallbackHolder，使其能够参与游戏状态的更新和回调处理。通过维护已使用法术的历史记录，它支持鹰眼技能等需要了解过去行动的功能。

通过将战斗中每一方的信息封装在单独的结构体中，系统可以方便地跟踪和管理战斗中不同玩家的状态，为战斗逻辑提供了必要的数据支持。