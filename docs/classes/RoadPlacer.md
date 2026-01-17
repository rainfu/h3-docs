# RoadPlacer

## 源文件

[RoadPlacer.h](lib/rmg/modificators/RoadPlacer.h)

## 类定义

```cpp
class RoadPlacer: public Modificator
```

RoadPlacer 类继承自 Modificator，负责在随机地图生成过程中放置和生成道路网络，连接重要的地图节点。

## 宏定义

```cpp
MODIFICATOR(RoadPlacer);
```

## 常量

```cpp
const float VISITABLE_PENALTY = 1.33f;
```

可访问格子的惩罚系数，用于路径规划算法。

## 成员变量

```cpp
rmg::Tileset roadNodes;
```

需要用道路连接的节点集合。

```cpp
rmg::Area roads;
```

所有包含道路的格子区域。

```cpp
rmg::Area areaRoads;
```

道路可放置的区域。

```cpp
rmg::Area isolated;
```

孤立的区域，不与主要道路网络连接。

```cpp
rmg::Area visitableTiles;
```

被可移除或可通过对象占据的格子，用于路径规划时的惩罚计算。

```cpp
bool noRoadNodes = false;
```

标志是否没有任何道路节点。

## 方法

### process()

```cpp
void process() override;
```

重写基类的process方法，执行道路放置的主要逻辑。

### postProcess()

```cpp
void postProcess();
```

后处理步骤，执行道路放置后的清理或优化工作。

### init()

```cpp
void init() override;
```

重写基类的init方法，初始化道路放置器。

### dump()

```cpp
char dump(const int3 &) override;
```

重写基类的dump方法，用于调试输出指定位置的信息。

### addRoadNode()

```cpp
void addRoadNode(const int3 & node);
```

添加一个需要连接的道路节点。

### connectRoads()

```cpp
void connectRoads();
```

根据roadNodes中的节点填充roads区域，创建道路网络。

### areaForRoads()

```cpp
rmg::Area & areaForRoads();
```

返回可放置道路区域的引用，允许外部修改。

### areaIsolated()

```cpp
rmg::Area & areaIsolated();
```

返回孤立区域的引用，允许外部修改。

### areaVisitable()

```cpp
rmg::Area & areaVisitable();
```

返回可访问格子区域的引用，允许外部修改。

### getRoads()

```cpp
const rmg::Area & getRoads() const;
```

获取道路区域的常量引用。

### createRoad() [protected]

```cpp
bool createRoad(const int3 & dst);
```

尝试创建到指定目的地的道路。

### createRoadDesperate() [protected]

```cpp
rmg::Path createRoadDesperate(rmg::Path & path, const int3 & destination);
```

在常规方法失败时，尝试创建绝望路径（可能绕过障碍物）。

### drawRoads() [protected]

```cpp
void drawRoads(bool secondary = false);
```

实际更新地图格子，绘制道路。secondary参数控制是否为次要道路。

## 设计特点

RoadPlacer 实现了智能的道路网络生成算法，能够连接地图中的重要节点，同时考虑地形障碍和可访问性。它使用路径规划技术来创建自然-looking的道路系统，支持主道路和次要道路的区分。

该类维护了道路节点、道路区域和孤立区域的概念，能够处理复杂的地图拓扑。VISITABLE_PENALTY常量的使用确保道路倾向于避开被对象占据的区域。

通过Modificator接口集成到RMG系统中，RoadPlacer与其他地图组件协同工作，创建具有连通性和实用性的地图布局。