# TownPlacer

## 源文件

[TownPlacer.h](lib/rmg/modificators/TownPlacer.h)

## 类定义

```cpp
class TownPlacer: public Modificator
```

TownPlacer 类继承自 Modificator，负责在随机地图生成过程中放置城镇和相关建筑，如矿山。

## 宏定义

```cpp
MODIFICATOR(TownPlacer);
```

## 前向声明

```cpp
class ObjectManager;
class CGTownInstance;
```

依赖的类声明。

## 成员变量

```cpp
int totalTowns = 0;
```

地图中放置的总城镇数量。

## 方法

### process()

```cpp
void process() override;
```

重写基类的process方法，执行城镇放置的主要逻辑。

### init()

```cpp
void init() override;
```

重写基类的init方法，初始化城镇放置器。

### getTotalTowns()

```cpp
int getTotalTowns() const;
```

获取地图中放置的总城镇数量。

### cleanupBoundaries() [protected]

```cpp
void cleanupBoundaries(const rmg::Object & rmgObject);
```

清理指定对象的边界区域。

### addNewTowns() [protected]

```cpp
void addNewTowns(int count, bool hasFort, const PlayerColor & player, ObjectManager & manager);
```

添加指定数量的新城镇，指定是否有堡垒和所属玩家。

### getRandomTownType() [protected]

```cpp
FactionID getRandomTownType(bool matchUndergroundType = false);
```

获取随机城镇类型，可选择是否匹配地下类型。

### getTownTypeFromHint() [protected]

```cpp
FactionID getTownTypeFromHint(size_t hintIndex);
```

根据提示索引获取城镇类型。

### placeTowns() [protected]

```cpp
void placeTowns(ObjectManager & manager);
```

使用对象管理器放置城镇。

### placeMines() [protected]

```cpp
bool placeMines(ObjectManager & manager);
```

放置矿山，返回是否成功。

### placeMainTown() [protected]

```cpp
int3 placeMainTown(ObjectManager & manager, std::shared_ptr<CGTownInstance> town);
```

放置主城镇，返回放置位置。

## 设计特点

TownPlacer 管理地图中城镇的分布和配置，包括随机城镇类型的选择、玩家分配和建筑物的放置。它与ObjectManager紧密合作，确保城镇放置符合地图生成规则和平衡性要求。

该类支持多种城镇类型（通过FactionID），能够处理有堡垒和无堡垒的城镇，并提供主城镇的特殊放置逻辑。矿山放置功能扩展了城镇相关的经济基础设施。

通过Modificator接口集成到RMG系统中，TownPlacer与其他地图组件协同工作，创建具有战略意义和经济价值的地图布局。