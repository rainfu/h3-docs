# CGameState

游戏状态管理类，是 VCMI 游戏引擎的核心，负责维护整个游戏世界的全局状态。

## 📋 类概述

`CGameState` 是 VCMI 游戏引擎的中央枢纽，作为游戏状态的唯一真相来源。它继承自 `CNonConstInfoCallback` 和 `Serializeable` 接口，全面管理着地图、玩家、队伍、英雄、城镇、战役、战斗等所有游戏元素。

该类不仅是数据的容器，更是游戏逻辑处理、状态查询、序列化以及各种系统（如AI、UI）交互的中心节点。它确保了游戏世界在任何时刻都处于一致且可预测的状态。

## 🔧 主要成员变量 (Attributes)

### 游戏设置与元数据
- `initialOpts`: 指向初始游戏设置的智能指针（未随机化）。
- `scenarioOps`: 指向场景特定游戏设置的智能指针。
- `day`: 当前游戏总天数 (`ui32`)。
- `services`: 指向核心服务提供者的指针 (`Services*`)。

### 游戏实体与状态
- `map`: 独占指针，指向当前游戏地图 (`std::unique_ptr<CMap>`)。
- `players`: 映射关系，存储每个玩家颜色对应的玩家状态 (`std::map<PlayerColor, PlayerState>`)。
- `teams`: 映射关系，存储每个队伍ID对应的队伍状态 (`std::map<TeamID, TeamState>`)。
- `currentBattles`: 向量，包含所有正在进行的战斗实例 (`std::vector<std::unique_ptr<BattleInfo>>`)。
- `nextBattleID`: 下一个将被分配给新战斗的ID (`BattleID`)。
- `heroesPool`: 独占指针，指向酒馆中的英雄池 (`std::unique_ptr<TavernHeroesPool>`)。
- `actingPlayers`: 集合，包含当前正在行动的玩家颜色 (`std::set<PlayerColor>`)。
- `globalEffects`: 全局奖励系统节点，用于计算跨对象的增益效果 (`CBonusSystemNode`)。
- `currentRumor`: 当前游戏中传播的谣言状态 (`RumorState`)。
- `campaign`: 独占指针，指向战役模式下的状态管理器，非战役时为 `nullptr` (`std::unique_ptr<CGameStateCampaign>`)。

### 兼容性与性能
- `saveCompatibilityLastAllocatedArtifactID`: 用于存档兼容性的最后分配的神器实例ID。
- `saveCompatibilityUnregisteredArtifacts`: 用于存档兼容性的未注册神器实例列表。
- `mutex`: 静态共享互斥锁，主要用于保护冒险地图AI对游戏状态的访问。

## 🎯 核心方法 (Methods)

### 初始化与生命周期
```cpp
// 构造函数与析构函数
CGameState();
virtual ~CGameState();

// 预初始化，设置核心服务依赖
void preInit(Services * services);

// 完整初始化一个新游戏，加载地图并设置初始状态
void init(const IMapService * mapService, StartInfo * si, IGameRandomizer & gameRandomizer, Load::ProgressAccumulator &, bool allowSavingRandomMap = true);

// 从存档加载后，更新游戏状态以匹配存档数据
void updateOnLoad(const StartInfo & si);
```

### 游戏状态查询
```cpp
// 获取两个玩家之间的关系（敌人、盟友、同一玩家）
PlayerRelations getPlayerRelations(PlayerColor color1, PlayerColor color2) const;

// 获取基于当前游戏天数的不同时间单位
int getDate(Date mode=Date::DAY) const; // mode: DAY, WEEK, MONTH, DAY_OF_WEEK

// 检查某个位置或对象是否对指定玩家可见
bool isVisibleFor(int3 pos, const PlayerColor player) const;
bool isVisibleFor(const CGObjectInstance * obj, const PlayerColor player) const;
```

### 战斗管理
```cpp
// 通过玩家颜色获取其参与的战斗，若无则返回 nullptr
const BattleInfo * getBattle(const PlayerColor & player) const;

// 通过战斗ID获取战斗实例
const BattleInfo * getBattle(const BattleID & battle) const;
BattleInfo * getBattle(const BattleID & battle); // 返回非 const 指针

// 获取指定地图瓦片上的战场地形类型
BattleField battleGetBattlefieldType(int3 tile, vstd::RNG & randomGenerator) const;
```

