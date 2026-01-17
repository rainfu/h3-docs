# ObjectManager

## 源文件

[ObjectManager.h](https://github.com/vcmi/vcmi/blob/master/lib/rmg/modificators/ObjectManager.h)

## 类定义

```cpp
class ObjectManager: public Modificator
```

`ObjectManager` 是随机地图生成器中的对象管理器，负责智能放置和管理地图上的各种对象，确保对象分布合理且可达。

## 继承关系

- 继承自 `Modificator`

## 内部结构体和类型

### RequiredObjectInfo

```cpp
struct RequiredObjectInfo
{
    std::shared_ptr<CGObjectInstance> obj;
    CGObjectInstance* nearbyTarget;
    int3 pos;
    ui32 guardStrength;
    bool createRoad;
};
```

包含对象放置所需的信息。

### DistanceMaximizeFunctor

```cpp
struct DistanceMaximizeFunctor
{
    bool operator()(const TDistance & lhs, const TDistance & rhs) const;
};
```

用于最大化距离的比较函数。

### OptimizeType

```cpp
enum OptimizeType
{
    NONE = 0x00000000,
    WEIGHT = 0x00000001,
    DISTANCE = 0x00000010,
    BOTH = 0x00000011
};
```

定义对象放置的优化类型。

## 成员变量

- `std::vector<RequiredObjectInfo> requiredObjects` - 必需的对象列表
- `std::vector<RequiredObjectInfo> closeObjects` - 靠近的对象列表
- `std::vector<RequiredObjectInfo> instantObjects` - 即时对象列表
- `std::vector<RequiredObjectInfo> nearbyObjects` - 附近对象列表
- `std::vector<CGObjectInstance*> objects` - 已放置的对象列表
- `rmg::Area objectsVisitableArea` - 对象可访问区域
- `boost::heap::priority_queue<TDistance, boost::heap::compare<DistanceMaximizeFunctor>> tilesByDistance` - 按距离排序的地块优先队列

## 方法

### 主要处理方法

- `void process() override` - 执行对象管理的主要处理逻辑
- `void init() override` - 初始化对象管理器

### 对象添加方法

- `void addRequiredObject(const RequiredObjectInfo & info)` - 添加必需对象
- `void addCloseObject(const RequiredObjectInfo & info)` - 添加靠近对象
- `void addNearbyObject(const RequiredObjectInfo & info)` - 添加附近对象

### 对象创建和放置

- `bool createMonoliths()` - 创建单向石碑
- `bool createRequiredObjects()` - 创建必需对象
- `void placeObject(rmg::Object & object, bool guarded, bool updateDistance, bool createRoad = false)` - 放置对象

### 位置查找方法

- `int3 findPlaceForObject(const rmg::Area & searchArea, rmg::Object & obj, si32 min_dist, OptimizeType optimizer) const` - 查找对象放置位置
- `int3 findPlaceForObject(const rmg::Area & searchArea, rmg::Object & obj, const std::function<float(const int3)> & weightFunction, OptimizeType optimizer) const` - 使用权重函数查找位置

### 路径和连接方法

- `rmg::Path placeAndConnectObject(const rmg::Area & searchArea, rmg::Object & obj, si32 min_dist, bool isGuarded, bool onlyStraight, OptimizeType optimizer) const` - 放置并连接对象
- `rmg::Path placeAndConnectObject(const rmg::Area & searchArea, rmg::Object & obj, const std::function<float(const int3)> & weightFunction, bool isGuarded, bool onlyStraight, OptimizeType optimizer) const` - 使用权重函数放置并连接

### 守卫管理

- `std::shared_ptr<CGCreature> chooseGuard(si32 strength, bool zoneGuard = false)` - 选择守卫生物
- `bool addGuard(rmg::Object & object, si32 strength, bool zoneGuard = false)` - 为对象添加守卫

### 距离和可达性

- `void updateDistances(const rmg::Object & obj)` - 更新对象距离
- `void updateDistances(const int3& pos)` - 更新位置距离
- `void updateDistances(std::function<ui32(const int3 & tile)> distanceFunction)` - 使用距离函数更新距离
- `void createDistancesPriorityQueue()` - 创建距离优先队列
- `const rmg::Area & getVisitableArea() const` - 获取可访问区域

### 查询方法

- `std::vector<CGObjectInstance*> getMines() const` - 获取所有矿场对象

## 设计特点

- **智能放置**: 使用多种优化算法确保对象放置合理
- **距离管理**: 维护距离矩阵确保对象间距和可达性
- **守卫系统**: 自动为对象分配合适的守卫生物
- **路径生成**: 支持道路连接确保对象可访问
- **优先级队列**: 使用堆优化距离计算
- **多种对象类型**: 支持必需、靠近、附近等多种对象放置策略