# CRmgTemplate类

CRmgTemplate类是VCMI中随机地图模板的实现类，定义了随机地图生成的基本属性和功能。

## 类定义

```cpp
enum class ETemplateZoneType
{
    PLAYER_START,
    CPU_START,
    TREASURE,
    JUNCTION,
    WATER,
    SEALED
};

enum class EZoneLevel // 用于强制区域在地面或地下放置
{
    AUTOMATIC = 0,
    SURFACE = 1,
    UNDERGROUND = 2
};

class DLL_LINKAGE CTreasureInfo
{
public:
    ui32 min;
    ui32 max;
    ui16 density;
    CTreasureInfo();
    CTreasureInfo(ui32 min, ui32 max, ui16 density);

    bool operator ==(const CTreasureInfo & other) const;

    void serializeJson(JsonSerializeFormat & handler);
};

namespace rmg
{

enum class EConnectionType
{
    GUARDED = 0, // 默认
    FICTIVE,
    REPULSIVE,
    WIDE,
    FORCE_PORTAL
};

enum class ERoadOption
{
    ROAD_RANDOM = 0,
    ROAD_TRUE,
    ROAD_FALSE
};

class DLL_LINKAGE ZoneConnection
{
public:
    ZoneConnection();

    int getId() const;
    void setId(int id);
    TRmgTemplateZoneId getZoneA() const;
    TRmgTemplateZoneId getZoneB() const;
    TRmgTemplateZoneId getOtherZoneId(TRmgTemplateZoneId id) const;
    int getGuardStrength() const;
    rmg::EConnectionType getConnectionType() const;
    rmg::ERoadOption getRoadOption() const;
    void setRoadOption(rmg::ERoadOption roadOption);

    void serializeJson(JsonSerializeFormat & handler);
    
    friend bool operator==(const ZoneConnection &, const ZoneConnection &);
    friend bool operator<(const ZoneConnection &, const ZoneConnection &);
private:
    int id;
    TRmgTemplateZoneId zoneA;
    TRmgTemplateZoneId zoneB;
    int guardStrength;
    rmg::EConnectionType connectionType;
    rmg::ERoadOption hasRoad;
};

class DLL_LINKAGE ZoneOptions
{
public:
    static const TRmgTemplateZoneId NO_ZONE;

    class DLL_LINKAGE CTownInfo
    {
    public:
        CTownInfo();

        int getTownCount() const;
        int getCastleCount() const;
        int getTownDensity() const;
        int getCastleDensity() const;

        void serializeJson(JsonSerializeFormat & handler);

    private:
        int townCount;
        int castleCount;
        int townDensity;
        int castleDensity;

        TRmgTemplateZoneId townTypesLikeZone = NO_ZONE;
        TRmgTemplateZoneId townTypesNotLikeZone = NO_ZONE;
        TRmgTemplateZoneId townTypesRelatedToZoneTerrain = NO_ZONE;
    };

    class DLL_LINKAGE CTownHints
    {
    public:
        CTownHints();
        
        TRmgTemplateZoneId likeZone = NO_ZONE;
        std::vector<TRmgTemplateZoneId> notLikeZone;
        TRmgTemplateZoneId relatedToZoneTerrain = NO_ZONE;

        void serializeJson(JsonSerializeFormat & handler);
    };

    ZoneOptions();

    TRmgTemplateZoneId getId() const;
    void setId(TRmgTemplateZoneId value);

    ETemplateZoneType getType() const;
    void setType(ETemplateZoneType value);
    
    int getSize() const;
    void setSize(int value);
    std::optional<int> getOwner() const;

    std::set<TerrainId> getTerrainTypes() const;
    void setTerrainTypes(const std::set<TerrainId> & value);
    std::set<TerrainId> getDefaultTerrainTypes() const;

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

    std::set<FactionID> getDefaultTownTypes() const;
    std::set<FactionID> getMonsterTypes() const;

    void setMonsterTypes(const std::set<FactionID> & value);

    void setMinesInfo(const std::map<GameResID, ui16> & value);
    std::map<GameResID, ui16> getMinesInfo() const;

    void setTreasureInfo(const std::vector<CTreasureInfo> & value);
    void addTreasureInfo(const CTreasureInfo & value);
    std::vector<CTreasureInfo> getTreasureInfo() const;
    ui32 getMaxTreasureValue() const;
    void recalculateMaxTreasureValue();

    TRmgTemplateZoneId getMinesLikeZone() const;
    TRmgTemplateZoneId getTerrainTypeLikeZone() const;
    TRmgTemplateZoneId getTreasureLikeZone() const;

    void addConnection(const ZoneConnection & connection);
    std::vector<ZoneConnection> getConnections() const;
    std::vector<ZoneConnection>& getConnectionsRef();
    std::vector<TRmgTemplateZoneId> getConnectedZoneIds() const;

    void setRoadOption(int connectionId, rmg::ERoadOption roadOption);

    void serializeJson(JsonSerializeFormat & handler);
    
    EMonsterStrength::EMonsterStrength monsterStrength;
    
    bool areTownsSameType() const;

    const std::vector<CompoundMapObjectID> & getBannedObjects() const;
    const std::vector<ObjectConfig::EObjectCategory> & getBannedObjectCategories() const;
    const std::vector<ObjectInfo> & getConfiguredObjects() const;

    ObjectConfig getCustomObjects() const;
    void setCustomObjects(const ObjectConfig & value);
    TRmgTemplateZoneId getCustomObjectsLikeZone() const;
    TRmgTemplateZoneId getTownsLikeZone() const;

    Point getVisiblePosition() const;
    void setVisiblePosition(Point value);

    float getVisibleSize() const;
    void setVisibleSize(float value);

    EZoneLevel getForcedLevel() const;
    void setForcedLevel(EZoneLevel value);

protected:
    TRmgTemplateZoneId id;
    ETemplateZoneType type;
    int size;
    ui32 maxTreasureValue;
    std::optional<int> owner;

    Point visiblePosition;
    float visibleSize;

    ObjectConfig objectConfig;
    CTownInfo playerTowns;
    CTownInfo neutralTowns;
    bool matchTerrainToTown;
    std::set<TerrainId> terrainTypes;
    std::set<TerrainId> bannedTerrains;
    bool townsAreSameType;
    std::vector<CTownHints> townHints;

    std::set<FactionID> townTypes;
    std::set<FactionID> bannedTownTypes;
    std::set<FactionID> monsterTypes;
    std::set<FactionID> bannedMonsters;

    std::map<GameResID, ui16> mines;

    std::vector<CTreasureInfo> treasureInfo;

    std::vector<TRmgTemplateZoneId> connectedZoneIds;
    std::vector<ZoneConnection> connectionDetails;

    TRmgTemplateZoneId townsLikeZone;
    TRmgTemplateZoneId minesLikeZone;
    TRmgTemplateZoneId terrainTypeLikeZone;
    TRmgTemplateZoneId treasureLikeZone;
    TRmgTemplateZoneId customObjectsLikeZone;
    EZoneLevel forcedLevel;
};

}

class DLL_LINKAGE CRmgTemplate : boost::noncopyable
{
public:
    using Zones = std::map<TRmgTemplateZoneId, std::shared_ptr<rmg::ZoneOptions>>;

    class DLL_LINKAGE CPlayerCountRange
    {
    public:
        void addRange(int lower, int upper);
        void addNumber(int value);
        bool isInRange(int count) const;
        std::set<int> getNumbers() const;

        std::string toString() const;
        void fromString(const std::string & value);

        int maxValue() const;
        int minValue() const;

    private:
        std::vector<std::pair<int, int> > range;
    };

    CRmgTemplate();
    ~CRmgTemplate();

    bool matchesSize(const int3 & value) const;
    bool isWaterContentAllowed(EWaterContent::EWaterContent waterContent) const;
    const std::set<EWaterContent::EWaterContent> & getWaterContentAllowed() const;

    void setId(const std::string & value);
    void setName(const std::string & value);
    const std::string & getId() const;
    const std::string & getName() const;
    const std::string & getDescription() const;

    const CPlayerCountRange & getPlayers() const;
    const CPlayerCountRange & getHumanPlayers() const;
    std::pair<int3, int3> getMapSizes() const;
    const Zones & getZones() const;
    const JsonNode & getMapSettings() const;
    const std::vector<rmg::ZoneConnection> & getConnectedZoneIds() const;

    const std::set<SpellID> & getBannedSpells() const { return bannedSpells; }
    const std::set<ArtifactID> & getBannedArtifacts() const { return bannedArtifacts; }
    const std::set<SecondarySkill> & getBannedSkills() const { return bannedSkills; }
    const std::set<HeroTypeID> & getBannedHeroes() const { return bannedHeroes; }
    const std::set<SpellID> & getEnabledSpells() const { return enabledSpells; }
    const std::set<ArtifactID> & getEnabledArtifacts() const { return enabledArtifacts; }
    const std::set<SecondarySkill> & getEnabledSkills() const { return enabledSkills; }
    const std::set<HeroTypeID> & getEnabledHeroes() const { return enabledHeroes; }

    void validate() const; /// 测试模板有效性，失败时抛出异常

    void serializeJson(JsonSerializeFormat & handler);
    void afterLoad();

private:
    std::string id;
    std::string name;
    std::string description;
    int3 minSize;
    int3 maxSize;
    CPlayerCountRange players;
    CPlayerCountRange humanPlayers;
    Zones zones;
    std::vector<rmg::ZoneConnection> connections;
    std::set<EWaterContent::EWaterContent> allowedWaterContent;
    std::unique_ptr<JsonNode> mapSettings;

    std::set<SpellID> bannedSpells;
    std::set<ArtifactID> bannedArtifacts;
    std::set<SecondarySkill> bannedSkills;
    std::set<HeroTypeID> bannedHeroes;

    std::set<SpellID> enabledSpells;
    std::set<ArtifactID> enabledArtifacts;
    std::set<SecondarySkill> enabledSkills;
    std::set<HeroTypeID> enabledHeroes;

    std::set<TerrainId> inheritTerrainType(std::shared_ptr<rmg::ZoneOptions> zone, uint32_t iteration = 0);
    std::map<GameResID, ui16> inheritMineTypes(std::shared_ptr<rmg::ZoneOptions> zone, uint32_t iteration = 0);
    std::vector<CTreasureInfo> inheritTreasureInfo(std::shared_ptr<rmg::ZoneOptions> zone, uint32_t iteration = 0);

    void inheritTownProperties(std::shared_ptr<rmg::ZoneOptions> zone, uint32_t iteration = 0);

    void serializeSize(JsonSerializeFormat & handler, int3 & value, const std::string & fieldName);
    void serializePlayers(JsonSerializeFormat & handler, CPlayerCountRange & value, const std::string & fieldName);

    template<typename T>
    T inheritZoneProperty(std::shared_ptr<rmg::ZoneOptions> zone, 
                          T (rmg::ZoneOptions::*getter)() const,
                          void (rmg::ZoneOptions::*setter)(const T&),
                          TRmgTemplateZoneId (rmg::ZoneOptions::*inheritFrom)() const,
                          const std::string& propertyString,
                          uint32_t iteration = 0);
};
```

