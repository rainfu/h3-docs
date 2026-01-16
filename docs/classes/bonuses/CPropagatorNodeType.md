# CPropagatorNodeType类

CPropagatorNodeType类是VCMI奖励系统中传播器节点类型的定义，用于确定奖励如何在节点树中传播。

## 类定义

```cpp
class DLL_LINKAGE CPropagatorNodeType
{
public:
    enum EPropagationType
    {
        GLOBAL,      // 全局传播：奖励影响整个游戏世界
        PLAYER,      // 玩家传播：奖励只影响特定玩家
        ALLIANCE,    // 联盟传播：奖励影响整个联盟
        BATTLE,      // 战斗传播：奖励只在战斗中生效
        COMMANDER,   // 指挥官传播：奖励只影响指挥官生物
        UNIT,        // 单位传播：奖励只影响特定单位
        STACK,       // 堆栈传播：奖励影响整个堆栈
        CREATURE,    // 生物传播：奖励影响特定生物类型
        TOWN,        // 城镇传播：奖励影响特定城镇
        HERO,        // 英雄传播：奖励影响特定英雄
        ARTIFACT,    // 神器传播：奖励影响神器相关
        SPELL,       // 法术传播：奖励影响法术相关
        SKILL        // 技能传播：奖励影响技能相关
    };

    EPropagationType propagationType;  // 传播类型
    std::optional<PlayerColor> player; // 玩家颜色（可选）
    std::optional<FactionID> faction;  // 派系ID（可选）
    std::optional<TerrainId> terrain;  // 地形ID（可选）

    CPropagatorNodeType();                                    // 默认构造函数
    explicit CPropagatorNodeType(EPropagationType type);      // 用传播类型构造
    CPropagatorNodeType(EPropagationType type, 
                        std::optional<PlayerColor> p = std::nullopt,
                        std::optional<FactionID> f = std::nullopt,
                        std::optional<TerrainId> t = std::nullopt); // 完整构造函数

    bool operator==(const CPropagatorNodeType & other) const; // 相等比较运算符
    bool operator<(const CPropagatorNodeType & other) const;  // 小于比较运算符（用于排序）
    
    std::string toString() const;                             // 转换为字符串表示
};
```

## 功能说明

CPropagatorNodeType是VCMI奖励系统中用于定义奖励传播范围的类。它确定了奖励如何在节点树中传播，以及奖励的影响范围。不同的传播类型会影响不同级别的游戏对象，从全局到具体的单位或生物。

## 枚举值

- `GLOBAL`: 全局传播，影响整个游戏世界的对象
- `PLAYER`: 影响特定玩家的所有对象
- `ALLIANCE`: 影响整个联盟的玩家
- `BATTLE`: 仅在战斗中生效
- `COMMANDER`: 仅影响指挥官生物
- `UNIT`: 仅影响特定单位
- `STACK`: 影响整个堆栈（同一格子内的生物）
- `CREATURE`: 影响特定生物类型
- `TOWN`: 影响特定城镇
- `HERO`: 影响特定英雄
- `ARTIFACT`: 影响神器相关
- `SPELL`: 影响法术相关
- `SKILL`: 影响技能相关

## 构造函数

- `CPropagatorNodeType()`: 默认构造函数，初始化为GLOBAL类型
- `CPropagatorNodeType(type)`: 用传播类型构造
- `CPropagatorNodeType(type, player, faction, terrain)`: 完整构造函数，允许指定传播类型和可选参数

## 函数注释

- `operator==`: 比较两个传播器节点类型是否相等
- `operator<`: 比较两个传播器节点类型的大小，用于排序和存储
- `toString()`: 返回传播器节点类型的字符串表示，便于调试和日志记录

## 成员变量

- `propagationType`: 传播类型
- `player`: 可选的玩家颜色，用于PLAYER和ALLIANCE类型
- `faction`: 可选的派系ID，用于派系相关类型
- `terrain`: 可选的地形ID，用于地形相关类型

## 设计说明

CPropagatorNodeType类是奖励系统中重要的组成部分，它定义了奖励的传播方式和范围。通过明确的传播类型，游戏可以精确控制奖励的影响范围，从而实现复杂的游戏机制和平衡性设计。