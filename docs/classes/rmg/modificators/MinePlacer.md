# MinePlacer

## 源文件

[MinePlacer.h](https://github.com/vcmi/vcmi/blob/master/lib/rmg/modificators/MinePlacer.h)

## 类定义

```cpp
class MinePlacer: public Modificator
```

`MinePlacer` 是随机地图生成器中的矿场放置器，负责在地图上放置各种类型的矿场。

## 继承关系

- 继承自 `Modificator`

## 方法

### 主要处理方法

- `void process() override` - 执行矿场放置的主要处理逻辑
- `void init() override` - 初始化矿场放置器

### 受保护方法

- `bool placeMines(ObjectManager & manager)` - 使用对象管理器放置矿场

## 设计特点

- **资源生成**: 负责在地图上分布各种资源矿场
- **对象管理**: 与对象管理器协作确保矿场正确放置
- **地图平衡**: 帮助创建资源分布平衡的地图
- **继承扩展**: 可以通过继承自定义矿场放置逻辑