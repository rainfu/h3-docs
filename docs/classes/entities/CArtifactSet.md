# CArtifactSet类

CArtifactSet类是VCMI中神器集合类，用于管理英雄或其他载体所拥有的神器集合，包括穿戴的神器和背包中的神器。

## 类定义

```cpp
class DLL_LINKAGE CArtifactSet : public virtual Serializeable
{
public:
    using ArtPlacementMap = std::map<const CArtifactInstance*, ArtifactPosition>;

    std::vector<ArtSlotInfo> artifactsInBackpack; // 英雄背包中的神器
    std::map<ArtifactPosition, ArtSlotInfo> artifactsWorn; // 穿戴的神器 <位置,神器ID>; 位置: 0 - 头部; 1 - 肩膀; 2 - 颈部; 3 - 右手; 4 - 左手; 5 - 躯干; 6 - 右戒指; 7 - 左戒指; 8 - 脚; 9 - 杂项1; 10 - 杂项2; 11 - 杂项3; 12 - 杂项4; 13 - 机械1; 14 - 机械2; 15 - 机械3; 16 - 机械4; 17 - 法术书; 18 - 杂项5
    ArtSlotInfo artifactsTransitionPos; // 用于拖放神器交换的过渡位置

    const ArtSlotInfo * getSlot(const ArtifactPosition & pos) const;
    void lockSlot(const ArtifactPosition & pos);
    const CArtifactInstance * getArt(const ArtifactPosition & pos, bool excludeLocked = true) const;
    ArtifactInstanceID getArtID(const ArtifactPosition & pos, bool excludeLocked = true) const;
    /// 查找第一个具有给定ID的神器
    ArtifactPosition getArtPos(const ArtifactID & aid, bool onlyWorn = true, bool allowLocked = true) const;
    ArtifactPosition getScrollPos(const SpellID & aid, bool onlyWorn = true) const;
    ArtifactPosition getArtPos(const CArtifactInstance * art) const;
    const CArtifactInstance * getArtByInstanceId(const ArtifactInstanceID & artInstId) const;
    bool hasArt(const ArtifactID & aid, bool onlyWorn = false, bool searchCombinedParts = false) const;
    bool hasScroll(const SpellID & aid, bool onlyWorn = false) const;
    bool isPositionFree(const ArtifactPosition & pos, bool onlyLockCheck = false) const;

    virtual IGameInfoCallback * getCallback() const = 0;
    virtual ArtBearer bearerType() const = 0;
    virtual ArtPlacementMap putArtifact(const ArtifactPosition & slot, const CArtifactInstance * art);
    virtual void removeArtifact(const ArtifactPosition & slot);
    CArtifactSet(IGameInfoCallback * cb);
    virtual ~CArtifactSet() = default;

    template <typename Handler> void serialize(Handler &h)
    {
        h & artifactsInBackpack;
        h & artifactsWorn;
    }

    void artDeserializationFix(CGameState & gs, CBonusSystemNode *node);

    void serializeJsonArtifacts(JsonSerializeFormat & handler, const std::string & fieldName, CMap * map);
    const CArtifactInstance * getCombinedArtWithPart(const ArtifactID & partId) const;

private:
    void serializeJsonHero(JsonSerializeFormat & handler, CMap * map);
    void serializeJsonCreature(JsonSerializeFormat & handler);
    void serializeJsonCommander(JsonSerializeFormat & handler);

    void serializeJsonSlot(JsonSerializeFormat & handler, const ArtifactPosition & slot, CMap * map);//普通槽位
};
```

## 功能说明

CArtifactSet是VCMI神器系统中管理神器集合的基类，用于管理英雄或其他载体所拥有的神器集合。它分为两部分：穿戴的神器(artifactsWorn)和背包中的神器(artifactsInBackpack)。该类提供了添加、移除、查找神器的方法，并处理神器的位置锁定和解锁。

## 依赖关系

- [Serializeable](../serializer/Serializeable.md): 可序列化接口
- [CArtifactInstance](./CArtifactInstance.md): 神器实例
- [ArtSlotInfo](./ArtSlotInfo.md): 神器槽位信息
- [ArtifactPosition](./ArtifactPosition.md): 神器位置
- [ArtifactID](./ArtifactID.md): 神器ID
- [SpellID](../spells/SpellID.md): 法术ID
- [ArtifactInstanceID](./ArtifactInstanceID.md): 神器实例ID
- [ArtBearer](./ArtBearer.md): 神器载体
- [IGameInfoCallback](../gameState/IGameInfoCallback.md): 游戏信息回调接口
- [CGameState](../gameState/CGameState.md): 游戏状态
- [CBonusSystemNode](../bonuses/CBonusSystemNode.md): 奖励系统节点
- [JsonSerializeFormat](../json/JsonSerializeFormat.md): JSON序列化格式
- [CMap](../map/CMap.md): 地图
- STL库: vector, map等

## 函数注释

- `CArtifactSet(cb)`: 构造函数，使用游戏回调创建神器集合
- `getSlot(pos)`: 获取指定位置的槽位信息
- `lockSlot(pos)`: 锁定指定位置的槽位
- `getArt(pos, excludeLocked)`: 获取指定位置的神器
- `getArtID(pos, excludeLocked)`: 获取指定位置的神器ID
- `getArtPos(aid, onlyWorn, allowLocked)`: 获取指定ID的神器位置
- `getScrollPos(aid, onlyWorn)`: 获取指定法术ID的卷轴位置
- `getArtPos(art)`: 获取指定神器实例的位置
- `getArtByInstanceId(artInstId)`: 通过实例ID获取神器
- `hasArt(aid, onlyWorn, searchCombinedParts)`: 检查是否拥有指定ID的神器
- `hasScroll(aid, onlyWorn)`: 检查是否拥有指定法术ID的卷轴
- `isPositionFree(pos, onlyLockCheck)`: 检查位置是否空闲
- `getCallback()`: 获取游戏回调（纯虚函数）
- `bearerType()`: 获取载体类型（纯虚函数）
- `putArtifact(slot, art)`: 在指定槽位放置神器
- `removeArtifact(slot)`: 移除指定槽位的神器
- `artDeserializationFix(gs, node)`: 神器反序列化修复
- `serializeJsonArtifacts(handler, fieldName, map)`: 序列化JSON格式的神器
- `getCombinedArtWithPart(partId)`: 获取包含指定部分的组合神器