# IObjectInterface

地图对象接口，定义地图对象的基本行为和属性。

## 概述

`IObjectInterface` 是所有地图对象的基类接口，定义了对象的基本操作，如初始化、访问、序列化等。提供统一的地图对象操作抽象。

## 主要方法
- `void initObj(IGameRandomizer & gameRandomizer)`：初始化对象
- `void pickRandomObject(IGameRandomizer & gameRandomizer)`：随机化对象
- `void onHeroVisit(IGameEventCallback & gameEvents, const CGHeroInstance * h) const`：英雄访问处理
- `MapObjectID getObjGroupIndex() const`：获取对象组ID
- `MapObjectSubID getObjTypeIndex() const`：获取对象类型ID
- `PlayerColor getOwner() const`：获取对象所有者
- `int3 visitablePos() const`：获取可访问位置
- `int3 anchorPos() const`：获取锚点位置
- `bool passableFor(PlayerColor color) const`：检查通行权限

## 依赖关系
- 关联：`IGameInfoCallback`, `IGameEventCallback`, `CGHeroInstance` 等
- 实现：`CGObjectInstance` 等具体类

## 用途
- 统一对象接口：所有地图对象的基础协议
- 事件处理：英雄访问、对象交互
- 系统集成：AI、界面、脚本等系统访问

## 实现说明
- 纯虚接口：定义行为契约
- 事件驱动：支持各种游戏事件
- 权限控制：所有者-based访问控制