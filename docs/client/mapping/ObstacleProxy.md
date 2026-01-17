# ObstacleProxy

## 概述

`ObstacleProxy` 是 VCMI 障碍物生成和放置系统的代理类。它为随机地图生成器 (RMG) 和地图编辑器提供统一的障碍物处理接口，支持智能放置、冲突检测和地形适应。

## 类层次结构

```
ObstacleProxy (抽象基类)
  └── EditorObstaclePlacer (编辑器实现)
```

## ObstacleProxy 基类

### 概述
障碍物代理的抽象基类，定义了障碍物生成和放置的核心接口。

### 构造函数和析构函数
```cpp
ObstacleProxy() = default;
virtual ~ObstacleProxy() = default;
```

### 障碍物收集和准备

#### collectPossibleObstacles
```cpp
void collectPossibleObstacles(TerrainId terrain);
```
收集指定地形上所有可能的障碍物模板。

**参数：**
- `terrain`: 目标地形类型

#### prepareBiome
```cpp
bool prepareBiome(const ObstacleSetFilter & filter, vstd::RNG & rand);
```
为特定生态群系准备障碍物集合。

**参数：**
- `filter`: 障碍物集合过滤器
- `rand`: 随机数生成器

**返回值：** 如果成功准备了障碍物返回 `true`

### 区域管理

#### addBlockedTile
```cpp
void addBlockedTile(const int3 & tile);
```
添加被阻塞的地块。

#### setBlockedArea
```cpp
void setBlockedArea(const rmg::Area & area);
```
设置阻塞区域。

#### clearBlockedArea
```cpp
void clearBlockedArea();
```
清除所有阻塞区域。

### 冲突检测

#### isProhibited
```cpp
virtual bool isProhibited(const rmg::Area& objArea) const;
```
检查指定区域是否被禁止放置障碍物。

**参数：**
- `objArea`: 对象区域

**返回值：** 如果区域被禁止返回 `true`

#### verifyCoverage
```cpp
virtual std::pair<bool, bool> verifyCoverage(const int3 & t) const;
```
验证指定位置的覆盖情况。

**返回值：** `pair<bool, bool>` - (是否覆盖, 是否完全覆盖)

### 对象放置

#### placeObject
```cpp
virtual void placeObject(rmg::Object & object, std::set<std::shared_ptr<CGObjectInstance>> & instances);
```
在地图上放置单个对象。

#### createObstacles
```cpp
virtual std::set<std::shared_ptr<CGObjectInstance>> createObstacles(vstd::RNG & rand, IGameInfoCallback * cb);
```
创建一组障碍物实例。

**返回值：** 创建的障碍物实例集合

### 地图边界检查

#### isInTheMap
```cpp
virtual bool isInTheMap(const int3& tile) = 0;
```
检查指定位置是否在地图范围内。纯虚方法，由子类实现。

### 最终插入

#### finalInsertion
```cpp
void finalInsertion(CMapEditManager * manager, const std::set<std::shared_ptr<CGObjectInstance>> & instances);
```
将障碍物实例最终插入到地图中。

#### postProcess
```cpp
virtual void postProcess(const rmg::Object& object) {};
```
对象放置后的后处理。默认空实现。

### 保护方法

#### getWeightedObjects
```cpp
int getWeightedObjects(const int3& tile, vstd::RNG& rand, IGameInfoCallback * cb, std::list<rmg::Object>& allObjects, std::vector<std::pair<rmg::Object*, int3>>& weightedObjects);
```
获取指定位置的加权对象列表。

#### sortObstacles
```cpp
void sortObstacles();
```
对障碍物进行排序。

### 保护成员变量

#### blockedArea
```cpp
rmg::Area blockedArea;
```
被阻塞的区域。

#### obstaclesBySize
```cpp
std::map<int, ObstacleVector> obstaclesBySize;
```
按大小分组的障碍物向量。

#### possibleObstacles
```cpp
std::vector<ObstaclePair> possibleObstacles;
```
可能的障碍物列表，每个元素包含大小和对应的障碍物向量。

## EditorObstaclePlacer 类

### 概述
地图编辑器专用的障碍物放置器实现。

### 构造函数
```cpp
EditorObstaclePlacer(CMap* map);
```

### 主要方法

#### isInTheMap
```cpp
bool isInTheMap(const int3& tile) override;
```
检查位置是否在地图范围内。

#### placeObstacles
```cpp
std::set<std::shared_ptr<CGObjectInstance>> placeObstacles(vstd::RNG& rand);
```
放置障碍物并返回创建的实例。

### 私有成员变量

#### map
```cpp
CMap* map;
```
关联的地图对象。

## 工作原理

### 障碍物生成流程
1. **收集障碍物**: `collectPossibleObstacles()` 根据地形收集可用障碍物
2. **准备生态群系**: `prepareBiome()` 根据过滤器选择合适的障碍物集合
3. **设置阻塞区域**: 使用 `setBlockedArea()` 和 `addBlockedTile()` 定义禁止区域
4. **生成障碍物**: `createObstacles()` 创建随机障碍物实例
5. **冲突检测**: `isProhibited()` 和 `verifyCoverage()` 检查放置冲突
6. **放置对象**: `placeObject()` 在合适位置放置单个对象
7. **最终插入**: `finalInsertion()` 将所有对象插入地图

### 智能放置算法
- **加权选择**: 根据位置和随机因子选择合适的障碍物
- **冲突避免**: 检查与其他对象和地形的冲突
- **地形适应**: 根据地形类型选择合适的障碍物
- **大小排序**: 优先放置大障碍物，然后填充小障碍物

### 阻塞区域管理
支持多种阻塞区域定义方式：

```cpp
// 添加单个阻塞地块
proxy.addBlockedTile(int3(5, 5, 0));

// 设置整个阻塞区域
rmg::Area blockedArea = getBlockedArea();
proxy.setBlockedArea(blockedArea);

// 清除所有阻塞
proxy.clearBlockedArea();
```

## 使用示例

### 在地图编辑器中使用
```cpp
// 创建障碍物放置器
EditorObstaclePlacer placer(map);

// 收集草地障碍物
placer.collectPossibleObstacles(TerrainId::GRASS);

// 准备生态群系
ObstacleSetFilter filter = createBiomeFilter();
placer.prepareBiome(filter, rng);

// 设置阻塞区域（城镇周围）
rmg::Area townArea = getTownArea();
placer.setBlockedArea(townArea);

// 生成障碍物
auto obstacles = placer.placeObstacles(rng);

// 插入到地图
placer.finalInsertion(editManager, obstacles);
```

### 在RMG中使用
```cpp
// RMG中的使用类似，但通常继承ObstacleProxy
class RMGObstaclePlacer : public ObstacleProxy {
    bool isInTheMap(const int3& tile) override {
        return map.getWidth() > tile.x && map.getHeight() > tile.y;
    }
};
```

## 相关类

- `CMapEditManager`: 地图编辑管理器
- `CGObjectInstance`: 地图对象实例
- `ObjectTemplate`: 对象模板
- `rmg::Object`: RMG对象
- `rmg::Area`: RMG区域
- `ObstacleSetFilter`: 障碍物集合过滤器