# RockFiller

## 源文件

[RockFiller.h](lib/rmg/modificators/RockFiller.h)

## 类定义

```cpp
class RockFiller: public Modificator
```

RockFiller 类继承自 Modificator，负责在随机地图生成过程中填充岩石地形，创建自然的地形边界和障碍物。

## 宏定义

```cpp
MODIFICATOR(RockFiller);
```

## 方法

### process()

```cpp
void process() override;
```

重写基类的process方法，执行岩石填充的主要逻辑。

### init()

```cpp
void init() override;
```

重写基类的init方法，初始化岩石填充器。

### dump()

```cpp
char dump(const int3 &) override;
```

重写基类的dump方法，用于调试输出指定位置的信息。

### processMap()

```cpp
void processMap();
```

处理地图，执行岩石填充的具体算法。

## 设计特点

RockFiller 专注于地图的地形完善，通过在适当的位置放置岩石来创建更真实的地形。它是RMG系统中地形生成管道的一部分，确保地图具有适当的障碍物分布和地形多样性。

该类通过Modificator接口集成到RMG系统中，与其他地形修改器协同工作，创建具有视觉吸引力和战略深度的地图布局。