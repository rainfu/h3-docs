# Bonus类

Bonus类是VCMI奖励系统中的核心类，用于表示游戏中各种奖励效果，如数值加成、特殊能力等。

## 类定义

```cpp
class DLL_LINKAGE CAddInfo final
{
public:
    using container = std::vector<si32>;
    using size_type = container::size_type;
    enum { NONE = -1 };

    CAddInfo();
    CAddInfo(si32 value);

    bool operator==(const CAddInfo& other) const noexcept;
    bool operator!=(const CAddInfo& other) const noexcept;
    bool operator==(si32 value) const;
    bool operator!=(si32 value) const;

    si32 & operator[](size_type pos);
    si32 operator[](size_type pos) const;

    std::string toString() const;
    JsonNode toJsonNode() const;

    size_type size() const noexcept;
    bool empty() const noexcept;
    void push_back(si32 v);
    void resize(size_type n, si32 fill = CAddInfo::NONE);

    container::iterator begin() noexcept;
    container::iterator end() noexcept;
    container::const_iterator begin() const noexcept;
    container::const_iterator end() const noexcept;

    const container& data() const noexcept;

    template <class H>
    void serialize(H& h);
private:
    container data_;
};

/// Struct for handling bonuses of several types. Can be transferred to any hero
struct DLL_LINKAGE Bonus : public std::enable_shared_from_this<Bonus>, public Serializeable
{
    BonusDuration::Type duration = BonusDuration::PERMANENT; // 使用BonusDuration值 - 2字节
    si32 val = 0;
    si16 turnsRemain = 0; // 如果duration是N_TURNS, N_DAYS或ONE_WEEK时使用

    BonusValueType valType = BonusValueType::ADDITIVE_VALUE; // 1字节
    BonusSource source = BonusSource::OTHER; // 源类型：是什么给了这个奖励 - 1字节
    BonusSource targetSourceType = BonusSource::OTHER; // Bonuses of what origin this amplifies, uses BonusSource values. Needed for PERCENT_TO_TARGET_TYPE. - 1字节
    BonusLimitEffect effectRange = BonusLimitEffect::NO_LIMIT; // 1字节
    BonusType type = BonusType::NONE; // 使用BonusType值 - 表示这是什么类型的奖励 - 2字节

    BonusSubtypeID subtype;
    BonusSourceID sid; // 源ID：对象/神器/法术的ID
    std::string stacking; // 相同stacking值的奖励不叠加（例如天使/大天使士气加成）

    CAddInfo additionalInfo;

    TLimiterPtr limiter;
    TPropagatorPtr propagator;
    TUpdaterPtr updater;
    TUpdaterPtr propagationUpdater;

    ImagePath customIconPath;
    MetaString description;
    PlayerColor bonusOwner = PlayerColor::CANNOT_DETERMINE;

    bool hidden = false;

    Bonus(BonusDuration::Type Duration, BonusType Type, BonusSource Src, si32 Val, BonusSourceID sourceID);
    Bonus(BonusDuration::Type Duration, BonusType Type, BonusSource Src, si32 Val, BonusSourceID sourceID, BonusSubtypeID subtype);
    Bonus(BonusDuration::Type Duration, BonusType Type, BonusSource Src, si32 Val, BonusSourceID sourceID, BonusSubtypeID subtype, BonusValueType ValType);
    Bonus(const Bonus & inst, const BonusSourceID & sourceId);
    Bonus() = default;

    template <typename Handler> void serialize(Handler &h);

    template <typename Ptr>
    static bool compareByAdditionalInfo(const Ptr& a, const Ptr& b);

    static bool NDays(const Bonus *hb);
    static bool NTurns(const Bonus *hb);
    static bool OneDay(const Bonus *hb);
    static bool OneWeek(const Bonus *hb);
    static bool OneBattle(const Bonus *hb);
    static bool Permanent(const Bonus *hb);
    static bool UntilGetsTurn(const Bonus *hb);
    static bool UntilAttack(const Bonus *hb);
    static bool UntilBeingAttacked(const Bonus *hb);
    static bool UntilCommanderKilled(const Bonus *hb);
    static bool UntilOwnAttack(const Bonus *hb);

    inline bool operator == (const BonusType & cf) const;
    inline void operator += (const ui32 Val);

    std::string Description(const IGameInfoCallback * cb, std::optional<si32> customValue = {}) const;
    JsonNode toJsonNode() const;

    std::shared_ptr<Bonus> addLimiter(const TLimiterPtr & Limiter); // 返回this以便链式调用
    std::shared_ptr<Bonus> addPropagator(const TPropagatorPtr & Propagator); // 返回this以便链式调用
    std::shared_ptr<Bonus> addUpdater(const TUpdaterPtr & Updater); // 返回this以便链式调用
};
```

## 功能说明

Bonus是VCMI奖励系统的核心类，代表游戏中的各种奖励效果。它可以表示数值加成、特殊能力、状态变化等各种游戏机制。每个奖励都有类型、子类型、来源、持续时间、数值类型等多个属性，可以应用于不同的游戏对象（如英雄、生物、城市等）。

## 成员变量

### 基本属性
- `duration`: 奖励持续时间类型（永久、临时、战斗期间等）
- `val`: 奖励数值，可正可负
- `turnsRemain`: 临时奖励剩余回合数
- `valType`: 数值类型（加法/乘法/百分比等）
- `type`: 奖励类型（主要技能、士气、幸运等）
- `subtype`: 奖励子类型ID

### 来源信息
- `source`: 奖励来源类型（神器、法术、地形等）
- `sid`: 来源ID（对应具体对象/神器/法术的ID）
- `targetSourceType`: 目标来源类型（用于百分比加成）
- `bonusOwner`: 奖励拥有者（玩家颜色）

