# ILimiter接口

ILimiter接口是VCMI奖励系统中的限制器接口，用于限制奖励的应用条件。

## 类定义

```cpp
struct BonusLimitationContext
{
    const Bonus & b;
    const CBonusSystemNode & node;
    const BonusList & alreadyAccepted;
    const BonusList & stillUndecided;
};

class DLL_LINKAGE ILimiter : public Serializeable
{
public:
    enum class EDecision : uint8_t
    {
        ACCEPT,
        DISCARD,
        NOT_SURE, // 结果仍可能基于尚未解决的奖励改变
        NOT_APPLICABLE // 限制器不适用于当前节点且永远不会适用
    };

    virtual ~ILimiter() = default;

    virtual EDecision limit(const BonusLimitationContext &context) const;
    virtual std::string toString() const;
    virtual JsonNode toJsonNode() const;

    template <typename Handler> void serialize(Handler &h)
    {
    }
};

using TLimiterPtr = std::shared_ptr<const ILimiter>;
extern DLL_LINKAGE const std::map<std::string, TLimiterPtr> bonusLimiterMap;

class DLL_LINKAGE AggregateLimiter : public ILimiter
{
protected:
    virtual const std::string & getAggregator() const = 0;
    AggregateLimiter(std::vector<TLimiterPtr> limiters = {});
public:
    std::vector<TLimiterPtr> limiters;
    void add(const TLimiterPtr & limiter);
    JsonNode toJsonNode() const override;

    template <typename Handler> void serialize(Handler & h)
    {
        h & static_cast<ILimiter&>(*this);
        h & limiters;
    }
};

class DLL_LINKAGE AllOfLimiter : public AggregateLimiter
{
protected:
    const std::string & getAggregator() const override;
public:
    AllOfLimiter(std::vector<TLimiterPtr> limiters = {});
    static const std::string aggregator;
    EDecision limit(const BonusLimitationContext & context) const override;
};

class DLL_LINKAGE AnyOfLimiter : public AggregateLimiter
{
protected:
    const std::string & getAggregator() const override;
public:
    AnyOfLimiter(std::vector<TLimiterPtr> limiters = {});
    static const std::string aggregator;
    EDecision limit(const BonusLimitationContext & context) const override;
};

class DLL_LINKAGE NoneOfLimiter : public AggregateLimiter
{
protected:
    const std::string & getAggregator() const override;
public:
    NoneOfLimiter(std::vector<TLimiterPtr> limiters = {});
    static const std::string aggregator;
    EDecision limit(const BonusLimitationContext & context) const override;
};

class DLL_LINKAGE CCreatureTypeLimiter : public ILimiter //仅影响给定生物的堆栈（以及可选的升级）
{
public:
    CreatureID creatureID;
    bool includeUpgrades = false;

    CCreatureTypeLimiter() = default;
    CCreatureTypeLimiter(const CCreature & creature_, bool IncludeUpgrades);
    void setCreature(const CreatureID & id);

    EDecision limit(const BonusLimitationContext &context) const override;
    std::string toString() const override;
    JsonNode toJsonNode() const override;

    template <typename Handler> void serialize(Handler &h)
    {
        h & static_cast<ILimiter&>(*this);
        h & creatureID;
        h & includeUpgrades;
    }
};

class DLL_LINKAGE HasAnotherBonusLimiter : public ILimiter //仅应用于具有另一个奖励的节点
{
public:
    BonusType type;
    BonusSubtypeID subtype;
    BonusSource source = BonusSource::OTHER;
    BonusSourceID sid;
    bool isSubtypeRelevant; //仅当此值为真时才检查子类型
    bool isSourceRelevant; //仅当此值为真时才检查奖励来源
    bool isSourceIDRelevant; //仅当此值为真时才检查奖励来源ID

    HasAnotherBonusLimiter(BonusType bonus = BonusType::NONE);
    HasAnotherBonusLimiter(BonusType bonus, BonusSubtypeID _subtype);
    HasAnotherBonusLimiter(BonusType bonus, BonusSource src);
    HasAnotherBonusLimiter(BonusType bonus, BonusSubtypeID _subtype, BonusSource src);

    EDecision limit(const BonusLimitationContext &context) const override;
    std::string toString() const override;
    JsonNode toJsonNode() const override;

    template <typename Handler> void serialize(Handler &h)
    {
        h & static_cast<ILimiter&>(*this);
        h & type;
        h & subtype;
        h & isSubtypeRelevant;
        h & source;
        h & isSourceRelevant;
        h & sid;
        h & isSourceIDRelevant;
    }
};

class DLL_LINKAGE TerrainLimiter : public ILimiter //仅应用于指定地形上的生物，默认为原生地形
{
public:
    TerrainId terrainType;
    TerrainLimiter();
    TerrainLimiter(TerrainId terrain);

    EDecision limit(const BonusLimitationContext &context) const override;
    std::string toString() const override;
    JsonNode toJsonNode() const override;

    template <typename Handler> void serialize(Handler &h)
    {
        h & static_cast<ILimiter&>(*this);
        h & terrainType;
    }
};

class DLL_LINKAGE CreatureLevelLimiter : public ILimiter //仅应用于给定等级的生物
{
public:
    uint32_t minLevel;
    uint32_t maxLevel;
    //默认接受所有等级，接受minLevel <= creature->getLevel() < maxLevel的生物
    CreatureLevelLimiter(uint32_t minLevel = std::numeric_limits<uint32_t>::min(), uint32_t maxLevel = std::numeric_limits<uint32_t>::max());

    EDecision limit(const BonusLimitationContext &context) const override;
    std::string toString() const override;
    JsonNode toJsonNode() const override;

    template <typename Handler> void serialize(Handler &h)
    {
        h & static_cast<ILimiter&>(*this);
        h & minLevel;
        h & maxLevel;
    }
};

class DLL_LINKAGE FactionLimiter : public ILimiter //仅应用于给定派系的生物
{
public:
    FactionID faction;
    FactionLimiter(FactionID faction = FactionID::DEFAULT);

    EDecision limit(const BonusLimitationContext &context) const override;
    std::string toString() const override;
    JsonNode toJsonNode() const override;

    template <typename Handler> void serialize(Handler &h)
    {
        h & static_cast<ILimiter&>(*this);
        h & faction;
    }
};

class DLL_LINKAGE CreatureAlignmentLimiter : public ILimiter //仅应用于给定阵营的生物
{
public:
    EAlignment alignment;
    CreatureAlignmentLimiter(EAlignment Alignment = EAlignment::NEUTRAL);

    EDecision limit(const BonusLimitationContext &context) const override;
    std::string toString() const override;
    JsonNode toJsonNode() const override;

    template <typename Handler> void serialize(Handler &h)
    {
        h & static_cast<ILimiter&>(*this);
        h & alignment;
    }
};

class DLL_LINKAGE OppositeSideLimiter : public ILimiter //仅应用于战斗中敌方军队的生物
{
public:
    OppositeSideLimiter();

    EDecision limit(const BonusLimitationContext &context) const override;

    template <typename Handler> void serialize(Handler &h)
    {
        h & static_cast<ILimiter&>(*this);
        if (!h.hasFeature(Handler::Version::OPPOSITE_SIDE_LIMITER_OWNER))
        {
            PlayerColor owner;
            h & owner;
        }
    }
};

class DLL_LINKAGE RankRangeLimiter : public ILimiter //应用于min <= Rank <= max的生物
{
public:
    ui8 minRank;
    ui8 maxRank;

    RankRangeLimiter();
    RankRangeLimiter(ui8 Min, ui8 Max = 255);
    EDecision limit(const BonusLimitationContext &context) const override;

    template <typename Handler> void serialize(Handler &h)
    {
        h & static_cast<ILimiter&>(*this);
        h & minRank;
        h & maxRank;
    }
};

class DLL_LINKAGE UnitOnHexLimiter : public ILimiter //仅在选定六角格上生效
{
public:
    BattleHexArray applicableHexes;

    UnitOnHexLimiter(const BattleHexArray & applicableHexes = {});
    EDecision limit(const BonusLimitationContext &context) const override;
    JsonNode toJsonNode() const override;

    template <typename Handler> void serialize(Handler &h)
    {
        h & static_cast<ILimiter&>(*this);
        h & applicableHexes;
    }
};

class DLL_LINKAGE HasChargesLimiter : public ILimiter // 用于消耗充能的奖励
{
public:
    uint16_t chargeCost;

    HasChargesLimiter(const uint16_t cost = 1);
    EDecision limit(const BonusLimitationContext & context) const override;

    template <typename Handler> void serialize(Handler &h)
    {
        h & static_cast<ILimiter&>(*this);
        h & chargeCost;
    }
};
```

