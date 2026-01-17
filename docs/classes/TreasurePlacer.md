# TreasurePlacer

## 源文件

[TreasurePlacer.h](lib/rmg/modificators/TreasurePlacer.h)

## 类定义

```cpp
class TreasurePlacer: public Modificator
```

TreasurePlacer 类继承自 Modificator，负责在随机地图生成过程中放置各种宝藏、资源和特殊对象。

## 宏定义

```cpp
MODIFICATOR(TreasurePlacer);
```

## 前向声明

```cpp
class CGObjectInstance;
class ObjectManager;
class RmgMap;
class CMapGenerator;
class ObjectConfig;
```

依赖的类声明。

## 嵌套类

### ObjectPool

```cpp
class ObjectPool
```

对象池类，用于管理可放置的对象集合。

#### ObjectPool 方法

```cpp
void addObject(const ObjectInfo & info);
```

添加对象到池中。

```cpp
void updateObject(MapObjectID id, MapObjectSubID subid, ObjectInfo info);
```

更新池中的对象信息。

```cpp
std::vector<ObjectInfo> & getPossibleObjects();
```

获取所有可能的对象列表。

```cpp
void patchWithZoneConfig(const Zone & zone, TreasurePlacer * tp);
```

使用区域配置修补对象池。

```cpp
void sortPossibleObjects();
```

对可能的对象进行排序。

```cpp
void discardObjectsAboveValue(ui32 value);
```

丢弃价值高于指定值的对象。

```cpp
ObjectConfig::EObjectCategory getObjectCategory(CompoundMapObjectID id);
```

获取对象的类别。

#### ObjectPool 成员变量

```cpp
std::vector<ObjectInfo> possibleObjects;
```

可能放置的对象列表。

```cpp
std::map<CompoundMapObjectID, ObjectInfo> customObjects;
```

自定义对象映射。

## 成员变量

```cpp
int minGuardedValue = 0;
```

需要守卫的最小宝藏价值。

```cpp
rmg::Area treasureArea;
```

宝藏可放置的区域。

```cpp
rmg::Area treasureBlockArea;
```

宝藏阻塞区域（不可放置）。

```cpp
rmg::Area guards;
```

守卫占据的区域。

```cpp
size_t maxPrisons;
```

最大监狱数量。

```cpp
std::vector<const CCreature *> creatures;
```

该区域的本土生物列表。

```cpp
std::vector<int> tierValues;
```

生物等级对应的价值列表。

## 方法

### process()

```cpp
void process() override;
```

重写基类的process方法，执行宝藏放置的主要逻辑。

### init()

```cpp
void init() override;
```

重写基类的init方法，初始化宝藏放置器。

### dump()

```cpp
char dump(const int3 &) override;
```

重写基类的dump方法，用于调试输出指定位置的信息。

### createTreasures()

```cpp
void createTreasures(ObjectManager & manager);
```

使用对象管理器创建宝藏。

### addObjectToRandomPool()

```cpp
void addObjectToRandomPool(const ObjectInfo& oi);
```

将对象添加到随机池中。

### setBasicProperties()

```cpp
void setBasicProperties(ObjectInfo & oi, CompoundMapObjectID objid) const;
```

设置对象的基本属性。

### addCommonObjects()

```cpp
void addCommonObjects();
```

添加常见对象到对象池。

### addDwellings()

```cpp
void addDwellings();
```

添加居民点到对象池。

### addPandoraBoxes()

```cpp
void addPandoraBoxes();
```

添加潘多拉魔盒到对象池。

### addPandoraBoxesWithGold()

```cpp
void addPandoraBoxesWithGold();
```

添加含金币的潘多拉魔盒。

### addPandoraBoxesWithExperience()

```cpp
void addPandoraBoxesWithExperience();
```

添加含经验的潘多拉魔盒。

### addPandoraBoxesWithCreatures()

```cpp
void addPandoraBoxesWithCreatures();
```

添加含生物的潘多拉魔盒。

### addPandoraBoxesWithSpells()

```cpp
void addPandoraBoxesWithSpells();
```

添加含法术的潘多拉魔盒。

### addSeerHuts()

```cpp
void addSeerHuts();
```

添加先知小屋到对象池。

### addPrisons()

```cpp
void addPrisons();
```

添加监狱到对象池。

### addScrolls()

```cpp
void addScrolls();
```

添加卷轴到对象池。

### addAllPossibleObjects()

```cpp
void addAllPossibleObjects();
```

添加所有可能的对象，包括区域特定的对象。

### setMaxPrisons()

```cpp
void setMaxPrisons(size_t count);
```

设置最大监狱数量。

### getMaxPrisons()

```cpp
size_t getMaxPrisons() const;
```

获取最大监狱数量。

### creatureToCount()

```cpp
int creatureToCount(const CCreature * creature) const;
```

将生物转换为计数。

### isGuardNeededForTreasure() [protected]

```cpp
bool isGuardNeededForTreasure(int value);
```

判断指定价值的宝藏是否需要守卫。

### getRandomObject() [protected]

```cpp
ObjectInfo * getRandomObject(ui32 desiredValue, ui32 currentValue, bool allowLargeObjects);
```

获取随机对象，根据期望价值和当前价值。

### prepareTreasurePile() [protected]

```cpp
std::vector<ObjectInfo*> prepareTreasurePile(const CTreasureInfo & treasureInfo);
```

准备宝藏堆。

### constructTreasurePile() [protected]

```cpp
rmg::Object constructTreasurePile(const std::vector<ObjectInfo*> & treasureInfos, bool densePlacement = false);
```

构造宝藏堆对象。

## 设计特点

TreasurePlacer 是RMG系统中功能最复杂的组件之一，负责管理各种宝藏对象的放置。它使用ObjectPool来组织和管理可用的对象，支持多种类型的宝藏：潘多拉魔盒、居民点、先知小屋、监狱、卷轴等。

该类实现了复杂的价值平衡系统，根据宝藏价值决定是否需要守卫，并支持密集放置模式。生物等级价值系统确保了宝藏的平衡性。

通过Modificator接口集成到RMG系统中，TreasurePlacer与其他组件协同工作，创建具有丰富内容和适当挑战性的地图。