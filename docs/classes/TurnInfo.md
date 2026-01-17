<!-- 来源: E:\develop\heroes\vcmi\lib\pathfinder\TurnInfo.h -->
# TurnInfo头文件

TurnInfo头文件定义了VCMI中回合信息相关的类，用于缓存和计算英雄在特定回合的移动能力和奖励信息。

## TurnInfoBonusList类

### 类定义
```cpp
class TurnInfoBonusList
```

### 私有成员
- `TConstBonusListPtr bonusList`: 奖励列表指针
- `std::mutex bonusListMutex`: 奖励列表互斥锁
- `std::atomic<int64_t> bonusListVersion`: 奖励列表版本

### 公共方法
- `TConstBonusListPtr getBonusList(const CGHeroInstance * target, const CSelector & bonusSelector)`: 获取奖励列表

## TurnInfoCache结构体

### 结构体定义
```cpp
struct TurnInfoCache
```

### 奖励缓存成员
- `TurnInfoBonusList waterWalking`: 水上行走奖励
- `TurnInfoBonusList flyingMovement`: 飞行移动奖励
- `TurnInfoBonusList noTerrainPenalty`: 无地形惩罚奖励
- `TurnInfoBonusList freeShipBoarding`: 免费登船奖励
- `TurnInfoBonusList roughTerrainDiscount`: 粗糙地形折扣奖励
- `TurnInfoBonusList baseTileMovementCost`: 基础瓦片移动成本奖励
- `TurnInfoBonusList movementPointsLimitLand`: 陆地移动点数限制奖励
- `TurnInfoBonusList movementPointsLimitWater`: 水上移动点数限制奖励

### 其他成员
- `const CGHeroInstance * target`: 目标英雄
- `mutable std::atomic<int64_t> heroLowestSpeedVersion`: 英雄最低速度版本
- `mutable std::atomic<int64_t> heroLowestSpeedValue`: 英雄最低速度值

### 构造函数
- `TurnInfoCache(const CGHeroInstance * target)`: 构造函数

## TurnInfo类

### 类定义
```cpp
class DLL_LINKAGE TurnInfo
```

### 私有成员
- `const CGHeroInstance * target`: 目标英雄
- `std::vector<bool> noterrainPenalty`: 无地形惩罚向量
- `int flyingMovementValue`: 飞行移动值
- `int waterWalkingValue`: 水上行走值
- `int roughTerrainDiscountValue`: 粗糙地形折扣值
- `int moveCostBaseValue`: 移动成本基础值
- `int movePointsLimitLand`: 陆地移动点数限制
- `int movePointsLimitWater`: 水上移动点数限制
- `bool waterWalkingTest`: 水上行走测试
- `bool flyingMovementTest`: 飞行移动测试
- `bool freeShipBoardingTest`: 免费登船测试

### 公共方法

#### 能力检查方法
- `int hasWaterWalking() const`: 检查是否有水上行走能力
- `int hasFlyingMovement() const`: 检查是否有飞行移动能力
- `int hasNoTerrainPenalty(const TerrainId & terrain) const`: 检查指定地形是否有无惩罚能力
- `int hasFreeShipBoarding() const`: 检查是否有免费登船能力

#### 值获取方法
- `int getFlyingMovementValue() const`: 获取飞行移动值
- `int getWaterWalkingValue() const`: 获取水上行走值
- `int getRoughTerrainDiscountValue() const`: 获取粗糙地形折扣值
- `int getMovementCostBase() const`: 获取移动成本基础值
- `int getMovePointsLimitLand() const`: 获取陆地移动点数限制
- `int getMovePointsLimitWater() const`: 获取水上移动点数限制

### 构造函数和层级方法
- `TurnInfo(TurnInfoCache * sharedCache, const CGHeroInstance * target, int Turn)`: 构造函数
- `bool isLayerAvailable(const EPathfindingLayer & layer) const`: 检查层是否可用
- `int getMaxMovePoints(const EPathfindingLayer & layer) const`: 获取指定层的最大移动点数

## 设计特点

- 使用缓存机制优化频繁的奖励查询性能
- 支持多线程安全访问（使用互斥锁和原子变量）
- 提供版本控制以检测奖励变化
- 缓存各种移动相关的奖励和能力值
- 支持不同地形类型的惩罚和折扣计算
- 提供层级特定的移动点数限制