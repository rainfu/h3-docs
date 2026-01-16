# Limiters相关类

Limiters相关类是VCMI奖励系统中的限制器组件，用于控制奖励何时生效或被拒绝。这些类提供了一种灵活的机制来限制奖励的应用条件。

## 类定义

```cpp
struct BonusLimitationContext
{
    const Bonus & b;                          // 要被限制的奖励
    const CBonusSystemNode & node;            // 奖励应用的节点
    const BonusList & alreadyAccepted;        // 已经被接受的奖励列表
    const BonusList & stillUndecided;         // 尚未决定的奖励列表
};

class DLL_LINKAGE ILimiter : public Serializeable
{
public:
    enum class EDecision : uint8_t
    {
        ACCEPT,        // 接受奖励
        DISCARD,       // 拒绝奖励
        NOT_SURE,      // 结果仍可能改变（基于尚未解决的奖励）
        NOT_APPLICABLE // 限制器不适用于当前节点且永远不会适用
    };

    virtual ~ILimiter() = default;

    virtual EDecision limit(const BonusLimitationContext &context) const; // 限制奖励
    virtual std::string toString() const;       // 转换为字符串
    virtual JsonNode toJsonNode() const;       // 转换为JSON节点

    template <typename Handler> void serialize(Handler &h); // 序列化函数
};

using TLimiterPtr = std::shared_ptr<const ILimiter>; // 限制器智能指针类型
extern DLL_LINKAGE const std::map<std::string, TLimiterPtr> bonusLimiterMap; // 奖励限制器映射

class DLL_LINKAGE AggregateLimiter : public ILimiter
{
protected:
    virtual const std::string & getAggregator() const = 0; // 获取聚合器名称
    AggregateLimiter(std::vector<TLimiterPtr> limiters = {}); // 构造函数
public:
    std::vector<TLimiterPtr> limiters;        // 限制器列表
    void add(const TLimiterPtr & limiter);    // 添加限制器
    JsonNode toJsonNode() const override;     // 转换为JSON节点

    template <typename Handler> void serialize(Handler & h); // 序列化函数
};

class DLL_LINKAGE AllOfLimiter : public AggregateLimiter
{
protected:
    const std::string & getAggregator() const override; // 获取聚合器名称
public:
    AllOfLimiter(std::vector<TLimiterPtr> limiters = {}); // 构造函数
    static const std::string aggregator;      // 聚合器名称
    EDecision limit(const BonusLimitationContext & context) const override; // 限制奖励（所有条件都必须满足）
};

class DLL_LINKAGE AnyOfLimiter : public AggregateLimiter
{
protected:
    const std::string & getAggregator() const override; // 获取聚合器名称
public:
    AnyOfLimiter(std::vector<TLimiterPtr> limiters = {}); // 构造函数
    static const std::string aggregator;      // 聚合器名称
    EDecision limit(const BonusLimitationContext & context) const override; // 限制奖励（任一条件满足即可）
};

class DLL_LINKAGE NoneOfLimiter : public AggregateLimiter
{
protected:
    const std::string & getAggregator() const override; // 获取聚合器名称
public:
    NoneOfLimiter(std::vector<TLimiterPtr> limiters = {}); // 构造函数
    static const std::string aggregator;      // 聚合器名称
    EDecision limit(const BonusLimitationContext & context) const override; // 限制奖励（所有条件都不能满足）
};

class DLL_LINKAGE CCreatureTypeLimiter : public ILimiter // 仅影响指定生物（可选包括升级）
{
public:
    CreatureID creatureID;                     // 生物ID
    bool includeUpgrades = false;             // 是否包含升级

    CCreatureTypeLimiter() = default;
    CCreatureTypeLimiter(const CCreature & creature_, bool IncludeUpgrades); // 构造函数
    void setCreature(const CreatureID & id);   // 设置生物ID

    EDecision limit(const BonusLimitationContext &context) const override; // 限制奖励
    std::string toString() const override;     // 转换为字符串
    JsonNode toJsonNode() const override;     // 转换为JSON节点

    template <typename Handler> void serialize(Handler &h); // 序列化函数
};

class DLL_LINKAGE HasAnotherBonusLimiter : public ILimiter // 仅适用于具有另一个奖励工作的节点
{
public:
    BonusType type;                           // 奖励类型
    BonusSubtypeID subtype;                   // 奖励子类型
    BonusSource source = BonusSource::OTHER;  // 奖励来源
    BonusSourceID sid;                        // 奖励来源ID
    bool isSubtypeRelevant;                   // 子类型是否相关
    bool isSourceRelevant;                    // 来源是否相关
    bool isSourceIDRelevant;                  // 来源ID是否相关

    HasAnotherBonusLimiter(BonusType bonus = BonusType::NONE); // 构造函数
    HasAnotherBonusLimiter(BonusType bonus, BonusSubtypeID _subtype); // 构造函数
    HasAnotherBonusLimiter(BonusType bonus, BonusSource src); // 构造函数
    HasAnotherBonusLimiter(BonusType bonus, BonusSubtypeID _subtype, BonusSource src); // 构造函数

    EDecision limit(const BonusLimitationContext &context) const override; // 限制奖励
    std::string toString() const override;     // 转换为字符串
    JsonNode toJsonNode() const override;     // 转换为JSON节点

    template <typename Handler> void serialize(Handler &h); // 序列化函数
};

class DLL_LINKAGE TerrainLimiter : public ILimiter // 仅适用于指定地形上的生物，默认为原生地形
{
public:
    TerrainId terrainType;                    // 地形类型
    TerrainLimiter();                         // 构造函数
    TerrainLimiter(TerrainId terrain);        // 构造函数

    EDecision limit(const BonusLimitationContext &context) const override; // 限制奖励
    std::string toString() const override;     // 转换为字符串
    JsonNode toJsonNode() const override;     // 转换为JSON节点

    template <typename Handler> void serialize(Handler &h); // 序列化函数
};

class DLL_LINKAGE CreatureLevelLimiter : public ILimiter // 仅适用于指定等级范围内的生物
{
public:
    uint32_t minLevel;                        // 最小等级
    uint32_t maxLevel;                        // 最大等级
    // 默认接受所有等级，接受 minLevel <= creature->getLevel() < maxLevel 的生物
    CreatureLevelLimiter(uint32_t minLevel = std::numeric_limits<uint32_t>::min(),
                         uint32_t maxLevel = std::numeric_limits<uint32_t>::max()); // 构造函数

    EDecision limit(const BonusLimitationContext &context) const override; // 限制奖励
    std::string toString() const override;     // 转换为字符串
    JsonNode toJsonNode() const override;     // 转换为JSON节点

    template <typename Handler> void serialize(Handler &h); // 序列化函数
};

class DLL_LINKAGE FactionLimiter : public ILimiter // 仅适用于指定派系的生物
{
public:
    FactionID faction;                        // 派系ID
    FactionLimiter(FactionID faction = FactionID::DEFAULT); // 构造函数

    EDecision limit(const BonusLimitationContext &context) const override; // 限制奖励
    std::string toString() const override;     // 转换为字符串
    JsonNode toJsonNode() const override;     // 转换为JSON节点

    template <typename Handler> void serialize(Handler &h); // 序列化函数
};

class DLL_LINKAGE CreatureAlignmentLimiter : public ILimiter // 仅适用于指定阵营的生物
{
public:
    EAlignment alignment;                     // 阵营
    CreatureAlignmentLimiter(EAlignment Alignment = EAlignment::NEUTRAL); // 构造函数

    EDecision limit(const BonusLimitationContext &context) const override; // 限制奖励
    std::string toString() const override;     // 转换为字符串
    JsonNode toJsonNode() const override;     // 转换为JSON节点

    template <typename Handler> void serialize(Handler &h); // 序列化函数
};

class DLL_LINKAGE OppositeSideLimiter : public ILimiter // 仅适用于战斗中敌方军队的生物
{
public:
    OppositeSideLimiter();                    // 构造函数

    EDecision limit(const BonusLimitationContext &context) const override; // 限制奖励

    template <typename Handler> void serialize(Handler &h); // 序列化函数
};

class DLL_LINKAGE RankRangeLimiter : public ILimiter // 适用于 min <= Rank <= max 的生物
{
public:
    ui8 minRank;                              // 最小等级
    ui8 maxRank;                              // 最大等级

    RankRangeLimiter();                       // 构造函数
    RankRangeLimiter(ui8 Min, ui8 Max = 255); // 构造函数
    EDecision limit(const BonusLimitationContext &context) const override; // 限制奖励

    template <typename Handler> void serialize(Handler &h); // 序列化函数
};

class DLL_LINKAGE UnitOnHexLimiter : public ILimiter // 仅在选定六角格上工作
{
public:
    BattleHexArray applicableHexes;           // 适用的六角格数组

    UnitOnHexLimiter(const BattleHexArray & applicableHexes = {}); // 构造函数
    EDecision limit(const BonusLimitationContext &context) const override; // 限制奖励
    JsonNode toJsonNode() const override;     // 转换为JSON节点

    template <typename Handler> void serialize(Handler &h); // 序列化函数
};

class DLL_LINKAGE HasChargesLimiter : public ILimiter // 与消耗充能的奖励一起工作
{
public:
    uint16_t chargeCost;                      // 充能消耗

    HasChargesLimiter(const uint16_t cost = 1); // 构造函数
    EDecision limit(const BonusLimitationContext & context) const override; // 限制奖励

    template <typename Handler> void serialize(Handler &h); // 序列化函数
};
```

