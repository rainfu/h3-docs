# CRmgTemplate

## 概述

`CRmgTemplate` 类是 VCMI 随机地图生成器的模板定义类。该类描述了随机地图模板的完整配置，包括区域设置、连接关系、玩家数量限制、地图尺寸等。它是非可复制的（继承自 `boost::noncopyable`），确保模板实例的唯一性。

## 类定义

```cpp
class DLL_LINKAGE CRmgTemplate : boost::noncopyable
```

## 枚举和类型定义

### ETemplateZoneType
```cpp
enum class ETemplateZoneType
{
	PLAYER_START,  // 玩家起始区域
	CPU_START,     // 电脑起始区域
	TREASURE,      // 宝藏区域
	JUNCTION,      // 连接区域
	WATER,         // 水域区域
	SEALED         // 封闭区域
};
```

### EWaterContent
```cpp
namespace EWaterContent
{
	enum EWaterContent
	{
		RANDOM = -1,  // 随机
		NONE,         // 无水域
		NORMAL,       // 正常水域
		ISLANDS       // 岛屿
	};
}
```

### EMonsterStrength
```cpp
namespace EMonsterStrength
{
	enum EMonsterStrength
	{
		ZONE_NONE = -3,    // 区域无怪物
		RANDOM = -2,       // 随机
		ZONE_WEAK = -1,    // 区域弱怪物
		ZONE_NORMAL = 0,   // 区域正常怪物
		ZONE_STRONG = 1,   // 区域强怪物
		GLOBAL_WEAK = 2,   // 全局弱怪物
		GLOBAL_NORMAL = 3, // 全局正常怪物
		GLOBAL_STRONG = 4  // 全局强怪物
	};
}
```

### EZoneLevel
```cpp
enum class EZoneLevel
{
	AUTOMATIC = 0,   // 自动
	SURFACE = 1,     // 地面
	UNDERGROUND = 2  // 地下
};
```

## CTreasureInfo 结构体

### 概述
宝藏信息结构体，定义宝藏的范围和密度。

### 构造函数
```cpp
CTreasureInfo();
CTreasureInfo(ui32 min, ui32 max, ui16 density);
```

### 成员变量
```cpp
ui32 min;      // 最小价值
ui32 max;      // 最大价值
ui16 density;  // 密度
```

### 方法
```cpp
bool operator==(const CTreasureInfo & other) const;
void serializeJson(JsonSerializeFormat & handler);
```

## rmg 命名空间

### EConnectionType
```cpp
enum class EConnectionType
{
	GUARDED = 0,     // 守卫连接（默认）
	FICTIVE,         // 虚拟连接
	REPULSIVE,       // 排斥连接
	WIDE,            // 宽连接
	FORCE_PORTAL     // 强制传送门
};
```

### ERoadOption
```cpp
enum class ERoadOption
{
	ROAD_RANDOM = 0, // 随机道路
	ROAD_TRUE,       // 有道路
	ROAD_FALSE       // 无道路
};
```

## ZoneConnection 类

### 概述
区域连接类，定义两个区域之间的连接关系。

### 构造函数
```cpp
ZoneConnection();
```

### ID管理
```cpp
int getId() const;
void setId(int id);
```

### 区域连接
```cpp
TRmgTemplateZoneId getZoneA() const;
TRmgTemplateZoneId getZoneB() const;
TRmgTemplateZoneId getOtherZoneId(TRmgTemplateZoneId id) const;
```

### 连接属性
```cpp
int getGuardStrength() const;
rmg::EConnectionType getConnectionType() const;
rmg::ERoadOption getRoadOption() const;
void setRoadOption(rmg::ERoadOption roadOption);
```

### 序列化
```cpp
void serializeJson(JsonSerializeFormat & handler);
```

### 运算符
```cpp
friend bool operator==(const ZoneConnection &, const ZoneConnection &);
friend bool operator<(const ZoneConnection &, const ZoneConnection &);
```

## ZoneOptions 类

### 概述
区域选项类，定义单个区域的完整配置。

### 城镇信息类

#### CTownInfo
```cpp
class CTownInfo
{
public:
	int getTownCount() const;
	int getCastleCount() const;
	int getTownDensity() const;
	int getCastleDensity() const;
	void serializeJson(JsonSerializeFormat & handler);
};
```

