# SThievesGuildInfo

## 概述

`SThievesGuildInfo` 结构体管理盗贼公会信息，用于存储和显示游戏中所有玩家的统计信息。该结构体包含了城镇数量、英雄数量、资源统计、最强英雄信息等数据，为盗贼公会界面提供数据支持。

## 主要属性

- `playerColors`: 游戏中玩家的颜色列表
- `numOfTowns`: 城镇数量统计，按排名和玩家颜色索引
- `numOfHeroes`: 英雄数量统计，按排名和玩家颜色索引
- `gold`: 金币统计，按排名和玩家颜色索引
- `woodOre`: 木材和矿石统计，按排名和玩家颜色索引
- `mercSulfCrystGems`: 水银、硫磺、水晶和宝石统计，按排名和玩家颜色索引
- `obelisks`: 方尖碑统计，按排名和玩家颜色索引
- `artifacts`: 神器统计，按排名和玩家颜色索引
- `army`: 军队实力统计，按排名和玩家颜色索引
- `income`: 收入统计，按排名和玩家颜色索引
- `colorToBestHero`: 玩家颜色到最强英雄信息的映射
- `personality`: 玩家颜色到AI战术的映射
- `bestCreature`: 玩家颜色到最强生物ID的映射

## 数据结构说明

所有统计向量都使用相同的结构：`std::vector<std::vector<PlayerColor>>`

- 第一层向量：排名位置（0为第一名，1为第二名，以此类推）
- 第二层向量：该排名的玩家颜色列表

例如：
- `numOfTowns[0]` 包含拥有最多城镇的玩家颜色列表
- `numOfTowns[1]` 包含拥有第二多城镇的玩家颜色列表

## 依赖关系

- **GameConstants.h**: 游戏常量定义
- **InfoAboutArmy.h**: 军队信息定义
- **InfoAboutHero**: 英雄信息结构体
- **EAiTactic**: AI战术枚举
- **CreatureID**: 生物ID类型

## 使用示例

### 创建盗贼公会信息

```cpp
#include "SThievesGuildInfo.h"

// 创建盗贼公会信息结构体
SThievesGuildInfo guildInfo;

// 设置玩家颜色列表
guildInfo.playerColors = {PlayerColor::RED, PlayerColor::BLUE, PlayerColor::GREEN};
```

### 更新统计数据

```cpp
#include "SThievesGuildInfo.h"

// 更新城镇数量统计
std::vector<PlayerColor> topTowns = {PlayerColor::RED, PlayerColor::BLUE};
guildInfo.numOfTowns.push_back(topTowns);

// 更新英雄统计
std::vector<PlayerColor> topHeroes = {PlayerColor::GREEN};
guildInfo.numOfHeroes.push_back(topHeroes);
```

### 设置最强英雄信息

```cpp
#include "SThievesGuildInfo.h"

// 设置玩家的最强英雄
InfoAboutHero bestHero(heroInstance, InfoAboutHero::EInfoLevel::DETAILED);
guildInfo.colorToBestHero[PlayerColor::RED] = bestHero;
```

### 查询统计信息

```cpp
#include "SThievesGuildInfo.h"

// 获取第一名的城镇拥有者
if (!guildInfo.numOfTowns.empty()) {
    const auto& topTownOwners = guildInfo.numOfTowns[0];
    // 处理第一名的城镇拥有者列表
}

// 获取玩家的AI战术
auto it = guildInfo.personality.find(PlayerColor::BLUE);
if (it != guildInfo.personality.end()) {
    EAiTactic tactic = it->second;
}
```

## 性能特性

- **内存使用**: 存储多个向量和映射，内存使用与玩家数量成正比
- **访问效率**: 直接通过索引访问排名数据
- **更新频率**: 通常在回合结束时更新一次

## 实现注意事项

1. **排名逻辑**: 统计数据按降序排列，第一名在索引0处
2. **并列处理**: 相同排名的玩家会放在同一个向量中
3. **数据一致性**: 所有统计向量的大小应该保持一致
4. **可选序列化**: 序列化代码被注释，可能为了性能考虑

## 相关文档

- [InfoAboutArmy](InfoAboutArmy.md) - 军队信息结构体
- [InfoAboutHero](InfoAboutArmy.md#infoabouthero-结构体) - 英雄信息结构体
- [CGameState](CGameState.md) - 游戏状态类（可能包含盗贼公会信息）