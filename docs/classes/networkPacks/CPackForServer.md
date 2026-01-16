# CPackForServer类

CPackForServer类是VCMI中发送到服务器的网络包的基类。

## 类定义

```cpp
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
```

## 功能说明

CPackForServer是VCMI网络包系统中专门用于发送到服务器的网络包的基类。它继承自CPack，为所有发送到服务器的网络包提供了共同的结构和行为。这类网络包通常包含玩家的行动指令、游戏操作等需要服务器处理的信息。

## 依赖关系

- [CPack](./CPack.md): 网络包基类
- [ICPackVisitor](./ICPackVisitor.md): 网络包访问者接口
- [PlayerColor](../players/PlayerColor.md): 玩家颜色类型
- STL库: 序列化处理

## 成员变量说明

- `player`: 发送此包的玩家颜色，默认为中立玩家
- `requestID`: 请求的唯一标识符，默认为0

## 函数注释

- `serialize(Handler &h)`: 序列化函数，用于序列化玩家颜色和请求ID
- `visitBasic(cpackVisitor)`: 重写基类的visitBasic方法，处理服务器网络包的基本访问逻辑