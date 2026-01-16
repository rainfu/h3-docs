# CArtifact类

CArtifact类是VCMI中神器系统的核心类，用于表示游戏中的各种神器，包括组合神器、卷轴、成长型神器和充能型神器。

## 类定义

```cpp
class DLL_LINKAGE CCombinedArtifact
{
protected:
    CCombinedArtifact()
        : fused(false){};

    std::vector<const CArtifact *> constituents; // 组合神器由哪些部分组成，或为nullptr
    std::set<const CArtifact *> partOf; // constituents的反向映射 - 包含此神器的组合神器
    bool fused;

public:
    bool isCombined() const;
    const std::vector<const CArtifact *> & getConstituents() const;
    const std::set<const CArtifact *> & getPartOf() const;
    void setFused(bool isFused);
    bool isFused() const;
    bool hasParts() const;
};

class DLL_LINKAGE CScrollArtifact
{
protected:
    CScrollArtifact() = default;

public:
    bool isScroll() const;
};

class DLL_LINKAGE CGrowingArtifact
{
protected:
    CGrowingArtifact() = default;

    std::vector<std::pair<ui16, std::shared_ptr<Bonus>>> bonusesPerLevel; // 每n级给予的奖励
    std::vector<std::pair<ui16, std::shared_ptr<Bonus>>> thresholdBonuses; // 达到特定等级后一次性添加的奖励
public:
    bool isGrowing() const;

    std::vector<std::pair<ui16, std::shared_ptr<Bonus>>> & getBonusesPerLevel();
    const std::vector<std::pair<ui16, std::shared_ptr<Bonus>>> & getBonusesPerLevel() const;
    std::vector<std::pair<ui16, std::shared_ptr<Bonus>>> & getThresholdBonuses();
    const std::vector<std::pair<ui16, std::shared_ptr<Bonus>>> & getThresholdBonuses() const;
};

class DLL_LINKAGE CChargedArtifact
{
    DischargeArtifactCondition condition;
    bool removeOnDepletion;
    uint16_t defaultStartCharges;

protected:
    CChargedArtifact();

public:
    bool isCharged() const;

    void setCondition(const DischargeArtifactCondition & dischargeCondition);
    void setRemoveOnDepletion(const bool remove);
    void setDefaultStartCharges(const uint16_t charges);
    uint16_t getDefaultStartCharges() const;
    DischargeArtifactCondition getDischargeCondition() const;
    bool getRemoveOnDepletion() const;
    std::optional<uint16_t> getChargeCost(const SpellID & id) const;
};

// 神器容器。不是实例。
class DLL_LINKAGE CArtifact final : public Artifact, public CBonusSystemNode,
        public CCombinedArtifact, public CScrollArtifact, public CGrowingArtifact, public CChargedArtifact
{
    ArtifactID id;
    std::string image;
    std::string advMapDef; // 用于冒险地图对象
    std::string modScope;
    std::string identifier;
    int32_t iconIndex;
    uint32_t price;
    CreatureID warMachine;
    // 携带者类型 => 神器可以放置的槽位ID
    std::map<ArtBearer, std::vector<ArtifactPosition>> possibleSlots;

public:
    /// 为神器的每个实例创建的奖励
    std::vector<std::shared_ptr<Bonus>> instanceBonuses;

    std::string scenarioBonus;

    EArtifactClass aClass = EArtifactClass::ART_SPECIAL;
    bool onlyOnWaterMap;

    int32_t getIndex() const override;
    int32_t getIconIndex() const override;
    std::string getJsonKey() const override;
    std::string getModScope() const override;
    void registerIcons(const IconRegistar & cb) const override;
    ArtifactID getId() const override;
    const IBonusBearer * getBonusBearer() const override;

    std::string getDescriptionTranslated() const override;
    std::string getEventTranslated() const override;
    std::string getNameTranslated() const override;

    std::string getDescriptionTextID() const override;
    std::string getEventTextID() const override;
    std::string getNameTextID() const override;
    std::string getBonusTextID(const std::string & bonusID) const;

    uint32_t getPrice() const override;
    CreatureID getWarMachine() const override;
    bool isBig() const override;
    bool isTradable() const override;

    int getArtClassSerial() const; //0 - treasure, 1 - minor, 2 - major, 3 - relic, 4 - spell scroll, 5 - other
    std::string nodeName() const override;
    void addNewBonus(const std::shared_ptr<Bonus> & b) override;
    const std::map<ArtBearer, std::vector<ArtifactPosition>> & getPossibleSlots() const;

    virtual bool canBePutAt(const CArtifactSet * artSet, ArtifactPosition slot = ArtifactPosition::FIRST_AVAILABLE, bool assumeDestRemoved = false) const;
    void updateFrom(const JsonNode & data);
    // 仅用于测试目的
    void setImage(int32_t iconIndex, const std::string & image, const std::string & large);

    CArtifact();
    ~CArtifact();

    friend class CArtHandler;
};
```

