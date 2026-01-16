# TurnTimerHandler

## 概述

`TurnTimerHandler` 类负责管理游戏中的回合计时器，包括玩家回合时间限制、战斗回合时间限制以及相关的计时器控制逻辑。该类确保游戏按照预设的时间限制进行，防止玩家无限期等待。

## 主要属性

- `gameHandler`: 游戏处理器引用
- `timers`: 玩家颜色到计时器信息的映射
- `lastUpdate`: 玩家颜色到最后更新时间的映射
- `endTurnAllowed`: 玩家颜色到是否允许结束回合的映射

## 常量定义

```cpp
static constexpr int turnTimePropagateFrequency = 1000;  // 计时器传播频率（毫秒）
```

## 核心方法

### 初始化

```cpp
TurnTimerHandler(CGameHandler &);
```

构造函数，绑定游戏处理器。

### 游戏事件处理

```cpp
void onGameplayStart(PlayerColor player);
```

游戏开始时初始化计时器。

```cpp
void onPlayerGetTurn(PlayerColor player);
```

玩家获得回合时启动计时器。

```cpp
void onBattleStart(const BattleID & battle);
```

战斗开始时处理计时器。

```cpp
void onBattleNextStack(const BattleID & battle, const CStack & stack);
```

战斗中切换到下一个生物堆栈时更新计时器。

```cpp
void onBattleEnd(const BattleID & battleID);
```

战斗结束时清理计时器。

### 计时器控制

```cpp
void update(int waitTimeMs);
```

更新所有活跃计时器。

```cpp
void setTimerEnabled(PlayerColor player, bool enabled);
```

启用或禁用指定玩家的计时器。

```cpp
void setEndTurnAllowed(PlayerColor player, bool enabled);
```

设置是否允许指定玩家结束回合。

```cpp
void prolongTimers(int durationMs);
```

延长所有活跃计时器的持续时间。

### 私有辅助方法

```cpp
void onPlayerMakingTurn(PlayerColor player, int waitTime);
```

处理玩家正在进行回合的计时逻辑。

```cpp
void onBattleLoop(const BattleID & battleID, int waitTime);
```

处理战斗循环中的计时逻辑。

```cpp
bool timerCountDown(int & timerToApply, int initialTimer, PlayerColor player, int waitTime);
```

执行计时器倒计时逻辑。

```cpp
bool isPvpBattle(const BattleID & battleID) const;
```

检查是否为玩家对玩家战斗。

```cpp
void sendTimerUpdate(PlayerColor player);
```

向客户端发送计时器更新信息。

## 依赖关系

- **TurnTimerInfo**: 计时器信息结构体
- **CGameHandler**: 游戏处理器类
- **PlayerColor**: 玩家颜色类型
- **BattleID**: 战斗ID类型
- **CStack**: 生物堆栈类

## 使用示例

### 初始化计时器处理器

```cpp
#include "TurnTimerHandler.h"

// 创建计时器处理器
TurnTimerHandler timerHandler(gameHandler);
```

### 处理游戏事件

```cpp
#include "TurnTimerHandler.h"

// 游戏开始
timerHandler.onGameplayStart(PlayerColor::RED);

// 玩家获得回合
timerHandler.onPlayerGetTurn(PlayerColor::RED);

// 战斗开始
timerHandler.onBattleStart(battleID);

// 定期更新计时器
timerHandler.update(100);  // 更新100毫秒
```

### 控制计时器

```cpp
#include "TurnTimerHandler.h"

// 禁用玩家计时器
timerHandler.setTimerEnabled(PlayerColor::RED, false);

// 允许玩家结束回合
timerHandler.setEndTurnAllowed(PlayerColor::RED, true);

// 延长所有计时器
timerHandler.prolongTimers(30000);  // 延长30秒
```

## 计时器逻辑

1. **回合计时器**: 每个玩家在获得回合时启动计时器，到时间自动结束回合
2. **战斗计时器**: 战斗中每个生物行动有时间限制
3. **PVP特殊处理**: 玩家对玩家战斗可能有不同的计时规则
4. **暂停控制**: 可以临时禁用或延长计时器

## 性能特性

- **更新频率**: 定期更新（turnTimePropagateFrequency定义的频率）
- **内存使用**: 为每个玩家维护少量计时器状态
- **网络通信**: 定期向客户端发送计时器更新

## 实现注意事项

1. **线程安全**: 需要在游戏主线程中调用，避免竞态条件
2. **时间精度**: 使用毫秒级时间精度，支持高精度计时
3. **状态同步**: 计时器状态需要与客户端同步
4. **边界情况**: 处理战斗结束、玩家断开等特殊情况

## 相关文档

- [CGameHandler](CGameHandler.md) - 游戏处理器
- [TurnTimerInfo](../TurnTimerInfo.md) - 计时器信息结构体