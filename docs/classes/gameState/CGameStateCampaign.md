# CGameStateCampaign

## 概述

`CGameStateCampaign` 类管理战役模式的游戏状态扩展功能。该类处理战役特有的逻辑，包括英雄替换、奖励系统、场景间数据转移等，为战役模式提供专门的支持。

## 主要属性

- `gameState`: 指向主游戏状态的指针
- `campaignHeroReplacements`: 战役英雄替换列表（临时辅助数据，不序列化）

## CampaignHeroReplacement 结构体

战役英雄替换结构体，用于管理战役中英雄的替换逻辑。

#### 主要属性

- `hero`: 要替换的英雄实例
- `heroPlaceholderId`: 英雄占位符ID
- `transferrableArtifacts`: 可转移的神器位置列表

## 核心方法

```cpp
CGameStateCampaign(CGameState * owner);
```

构造函数，指定游戏状态所有者。

```cpp
void setGamestate(CGameState * owner);
```

设置游戏状态所有者。

```cpp
void placeCampaignHeroes(vstd::RNG & randomGenerator);
```

放置战役英雄到地图上。

```cpp
void initStartingResources();
```

初始化战役的起始资源。

```cpp
void initHeroes();
```

初始化战役英雄。

```cpp
void initTowns();
```

初始化战役城镇。

```cpp
bool playerHasStartingHero(PlayerColor player) const;
```

检查指定玩家是否有起始英雄。

```cpp
std::unique_ptr<CMap> getCurrentMap();
```

获取当前战役地图。

```cpp
std::optional<CampaignBonus> currentBonus() const;
```

获取当前战役奖励。

```cpp
void trimCrossoverHeroesParameters(vstd::RNG & randomGenerator, const CampaignTravel & travelOptions);
```

根据旅行选项修整跨场景英雄参数。

```cpp
void replaceHeroesPlaceholders();
```

替换英雄占位符。

```cpp
void transferMissingArtifacts(const CampaignTravel & travelOptions);
```

转移缺失的神器。

```cpp
void giveCampaignBonusToHero(CGHeroInstance * hero);
```

给予英雄战役奖励。

## 私有方法

```cpp
std::optional<CampaignScenarioID> getHeroesSourceScenario() const;
```

获取英雄来源场景ID。

```cpp
void generateCampaignHeroesToReplace();
```

生成要替换的战役英雄列表。

## 依赖关系

- **GameConstants.h**: 游戏常量定义
- **CampaignConstants.h**: 战役常量定义
- **Serializeable**: 序列化基类
- **CampaignBonus**: 战役奖励类
- **CampaignTravel**: 战役旅行结构体
- **CGHeroInstance**: 英雄实例类
- **CGameState**: 游戏状态类
- **CMap**: 地图类
- **vstd::RNG**: 随机数生成器

## 使用示例

### 初始化战役游戏状态

```cpp
#include "CGameStateCampaign.h"

// 创建战役游戏状态
CGameStateCampaign campaignState(gameState);

// 设置游戏状态
campaignState.setGamestate(gameState);
```

### 初始化战役元素

```cpp
#include "CGameStateCampaign.h"

// 初始化战役英雄
campaignState.initHeroes();

// 初始化城镇
campaignState.initTowns();

// 初始化起始资源
campaignState.initStartingResources();
```

### 放置战役英雄

```cpp
#include "CGameStateCampaign.h"

// 创建随机数生成器
vstd::RNG rng;

// 放置战役英雄
campaignState.placeCampaignHeroes(rng);
```

### 检查玩家起始英雄

```cpp
#include "CGameStateCampaign.h"

// 检查红色玩家是否有起始英雄
bool hasHero = campaignState.playerHasStartingHero(PlayerColor::RED);
```

### 获取当前战役奖励

```cpp
#include "CGameStateCampaign.h"

// 获取当前奖励
auto bonus = campaignState.currentBonus();
if (bonus) {
    // 处理战役奖励
}
```

## 性能特性

- **内存使用**: 主要存储英雄替换列表和游戏状态指针
- **初始化开销**: 战役初始化涉及多个步骤，包括英雄和城镇的创建
- **序列化**: 支持条件序列化以保持向后兼容性

## 实现注意事项

1. **战役流程**: 类管理完整的战役初始化流程，从英雄放置到资源分配
2. **跨场景转移**: 处理场景间的英雄参数和神器转移逻辑
3. **奖励系统**: 管理战役特有的奖励机制
4. **占位符替换**: 处理战役地图中的英雄占位符替换逻辑

## 相关文档

- [CGameState](CGameState.md) - 主游戏状态类
- [CGHeroInstance](../mapObjects/CGHeroInstance.md) - 英雄实例类
- [CampaignBonus](../../campaign/CampaignBonus.md) - 战役奖励类