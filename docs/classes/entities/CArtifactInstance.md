# CArtifactInstance类

CArtifactInstance类是VCMI系统中的神器实例类，用于表示游戏中具体的神器实例。它不仅包含了神器实例的基本属性，还集成了多种特殊功能，如组合、滚动、成长和充能等。

## 类定义

```cpp
struct ArtifactLocation;
class CGameState;
class CArtifactSet;

// 组合神器实例类
class DLL_LINKAGE CCombinedArtifactInstance : public GameCallbackHolder
{
protected:
    using GameCallbackHolder::GameCallbackHolder;

public:
    using ArtPlacementMap = std::map<const CArtifactInstance *, ArtifactPosition>; // 神器放置映射

    struct PartInfo
    {
    private:
        const CArtifactInstance * artifactPtr = nullptr;  // 神器实例指针
        ArtifactInstanceID artifactID;                    // 神器实例ID
    public:
        PartInfo() = default;
        PartInfo(const CArtifactInstance * artifact, ArtifactPosition slot); // 构造函数

        ArtifactPosition slot;                            // 槽位

        const CArtifactInstance * getArtifact() const;    // 获取神器实例
        ArtifactInstanceID getArtifactID() const;        // 获取神器实例ID

        template <typename Handler>
        void serialize(Handler & h);                     // 序列化
    };

    void addPart(const CArtifactInstance * art, const ArtifactPosition & slot); // 添加部件
    bool isPart(const CArtifactInstance * supposedPart) const;                 // 检查是否为部件
    bool hasParts() const;                                                      // 检查是否有部件
    const std::vector<PartInfo> & getPartsInfo() const;                        // 获取部件信息
    void addPlacementMap(const ArtPlacementMap & placementMap);                 // 添加放置映射

    template <typename Handler> void serialize(Handler & h)                     // 序列化
    {
        h & partsInfo;
    }
protected:
    std::vector<PartInfo> partsInfo;                                            // 部件信息
};

// 滚动神器实例类
class DLL_LINKAGE CScrollArtifactInstance
{
protected:
    CScrollArtifactInstance() = default;

public:
    SpellID getScrollSpellID() const;                                         // 获取滚动法术ID
};

// 成长神器实例类
class DLL_LINKAGE CGrowingArtifactInstance
{
protected:
    CGrowingArtifactInstance() = default;

public:
    void growingUp();                                                         // 成长
};

// 充电神器实例类
class DLL_LINKAGE CChargedArtifactInstance
{
protected:
    CChargedArtifactInstance() = default;

public:
    void discharge(const uint16_t charges);                                  // 放电
    void addCharges(const uint16_t charges);                                 // 添加充能
    uint16_t getCharges() const;                                             // 获取充能
};

// 神器实例类
class DLL_LINKAGE CArtifactInstance final
    : public CBonusSystemNode, public CCombinedArtifactInstance, public CScrollArtifactInstance, public CGrowingArtifactInstance, public CChargedArtifactInstance
{
    ArtifactInstanceID id;                                                    // 实例ID
    ArtifactID artTypeID;                                                     // 类型ID

    void init();                                                             // 初始化

public:
    CArtifactInstance(IGameInfoCallback *cb, const CArtifact * art);        // 构造函数
    CArtifactInstance(IGameInfoCallback *cb);                               // 构造函数
    std::string nodeName() const override;                                   // 节点名称
    ArtifactID getTypeId() const;                                            // 获取类型ID
    const CArtifact * getType() const;                                       // 获取类型
    ArtifactInstanceID getId() const;                                        // 获取实例ID
    void setId(ArtifactInstanceID id);                                       // 设置实例ID

    static void saveCompatibilityFixArtifactID(std::shared_ptr<CArtifactInstance> self); // 保存兼容性修复

    bool canBePutAt(const CArtifactSet * artSet, ArtifactPosition slot = ArtifactPosition::FIRST_AVAILABLE,
        bool assumeDestRemoved = false) const;                               // 检查是否可以放置
    bool isCombined() const;                                                 // 检查是否为组合神器
    bool isScroll() const;                                                   // 检查是否为滚动神器
    
    void attachToBonusSystem(CGameState & gs);                              // 附加到奖励系统

    template <typename Handler> void serialize(Handler & h)                  // 序列化
    {
        h & static_cast<CBonusSystemNode&>(*this);
        h & static_cast<CCombinedArtifactInstance&>(*this);
        h & artTypeID;
        h & id;

        if(!h.saving && h.loadingGamestate)
        {
            init();
        }
    }
};

template <typename Handler>
void CCombinedArtifactInstance::PartInfo::serialize(Handler & h)             // PartInfo序列化
{
    if (h.saving || h.hasFeature(Handler::Version::NO_RAW_POINTERS_IN_SERIALIZER))
    {
        h & artifactID;
    }
    else
    {
        std::shared_ptr<CArtifactInstance> pointer;
        h & pointer;
        if (pointer->getId() == ArtifactInstanceID())
            CArtifactInstance::saveCompatibilityFixArtifactID(pointer);
        artifactID = pointer->getId();
    }
    h & slot;
}
```

## 功能说明

CArtifactInstance类是VCMI系统中表示具体神器实例的核心类，它不仅包含了神器实例的基本属性（如ID、类型等），还集成了多种特殊功能，使其能够表示不同类型的神器实例：

1. **组合神器实例**（CCombinedArtifactInstance）：支持由多个部件组成的复合神器实例
2. **滚动神器实例**（CScrollArtifactInstance）：可以包含法术卷轴的神器实例
3. **成长神器实例**（CGrowingArtifactInstance）：随等级提升而增强的神器实例
4. **充能神器实例**（CChargedArtifactInstance）：具有充能机制的神器实例

## 重要方法

### 基本属性访问
- `getId()`：获取实例ID
- `getTypeId()`：获取类型ID
- `getType()`：获取神器类型
- `setId()`：设置实例ID

### 特殊功能
- `isCombined()`：检查是否为组合神器实例
- `isScroll()`：检查是否为滚动神器实例
- `getScrollSpellID()`：获取滚动法术ID
- `growingUp()`：成长操作
- `discharge()`：放电操作
- `addCharges()`：添加充能
- `getCharges()`：获取充能

### 组合神器功能
- `addPart()`：添加部件
- `isPart()`：检查是否为部件
- `getPartsInfo()`：获取部件信息
- `hasParts()`：检查是否有部件

### 槽位管理
- `canBePutAt()`：检查神器是否可以放在指定位置

### 系统集成
- `attachToBonusSystem()`：附加到奖励系统

## 设计说明

CArtifactInstance类采用了多重继承的设计模式，将不同类型神器实例的特有功能封装在单独的基类中。这种设计使得单一类可以同时具备多种特性，同时也保持了各功能模块的独立性。

该类继承自CBonusSystemNode，使其能够参与奖励系统。通过CCombinedArtifactInstance，它可以作为组合神器的容器；通过CScrollArtifactInstance，它可以作为法术卷轴的载体；通过CGrowingArtifactInstance，它具有成长能力；通过CChargedArtifactInstance，它具有充能机制。

CArtifactInstance类还集成了序列化功能，支持保存和加载，这对于游戏状态的持久化至关重要。