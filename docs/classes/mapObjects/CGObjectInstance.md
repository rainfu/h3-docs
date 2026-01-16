# CGObjectInstance类

CGObjectInstance类是VCMI地图对象系统的基类，代表地图上的所有对象实例。

## 类定义

```cpp
class DLL_LINKAGE CGObjectInstance : public IObjectInterface
{
public:
    MapObjectID ID;                           // 对象类型ID
    MapObjectSubID subID;                     // 对象子类型ID
    PlayerColor tempOwner;                    // 临时拥有者
    ObjectInstanceID id;                      // 对象实例ID
    std::shared_ptr<const ObjectTemplate> appearance; // 对象外观模板
    int3 pos;                                // 对象在地图上的位置
    std::string instanceName;                 // 实例名称

    CGObjectInstance(IGameInfoCallback *cb);
    ~CGObjectInstance() override;

    MapObjectID getObjGroupIndex() const override;
    MapObjectSubID getObjTypeIndex() const override;
    std::string getTypeName() const;
    std::string getSubtypeName() const;
    int3 getSightCenter() const;
    int getWidth() const;
    int getHeight() const;
    int3 visitablePos() const override;
    int3 anchorPos() const override;
    int3 getTopVisiblePos() const;
    bool visitableAt(const int3 & pos) const;
    bool blockingAt(const int3 & pos) const;
    bool coveringAt(const int3 & pos) const;
    std::set<int3> getBlockedPos() const;
    const std::set<int3> & getBlockedOffsets() const;
    bool isVisitable() const;
    bool isBlockedVisitable() const;
    bool isRemovable() const;
    bool isCoastVisitable() const;
    BattleField getBattlefield() const;
    bool isTile2Terrain() const;

    PlayerColor getOwner() const override;
    void setOwner(const PlayerColor & ow);
    void setAnchorPos(int3 pos);

    std::optional<AudioPath> getAmbientSound(vstd::RNG & rng) const;
    std::optional<AudioPath> getVisitSound(vstd::RNG & rng) const;
    std::optional<AudioPath> getRemovalSound(vstd::RNG & rng) const;

    TObjectTypeHandler getObjectHandler() const;

    bool passableFor(PlayerColor color) const;
    int getSightRadius() const;
    int3 getVisitableOffset() const;
    std::string getObjectName() const;
    std::string getHoverText(PlayerColor player) const;
    std::string getHoverText(const CGHeroInstance * hero) const;
    std::string getPopupText(PlayerColor player) const;
    std::string getPopupText(const CGHeroInstance * hero) const;
    std::vector<Component> getPopupComponents(PlayerColor player) const;
    std::vector<Component> getPopupComponents(const CGHeroInstance * hero) const;

    const IOwnableObject * asOwnable() const override;

    void initObj(IGameRandomizer & gameRandomizer) override;
    void pickRandomObject(IGameRandomizer & gameRandomizer) override;
    void onHeroVisit(IGameEventCallback & gameEvents, const CGHeroInstance * h) const override;
    void setProperty(ObjProperty what, ObjPropertyID identifier) final;

    virtual void afterAddToMap(CMap * map);
    virtual void afterRemoveFromMap(CMap * map);
    virtual void attachToBonusSystem(CGameState & gs);
    virtual void detachFromBonusSystem(CGameState & gs);
    virtual void restoreBonusSystem(CGameState & gs);

    template <typename Handler> void serialize(Handler &h);
    void serializeJson(JsonSerializeFormat & handler);
    virtual void updateFrom(const JsonNode & data);

protected:
    virtual void setPropertyDer(ObjProperty what, ObjPropertyID identifier);
    void setType(MapObjectID ID, MapObjectSubID subID);
    void giveDummyBonus(IGameEventCallback & gameEvents, const ObjectInstanceID & heroID, BonusDuration::Type duration = BonusDuration::ONE_DAY) const;
    virtual void serializeJsonOptions(JsonSerializeFormat & handler);
    void serializeJsonOwner(JsonSerializeFormat & handler);
};
```

## 功能说明

CGObjectInstance是VCMI中所有地图对象的基类，它代表了游戏地图上的任何对象（如英雄、城镇、资源、怪物等）。这个类提供了地图对象的基本属性和行为，包括位置、外观、所有权、访问性等。它还实现了IObjectInterface接口，提供了与游戏事件交互的方法。

## 依赖关系

- [IObjectInterface](./IObjectInterface.md): 对象接口
- [ObjectTemplate](./ObjectTemplate.md): 对象外观模板
- [IGameInfoCallback](../callback/IGameInfoCallback.md): 游戏信息回调
- [IGameEventCallback](../events/IGameEventCallback.md): 游戏事件回调
- [CGameState](../gameState/CGameState.md): 游戏状态
- [CMap](../map/CMap.md): 游戏地图
- [CGHeroInstance](../entities/CHero.md): 英雄实例
- [Component](../ui/Component.md): 组件
- [AudioPath](../filesystem/ResourcePath.md): 音频路径
- [JsonSerializeFormat](../json/JsonSerializeFormat.md): JSON序列化格式

## 函数注释

- `CGObjectInstance(cb)`: 构造函数，创建地图对象实例
- `getObjGroupIndex()`: 获取对象组索引
- `getObjTypeIndex()`: 获取对象类型索引
- `getTypeName()`: 获取对象类型名称
- `getSubtypeName()`: 获取对象子类型名称
- `getSightCenter()`: 获取视野中心点
- `getWidth()`, `getHeight()`: 获取对象图形的宽度和高度（以瓦片为单位）
- `visitablePos()`: 获取可访问位置
- `anchorPos()`: 获取锚点位置
- `isVisitable()`: 检查对象是否可访问
- `getOwner()`: 获取对象拥有者
- `setOwner(ow)`: 设置对象拥有者
- `onHeroVisit(gameEvents, h)`: 英雄访问时的回调
- `getHoverText(player)`, `getHoverText(hero)`: 获取悬停文本
- `getPopupText(player)`, `getPopupText(hero)`: 获取弹出文本
- `getSightRadius()`: 获取视野半径
- `getObjectName()`: 获取对象名称
- `passableFor(color)`: 检查对象对特定玩家是否可通行
- `isRemovable()`: 检查对象是否可移除
- `getBlockedPos()`: 获取被对象阻挡的位置
- `afterAddToMap(map)`: 添加到地图后的回调
- `afterRemoveFromMap(map)`: 从地图移除后的回调
- `attachToBonusSystem(gs)`: 附加到奖励系统
- `detachFromBonusSystem(gs)`: 从奖励系统分离
- `serialize(h)`: 二进制序列化
- `serializeJson(handler)`: JSON序列化