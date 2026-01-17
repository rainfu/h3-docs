# WaterAdopter

## 源文件

[WaterAdopter.h](lib/rmg/modificators/WaterAdopter.h)

## 类定义

```cpp
class WaterAdopter: public Modificator
```

WaterAdopter 类继承自 Modificator，负责在随机地图生成过程中调整和配置水域区域。

## 宏定义

```cpp
MODIFICATOR(WaterAdopter);
```

## 成员变量

```cpp
rmg::Area noWaterArea;
```

无水区域，不应包含水域。

```cpp
rmg::Area waterArea;
```

水域占据的区域。

```cpp
TRmgTemplateZoneId waterZoneId;
```

水区域的模板ID。

```cpp
std::map<int3, int> distanceMap;
```

从水域到陆地的距离映射。

```cpp
std::map<int, rmg::Tileset> reverseDistanceMap;
```

反向距离映射，用于根据距离查找格子集合。

## 方法

### process()

```cpp
void process() override;
```

重写基类的process方法，执行水域调整的主要逻辑。

### init()

```cpp
void init() override;
```

重写基类的init方法，初始化水域调整器。

### dump()

```cpp
char dump(const int3 &) override;
```

重写基类的dump方法，用于调试输出指定位置的信息。

### setWaterZone()

```cpp
void setWaterZone(TRmgTemplateZoneId water);
```

设置水区域的ID。

### getCoastTiles()

```cpp
rmg::Area getCoastTiles() const;
```

获取海岸线格子区域。

### createWater() [protected]

```cpp
void createWater(EWaterContent::EWaterContent waterContent);
```

创建指定内容的水域。

## 设计特点

WaterAdopter 专门处理地图中水域的配置和调整，使用距离映射来精确控制水域的形状和海岸线。它能够根据不同的水域内容类型创建相应的水域区域。

该类维护了水域和无水域的概念，并提供海岸线检测功能，这对于地图的视觉效果和游戏平衡很重要。

通过Modificator接口集成到RMG系统中，WaterAdopter与其他地形生成组件协同工作，创建具有自然水域分布的地图。