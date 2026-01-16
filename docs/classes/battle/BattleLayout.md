# BattleLayout结构体

BattleLayout结构体是VCMI战斗系统中战斗布局的定义，用于表示战斗中单位、攻城器械和指挥官的初始位置安排。

## 结构定义

```cpp
struct DLL_EXPORT BattleLayout
{
    // 使用类型别名定义不同类型的数组
    using UnitsArrayType = BattleSideArray<std::array<BattleHex, GameConstants::ARMY_SIZE>>;      // 单位数组类型
    using MachinesArrayType = BattleSideArray<std::array<BattleHex, 4>>;                         // 攻城器械数组类型
    using CommanderArrayType = BattleSideArray<BattleHex>;                                       // 指挥官数组类型

    UnitsArrayType units;           // 单位布局数组，按战斗阵营划分
    MachinesArrayType warMachines;  // 攻城器械布局数组，按战斗阵营划分
    CommanderArrayType commanders;  // 指挥官布局数组，按战斗阵营划分

    bool tacticsAllowed = false;    // 是否允许战术阶段
    bool obstaclesAllowed = false;  // 是否允许障碍物

    // 静态方法
    static BattleLayout createDefaultLayout(const IGameInfoCallback & gameInfo, 
                                           const CArmedInstance * attacker, 
                                           const CArmedInstance * defender); // 创建默认布局
    static BattleLayout createLayout(const IGameInfoCallback & gameInfo, 
                                    const std::string & layoutName, 
                                    const CArmedInstance * attacker, 
                                    const CArmedInstance * defender);        // 创建指定布局
};
```

## 功能说明

BattleLayout是VCMI战斗系统中用于定义战斗初始布局的结构体。它定义了战斗开始时单位、攻城器械和指挥官在战场上的位置安排。布局信息对于战斗的初始状态设置至关重要，它决定了战斗开始时各方单位的部署位置。

## 类型别名

- `UnitsArrayType`: 单位数组类型，为每个战斗阵营分配了ARMY_SIZE个战场六边形位置
- `MachinesArrayType`: 攻城器械数组类型，为每个战斗阵营分配了4个战场六边形位置
- `CommanderArrayType`: 指挥官数组类型，为每个战斗阵营分配了一个战场六边形位置

## 成员变量

- `units`: 单位布局数组，存储双方军队单位的初始位置
- `warMachines`: 攻城器械布局数组，存储双方攻城器械的初始位置
- `commanders`: 指挥官布局数组，存储双方指挥官的初始位置
- `tacticsAllowed`: 布尔值，默认为false，指示战斗是否允许战术阶段
- `obstaclesAllowed`: 布尔值，默认为false，指示战斗场地是否允许障碍物

## 静态方法

- `createDefaultLayout(gameInfo, attacker, defender)`: 根据提供的游戏信息和攻防双方创建默认战斗布局
- `createLayout(gameInfo, layoutName, attacker, defender)`: 根据指定的布局名称创建特定的战斗布局

## 设计说明

BattleLayout结构体是战斗系统中布局管理的核心组件，它将战斗中的不同实体（单位、攻城器械、指挥官）的位置信息组织在一起。通过使用BattleSideArray模板，该结构体能够清晰地区分攻守双方的位置安排，为战斗初始化提供了统一的接口。