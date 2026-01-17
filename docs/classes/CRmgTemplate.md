<!-- 来源: E:\develop\heroes\vcmi\lib\rmg\CRmgTemplate.h -->
# CRmgTemplate头文件

CRmgTemplate头文件定义了VCMI中随机地图生成器模板的核心数据结构和配置类。

## ETemplateZoneType枚举

定义模板区域的类型：

- `PLAYER_START`: 玩家起始区域
- `CPU_START`: AI起始区域
- `TREASURE`: 宝藏区域
- `JUNCTION`: 连接区域
- `WATER`: 水域区域
- `SEALED`: 封闭区域

## EWaterContent命名空间

定义水域内容的枚举：

- `RANDOM = -1`: 随机
- `NONE`: 无水域
- `NORMAL`: 正常水域
- `ISLANDS`: 岛屿模式

## EMonsterStrength命名空间

定义怪物强度的枚举：

- `ZONE_NONE = -3`: 区域无怪物
- `RANDOM = -2`: 随机强度
- `ZONE_WEAK = -1`: 区域弱怪物
- `ZONE_NORMAL = 0`: 区域正常怪物
- `ZONE_STRONG = 1`: 区域强怪物
- `GLOBAL_WEAK = 2`: 全局弱怪物
- `GLOBAL_NORMAL = 3`: 全局正常怪物
- `GLOBAL_STRONG = 4`: 全局强怪物

## EZoneLevel枚举

定义区域层级的枚举：

- `AUTOMATIC = 0`: 自动选择
- `SURFACE = 1`: 地面层
- `UNDERGROUND = 2`: 地下层

## CTreasureInfo类

### 类定义
```cpp
class DLL_LINKAGE CTreasureInfo
```

### 构造函数
- `CTreasureInfo()`: 默认构造函数
- `CTreasureInfo(ui32 min, ui32 max, ui16 density)`: 参数构造函数

### 成员变量
- `ui32 min, max`: 宝藏价值范围
- `ui16 density`: 宝藏密度

### 运算符重载
- `bool operator ==(const CTreasureInfo & other) const`: 相等比较

### 序列化方法
- `void serializeJson(JsonSerializeFormat & handler)`: JSON序列化

## rmg命名空间

### EConnectionType枚举

定义区域连接类型的枚举：

- `GUARDED = 0`: 守卫连接（默认）
- `FICTIVE`: 虚构连接
- `REPULSIVE`: 排斥连接
- `WIDE`: 宽连接
- `FORCE_PORTAL`: 强制传送门

### ERoadOption枚举

定义道路选项的枚举：

- `ROAD_RANDOM = 0`: 随机道路
- `ROAD_TRUE`: 有道路
- `ROAD_FALSE`: 无道路

### ZoneConnection类

#### 类定义
```cpp
class DLL_LINKAGE ZoneConnection
```

#### 构造函数
- `ZoneConnection()`: 默认构造函数

#### ID和区域方法
- `int getId() const`: 获取连接ID
- `void setId(int id)`: 设置连接ID
- `TRmgTemplateZoneId getZoneA() const`: 获取区域A
- `TRmgTemplateZoneId getZoneB() const`: 获取区域B
- `TRmgTemplateZoneId getOtherZoneId(TRmgTemplateZoneId id) const`: 获取另一个区域ID

#### 守卫和类型方法
- `int getGuardStrength() const`: 获取守卫强度
- `rmg::EConnectionType getConnectionType() const`: 获取连接类型
- `rmg::ERoadOption getRoadOption() const`: 获取道路选项
- `void setRoadOption(rmg::ERoadOption roadOption)`: 设置道路选项

#### 序列化方法
- `void serializeJson(JsonSerializeFormat & handler)`: JSON序列化

#### 友元运算符
- `friend bool operator==(const ZoneConnection &, const ZoneConnection &)`: 相等比较
- `friend bool operator<(const ZoneConnection &, const ZoneConnection &)`: 小于比较

### ZoneOptions类

#### 类定义
```cpp
class DLL_LINKAGE ZoneOptions
```

#### 内部类：CTownInfo

城镇信息类：

- `CTownInfo()`: 构造函数
- `int getTownCount() const`: 获取城镇数量
- `int getCastleCount() const`: 获取城堡数量
- `int getTownDensity() const`: 获取城镇密度
- `int getCastleDensity() const`: 获取城堡密度
- `void serializeJson(JsonSerializeFormat & handler)`: JSON序列化

