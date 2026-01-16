# NetworkConnection类

`NetworkConnection` 类是VCMI系统中网络连接的具体实现类，实现了 `INetworkConnection` 接口。它负责管理TCP连接，包括数据的发送和接收。

## 类定义

```cpp
class NetworkConnection final : public INetworkConnection, public std::enable_shared_from_this<NetworkConnection>
{
    static const int messageHeaderSize = sizeof(uint32_t);        // 消息头大小
    static const int messageMaxSize = 64 * 1024 * 1024;         // 消息最大大小（64MB）

    std::list<std::vector<std::byte>> dataToSend;                // 待发送数据列表
    std::shared_ptr<NetworkSocket> socket;                       // 网络套接字
    std::shared_ptr<NetworkTimer> timer;                         // 网络定时器
    std::mutex writeMutex;                                       // 写入互斥锁

    NetworkBuffer readBuffer;                                    // 读取缓冲区
    INetworkConnectionListener & listener;                       // 连接监听器
    bool asyncWritesEnabled = false;                             // 是否启用异步写入

    void heartbeat();                                            // 心跳检测
    void onError(const std::string & message);                   // 错误处理
    void startReceiving();                                       // 开始接收数据
    void onHeaderReceived(const boost::system::error_code & ec); // 消息头接收回调
    void onPacketReceived(const boost::system::error_code & ec, uint32_t expectedPacketSize); // 数据包接收回调
    void doSendData();                                           // 发送数据
    void onDataSent(const boost::system::error_code & ec);       // 数据发送完成回调

public:
    NetworkConnection(INetworkConnectionListener & listener, const std::shared_ptr<NetworkSocket> & socket, NetworkContext & context); // 构造函数
    void start();                                                // 启动连接
    void close() override;                                       // 关闭连接
    void sendPacket(const std::vector<std::byte> & message) override; // 发送数据包
    void setAsyncWritesEnabled(bool on) override;                // 设置异步写入状态
};

class InternalConnection final : public IInternalConnection, public std::enable_shared_from_this<InternalConnection>
{
    std::weak_ptr<IInternalConnection> otherSideWeak;            // 另一端的弱引用
    NetworkContext & context;                                     // 网络上下文
    INetworkConnectionListener & listener;                        // 连接监听器
    bool connectionActive = false;                               // 连接是否活跃
public:
    InternalConnection(INetworkConnectionListener & listener, NetworkContext & context); // 构造函数
    void receivePacket(const std::vector<std::byte> & message) override; // 接收数据包
    void disconnect() override;                                  // 断开连接
    void connectTo(std::shared_ptr<IInternalConnection> connection) override; // 连接到另一个内部连接
    void sendPacket(const std::vector<std::byte> & message) override; // 发送数据包
    void setAsyncWritesEnabled(bool on) override;                // 设置异步写入状态
    void close() override;                                       // 关闭连接
};
```

## 功能说明

`NetworkConnection` 类是 `INetworkConnection` 接口的具体实现，负责管理TCP连接。它处理数据的发送和接收，包括协议头解析、错误处理和心跳检测。

`InternalConnection` 类是 `IInternalConnection` 接口的具体实现，用于进程内通信，不需要通过网络传输数据。

## 重要方法

### NetworkConnection类

#### 连接管理
- `NetworkConnection(listener, socket, context)`：构造函数，初始化网络连接
- `start()`：启动连接，开始接收数据
- `close()`：关闭连接

#### 数据传输
- `sendPacket(message)`：发送数据包
- `setAsyncWritesEnabled(on)`：启用/禁用异步写入

#### 内部方法
- `heartbeat()`：定期心跳检测，确保连接活跃
- `onError(message)`：错误处理
- `startReceiving()`：开始接收数据循环
- `onHeaderReceived(ec)`：处理接收到的消息头
- `onPacketReceived(ec, expectedPacketSize)`：处理接收到的数据包
- `doSendData()`：执行数据发送
- `onDataSent(ec)`：数据发送完成后的回调

### InternalConnection类

#### 连接管理
- `InternalConnection(listener, context)`：构造函数，初始化内部连接
- `connectTo(connection)`：连接到另一个内部连接
- `disconnect()`：断开连接
- `close()`：关闭连接

#### 数据传输
- `receivePacket(message)`：接收数据包
- `sendPacket(message)`：发送数据包
- `setAsyncWritesEnabled(on)`：启用/禁用异步写入

## 设计说明

`NetworkConnection` 类的设计体现了以下特点：

1. **线程安全**：使用 `writeMutex` 保护写入操作，确保多线程环境下的安全性
2. **异步处理**：基于 Boost.Asio 实现异步网络操作，提高性能和响应性
3. **资源管理**：使用智能指针（`shared_ptr`, `weak_ptr`）管理资源生命周期，避免内存泄漏
4. **错误处理**：通过 `onError` 方法提供完善的错误处理机制和连接状态管理
5. **大小限制**：对消息大小进行了硬性限制（`messageMaxSize`），防止恶意输入导致的内存问题

`InternalConnection` 类提供了一种无需经过 TCP/IP 栈的进程内通信方式，适用于在同一进程中需要模拟网络通信的场景。

这两个类共同构成了 VCMI 的网络通信基础设施，支持远程 TCP 连接和本地进程内通信。