# CPack基类

CPack基类是VCMI中网络包的基类，所有网络包都继承自此类。

## 类定义

```cpp
struct DLL_LINKAGE CPack : public Serializeable
{
    CPack() = default;
    virtual ~CPack() = default;

    template <typename Handler> void serialize(Handler &h)
    {
        logNetwork->error("CPack serialized... this should not happen!");
        throw std::runtime_error("CPack serialized... this should not happen!");
    }

    void visit(ICPackVisitor & cpackVisitor);

protected:
    /// 对于netpack层次结构的基本类型如CPackForClient。首先调用。
    virtual void visitBasic(ICPackVisitor & cpackVisitor);

    /// 对于netpack层次结构的叶类型。在visitBasic之后调用。
    virtual void visitTyped(ICPackVisitor & cpackVisitor);
};

struct DLL_LINKAGE CPackForClient : public CPack
{
protected:
    void visitBasic(ICPackVisitor & cpackVisitor) override;
};

struct DLL_LINKAGE Query : public CPackForClient
{
    QueryID queryID; // 如果不是真正的查询（并且不应该被回应），则等于-1
};

struct PackForClientBattle : public CPackForClient
{
    BattleID battleID;

    void visitTyped(ICPackVisitor & visitor) override;
};

struct DLL_LINKAGE CPackForServer : public CPack
{
    mutable PlayerColor player = PlayerColor::NEUTRAL;
    mutable uint32_t requestID = 0;

    template <typename Handler> void serialize(Handler &h)
    {
        h & player;
        h & requestID;
    }

protected:
    void visitBasic(ICPackVisitor & cpackVisitor) override;
};

struct DLL_LINKAGE CPackForLobby : public CPack
{
    virtual bool isForServer() const;

protected:
    void visitBasic(ICPackVisitor & cpackVisitor) override;
};
```

## 功能说明

CPack是VCMI网络包系统中的基础类，所有网络包都继承自此类。它继承自Serializeable，提供了序列化功能。CPack定义了网络包的基本结构和访问模式，使用访问者模式实现不同类型的网络包处理。

## 依赖关系

- [Serializeable](../serializer/Serializeable.md): 序列化接口
- [ICPackVisitor](./ICPackVisitor.md): 网络包访问者接口
- [CGameState](../gameState/CGameState.md): 游戏状态类
- STL库: runtime_error

## 函数注释

- `CPack()`: 默认构造函数
- `~CPack()`: 虚析构函数
- `serialize(Handler &h)`: 序列化函数，当试图序列化基类时抛出异常
- `visit(cpackVisitor)`: 访问者模式入口，用于处理网络包
- `visitBasic(cpackVisitor)`: 基础类型访问处理（虚函数）
- `visitTyped(cpackVisitor)`: 特定类型访问处理（虚函数）
- `CPackForClient`: 发送给客户端的网络包基类
- `CPackForServer`: 发送给服务器的网络包基类，包含玩家信息和请求ID
- `CPackForLobby`: 发送给大厅的网络包基类
- `Query`: 查询类型网络包，包含查询ID
- `PackForClientBattle`: 战斗相关网络包，包含战斗ID