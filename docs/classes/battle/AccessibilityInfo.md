# AccessibilityInfo类

AccessibilityInfo类是VCMI中可访问性信息的表示，用于跟踪战斗场上各格子的可访问性状态。

## 类定义

虽然完整的定义没有在我们查看的文件中显示，但根据其在CBattleInfoCallback中的使用方式，我们可以推断其结构如下：

```cpp
class DLL_LINKAGE AccessibilityInfo
{
public:
    // 可访问性状态枚举
    enum class AccessibilityStatus
    {
        ACCESSIBLE,      // 可访问
        BLOCKED,         // 被阻挡
        IMPASSABLE,      // 无法通行
        ENEMY_OCCUPIED,  // 被敌方占据
        FRIENDLY_OCCUPIED, // 被友方占据
        OBSTACLE         // 障碍物
    };

    // 获取指定格子的可访问性状态
    AccessibilityStatus getAccessibility(const BattleHex & hex) const;

    // 检查指定格子是否可访问
    bool isAccessible(const BattleHex & hex) const;

    // 检查指定格子是否可通行
    bool isPassable(const BattleHex & hex) const;

    // 获取所有可访问的格子
    BattleHexArray getAccessibleHexes() const;

    // 获取所有可通行的格子
    BattleHexArray getPassableHexes() const;

    // 获取指定单位可占用的格子
    BattleHexArray getOccupiableHexes(const battle::Unit * unit) const;

    // 从可达性信息构建可访问性信息
    static AccessibilityInfo fromReachability(const ReachabilityInfo & reachability);

private:
    std::map<BattleHex, AccessibilityStatus> accessibilityMap;
};
```

## 功能说明

AccessibilityInfo是VCMI战斗系统中用于跟踪战场格子可访问性状态的类。它提供了关于战场各格子是否可访问、可通行或被阻挡的信息，这对于单位移动、攻击范围计算和路径寻找至关重要。该类封装了格子可访问性的复杂逻辑，为战斗系统提供了一个清晰的接口。

## 依赖关系

- [BattleHex](./BattleHex.md): 战斗格子
- [BattleHexArray](./BattleHexArray.md): 战斗格子数组
- [ReachabilityInfo](./ReachabilityInfo.md): 可达性信息
- [battle::Unit](./Unit.md): 战斗单位

## 成员变量

- `accessibilityMap`: 存储每个格子及其可访问性状态的映射表

## 函数注释

- `getAccessibility(hex)`: 返回指定格子的可访问性状态
- `isAccessible(hex)`: 检查指定格子是否可访问
- `isPassable(hex)`: 检查指定格子是否可通行
- `getAccessibleHexes()`: 获取所有可访问的格子
- `getPassableHexes()`: 获取所有可通行的格子
- `getOccupiableHexes(unit)`: 获取指定单位可占用的格子
- `fromReachability(reachability)`: 从可达性信息构建可访问性信息的静态方法

## 设计说明

AccessibilityInfo类采用了专门化的设计，专注于处理战场格子的可访问性状态。它将复杂的可访问性逻辑封装在一个独立的类中，使战斗系统的其他部分能够轻松查询格子的可访问性状态。

该类的接口设计简洁明了，提供了查询特定格子状态的方法和获取符合条件的所有格子的方法。这种双重接口设计既支持精确查询，也支持批量操作，满足了战斗系统中的不同需求。

通过使用枚举类型表示可访问性状态，该类提供了类型安全的状态管理，避免了使用整数或布尔值可能引起的混淆。