# LobbyClientConnected结构

LobbyClientConnected结构是VCMI中表示大厅客户端连接的网络包。

## 类定义

```cpp
struct DLL_LINKAGE LobbyClientConnected : public CLobbyPackToPropagate
{
    // Set by client before sending pack to server
    std::string uuid;
    std::vector<std::string> names;
    EStartMode mode = EStartMode::INVALID;
    // Changed by server before announcing pack
    GameConnectionID clientId = GameConnectionID::INVALID;
    GameConnectionID hostClientId = GameConnectionID::INVALID;
    ESerializationVersion version = ESerializationVersion::CURRENT;

    void visitTyped(ICPackVisitor & visitor) override;

    template <typename Handler> void serialize(Handler & h)
    {
        h & uuid;
        h & names;
        h & mode;

        h & clientId;
        h & hostClientId;
        h & version;
    }
};
```

## 功能说明

LobbyClientConnected是VCMI网络包系统中表示客户端连接到大厅的网络包。当客户端连接到大厅服务器时，会发送此包以宣告连接。该包包含了客户端的UUID、玩家姓名列表、启动模式等信息，服务器在收到此包后会为其分配连接ID并将其传播给其他客户端，以便所有参与者都知道新客户端的加入。

## 依赖关系

- [CLobbyPackToPropagate](./CLobbyPackToPropagate.md): 大厅传播网络包基类
- [ICPackVisitor](./ICPackVisitor.md): 网络包访问者接口
- [EStartMode](./EStartMode.md): 启动模式枚举
- [GameConnectionID](../network/GameConnectionID.md): 游戏连接ID类型
- [ESerializationVersion](../serializer/ESerializationVersion.md): 序列化版本类型
- STL库: string, vector

## 函数注释

- `visitTyped(visitor)`: 重写基类的visitTyped方法，处理特定类型的访问
- `serialize(Handler &h)`: 序列化函数，序列化客户端连接信息的所有字段

## 成员变量说明

- `uuid`: 客户端的唯一标识符，在客户端发送给服务器前设置
- `names`: 玩家姓名列表
- `mode`: 启动模式，默认为EStartMode::INVALID
- `clientId`: 客户端连接ID，由服务器在宣告包之前设置
- `hostClientId`: 主机客户端连接ID，由服务器在宣告包之前设置
- `version`: 序列化版本，默认为当前版本