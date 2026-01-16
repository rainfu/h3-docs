# CPlayerBattleCallback类

CPlayerBattleCallback类是VCMI战斗系统中为特定玩家提供战斗信息访问权限的回调类，继承自CBattleInfoCallback，用于封装玩家在战斗中的特定视角和权限。

## 类定义

```cpp
class DLL_LINKAGE CPlayerBattleCallback : public CBattleInfoCallback
{
    const IBattleInfo * battle;  // 战斗信息指针
    PlayerColor player;          // 玩家颜色

public:
    CPlayerBattleCallback(const IBattleInfo * battle, PlayerColor player); // 构造函数

#if SCRIPTING_ENABLED
    scripting::Pool * getContextPool() const override; // 获取脚本上下文池
#endif

    const IBattleInfo * getBattle() const override;      // 获取战斗信息
    std::optional<PlayerColor> getPlayerID() const override; // 获取玩家ID

    bool battleCanFlee() const;                        // 检查是否可以逃跑
    TStacks battleGetStacks(EStackOwnership whose = MINE_AND_ENEMY, bool onlyAlive = true) const; // 获取战场堆栈

    int battleGetSurrenderCost() const;                // 获取投降费用
    const CGHeroInstance * battleGetMyHero() const;    // 获取我的英雄
    InfoAboutHero battleGetEnemyHero() const;          // 获取敌方英雄信息
};
```

## 功能说明

CPlayerBattleCallback是VCMI战斗系统中用于为特定玩家提供战斗信息访问的类。它继承自CBattleInfoCallback，但限制了访问权限，只允许玩家访问其在战斗中有权查看的信息。这个类代表了特定玩家在战斗中的视角，确保了信息的隐蔽性和公平性。

## 构造函数

- `CPlayerBattleCallback(battle, player)`: 用战斗信息和玩家颜色构造回调对象

## 函数注释

- `getBattle()`: 获取当前战斗的信息对象
- `getPlayerID()`: 获取当前玩家的颜色标识
- `battleCanFlee()`: 检查当前玩家是否可以从战斗中逃跑
- `battleGetStacks(whose, onlyAlive)`: 获取战场上的堆栈列表，可以选择获取哪一方的堆栈和是否只获取存活单位
- `battleGetSurrenderCost()`: 获取投降所需的费用，如果不能投降则返回-1
- `battleGetMyHero()`: 获取当前玩家的英雄实例
- `battleGetEnemyHero()`: 获取敌方英雄的信息

## 成员变量

- `battle`: 指向战斗信息对象的常量指针
- `player`: 表示当前玩家颜色的枚举值

## 设计说明

CPlayerBattleCallback类是战斗系统中访问控制的关键组件，它确保玩家只能访问其有权查看的战斗信息。通过限制信息访问，该类维护了游戏的公平性，例如玩家不能看到对手的隐藏信息或不可见单位。这种设计使得战斗系统可以根据玩家的角色和权限提供适当的信息视图。