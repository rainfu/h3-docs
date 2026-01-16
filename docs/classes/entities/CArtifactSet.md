# CArtifactSet类

CArtifactSet类是VCMI系统中的神器集合类，用于管理携带神器的对象（如英雄、生物、指挥官）的神器装备和背包。它提供了对穿戴位置和背包中神器的统一管理接口。

## 类定义

```cpp
class CArtifactInstance;
class CMap;

class DLL_LINKAGE CArtifactSet : public virtual Serializeable
{
public:
    using ArtPlacementMap = std::map<const CArtifactInstance*, ArtifactPosition>; // 神器放置映射

    std::vector<ArtSlotInfo> artifactsInBackpack; // 英雄背包中的神器
    std::map<ArtifactPosition, ArtSlotInfo> artifactsWorn; // 已穿戴的神器映射<位置,神器信息>
    // 位置定义：0 - 头部；1 - 肩膀；2 - 颈部；3 - 右手；4 - 左手；5 - 胸甲；
    // 6 - 右戒指；7 - 左戒指；8 - 脚；9 - 杂项1；10 - 杂项2；11 - 杂项3；12 - 杂项4；
    // 13 - 机器1；14 - 机器2；15 - 机器3；16 - 机器4；17 - 法术书；18 - 杂项5
    ArtSlotInfo artifactsTransitionPos; // 用于拖拽交换神器的过渡位置

    const ArtSlotInfo * getSlot(const ArtifactPosition & pos) const;      // 获取指定位置的槽位信息
    void lockSlot(const ArtifactPosition & pos);                          // 锁定指定槽位
    const CArtifactInstance * getArt(const ArtifactPosition & pos, bool excludeLocked = true) const; // 获取指定位置的神器
    ArtifactInstanceID getArtID(const ArtifactPosition & pos, bool excludeLocked = true) const;      // 获取指定位置的神器ID
    /// 查找第一个具有给定ID的神器
    ArtifactPosition getArtPos(const ArtifactID & aid, bool onlyWorn = true, bool allowLocked = true) const; // 获取神器位置
    ArtifactPosition getScrollPos(const SpellID & aid, bool onlyWorn = true) const; // 获取卷轴位置
    ArtifactPosition getArtPos(const CArtifactInstance * art) const;                // 获取神器实例位置
    const CArtifactInstance * getArtByInstanceId(const ArtifactInstanceID & artInstId) const; // 通过实例ID获取神器
    bool hasArt(const ArtifactID & aid, bool onlyWorn = false, bool searchCombinedParts = false) const; // 检查是否拥有神器
    bool hasScroll(const SpellID & aid, bool onlyWorn = false) const;               // 检查是否拥有卷轴
    bool isPositionFree(const ArtifactPosition & pos, bool onlyLockCheck = false) const; // 检查位置是否空闲

    virtual IGameInfoCallback * getCallback() const = 0;                   // 获取回调接口
    virtual ArtBearer bearerType() const = 0;                             // 获取携带者类型
    virtual ArtPlacementMap putArtifact(const ArtifactPosition & slot, const CArtifactInstance * art); // 放置神器
    virtual void removeArtifact(const ArtifactPosition & slot);            // 移除神器
    CArtifactSet(IGameInfoCallback * cb);                                 // 构造函数
    virtual ~CArtifactSet() = default;                                    // 析构函数

    template <typename Handler> void serialize(Handler &h)                 // 序列化
    {
        h & artifactsInBackpack;
        h & artifactsWorn;
    }

    void artDeserializationFix(CGameState & gs, CBonusSystemNode *node);   // 神器反序列化修复

    void serializeJsonArtifacts(JsonSerializeFormat & handler, const std::string & fieldName, CMap * map); // JSON序列化神器
    const CArtifactInstance * getCombinedArtWithPart(const ArtifactID & partId) const; // 获取包含指定部件的组合神器

private:
    void serializeJsonHero(JsonSerializeFormat & handler, CMap * map);      // JSON序列化英雄神器
    void serializeJsonCreature(JsonSerializeFormat & handler);              // JSON序列化生物神器
    void serializeJsonCommander(JsonSerializeFormat & handler);             // JSON序列化指挥官神器
    void serializeJsonSlot(JsonSerializeFormat & handler, const ArtifactPosition & slot, CMap * map); // JSON序列化槽位
};
```

## 功能说明

CArtifactSet类是VCMI系统中管理神器装备的核心类，它提供了一个统一的接口来管理穿戴的神器和背包中的神器。该类支持英雄、生物和指挥官等不同类型的携带者。

该类维护两个主要的数据结构：
1. `artifactsWorn`：存储已穿戴在固定位置的神器
2. `artifactsInBackpack`：存储背包中的神器

## 重要方法

### 神器获取
- `getArt()`：获取指定位置的神器实例
- `getArtID()`：获取指定位置的神器ID
- `getArtByInstanceId()`：通过实例ID获取神器
- `getSlot()`：获取指定位置的槽位信息

### 位置查询
- `getArtPos()`：获取指定神器ID的位置
- `getScrollPos()`：获取指定法术卷轴的位置
- `getArtPos()`：获取神器实例的位置

### 存在性检查
- `hasArt()`：检查是否拥有指定ID的神器
- `hasScroll()`：检查是否拥有指定法术的卷轴
- `isPositionFree()`：检查指定位置是否空闲

### 神器操作
- `putArtifact()`：在指定位置放置神器
- `removeArtifact()`：移除指定位置的神器
- `lockSlot()`：锁定指定槽位

### 特殊功能
- `getCombinedArtWithPart()`：获取包含指定部件的组合神器
- `artDeserializationFix()`：反序列化后修复神器数据

## 设计说明

CArtifactSet类是一个抽象基类，定义了管理神器的标准接口，由CHero、CCreature、CCommander等具体类继承实现。

该类设计考虑了不同类型携带者的需要，通过`bearerType()`虚函数区分携带者类型，并提供相应的处理逻辑。它支持复杂的神器系统，包括组合神器、卷轴、锁定槽位等功能。

CArtifactSet还实现了序列化功能，支持游戏状态的保存和加载，这是游戏持久化的重要组成部分。