#### 内部类：CTownHints

城镇提示类：

- `CTownHints()`: 构造函数
- `void serializeJson(JsonSerializeFormat & handler)`: JSON序列化

#### 构造函数
- `ZoneOptions()`: 默认构造函数

#### 基本属性方法
- `TRmgTemplateZoneId getId() const`: 获取区域ID
- `void setId(TRmgTemplateZoneId value)`: 设置区域ID
- `ETemplateZoneType getType() const`: 获取区域类型
- `void setType(ETemplateZoneType value)`: 设置区域类型
- `int getSize() const`: 获取区域大小
- `void setSize(int value)`: 设置区域大小
- `std::optional<int> getOwner() const`: 获取所有者

#### 地形相关方法
- `std::set<TerrainId> getTerrainTypes() const`: 获取地形类型
- `void setTerrainTypes(const std::set<TerrainId> & value)`: 设置地形类型
- `std::set<TerrainId> getDefaultTerrainTypes() const`: 获取默认地形类型

#### 城镇相关方法
- `const CTownInfo & getPlayerTowns() const`: 获取玩家城镇
- `void setPlayerTowns(const CTownInfo & value)`: 设置玩家城镇
- `const CTownInfo & getNeutralTowns() const`: 获取中立城镇
- `void setNeutralTowns(const CTownInfo & value)`: 设置中立城镇
- `bool isMatchTerrainToTown() const`: 检查是否匹配地形到城镇
- `void setMatchTerrainToTown(bool value)`: 设置地形城镇匹配
- `const std::vector<CTownHints> & getTownHints() const`: 获取城镇提示
- `void setTownHints(const std::vector<CTownHints> & value)`: 设置城镇提示
- `std::set<FactionID> getTownTypes() const`: 获取城镇类型
- `void setTownTypes(const std::set<FactionID> & value)`: 设置城镇类型
- `std::set<FactionID> getBannedTownTypes() const`: 获取禁止的城镇类型
- `void setBannedTownTypes(const std::set<FactionID> & value)`: 设置禁止的城镇类型

#### 怪物和资源方法
- `std::set<FactionID> getDefaultTownTypes() const`: 获取默认城镇类型
- `std::set<FactionID> getMonsterTypes() const`: 获取怪物类型
- `void setMonsterTypes(const std::set<FactionID> & value)`: 设置怪物类型
- `void setMinesInfo(const std::map<GameResID, ui16> & value)`: 设置矿井信息
- `std::map<GameResID, ui16> getMinesInfo() const`: 获取矿井信息

#### 宝藏相关方法
- `void setTreasureInfo(const std::vector<CTreasureInfo> & value)`: 设置宝藏信息
- `void addTreasureInfo(const CTreasureInfo & value)`: 添加宝藏信息
- `std::vector<CTreasureInfo> getTreasureInfo() const`: 获取宝藏信息
- `ui32 getMaxTreasureValue() const`: 获取最大宝藏价值
- `void recalculateMaxTreasureValue()`: 重新计算最大宝藏价值

#### 继承相关方法
- `TRmgTemplateZoneId getMinesLikeZone() const`: 获取类似矿井区域
- `TRmgTemplateZoneId getTerrainTypeLikeZone() const`: 获取类似地形区域
- `TRmgTemplateZoneId getTreasureLikeZone() const`: 获取类似宝藏区域

#### 连接相关方法
- `void addConnection(const ZoneConnection & connection)`: 添加连接
- `std::vector<ZoneConnection> getConnections() const`: 获取连接
- `std::vector<ZoneConnection>& getConnectionsRef()`: 获取连接引用
- `std::vector<TRmgTemplateZoneId> getConnectedZoneIds() const`: 获取连接的区域ID
- `void setRoadOption(int connectionId, rmg::ERoadOption roadOption)`: 设置道路选项

