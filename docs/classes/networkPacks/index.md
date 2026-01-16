# 网络包系统 (networkPacks)

网络包系统定义了客户端与服务器之间传输的各种数据包结构和协议。

## 主要类和结构体

### CPack
网络包基类，所有网络数据包的父类。

- 功能：定义网络数据包的基本结构和序列化方法
- 依赖：[CConnection](../network/CConnection.md), [serializer](../serializer/index.md)
- 函数注释：
  - [serialize()](#): 序列化数据包
  - [apply()](#): 应用数据包到游戏状态
  - [applyCl()](#): 应用到客户端
  - [applyGs()](#): 应用到游戏服务器

### CPackForServer
发送到服务器的数据包基类。

- 功能：客户端向服务器发送的请求包基类
- 依赖：[CPack](#cpack)
- 函数注释：
  - [applyGs()](#): 应用到游戏服务器

### PackageApplied
确认包已应用的反馈包。

- 功能：确认某个包已在服务器端应用
- 依赖：[CPack](#cpack)
- 函数注释：
  - [wasApplied()](#): 检查是否已应用

### SetResource
设置玩家资源的数据包。

- 功能：修改玩家拥有的资源数量
- 依赖：[CPackForServer](#cpackforserver), [ResourceSet](../ResourceSet.md)
- 函数注释：
  - [applyGs()](#): 应用到游戏服务器

### ChangeObjPos
改变对象位置的数据包。

- 功能：更改地图上对象的位置
- 依赖：[CPackForServer](#cpackforserver), [CGObjectInstance](../mapObjects/CGObjectInstance.md)
- 函数注释：
  - [applyGs()](#): 应用到游戏服务器

### NewStructures
新建筑的通知包。

- 功能：通知客户端城镇中新建的建筑
- 依赖：[CPack](#cpack), [CTown](../entities/CTown.md)
- 函数注释：
  - [applyCl()](#): 应用到客户端

### PlayerBlocked
玩家受限状态的通知包。

- 功能：通知玩家当前处于受限状态
- 依赖：[CPack](#cpack)
- 函数注释：
  - [applyCl()](#): 应用到客户端

### YourTurn
轮到某玩家操作的通知包。

- 功能：通知轮到哪个玩家行动
- 依赖：[CPack](#cpack), [PlayerSettings](../PlayerSettings.md)
- 函数注释：
  - [applyCl()](#): 应用到客户端

## 依赖关系

网络包系统依赖以下模块：
- [serializer](../serializer/index.md): 数据序列化
- [network](../network/index.md): 网络连接
- [entities](../entities/index.md): 游戏实体
- [mapObjects](../mapObjects/index.md): 地图对象
- [constants](../constants/index.md): 游戏常量

## 类依赖排序

1. [constants](../constants/index.md) - 游戏常量
2. [serializer](../serializer/index.md) - 数据序列化
3. [network](../network/index.md) - 网络系统
4. [entities](../entities/index.md) - 游戏实体
5. [mapObjects](../mapObjects/index.md) - 地图对象
6. networkPacks/ - 网络包系统