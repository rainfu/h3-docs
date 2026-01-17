# SubscriptionRegistry

## 源文件地址
`e:\develop\heroes\vcmi-assets\vcmi-client\include\vcmi/events/SubscriptionRegistry.h`

## 概述
`SubscriptionRegistry`定义了VCMI引擎中事件订阅注册表的接口。该文件提供了管理事件监听器订阅的机制，允许组件注册对特定事件的兴趣。

## 功能说明

### SubscriptionRegistry 的主要功能：

- 管理事件监听器的注册和注销
- 维护事件类型到监听器的映射关系
- 提供类型安全的事件订阅机制
- 支持细粒度的事件过滤和选择
- 确保事件监听器的生命周期管理

SubscriptionRegistry 是 VCMI 事件系统的重要组成部分，它协调事件生产者和消费者之间的关系，确保事件能够正确地传递给感兴趣的监听器。