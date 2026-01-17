<!-- 来源: E:\develop\heroes\vcmi\lib\callback\IGameActionCallback.h -->
# IGameActionCallback接口

IGameActionCallback接口定义了VCMI游戏中各种玩家动作的抽象接口。它提供了冒险地图、城镇管理、交易、军队操作等所有主要游戏操作的回调方法。

## 接口定义

```cpp
class IGameActionCallback
```

## 概述

IGameActionCallback是游戏动作系统的核心接口，定义了玩家可以执行的所有主要操作。这些操作包括英雄移动、法术施放、城镇建设、交易、军队管理等。

## 英雄相关方法

### 移动和探索
- `void moveHero(const CGHeroInstance *h, const std::vector<int3> & path, bool transit)`: 沿指定路径移动英雄
- `void moveHero(const CGHeroInstance *h, const int3 & destination, bool transit)`: 移动英雄到指定目的地
- `void dig(const CGObjectInstance *hero)`: 挖掘宝藏

### 法术操作
- `void castSpell(const CGHeroInstance *hero, SpellID spellID, const int3 &pos = int3(-1, -1, -1))`: 施放冒险地图法术

### 英雄管理
- `bool dismissHero(const CGHeroInstance * hero)`: 解雇英雄

## 城镇相关方法

### 英雄招募
- `void recruitHero(const CGObjectInstance *townOrTavern, const CGHeroInstance *hero, const HeroTypeID & nextHero=HeroTypeID::NONE)`: 在城镇或酒馆招募英雄

### 建筑操作
- `bool buildBuilding(const CGTownInstance *town, BuildingID buildingID)`: 建造建筑
- `bool visitTownBuilding(const CGTownInstance *town, BuildingID buildingID)`: 访问城镇建筑

### 生物管理
- `void recruitCreatures(const CGDwelling *obj, const CArmedInstance * dst, CreatureID ID, ui32 amount, si32 level=-1)`: 招募生物
- `bool upgradeCreature(const CArmedInstance *obj, SlotID stackPos, CreatureID newID=CreatureID::NONE)`: 升级生物

### 法术研究
- `void spellResearch(const CGTownInstance *town, SpellID spellAtSlot, bool accepted)`: 法术研究

### 守备英雄
- `void swapGarrisonHero(const CGTownInstance *town)`: 交换守备英雄

## 交易相关方法

### 市场交易
- `void trade(const ObjectInstanceID marketId, EMarketMode mode, TradeItemSell id1, TradeItemBuy id2, ui32 val1, const CGHeroInstance * hero)`: 执行交易
- `void trade(const ObjectInstanceID marketId, EMarketMode mode, const std::vector<TradeItemSell> & id1, const std::vector<TradeItemBuy> & id2, const std::vector<ui32> & val1, const CGHeroInstance * hero)`: 批量交易

## 查询和响应方法

- `int selectionMade(int selection, QueryID queryID)`: 做出选择
- `int sendQueryReply(std::optional<int32_t> reply, QueryID queryID)`: 发送查询回复

## 军队管理方法

### 军队操作
- `int swapCreatures(const CArmedInstance *s1, const CArmedInstance *s2, SlotID p1, SlotID p2)`: 交换生物
- `int mergeStacks(const CArmedInstance *s1, const CArmedInstance *s2, SlotID p1, SlotID p2)`: 合并部队
- `int mergeOrSwapStacks(const CArmedInstance *s1, const CArmedInstance *s2, SlotID p1, SlotID p2)`: 合并或交换部队
- `int splitStack(const CArmedInstance *s1, const CArmedInstance *s2, SlotID p1, SlotID p2, int val)`: 分割部队

### 批量军队操作
- `int bulkMoveArmy(ObjectInstanceID srcArmy, ObjectInstanceID destArmy, SlotID srcSlot)`: 批量移动军队
- `int bulkSplitStack(ObjectInstanceID armyId, SlotID srcSlot, int howMany = 1)`: 批量分割部队
- `int bulkSplitAndRebalanceStack(ObjectInstanceID armyId, SlotID srcSlot)`: 批量分割并重新平衡部队
- `int bulkMergeStacks(ObjectInstanceID armyId, SlotID srcSlot)`: 批量合并部队

## 神器管理方法

### 神器操作
- `bool swapArtifacts(const ArtifactLocation &l1, const ArtifactLocation &l2)`: 交换神器
- `void assembleArtifacts(const ObjectInstanceID & heroID, ArtifactPosition artifactSlot, bool assemble, ArtifactID assembleTo)`: 组装神器
- `void eraseArtifactByClient(const ArtifactLocation & al)`: 客户端删除神器

### 背包管理
- `void scrollBackpackArtifacts(ObjectInstanceID hero, bool left)`: 滚动背包神器
- `void sortBackpackArtifactsBySlot(const ObjectInstanceID hero)`: 按槽位排序背包神器
- `void sortBackpackArtifactsByCost(const ObjectInstanceID hero)`: 按成本排序背包神器
- `void sortBackpackArtifactsByClass(const ObjectInstanceID hero)`: 按类别排序背包神器
- `void manageHeroCostume(ObjectInstanceID hero, size_t costumeIndex, bool saveCostume)`: 管理英雄服装

### 批量神器操作
- `void bulkMoveArtifacts(ObjectInstanceID srcHero, ObjectInstanceID dstHero, bool swap, bool equipped, bool backpack)`: 批量移动神器

## 生物管理方法

- `bool dismissCreature(const CArmedInstance *obj, SlotID stackPos)`: 解雇生物

## 游戏控制方法

### 保存和消息
- `void save(const std::string &fname)`: 保存游戏
- `void sendMessage(const std::string &mess, const CGObjectInstance * currentObject = nullptr)`: 发送消息
- `void saveLocalState(const JsonNode & data)`: 保存本地状态

### 游戏流程
- `void endTurn()`: 结束回合
- `void gamePause(bool pause)`: 暂停/恢复游戏

## 特殊操作方法

### 购买和建造
- `void buyArtifact(const CGHeroInstance *hero, ArtifactID aid)`: 购买神器
- `void buildBoat(const IShipyard *obj)`: 建造船只
- `void setFormation(const CGHeroInstance * hero, EArmyFormation mode)`: 设置阵型
- `void setTownName(const CGTownInstance * town, std::string & name)`: 设置城镇名称

### 统计和请求
- `void requestStatistic()`: 请求统计信息

## 实现注意事项

IGameActionCallback的所有方法都是纯虚方法，必须由实现类提供具体实现。这些方法通常涉及网络通信、游戏状态修改等复杂操作。

## 相关类

- `CGHeroInstance`: 英雄实例
- `CGTownInstance`: 城镇实例
- `CArmedInstance`: 武装实例
- `ArtifactLocation`: 神器位置
- `TradeItemSell/Buy`: 交易物品