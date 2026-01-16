# HighScore

## 概述

`HighScore` 模块提供了游戏高分计算和管理功能。该模块包含了用于计算玩家游戏得分、准备高分参数以及管理战役和单场景游戏的高分系统的类和结构体。

## 主要组件

### HighScoreParameter 结构体

高分参数结构体，包含计算高分所需的所有游戏参数。

#### 主要属性

- `difficulty`: 游戏难度等级
- `day`: 游戏天数
- `townAmount`: 城镇数量
- `usedCheat`: 是否使用作弊
- `hasGrail`: 是否拥有圣杯
- `allEnemiesDefeated`: 是否击败所有敌人
- `campaignName`: 战役名称
- `scenarioName`: 场景名称
- `playerName`: 玩家名称

### HighScore 类

高分静态工具类，提供高分参数准备功能。

#### 核心方法

```cpp
static HighScoreParameter prepareHighScores(const CGameState * gs, PlayerColor player, bool victory);
```

从游戏状态准备指定玩家的得分参数。

### HighScoreCalculation 类

高分计算类，负责实际的得分计算逻辑。

#### Result 内部结构体

计算结果结构体。

##### 属性

- `basic`: 基础得分
- `total`: 总得分
- `sumDays`: 天数总和
- `cheater`: 是否为作弊者

#### 主要属性

- `parameters`: 高分参数向量
- `isCampaign`: 是否为战役模式

#### 核心方法

```cpp
Result calculate();
```

计算高分结果。

```cpp
static CreatureID getCreatureForPoints(int points, bool campaign);
```

根据得分获取对应的生物ID（用于得分显示）。

## 依赖关系

- **GameConstants.h**: 游戏常量定义
- **CGameState**: 游戏状态类
- **PlayerColor**: 玩家颜色类型

## 使用示例

### 准备高分参数

```cpp
#include "HighScore.h"

// 从游戏状态准备玩家的高分参数
HighScoreParameter params = HighScore::prepareHighScores(gameState, PlayerColor::RED, true);
```

### 计算高分

```cpp
#include "HighScoreCalculation.h"

// 创建高分计算对象
HighScoreCalculation calc;
calc.parameters = {param1, param2, param3};
calc.isCampaign = false;

// 计算得分
auto result = calc.calculate();
int totalScore = result.total;
```

### 获取得分对应的生物

```cpp
#include "HighScoreCalculation.h"

// 根据得分获取生物ID
CreatureID creature = HighScoreCalculation::getCreatureForPoints(1500, false);
```

## 性能特性

- **内存使用**: 结构体相对轻量，主要存储基本类型和字符串
- **计算复杂度**: 得分计算涉及多个参数的加权计算
- **序列化**: 支持完整的序列化，便于保存高分记录

## 实现注意事项

1. **得分计算**: 综合考虑难度、天数、城镇数量、特殊成就等因素
2. **作弊检测**: 通过usedCheat标志影响得分计算
3. **战役模式**: 战役和单场景游戏的得分计算可能有不同逻辑
4. **序列化**: 参数需要序列化以便保存和加载高分记录

## 相关文档

- [CGameState](CGameState.md) - 游戏状态管理类
- [GameStatistics](GameStatistics.md) - 游戏统计数据管理