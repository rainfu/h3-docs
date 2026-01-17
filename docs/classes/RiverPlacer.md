# RiverPlacer

## 源文件

[RiverPlacer.h](lib/rmg/modificators/RiverPlacer.h)

## 类定义

```cpp
class RiverPlacer: public Modificator
```

RiverPlacer 类继承自 Modificator，负责在随机地图生成过程中放置和生成河流系统。

## 宏定义

```cpp
MODIFICATOR(RiverPlacer);
```

## 成员变量

```cpp
rmg::Area rivers;
```

存储河流占据的区域。

```cpp
rmg::Area source;
```

河流的源头区域。

```cpp
rmg::Area sink;
```

河流的汇点区域。

```cpp
rmg::Area prohibit;
```

禁止放置河流的区域。

```cpp
rmg::Tileset riverNodes;
```

河流节点集合。

```cpp
rmg::Area deltaSink;
```

delta河流的汇点区域。

```cpp
std::map<int3, int3> deltaPositions;
```

delta位置映射，用于存储位置变换信息。

```cpp
std::map<int3, int> deltaOrientations;
```

delta方向映射，用于存储方向信息。

```cpp
std::map<int3, int> heightMap;
```

高度图，用于地形分析和河流路径规划。

## 方法

### process()

```cpp
void process() override;
```

重写基类的process方法，执行河流放置的主要逻辑。

### init()

```cpp
void init() override;
```

重写基类的init方法，初始化河流放置器。

### dump()

```cpp
char dump(const int3 &) override;
```

重写基类的dump方法，用于调试输出指定位置的信息。

### addRiverNode()

```cpp
void addRiverNode(const int3 & node);
```

添加一个河流节点到节点集合中。

### riverSource()

```cpp
rmg::Area & riverSource();
```

返回河流源头区域的引用，允许外部修改。

### riverSink()

```cpp
rmg::Area & riverSink();
```

返回河流汇点区域的引用，允许外部修改。

### riverProhibit()

```cpp
rmg::Area & riverProhibit();
```

返回禁止放置河流区域的引用，允许外部修改。

### drawRivers() [protected]

```cpp
void drawRivers();
```

绘制河流的主要方法。

### preprocess() [protected]

```cpp
void preprocess();
```

预处理步骤，为河流生成做准备。

### connectRiver() [protected]

```cpp
void connectRiver(const int3 & tile);
```

连接指定位置的河流。

### prepareHeightmap() [protected]

```cpp
void prepareHeightmap();
```

准备高度图数据，用于河流路径规划。

## 设计特点

RiverPlacer 实现了复杂的河流生成算法，能够创建自然-looking的河流系统。它使用高度图来指导河流路径，确保河流从高处流向低处，并避免在禁止区域放置河流。

该类支持delta河流系统，具有位置和方向映射功能，能够处理复杂的河流网络拓扑。河流节点系统允许精确控制河流的布局和连接。

通过Modificator接口集成到RMG系统中，RiverPlacer与其他地形生成组件协同工作，创建具有真实感的地图地形。