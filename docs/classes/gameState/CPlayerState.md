# CPlayerState

玩家状态类，管理游戏中玩家的所有状态信息。

## 📋 类概述

`PlayerState` 是 VCMI 中玩家状态的核心类，管理玩家的资源、英雄、城镇、任务等所有游戏状态信息。该类继承自多个接口，支持奖励系统、序列化等功能。

## 🔧 主要属性

### 基本信息
- `color`: 玩家颜色标识
- `human`: 是否为人类玩家（true为人类，false为AI）
- `team`: 所属队伍ID
- `status`: 玩家状态（播放、失败等）

### 资源管理
- `resources`: 玩家资源集合

### 对象所有权
- `ownedObjects`: 拥有的对象ID列表
- `destroyedObjects`: 被摧毁的对象集合
- `visitedObjects`: 访问过的对象集合

### 游戏进度
- `quests`: 接收到的任务列表
- `visitedObjectsGlobal`: 全局访问对象记录
- `daysWithoutCastle`: 无城堡天数

### 特殊功能
- `battleBonuses`: 对抗中立单位的额外奖励
- `costumesArtifacts`: 服装神器配置
- `playerLocalSettings`: 客户端本地设置

### 作弊和计时
- `cheated`: 是否作弊
- `enteredWinningCheatCode`: 是否输入胜利作弊码
- `enteredLosingCheatCode`: 是否输入失败作弊码
- `turnTimer`: 回合计时器信息

## 🎯 核心方法

### 基本信息查询
```cpp
// 获取玩家ID和队伍
PlayerColor getId() const override;
TeamID getTeam() const override;
bool isHuman() const override;

// 获取本地化名称
std::string getNameTranslated() const override;
std::string getNameTextID() const override;
```

### 资源管理
```cpp
// 获取资源数量
int getResourceAmount(int type) const override;
```

### 对象管理
```cpp
// 获取拥有的对象
std::vector<const CGObjectInstance* > getOwnedObjects() const;

// 添加/移除拥有的对象
void addOwnedObject(CGObjectInstance * object);
void removeOwnedObject(CGObjectInstance * object);
```

### 英雄和城镇查询
```cpp
// 获取英雄列表
std::vector<const CGHeroInstance* > getHeroes() const;
std::vector<CGHeroInstance* > getHeroes();

// 获取城镇列表
std::vector<const CGTownInstance* > getTowns() const;
std::vector<CGTownInstance* > getTowns();
```

### 状态检查
```cpp
// 检查是否被征服（无英雄无城镇）
bool checkVanquished() const;
```

### 奖励系统
```cpp
// 获取奖励承载者
const IBonusBearer * getBonusBearer() const override;
```

## 🔗 依赖关系

### 依赖的类
- `CBonusSystemNode`: 奖励系统节点
- `Player`: 玩家接口
- `GameCallbackHolder`: 游戏回调持有者
- `TResources`: 资源集合
- `QuestInfo`: 任务信息
- `TurnTimerInfo`: 回合计时器

### 被依赖关系
- 被 `CGameState` 用于管理所有玩家状态
- 被游戏逻辑用于状态查询和更新
- 被UI系统用于显示玩家信息
- 被AI系统用于决策制定

## 📝 使用示例

### 查询玩家状态
```cpp
// 获取玩家基本信息
PlayerColor playerId = playerState->getId();
TeamID teamId = playerState->getTeam();
bool isHumanPlayer = playerState->isHuman();

// 检查玩家状态
if (playerState->status == EPlayerStatus::PLAYING) {
    // 玩家正在游戏中
}

// 获取资源
int goldAmount = playerState->getResourceAmount(GameResID::GOLD);
int woodAmount = playerState->getResourceAmount(GameResID::WOOD);
```

### 管理英雄和城镇
```cpp
// 获取玩家英雄
auto heroes = playerState->getHeroes();
for (const auto * hero : heroes) {
    // 处理每个英雄
    auto heroName = hero->getNameTranslated();
    auto heroLevel = hero->getLevel();
}

// 获取玩家城镇
auto towns = playerState->getTowns();
for (const auto * town : towns) {
    // 处理每个城镇
    auto townName = town->getNameTranslated();
    auto townFaction = town->getFactionID();
}
```

### 对象所有权管理
```cpp
// 添加新拥有的对象
CGObjectInstance * newObject = createNewObject();
playerState->addOwnedObject(newObject);

// 获取所有拥有的对象
auto ownedObjects = playerState->getOwnedObjects();
for (const auto * obj : ownedObjects) {
    // 处理拥有的对象
}

// 移除对象所有权
playerState->removeOwnedObject(oldObject);
```

### 任务和访问记录
```cpp
// 检查任务进度
for (const auto & quest : playerState->quests) {
    // 处理每个任务
    if (quest.completed) {
        // 任务已完成
    }
}

// 检查对象访问状态
ObjectInstanceID targetObjectId = someObject->id;
if (playerState->visitedObjects.count(targetObjectId)) {
    // 玩家访问过此对象
}
```

### 战斗奖励
```cpp
// 添加对抗中立单位的奖励
Bonus neutralBonus(BonusDuration::ONE_BATTLE,
                   BonusType::PRIMARY_SKILL,
                   BonusSource::OTHER,
                   1, BonusSourceID(),
                   BonusSubtypeID(PrimarySkill::ATTACK));
playerState->battleBonuses.push_back(neutralBonus);
```

### 状态检查
```cpp
// 检查玩家是否被征服
if (playerState->checkVanquished()) {
    // 玩家已被征服（无英雄无城镇）
    playerState->status = EPlayerStatus::LOSER;
}

// 检查作弊状态
if (playerState->cheated || playerState->enteredWinningCheatCode) {
    // 玩家作弊或使用胜利码
}
```

## ⚡ 性能特性

- **集合优化**: 使用 `std::set` 优化访问检查
- **延迟加载**: 对象列表按需构建
- **缓存友好**: 连续内存布局的资源数组

## 🔍 注意事项

1. **对象生命周期**: 拥有的对象可能被删除，需要检查有效性
2. **状态一致性**: 状态变更需要保持内部一致性
3. **序列化兼容**: 支持版本兼容的序列化
4. **奖励集成**: 深度集成奖励系统

## 📊 相关结构

### VisitedObjectGlobal 结构体
```cpp
struct VisitedObjectGlobal {
    MapObjectID id;        // 对象ID
    MapObjectSubID subID;  // 子对象ID
};
```

### EPlayerStatus 枚举
```cpp
enum class EPlayerStatus {
    PLAYING,    // 游戏中
    LOSER,      // 失败
    WINNER,     // 胜利
    // 其他状态...
};
```

### TeamState 结构体
```cpp
struct TeamState : public CBonusSystemNode {
    TeamID id;                                    // 队伍ID
    std::set<PlayerColor> players;                // 队伍成员
    boost::multi_array<ui8, 3> fogOfWarMap;       // 战争迷雾地图 [z][x][y]
    std::set<ObjectInstanceID> scoutedObjects;    // 侦察到的对象
};
```

## 🔧 扩展点

- **自定义奖励**: 通过奖励系统添加特殊效果
- **状态监听**: 实现状态变更监听器
- **对象过滤**: 添加对象类型过滤方法