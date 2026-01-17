# WaterRoutes

## 源文件

[WaterRoutes.h](lib/rmg/modificators/WaterRoutes.h)

## 类定义

```cpp
class WaterRoutes: public Modificator
```

WaterRoutes 类继承自 Modificator，负责计算和优化地图中的水路路由。

## 宏定义

```cpp
MODIFICATOR(WaterRoutes);
```

## 结构体

### RouteInfo

```cpp
struct RouteInfo
```

水路路由信息结构体。

#### RouteInfo 成员变量

```cpp
rmg::Area blocked;
```

路由中被阻塞的区域。

```cpp
int3 visitable;
```

可访问的位置坐标。

```cpp
int3 boarding;
```

登船位置坐标。

```cpp
rmg::Area water;
```

路由经过的水域区域。

## 成员变量

```cpp
std::vector<RouteInfo> result;
```

计算出的路由结果列表。

## 方法

### process()

```cpp
void process() override;
```

重写基类的process方法，执行水路路由计算的主要逻辑。

### init()

```cpp
void init() override;
```

重写基类的init方法，初始化水路路由计算器。

### dump()

```cpp
char dump(const int3 &) override;
```

重写基类的dump方法，用于调试输出指定位置的信息。

## 设计特点

WaterRoutes 专注于水路路径的计算和优化，生成RouteInfo结构体来描述每条水路的详细信息。它确保水域交通的连通性和效率。

该类通过Modificator接口集成到RMG系统中，与WaterProxy等组件协同工作，提供完整的地图水域交通解决方案。

RouteInfo结构体包含了路由的关键信息：阻塞区域、可访问点、登船点和水域范围，这使得水路导航既精确又灵活。