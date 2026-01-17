# GameResumed

## 源文件地址
`e:\develop\heroes\vcmi-assets\vcmi-client\include\vcmi/events/GameResumed.h`

## 概述
`GameResumed`定义了VCMI引擎中游戏恢复事件的接口。该文件定义了当游戏从暂停状态恢复或从保存状态加载后触发的事件。

## 功能说明

### GameResumed 事件的主要功能：

- 表示游戏已从暂停或加载状态恢复正常运行
- 通知系统游戏状态已恢复，可以继续正常的游戏循环
- 触发与游戏恢复相关的处理逻辑
- 支持在游戏恢复时执行特定的初始化或同步操作

此事件在游戏从暂停状态恢复或从保存文件加载后触发，允许其他系统响应游戏恢复的情况，例如重新激活AI、恢复网络同步、更新UI状态等。