#### CTownHints
```cpp
class CTownHints
{
public:
	TRmgTemplateZoneId likeZone = NO_ZONE;
	std::vector<TRmgTemplateZoneId> notLikeZone;
	TRmgTemplateZoneId relatedToZoneTerrain = NO_ZONE;
	void serializeJson(JsonSerializeFormat & handler);
};
```

### 基本属性

#### ID和类型
```cpp
TRmgTemplateZoneId getId() const;
void setId(TRmgTemplateZoneId value);

ETemplateZoneType getType() const;
void setType(ETemplateZoneType value);
```

#### 尺寸和所有者
```cpp
int getSize() const;
void setSize(int value);
std::optional<int> getOwner() const;
```

### 地形设置
```cpp
std::set<TerrainId> getTerrainTypes() const;
void setTerrainTypes(const std::set<TerrainId> & value);
std::set<TerrainId> getDefaultTerrainTypes() const;
```

### 城镇配置
```cpp
const CTownInfo & getPlayerTowns() const;
void setPlayerTowns(const CTownInfo & value);
const CTownInfo & getNeutralTowns() const;
void setNeutralTowns(const CTownInfo & value);

bool isMatchTerrainToTown() const;
void setMatchTerrainToTown(bool value);

const std::vector<CTownHints> & getTownHints() const;
void setTownHints(const std::vector<CTownHints> & value);

std::set<FactionID> getTownTypes() const;
void setTownTypes(const std::set<FactionID> & value);
std::set<FactionID> getBannedTownTypes() const;
void setBannedTownTypes(const std::set<FactionID> & value);
```

### 怪物和资源
```cpp
std::set<FactionID> getMonsterTypes() const;
void setMonsterTypes(const std::set<FactionID> & value);

void setMinesInfo(const std::map<GameResID, ui16> & value);
std::map<GameResID, ui16> getMinesInfo() const;

void setTreasureInfo(const std::vector<CTreasureInfo> & value);
void addTreasureInfo(const CTreasureInfo & value);
std::vector<CTreasureInfo> getTreasureInfo() const;
ui32 getMaxTreasureValue() const;
void recalculateMaxTreasureValue();
```

### 连接管理
```cpp
void addConnection(const ZoneConnection & connection);
std::vector<ZoneConnection> getConnections() const;
std::vector<ZoneConnection>& getConnectionsRef();
std::vector<TRmgTemplateZoneId> getConnectedZoneIds() const;
void setRoadOption(int connectionId, rmg::ERoadOption roadOption);
```

### 对象配置
```cpp
const std::vector<CompoundMapObjectID> & getBannedObjects() const;
const std::vector<ObjectConfig::EObjectCategory> & getBannedObjectCategories() const;
const std::vector<ObjectInfo> & getConfiguredObjects() const;

ObjectConfig getCustomObjects() const;
void setCustomObjects(const ObjectConfig & value);
```

### 继承设置
```cpp
TRmgTemplateZoneId getMinesLikeZone() const;
TRmgTemplateZoneId getTerrainTypeLikeZone() const;
TRmgTemplateZoneId getTreasureLikeZone() const;
TRmgTemplateZoneId getCustomObjectsLikeZone() const;
TRmgTemplateZoneId getTownsLikeZone() const;
```

### 可见性设置
```cpp
Point getVisiblePosition() const;
void setVisiblePosition(Point value);

float getVisibleSize() const;
void setVisibleSize(float value);

EZoneLevel getForcedLevel() const;
void setForcedLevel(EZoneLevel value);
```

## CPlayerCountRange 类

### 概述
玩家数量范围类，支持范围和单个数字的组合。

### 方法
```cpp
void addRange(int lower, int upper);
void addNumber(int value);
bool isInRange(int count) const;
std::set<int> getNumbers() const;

std::string toString() const;
void fromString(const std::string & value);

int maxValue() const;
int minValue() const;
```

## CRmgTemplate 主要方法

### 构造函数和析构函数
```cpp
CRmgTemplate();
~CRmgTemplate();
```

### 基本信息
```cpp
void setId(const std::string & value);
void setName(const std::string & value);
const std::string & getId() const;
const std::string & getName() const;
const std::string & getDescription() const;
```

### 兼容性检查
```cpp
bool matchesSize(const int3 & value) const;
bool isWaterContentAllowed(EWaterContent::EWaterContent waterContent) const;
const std::set<EWaterContent::EWaterContent> & getWaterContentAllowed() const;
```