### 高级特性
- `stacking`: 堆叠标识（相同标识的奖励不堆叠）
- `additionalInfo`: 额外信息数组
- `limiter`: 限制器（控制奖励生效条件）
- `propagator`: 传播器（控制奖励如何传播）
- `updater`: 更新器（控制奖励如何更新）
- `propagationUpdater`: 传播更新器

### 显示属性
- `customIconPath`: 自定义图标路径
- `description`: 奖励描述文本
- `hidden`: 是否隐藏奖励

## 成员函数

### 构造函数
```cpp
// 基础构造函数
Bonus(BonusDuration::Type Duration, BonusType Type, BonusSource Src, si32 Val, BonusSourceID sourceID);

// 带子类型的构造函数
Bonus(BonusDuration::Type Duration, BonusType Type, BonusSource Src, si32 Val, BonusSourceID sourceID, BonusSubtypeID subtype);

// 完整合约函数
Bonus(BonusDuration::Type Duration, BonusType Type, BonusSource Src, si32 Val, BonusSourceID sourceID, BonusSubtypeID subtype, BonusValueType ValType);
```

### 持续时间检查
```cpp
// 各种持续时间类型的静态检查函数
static bool NDays(const Bonus *hb);        // N天
static bool NTurns(const Bonus *hb);       // N回合
static bool OneDay(const Bonus *hb);       // 一天
static bool OneWeek(const Bonus *hb);      // 一周
static bool OneBattle(const Bonus *hb);    // 一场战斗
static bool Permanent(const Bonus *hb);    // 永久
static bool UntilGetsTurn(const Bonus *hb); // 直到获得回合
static bool UntilAttack(const Bonus *hb);   // 直到攻击
static bool UntilBeingAttacked(const Bonus *hb); // 直到被攻击
static bool UntilCommanderKilled(const Bonus *hb); // 直到指挥官被杀
static bool UntilOwnAttack(const Bonus *hb); // 直到自己攻击
```

### 描述生成
```cpp
// 生成奖励描述
std::string Description(const IGameInfoCallback * cb, std::optional<si32> customValue = {}) const;

// 转换为JSON节点
JsonNode toJsonNode() const;
```

### 链式调用方法
```cpp
// 添加限制器
std::shared_ptr<Bonus> addLimiter(const TLimiterPtr & Limiter);

// 添加传播器
std::shared_ptr<Bonus> addPropagator(const TPropagatorPtr & Propagator);

// 添加更新器
std::shared_ptr<Bonus> addUpdater(const TUpdaterPtr & Updater);
```

### 其他成员函数
```cpp
// 比较操作符
inline bool operator == (const BonusType & cf) const;

// 累加操作符
inline void operator += (const ui32 Val);

// 按附加信息比较
template <typename Ptr>
static bool compareByAdditionalInfo(const Ptr& a, const Ptr& b);
```

## 依赖关系

- [Serializeable](../serializer/Serializeable.md): 可序列化接口
- [CAddInfo](./CAddInfo.md): 额外信息结构
- [TLimiterPtr](./TLimiter.md): 限制器指针
- [TPropagatorPtr](./TPropagator.md): 传播器指针
- [TUpdaterPtr](./TUpdater.md): 更新器指针
- [ImagePath](../filesystem/ImagePath.md): 图标路径
- [MetaString](../texts/MetaString.md): 元字符串
- [IGameInfoCallback](../gameState/IGameInfoCallback.md): 游戏信息回调接口
- STL库: enable_shared_from_this, optional等

## 使用示例

### 创建基础奖励
```cpp
// 创建攻击力+2的永久奖励
auto attackBonus = std::make_shared<Bonus>(
    BonusDuration::PERMANENT,     // 永久持续
    BonusType::PRIMARY_SKILL,     // 主要技能
    BonusSource::ARTIFACT,        // 来源：神器
    2,                            // +2
    BonusSourceID(artifactId),    // 神器ID
    BonusSubtypeID(PrimarySkill::ATTACK)  // 子类型：攻击
);
```

### 创建复杂奖励
```cpp
// 创建战斗中+50%伤害的奖励，持续一场战斗
auto battleBonus = std::make_shared<Bonus>(
    BonusDuration::ONE_BATTLE,
    BonusType::GENERAL_DAMAGE_REDUCTION,  // 一般伤害减少（负数即为加成）
    BonusSource::SPELL,
    -50,  // -50% (即+50%伤害)
    BonusSourceID(spellId),
    BonusValueType::PERCENT_TO_BASE  // 百分比类型
);

// 添加限制器：仅对远程攻击生效
battleBonus->addLimiter(std::make_shared<HasAnotherBonusLimiter>(
    BonusType::SHOOTER  // 必须是远程单位
));
```

### 奖励堆叠和限制
```cpp
// 创建不堆叠的奖励
auto moraleBonus = std::make_shared<Bonus>(
    BonusDuration::PERMANENT,
    BonusType::MORALE,
    BonusSource::HERO_SPECIAL,
    1,  // +1士气
    BonusSourceID(),
    BonusSubtypeID()  // 空子类型
);
moraleBonus->stacking = "angel_morale";  // 堆叠标识

// 相同stacking的奖励不会堆叠
auto anotherMoraleBonus = std::make_shared<Bonus>(*moraleBonus);
// 这两个奖励不会同时生效
```

### 奖励描述
```cpp
// 生成奖励描述
std::string desc = bonus->Description(gameCallback);

// 自定义数值的描述
std::string customDesc = bonus->Description(gameCallback, 5);  // 使用5作为数值
```