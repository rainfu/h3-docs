# 网络系统 (network)

网络系统负责处理VCMI客户端与服务器之间的通信，包括数据包的发送和接收。

## 主要类和结构体

### CConnection
连接类，表示客户端与服务器之间的网络连接。

- 功能：封装底层网络连接，提供数据的发送和接收功能
- 依赖：[CClient](../client/CClient.md), [CGameHandler](../game/CGameHandler.md)
- 函数注释：
  - [sendPack()](#): 发送数据包
  - [prepareToSending()](#): 准备数据包发送
  - [dispatch([CClient](../client/CClient.md) * c)](#): 将数据包分发给客户端
  - [dispatch([CGameHandler](../game/CGameHandler.md) * gh)](#): 将数据包分发给游戏处理器

### Pack
数据包基类，所有网络数据包的父类。

- 功能：定义网络数据包的基本结构和序列化方法
- 依赖：[CConnection](#cconnection), [serializer](../serializer/index.md)
- 函数注释：
  - [serialize()](#): 序列化数据包
  - [apply()](#): 应用数据包到游戏状态

### CStopConnectionException
连接停止异常类。

- 功能：在网络连接异常时抛出，通知上层处理连接中断
- 依赖：无
- 函数注释：
  - [what()](#): 获取异常描述

### NetworkHandler
网络处理器类。

- 功能：管理网络连接和数据传输
- 依赖：[CConnection](#cconnection)
- 函数注释：
  - [connect()](#): 建立网络连接
  - [disconnect()](#): 断开网络连接
  - [sendData()](#): 发送数据
  - [receiveData()](#): 接收数据

## 依赖关系

网络系统依赖以下模块：
- [serializer](../serializer/index.md): 数据序列化
- [client](../client/index.md): 客户端逻辑
- [game](../game/index.md): 游戏处理器
- [networkPacks](../networkPacks/index.md): 网络数据包定义

## 类依赖排序

1. [serializer](../serializer/index.md) - 数据序列化
2. network/ - 网络系统
3. [networkPacks](../networkPacks/index.md) - 网络数据包
4. [client](../client/index.md) - 客户端
5. [game](../game/index.md) - 游戏处理器