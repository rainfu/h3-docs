# ObstacleSetHandler

## 概述

`ObstacleSetHandler` 系统负责管理VCMI中的地图障碍物集合，为随机地图生成器(RMG)提供障碍物模板和配置。该系统支持多种类型的障碍物，按地形、派系、对齐方式等进行分类和过滤。

## 主要组件

### ObstacleSet 类

障碍物集合类，定义了一组相关障碍物的配置。

#### 障碍物类型枚举

```cpp
enum EObstacleType
{
    INVALID = -1,
    MOUNTAINS = 0,    // 山脉
    TREES,            // 树木
    LAKES,            // 湖泊（包括干涸或熔岩湖）
    CRATERS,          // 陨石坑（峡谷、峡谷等）
    ROCKS,            // 岩石
    PLANTS,           // 植物（花、仙人掌、蘑菇、原木、灌木等）
    STRUCTURES,       // 建筑（建筑、废墟等）
    ANIMALS,          // 动物（活的或骨骼）
    OTHER             // 其他（水晶、沉船、桶等）
};
```

#### 核心属性

- `id`: 障碍物集合的唯一标识符
- `type`: 障碍物类型
- `level`: 地图等级（地面/地下）
- `allowedTerrains`: 允许的地形类型集合
- `allowedFactions`: 允许的派系集合
- `allowedAlignments`: 允许的对齐方式集合
- `obstacles`: 障碍物模板列表

#### 核心方法

```cpp
void addObstacle(std::shared_ptr<const ObjectTemplate> obstacle);
```

添加障碍物模板到集合。

```cpp
std::vector<std::shared_ptr<const ObjectTemplate>> getObstacles() const;
```

获取所有障碍物模板。

```cpp
void setType(EObstacleType type);
void setTerrain(TerrainId terrain);
void setTerrains(const std::set<TerrainId> & terrains);
void addTerrain(TerrainId terrain);
```

设置允许的地形类型。

```cpp
void setLevel(EMapLevel level);
```

设置地图等级。

```cpp
void addAlignment(EAlignment alignment);
void addFaction(FactionID faction);
```

添加允许的对齐方式和派系。

```cpp
static EObstacleType typeFromString(const std::string &str);
std::string toString() const;
```

类型字符串转换。

### ObstacleSetFilter 类

障碍物集合过滤器，用于筛选合适的障碍物集合。

#### 构造函数

```cpp
ObstacleSetFilter(ObstacleSet::EObstacleType allowedType, TerrainId terrain, EMapLevel level, FactionID faction, EAlignment alignment);
ObstacleSetFilter(std::vector<ObstacleSet::EObstacleType> allowedTypes, TerrainId terrain, EMapLevel level, FactionID faction, EAlignment alignment);
```

创建过滤器。

#### 核心方法

```cpp
bool filter(const ObstacleSet &set) const;
```

检查障碍物集合是否通过过滤器。

```cpp
void setType(ObstacleSet::EObstacleType type);
void setTypes(const std::vector<ObstacleSet::EObstacleType> & types);
```

设置允许的类型。

### ObstacleSetHandler 类

障碍物集合处理器，继承自IHandlerBase。

#### 核心方法

```cpp
void loadObject(std::string scope, std::string name, const JsonNode & data) override;
void loadObject(std::string scope, std::string name, const JsonNode & data, size_t index) override;
```

加载障碍物对象配置。

```cpp
std::shared_ptr<ObstacleSet> loadFromJson(const std::string & scope, const JsonNode & json, const std::string & name, size_t index);
```

从JSON配置加载障碍物集合。

```cpp
ObstacleSet::EObstacleType convertObstacleClass(MapObjectID id);
```

转换地图对象ID为障碍物类型。

```cpp
void addTemplate(const std::string & scope, const std::string &name, std::shared_ptr<const ObjectTemplate> tmpl);
void addObstacleSet(std::shared_ptr<ObstacleSet> set);
```

添加障碍物模板和集合。

```cpp
TObstacleTypes getObstacles(const ObstacleSetFilter &filter) const;
```

根据过滤器获取障碍物集合。

