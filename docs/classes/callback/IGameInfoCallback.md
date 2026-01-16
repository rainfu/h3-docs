# IGameInfoCallback

游戏信息回调接口，提供地图对象和系统访问全局游戏数据的抽象接口。

## 概述

`IGameInfoCallback` 为地图对象、事件和系统提供只读或可写的游戏状态访问方法，如获取日期、地图大小、玩家状态、对象查询等。通常由游戏主循环或环境实现并传递给使用者。

## 主要方法
- `CGameState & gameState()` / `const CGameState & gameState() const`：访问游戏状态
- `int getDate(Date mode) const`：获取当前日期信息
- `const CMapHeader * getMapHeader() const`：获取地图头信息
- `bool isVisibleFor(int3 pos, PlayerColor player) const`：检查格子是否可见
- `const PlayerState * getPlayerState(PlayerColor color, bool verbose) const`：获取玩家状态
- 各类对象查询：`getHero`, `getTown`, `getObj`, `getTile` 等
- 路径与视野/守卫查询：`calculatePaths`, `getGuardingCreatures` 等

## 依赖关系
- 依赖：`CGameState`, `CGObjectInstance`, `CGHeroInstance`, `PlayerState` 等核心类型

## 用途
- 地图对象（如 `CGObjectInstance`）通过该接口获取游戏上下文
- AI、事件处理、界面等系统获取必要的只读游戏信息

## 实现说明
- 为抽象接口，具体实现由 `CGameState` 或回调适配器（如 `EditorCallback`）提供
- 设计上兼顾性能与安全，部分方法提供 `verbose` 参数以控制额外检查
