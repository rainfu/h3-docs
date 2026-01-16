# CGameHandler

## 概述

`CGameHandler` 类是VCMI服务器端的核心游戏处理器，负责处理所有游戏逻辑、玩家操作、战斗管理以及游戏状态的维护。该类实现了 `IGameEventCallback` 接口，提供了完整的游戏事件处理机制。

## 主要属性

- `server`: 游戏服务器引用
- `heroPool`: 英雄池处理器
- `battles`: 战斗处理器
- `queries`: 查询处理器
- `turnOrder`: 回合顺序处理器
- `turnTimerHandler`: 回合计时器处理器
- `newTurnProcessor`: 新回合处理器
- `randomizer`: 游戏随机化器
- `statistics`: 统计数据集
- `spellEnv`: 法术施放环境
- `gs`: 游戏状态共享指针
- `playerMessages`: 玩家消息处理器
- `QID`: 查询ID计数器

## 枚举定义

```cpp
enum EGuardLook {CHECK_FOR_GUARDS, IGNORE_GUARDS};
enum EVisitDest {VISIT_DEST, DONT_VISIT_DEST};
enum ELEaveTile {LEAVING_TILE, REMAINING_ON_TILE};
```

## 核心方法

### 初始化和生命周期

```cpp
CGameHandler(IGameServer & server);
CGameHandler(IGameServer & server, const std::shared_ptr<CGameState> & gamestate);
```

构造函数，支持从现有游戏状态恢复。

```cpp
void init(StartInfo *si, Load::ProgressAccumulator & progressTracking);
```

初始化游戏处理器。

```cpp
void start(bool resume);
void tick(int millisecondsPassed);
```

启动游戏和处理时间流逝。

### 游戏对象管理

```cpp
std::shared_ptr<CGObjectInstance> createNewObject(const int3 & visitablePosition, MapObjectID objectID, MapObjectSubID subID);
```

创建新游戏对象。

```cpp
void createWanderingMonster(const int3 & visitablePosition, CreatureID creature, int unitSize);
void createBoat(const int3 & visitablePosition, BoatId type, PlayerColor initiator);
void createHole(const int3 & visitablePosition, PlayerColor initiator);
```

创建特殊类型的游戏对象。

### 英雄操作

```cpp
bool moveHero(ObjectInstanceID hid, int3 dst, EMovementMode movementMode, bool transit = false, PlayerColor asker = PlayerColor::NEUTRAL);
```

移动英雄。

```cpp
void giveHero(ObjectInstanceID id, PlayerColor player, ObjectInstanceID boatId = ObjectInstanceID());
```

给予玩家英雄。

```cpp
void heroExchange(ObjectInstanceID hero1, ObjectInstanceID hero2);
```

英雄交换。

```cpp
void levelUpHero(const CGHeroInstance * hero, SecondarySkill skill);
void levelUpHero(const CGHeroInstance * hero);
```

英雄升级。

### 军队操作

```cpp
bool changeStackCount(const StackLocation &sl, TQuantity count, ChangeValueMode mode);
bool insertNewStack(const StackLocation &sl, const CCreature *c, TQuantity count);
bool eraseStack(const StackLocation &sl, bool forceRemoval = false);
bool swapStacks(const StackLocation &sl1, const StackLocation &sl2);
```

军队堆栈操作。

```cpp
void tryJoiningArmy(const CArmedInstance *src, const CArmedInstance *dst, bool removeObjWhenFinished, bool allowMerging);
bool moveStack(const StackLocation &src, const StackLocation &dst, TQuantity count = -1);
```

军队合并和移动。

### 神器操作

```cpp
bool giveHeroNewArtifact(const CGHeroInstance * h, const CArtifact * artType, const SpellID & spellId, const ArtifactPosition & pos);
bool giveHeroNewArtifact(const CGHeroInstance * h, const ArtifactID & artId, const ArtifactPosition & pos);
bool putArtifact(const ArtifactLocation & al, const ArtifactInstanceID & id, std::optional<bool> askAssemble);
void removeArtifact(const ArtifactLocation &al);
bool moveArtifact(const PlayerColor & player, const ArtifactLocation & src, const ArtifactLocation & dst);
```

神器管理操作。

### 城镇操作

```cpp
bool buildStructure(ObjectInstanceID tid, BuildingID bid, bool force=false);
bool razeStructure(ObjectInstanceID tid, BuildingID bid);
bool visitTownBuilding(ObjectInstanceID tid, BuildingID bid);
```

城镇建筑操作。

### 战斗管理

