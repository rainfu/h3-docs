# CPack类

CPack类是VCMI网络包系统中的基础网络包类，定义了所有网络包的基本结构和功能。

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
    /// 对于netpacks层次结构的基本类型，如CPackForClient。首先调用。
    virtual void visitBasic(ICPackVisitor & cpackVisitor);

    /// 对于netpacks层次结构的叶类型。在visitBasic之后调用。
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

CPack是VCMI网络包系统的基础类，作为所有网络包的基类。它继承自Serializeable接口，支持序列化功能。CPack定义了三种主要的网络包类型：

- CPackForClient: 发送到客户端的网络包
- CPackForServer: 发送到服务器的网络包
- CPackForLobby: 发送到大厅的网络包

此外，还有Query（查询）和PackForClientBattle（战斗相关包）等特殊类型。该类使用访问者模式（visitor pattern）来处理不同类型的网络包。

## 依赖关系

- [Serializeable](../serializer/Serializeable.md): 序列化接口
- [ICPackVisitor](./ICPackVisitor.md): 网络包访问者接口
- [QueryID](../constants/QueryID.md): 查询ID
- [BattleID](../constants/BattleID.md): 战斗ID
- [PlayerColor](../constants/PlayerColor.md): 玩家颜色
- [CGameState](../gameState/CGameState.md): 游戏状态
- STL库: runtime_error等

## 函数注释

- `CPack()`: 构造函数，创建网络包对象
- `~CPack()`: 虚析构函数，确保派生类能够正确析构
- `serialize(h)`: 序列化函数，对于CPack基类，该操作不应该被执行
- `visit(cpackVisitor)`: 使用访问者模式访问网络包
- `visitBasic(cpackVisitor)`: 访问网络包基本类型的方法
- `visitTyped(cpackVisitor)`: 访问网络包具体类型的方法
- `CPackForClient`: 发送给客户端的网络包基类
- `CPackForServer`: 发送给服务器的网络包基类，包含玩家信息和请求ID
- `CPackForLobby`: 发送给大厅的网络包基类
- `Query`: 查询类型网络包，包含查询ID
- `PackForClientBattle`: 战斗相关网络包，包含战斗ID