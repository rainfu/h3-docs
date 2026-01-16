# PackageApplied结构

PackageApplied结构是VCMI中表示网络包应用结果的通知包。

## 类定义

```cpp
struct DLL_LINKAGE PackageApplied : public CPackForClient
{
    PackageApplied() = default;
    PackageApplied(PlayerColor player, uint32_t requestID, uint16_t packType, bool result)
        : player(player)
        , requestID(requestID)
        , packType(packType)
        , result(result)
    {
    }

    void visitTyped(ICPackVisitor & visitor) override;

    /// ID of player that sent this package
    PlayerColor player;
    /// request ID, as provided by player
    uint32_t requestID = 0;
    /// type id of applied package
    uint16_t packType = 0;
    /// If false, then pack failed to apply, for example - illegal request
    bool result = false;

    template <typename Handler> void serialize(Handler & h)
    {
        h & player;
        h & requestID;
        h & packType;
        h & result;
    }
};
```

## 功能说明

PackageApplied是VCMI网络包系统中表示服务器对客户端请求的处理结果的网络包。当服务器处理完客户端发送的请求后，会发送这个包来通知客户端请求的处理结果。这个包包含了发送请求的玩家ID、请求ID、包类型以及处理结果。

## 依赖关系

- [CPackForClient](./CPackForClient.md): 客户端网络包基类
- [ICPackVisitor](./ICPackVisitor.md): 网络包访问者接口
- [PlayerColor](../players/PlayerColor.md): 玩家颜色类型
- STL库: 序列化处理

## 函数注释

- `PackageApplied()`: 默认构造函数
- `PackageApplied(player, requestID, packType, result)`: 带参数的构造函数，使用玩家颜色、请求ID、包类型和结果初始化
- `visitTyped(visitor)`: 重写基类的visitTyped方法，处理特定类型的访问

## 成员变量说明

- `player`: 发送此包的玩家ID
- `requestID`: 玩家提供的请求ID
- `packType`: 应用包的类型ID
- `result`: 如果为false，则表示包应用失败，例如非法请求