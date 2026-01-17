# EventBus

## 源文件地址
`e:\develop\heroes\vcmi-assets\vcmi-client\include\vcmi/events/EventBus.h`

## 概述
`EventBus`定义了VCMI引擎中的事件总线接口。该文件提供了事件发布和订阅的机制，实现组件间的松耦合通信。

## 功能说明

### EventBus 的主要功能：

- 提供事件发布/订阅机制
- 管理事件监听器的注册和注销
- 将事件路由到相应的监听器
- 支持同步和异步事件处理
- 实现事件处理的线程安全机制

EventBus 是 VCMI 事件驱动架构的核心组件，允许不同系统在不直接耦合的情况下相互通信。