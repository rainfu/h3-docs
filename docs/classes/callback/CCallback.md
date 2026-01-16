# CCallback类

CCallback类是VCMI系统中的核心回调类，整合了玩家特定信息、战斗和游戏动作的回调功能。它是CPlayerSpecificInfoCallback、CBattleCallback和IGameActionCallback的组合实现，为游戏提供统一的交互接口。

## 类定义

```cpp
class IBattleEventsReceiver;

class DLL_LINKAGE CCallback : public CPlayerSpecificInfoCallback, public CBattleCallback, public IGameActionCallback
{
    std::shared_ptr<CGameState> gamestate;  // 游戏状态智能指针

    CGameState & gameState() final { return *gamestate; }      // 获取游戏状态（非const）
    const CGameState & gameState() const final { return *gamestate; } // 获取游戏状态（const）

public:
    CCallback(std::shared_ptr<CGameState> gamestate, std::optional<PlayerColor> Player, IClient * C); // 构造函数
    virtual ~CCallback();  // 虚析构函数

    // 客户端特定功能（路径查找）
    virtual bool canMoveBetween(const int3 &a, const int3 &b);           // 检查两点间是否可以移动
    virtual int3 getGuardingCreaturePosition(int3 tile);                 // 获取守护生物位置

    std::optional<PlayerColor> getPlayerID() const override;              // 获取玩家ID

    // 命令方法
    void moveHero(const CGHeroInstance *h, const std::vector<int3> & path, bool transit) override;     // 沿路径移动英雄
    void moveHero(const CGHeroInstance *h, const int3 & destination, bool transit) override;          // 移动英雄到目的地
    bool teleportHero(const CGHeroInstance *who, const CGTownInstance *where);                        // 传送英雄
    int selectionMade(int selection, QueryID queryID) override;                                       // 选择操作
    int sendQueryReply(std::optional<int32_t> reply, QueryID queryID) override;                       // 发送查询回复
    int swapCreatures(const CArmedInstance *s1, const CArmedInstance *s2, SlotID p1, SlotID p2) override; // 交换生物
    int mergeOrSwapStacks(const CArmedInstance *s1, const CArmedInstance *s2, SlotID p1, SlotID p2) override; // 合并或交换堆栈
    int mergeStacks(const CArmedInstance *s1, const CArmedInstance *s2, SlotID p1, SlotID p2) override; // 合并堆栈
    int splitStack(const CArmedInstance *s1, const CArmedInstance *s2, SlotID p1, SlotID p2, int val) override; // 拆分堆栈
    int bulkMoveArmy(ObjectInstanceID srcArmy, ObjectInstanceID destArmy, SlotID srcSlot) override;    // 批量移动军队
    int bulkSplitStack(ObjectInstanceID armyId, SlotID srcSlot, int howMany = 1) override;             // 批量拆分堆栈
    int bulkSplitAndRebalanceStack(ObjectInstanceID armyId, SlotID srcSlot) override;                  // 批量拆分并重新平衡堆栈
    int bulkMergeStacks(ObjectInstanceID armyId, SlotID srcSlot) override;                             // 批量合并堆栈
    bool dismissHero(const CGHeroInstance * hero) override;                                           // 解雇英雄
    bool swapArtifacts(const ArtifactLocation &l1, const ArtifactLocation &l2) override;              // 交换神器
    void assembleArtifacts(const ObjectInstanceID & heroID, ArtifactPosition artifactSlot, bool assemble, ArtifactID assembleTo) override; // 组装神器
    void bulkMoveArtifacts(ObjectInstanceID srcHero, ObjectInstanceID dstHero, bool swap, bool equipped = true, bool backpack = true) override; // 批量移动神器
    void scrollBackpackArtifacts(ObjectInstanceID hero, bool left) override;                          // 滚动背包神器
    void sortBackpackArtifactsBySlot(const ObjectInstanceID hero) override;                           // 按槽位排序背包神器
    void sortBackpackArtifactsByCost(const ObjectInstanceID hero) override;                           // 按价值排序背包神器
    void sortBackpackArtifactsByClass(const ObjectInstanceID hero) override;                          // 按类别排序背包神器
    void manageHeroCostume(ObjectInstanceID hero, size_t costumeIdx, bool saveCostume) override;      // 管理英雄服装
    void eraseArtifactByClient(const ArtifactLocation & al) override;                                 // 由客户端删除神器
    bool buildBuilding(const CGTownInstance *town, BuildingID buildingID) override;                    // 建造建筑
    bool visitTownBuilding(const CGTownInstance *town, BuildingID buildingID) override;                // 访问城镇建筑
    void recruitCreatures(const CGDwelling * obj, const CArmedInstance * dst, CreatureID ID, ui32 amount, si32 level=-1) override; // 招募生物
    bool dismissCreature(const CArmedInstance *obj, SlotID stackPos) override;                         // 解散生物
    bool upgradeCreature(const CArmedInstance *obj, SlotID stackPos, CreatureID newID=CreatureID::NONE) override; // 升级生物
    void saveLocalState(const JsonNode & data) override;                                             // 保存本地状态
    void endTurn() override;                                                                          // 结束回合
    void spellResearch(const CGTownInstance *town, SpellID spellAtSlot, bool accepted) override;       // 法术研究
    void swapGarrisonHero(const CGTownInstance *town) override;                                       // 交换驻军英雄
    void buyArtifact(const CGHeroInstance *hero, ArtifactID aid) override;                            // 购买神器
    void trade(const ObjectInstanceID marketId, EMarketMode mode, TradeItemSell id1, TradeItemBuy id2, ui32 val1, const CGHeroInstance * hero = nullptr) override; // 交易
    void trade(const ObjectInstanceID marketId, EMarketMode mode, const std::vector<TradeItemSell> & id1, const std::vector<TradeItemBuy> & id2, const std::vector<ui32> & val1, const CGHeroInstance * hero = nullptr) override; // 批量交易
    void setFormation(const CGHeroInstance * hero, EArmyFormation mode) override;                      // 设置阵型
    void setTownName(const CGTownInstance * town, std::string & name) override;                       // 设置城镇名称
    void recruitHero(const CGObjectInstance *townOrTavern, const CGHeroInstance *hero, const HeroTypeID & nextHero=HeroTypeID::NONE) override; // 招募英雄
    void save(const std::string &fname) override;                                                     // 保存游戏
    void sendMessage(const std::string &mess, const CGObjectInstance * currentObject = nullptr) override; // 发送消息
    void gamePause(bool pause) override;                                                              // 暂停游戏
    void buildBoat(const IShipyard *obj) override;                                                    // 建造船只
    void dig(const CGObjectInstance *hero) override;                                                  // 挖掘
    void castSpell(const CGHeroInstance *hero, SpellID spellID, const int3 &pos = int3(-1, -1, -1)) override; // 施法
    void requestStatistic() override;                                                                 // 请求统计信息

    // 友元类
    friend class CClient;  // CClient类可以访问CCallback的私有成员
};
```

