# CArtifact类

CArtifact类是VCMI系统中的神器类，用于定义游戏中的神器类型。它不仅包含了神器的基本属性，还集成了多种特殊功能，如组合、滚动、成长和充能等。

## 类定义

```cpp
class CArtifactSet;

// 组合神器类
class DLL_LINKAGE CCombinedArtifact
{
protected:
    CCombinedArtifact()
        : fused(false){};

    std::vector<const CArtifact *> constituents; // 组成组合神器的部件ID，或为nullptr
    std::set<const CArtifact *> partOf;         // 反向映射 - 包含此神器的组合神器
    bool fused;

public:
    bool isCombined() const;                                    // 检查是否为组合神器
    const std::vector<const CArtifact *> & getConstituents() const; // 获取组成部件
    const std::set<const CArtifact *> & getPartOf() const;       // 获取包含此神器的组合神器
    void setFused(bool isFused);                               // 设置融合状态
    bool isFused() const;                                       // 检查是否已融合
    bool hasParts() const;                                      // 检查是否有部件
};

// 滚动神器类
class DLL_LINKAGE CScrollArtifact
{
protected:
    CScrollArtifact() = default;

public:
    bool isScroll() const; // 检查是否为滚动神器
};

// 成长神器类
class DLL_LINKAGE CGrowingArtifact
{
protected:
    CGrowingArtifact() = default;

    std::vector<std::pair<ui16, std::shared_ptr<Bonus>>> bonusesPerLevel;     // 每n级给予的奖励
    std::vector<std::pair<ui16, std::shared_ptr<Bonus>>> thresholdBonuses;   // 达到特定等级后一次性添加的奖励
public:
    bool isGrowing() const; // 检查是否为成长神器

    std::vector<std::pair<ui16, std::shared_ptr<Bonus>>> & getBonusesPerLevel();       // 获取每级奖励
    const std::vector<std::pair<ui16, std::shared_ptr<Bonus>>> & getBonusesPerLevel() const; // 获取每级奖励（常量）
    std::vector<std::pair<ui16, std::shared_ptr<Bonus>>> & getThresholdBonuses();      // 获取阈值奖励
    const std::vector<std::pair<ui16, std::shared_ptr<Bonus>>> & getThresholdBonuses() const; // 获取阈值奖励（常量）
};

// 充电神器类
class DLL_LINKAGE CChargedArtifact
{
    DischargeArtifactCondition condition;
    bool removeOnDepletion;
    uint16_t defaultStartCharges;

protected:
    CChargedArtifact();

public:
    bool isCharged() const; // 检查是否为充电神器

    void setCondition(const DischargeArtifactCondition & dischargeCondition); // 设置放电条件
    void setRemoveOnDepletion(const bool remove);                           // 设置耗尽时移除
    void setDefaultStartCharges(const uint16_t charges);                   // 设置默认初始充能
    uint16_t getDefaultStartCharges() const;                              // 获取默认初始充能
    DischargeArtifactCondition getDischargeCondition() const;              // 获取放电条件
    bool getRemoveOnDepletion() const;                                    // 获取耗尽时移除标志
    std::optional<uint16_t> getChargeCost(const SpellID & id) const;       // 获取法术充能消耗
};

// 神器容器类。不用于实例。
class DLL_LINKAGE CArtifact final : public Artifact, public CBonusSystemNode,
        public CCombinedArtifact, public CScrollArtifact, public CGrowingArtifact, public CChargedArtifact
{
    ArtifactID id;                           // 神器ID
    std::string image;                       // 图像文件名
    std::string advMapDef;                   // 用于冒险地图对象
    std::string modScope;                    // 模组范围
    std::string identifier;                  // 标识符
    int32_t iconIndex;                      // 图标索引
    uint32_t price;                         // 价格
    CreatureID warMachine;                   // 战争机器
    // 携带者类型 => 神器可放置的槽位ID
    std::map<ArtBearer, std::vector<ArtifactPosition>> possibleSlots;

public:
    /// 每个神器实例创建的奖励
    std::vector<std::shared_ptr<Bonus>> instanceBonuses;

    std::string scenarioBonus;               // 情景奖励

    EArtifactClass aClass = EArtifactClass::ART_SPECIAL; // 神器类别
    bool onlyOnWaterMap;                     // 仅在水上地图

    int32_t getIndex() const override;      // 获取索引
    int32_t getIconIndex() const override;  // 获取图标索引
    std::string getJsonKey() const override; // 获取JSON键
    std::string getModScope() const override; // 获取模组范围
    void registerIcons(const IconRegistar & cb) const override; // 注册图标
    ArtifactID getId() const override;       // 获取ID
    const IBonusBearer * getBonusBearer() const override; // 获取奖励承载者

    std::string getDescriptionTranslated() const override; // 获取翻译描述
    std::string getEventTranslated() const override;       // 获取翻译事件
    std::string getNameTranslated() const override;        // 获取翻译名称

    std::string getDescriptionTextID() const override;     // 获取描述文本ID
    std::string getEventTextID() const override;           // 获取事件文本ID
    std::string getNameTextID() const override;            // 获取名称文本ID
    std::string getBonusTextID(const std::string & bonusID) const; // 获取奖励文本ID

    uint32_t getPrice() const override;                    // 获取价格
    CreatureID getWarMachine() const override;             // 获取战争机器
    bool isBig() const override;                           // 检查是否为大件神器
    bool isTradable() const override;                      // 检查是否可交易

    int getArtClassSerial() const;                         // 获取神器类别序列：0-宝藏，1-次要，2-主要，3-遗物，4-法术卷轴，5-其他
    std::string nodeName() const override;                 // 获取节点名称
    void addNewBonus(const std::shared_ptr<Bonus> & b) override; // 添加新奖励
    const std::map<ArtBearer, std::vector<ArtifactPosition>> & getPossibleSlots() const; // 获取可能的槽位

    virtual bool canBePutAt(const CArtifactSet * artSet, ArtifactPosition slot = ArtifactPosition::FIRST_AVAILABLE, bool assumeDestRemoved = false) const; // 检查是否可以放入指定位置
    void updateFrom(const JsonNode & data);                // 从JSON节点更新
    // 仅用于测试目的
    void setImage(int32_t iconIndex, const std::string & image, const std::string & large); // 设置图像

    CArtifact();                                           // 构造函数
    ~CArtifact();                                          // 析构函数

    friend class CArtHandler;                              // CArtHandler类是友元
};
```