## 功能说明

Limiters相关类是VCMI奖励系统中的限制器组件，用于控制奖励在何种条件下可以应用。限制器机制提供了一种灵活的方式，根据各种条件（如生物类型、地形、等级、阵营等）来决定奖励是否应该被接受。

## ILimiter基类

ILimiter是所有限制器的基类，定义了限制器的基本接口。它提供了一个limit方法，该方法接收一个上下文参数并返回一个EDecision枚举值，表示对奖励的处理决策。

## 限制器类型

### 聚合限制器

- `AggregateLimiter`: 抽象基类，用于组合多个限制器
- `AllOfLimiter`: 所有限制器都必须接受奖励才会被接受
- `AnyOfLimiter`: 任一限制器接受奖励就会被接受
- `NoneOfLimiter`: 所有限制器都必须拒绝奖励才会被接受

### 生物相关限制器

- `CCreatureTypeLimiter`: 仅影响特定生物类型（可选包括升级）
- `CreatureLevelLimiter`: 仅影响特定等级范围的生物
- `FactionLimiter`: 仅影响特定派系的生物
- `CreatureAlignmentLimiter`: 仅影响特定阵营的生物
- `RankRangeLimiter`: 仅影响特定等级范围的生物

### 战斗相关限制器

- `OppositeSideLimiter`: 仅适用于战斗中敌方军队的生物
- `UnitOnHexLimiter`: 仅在特定战斗六角格上生效

### 特定条件限制器

- `HasAnotherBonusLimiter`: 仅当节点具有另一个奖励时生效
- `TerrainLimiter`: 仅适用于特定地形上的生物
- `HasChargesLimiter`: 与消耗充能的奖励一起工作

## 设计说明

限制器系统采用了策略模式和组合模式的组合，允许灵活地定义奖励的应用条件。ILimiter基类定义了统一接口，使不同类型的限制器可以被统一处理。聚合限制器（AllOfLimiter、AnyOfLimiter、NoneOfLimiter）实现了组合模式，允许将多个限制器组合成复杂的条件判断逻辑。

每个具体限制器实现了自己的限制逻辑，根据特定的条件来决定奖励是否应该被接受。这种设计使得奖励系统非常灵活，可以根据游戏规则和需求精确控制奖励的应用范围。