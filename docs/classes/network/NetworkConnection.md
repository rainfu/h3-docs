# NetworkConnection类

NetworkConnection类是VCMI中网络连接的实现类，用于处理TCP网络连接。

## 类定义

```cpp
class NetworkConnection final : public INetworkConnection, public std::enable_shared_from_this<NetworkConnection>
{
    static const int messageHeaderSize = sizeof(uint32_t);
    static const int messageMaxSize = 64 * 1024 * 1024; // 防止潜在的大规模分配，如果我们收到垃圾输入

    std::list<std::vector<std::byte>> dataToSend;
    std::shared_ptr<NetworkSocket> socket;
    std::shared_ptr<NetworkTimer> timer;
    std::mutex writeMutex;

    NetworkBuffer readBuffer;
    INetworkConnectionListener & listener;
    bool asyncWritesEnabled = false;

    void heartbeat();
    void onError(const std::string & message);

    void startReceiving();
    void onHeaderReceived(const boost::system::error_code & ec);
    void onPacketReceived(const boost::system::error_code & ec, uint32_t expectedPacketSize);

    void doSendData();
    void onDataSent(const boost::system::error_code & ec);

public:
    NetworkConnection(INetworkConnectionListener & listener, const std::shared_ptr<NetworkSocket> & socket, NetworkContext & context);

    void start();
    void close() override;
    void sendPacket(const std::vector<std::byte> & message) override;
    void setAsyncWritesEnabled(bool on) override;
};
```

## 功能说明

NetworkConnection是VCMI网络系统中处理TCP网络连接的实现类，继承自INetworkConnection接口。它负责处理数据包的发送和接收、心跳检测、错误处理等网络连接相关功能。该类使用Boost.Asio进行异步网络操作，并实现了数据缓冲和流量控制。

## 依赖关系

- [INetworkConnection](./INetworkConnection.md): 网络连接接口
- [INetworkConnectionListener](./INetworkConnectionListener.md): 网络连接监听器接口
- [NetworkSocket](./NetworkSocket.md): 网络套接字
- [NetworkTimer](./NetworkTimer.md): 网络计时器
- [NetworkContext](./NetworkContext.md): 网络上下文
- [NetworkBuffer](./NetworkBuffer.md): 网络缓冲区
- Boost库: asio, system_error, enable_shared_from_this
- STL库: list, vector, mutex, byte等

## 函数注释

### 构造函数
- `NetworkConnection(listener, socket, context)`: 构造函数，使用监听器、套接字和上下文初始化网络连接

### 公共方法
- `start()`: 启动网络连接，开始接收数据
- `close()`: 关闭网络连接
- `sendPacket(message)`: 发送数据包
- `setAsyncWritesEnabled(on)`: 启用或禁用异步写入

### 私有方法
- `heartbeat()`: 发送心跳包以维持连接
- `onError(message)`: 错误处理回调
- `startReceiving()`: 开始接收数据
- `onHeaderReceived(ec)`: 接收数据包头部的回调
- `onPacketReceived(ec, expectedPacketSize)`: 接收数据包负载的回调
- `doSendData()`: 执行数据发送
- `onDataSent(ec)`: 数据发送完成的回调

### 静态常量
- `messageHeaderSize`: 消息头部大小（4字节）
- `messageMaxSize`: 消息最大大小（64MB）