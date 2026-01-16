# CArtifactInstance类

CArtifactInstance类是VCMI中神器实例类，代表游戏中实际存在的神器实例，可以装备在英雄或其他单位上。

## 类定义

```cpp
class DLL_LINKAGE CCombinedArtifactInstance : public GameCallbackHolder
{
protected:
    using GameCallbackHolder::GameCallbackHolder;

public:
    using ArtPlacementMap = std::map<const CArtifactInstance *, ArtifactPosition>;

    struct PartInfo
    {
    private:
        const CArtifactInstance * artifactPtr = nullptr;
        ArtifactInstanceID artifactID;
    public:

        PartInfo() = default;
        PartInfo(const CArtifactInstance * artifact, ArtifactPosition slot);

        ArtifactPosition slot;

        const CArtifactInstance * getArtifact() const;
        ArtifactInstanceID getArtifactID() const;

        template <typename Handler>
        void serialize(Handler & h);
    };
    void addPart(const CArtifactInstance * art, const ArtifactPosition & slot);
    // 检查假定的部分实例是否是这个组合神器实例的一部分
    bool isPart(const CArtifactInstance * supposedPart) const;
    bool hasParts() const;
    const std::vector<PartInfo> & getPartsInfo() const;
    void addPlacementMap(const ArtPlacementMap & placementMap);

    template <typename Handler> void serialize(Handler & h)
    {
        h & partsInfo;
    }
protected:
    std::vector<PartInfo> partsInfo;
};

class DLL_LINKAGE CScrollArtifactInstance
{
protected:
    CScrollArtifactInstance() = default;
public:
    SpellID getScrollSpellID() const;
};

class DLL_LINKAGE CGrowingArtifactInstance
{
protected:
    CGrowingArtifactInstance() = default;
public:
    void growingUp();
};

class DLL_LINKAGE CChargedArtifactInstance
{
protected:
    CChargedArtifactInstance() = default;
public:
    void discharge(const uint16_t charges);
    void addCharges(const uint16_t charges);
    uint16_t getCharges() const;
};

class DLL_LINKAGE CArtifactInstance final
    : public CBonusSystemNode, public CCombinedArtifactInstance, public CScrollArtifactInstance, public CGrowingArtifactInstance, public CChargedArtifactInstance
{
    ArtifactInstanceID id;
    ArtifactID artTypeID;

    void init();

public:
    CArtifactInstance(IGameInfoCallback *cb, const CArtifact * art);
    CArtifactInstance(IGameInfoCallback *cb);
    std::string nodeName() const override;
    ArtifactID getTypeId() const;
    const CArtifact * getType() const;
    ArtifactInstanceID getId() const;
    void setId(ArtifactInstanceID id);

    static void saveCompatibilityFixArtifactID(std::shared_ptr<CArtifactInstance> self);

    bool canBePutAt(const CArtifactSet * artSet, ArtifactPosition slot = ArtifactPosition::FIRST_AVAILABLE,
        bool assumeDestRemoved = false) const;
    bool isCombined() const;
    bool isScroll() const;
    
    void attachToBonusSystem(CGameState & gs);

    template <typename Handler> void serialize(Handler & h)
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
void CCombinedArtifactInstance::PartInfo::serialize(Handler & h)
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

CArtifactInstance是VCMI神器系统中代表实际存在的神器实例的类，与CArtifact（定义神器类型）相对应。它可以是普通神器、组合神器、卷轴、成长型神器或充能型神器的实例。该类继承自CBonusSystemNode，因此可以参与奖励系统的计算，并实现与奖励系统的交互。

## 依赖关系

- [CBonusSystemNode](../bonuses/CBonusSystemNode.md): 奖励系统节点
- [CGameState](../gameState/CGameState.md): 游戏状态
- [CArtifactSet](./CArtifactSet.md): 神器集合
- [CArtifact](./CArtifact.md): 神器类
- [ArtifactID](./ArtifactID.md): 神器ID
- [ArtifactInstanceID](./ArtifactInstanceID.md): 神器实例ID
- [ArtifactPosition](./ArtifactPosition.md): 神器位置
- [SpellID](../spells/SpellID.md): 法术ID
- [IGameInfoCallback](../gameState/IGameInfoCallback.md): 游戏信息回调接口
- [GameCallbackHolder](./GameCallbackHolder.md): 游戏回调持有者
- STL库: vector, map等

## 函数注释

### CCombinedArtifactInstance类

- `addPart(art, slot)`: 添加部分到组合神器
- `isPart(supposedPart)`: 检查指定实例是否为此组合神器的一部分
- `hasParts()`: 检查是否包含部分
- `getPartsInfo()`: 获取部件信息列表
- `addPlacementMap(placementMap)`: 添加放置映射

#### PartInfo结构

- `PartInfo(artifact, slot)`: 构造函数
- `getArtifact()`: 获取神器指针
- `getArtifactID()`: 获取神器ID

### CScrollArtifactInstance类

- `getScrollSpellID()`: 获取卷轴法术ID

### CGrowingArtifactInstance类

- `growingUp()`: 成长升级

### CChargedArtifactInstance类

- `discharge(charges)`: 消耗指定充能
- `addCharges(charges)`: 增加充能
- `getCharges()`: 获取当前充能

### CArtifactInstance类

- `CArtifactInstance(cb, art)`: 构造函数，使用回调和原型创建实例
- `CArtifactInstance(cb)`: 构造函数，仅使用回调创建实例
- `getTypeId()`: 获取类型ID
- `getType()`: 获取神器类型
- `getId()`: 获取实例ID
- `setId(id)`: 设置实例ID
- `canBePutAt(artSet, slot, assumeDestRemoved)`: 检查是否可以放置在指定位置
- `isCombined()`: 检查是否为组合神器
- `isScroll()`: 检查是否为卷轴
- `attachToBonusSystem(gs)`: 附加到奖励系统
- `nodeName()`: 获取节点名称