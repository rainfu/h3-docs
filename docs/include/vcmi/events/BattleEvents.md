# BattleEvents

## 源文件地址
`e:\develop\heroes\vcmi-assets\vcmi-client\include\vcmi/events/BattleEvents.h`

## 概述
`BattleEvents`定义了VCMI引擎中战斗相关的事件接口。该文件包含了一系列与战斗系统相关的事件定义。

## 功能说明

### BattleEvents 包含的主要事件类型：

- 战斗开始和结束事件
- 单位行动（攻击、移动、施法等）相关的事件
- 战斗结果判定相关的事件
- 战斗中特殊能力触发相关的事件
- 战斗状态变化相关的事件

这些事件用于在战斗过程中发生特定游戏状态变化时通知感兴趣的组件，允许系统响应战斗中的各种情况。