# UpgradeInfo

## 概述

`UpgradeInfo` 类管理生物升级信息，包括可用的升级选项、升级成本和升级状态。该类用于表示特定生物可以升级到的目标生物类型及其相应的资源成本。

## 主要属性

- `oldID`: 要升级的生物ID (CreatureID)
- `upgradesIDs`: 可能的升级生物ID列表 (small_vector<CreatureID, 4>)
- `upgradesCosts`: 对应每个升级的资源成本 (small_vector<ResourceSet, 4>)
- `isAvailable`: 升级是否可用标志

## 核心方法

```cpp
UpgradeInfo(CreatureID base);
```

构造函数，指定要升级的基础生物ID。

```cpp
const boost::container::small_vector<CreatureID, 4> & getAvailableUpgrades() const;
```

获取所有可用的升级选项。如果升级不可用或没有升级选项，返回空列表。

```cpp
const CreatureID & getUpgrade() const;
```

获取最后一个（通常是最好的）升级选项。

```cpp
const ResourceSet & getUpgradeCostsFor(CreatureID id) const;
```

获取指定升级生物的资源成本。

```cpp
const boost::container::small_vector<ResourceSet, 4> & getAvailableUpgradeCosts() const;
```

获取所有可用升级的资源成本列表。

```cpp
const ResourceSet & getUpgradeCosts() const;
```

获取最后一个升级选项的资源成本。

```cpp
bool canUpgrade() const;
```

检查是否可以进行升级（有升级选项且升级可用）。

```cpp
bool hasUpgrades() const;
```

检查是否有任何升级选项（不考虑可用性）。

```cpp
void addUpgrade(const CreatureID & upgradeID, const Creature * creature, int costPercentageModifier = 100);
```

添加新的升级选项，确保对齐和排序顺序。

```cpp
auto size() const;
```

返回可用升级的数量。

## 依赖关系

- **EntityIdentifiers.h**: 实体标识符定义
- **ResourceSet.h**: 资源集合类
- **boost/container/small_vector.hpp**: Boost小型向量容器
- **Creature**: 生物类（用于addUpgrade方法）

## 使用示例

### 创建升级信息

```cpp
#include "UpgradeInfo.h"

// 为生物ID 10创建升级信息
CreatureID baseCreature = CreatureID(10);
UpgradeInfo upgradeInfo(baseCreature);
```

### 添加升级选项

```cpp
#include "UpgradeInfo.h"

// 添加升级选项，成本为默认的100%
upgradeInfo.addUpgrade(upgradedCreatureID, creaturePtr);

// 添加升级选项，自定义成本百分比
upgradeInfo.addUpgrade(upgradedCreatureID, creaturePtr, 80); // 80%成本
```

### 检查和获取升级信息

```cpp
#include "UpgradeInfo.h"

// 检查是否可以升级
if (upgradeInfo.canUpgrade()) {
    // 获取可用升级
    const auto& upgrades = upgradeInfo.getAvailableUpgrades();

    for (size_t i = 0; i < upgrades.size(); ++i) {
        CreatureID upgradeID = upgrades[i];
        const ResourceSet& cost = upgradeInfo.getUpgradeCostsFor(upgradeID);

        // 处理每个升级选项
    }
}

// 获取最佳升级
if (upgradeInfo.hasUpgrades()) {
    CreatureID bestUpgrade = upgradeInfo.getUpgrade();
    const ResourceSet& cost = upgradeInfo.getUpgradeCosts();
}
```

### 获取升级数量

```cpp
#include "UpgradeInfo.h"

// 获取可用升级的数量
size_t numUpgrades = upgradeInfo.size();
```

## 性能特性

- **内存使用**: 使用小型向量优化小容量存储，减少内存分配
- **访问效率**: 直接访问成员变量，无额外计算开销
- **查找效率**: 通过索引直接访问特定升级的成本

## 实现注意事项

1. **成本计算**: 升级成本基于单个单位，而不是整个生物堆栈
2. **可用性控制**: isAvailable标志可以禁用某些升级（如特定模组的限制）
3. **排序保证**: addUpgrade方法确保升级按特定顺序排列
4. **空对象模式**: 不可用的升级返回空列表而不是nullptr

## 相关文档

- [Creature](../entities/Creature.md) - 生物类
- [ResourceSet](../ResourceSet.md) - 资源集合类