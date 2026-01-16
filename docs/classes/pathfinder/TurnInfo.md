# TurnInfo类

TurnInfo类是VCMI中路径寻找系统中关于回合信息的类，用于存储和管理英雄在特定回合的移动相关信息。

## 类定义

```cpp
class CGHeroInstance;

class TurnInfoBonusList
{
    TConstBonusListPtr bonusList;
    std::mutex bonusListMutex;
    std::atomic<int64_t> bonusListVersion = 0;
public:
    TConstBonusListPtr getBonusList(const CGHeroInstance * target, const CSelector & bonusSelector);
};

struct TurnInfoCache
{
    TurnInfoBonusList waterWalking;
    TurnInfoBonusList flyingMovement;
    TurnInfoBonusList noTerrainPenalty;
    TurnInfoBonusList freeShipBoarding;
    TurnInfoBonusList roughTerrainDiscount;
    TurnInfoBonusList baseTileMovementCost;
    TurnInfoBonusList movementPointsLimitLand;
    TurnInfoBonusList movementPointsLimitWater;

    const CGHeroInstance * target;

    mutable std::atomic<int64_t> heroLowestSpeedVersion = 0;
    mutable std::atomic<int64_t> heroLowestSpeedValue = 0;

    explicit TurnInfoCache(const CGHeroInstance * target):
        target(target)
    {}
};

class DLL_LINKAGE TurnInfo
{
private:
    const CGHeroInstance * target;

    // 存储每种地形的缓存值
    std::vector<bool> noterrainPenalty;

    int flyingMovementValue;
    int waterWalkingValue;
    int roughTerrainDiscountValue;
    int moveCostBaseValue;
    int movePointsLimitLand;
    int movePointsLimitWater;

    bool waterWalkingTest;
    bool flyingMovementTest;
    bool freeShipBoardingTest;

public:
    int hasWaterWalking() const;
    int hasFlyingMovement() const;
    int hasNoTerrainPenalty(const TerrainId & terrain) const;
    int hasFreeShipBoarding() const;

    int getFlyingMovementValue() const;
    int getWaterWalkingValue() const;
    int getRoughTerrainDiscountValue() const;
    int getMovementCostBase() const;
    int getMovePointsLimitLand() const;
    int getMovePointsLimitWater() const;

    TurnInfo(TurnInfoCache * sharedCache, const CGHeroInstance * target, int Turn);
    bool isLayerAvailable(const EPathfindingLayer & layer) const;
    int getMaxMovePoints(const EPathfindingLayer & layer) const;
};
```

## 功能说明

TurnInfo是VCMI路径寻找系统中存储英雄在特定回合移动相关信息的类。它包含了英雄在该回合内拥有的各种移动能力（如飞行、水上行走等），以及地形移动成本、移动点数限制等信息。该类使用缓存机制来高效地存储和检索这些信息，以优化路径计算性能。

## 依赖关系

- [CGHeroInstance](../entities/CGHeroInstance.md): 英雄实例
- [CSelector](../bonuses/CSelector.md): 选择器
- [TConstBonusListPtr](../bonuses/Bonus.md): 奖励列表指针
- [TerrainId](../entities/TerrainId.md): 地形ID
- [EPathfindingLayer](./EPathfindingLayer.md): 路径寻找层
- STL库: vector, mutex, atomic等

## 函数注释

### TurnInfoBonusList类

- `getBonusList(target, bonusSelector)`: 获取匹配选择器的奖励列表

### TurnInfoCache结构体

- `TurnInfoCache(target)`: 构造函数，为指定目标创建回合信息缓存
- 包含各种奖励类型的缓存列表

### TurnInfo类

- `TurnInfo(sharedCache, target, Turn)`: 构造函数，使用共享缓存、目标英雄和回合数创建回合信息
- `hasWaterWalking()`: 检查是否具有水上行走能力
- `hasFlyingMovement()`: 检查是否具有飞行能力
- `hasNoTerrainPenalty(terrain)`: 检查是否对特定地形无惩罚
- `hasFreeShipBoarding()`: 检查是否可以免费登船
- `getFlyingMovementValue()`: 获取飞行能力值
- `getWaterWalkingValue()`: 获取水上行走能力值
- `getRoughTerrainDiscountValue()`: 获取崎岖地形折扣值
- `getMovementCostBase()`: 获取基础移动成本
- `getMovePointsLimitLand()`: 获取陆地移动点数限制
- `getMovePointsLimitWater()`: 获取水面移动点数限制
- `isLayerAvailable(layer)`: 检查路径寻找层是否可用
- `getMaxMovePoints(layer)`: 获取某层的最大移动点数