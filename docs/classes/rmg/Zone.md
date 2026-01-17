# Zone

## 概述

`Zone` 类是 VCMI 随机地图生成器（RMG）中的区域管理核心。该类表示地图生成过程中的一个逻辑区域，负责管理区域几何、对象放置、路径连接和修改器协调。它提供了线程安全的区域访问和完整的区域生命周期管理。

## 依赖和包含

```cpp
#include "float3.h"
#include "CRmgTemplate.h"
#include "RmgArea.h"
#include "RmgPath.h"
#include "RmgObject.h"
#include "modificators/Modificator.h"
```

## 全局常量

### AREA_NO_FILTER
```cpp
extern const std::function<bool(const int3 &)> AREA_NO_FILTER;
```
无过滤函数，用于路径搜索。

## 类型定义

### TModificators
```cpp
typedef std::list<std::shared_ptr<Modificator>> TModificators;
```
修改器列表类型。

## ThreadSafeProxy 模板类

### 概述
提供线程安全的资源访问代理。

### 构造函数
```cpp
ThreadSafeProxy(T& resource, std::recursive_mutex& mutex);
```

### 操作符重载
```cpp
T* operator->();
const T* operator->() const;
T& operator*();
const T& operator*() const;
T& get();
const T& get() const;
```

### 算术操作符
```cpp
T operator+(const T & other);
template <typename U> T operator+(ThreadSafeProxy<U> & other);
template <typename U> T operator+(ThreadSafeProxy<U> && other);
```

## Zone 类

### 继承关系
```cpp
class Zone : public rmg::ZoneOptions
```

### 构造函数
```cpp
Zone(RmgMap & map, CMapGenerator & generator, vstd::RNG & rand);
```
使用地图、生成器和随机数生成器构造区域。

### 禁用复制
```cpp
Zone(const Zone &) = delete;
```

### 析构函数
```cpp
~Zone();
```

## 配置方法

### setOptions
```cpp
void setOptions(const rmg::ZoneOptions & options);
```
设置区域选项。

### isUnderground
```cpp
bool isUnderground() const;
```
检查是否为地下区域。

**返回值：** 如果是地下区域返回 true

## 位置管理

### getCenter
```cpp
float3 getCenter() const;
```
获取区域中心（浮点坐标）。

### setCenter
```cpp
void setCenter(const float3 &f);
```
设置区域中心。

### getPos
```cpp
int3 getPos() const;
```
获取区域位置（整数坐标）。

### setPos
```cpp
void setPos(const int3 &pos);
```
设置区域位置。

### moveToCenterOfMass
```cpp
void moveToCenterOfMass();
```
将位置移动到质量中心。

## 线程安全区域访问

### area (可变)
```cpp
ThreadSafeProxy<rmg::Area> area();
```
获取区域（线程安全）。

### area (常量)
```cpp
ThreadSafeProxy<const rmg::Area> area() const;
```
获取常量区域（线程安全）。

### areaPossible (可变)
```cpp
ThreadSafeProxy<rmg::Area> areaPossible();
```
获取可能区域。

### areaPossible (常量)
```cpp
ThreadSafeProxy<const rmg::Area> areaPossible() const;
```
获取常量可能区域。

### freePaths (可变)
```cpp
ThreadSafeProxy<rmg::Area> freePaths();
```
获取自由路径区域。

### freePaths (常量)
```cpp
ThreadSafeProxy<const rmg::Area> freePaths() const;
```
获取常量自由路径区域。

### areaUsed (可变)
```cpp
ThreadSafeProxy<rmg::Area> areaUsed();
```
获取已使用区域。

### areaUsed (常量)
```cpp
ThreadSafeProxy<const rmg::Area> areaUsed() const;
```
获取常量已使用区域。

## 特殊区域

### areaForRoads
```cpp
rmg::Area areaForRoads() const;
```
获取道路专用区域。

## 初始化和清理

### initFreeTiles
```cpp
void initFreeTiles();
```
初始化自由瓦片。

### clearTiles
```cpp
void clearTiles();
```
清除瓦片。

### fractalize
```cpp
void fractalize();
```
对区域进行分形化处理。

## 类型设置

### getTownType
```cpp
FactionID getTownType() const;
```
获取城镇类型。

### setTownType
```cpp
void setTownType(FactionID town);
```
设置城镇类型。

### getTerrainType
```cpp
TerrainId getTerrainType() const;
```
获取地形类型。

### setTerrainType
```cpp
void setTerrainType(TerrainId terrain);
```
设置地形类型。

## 路径管理

### connectPath
```cpp
void connectPath(const rmg::Path & path);
```
连接路径到区域。

