# EndTurn结构

EndTurn结构是VCMI中表示玩家结束回合的网络包。

## 类定义

```cpp
struct DLL_LINKAGE EndTurn : public CPackForServer
{
    void visitTyped(ICPackVisitor & visitor) override;

    template <typename Handler> void serialize(Handler & h)
    {
        h & static_cast<CPackForServer &>(*this);
    }
};
```

## 功能说明

EndTurn是VCMI网络包系统中表示玩家主动结束当前回合的网络包。当玩家完成其在当前回合的所有操作后，会向服务器发送此包以正式结束自己的回合，让游戏进入下一个玩家的回合或处理阶段。这个包本身不携带额外数据，只是表示一个回合结束的动作。

## 依赖关系

- [CPackForServer](./CPackForServer.md): 服务器网络包基类
- [ICPackVisitor](./ICPackVisitor.md): 网络包访问者接口
- [PlayerColor](../players/PlayerColor.md): 玩家颜色类型（通过基类）

## 函数注释

- `visitTyped(visitor)`: 重写基类的visitTyped方法，处理特定类型的访问
- `serialize(Handler &h)`: 序列化函数，序列化基类部分（因为EndTurn本身不包含额外字段）