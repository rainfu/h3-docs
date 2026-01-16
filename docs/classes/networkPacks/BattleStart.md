# BattleStart结构

BattleStart结构是VCMI中表示战斗开始的网络包。

## 类定义

```cpp
struct DLL_LINKAGE BattleStart : public CPackForClient
{
    BattleID battleID = BattleID::NONE;
    std::unique_ptr<BattleInfo> info;

    void visitTyped(ICPackVisitor & visitor) override;

    template <typename Handler> void serialize(Handler & h)
    {
        h & battleID;
        h & info;
        assert(battleID != BattleID::NONE);
    }
};
```

## 功能说明

BattleStart是VCMI网络包系统中表示战斗开始的网络包。当游戏中即将发生战斗时，服务器会发送此包给客户端，通知战斗即将开始并提供战斗的初始信息。该包包含了战斗的唯一ID和战斗详细信息，使客户端能够正确显示战斗界面和准备战斗相关的UI元素。

## 依赖关系

- [CPackForClient](./CPackForClient.md): 客户端网络包基类
- [ICPackVisitor](./ICPackVisitor.md): 网络包访问者接口
- [BattleID](../battle/BattleID.md): 战斗ID类型
- [BattleInfo](../battle/BattleInfo.md): 战斗信息类
- STL库: unique_ptr

## 函数注释

- `visitTyped(visitor)`: 重写基类的visitTyped方法，处理特定类型的访问
- `serialize(Handler &h)`: 序列化函数，序列化战斗ID和战斗信息

## 成员变量说明

- `battleID`: 战斗的唯一标识符，默认为BattleID::NONE
- `info`: 战斗信息的独占指针，包含战斗的详细信息