### 胜利/失败条件检查
```cpp
// 综合检查指定玩家的胜利和失败状态
EVictoryLossCheckResult checkForVictoryAndLoss(const PlayerColor & player) const;

// 检查指定玩家是否满足胜利条件
bool checkForVictory(const PlayerColor & player, const EventCondition & condition) const;

// 检查标准胜利条件（例如，找到圣杯）
PlayerColor checkForStandardWin() const;

// 检查指定玩家是否因失败条件而输掉游戏
bool checkForStandardLoss(const PlayerColor & player) const;
```

### 实体与物品管理
```cpp
// 创建一个指定法术的卷轴神器
CArtifactInstance * createScroll(const SpellID & spellId);

// 创建一个指定类型的神器实例，自动处理组合神器和卷轴的内部逻辑
CArtifactInstance * createArtifact(const ArtifactID & artId, const SpellID & spellId = SpellID::NONE);

// 将一件神器给予指定英雄
bool giveHeroArtifact(CGHeroInstance * h, const ArtifactID & aid);

// 为指定玩家选择下一个可用的英雄类型（遵循H3规则：先选起始英雄，再随机选未用英雄）
HeroTypeID pickNextHeroType(vstd::RNG & randomGenerator, const PlayerColor & owner);
```

### 系统与工具
```cpp
// 应用来自客户端的数据包（如网络同步或回放）
void apply(CPackForClient & pack);

// 计算并缓存路径信息，供寻路系统使用
void calculatePaths(const std::shared_ptr<PathfinderConfig> & config) const;

// 更新指定类型的实体（通过元类型和索引）
void updateEntity(Metatype metatype, int32_t index, const JsonNode & data) override;

// 获取游戏设置
const IGameSettings & getSettings() const override;

// 填充盗贼公会情报，包含其他玩家的统计数据
void obtainPlayersStats(SThievesGuildInfo & tgi, int level) const;
```

### 序列化
```cpp
// 保存当前游戏状态到文件
void saveGame(CSaveFile & file) const;

// 从文件加载游戏状态
void loadGame(CLoadFile & file);

// 序列化模板方法，由保存/加载系统调用
template <typename Handler> void serialize(Handler &h);
```

## 🔗 关键依赖

- **`CMap`**: 提供地图数据和地形信息。
- **`StartInfo`**: 包含游戏开始时的所有配置。
- **`PlayerState` / `TeamState`**: 存储玩家和队伍的具体数据。
- **`BattleInfo`**: 代表一场具体的战斗。
- **`CArtifactInstance`**: 代表游戏中的一个神器物品。
- **`CGHeroInstance`**: 代表游戏中的一个英雄角色。
- **`TavernHeroesPool`**: 管理酒馆中可招募的英雄列表。

## 📝 使用示例

### 初始化与获取状态
```cpp
// 创建并初始化游戏状态
CGameState gameState;
gameState.preInit(services);
gameState.init(mapService, startInfo, randomizer, progress);

// 获取核心组件
auto& map = gameState.getMap();
auto currentDay = gameState.getDate(Date::DAY);

// 查询玩家关系
if (gameState.getPlayerRelations(player1, player2) == PlayerRelations::ALLIES) {
    // 处理盟友逻辑
}
```

### 处理游戏事件
```cpp
// 检查玩家是否获胜
auto result = gameState.checkForVictoryAndLoss(currentPlayer);
if (result == EVictoryLossCheckResult::VICTORY) {
    // 触发胜利事件
}

// 为英雄装备神器
auto scroll = gameState.createScroll(SpellID::FIREBALL);
gameState.giveHeroArtifact(hero, scroll->getId());
```
# CGameState

游戏状态管理类，维护整个游戏世界的状态。

## 📋 类概述

`CGameState` 是 VCMI 游戏引擎的核心类，作为游戏状态的中央管理器，负责维护整个游戏世界的完整状态。该类继承自：

- `CNonConstInfoCallback`: 非常量信息回调接口
- `Serializeable`: 序列化接口

