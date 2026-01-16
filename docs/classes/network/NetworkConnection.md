# NetworkConnection类

NetworkConnection类是VCMI中网络连接的实现类，用于处理TCP网络连接的建立、数据收发和错误处理。

## 类定义

```cpp
class NetworkConnection final : public INetworkConnection, public std::enable_shared_from_this<NetworkConnection>
{
    static const int messageHeaderSize = sizeof(uint32_t);
    static const int messageMaxSize = 64 * 1024 * 1024; // 防止接收到垃圾数据时导致大量分配

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
    onDataSent(const boost::system::error_code & ec);

public:
    NetworkConnection(INetworkConnectionListener & listener, const std::shared_ptr<NetworkSocket> & socket, NetworkContext & context);

    void start();
    void close() override;
    void sendPacket(const std::vector<std::byte> & message) override;
    void setAsyncWritesEnabled(bool on) override;
};

class InternalConnection final : public IInternalConnection, public std::enable_shared_from_this<InternalConnection>
{
    std::weak_ptr<IInternalConnection> otherSideWeak;
    NetworkContext & context;
    INetworkConnectionListener & listener;
    bool connectionActive = false;
public:
    InternalConnection(INetworkConnectionListener & listener, NetworkContext & context);

    void receivePacket(const std::vector<std::byte> & message) override;
    void disconnect() override;
    void connectTo(std::shared_ptr<IInternalConnection> connection) override;
    void sendPacket(const std::vector<std::byte> & message) override;
    void setAsyncWritesEnabled(bool on) override;
    void close() override;
};
```

## 功能说明

NetworkConnection是VCMI网络系统的TCP连接实现，继承自INetworkConnection接口，负责处理TCP连接的建立、数据的发送和接收、心跳检测和错误处理。该类使用异步IO模型，可以高效地处理大量并发连接。

InternalConnection是内部连接的实现，用于进程内通信，不需要通过TCP传输数据。

## 依赖关系

- [INetworkConnection](./INetworkConnection.md): 网络连接接口
- [IInternalConnection](./IInternalConnection.md): 内部连接接口
- [INetworkConnectionListener](./INetworkConnectionListener.md): 网络连接监听器
- [NetworkSocket](./NetworkSocket.md): 网络套接字
- [NetworkContext](./NetworkContext.md): 网络上下文
- [NetworkBuffer](./NetworkBuffer.md): 网络缓冲区
- [NetworkTimer](./NetworkTimer.md): 网络定时器
- boost::system::error_code: Boost ASIO错误码
- STL库: list, vector, byte, mutex等

## 函数注释

- `NetworkConnection(listener, socket, context)`: 构造函数，创建网络连接对象
- `start()`: 启动网络连接，开始接收数据
- `close()`: 关闭网络连接
- `sendPacket(message)`: 发送数据包
- `setAsyncWritesEnabled(on)`: 设置是否启用异步写入
- `heartbeat()`: 心跳检测
- `startReceiving()`: 开始接收数据
- `onHeaderReceived(ec)`: 接收到包头时的回调
- `onPacketReceived(ec, expectedPacketSize)`: 接收到数据包时的回调
- `doSendData()`: 发送数据
- `onDataSent(ec)`: 数据发送完成时的回调
- `InternalConnection(listener, context)`: 内部连接构造函数
- `receivePacket(message)`: 接收数据包（内部连接）
- `disconnect()`: 断开连接
- `connectTo(connection)`: 连接到另一个内部连接
- `onError(message)`: 错误处理