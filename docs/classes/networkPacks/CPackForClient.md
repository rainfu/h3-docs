# CPackForClient类

CPackForClient类是VCMI中发送到客户端的网络包的基类。

## 类定义

```cpp
struct DLL_LINKAGE CPackForClient : public CPack
{
protected:
    void visitBasic(ICPackVisitor & cpackVisitor) override;
};
```

## 功能说明

CPackForClient是VCMI网络包系统中专门用于发送到客户端的网络包的基类。它继承自CPack，为所有发送到客户端的网络包提供了共同的结构和行为。这类网络包通常包含游戏状态更新、界面更新等需要发送给客户端的信息。

## 依赖关系

- [CPack](./CPack.md): 网络包基类
- [ICPackVisitor](./ICPackVisitor.md): 网络包访问者接口

## 函数注释

- `visitBasic(cpackVisitor)`: 重写基类的visitBasic方法，处理客户端网络包的基本访问逻辑