# CGameState

游戏状态管理类，维护整个游戏的全局状态。

## 📋 类概述

`CGameState` 是 VCMI 游戏引擎的核心类，负责管理游戏的全局状态和所有游戏实体的生命周期。该类继承自：

- `CNonConstInfoCallback`: 非常量信息回调接口
- `Serializeable`: 序列化接口

此类是游戏状态的中央管理器，包含地图、玩家、英雄、神器、战斗等所有游戏数据。

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
// 预初始化
void preInit(Services * services);

// 初始化新游戏
void init(const IMapService * mapService, StartInfo * si, IGameRandomizer & gameRandomizer, Load::ProgressAccumulator &, bool allowSavingRandomMap = true);

// 加载游戏后更新
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
- `CNonConstInfoCallback`: 非常量信息回调
- `GameCallbackHolder`: 游戏回调持有者
- `CBonusSystemNode`: 奖励系统节点
- `CMap`: 游戏地图
- `BattleInfo`: 战斗信息
- `TavernHeroesPool`: 酒馆英雄池
- `RumorState`: 谣言状态
- `GameStatistics`: 游戏统计

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
- `initNewGame()`: 初始化新游戏
- `initGlobalBonuses()`: 初始化全局奖励
- `initHeroes()`: 初始化英雄
- `initTowns()`: 初始化城镇
- `initMapObjects()`: 初始化地图对象

### 奖励系统
- `buildBonusSystemTree()`: 构建奖励系统树
- `restoreBonusSystemTree()`: 恢复奖励系统树

### 辅助方法
- `getUsedHero()`: 获取已使用的英雄
- `pickUnusedHeroTypeRandomly()`: 随机选择未使用的英雄类型