```cpp
void startBattle(const CArmedInstance *army1, const CArmedInstance *army2, int3 tile, const CGHeroInstance *hero1, const CGHeroInstance *hero2, const BattleLayout & layout, const CGTownInstance *town);
void startBattle(const CArmedInstance *army1, const CArmedInstance *army2);
```

开始战斗。

### 资源和交易

```cpp
void giveResource(PlayerColor player, GameResID which, int val);
void giveResources(PlayerColor player, const ResourceSet & resources);
bool tradeResources(const IMarket *market, ui32 amountToSell, PlayerColor player, GameResID toSell, GameResID toBuy);
```

资源管理。

### 法术和魔法

```cpp
void castSpell(const spells::Caster * caster, SpellID spellID, const int3 &pos);
void changeSpells(const CGHeroInstance * hero, bool give, const std::set<SpellID> &spells);
```

法术施放和学习。

### 查询和对话

```cpp
void showBlockingDialog(const IObjectInterface * caller, BlockingDialog *iw);
void showTeleportDialog(TeleportDialog *iw);
void showGarrisonDialog(ObjectInstanceID upobj, ObjectInstanceID hid, bool removableUnits);
void showObjectWindow(const CGObjectInstance * object, EOpenWindowMode window, const CGHeroInstance * visitor, bool addQuery);
```

显示各种对话框。

### 游戏状态查询

```cpp
bool isBlockedByQueries(const CPackForServer *pack, PlayerColor player);
bool isAllowedExchange(ObjectInstanceID id1, ObjectInstanceID id2);
const CGHeroInstance * getVisitingHero(const CGObjectInstance *obj);
const CGObjectInstance * getVisitingObject(const CGHeroInstance *hero);
```

游戏状态检查。

### 网络和序列化

```cpp
void handleClientDisconnection(GameConnectionID connectionI);
void handleReceivedPack(GameConnectionID connectionId, CPackForServer & pack);
bool hasPlayerAt(PlayerColor player, GameConnectionID connectionId) const;
```

网络消息处理。

```cpp
void save(const std::string &fname);
void load(const StartInfo &info);
```

游戏保存和加载。

### 回合管理

```cpp
void onPlayerTurnStarted(PlayerColor which);
void onPlayerTurnEnded(PlayerColor which);
void onNewTurn();
```

回合生命周期事件。

### 胜利失败检查

```cpp
void checkVictoryLossConditionsForPlayer(PlayerColor player);
void checkVictoryLossConditionsForAll();
```

检查游戏结束条件。

## 依赖关系

- **IGameEventCallback**: 游戏事件回调接口
- **Environment**: 环境基类
- **CGameState**: 游戏状态类
- **IGameServer**: 游戏服务器接口
- **各种处理器类**: HeroPoolProcessor, BattleProcessor等

## 使用示例

### 初始化游戏处理器

```cpp
#include "CGameHandler.h"

// 创建游戏处理器
CGameHandler gameHandler(server);

// 初始化游戏
StartInfo startInfo;
Load::ProgressAccumulator progress;
gameHandler.init(&startInfo, progress);

// 启动游戏
gameHandler.start(false);
```

### 处理玩家操作

```cpp
#include "CGameHandler.h"

// 移动英雄
bool success = gameHandler.moveHero(heroID, destination, EMovementMode::NORMAL);

// 开始战斗
gameHandler.startBattle(army1, army2, battleTile, hero1, hero2, layout, town);
```

### 管理游戏对象

```cpp
#include "CGameHandler.h"

// 创建新对象
auto newObject = gameHandler.createNewObject(position, MapObjectID::ARTIFACT, subID);

// 给予玩家资源
gameHandler.giveResource(PlayerColor::RED, GameResID::GOLD, 1000);
```

## 性能特性

- **内存使用**: 包含多个子处理器和管理器，内存占用较大
- **线程安全**: 主要在单线程环境中运行，需要外部同步
- **事件处理**: 高效的事件驱动架构，支持大量并发操作

## 实现注意事项

1. **状态一致性**: 所有操作都必须保持游戏状态的一致性
2. **网络同步**: 服务器端操作需要同步到所有客户端
3. **错误处理**: 包含完善的错误检查和异常处理机制
4. **扩展性**: 通过处理器模式支持功能模块化扩展

## 相关文档

- [CGameState](CGameState.md) - 游戏状态管理
- [IGameEventCallback](../callback/IGameEventCallback.md) - 游戏事件回调接口
- [CVCMIServer](CVCMIServer.md) - VCMI服务器类