## 功能说明

CRmgTemplate是VCMI中随机地图模板的实现类，定义了随机地图生成的基本属性，如区域类型、地形、宝藏分布、城镇数量等。它包含多个区域（ZoneOptions），每个区域都有其独特的配置，如地形类型、城镇数量、怪物强度等。该类还定义了区域之间的连接关系，以及玩家数量范围等参数。

## 依赖关系

- [int3](../int3.md): 三维坐标
- [Point](../Point.md): 二维点坐标
- [JsonNode](../json/JsonNode.md): JSON节点
- [JsonSerializeFormat](../json/JsonSerializeFormat.md): JSON序列化格式
- [TRmgTemplateZoneId](../constants/TRmgTemplateZoneId.md): 随机地图模板区域ID
- [TerrainId](../constants/TerrainId.md): 地形ID
- [FactionID](../constants/FactionID.md): 派系ID
- [SpellID](../constants/SpellID.md): 法术ID
- [ArtifactID](../constants/ArtifactID.md): 神器ID
- [SecondarySkill](../constants/SecondarySkill.md): 二级技能
- [HeroTypeID](../constants/HeroTypeID.md): 英雄类型ID
- [GameResID](../constants/GameResID.md): 游戏资源ID
- [ObjectInfo](./ObjectInfo.md): 对象信息
- [ObjectConfig](./ObjectConfig.md): 对象配置
- [CompoundMapObjectID](./CompoundMapObjectID.md): 复合地图对象ID
- STL库: set, vector, map, optional等

