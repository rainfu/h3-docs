# NetworkServer类

`NetworkServer`类是VCMI（Virtual Creature Mod Interface）网络子系统中网络服务器的具体实现。它实现了`INetworkServer`和`INetworkConnectionListener`接口，作为服务器端核心组件，负责监听传入连接、管理现有连接以及转发数据包和事件。

## 类定义

```cpp
class NetworkServer : public INetworkConnectionListener, public INetworkServer
{
    NetworkContext & context;                                               // 网络上下文
    std::shared_ptr<NetworkAcceptor> acceptor;                            // 网络接受器
    std::set<std::shared_ptr<INetworkConnection>> connections;            // 当前连接集合

    INetworkServerListener & listener;                                     // 服务器监听器

    void connectionAccepted(std::shared_ptr<NetworkSocket>, const boost::system::error_code & ec); // 连接接受回调
    uint16_t startAsyncAccept();                                          // 开始异步接受连接

    void onDisconnected(const std::shared_ptr<INetworkConnection> & connection, const std::string & errorMessage) override; // 连接断开回调
    void onPacketReceived(const std::shared_ptr<INetworkConnection> & connection, const std::vector<std::byte> & message) override; // 数据包接收回调
public:
    NetworkServer(INetworkServerListener & listener, NetworkContext & context); // 构造函数

    void receiveInternalConnection(std::shared_ptr<IInternalConnection> remoteConnection) override; // 接收内部连接

    uint16_t start(uint16_t port) override;                              // 启动服务器
};
```

## 功能说明

`NetworkServer`类是`INetworkServer`接口的具体实现，其主要职责包括：

1.  **监听与连接**：在指定端口上启动监听，并通过`NetworkAcceptor`异步接受来自客户端的新连接。
2.  **连接管理**：维护一个当前所有活动连接的集合（`connections`），当连接建立或断开时，会相应地添加或移除。
3.  **事件处理**：由于它实现了`INetworkConnectionListener`接口，因此可以接收其管理的所有连接的事件通知（如数据包到达、连接断开），并将这些事件转发给外部的`listener`。
4.  **内部通信**：提供`receiveInternalConnection`方法来接收和集成由同一进程内其他模块创建的内部连接。

## 重要方法

### 服务器生命周期管理
| 方法 | 描述 |
| :--- | :--- |
| `NetworkServer(listener, context)` | **构造函数**。使用给定的`INetworkServerListener`监听器和`NetworkContext`上下文初始化服务器实例。 |
| `uint16_t start(uint16_t port)` | **启动服务器**。将服务器绑定到指定的`port`端口并开始监听。如果指定端口被占用，可自动选择一个可用端口。返回实际绑定的端口号。 |

### 连接处理
| 方法 | 描述 |
| :--- | :--- |
| `void connectionAccepted(std::shared_ptr<NetworkSocket>, const boost::system::error_code & ec)` | **私有回调**。当`acceptor`完成一次异步连接接受操作后，此方法会被调用。它检查错误码，若成功则创建一个新的`INetworkConnection`对象，将其加入`connections`集合，并设置自身为该连接的监听器，然后立即再次调用`startAsyncAccept()`以接受下一个连接。 |
| `uint16_t startAsyncAccept()` | **私有方法**。启动下一轮异步连接接受。通常在`start()`方法和`connectionAccepted()`回调的末尾被调用。 |
| `void receiveInternalConnection(std::shared_ptr<IInternalConnection> remoteConnection)` | **公共方法**。将一个已经存在的内部连接（例如，用于主控台或本地调试的连接）纳入服务器的管理范围。该连接会被加入`connections`集合，并且其事件也会被本服务器转发。 |

### 事件监听 (INetworkConnectionListener 实现)
| 方法 | 描述 |
| :--- | :--- |
| `void onDisconnected(const std::shared_ptr<INetworkConnection> & connection, const std::string & errorMessage)` | 当其管理的任何一个连接断开时，此方法被调用。它会从`connections`集合中移除该连接，并将断开事件连同错误信息一起转发给外部的`listener`。 |
| `void onPacketReceived(const std::shared_ptr<INetworkConnection> & connection, const std::vector<std::byte> & message)` | 当其管理的任何一个连接收到数据包时，此方法被调用。它会将接收到的数据包原样转发给外部的`listener`进行处理。 |

## 设计说明

`NetworkServer`类的设计体现了以下关键设计原则：

*   **双接口角色**：通过同时实现`INetworkServer`和`INetworkConnectionListener`，`NetworkServer`既扮演了“服务器”（主动监听和接受连接）的角色，也扮演了“观察者”（被动接收其管理连接的事件）的角色，实现了关注点分离。
*   **高效的连接管理**：使用`std::set`容器存储`INetworkConnection`的智能指针，确保了对连接的快速查找、插入和删除，便于资源清理。
*   **异步非阻塞I/O**：基于Boost.Asio库，采用异步模式处理网络I/O。`startAsyncAccept()`方法不会阻塞主线程，从而能够高效地处理大量并发连接。
*   **事件驱动架构**：所有操作（连接、接收、断开）都通过回调函数实现，整个系统是事件驱动的。这保证了良好的响应性和可扩展性。
*   **控制反转 (IoC)**：通过`listener`成员，将具体的业务逻辑（如如何处理接收到的数据包）交由外部代码决定，`NetworkServer`本身只负责网络层面的通信。
*   **RAII与智能指针**：利用`std::shared_ptr`管理`NetworkAcceptor`和`INetworkConnection`的生命周期，确保了资源的安全释放，避免了内存泄漏。