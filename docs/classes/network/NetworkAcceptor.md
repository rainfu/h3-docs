# NetworkAcceptor类型

NetworkAcceptor类型是VCMI中网络接受器的类型别名，用于接受传入的TCP连接。

## 类型定义

```cpp
using NetworkAcceptor = boost::asio::ip::tcp::acceptor;
```

## 功能说明

NetworkAcceptor是VCMI网络系统中用于接受传入TCP连接的接受器类型别名，它是`boost::asio::ip::tcp::acceptor`的别名。这个类型封装了TCP连接接受器的操作，提供了异步和同步接受连接的功能，是网络服务器的核心组件。

## 依赖关系

- Boost.Asio库: ip::tcp::acceptor

## 类型说明

NetworkAcceptor是`boost::asio::ip::tcp::acceptor`的别名，提供了以下功能：

- 监听指定端口上的传入连接
- 接受新的TCP连接
- 绑定到本地IP地址和端口
- 异步和同步接受操作支持
- 设置接受器选项（如SO_REUSEADDR）

该类型在NetworkServer类中用于接受新的客户端连接，是VCMI网络服务器接收外部连接请求的基础组件。