### 配置获取
```cpp
const CPlayerCountRange & getPlayers() const;
const CPlayerCountRange & getHumanPlayers() const;
std::pair<int3, int3> getMapSizes() const;
const Zones & getZones() const;
const JsonNode & getMapSettings() const;
const std::vector<rmg::ZoneConnection> & getConnectedZoneIds() const;
```

### 禁用/启用列表
```cpp
const std::set<SpellID> & getBannedSpells() const;
const std::set<ArtifactID> & getBannedArtifacts() const;
const std::set<SecondarySkill> & getBannedSkills() const;
const std::set<HeroTypeID> & getBannedHeroes() const;

const std::set<SpellID> & getEnabledSpells() const;
const std::set<ArtifactID> & getEnabledArtifacts() const;
const std::set<SecondarySkill> & getEnabledSkills() const;
const std::set<HeroTypeID> & getEnabledHeroes() const;
```

### 验证和序列化
```cpp
void validate() const;
void serializeJson(JsonSerializeFormat & handler);
void afterLoad();
```

## 工作原理

### 模板结构
RMG模板由以下核心组件组成：

1. **基本信息**: ID、名称、描述
2. **尺寸限制**: 最小和最大地图尺寸
3. **玩家限制**: 支持人类玩家和总玩家数量范围
4. **区域配置**: 多个区域的详细设置
5. **连接关系**: 区域间的连接定义
6. **水域设置**: 允许的水域内容类型
7. **禁用/启用列表**: 法术、神器、技能、英雄的限制

### 区域继承
区域可以从其他区域继承属性：

```cpp
// 区域A继承区域B的地形类型
zoneA.setTerrainTypeLikeZone(zoneB.getId());
```

### 连接系统
区域间的连接定义了地图的拓扑结构：

```cpp
ZoneConnection conn;
conn.setId(1);
conn.setZoneA(zone1);
conn.setZoneB(zone2);
conn.setConnectionType(rmg::EConnectionType::GUARDED);
zone1.addConnection(conn);
```

## 使用示例

### 创建基本模板
```cpp
CRmgTemplate tmpl;
tmpl.setId("my_template");
tmpl.setName("My Custom Template");
tmpl.setDescription("A custom random map template");

// 设置地图尺寸
int3 minSize(36, 36, 1);
int3 maxSize(144, 144, 2);
// (在序列化中设置)

auto& players = tmpl.getPlayers();
players.addRange(2, 8); // 2-8个玩家
```

### 配置区域
```cpp
auto zone = std::make_shared<rmg::ZoneOptions>();
zone->setId(1);
zone->setType(ETemplateZoneType::PLAYER_START);
zone->setSize(50);

// 设置地形
std::set<TerrainId> terrains = {TerrainId::GRASS, TerrainId::DIRT};
zone->setTerrainTypes(terrains);

// 配置城镇
rmg::ZoneOptions::CTownInfo towns;
towns.townCount = 2;
towns.castleCount = 1;
zone->setPlayerTowns(towns);

// 添加到模板
Zones zones;
zones[1] = zone;
// (添加到模板)
```

### 连接区域
```cpp
ZoneConnection conn;
conn.setId(1);
conn.setZoneA(1);
conn.setZoneB(2);
conn.setConnectionType(rmg::EConnectionType::GUARDED);
conn.setGuardStrength(1500);

// 添加连接
zone1->addConnection(conn);
```

### 宝藏配置
```cpp
std::vector<CTreasureInfo> treasures;
treasures.emplace_back(500, 2000, 10);  // 500-2000价值，密度10
treasures.emplace_back(2000, 5000, 5);  // 2000-5000价值，密度5

zone->setTreasureInfo(treasures);
zone->recalculateMaxTreasureValue(); // 计算最大价值
```

### 验证模板
```cpp
try {
    tmpl.validate(); // 验证模板有效性
    std::cout << "Template is valid" << std::endl;
} catch (const std::exception& e) {
    std::cerr << "Template validation failed: " << e.what() << std::endl;
}
```

## 相关类

- `CMapGenOptions`: 地图生成选项
- `CMapGenerator`: 地图生成器
- `Zone`: 运行时区域类
- `ObjectConfig`: 对象配置类
- `ObjectInfo`: 对象信息类
- `JsonNode`: JSON节点类