## 机制说明

### 障碍物分类

1. **类型分类**: 按视觉和功能特征分类障碍物
2. **地形适配**: 不同障碍物适合不同地形类型
3. **派系关联**: 某些障碍物与特定派系相关
4. **等级区分**: 地面和地下地图的障碍物区分

### 过滤系统

1. **多条件过滤**: 支持类型、地形、等级、派系、对齐方式等多条件过滤
2. **灵活配置**: 可以设置多个允许类型或单一类型
3. **精确匹配**: 确保障碍物适合目标位置

### 配置加载

1. **JSON配置**: 从JSON文件加载障碍物配置
2. **模板管理**: 管理障碍物模板的注册和访问
3. **集合组织**: 将相关障碍物组织到集合中

## 依赖关系

- **IHandlerBase**: 处理器基类
- **ObjectTemplate**: 对象模板类
- **JsonNode**: JSON节点类
- **MapObjectID**: 地图对象ID类型
- **TerrainId**: 地形ID类型
- **FactionID**: 派系ID类型

## 使用示例

### 创建障碍物集合

```cpp
#include "ObstacleSetHandler.h"

// 创建树木障碍物集合
auto treeSet = std::make_shared<ObstacleSet>(ObstacleSet::TREES, TerrainId::GRASS);
treeSet->setLevel(EMapLevel::GROUND);

// 添加树木模板
treeSet->addObstacle(treeTemplate1);
treeSet->addObstacle(treeTemplate2);

// 设置允许地形
treeSet->addTerrain(TerrainId::GRASS);
treeSet->addTerrain(TerrainId::DIRT);
```

### 使用过滤器

```cpp
#include "ObstacleSetHandler.h"

// 创建过滤器：地面草地上的树木
ObstacleSetFilter filter(ObstacleSet::TREES, TerrainId::GRASS, EMapLevel::GROUND, FactionID::NEUTRAL, EAlignment::GOOD);

// 获取匹配的障碍物
auto obstacles = handler->getObstacles(filter);

for (auto & obstacleSet : obstacles)
{
    // 使用障碍物集合
    auto templates = obstacleSet->getObstacles();
    // 随机选择模板放置障碍物
}
```

### 配置加载

```cpp
#include "ObstacleSetHandler.h"

// 加载JSON配置
JsonNode config = JsonNode("path/to/obstacle_config.json");
auto obstacleSet = handler->loadFromJson("core", config, "forest_trees", 0);

// 添加到处理器
handler->addObstacleSet(obstacleSet);
```

### RMG集成

```cpp
#include "ObstacleSetHandler.h"

// 在随机地图生成中使用
class RandomMapGenerator
{
    void placeObstacles(TerrainId terrain, EMapLevel level)
    {
        // 创建过滤器
        ObstacleSetFilter filter({}, terrain, level, FactionID::NEUTRAL, EAlignment::NEUTRAL);
        
        // 获取可用障碍物
        auto availableObstacles = obstacleHandler->getObstacles(filter);
        
        // 随机放置障碍物
        for (auto & obstacleSet : availableObstacles)
        {
            if (shouldPlaceObstacle())
            {
                auto templates = obstacleSet->getObstacles();
                auto selectedTemplate = selectRandom(templates);
                placeObstacleAt(selectedTemplate, randomPosition);
            }
        }
    }
};
```

## 性能特性

- **过滤效率**: 过滤器快速排除不匹配的集合
- **内存管理**: 模板共享减少内存占用
- **加载优化**: JSON配置的一次性加载
- **查询性能**: 集合查询通常是O(1)到O(log n)

## 实现注意事项

1. **类型一致性**: 确保障碍物类型枚举与实际对象对应
2. **配置验证**: 验证JSON配置的完整性和正确性
3. **地形匹配**: 正确匹配障碍物与地形的兼容性
4. **随机化**: 提供足够的随机性避免重复模式

## 相关文档

- [ObjectTemplate](ObjectTemplate.md) - 对象模板类
- [IHandlerBase](IHandlerBase.md) - 处理器基类
- RMG系统相关文档