# TurnStarted

## 源文件地址
`e:\develop\heroes\vcmi-assets\vcmi-client\include\vcmi/events/TurnStarted.h`

## 概述
`TurnStarted`定义了VCMI引擎中回合开始事件的接口。该文件定义了当一个新的游戏回合开始时触发的事件。

## 功能说明

### TurnStarted 事件的主要功能：

- 表示一个新的游戏回合已开始
- 通知系统新的一轮游戏循环已启动
- 触发与回合开始相关的处理逻辑
- 支持每日效果处理、资源更新、状态刷新等操作

此事件在游戏进入新的回合时触发，允许其他系统响应回合开始的情况，例如处理每日资源发放、计算每日增益/减益效果、更新玩家状态等。