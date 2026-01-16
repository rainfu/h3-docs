# GameStatistics

## 概述

`GameStatistics` 模块提供了 VCMI 中游戏统计数据的完整管理功能。该模块包含了用于收集、存储和分析游戏过程中各种统计信息的类和结构体，主要用于游戏结束时的统计报告和玩家表现分析。

## 主要组件

### StatisticDataSetEntry 结构体

游戏统计数据条目结构体，包含单个玩家的完整统计信息。

#### 主要属性

- `map`: 地图名称
- `timestamp`: 统计时间戳
- `day`: 游戏天数
- `player`: 玩家颜色
- `playerName`: 玩家名称
- `team`: 队伍ID
- `isHuman`: 是否为人类玩家
- `status`: 玩家状态 (EPlayerStatus)
- `resources`: 玩家资源
- `numberHeroes`: 英雄数量
- `numberTowns`: 城镇数量
- `numberArtifacts`: 神器数量
- `numberDwellings`: 生物栖息地数量
- `armyStrength`: 军队实力
- `totalExperience`: 总经验值
- `income`: 收入
- `mapExploredRatio`: 地图探索比例
- `obeliskVisitedRatio`: 方尖碑访问比例
- `townBuiltRatio`: 城镇建设比例
- `hasGrail`: 是否拥有圣杯
- `numMines`: 矿山数量统计
- `score`: 总分
- `maxHeroLevel`: 最高英雄等级
- `numBattlesNeutral`: 对抗中立生物战斗次数
- `numBattlesPlayer`: 对抗玩家战斗次数
- `numWinBattlesNeutral`: 战胜中立生物战斗次数
- `numWinBattlesPlayer`: 战胜玩家战斗次数
- `numHeroSurrendered`: 英雄投降次数
- `numHeroEscaped`: 英雄逃跑次数
- `spentResourcesForArmy`: 为军队花费的资源
- `spentResourcesForBuildings`: 为建筑花费的资源
- `tradeVolume`: 贸易量
- `eventCapturedTown`: 是否发生占领城镇事件
- `eventDefeatedStrongestHero`: 是否发生击败最强英雄事件
- `movementPointsUsed`: 已使用的移动点数

#### 核心方法

```cpp
void serializeJson(JsonSerializeFormat & handler);
```

JSON序列化方法，用于保存和加载统计数据。

### StatisticDataSet 类

游戏统计数据集类，用于管理多个玩家的统计数据。

#### 主要属性

- `data`: 统计数据条目向量
- `accumulatedValues`: 玩家累计值存储映射

#### 核心方法

```cpp
void add(StatisticDataSetEntry entry);
```

添加新的统计数据条目。

```cpp
static StatisticDataSetEntry createEntry(const PlayerState * ps, const CGameState * gs, const StatisticDataSet & accumulatedData);
```

从玩家状态和游戏状态创建统计数据条目。

```cpp
std::string toCsv(std::string sep) const;
```

将统计数据导出为CSV格式。

```cpp
std::string writeCsv() const;
```

写入CSV文件。

### Statistic 类

统计计算工具类，提供各种统计数据的计算方法。

#### 核心方法

```cpp
static int getNumberOfArts(const PlayerState * ps);
```

获取玩家拥有的神器数量。

```cpp
static int getNumberOfDwellings(const PlayerState * ps);
```

获取玩家拥有的生物栖息地数量。

```cpp
static si64 getArmyStrength(const PlayerState * ps, bool withTownGarrison = false);
```

计算玩家军队实力，可选择是否包含城镇守军。

```cpp
static si64 getTotalExperience(const PlayerState * ps);
```

计算玩家所有英雄的总经验值。

```cpp
static int getIncome(const CGameState * gs, const PlayerState * ps);
```

计算玩家的总收入。

```cpp
static float getMapExploredRatio(const CGameState * gs, PlayerColor player);
```

计算玩家地图探索比例。

```cpp
static const CGHeroInstance * findBestHero(const CGameState * gs, const PlayerColor & color);
```

找到玩家最强的英雄。

```cpp
static std::vector<std::vector<PlayerColor>> getRank(std::vector<std::pair<PlayerColor, si64>> stats);
```

根据统计数据对玩家进行排名。

```cpp
static int getObeliskVisited(const CGameState * gs, const TeamID & t);
```

获取队伍访问的方尖碑数量。

```cpp
static float getObeliskVisitedRatio(const CGameState * gs, const TeamID & t);
```

计算队伍方尖碑访问比例。

```cpp
static std::map<EGameResID, int> getNumMines(const CGameState * gs, const PlayerState * ps);
```

获取玩家拥有的矿山数量统计。

```cpp
static float getTownBuiltRatio(const PlayerState * ps);
```

计算玩家城镇建设比例。

## 依赖关系

- **GameConstants.h**: 游戏常量定义
- **ResourceSet.h**: 资源集合类
- **PlayerState**: 玩家状态类
- **CGameState**: 游戏状态类
- **CGHeroInstance**: 英雄实例类
- **CGMine**: 矿山类

## 使用示例

### 创建统计数据条目

```cpp
#include "GameStatistics.h"

// 从玩家状态创建统计条目
StatisticDataSetEntry entry = StatisticDataSet::createEntry(playerState, gameState, accumulatedData);

// 添加到数据集
StatisticDataSet dataset;
dataset.add(entry);
```

### 计算玩家统计信息

```cpp
#include "GameStatistics.h"

// 计算军队实力
si64 armyStrength = Statistic::getArmyStrength(playerState, true);

// 计算地图探索比例
float exploredRatio = Statistic::getMapExploredRatio(gameState, playerColor);

// 获取收入
int income = Statistic::getIncome(gameState, playerState);
```

### 导出统计数据

```cpp
#include "GameStatistics.h"

// 导出为CSV
std::string csvData = dataset.toCsv(",");

// 写入文件
std::string csvFile = dataset.writeCsv();
```

## 性能特性

- **内存使用**: 统计数据结构相对紧凑，主要存储基本类型和少量字符串
- **计算复杂度**: 大部分统计计算都是O(1)或O(n)复杂度，其中n为玩家拥有的对象数量
- **序列化**: 支持高效的二进制和JSON序列化，便于保存和网络传输

## 实现注意事项

1. **数据一致性**: 统计数据需要在游戏状态变化时及时更新
2. **多线程安全**: 统计计算通常在单线程环境中进行，需要注意并发访问
3. **数据验证**: 统计数据应该在创建和加载时进行有效性验证
4. **扩展性**: StatisticDataSetEntry结构支持未来添加新的统计字段

## 相关文档

- [CGameState](CGameState.md) - 游戏状态管理
- [CPlayerState](CPlayerState.md) - 玩家状态管理
- [IGameInfoCallback](IGameInfoCallback.md) - 游戏信息回调接口