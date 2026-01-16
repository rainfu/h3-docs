# TownBuildingInstance

## 概述

`TownBuildingInstance` 类实现了VCMI中城镇建筑作为地图对象的机制。城镇建筑可以被视为独立的地图对象，支持访问、奖励等功能。该系统允许城镇建筑具有超出基础建筑功能的特殊行为。

## 主要组件

### TownBuildingInstance 类

城镇建筑实例基类，继承自IObjectInterface。

#### 主要属性

- `town`: 指向所属城镇的指针
- `bID`: 建筑ID

#### 核心方法

```cpp
TownBuildingInstance(CGTownInstance * town, const BuildingID & index);
TownBuildingInstance(IGameInfoCallback *cb);
```

构造函数。

```cpp
const BuildingID & getBuildingType() const;
```

获取建筑类型ID。

```cpp
PlayerColor getOwner() const override;
```

获取建筑拥有者（城镇拥有者）。

```cpp
MapObjectID getObjGroupIndex() const override;
MapObjectSubID getObjTypeIndex() const override;
```

获取对象组和类型索引。

```cpp
const IOwnableObject * asOwnable() const override;
```

转换为可拥有对象接口。

```cpp
int3 visitablePos() const override;
int3 anchorPos() const override;
```

获取可访问位置和锚点位置。

### TownRewardableBuildingInstance 类

可奖励的城镇建筑实例，继承自TownBuildingInstance和Rewardable::Interface。

#### 主要属性

- `selectedReward`: 玩家选择的奖励ID（不序列化）
- `visitors`: 访问者ID集合

#### 核心方法

```cpp
void onHeroVisit(IGameEventCallback & gameEvents, const CGHeroInstance * h) const override;
```

英雄访问建筑时的处理逻辑。

```cpp
bool wasVisited(const CGHeroInstance * contextHero) const override;
bool wasVisited(PlayerColor player) const override;
```

检查访问状态。

```cpp
void markAsVisited(IGameEventCallback & gameEvents, const CGHeroInstance * hero) const override;
void markAsScouted(IGameEventCallback & gameEvents, const CGHeroInstance * hero) const override;
```

标记访问和侦察状态。

```cpp
void newTurn(IGameEventCallback & gameEvents, IGameRandomizer & gameRandomizer) const override;
```

新回合处理，可能重置奖励。

```cpp
void heroLevelUpDone(IGameEventCallback & gameEvents, const CGHeroInstance *hero) const override;
```

英雄升级完成后的奖励处理。

```cpp
void blockingDialogAnswered(IGameEventCallback & gameEvents, const CGHeroInstance *hero, int32_t answer) const override;
```

阻塞对话框回答处理。

#### 保护方法

```cpp
bool wasVisitedBefore(const CGHeroInstance * contextHero) const override;
```

检查是否已被访问（使用非玩家可见信息）。

```cpp
void grantReward(IGameEventCallback & gameEvents, ui32 rewardID, const CGHeroInstance * hero) const override;
```

授予指定奖励。

```cpp
Rewardable::Configuration generateConfiguration(IGameRandomizer & gameRandomizer) const;
```

生成奖励配置。

```cpp
void assignBonuses(std::vector<std::shared_ptr<Bonus>> & bonuses) const;
```

分配奖励加成。

```cpp
const IObjectInterface * getObject() const override;
```

获取对象接口。

## 机制说明

### 建筑对象化

1. **独立对象**: 城镇建筑可以作为独立地图对象存在
2. **位置管理**: 每个建筑有自己的可访问位置
3. **所有权继承**: 建筑拥有者与城镇拥有者一致
4. **类型映射**: 建筑ID映射到对象类型

### 奖励系统集成

1. **可选奖励**: 某些建筑可以提供额外奖励
2. **访问跟踪**: 记录哪些英雄访问过建筑
3. **奖励配置**: 动态生成奖励配置
4. **状态重置**: 新回合可以重置奖励状态

### 访问控制

1. **英雄特定**: 可以根据特定英雄的状态决定奖励
2. **玩家可见性**: 某些访问信息对其他玩家不可见
3. **侦察机制**: 支持建筑的侦察功能

## 依赖关系

- **IObjectInterface**: 对象接口基类
- **Rewardable::Interface**: 奖励接口
- **CGTownInstance**: 城镇实例类
- **CBuilding**: 建筑类
- **BuildingID**: 建筑ID类型
- **IGameEventCallback**: 游戏事件回调接口

## 使用示例

### 创建城镇建筑实例

```cpp
#include "TownBuildingInstance.h"

// 创建城镇建筑实例
auto townBuilding = std::make_shared<TownBuildingInstance>(town, BuildingID::FORT);

// 建筑自动关联到城镇
assert(townBuilding->town == town);
assert(townBuilding->getBuildingType() == BuildingID::FORT);
```

### 创建可奖励建筑

```cpp
#include "TownBuildingInstance.h"

// 创建可奖励的城镇建筑
auto rewardableBuilding = std::make_shared<TownRewardableBuildingInstance>(town, BuildingID::SPECIAL_BUILDING, gameRandomizer);

// 配置奖励
rewardableBuilding->configuration.addReward(
    Rewardable::EEventType::EVENT_FIRST_VISIT,
    Rewardable::Limiter(),
    Rewardable::Reward(TPrimarySkill::EXPERIENCE, 1000)
);
```

### 处理建筑访问

```cpp
#include "TownBuildingInstance.h"

void onHeroVisit(IGameEventCallback & gameEvents, const CGHeroInstance * h) const override
{
    if (!wasVisited(h))
    {
        // 首次访问，提供奖励
        Rewardable::Interface::onHeroVisit(gameEvents, h);
    }
    else
    {
        // 后续访问，可能显示不同消息
        showReturnMessage(gameEvents, h);
    }
}
```

### 访问状态管理

```cpp
#include "TownBuildingInstance.h"

// 检查访问状态
bool firstTime = !rewardableBuilding->wasVisited(hero);
bool playerVisited = rewardableBuilding->wasVisited(hero->getOwner());

// 标记为已访问
rewardableBuilding->markAsVisited(gameEvents, hero);

// 检查侦察状态
bool scouted = rewardableBuilding->wasVisited(hero->getOwner()); // 玩家可见的访问状态
```

### 奖励配置生成

```cpp
#include "TownBuildingInstance.h"

// 生成建筑特定的奖励配置
Rewardable::Configuration config = rewardableBuilding->generateConfiguration(gameRandomizer);

// 根据建筑类型添加奖励
switch (getBuildingType())
{
    case BuildingID::SPECIAL_BUILDING:
        config.addReward(Rewardable::EEventType::EVENT_FIRST_VISIT,
                        Rewardable::Limiter(),
                        Rewardable::Reward(TPrimarySkill::EXPERIENCE, 500));
        break;
    // 其他建筑类型...
}
```

## 性能特性

- **轻量对象**: 建筑实例内存占用较小
- **快速查询**: 访问状态和位置查询高效
- **奖励计算**: 根据建筑复杂度决定计算开销
- **序列化**: 支持完整状态序列化

## 实现注意事项

1. **城镇关联**: 确保建筑正确关联到所属城镇
2. **位置一致性**: 可访问位置应在城镇范围内
3. **奖励平衡**: 建筑奖励不应过于强大
4. **状态同步**: 建筑状态应与城镇状态同步

## 相关文档

- [CGTownInstance](CGTownInstance.md) - 城镇实例类
- [IObjectInterface](IObjectInterface.md) - 对象接口
- [Rewardable::Interface](../rewardable/Interface.md) - 奖励接口