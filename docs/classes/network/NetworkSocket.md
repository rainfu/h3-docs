# NetworkSocket类型

NetworkSocket类型是VCMI中网络套接字的类型别名，用于TCP网络通信。

## 类型定义

```cpp
using NetworkSocket = boost::asio::ip::tcp::socket;
```

## 功能说明

NetworkSocket是VCMI网络系统中TCP网络通信的套接字类型别名，它是`boost::asio::ip::tcp::socket`的别名。这个类型封装了底层TCP套接字的操作，提供了异步和同步的网络通信功能，是网络连接的基础组件。

## 依赖关系

- Boost.Asio库: ip::tcp::socket

## 类型说明

NetworkSocket是`boost::asio::ip::tcp::socket`的别名，提供了标准TCP套接字的所有功能，包括：

- 连接到远程服务器
- 发送和接收数据
- 设置套接字选项（如TCP_NODELAY）
- 管理连接状态
- 异步和同步操作支持

该类型在NetworkConnection类中用于实际的网络通信操作，是VCMI网络系统与外界通信的底层实现。