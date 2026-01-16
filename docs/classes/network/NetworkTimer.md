# NetworkTimer类型

NetworkTimer类型是VCMI中网络计时器的类型别名，用于处理网络操作中的定时任务。

## 类型定义

```cpp
using NetworkTimer = boost::asio::steady_timer;
```

## 功能说明

NetworkTimer是VCMI网络系统中用于处理定时任务的计时器类型别名，它是`boost::asio::steady_timer`的别名。这个类型封装了定时器的操作，提供了精确的时间控制机制，特别适用于网络心跳、超时处理等场景。

## 依赖关系

- Boost.Asio库: steady_timer

## 类型说明

NetworkTimer是`boost::asio::steady_timer`的别名，提供了以下功能：

- 精确的时间延迟和周期性触发
- 与Boost.Asio异步操作的无缝集成
- 支持取消定时器操作
- 用于网络心跳机制（保持连接活跃）
- 用于超时处理（连接超时、操作超时等）

该类型在NetworkConnection类中用于实现心跳机制，定期发送心跳包以维持网络连接的活跃状态，防止连接因长时间无数据传输而被中断。