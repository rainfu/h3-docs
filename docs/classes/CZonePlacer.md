<!-- 来源: E:\develop\heroes\vcmi\lib\rmg\CZonePlacer.h -->
# CZonePlacer头文件

CZonePlacer头文件定义了VCMI中随机地图生成器的区域放置器类，使用物理模拟算法优化区域布局。

## 类型定义

### 区域相关类型
```cpp
typedef std::vector<std::pair<TRmgTemplateZoneId, std::shared_ptr<Zone>>> TZoneVector;
typedef std::map<TRmgTemplateZoneId, std::shared_ptr<Zone>> TZoneMap;
typedef std::map<std::shared_ptr<Zone>, float3> TForceVector;
typedef std::map<std::shared_ptr<Zone>, float> TDistanceVector;
typedef std::map<int, std::map<int, size_t>> TDistanceMap;
```

## CZonePlacer类

### 类定义
```cpp
class CZonePlacer
```

### 构造函数
- `CZonePlacer(RmgMap & map)`: 构造函数，接收RMG地图引用

### 析构函数
- `~CZonePlacer() = default`: 默认析构函数

### 坐标和度量方法
- `int3 cords(const float3 & f) const`: 将浮点坐标转换为整数坐标
- `float metric(const int3 &a, const int3 &b) const`: 计算两点间的度量距离
- `float getDistance(float distance) const`: 获取缩放距离（避免除零）

### 主要放置方法
- `void placeZones(vstd::RNG * rand)`: 放置区域
- `void findPathsBetweenZones()`: 寻找区域间的路径
- `void placeOnGrid(vstd::RNG* rand)`: 在网格上放置
- `float scaleForceBetweenZones(const std::shared_ptr<Zone> zoneA, const std::shared_ptr<Zone> zoneB) const`: 计算区域间的缩放力
- `void assignZones(vstd::RNG * rand)`: 分配区域
- `void RemoveRoadsForWideConnections()`: 为宽连接移除道路

### 访问器方法
- `const TDistanceMap & getDistanceMap()`: 获取距离映射

### 私有方法

#### 区域准备和物理模拟
- `void prepareZones(TZoneMap &zones, TZoneVector &zonesVector, const int mapLevels, vstd::RNG * rand)`: 准备区域
- `void attractConnectedZones(TZoneMap & zones, TForceVector & forces, TDistanceVector & distances) const`: 吸引连接的区域
- `void separateOverlappingZones(TZoneMap &zones, TForceVector &forces, TDistanceVector &overlaps)`: 分离重叠的区域
- `void moveOneZone(TZoneMap & zones, TForceVector & totalForces, TDistanceVector & distances, TDistanceVector & overlaps)`: 移动单个区域

### 私有成员变量

#### 地图尺寸
- `int width, height`: 地图宽度和高度
- `float mapSize`: 地图尺寸度量系数

#### 物理模拟参数
- `float gravityConstant`: 重力常数
- `float stiffnessConstant`: 刚度常数
- `float stifness`: 刚度
- `float stiffnessIncreaseFactor`: 刚度增加因子

#### 最优解记录
- `float bestTotalDistance`: 最佳总距离
- `float bestTotalOverlap`: 最佳总重叠

#### 区域关系数据
- `TDistanceMap distancesBetweenZones`: 区域间距离映射
- `std::set<TRmgTemplateZoneId> lastSwappedZones`: 最后交换的区域集合
- `RmgMap & map`: RMG地图引用

## 设计特点

- 使用物理模拟算法（弹簧-质量系统）优化区域布局
- 支持连接区域间的吸引力和重叠区域间的排斥力
- 实现区域间的距离计算和路径寻找
- 提供网格化放置和随机分配功能
- 支持宽连接的特殊道路处理
- 记录最优布局解用于回退