## 函数注释

- `CRmgTemplate()`: 构造函数，创建随机地图模板对象
- `matchesSize(value)`: 检查给定尺寸是否与模板匹配
- `isWaterContentAllowed(waterContent)`: 检查是否允许特定水域内容
- `getId(), setId(value)`: 获取/设置模板ID
- `getName(), setName(value)`: 获取/设置模板名称
- `getDescription()`: 获取模板描述
- `getPlayers(), getHumanPlayers()`: 获取玩家数量范围
- `getMapSizes()`: 获取地图尺寸范围
- `getZones()`: 获取区域配置
- `getBannedSpells(), getEnabledSpells()`: 获取禁用/启用的法术
- `getBannedArtifacts(), getEnabledArtifacts()`: 获取禁用/启用的神器
- `validate()`: 验证模板的有效性
- `serializeJson(handler)`: JSON序列化
- `ZoneConnection`: 区域连接类，定义两个区域之间的连接关系
- `getZoneA(), getZoneB()`: 获取连接的两个区域
- `getGuardStrength()`: 获取守卫强度
- `getConnectionType()`: 获取连接类型
- `ZoneOptions`: 区域选项类，定义单个区域的配置
- `getType(), setType(value)`: 获取/设置区域类型
- `getSize(), setSize(value)`: 获取/设置区域大小
- `getPlayerTowns(), getNeutralTowns()`: 获取玩家/中立城镇配置
- `getTreasureInfo(), setTreasureInfo(value)`: 获取/设置宝藏信息
- `addConnection(connection)`: 添加区域连接
- `CTownInfo`: 城镇信息类，定义城镇的数量和密度配置
- `getTownCount(), getCastleCount()`: 获取城镇/城堡数量
- `getTownDensity(), getCastleDensity()`: 获取城镇/城堡密度