## 功能说明

CArtifact类是VCMI系统中表示神器类型的核心类，它不仅包含了神器的基本属性（如名称、价格、类别等），还集成了多种特殊功能，使其能够表示不同类型的神器：

1. **组合神器**（CCombinedArtifact）：支持由多个部件组成的复合神器
2. **滚动神器**（CScrollArtifact）：可以包含法术卷轴的神器
3. **成长神器**（CGrowingArtifact）：随等级提升而增强的神器
4. **充能神器**（CChargedArtifact）：具有充能机制的神器

## 重要方法

### 基本属性访问
- `getId()`：获取神器ID
- `getNameTranslated()`：获取翻译后的名称
- `getDescriptionTranslated()`：获取翻译后的描述
- `getPrice()`：获取价格
- `isTradable()`：检查是否可交易

### 特殊功能
- `isCombined()`：检查是否为组合神器
- `isScroll()`：检查是否为滚动神器
- `isGrowing()`：检查是否为成长神器
- `isCharged()`：检查是否为充能神器

### 槽位管理
- `canBePutAt()`：检查神器是否可以放在指定位置
- `getPossibleSlots()`：获取可能的槽位列表

### 奖励系统
- `addNewBonus()`：添加新奖励
- `getBonusBearer()`：获取奖励承载者接口

## 设计说明

CArtifact类采用了多重继承的设计模式，将不同类型神器的特有功能封装在单独的基类中。这种设计使得单一类可以同时具备多种特性，同时也保持了各功能模块的独立性。

该类继承自CBonusSystemNode，使其能够参与奖励系统；同时实现了Artifact接口，提供了标准化的访问方法。通过这种方式，CArtifact类既是一个数据容器，也是奖励系统的一部分，还是游戏逻辑的参与者。