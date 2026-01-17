# RockPlacer

## 源文件

[RockPlacer.h](lib/rmg/modificators/RockPlacer.h)

## 类定义

```cpp
class RockPlacer: public Modificator
```

RockPlacer 类继承自 Modificator，负责在随机地图生成过程中放置岩石地形，创建障碍物和地形边界。

## 宏定义

```cpp
MODIFICATOR(RockPlacer);
```

## 友元类

```cpp
friend class RockFiller;
```

RockFiller 类可以访问 RockPlacer 的私有成员。

## 成员变量

```cpp
rmg::Area rockArea;
```

岩石占据的区域。

```cpp
rmg::Area accessibleArea;
```

地图中可访问的区域。

```cpp
TerrainId rockTerrain;
```

用于岩石的地形类型ID。

## 方法

### process()

```cpp
void process() override;
```

重写基类的process方法，执行岩石放置的主要逻辑。

### init()

```cpp
void init() override;
```

重写基类的init方法，初始化岩石放置器。

### dump()

```cpp
char dump(const int3 &) override;
```

重写基类的dump方法，用于调试输出指定位置的信息。

### blockRock()

```cpp
void blockRock();
```

阻止岩石放置，可能是为了保留某些区域的通行性。

### postProcess()

```cpp
void postProcess();
```

后处理步骤，执行岩石放置后的清理或优化工作。

## 设计特点

RockPlacer 与 RockFiller 协同工作，专门处理岩石地形的放置和配置。它维护了岩石区域和可访问区域的概念，确保地图的通行性和战略平衡。

该类通过Modificator接口集成到RMG系统中，与其他地形生成组件合作，创建具有适当障碍物分布的地图。友元关系允许RockFiller直接访问其内部状态，进行更复杂的岩石填充操作。