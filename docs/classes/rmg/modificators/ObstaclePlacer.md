# ObstaclePlacer

## 源文件

[ObstaclePlacer.h](https://github.com/vcmi/vcmi/blob/master/lib/rmg/modificators/ObstaclePlacer.h)

## 类定义

```cpp
class ObstaclePlacer: public Modificator, public ObstacleProxy
```

`ObstaclePlacer` 是随机地图生成器中的障碍物放置器，负责在地图上放置各种障碍物，同时确保地图的可玩性和美观性。

## 继承关系

- 继承自 `Modificator`
- 继承自 `ObstacleProxy`

## 成员变量

- `rmg::Area prohibitedArea` - 禁止放置区域
- `RiverPlacer * riverManager` - 河流放置器指针
- `ObjectManager * manager` - 对象管理器指针

## 方法

### 主要处理方法

- `void process() override` - 执行障碍物放置的主要处理逻辑
- `void init() override` - 初始化障碍物放置器

### 覆盖的代理方法

- `bool isInTheMap(const int3& tile) override` - 检查地块是否在地图内
- `std::pair<bool, bool> verifyCoverage(const int3 & t) const override` - 验证覆盖范围
- `void placeObject(rmg::Object & object, std::set<std::shared_ptr<CGObjectInstance>> & instances) override` - 放置对象
- `void postProcess(const rmg::Object & object) override` - 对象后处理
- `bool isProhibited(const rmg::Area & objArea) const override` - 检查区域是否被禁止

## 设计特点

- **障碍物管理**: 智能放置各种地图障碍物
- **区域协调**: 与河流和对象管理器协作
- **覆盖验证**: 确保障碍物不会阻塞重要路径
- **后处理**: 支持对象放置后的额外处理
- **代理模式**: 通过继承ObstacleProxy提供统一的接口