## 功能说明

CArtifact是VCMI神器系统的核心类，代表游戏中的各种神器。它继承自Artifact接口和CBonusSystemNode，支持奖励系统。该类支持多种神器类型：组合神器（由多个部分组成）、卷轴（带有法术）、成长型神器（随等级提升增强）和充能型神器（具有使用次数）。CArtifact还定义了神器在不同携带者身上的可用插槽位置。

## 依赖关系

- [Artifact](./Artifact.md): 神器接口
- [CBonusSystemNode](../bonuses/CBonusSystemNode.md): 奖励系统节点
- [CArtifactSet](./CArtifactSet.md): 神器集合
- [CCombinedArtifact](./CCombinedArtifact.md): 组合神器
- [CScrollArtifact](./CScrollArtifact.md): 卷轴神器
- [CGrowingArtifact](./CGrowingArtifact.md): 成长型神器
- [CChargedArtifact](./CChargedArtifact.md): 充能型神器
- [Bonus](../bonuses/Bonus.md): 奖励类
- [ArtifactID](./ArtifactID.md): 神器ID
- [CreatureID](./CreatureID.md): 生物ID
- [ArtBearer](./ArtBearer.md): 神器携带者
- [ArtifactPosition](./ArtifactPosition.md): 神器位置
- [EArtifactClass](./EArtifactClass.md): 神器类别
- [DischargeArtifactCondition](./DischargeArtifactCondition.md): 充电条件
- [SpellID](../spells/SpellID.md): 法术ID
- [IconRegistar](./IconRegistar.md): 图标注册器
- STL库: vector, map, shared_ptr, optional等

## 函数注释

### CCombinedArtifact类

- `isCombined()`: 检查是否为组合神器
- `getConstituents()`: 获取构成组件
- `getPartOf()`: 获取此神器所属的组合神器
- `setFused(bool)`: 设置融合状态
- `isFused()`: 检查是否已融合
- `hasParts()`: 检查是否有组成部分

### CScrollArtifact类

- `isScroll()`: 检查是否为卷轴

### CGrowingArtifact类

- `isGrowing()`: 检查是否为成长型神器
- `getBonusesPerLevel()`: 获取每级奖励
- `getThresholdBonuses()`: 获取阈值奖励

### CChargedArtifact类

- `isCharged()`: 检查是否为充能型神器
- `setCondition(condition)`: 设置充能条件
- `setRemoveOnDepletion(remove)`: 设置耗尽时是否移除
- `setDefaultStartCharges(charges)`: 设置默认起始充能
- `getDefaultStartCharges()`: 获取默认起始充能
- `getDischargeCondition()`: 获取放电条件
- `getRemoveOnDepletion()`: 获取耗尽时是否移除
- `getChargeCost(spellID)`: 获取法术的充能消耗

### CArtifact类

- `CArtifact()`: 构造函数
- `~CArtifact()`: 析构函数
- `getIndex()`: 获取索引
- `getIconIndex()`: 获取图标索引
- `getJsonKey()`: 获取JSON键
- `getModScope()`: 获取模组作用域
- `registerIcons(cb)`: 注册图标
- `getId()`: 获取神器ID
- `getBonusBearer()`: 获取奖励承载者
- `getDescriptionTranslated()`: 获取翻译后的描述
- `getNameTranslated()`: 获取翻译后的名称
- `getPrice()`: 获取价格
- `getWarMachine()`: 获取战争机器
- `isBig()`: 检查是否为大型神器
- `isTradable()`: 检查是否可交易
- `getArtClassSerial()`: 获取神器类别序列
- `addNewBonus(b)`: 添加新奖励
- `getPossibleSlots()`: 获取可能的插槽
- `canBePutAt(artSet, slot, assumeDestRemoved)`: 检查是否可以放置在指定位置
- `updateFrom(data)`: 从数据更新
- `setImage(iconIndex, image, large)`: 设置图像（仅用于测试）