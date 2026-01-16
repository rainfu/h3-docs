# CAdventureAI类

CAdventureAI类是VCMI AI系统中的冒险AI基类，专为仅处理冒险地图AI逻辑而设计。该类继承自CGlobalAI，将战斗操作委托给专门的战斗AI。

## 类定义

```cpp
class DLL_LINKAGE CAdventureAI : public CGlobalAI
{
public:
    CAdventureAI() = default;

    std::shared_ptr<CBattleGameInterface> battleAI;  // 战斗AI接口
    std::shared_ptr<CBattleCallback> cbc;           // 战斗回调

    virtual std::string getBattleAIName() const = 0; // 必须返回要使用的战斗AI名称

    // 战斗接口方法
    void activeStack(const BattleID & battleID, const CStack * stack) override;                    // 激活堆栈
    void yourTacticPhase(const BattleID & battleID, int distance) override;                       // 战术阶段
    void battleNewRound(const BattleID & battleID) override;                                      // 新回合开始
    void battleCatapultAttacked(const BattleID & battleID, const CatapultAttack & ca) override;   // 投石车攻击
    void battleStart(const BattleID & battleID, const CCreatureSet *army1, const CCreatureSet *army2, int3 tile, const CGHeroInstance *hero1, const CGHeroInstance *hero2, BattleSide side, bool replayAllowed) override; // 战斗开始
    void battleStacksAttacked(const BattleID & battleID, const std::vector<BattleStackAttacked> & bsa, bool ranged) override; // 堆栈被攻击
    void actionStarted(const BattleID & battleID, const BattleAction &action) override;            // 动作开始
    void battleNewRoundFirst(const BattleID & battleID) override;                                 // 新回合开始（首次）
    void actionFinished(const BattleID & battleID, const BattleAction &action) override;          // 动作完成
    void battleStacksEffectsSet(const BattleID & battleID, const SetStackEffect & sse) override;  // 堆栈效果设置
    void battleTriggerEffect(const BattleID & battleID, const BattleTriggerEffect & bte) override; // 触发效果
    void battleObstaclesChanged(const BattleID & battleID, const std::vector<ObstacleChanges> & obstacles) override; // 障碍物变化
    void battleStackMoved(const BattleID & battleID, const CStack * stack, const BattleHexArray & dest, int distance, bool teleport) override; // 堆栈移动
    void battleAttack(const BattleID & battleID, const BattleAttack *ba) override;                 // 攻击
    void battleSpellCast(const BattleID & battleID, const BattleSpellCast *sc) override;           // 法术施放
    void battleEnd(const BattleID & battleID, const BattleResult *br, QueryID queryID) override;  // 战斗结束
    void battleUnitsChanged(const BattleID & battleID, const std::vector<UnitChanges> & units) override; // 单位变化
};
```

## 功能说明

CAdventureAI类是专为仅处理冒险地图AI逻辑而设计的类，它继承自CGlobalAI基类。该类的主要特点是将战斗操作委托给专门的战斗AI，从而实现了冒险AI和战斗AI的关注点分离。

这个设计允许开发者专注于冒险地图上的决策逻辑（如英雄移动、资源管理、城镇建设等），而将战斗决策交给专门的战斗AI模块。

## 成员变量

- `battleAI`: 指向CBattleGameInterface的智能指针，用于处理战斗相关的逻辑
- `cbc`: 指向CBattleCallback的智能指针，用于处理战斗回调

## 虚函数

- `getBattleAIName()`: 纯虚函数，必须由派生类实现，返回要使用的战斗AI的名称

## 战斗接口实现

CAdventureAI实现了完整的战斗接口，将所有战斗相关的事件转发给内部的战斗AI实例。这些方法包括：

- 战斗生命周期事件（开始、结束、新回合）
- 战斗动作事件（攻击、移动、施法）
- 战斗状态变化（效果设置、障碍物变化、单位变化）

## 设计说明

CAdventureAI类体现了职责分离的设计原则，将冒险地图AI和战斗AI的功能分开。这种设计有几个优点：

1. **模块化**: 冒险AI和战斗AI可以独立开发和测试
2. **可替换性**: 可以为同一冒险AI切换不同的战斗AI策略
3. **可重用性**: 战斗AI可以在不同的冒险AI之间重用
4. **易于维护**: 各部分的职责清晰，便于维护和扩展

这种架构使得开发者可以专注于冒险地图的决策逻辑，而战斗AI则专门处理战斗策略，提高了代码的可维护性和扩展性。