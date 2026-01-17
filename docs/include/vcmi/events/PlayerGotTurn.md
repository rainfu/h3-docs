# PlayerGotTurn

## 源文件地址
`e:\develop\heroes\vcmi-assets\vcmi-client\include\vcmi/events/PlayerGotTurn.h`

## 概述
`PlayerGotTurn`定义了VCMI引擎中玩家获得回合事件的接口。该文件定义了当轮到某玩家行动时触发的事件。

## 功能说明

### PlayerGotTurn 事件的主要功能：

- 表示某个玩家已获得游戏回合
- 通知系统当前轮到哪个玩家进行操作
- 触发与玩家回合开始相关的处理逻辑
- 支持回合开始时的资源发放、状态更新等操作

此事件在游戏回合切换到下一个玩家时触发，允许其他系统响应玩家回合开始的情况，例如恢复英雄行动点、处理每日效果、更新界面显示等。