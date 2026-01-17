<!-- 来源: E:\develop\heroes\vcmi\lib\rmg\MapProxy.h -->
# MapProxy头文件

MapProxy头文件定义了VCMI中随机地图生成器的地图代理类，用于安全地访问和修改地图。

## MapProxy类

### 类定义
```cpp
class MapProxy
```

### 构造函数
- `MapProxy(RmgMap & map)`: 构造函数

### 对象操作方法
- `void insertObject(std::shared_ptr<CGObjectInstance> obj)`: 插入对象
- `void insertObjects(const std::set<std::shared_ptr<CGObjectInstance>> & objects)`: 批量插入对象
- `void removeObject(CGObjectInstance* obj)`: 移除对象

### 地形绘制方法
- `void drawTerrain(vstd::RNG & generator, std::vector<int3> & tiles, TerrainId terrain)`: 绘制地形
- `void drawRivers(vstd::RNG & generator, std::vector<int3> & tiles, TerrainId terrain)`: 绘制河流
- `void drawRoads(vstd::RNG & generator, std::vector<int3> & tiles, RoadId roadType)`: 绘制道路

### 私有成员
- `mutable std::shared_mutex mx`: 共享互斥量
- `using Lock = std::unique_lock<std::shared_mutex>`: 锁类型别名
- `RmgMap & map`: RMG地图引用

## 设计特点

- 提供线程安全的地图访问接口
- 支持对象插入、删除操作
- 提供地形、河流、道路绘制功能
- 使用共享互斥量允许多个读取者同时访问