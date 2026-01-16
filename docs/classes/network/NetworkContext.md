# NetworkContext类型

NetworkContext类型是VCMI中网络上下文的类型别名，用于管理网络操作的执行上下文。

## 类型定义

```cpp
#if BOOST_VERSION >= 106600
using NetworkContext = boost::asio::io_context;
#else
using NetworkContext = boost::asio::io_service;
#endif
```

## 功能说明

NetworkContext是VCMI网络系统中网络操作的执行上下文类型别名。根据Boost版本的不同，它可能映射到`boost::asio::io_context`（较新版本）或`boost::asio::io_service`（较旧版本）。这个上下文管理网络操作的调度和执行，是异步网络操作的核心组件。

## 依赖关系

- Boost.Asio库: io_context/io_service
- 条件编译: 根据Boost版本选择适当的类型

## 类型说明

- 在Boost版本1.66及以上，NetworkContext是`boost::asio::io_context`的别名
- 在Boost版本1.66以下，NetworkContext是`boost::asio::io_service`的别名

NetworkContext提供了一种跨平台、跨版本的方式来管理网络操作的执行上下文，确保异步网络操作能够在正确的上下文中执行。