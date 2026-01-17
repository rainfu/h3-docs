# CZonePlacer

## 概述

`CZonePlacer` 类是 VCMI 随机地图生成器的区域放置引擎。该类使用物理模拟算法（弹簧-质量系统）来智能地放置地图区域，确保区域间适当的距离和连接关系。它实现了基于力的区域布局算法，能够处理复杂的区域拓扑结构。

## 类定义

```cpp
class CZonePlacer
```

## 类型定义

### 区域容器类型
```cpp
typedef std::vector<std::pair<TRmgTemplateZoneId, std::shared_ptr<Zone>>> TZoneVector;
typedef std::map<TRmgTemplateZoneId, std::shared_ptr<Zone>> TZoneMap;
typedef std::map<std::shared_ptr<Zone>, float3> TForceVector;
typedef std::map<std::shared_ptr<Zone>, float> TDistanceVector;
typedef std::map<int, std::map<int, size_t>> TDistanceMap;
```

## 构造函数和析构函数

```cpp
explicit CZonePlacer(RmgMap & map);
~CZonePlacer() = default;
```

**参数：**
- `map`: RMG地图对象的引用

## 坐标转换和度量

### 坐标转换
```cpp
int3 cords(const float3 & f) const;
```
将浮点坐标转换为整数坐标。

### 距离度量
```cpp
float metric(const int3 &a, const int3 &b) const;
```
计算两点间的距离度量。

### 距离缩放
```cpp
float getDistance(float distance) const;
```
对距离进行额外缩放，避免除零错误。

## 主要放置方法

### 区域放置
```cpp
void placeZones(vstd::RNG * rand);
```
执行完整的区域放置过程。

### 路径查找
```cpp
void findPathsBetweenZones();
```
在已放置的区域间查找路径。

### 网格放置
```cpp
void placeOnGrid(vstd::RNG* rand);
```
将区域放置在网格上（初始布局）。

### 力计算
```cpp
float scaleForceBetweenZones(const std::shared_ptr<Zone> zoneA, const std::shared_ptr<Zone> zoneB) const;
```
计算两个区域间的缩放力。

### 区域分配
```cpp
void assignZones(vstd::RNG * rand);
```
将模板区域分配给实际区域对象。

### 道路移除
```cpp
void RemoveRoadsForWideConnections();
```
为宽连接移除道路。

## 数据访问

```cpp
const TDistanceMap & getDistanceMap();
```
获取区域间距离映射。

## 私有方法

### 区域准备
```cpp
void prepareZones(TZoneMap &zones, TZoneVector &zonesVector, const int mapLevels, vstd::RNG * rand);
```
准备区域进行放置。

### 力计算
```cpp
void attractConnectedZones(TZoneMap & zones, TForceVector & forces, TDistanceVector & distances) const;
```
计算连接区域间的吸引力。

```cpp
void separateOverlappingZones(TZoneMap &zones, TForceVector &forces, TDistanceVector &overlaps);
```
分离重叠区域（计算排斥力）。

### 区域移动
```cpp
void moveOneZone(TZoneMap & zones, TForceVector & totalForces, TDistanceVector & distances, TDistanceVector & overlaps);
```
根据合力移动单个区域。

## 私有成员变量

### 地图尺寸
```cpp
int width;   // 地图宽度
int height;  // 地图高度
float mapSize;  // 地图尺寸度量系数
```

### 物理参数
```cpp
float gravityConstant;        // 重力常数（吸引力）
float stiffnessConstant;      // 刚度常数（排斥力）
float stifness;              // 当前刚度
float stiffnessIncreaseFactor; // 刚度增加因子
```

### 最优解记录
```cpp
float bestTotalDistance;  // 最佳总距离
float bestTotalOverlap;   // 最佳总重叠
```

### 距离和状态
```cpp
TDistanceMap distancesBetweenZones;  // 区域间距离映射
std::set<TRmgTemplateZoneId> lastSwappedZones;  // 最后交换的区域
RmgMap & map;  // RMG地图引用
```

## 工作原理

### 物理模拟算法
区域放置使用弹簧-质量系统：

1. **吸引力**: 连接的区域相互吸引
2. **排斥力**: 重叠区域相互排斥
3. **阻尼**: 力随距离衰减
4. **迭代优化**: 多次迭代寻找最优布局

### 放置流程
```
1. 网格初始布局 ← placeOnGrid()
2. 区域分配 ← assignZones()
3. 物理模拟优化 ← placeZones()
   ├── 计算吸引力 ← attractConnectedZones()
   ├── 计算排斥力 ← separateOverlappingZones()
   └── 迭代移动 ← moveOneZone()
4. 路径查找 ← findPathsBetweenZones()
5. 清理道路 ← RemoveRoadsForWideConnections()
```

### 距离计算
区域间距离基于连接路径长度：

```cpp
// 直接连接的区域距离 = 1
// 通过一个区域连接的距离 = 2
// 等等...
distancesBetweenZones[a][b] = connectionCount;
```

### 力平衡
每个区域受到多种力的影响：

```cpp
totalForce = attractionForces + repulsionForces + boundaryForces
```

## 使用示例

### 基本使用
```cpp
RmgMap rmgMap(mapGenOptions, gameCallback, randomSeed);
CZonePlacer placer(rmgMap);

// 执行区域放置
placer.placeZones(rng);

// 获取距离信息
const auto& distanceMap = placer.getDistanceMap();
for (const auto& [zoneA, connections] : distanceMap) {
    for (const auto& [zoneB, distance] : connections) {
        std::cout << "Distance between zones " << zoneA 
                  << " and " << zoneB << " is " << distance << std::endl;
    }
}
```

### 自定义参数
```cpp
// 注意：参数通常在构造函数中从地图设置获取
// 但可以考虑添加参数设置方法
CZonePlacer placer(rmgMap);
// placer.setGravityConstant(1.5f); // 假设有设置方法
// placer.setStiffnessConstant(0.8f);
```

### 坐标转换
```cpp
// 浮点坐标转整数坐标
float3 floatPos(10.5f, 20.3f, 0.0f);
int3 intPos = placer.cords(floatPos);
// intPos = {10, 20, 0}

// 计算距离
float distance = placer.metric(pos1, pos2);
```

### 距离映射
```cpp
// 获取区域间距离（连接数量）
const auto& distances = placer.getDistanceMap();
int dist = distances[zoneAId][zoneBId]; // 连接数量
float scaledDist = placer.getDistance(dist); // 缩放距离
```

## 性能优化

- **迭代收敛**: 使用刚度增加因子加速收敛
- **最优解跟踪**: 记录最佳布局避免局部最优
- **增量更新**: 只在必要时重新计算力
- **空间分区**: 使用网格加速邻域查询

## 扩展机制

### 自定义力计算
可以通过继承重写力计算方法：

```cpp
class CustomZonePlacer : public CZonePlacer
{
    float scaleForceBetweenZones(const std::shared_ptr<Zone> zoneA, 
                                const std::shared_ptr<Zone> zoneB) const override
    {
        // 自定义力计算逻辑
        return customForceCalculation(zoneA, zoneB);
    }
};
```

### 约束条件
可以添加额外的布局约束：

```cpp
// 边界约束、对称约束、地形亲和性等
void addBoundaryConstraints(TForceVector& forces);
void addSymmetryConstraints(TForceVector& forces);
```

## 相关类

- `RmgMap`: RMG地图类
- `Zone`: 区域类
- `CMapGenerator`: 地图生成器
- `CRmgTemplate`: RMG模板类
- `vstd::RNG`: 随机数生成器