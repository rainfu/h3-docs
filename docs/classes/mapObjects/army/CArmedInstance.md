# CArmedInstance

武装实例基类，定义拥有军队的地图对象的通用接口。

## 概述

`CArmedInstance` 是所有可拥有军队的地图对象的基类，如城镇、英雄、生物巢穴等。提供军队管理、兵力查询、战斗准备等功能。

## 继承关系
- 继承：`CGObjectInstance`, `CBonusSystemNode`, `CCreatureSet`
- 实现：`IConstBonusProvider`

## 主要属性
- 军队管理：通过 `CCreatureSet` 接口
- 奖励系统：通过 `CBonusSystemNode`
- 地图对象：通过 `CGObjectInstance`

## 核心方法
- 军队操作：`addToSlot`, `eraseStack`, `clearArmy` 等
- 兵力查询：`getArmyStrength`, `getCreatureCount` 等
- 战斗准备：`armyFormationChanged`, `attachToBonusSystem` 等

## 依赖关系
- 关联：`CCreatureSet`, `CBonusSystemNode`, `CGObjectInstance`
- 依赖：军队和奖励系统组件

## 实现类
- `CGHeroInstance`: 英雄及其军队
- `CGTownInstance`: 城镇守军
- `CGDwelling`: 生物巢穴

## 用途
- 统一军队管理接口
- 战斗系统集成
- 奖励效果计算

## 实现说明
- 多重继承：组合多种功能
- 状态同步：军队变化时更新相关系统
- 序列化支持：保存完整的军队状态