此类管理着地图、玩家、队伍、部队、英雄、战役、战斗等所有游戏元素，是游戏逻辑处理、状态查询和序列化的中心枢纽。它不仅存储了游戏的静态数据，还负责动态的游戏进程管理，如回合控制、胜利/失败条件检查和路径计算。

## 🔧 主要属性

### 游戏设置
- `initialOpts`: 初始游戏设置（未随机化）
- `scenarioOps`: 场景游戏设置
- `day`: 游戏总天数

### 游戏实体
- `map`: 游戏地图
- `players`: 玩家状态映射（玩家颜色 -> 玩家状态）
- `teams`: 队伍状态映射（队伍ID -> 队伍状态）
- `currentBattles`: 当前进行的战斗列表
- `heroesPool`: 酒馆英雄池

### 游戏状态
- `actingPlayers`: 当前行动的玩家集合
- `globalEffects`: 全局效果奖励节点
- `currentRumor`: 当前谣言状态
- `campaign`: 战役状态管理器

### 兼容性支持
- `saveCompatibilityLastAllocatedArtifactID`: 保存兼容性最后分配的神器ID
- `saveCompatibilityUnregisteredArtifacts`: 保存兼容性未注册神器

## 🎯 核心方法

### 初始化方法
```cpp
// 预初始化服务
void preInit(Services * services);

// 完整初始化新游戏（加载地图、设置玩家、初始化英雄等）
void init(const IMapService * mapService, StartInfo * si, IGameRandomizer & gameRandomizer, Load::ProgressAccumulator &, bool allowSavingRandomMap = true);

// 从存档加载后更新游戏状态
void updateOnLoad(const StartInfo & si);
```

### 游戏状态查询
```cpp
// 获取玩家关系
PlayerRelations getPlayerRelations(PlayerColor color1, PlayerColor color2) const;

// 获取当前日期
int getDate(Date mode = Date::DAY) const;

// 检查位置可见性
bool isVisibleFor(int3 pos, const PlayerColor player) const;
bool isVisibleFor(const CGObjectInstance * obj, const PlayerColor player) const;
```

### 战斗管理
```cpp
// 获取玩家参与的战斗
const BattleInfo * getBattle(const PlayerColor & player) const;

// 通过ID获取战斗
const BattleInfo * getBattle(const BattleID & battle) const;
BattleInfo * getBattle(const BattleID & battle);
```

### 胜利/失败检查
```cpp
// 检查胜利和失败条件
EVictoryLossCheckResult checkForVictoryAndLoss(const PlayerColor & player) const;

// 检查标准胜利
PlayerColor checkForStandardWin() const;

// 检查标准失败
bool checkForStandardLoss(const PlayerColor & player) const;
```

### 实体创建
```cpp
// 创建神器实例
CArtifactInstance * createArtifact(const ArtifactID & artId, const SpellID & spellId = SpellID::NONE);

// 创建法术卷轴
CArtifactInstance * createScroll(const SpellID & spellId);
```

### 英雄管理
```cpp
// 给予英雄神器
bool giveHeroArtifact(CGHeroInstance * h, const ArtifactID & aid);

// 选择下一个英雄类型
HeroTypeID pickNextHeroType(vstd::RNG & randomGenerator, const PlayerColor & owner);
```

### 游戏操作
```cpp
// 应用客户端数据包
void apply(CPackForClient & pack);

// 计算路径
void calculatePaths(const std::shared_ptr<PathfinderConfig> & config) const;

// 更新实体
void updateEntity(Metatype metatype, int32_t index, const JsonNode & data);
```

### 序列化
```cpp
// 保存游戏
void saveGame(CSaveFile & file) const;

// 加载游戏
void loadGame(CLoadFile & file);
```

## 🔗 依赖关系

### 依赖的类
- `CNonConstInfoCallback`: 提供非常量信息回调
- `CMap`: 管理游戏地图和地形
- `PlayerState`: 存储每个玩家的资源、城镇和英雄
- `TeamState`: 管理队伍联盟和共享视野
- `CBonusSystemNode`: 实现游戏内奖励和增益效果系统
- `BattleInfo`: 表示正在进行的战斗实例
- `TavernHeroesPool`: 管理酒馆中可招募的英雄
- `StartInfo`: 包含游戏开始时的配置和设置
- `CArtifactInstance`: 表示游戏中的神器物品实例
- `CGHeroInstance`: 表示游戏中的英雄实例