#### 对象配置方法
- `const std::vector<CompoundMapObjectID> & getBannedObjects() const`: 获取禁止的对象
- `const std::vector<ObjectConfig::EObjectCategory> & getBannedObjectCategories() const`: 获取禁止的对象类别
- `const std::vector<ObjectInfo> & getConfiguredObjects() const`: 获取配置的对象
- `ObjectConfig getCustomObjects() const`: 获取自定义对象
- `void setCustomObjects(const ObjectConfig & value)`: 设置自定义对象
- `TRmgTemplateZoneId getCustomObjectsLikeZone() const`: 获取类似自定义对象区域
- `TRmgTemplateZoneId getTownsLikeZone() const`: 获取类似城镇区域

#### 可见性和层级方法
- `Point getVisiblePosition() const`: 获取可见位置
- `void setVisiblePosition(Point value)`: 设置可见位置
- `float getVisibleSize() const`: 获取可见大小
- `void setVisibleSize(float value)`: 设置可见大小
- `EZoneLevel getForcedLevel() const`: 获取强制层级
- `void setForcedLevel(EZoneLevel value)`: 设置强制层级

#### 其他方法
- `bool areTownsSameType() const`: 检查城镇是否同类型
- `void serializeJson(JsonSerializeFormat & handler)`: JSON序列化

#### 公共成员变量
- `EMonsterStrength::EMonsterStrength monsterStrength`: 怪物强度

## CRmgTemplate类

### 类定义
```cpp
class DLL_LINKAGE CRmgTemplate : boost::noncopyable
```

### 内部类：CPlayerCountRange

玩家数量范围类：

- `void addRange(int lower, int upper)`: 添加范围
- `void addNumber(int value)`: 添加数字
- `bool isInRange(int count) const`: 检查是否在范围内
- `std::set<int> getNumbers() const`: 获取数字集合
- `std::string toString() const`: 转换为字符串
- `void fromString(const std::string & value)`: 从字符串解析
- `int maxValue() const`: 获取最大值
- `int minValue() const`: 获取最小值

### 构造函数和析构函数
- `CRmgTemplate()`: 构造函数
- `~CRmgTemplate()`: 析构函数

### 验证和匹配方法
- `bool matchesSize(const int3 & value) const`: 检查尺寸匹配
- `bool isWaterContentAllowed(EWaterContent::EWaterContent waterContent) const`: 检查水域内容是否允许
- `const std::set<EWaterContent::EWaterContent> & getWaterContentAllowed() const`: 获取允许的水域内容

### 基本属性方法
- `void setId(const std::string & value)`: 设置ID
- `void setName(const std::string & value)`: 设置名称
- `const std::string & getId() const`: 获取ID
- `const std::string & getName() const`: 获取名称
- `const std::string & getDescription() const`: 获取描述

### 玩家和尺寸方法
- `const CPlayerCountRange & getPlayers() const`: 获取玩家范围
- `const CPlayerCountRange & getHumanPlayers() const`: 获取人类玩家范围
- `std::pair<int3, int3> getMapSizes() const`: 获取地图尺寸范围
- `const Zones & getZones() const`: 获取区域
- `const JsonNode & getMapSettings() const`: 获取地图设置
- `const std::vector<rmg::ZoneConnection> & getConnectedZoneIds() const`: 获取连接的区域ID

### 禁用/启用列表方法
- `const std::set<SpellID> & getBannedSpells() const`: 获取禁止的法术
- `const std::set<ArtifactID> & getBannedArtifacts() const`: 获取禁止的神器
- `const std::set<SecondarySkill> & getBannedSkills() const`: 获取禁止的技能
- `const std::set<HeroTypeID> & getBannedHeroes() const`: 获取禁止的英雄
- `const std::set<SpellID> & getEnabledSpells() const`: 获取启用的法术
- `const std::set<ArtifactID> & getEnabledArtifacts() const`: 获取启用的神器
- `const std::set<SecondarySkill> & getEnabledSkills() const`: 获取启用的技能
- `const std::set<HeroTypeID> & getEnabledHeroes() const`: 获取启用的英雄

### 验证和序列化方法
- `void validate() const`: 验证模板有效性
- `void serializeJson(JsonSerializeFormat & handler)`: JSON序列化
- `void afterLoad()`: 加载后处理

## 设计特点

- 高度可配置的随机地图生成模板系统
- 支持复杂的区域连接和继承机制
- 提供完整的对象、宝藏、城镇和怪物配置
- 支持模板验证和序列化
- 包含玩家数量和地图尺寸的灵活配置
- 支持禁用/启用特定游戏元素