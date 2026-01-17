<!-- 来源: E:\develop\heroes\vcmi\lib\callback\IGameEventCallback.h -->
# IGameEventCallback接口

IGameEventCallback接口定义了VCMI游戏中各种事件和状态变化的抽象接口。它提供了对象属性修改、资源分配、军队操作、战斗开始等所有游戏状态变更的回调方法。

## 接口定义

```cpp
class DLL_LINKAGE IGameEventCallback
```

## 概述

IGameEventCallback是游戏事件系统的核心接口，定义了服务器端修改游戏状态的所有操作。这些操作包括对象属性设置、资源分配、军队管理、战斗初始化等。

## 对象属性方法

### 属性设置
- `void setObjPropertyValue(ObjectInstanceID objid, ObjProperty prop, int32_t value = 0)`: 设置对象属性值
- `void setObjPropertyID(ObjectInstanceID objid, ObjProperty prop, ObjPropertyID identifier)`: 设置对象属性ID

### 奖励对象配置
- `void setRewardableObjectConfiguration(ObjectInstanceID mapObjectID, const Rewardable::Configuration & configuration)`: 设置地图对象奖励配置
- `void setRewardableObjectConfiguration(ObjectInstanceID townInstanceID, BuildingID buildingID, const Rewardable::Configuration & configuration)`: 设置城镇建筑奖励配置

## 信息显示方法

- `void showInfoDialog(InfoWindow * iw)`: 显示信息对话框
- `void showBlockingDialog(const IObjectInterface * caller, BlockingDialog *iw)`: 显示阻塞对话框
- `void showGarrisonDialog(ObjectInstanceID upobj, ObjectInstanceID hid, bool removableUnits)`: 显示守备对话框
- `void showTeleportDialog(TeleportDialog *iw)`: 显示传送对话框
- `void showObjectWindow(const CGObjectInstance * object, EOpenWindowMode window, const CGHeroInstance * visitor, bool addQuery)`: 显示对象窗口

## 英雄相关方法

### 法术管理
- `void changeSpells(const CGHeroInstance * hero, bool give, const std::set<SpellID> &spells)`: 改变英雄法术
- `void setResearchedSpells(const CGTownInstance * town, int level, const std::vector<SpellID> & spells, bool accepted)`: 设置已研究的法术

### 属性修改
- `void giveExperience(const CGHeroInstance * hero, TExpType val)`: 给予英雄经验
- `void changePrimSkill(const CGHeroInstance * hero, PrimarySkill which, si64 val, ChangeValueMode mode)`: 改变主属性技能
- `void changeSecSkill(const CGHeroInstance * hero, SecondarySkill which, int val, ChangeValueMode mode)`: 改变副属性技能

### 移动和位置
- `bool moveHero(ObjectInstanceID hid, int3 dst, EMovementMode moveMove, bool transit = false, PlayerColor asker = PlayerColor::NEUTRAL)`: 移动英雄
- `void setMovePoints(SetMovePoints * smp)`: 设置移动点数
- `void setMovePoints(ObjectInstanceID hid, int val)`: 设置英雄移动点数
- `void setManaPoints(ObjectInstanceID hid, int val)`: 设置英雄法力点数

## 资源和物品方法

### 资源分配
- `void giveResource(PlayerColor player, GameResID which, int val)`: 给予玩家资源
- `void giveResources(PlayerColor player, const ResourceSet & resources)`: 给予玩家资源集合

### 神器管理
- `bool giveHeroNewArtifact(const CGHeroInstance * h, const ArtifactID & artId, const ArtifactPosition & pos)`: 给予英雄新神器
- `bool giveHeroNewScroll(const CGHeroInstance * h, const SpellID & spellId, const ArtifactPosition & pos)`: 给予英雄新法术卷轴
- `bool putArtifact(const ArtifactLocation & al, const ArtifactInstanceID & id, std::optional<bool> askAssemble = std::nullopt)`: 放置神器
- `void removeArtifact(const ArtifactLocation& al)`: 移除神器
- `bool moveArtifact(const PlayerColor & player, const ArtifactLocation & al1, const ArtifactLocation & al2)`: 移动神器

## 军队和生物方法

