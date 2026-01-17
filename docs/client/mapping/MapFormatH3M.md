# MapFormatH3M

## 概述

`MapFormatH3M` 是 VCMI 的 H3M (Heroes 3 Map) 格式加载器类。该文件定义了从 H3M 文件加载地图数据的完整系统，包括地图头信息、对象、事件等的解析。

## 枚举定义

### EVictoryConditionType
```cpp
enum class EVictoryConditionType : int8_t
```
胜利条件类型枚举。

#### 标准枚举值
- `WINSTANDARD = -1`: 标准胜利条件
- `ARTIFACT = 0`: 获取特定神器
- `GATHERTROOP = 1`: 收集特定部队
- `GATHERRESOURCE = 2`: 收集特定资源
- `BUILDCITY = 3`: 建造特定城市
- `BUILDGRAIL = 4`: 建造圣杯
- `BEATHERO = 5`: 击败特定英雄
- `CAPTURECITY = 6`: 占领特定城市
- `BEATMONSTER = 7`: 击败特定怪物
- `TAKEDWELLINGS = 8`: 占领特定居民地
- `TAKEMINES = 9`: 占领特定矿场
- `TRANSPORTITEM = 10`: 运输特定物品

#### HOTA扩展条件
- `HOTA_ELIMINATE_ALL_MONSTERS = 11`: 消灭所有怪物
- `HOTA_SURVIVE_FOR_DAYS = 12`: 存活特定天数

### ELossConditionType
```cpp
enum class ELossConditionType : int8_t
```
失败条件类型枚举。

#### 枚举值
- `LOSSSTANDARD = -1`: 标准失败条件
- `LOSSCASTLE = 0`: 失去所有城堡
- `LOSSHERO = 1`: 失去特定英雄
- `TIMEEXPIRES = 2`: 时间到期

## CMapLoaderH3M 类

### 概述
H3M地图格式的具体加载器实现。

### 构造函数
```cpp
CMapLoaderH3M(const std::string & mapName, const std::string & modName, const std::string & encodingName, CInputStream * stream);
```

**参数：**
- `mapName`: 地图名称
- `modName`: 模组名称
- `encodingName`: 文件编码
- `stream`: 输入流

### 主要方法

#### loadMap
```cpp
std::unique_ptr<CMap> loadMap(IGameInfoCallback * cb) override;
```
加载完整地图。

#### loadMapHeader
```cpp
std::unique_ptr<CMapHeader> loadMapHeader() override;
```
加载地图头信息。

### 初始化和读取方法

#### init
```cpp
void init();
```
从输入缓冲区初始化地图对象。

#### readHeader
```cpp
void readHeader();
```
读取地图头信息。

#### readPlayerInfo
```cpp
void readPlayerInfo();
```
读取玩家信息。

#### readVictoryLossConditions
```cpp
void readVictoryLossConditions();
```
读取胜利/失败条件。

#### readTeamInfo
```cpp
void readTeamInfo();
```
读取队伍信息。

#### readMapOptions
```cpp
void readMapOptions();
```
读取地图选项标志。

#### readAllowedHeroes
```cpp
void readAllowedHeroes();
```
读取允许的英雄列表。

#### readDisposedHeroes
```cpp
void readDisposedHeroes();
```
读取已处理的英雄列表。

#### readAllowedArtifacts
```cpp
void readAllowedArtifacts();
```
读取允许的神器列表。

#### readAllowedSpellsAbilities
```cpp
void readAllowedSpellsAbilities();
```
读取允许的法术和技能。

### 对象读取方法

#### readObject
```cpp
std::shared_ptr<CGObjectInstance> readObject(MapObjectID id, MapObjectSubID subid, std::shared_ptr<const ObjectTemplate> objectTemplate, const int3 & objectPosition, const ObjectInstanceID & idToBeGiven);
```
基于模板从输入流读取单个对象。

#### 专用对象读取方法
```cpp
std::shared_ptr<CGObjectInstance> readEvent(const int3 & objectPosition, const ObjectInstanceID & idToBeGiven);
std::shared_ptr<CGObjectInstance> readMonster(const int3 & objectPosition, const ObjectInstanceID & idToBeGiven);
std::shared_ptr<CGObjectInstance> readHero(const int3 & initialPos, const ObjectInstanceID & idToBeGiven);
std::shared_ptr<CGObjectInstance> readSeerHut(const int3 & initialPos, const ObjectInstanceID & idToBeGiven);
std::shared_ptr<CGObjectInstance> readTown(const int3 & position, std::shared_ptr<const ObjectTemplate> objTempl, const ObjectInstanceID & idToBeGiven);
// ... 更多专用读取方法
```

### 辅助方法

#### readCreatureSet
```cpp
void readCreatureSet(CArmedInstance * out, const ObjectInstanceID & idToBeGiven);
```
读取生物集合。

#### readQuest
```cpp
EQuestMission readQuest(IQuestObject * guard, const int3 & position);
```
读取任务信息。

#### readEvents
```cpp
void readEvents();
```
读取地图事件。

#### readBasicString
```cpp
std::string readBasicString();
```
读取基础字符串并转换为unicode。

#### readLocalizedString
```cpp
std::string readLocalizedString(const TextIdentifier & identifier);
```
读取本地化字符串。

### 私有成员变量

#### features
```cpp
MapFormatFeaturesH3M features;
```
地图格式特性信息。

#### originalTemplates/remappedTemplates
```cpp
std::vector<std::shared_ptr<ObjectTemplate>> originalTemplates;
std::vector<std::shared_ptr<ObjectTemplate>> remappedTemplates;
```
原始和重映射的对象模板列表。

#### questIdentifierToId
```cpp
std::map<si32, ObjectInstanceID> questIdentifierToId;
```
任务标识符到对象ID的映射。

#### map/mapHeader
```cpp
CMap * map;
std::unique_ptr<CMapHeader> mapHeader;
```
地图对象和头信息。

#### reader/inputStream
```cpp
std::unique_ptr<MapReaderH3M> reader;
CInputStream * inputStream;
```
地图读取器和输入流。

## 加载流程

1. **初始化**: 创建加载器实例，设置输入流
2. **读取头信息**: 解析地图基本信息和格式特性
3. **读取玩家信息**: 加载玩家设置和条件
4. **读取地形**: 解析地图地形数据
5. **读取对象**: 加载所有地图对象（城镇、英雄、怪物等）
6. **读取事件**: 加载地图事件和触发器
7. **后处理**: 验证数据一致性和设置对象关系

## 支持的对象类型

加载器支持多种地图对象：

- **事件**: 地图事件和触发器
- **怪物**: 野生怪物和守卫
- **英雄**: 玩家英雄和中立英雄
- **城镇**: 玩家城堡和中立城镇
- **神器**: 散落的和守卫的神器
- **资源**: 资源堆和矿场
- **装饰**: 标志、巫师小屋、学者和各种装饰物

## 相关类

- `IMapLoader`: 地图加载器接口
- `CMap`: 地图类
- `CMapHeader`: 地图头信息
- `MapFormatFeaturesH3M`: 格式特性定义
- `MapReaderH3M`: H3M格式读取器