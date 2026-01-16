# AccessibilityInfo类

AccessibilityInfo类是VCMI战斗系统中可访问性信息的表示类，用于跟踪战斗地图中各个格子的可访问性状态。

## 类定义

```cpp
class DLL_LINKAGE AccessibilityInfo
{
    std::array<si8, GameConstants::BFIELD_SIZE> accessibility; // 战场格子可访问性数组
    std::array<si8, GameConstants::BFIELD_SIZE> accessibilityOwner; // 战场格子拥有者数组

public:
    AccessibilityInfo();                                      // 默认构造函数
    void reset();                                             // 重置可访问性信息

    si8 getAccessibility(BattleHex hex) const;                // 获取指定格子的可访问性
    si8 getOwner(BattleHex hex) const;                        // 获取指定格子的拥有者
    bool accessible(BattleHex hex) const;                     // 判断格子是否可访问
    bool accessible(BattleHex hex, ui8 side) const;           // 判断格子是否被指定阵营可访问
    bool occupied(BattleHex hex) const;                       // 判断格子是否被占用
    bool free(BattleHex hex) const;                           // 判断格子是否自由
    bool free(BattleHex hex, ui8 side) const;                 // 判断格子是否对指定阵营自由

    void setAccessible(BattleHex hex, ui8 side);              // 设置格子为指定阵营可访问
    void setOccupied(BattleHex hex, ui8 side);                // 设置格子为指定阵营占用
    void setBlocked(BattleHex hex);                           // 设置格子为阻塞
    void setUnblocked(BattleHex hex);                         // 设置格子为非阻塞

private:
    void updateNeighbours(BattleHex hex);                     // 更新相邻格子的可访问性
};
```

## 功能说明

AccessibilityInfo是VCMI战斗系统中用于管理战场格子可访问性的类。它跟踪战场上每个格子的可访问状态和拥有者信息，这对于寻路算法、单位移动和战斗策略制定至关重要。这个类维护了两个数组，一个表示可访问性，另一个表示拥有者。

## 构造函数

- `AccessibilityInfo()`: 默认构造函数，初始化所有格子为不可访问状态

## 函数注释

- `reset()`: 重置所有格子的可访问性信息为默认状态
- `getAccessibility(hex)`: 获取指定格子的可访问性值
- `getOwner(hex)`: 获取指定格子的拥有者信息
- `accessible(hex)`: 判断指定格子是否可访问
- `accessible(hex, side)`: 判断指定格子是否对特定阵营可访问
- `occupied(hex)`: 判断指定格子是否被占用
- `free(hex)`: 判断指定格子是否自由（未被占用且可访问）
- `free(hex, side)`: 判断指定格子是否对特定阵营自由
- `setAccessible(hex, side)`: 设置指定格子对特定阵营可访问
- `setOccupied(hex, side)`: 设置指定格子被特定阵营占用
- `setBlocked(hex)`: 设置指定格子为阻塞状态
- `setUnblocked(hex)`: 设置指定格子为非阻塞状态
- `updateNeighbours(hex)`: 更新指定格子周围相邻格子的可访问性

## 成员变量

- `accessibility`: 战场格子可访问性数组，索引为格子ID，值表示可访问性状态
- `accessibilityOwner`: 战场格子拥有者数组，索引为格子ID，值表示拥有者阵营

## 设计说明

AccessibilityInfo类是战斗系统中可访问性管理的重要组成部分。通过精确跟踪每个格子的可访问性状态，游戏可以正确处理单位移动、攻击范围计算和战术规划。这个类对于AI决策和玩家界面显示都非常重要。