### 被依赖关系
- 被 `CGameHandler` 用于游戏逻辑处理
- 被所有游戏系统用于状态查询
- 被AI系统用于决策制定
- 被UI系统用于显示游戏状态

## 📝 使用示例

### 初始化游戏
```cpp
// 创建游戏状态
CGameState gameState;

// 预初始化服务
gameState.preInit(services);

// 初始化新游戏
Load::ProgressAccumulator progress;
gameState.init(mapService, startInfo, randomizer, progress, true);
```

### 查询游戏状态
```cpp
// 获取当前日期
int currentDay = gameState.getDate(Date::DAY);
int currentWeek = gameState.getDate(Date::WEEK);

// 检查玩家关系
auto relations = gameState.getPlayerRelations(player1, player2);
if (relations == PlayerRelations::ALLIES) {
    // 盟友关系
}

// 获取地图信息
const auto & map = gameState.getMap();
auto tile = map.getTile(int3(10, 10, 0));
```

### 管理战斗
```cpp
// 获取玩家当前战斗
const BattleInfo * battle = gameState.getBattle(currentPlayer);
if (battle) {
    // 玩家正在战斗中
    auto battleID = battle->getBattleID();
    // 处理战斗逻辑
}

// 通过ID获取战斗
BattleInfo * specificBattle = gameState.getBattle(BattleID(5));
if (specificBattle) {
    // 找到指定战斗
}
```

### 创建游戏实体
```cpp
// 创建神器
auto artifact = gameState.createArtifact(ArtifactID::SPELLBOOK);
if (artifact) {
    // 神器创建成功
}

// 创建法术卷轴
auto scroll = gameState.createScroll(SpellID::FIREBALL);
```

### 胜利条件检查
```cpp
// 检查玩家胜利/失败状态
auto result = gameState.checkForVictoryAndLoss(player);
switch (result) {
    case EVictoryLossCheckResult::VICTORY:
        // 玩家胜利
        break;
    case EVictoryLossCheckResult::LOSS:
        // 玩家失败
        break;
    default:
        // 游戏继续
        break;
}
```

## ⚡ 性能特性

- **延迟初始化**: 复杂的初始化过程分阶段进行
- **智能缓存**: 路径计算和可见性检查结果被缓存
- **多线程安全**: 使用读写锁保护共享状态
- **序列化优化**: 支持增量保存和加载

## 🔍 注意事项

1. **线程安全**: 游戏状态访问需要外部同步
2. **初始化顺序**: 必须按正确顺序调用初始化方法
3. **内存管理**: 管理大量游戏实体的生命周期
4. **兼容性**: 处理存档兼容性问题
5. **状态一致性**: 修改状态时需要保持数据一致性

## 📊 相关枚举和结构

### EVictoryLossCheckResult 枚举
```cpp
enum class EVictoryLossCheckResult {
    ONGOING,     // 游戏进行中
    VICTORY,     // 胜利
    LOSS         // 失败
};
```

### Date 枚举
```cpp
enum class Date {
    DAY,         // 天数
    DAY_OF_WEEK, // 星期几
    WEEK,        // 周数
    MONTH        // 月数
};
```

### PlayerRelations 枚举
```cpp
enum class PlayerRelations {
    ENEMIES,     // 敌人
    ALLIES,      // 盟友
    SAME_PLAYER  // 同一玩家
};
```

## 🔧 私有方法

### 初始化相关
- `initNewGame()`: 执行新游戏的主要初始化流程
- `initGlobalBonuses()`: 设置全局增益效果
- `initHeroes()`: 初始化所有英雄数据
- `initTowns()`: 初始化所有城镇数据
- `initMapObjects()`: 初始化地图上的所有对象

### 奖励系统
- `buildBonusSystemTree()`: 构建用于计算属性加成的奖励系统树
- `restoreBonusSystemTree()`: 从存档恢复奖励系统树

### 辅助方法
- `getUsedHero()`: 查询已被占用的英雄
- `pickUnusedHeroTypeRandomly()`: 从未被使用过的英雄类型中随机挑选