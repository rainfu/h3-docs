# WaterProxy

## 源文件

[WaterProxy.h](lib/rmg/modificators/WaterProxy.h)

## 类定义

```cpp
class WaterProxy: public Modificator
```

WaterProxy 类继承自 Modificator，负责管理水域区域的连接、导航和交通设施的放置。

## 宏定义

```cpp
MODIFICATOR(WaterProxy);
```

## 前向声明

```cpp
struct RouteInfo;
```

路由信息结构体声明。

## 嵌套结构体

### Lake

```cpp
struct Lake
```

表示水域中的湖泊或水域区域。

#### Lake 成员变量

```cpp
rmg::Area area;
```

湖泊的水格子区域。

```cpp
std::map<int3, int> distanceMap;
```

湖泊的距离映射。

```cpp
std::map<int, rmg::Tileset> reverseDistanceMap;
```

反向距离映射。

```cpp
std::map<TRmgTemplateZoneId, rmg::Area> neighbourZones;
```

相邻区域映射，Area表示陆地部分。

```cpp
std::set<TRmgTemplateZoneId> keepConnections;
```

需要保持连接的区域集合。

```cpp
std::set<TRmgTemplateZoneId> keepRoads;
```

需要保持道路的区域集合。

## 成员变量

```cpp
std::vector<Lake> lakes;
```

区域中断开的水域部分，用于处理水域区域。

```cpp
std::map<int3, int> lakeMap;
```

格子到湖泊ID的映射，湖泊ID是lakes数组中的位置+1。

## 方法

### waterKeepConnection()

```cpp
bool waterKeepConnection(const rmg::ZoneConnection & connection, bool createRoad);
```

判断是否应该保持水域连接，可选择是否创建道路。

### waterRoute()

```cpp
RouteInfo waterRoute(Zone & dst);
```

计算到目标区域的水路路由。

### process()

```cpp
void process() override;
```

重写基类的process方法，执行水域代理的主要逻辑。

### init()

```cpp
void init() override;
```

重写基类的init方法，初始化水域代理。

### dump()

```cpp
char dump(const int3 &) override;
```

重写基类的dump方法，用于调试输出指定位置的信息。

### getLakes()

```cpp
const std::vector<Lake> & getLakes() const;
```

获取所有湖泊的常量引用。

### collectLakes() [protected]

```cpp
void collectLakes();
```

收集区域中的所有湖泊。

### placeShipyard() [protected]

```cpp
bool placeShipyard(Zone & land, const Lake & lake, si32 guard, bool createRoad, RouteInfo & info);
```

在指定陆地和湖泊之间放置船坞。

### placeBoat() [protected]

```cpp
bool placeBoat(Zone & land, const Lake & lake, bool createRoad, RouteInfo & info);
```

在指定陆地和湖泊之间放置船只。

## 设计特点

WaterProxy 是RMG系统中处理水域交通的关键组件。它将水域区域分解为独立的湖泊，管理湖泊之间的连接和导航路径。该类支持船坞和船只的智能放置，确保玩家能够有效地穿越水域。

Lake结构体提供了丰富的湖泊信息，包括距离映射、相邻区域和连接策略。这使得WaterProxy能够做出智能的交通决策，保持水域的可导航性。

通过Modificator接口集成到RMG系统中，WaterProxy与其他组件协同工作，创建具有战略水域交通的地图。