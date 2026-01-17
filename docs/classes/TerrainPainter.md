# TerrainPainter

## 源文件

[TerrainPainter.h](lib/rmg/modificators/TerrainPainter.h)

## 类定义

```cpp
class TerrainPainter: public Modificator
```

TerrainPainter 类继承自 Modificator，负责在随机地图生成过程中绘制和配置地形类型。

## 宏定义

```cpp
MODIFICATOR(TerrainPainter);
```

## 方法

### process()

```cpp
void process() override;
```

重写基类的process方法，执行地形绘制的主要逻辑。

### init()

```cpp
void init() override;
```

重写基类的init方法，初始化地形绘制器。

### initTerrainType()

```cpp
void initTerrainType();
```

初始化地形类型，为地形绘制做准备。

## 设计特点

TerrainPainter 专注于地图的地形配置和渲染，是RMG系统中地形生成管道的重要组成部分。它确保地图具有适当的地形类型分布和视觉一致性。

该类通过Modificator接口集成到RMG系统中，与其他地形修改器协同工作，创建具有视觉吸引力和主题一致性的地图布局。