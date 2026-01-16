# ReachabilityInfo类

ReachabilityInfo类是VCMI战斗系统中用于表示可达性信息的结构体，用于计算战斗场上单位的移动路径和可达性，基于广度优先搜索(BFS)算法的结果。

## 类定义

```cpp
struct DLL_LINKAGE ReachabilityInfo
{
    using TDistances = std::array<uint32_t, GameConstants::BFIELD_SIZE>;    // 距离数组类型
    using TPredecessors = std::array<BattleHex, GameConstants::BFIELD_SIZE>; // 前驱节点数组类型

    enum { INFINITE_DIST = 1000000 }; // 无穷大距离常量

    struct DLL_LINKAGE Parameters // 参数结构体
    {
        BattleSide side = BattleSide::NONE;              // 战斗方
        bool doubleWide = false;                         // 是否双宽单位
        bool flying = false;                             // 是否飞行单位
        bool ignoreKnownAccessible = false;              // 是否忽略已知可达位置的障碍
        bool bypassEnemyStacks = false;                  // 是否绕过敌方堆栈
        const BattleHexArray * knownAccessible;          // 已知可达的位置数组
        TBattlefieldTurnsArray destructibleEnemyTurns;   // 摧毁敌方单位所需的回合数

        BattleHex startPosition;                         // 起始位置
        BattleSide perspective = BattleSide::ALL_KNOWING; // 视角（全知视角）

        Parameters();                                    // 默认构造函数
        Parameters(const battle::Unit * Stack, const BattleHex & StartPosition); // 带参数构造函数
    };

    Parameters params;                                  // 参数
    AccessibilityInfo accessibility;                    // 可达性信息
    TDistances distances;                               // 距离数组
    TPredecessors predecessors;                         // 前驱节点数组

    ReachabilityInfo();                                 // 构造函数

    bool isReachable(const BattleHex & hex) const;      // 检查六边形是否可达

    uint32_t distToNearestNeighbour(
        const BattleHexArray & targetHexes,
        BattleHex * chosenHex = nullptr) const;         // 计算到最近邻居的距离

    uint32_t distToNearestNeighbour(
        const battle::Unit * attacker,
        const battle::Unit * defender,
        BattleHex * chosenHex = nullptr) const;         // 计算攻击者到防御者最近邻居的距离
};
```

## 功能说明

ReachabilityInfo是VCMI战斗系统中用于表示可达性信息的结构体，它基于广度优先搜索(BFS)算法计算得出。该结构体依赖于单位（所有者、是否飞行）、起始位置和视角等因素，用于确定战斗场上单位可以移动到哪些位置以及移动所需的距离。

## 类型别名

- `TDistances`: 表示距离数组，使用uint32_t类型的数组，大小为GameConstants::BFIELD_SIZE
- `TPredecessors`: 表示前驱节点数组，使用BattleHex类型的数组，大小为GameConstants::BFIELD_SIZE

## 枚举常量

- `INFINITE_DIST`: 无穷大距离常量，值为1000000，用于表示不可达的位置

## 参数结构体 (Parameters)

### 成员变量

- `side`: 战斗方，表示当前计算的单位属于哪一方
- `doubleWide`: 布尔值，表示单位是否为双宽（占据两个格子）
- `flying`: 布尔值，表示单位是否为飞行单位
- `ignoreKnownAccessible`: 布尔值，表示是否忽略已知可达位置的障碍
- `bypassEnemyStacks`: 布尔值，表示是否绕过敌方堆栈
- `knownAccessible`: 指向BattleHexArray的指针，表示已知可达的位置数组
- `destructibleEnemyTurns`: 摧毁敌方单位所需的回合数数组
- `startPosition`: 起始位置，表示单位的假设起始位置
- `perspective`: 视角，表示计算可达性的视角（默认为全知视角）

### 构造函数

- `Parameters()`: 默认构造函数，将destructibleEnemyTurns数组填充为-1
- `Parameters(Stack, StartPosition)`: 带参数构造函数，根据单位和起始位置初始化参数

## 函数注释

- `isReachable(hex)`: 检查指定的战场六边形是否可达，返回布尔值
- `distToNearestNeighbour(targetHexes, chosenHex)`: 计算到目标六边形数组中最接近邻居的距离，如果chosenHex不为nullptr，则将选择的六边形存储在其中
- `distToNearestNeighbour(attacker, defender, chosenHex)`: 计算攻击者到防御者最接近邻居的距离，如果chosenHex不为nullptr，则将选择的六边形存储在其中

## 成员变量

- `params`: 参数对象，包含计算可达性所需的各种参数
- `accessibility`: AccessibilityInfo对象，提供可达性信息
- `distances`: 距离数组，存储到各个战场位置的距离
- `predecessors`: 前驱节点数组，用于重构路径

## 设计说明

ReachabilityInfo结构体是战斗路径计算系统的核心组件，它封装了BFS算法的计算结果，使得系统可以高效地确定单位在战场上的移动选项。通过将计算结果存储在结构体中，系统可以避免重复计算，提高性能。

该结构体考虑了多种因素，如单位的移动特性（飞行、双宽）、战斗方、视角等，确保计算结果符合实际情况。它在AI决策、移动路径规划和用户界面提示等方面发挥重要作用。