## 功能说明

ILimiter是VCMI奖励系统中的限制器接口，用于定义奖励应用的条件和限制。限制器决定了奖励是否应该应用于特定的奖励系统节点。不同的限制器实现提供了不同的限制逻辑，如生物类型限制、地形限制、阵营限制等。

## 依赖关系

- [Serializeable](../serializer/Serializeable.md): 可序列化接口
- [CBonusSystemNode](./CBonusSystemNode.md): 奖励系统节点
- [Bonus](./Bonus.md): 奖励类
- [BonusList](./BonusList.md): 奖励列表
- STL库: shared_ptr, vector, map等

## 函数注释

### ILimiter接口

- `~ILimiter()`: 虚析构函数，确保派生类正确销毁
- `limit(context)`: 根据上下文限制奖励，返回决策结果
- `toString()`: 返回限制器的字符串表示
- `toJsonNode()`: 返回限制器的JSON节点表示
- `serialize(h)`: 序列化方法

### 具体限制器类

- `AggregateLimiter`: 聚合限制器，包含多个子限制器
- `AllOfLimiter`: 逻辑AND聚合器，所有子限制器都必须接受
- `AnyOfLimiter`: 逻辑OR聚合器，至少一个子限制器接受即可
- `NoneOfLimiter`: 逻辑NOT聚合器，所有子限制器都必须拒绝
- `CCreatureTypeLimiter`: 生物类型限制器，仅应用于特定生物类型
- `HasAnotherBonusLimiter`: 拥有其他奖励的限制器，仅应用于已有特定奖励的节点
- `TerrainLimiter`: 地形限制器，仅应用于特定地形上的单位
- `CreatureLevelLimiter`: 生物等级限制器，仅应用于特定等级范围内的生物
- `FactionLimiter`: 派系限制器，仅应用于特定派系的生物
- `CreatureAlignmentLimiter`: 阵营限制器，仅应用于特定阵营的生物
- `OppositeSideLimiter`: 对立阵营限制器，仅应用于战斗中敌方军队的单位
- `RankRangeLimiter`: 等级范围限制器，仅应用于特定等级范围的单位
- `UnitOnHexLimiter`: 六角格限制器，仅应用于特定战斗六角格的单位
- `HasChargesLimiter`: 充能限制器，用于消耗充能的奖励