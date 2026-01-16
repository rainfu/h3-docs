# SiegeInfo结构体

SiegeInfo结构体是VCMI战斗系统中用于表示围城战信息的结构体，专门用于跟踪城堡或城镇围攻战中的城墙和城门状态。

## 类定义

```cpp
struct DLL_LINKAGE SiegeInfo
{
    std::map<EWallPart, EWallState> wallState;  // 城墙各部分的状态映射
    EGateState gateState;                       // 城门状态

    SiegeInfo();                                // 构造函数

    // 根据伤害值减少城墙状态
    static EWallState applyDamage(EWallState state, unsigned int value);

    template <typename Handler> void serialize(Handler &h); // 序列化函数
};
```

## 功能说明

SiegeInfo是VCMI战斗系统中用于表示围城战状态的结构体，主要用于跟踪城堡或城镇围攻战中城墙各部分和城门的状态。在围攻战中，城墙的不同部分可能会受到不同程度的破坏，该结构体负责记录这些状态变化。

## 成员变量

- `wallState`: 城墙各部分的状态映射表，使用[EWallPart](file:///e:/develop/heroes/vcmi-assets/docs/classes/battle/EWallPart.md)作为键，[EWallState](file:///e:/develop/heroes/vcmi-assets/docs/classes/battle/EWallPart.md)作为值，记录城墙不同部分的损坏程度
- `gateState`: 城门的当前状态，表示城门的完整性

## 函数注释

- `SiegeInfo()`: 默认构造函数，初始化围城信息
- `applyDamage(state, value)`: 静态方法，根据指定的伤害值减少城墙状态，返回新的城墙状态
- `serialize(h)`: 模板方法，用于序列化/反序列化结构体数据，支持数据的保存和加载

## 设计说明

SiegeInfo结构体是围攻战系统的核心组件，它专门用于处理城堡或城镇围攻战中的城墙和城门状态。在围攻战中，城墙的不同部分（如塔楼、城墙段、城门等）可能会受到不同程度的破坏，该结构体提供了一种统一的方式来跟踪这些状态变化。

该结构体只在[BattleInfo](file:///e:/develop/heroes/vcmi-assets/docs/classes/battle/BattleInfo.md)中使用，这意味着它专门用于围攻战场景。`applyDamage`静态方法提供了一种标准的方式来计算城墙受到伤害后的状态，这有助于保持游戏逻辑的一致性。

通过使用map来存储城墙各部分的状态，该结构体能够灵活地处理不同部分的差异化损坏，为围攻战提供了细致的状态跟踪。