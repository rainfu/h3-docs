# CSimpleArmy

## 概述

`CSimpleArmy` 类实现了VCMI中简化军队系统的核心功能。与复杂的CCreatureSet相比，CSimpleArmy提供了一个轻量级的军队表示，适合不需要完整生物堆栈功能的情况，如地图对象的守护军队或简单军队配置。

## 主要组件

### IArmyDescriptor 接口

军队描述符接口，定义了军队的基本操作。

#### 纯虚方法

```cpp
virtual void clearSlots() = 0;
```

清除所有军队槽位。

```cpp
virtual bool setCreature(SlotID slot, CreatureID cre, TQuantity count) = 0;
```

在指定槽位设置生物和数量。

### CSimpleArmy 类

简化军队类，实现IArmyDescriptor接口。

#### 主要属性

- `army`: 军队槽位映射 (SlotID -> (CreatureID, TQuantity))

#### 类型定义

```cpp
using TSimpleSlots = std::map<SlotID, std::pair<CreatureID, TQuantity>>;
```

简化槽位类型定义。

#### 核心方法

```cpp
void clearSlots() override;
```

清除所有军队槽位。

```cpp
bool setCreature(SlotID slot, CreatureID cre, TQuantity count) override;
```

在指定槽位设置生物和数量。断言槽位未被占用。

```cpp
operator bool() const;
```

布尔转换操作符，如果军队不为空则返回true。

## 机制说明

### 简化设计

1. **轻量级**: 不包含完整的生物堆栈功能
2. **固定映射**: 使用std::map存储槽位到生物的映射
3. **基本操作**: 只提供最基本的军队操作
4. **内存效率**: 内存占用比CCreatureSet小

### 槽位管理

1. **唯一槽位**: 每个槽位只能放置一种生物
2. **数量指定**: 每个槽位有固定的生物数量
3. **断言检查**: 确保槽位不被重复使用
4. **批量清除**: 可以一次性清除所有槽位

### 布尔语义

1. **空检查**: 通过operator bool()检查军队是否为空
2. **条件判断**: 方便在条件语句中使用
3. **存在验证**: 验证军队配置是否存在

## 依赖关系

- **SlotID**: 槽位ID类型
- **CreatureID**: 生物ID类型
- **TQuantity**: 数量类型
- **GameConstants**: 游戏常量

## 使用示例

### 创建简化军队

```cpp
#include "CSimpleArmy.h"

// 创建简化军队实例
CSimpleArmy simpleArmy;

// 添加生物到军队
simpleArmy.setCreature(SlotID(0), CreatureID::GOBLIN, 10);     // 10个哥布林
simpleArmy.setCreature(SlotID(1), CreatureID::ORC, 5);         // 5个兽人
simpleArmy.setCreature(SlotID(2), CreatureID::WOLF_RIDER, 3);  // 3个狼骑兵
```

### 检查军队状态

```cpp
#include "CSimpleArmy.h"

// 检查军队是否为空
if (simpleArmy)
{
    // 军队不为空，有生物
    std::cout << "Army has " << simpleArmy.army.size() << " creature types" << std::endl;
}
else
{
    // 军队为空
    std::cout << "Army is empty" << std::endl;
}
```

### 遍历军队

```cpp
#include "CSimpleArmy.h"

// 遍历所有军队槽位
for (const auto & slot : simpleArmy.army)
{
    SlotID slotId = slot.first;
    CreatureID creature = slot.second.first;
    TQuantity count = slot.second.second;
    
    std::cout << "Slot " << slotId << ": " << count << " " 
              << creature.toCreature()->getName() << std::endl;
}
```

### 清除军队

```cpp
#include "CSimpleArmy.h"

// 清除所有军队
simpleArmy.clearSlots();

// 现在军队为空
assert(!simpleArmy);
```

### 序列化

```cpp
#include "CSimpleArmy.h"

// 序列化军队
JsonSerializer serializer;
simpleArmy.serialize(serializer);

// 反序列化
JsonDeserializer deserializer;
CSimpleArmy loadedArmy;
loadedArmy.serialize(deserializer);
```

### 与完整军队系统的比较

```cpp
#include "CSimpleArmy.h"
#include "CCreatureSet.h"

// 简化军队 - 轻量级，适合简单场景
CSimpleArmy simpleArmy;
simpleArmy.setCreature(SlotID(0), CreatureID::PEASANT, 100);

// 完整军队 - 功能丰富，支持升级、经验等
CCreatureSet fullArmy;
auto stack = fullArmy.getStackPtr(SlotID(0));
if (stack)
{
    stack->setType(CreatureID::PEASANT);
    stack->setAmount(100);
    // 可以设置经验、等级等
}
```

## 性能特性

- **内存效率**: 比CCreatureSet占用更少内存
- **操作速度**: 基本操作非常快速
- **序列化**: 简单的序列化开销
- **遍历性能**: std::map的遍历性能

## 实现注意事项

1. **槽位唯一性**: 确保每个槽位只放置一种生物
2. **数量验证**: 验证生物数量的合理性
3. **内存管理**: 注意std::map的内存使用
4. **断言使用**: 正确使用断言确保数据一致性

## 相关文档

- [CCreatureSet](CCreatureSet.md) - 完整生物集合类
- [CArmedInstance](CArmedInstance.md) - 武装实例基类
- [CStackInstance](CStackInstance.md) - 生物堆栈实例