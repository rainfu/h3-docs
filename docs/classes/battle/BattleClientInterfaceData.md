# BattleClientInterfaceData类

BattleClientInterfaceData类是VCMI战斗系统中客户端界面数据的封装类，用于管理战斗客户端界面所需的数据。

## 类定义

```cpp
class DLL_LINKAGE BattleClientInterfaceData
{
    std::shared_ptr<battle::IClientBattleCallback> battleCb;  // 战斗回调接口
    std::shared_ptr<battle::IGuiInterface> guiInterface;      // GUI界面接口

public:
    BattleClientInterfaceData();                             // 默认构造函数
    BattleClientInterfaceData(
        std::shared_ptr<battle::IClientBattleCallback> battleCb,
        std::shared_ptr<battle::IGuiInterface> guiInterface
    );                                                       // 带参数构造函数

    void setBattleCb(std::shared_ptr<battle::IClientBattleCallback> cb);  // 设置战斗回调
    void setGuiInterface(std::shared_ptr<battle::IGuiInterface> iface);   // 设置GUI接口

    std::shared_ptr<battle::IClientBattleCallback> getBattleCb() const;   // 获取战斗回调
    std::shared_ptr<battle::IGuiInterface> getGuiInterface() const;       // 获取GUI接口
};
```

## 功能说明

BattleClientInterfaceData是VCMI战斗系统中用于封装客户端界面数据的类。它持有战斗回调接口和GUI界面接口的共享指针，为战斗客户端提供必要的数据和接口访问。这个类的主要目的是整合战斗逻辑和界面显示所需的数据，简化客户端代码的复杂度。

## 构造函数

- `BattleClientInterfaceData()`: 默认构造函数，初始化所有指针为nullptr
- `BattleClientInterfaceData(battleCb, guiInterface)`: 带参数构造函数，接收战斗回调接口和GUI界面接口

## 函数注释

- `setBattleCb(cb)`: 设置战斗回调接口
- `setGuiInterface(iface)`: 设置GUI界面接口
- `getBattleCb()`: 获取战斗回调接口
- `getGuiInterface()`: 获取GUI界面接口

## 成员变量

- `battleCb`: 战斗回调接口的共享指针
- `guiInterface`: GUI界面接口的共享指针

## 设计说明

BattleClientInterfaceData类是战斗系统客户端部分的重要组成部分，它起到了桥梁的作用，连接了战斗逻辑层和界面显示层。通过使用共享指针，该类确保了接口对象的生命周期管理，避免了悬空指针的问题。这种设计模式使得战斗客户端代码更加模块化和易于维护。