### searchPath (区域到区域)
```cpp
rmg::Path searchPath(const rmg::Area & src, bool onlyStraight, const std::function<bool(const int3 &)> & areafilter = AREA_NO_FILTER) const;
```
在区域内搜索路径。

### searchPath (点到区域)
```cpp
rmg::Path searchPath(const int3 & src, bool onlyStraight, const std::function<bool(const int3 &)> & areafilter = AREA_NO_FILTER) const;
```
从点搜索到区域的路径。

### searchPath (限制搜索区域)
```cpp
rmg::Path searchPath(const rmg::Area & src, bool onlyStraight, const rmg::Area & searchArea) const;
```
在指定搜索区域内搜索路径。

## 修改器管理

### getModificators
```cpp
TModificators getModificators();
```
获取所有修改器。

### getModificator (模板)
```cpp
template<class T>
T* getModificator()
```
获取指定类型的修改器。

**返回值：** 如果找到返回指针，否则返回 nullptr

### addModificator (模板)
```cpp
template<class T>
void addModificator()
```
添加指定类型的修改器。

### initModificators
```cpp
void initModificators();
```
初始化所有修改器。

## 随机数生成

### getRand
```cpp
vstd::RNG & getRand();
```
获取随机数生成器。

## 公共成员

### areaMutex
```cpp
mutable std::recursive_mutex areaMutex;
```
区域访问互斥锁。

### Lock
```cpp
using Lock = std::unique_lock<std::recursive_mutex>;
```
锁类型别名。

## 保护成员

### generator
```cpp
CMapGenerator & generator;
```
地图生成器引用。

### rand
```cpp
std::unique_ptr<vstd::RNG> rand;
```
随机数生成器。

### map
```cpp
RmgMap & map;
```
RMG地图引用。

### modificators
```cpp
TModificators modificators;
```
修改器列表。

### finished
```cpp
bool finished;
```
是否完成标志。

### 位置信息
```cpp
int3 pos;      // 位置
float3 center; // 中心
```

### 区域数据
```cpp
rmg::Area dArea;        // 不规则分配区域
rmg::Area dAreaPossible; // 可能区域
rmg::Area dAreaFree;     // 自由瓦片核心路径
rmg::Area dAreaUsed;     // 已使用区域
```

### possibleQuestArtifactPos
```cpp
std::vector<int3> possibleQuestArtifactPos;
```
可能的任务神器位置。

### 类型信息
```cpp
FactionID townType;   // 城镇类型
TerrainId terrainType; // 地形类型
```

## 工作原理

### 线程安全
使用 ThreadSafeProxy 提供线程安全的区域访问：

```cpp
{
    auto area = zone.area();  // 自动加锁
    area->add(int3(1,1,0));   // 线程安全操作
} // 自动解锁
```

### 区域层次
Zone 管理四个层次的区域：

1. **dArea**: 分配给区域的不规则区域
2. **dAreaPossible**: 可以使用的可能区域
3. **dAreaFree**: 自由瓦片的路径核心
4. **dAreaUsed**: 已被对象使用的区域

### 修改器系统
支持插件式的修改器架构：

```cpp
// 添加城镇放置器
zone.addModificator<TownPlacer>();

// 获取特定修改器
auto* placer = zone.getModificator<TownPlacer>();
```

### 路径搜索
提供灵活的路径搜索功能：

```cpp
// 直线路径搜索
auto path = zone.searchPath(startArea, true);

// 带过滤的路径搜索
auto path = zone.searchPath(startPos, false, 
    [](const int3& tile) { return isValidTile(tile); });
```

## 使用示例

```cpp
// 创建区域
Zone zone(map, generator, rng);

// 设置选项
rmg::ZoneOptions options;
options.setTownType(FactionID::CASTLE);
options.setTerrainType(TerrainId::GRASS);
zone.setOptions(options);

// 初始化
zone.initFreeTiles();
zone.initModificators();

// 线程安全的区域操作
{
    auto area = zone.area();
    area->add(int3(10, 10, 0));
    area->unite(neighborArea);
}

// 路径搜索
rmg::Path path = zone.searchPath(startPos, false);
if (!path.empty()) {
    zone.connectPath(path);
}

// 获取修改器
auto* townPlacer = zone.getModificator<TownPlacer>();
if (townPlacer) {
    townPlacer->placeTowns();
}
```

## 性能特性

- **线程安全**: 区域访问完全线程安全
- **懒加载**: 区域数据按需计算
- **缓存优化**: 路径搜索结果缓存
- **内存管理**: 智能指针管理修改器生命周期

## 相关类

- `rmg::ZoneOptions`: 区域选项配置
- `rmg::Area`: 区域几何管理
- `rmg::Path`: 路径管理
- `Modificator`: 修改器基类
- `CMapGenerator`: 地图生成器
- `RmgMap`: RMG地图类