### 生物分配
- `void giveCreatures(const CGHeroInstance * h, const CCreatureSet &creatures)`: 给予英雄生物
- `void giveCreatures(const CArmedInstance *objid, const CGHeroInstance * h, const CCreatureSet &creatures, bool remove)`: 从对象给予英雄生物
- `void takeCreatures(ObjectInstanceID objid, const std::vector<CStackBasicDescriptor> &creatures, bool forceRemoval = false)`: 从对象取走生物

### 部队操作
- `bool changeStackCount(const StackLocation &sl, TQuantity count, ChangeValueMode mode)`: 改变部队数量
- `bool changeStackType(const StackLocation &sl, const CCreature *c)`: 改变部队类型
- `bool insertNewStack(const StackLocation &sl, const CCreature *c, TQuantity count = -1)`: 插入新部队
- `bool eraseStack(const StackLocation &sl, bool forceRemoval = false)`: 删除部队
- `bool swapStacks(const StackLocation &sl1, const StackLocation &sl2)`: 交换部队
- `bool addToSlot(const StackLocation &sl, const CCreature *c, TQuantity count)`: 添加到槽位
- `bool moveStack(const StackLocation &src, const StackLocation &dst, TQuantity count)`: 移动部队

### 军队合并
- `void tryJoiningArmy(const CArmedInstance *src, const CArmedInstance *dst, bool removeObjWhenFinished, bool allowMerging)`: 尝试合并军队

## 对象和地图方法

### 对象管理
- `bool removeObject(const CGObjectInstance * obj, const PlayerColor & initiator)`: 移除对象
- `void createBoat(const int3 & visitablePosition, BoatId type, PlayerColor initiator)`: 创建船只
- `void setOwner(const CGObjectInstance * objid, PlayerColor owner)`: 设置对象所有者
- `void changeObjPos(ObjectInstanceID objid, int3 newPos, const PlayerColor & initiator)`: 改变对象位置
- `void removeAfterVisit(const ObjectInstanceID & id)`: 访问后移除对象

### 英雄分配
- `void giveHero(ObjectInstanceID id, PlayerColor player, ObjectInstanceID boatId = ObjectInstanceID())`: 给予玩家英雄

### 视野管理
- `void changeFogOfWar(int3 center, ui32 radius, PlayerColor player, ETileVisibility mode)`: 改变战争迷雾（圆形区域）
- `void changeFogOfWar(const FowTilesType &tiles, PlayerColor player, ETileVisibility mode)`: 改变战争迷雾（指定地块）

## 城镇和战斗方法

### 城镇访问
- `void heroVisitCastle(const CGTownInstance * obj, const CGHeroInstance * hero)`: 英雄访问城堡
- `void visitCastleObjects(const CGTownInstance * obj, const CGHeroInstance * hero)`: 访问城堡对象
- `void stopHeroVisitCastle(const CGTownInstance * obj, const CGHeroInstance * hero)`: 停止英雄访问城堡

### 战斗初始化
- `void startBattle(const CArmedInstance *army1, const CArmedInstance *army2, int3 tile, const CGHeroInstance *hero1, const CGHeroInstance *hero2, const BattleLayout & layout, const CGTownInstance *town)`: 开始战斗（完整参数）
- `void startBattle(const CArmedInstance *army1, const CArmedInstance *army2)`: 开始战斗（简化参数）

## 奖励和效果方法

- `void giveHeroBonus(GiveBonus * bonus)`: 给予英雄奖励
- `void castSpell(const spells::Caster * caster, SpellID spellID, const int3 &pos)`: 施放法术

## 通信和查询方法

- `void sendAndApply(CPackForClient & pack)`: 发送并应用客户端包
- `void heroExchange(ObjectInstanceID hero1, ObjectInstanceID hero2)`: 英雄交换
- `bool isVisitCoveredByAnotherQuery(const CGObjectInstance *obj, const CGHeroInstance *hero)`: 检查访问是否被其他查询覆盖

## 工具方法

- `vstd::RNG & getRandomGenerator()`: 获取随机数生成器

## 实现注意事项

IGameEventCallback的所有方法都是纯虚方法，必须由实现类（通常是服务器端）提供具体实现。这些方法直接修改游戏状态，需要 careful 处理线程安全和状态一致性。

## 相关类

- `CGHeroInstance`: 英雄实例
- `CGTownInstance`: 城镇实例
- `CArmedInstance`: 武装实例
- `ArtifactLocation`: 神器位置
- `StackLocation`: 部队位置
- `GiveBonus`: 奖励结构体