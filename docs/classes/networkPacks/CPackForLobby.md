# CPackForLobby类

CPackForLobby类是VCMI中用于大厅（lobby）的网络包的基类。

## 类定义

```cpp
struct DLL_LINKAGE CPackForLobby : public CPack
{
    virtual bool isForServer() const;

protected:
    void visitBasic(ICPackVisitor & cpackVisitor) override;
};
```

## 功能说明

CPackForLobby是VCMI网络包系统中专门用于大厅（lobby）通信的网络包的基类。它继承自CPack，为所有大厅相关的网络包提供了共同的结构和行为。这类网络包通常涉及游戏房间管理、玩家加入/离开、游戏设置等大厅功能。

## 依赖关系

- [CPack](./CPack.md): 网络包基类
- [ICPackVisitor](./ICPackVisitor.md): 网络包访问者接口

## 函数注释

- `isForServer()`: 虚函数，判断此包是否发送给服务器
- `visitBasic(cpackVisitor)`: 重写基类的visitBasic方法，处理大厅网络包的基本访问逻辑