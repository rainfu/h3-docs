# 事件系统 (events)

events模块负责管理游戏中的各种事件，如战斗伤害应用、玩家回合开始、对象访问等，提供事件驱动的游戏逻辑处理。

## 主要类和结构体

### CApplyDamage
应用伤害事件类，处理战斗中的伤害应用逻辑。

- 功能：封装战斗单位受到伤害的事件，允许修改伤害值
- 依赖：[ApplyDamage](../../include/vcmi/events/ApplyDamage.md), [BattleStackAttacked](../battle/BattleStackAttacked.md), [battle::Unit](../battle/Unit.md), [Environment](../Environment.md)
- 函数注释：
  - [CApplyDamage(env, pack, target)](#): 构造函数，初始化伤害应用事件
  - [isEnabled()](#): 检查事件是否启用
  - [getInitialDamage()](#): 获取初始伤害值
  - [getDamage()](#): 获取当前伤害值（可能已被修改）
  - [setDamage()](#): 设置伤害值
  - [getTarget()](#): 获取受到伤害的目标单位

### PlayerGotTurn
玩家获得回合事件类，当轮到某个玩家行动时触发。

- 功能：表示玩家获得了行动回合
- 依赖：[Event](./Event.md)
- 函数注释：
  - [getPlayer()](#): 获取获得回合的玩家

### TurnStarted
回合开始事件类，表示一个新回合的开始。

- 功能：表示新的游戏回合已经开始
- 依赖：[Event](./Event.md)
- 函数注释：
  - [getTurn()](#): 获取回合编号

### ObjectVisitStarted / ObjectVisitEnded
对象访问开始/结束事件类，处理英雄访问地图对象的过程。

- 功能：分别表示英雄开始访问和结束访问地图对象
- 依赖：[Event](./Event.md), [CGHeroInstance](../entities/CHero.md), [CGObjectInstance](../mapObjects/CGObjectInstance.md)
- 函数注释：
  - [getHero()](#): 获取访问对象的英雄
  - [getObject()](#): 获取被访问的对象
  - [getAccessor()](#): 获取访问权限检查器

### GameResumed
游戏恢复事件类，当游戏从暂停状态恢复时触发。

- 功能：表示游戏从暂停状态恢复
- 依赖：[Event](./Event.md)
- 函数注释：
  - [getReason()](#): 获取游戏恢复的原因

## 依赖关系

events模块依赖以下组件：
- [battle](../battle/index.md): 战斗相关事件
- [entities](../entities/index.md): 游戏实体
- [mapObjects](../mapObjects/index.md): 地图对象
- [Environment](../Environment.md): 事件环境

## 类依赖排序

1. [constants](../constants/index.md) - 游戏常量
2. [Environment](../Environment.md) - 事件环境
3. [battle](../battle/index.md) - 战斗系统
4. [entities](../entities/index.md) - 游戏实体
5. [mapObjects](../mapObjects/index.md) - 地图对象
6. events/ - 事件系统