## 功能说明

CCallback类是VCMI系统中的核心回调类，它继承了三个重要的接口：
- CPlayerSpecificInfoCallback: 提供玩家特定信息的访问
- CBattleCallback: 处理战斗相关操作
- IGameActionCallback: 处理游戏动作

这个类提供了一个统一的接口来处理游戏中的各种操作，包括英雄移动、战斗、建筑建造、生物招募、神器交换等。

## 成员变量

- `gamestate`: 指向CGameState的智能指针，存储当前游戏状态

## 重要方法

### 游戏状态管理
- `gameState()`: 返回对游戏状态的引用（const和非const版本）

### 客户端功能
- `canMoveBetween()`: 检查两点间是否可以移动
- `getGuardingCreaturePosition()`: 获取守护生物的位置

### 英雄操作
- `moveHero()`: 移动英雄（路径或目的地版本）
- `teleportHero()`: 传送英雄
- `dismissHero()`: 解雇英雄

### 军队操作
- `swapCreatures()`: 交换生物
- `mergeStacks()`: 合并堆栈
- `splitStack()`: 拆分堆栈
- `bulk*()`: 批量操作方法

### 神器操作
- `swapArtifacts()`: 交换神器
- `assembleArtifacts()`: 组装神器
- `bulkMoveArtifacts()`: 批量移动神器

### 城镇操作
- `buildBuilding()`: 建造建筑
- `recruitCreatures()`: 招募生物
- `upgradeCreature()`: 升级生物

### 游戏流程
- `endTurn()`: 结束回合
- `save()`: 保存游戏
- `gamePause()`: 暂停游戏

## 设计说明

CCallback类是VCMI系统中的核心组件，整合了游戏中的多个重要功能。它的设计体现了以下几个关键特点：

1. **接口集成**: 继承了三个关键接口，提供统一的交互点
2. **状态管理**: 通过智能指针管理游戏状态
3. **操作多样性**: 支持游戏中的各种操作，从基本移动到复杂的战斗
4. **批处理支持**: 提供批量操作方法以提高效率
5. **客户端服务**: 提供客户端特定的功能，如路径查找

这种设计使得CCallback成为一个功能完备的中心化接口，简化了游戏逻辑与底层系统的交互。