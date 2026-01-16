# BattleClientInterfaceData结构

BattleClientInterfaceData结构是VCMI中战斗客户端界面数据的表示，用于存储客户端战斗界面相关的数据。

## 类定义

```cpp
struct DLL_LINKAGE BattleClientInterfaceData
{
    std::vector<SpellID> creatureSpellsToCast;
    ui8 tacticsMode;
};
```

## 功能说明

BattleClientInterfaceData是VCMI战斗系统中用于存储客户端界面相关数据的结构体。它包含客户端在战斗过程中需要处理的信息，如生物要施放的法术列表和战术模式状态。这个结构在客户端和服务器之间的通信中起重要作用，确保战斗界面能够正确显示当前状态。

## 依赖关系

- STL库: vector
- [SpellID](../identifiers/SpellID.md): 法术ID类型

## 成员变量

- `creatureSpellsToCast`: 存储生物将要施放的法术ID列表，这是一个向量容器，包含多个SpellID
- `tacticsMode`: 存储战术模式状态，使用ui8（8位无符号整数）表示当前的战术模式

## 设计说明

BattleClientInterfaceData结构是VCMI战斗系统中客户端与服务器通信的重要数据结构之一。它专门为战斗客户端界面设计，包含了客户端在战斗过程中需要处理的关键信息。

creatureSpellsToCast成员允许客户端提前知道生物将要施放的法术，从而可以准备相应的动画和界面反馈。tacticsMode成员则用于指示当前战斗是否处于战术阶段，这对于正确显示战斗界面和处理用户输入至关重要。

这个结构体现了VCMI客户端-服务器架构的设计理念，将客户端特定的数据与核心战斗逻辑分离，确保了系统的模块化和可维护性。