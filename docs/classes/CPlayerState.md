# CPlayerState

玩家状态类，管理玩家的所有状态信息，包括资源、对象、任务等。

## 概述

`CPlayerState` 是VCMI中玩家状态的核心类，继承自多个基类以支持玩家的各种功能。它维护了玩家在游戏中的完整状态，包括拥有的对象、资源、任务、访问记录等。

## 主要属性
- `color`: 玩家颜色
- `human`: 是否为人类玩家
- `team`: 所属队伍
- `resources`: 资源集合
- `ownedObjects`: 拥有的对象列表
- `visitedObjects`: 访问过的对象集合
- `destroyedObjects`: 摧毁的对象集合
- `quests`: 任务信息列表
- `battleBonuses`: 战斗奖励
- `status`: 玩家状态

## 核心方法
- `std::vector<const CGHeroInstance*> getHeroes() const`: 获取玩家英雄
- `std::vector<const CGTownInstance*> getTowns() const`: 获取玩家城镇
- `void addOwnedObject(...)`: 添加拥有的对象
- `bool checkVanquished() const`: 检查是否被击败
- `int getResourceAmount(...) const`: 获取资源数量
- `std::vector<const CGObjectInstance*> getOwnedObjects() const`: 获取所有拥有的对象

## 继承关系
- `CBonusSystemNode`: 奖励系统节点
- `Player`: 玩家接口
- `GameCallbackHolder`: 游戏回调持有者

## 依赖关系
- 关联：`CGHeroInstance`, `CGTownInstance`, `CGObjectInstance`
- 使用：`ResourceSet`, `QuestInfo`, `TurnTimerInfo`

## 用途
- 玩家状态管理：维护玩家的所有游戏状态
- 对象所有权：跟踪玩家拥有的英雄、城镇等对象
- 探索记录：记录玩家访问和摧毁的对象
- 任务系统：管理玩家的任务进度
- 资源管理：处理玩家的资源和经济
- 胜利条件：检查玩家的存活状态

## 实现说明
- 对象索引：维护对象ID到实例的快速映射
- 序列化支持：完整的保存和加载功能
- 状态验证：内置的状态一致性检查
- 性能优化：使用集合和映射进行快速查找