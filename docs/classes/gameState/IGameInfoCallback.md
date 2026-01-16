# IGameInfoCallback接口

IGameInfoCallback接口是VCMI中游戏信息回调的抽象接口，用于查询游戏状态和信息。

## 类定义

```cpp
class IGameInfoCallback
{
public:
    virtual ~IGameInfoCallback() = default;

    /// 获取游戏状态的常量引用
    virtual const CGameState & getGameState() const = 0;

    /// 获取指定玩家的信息
    virtual PlayerState getPlayerState(PlayerColor color, bool localCheck = false) const = 0;

    /// 获取指定生物的信息
    virtual const CCreature & creatureFromId(CreatureID id) const = 0;

    /// 获取指定英雄类型的信息
    virtual const CHeroClass & getHeroClass(HeroClassID id) const = 0;

    /// 获取指定地形的信息
    virtual const Terrain & terrainType(TerrainId id) const = 0;

    /// 获取指定派系的信息
    virtual const CFaction & getFaction(FactionID id) const = 0;

    /// 获取指定技能的信息
    virtual const CSkill & skillFromId(SkillID id) const = 0;

    /// 获取指定法术的信息
    virtual const Spell & spellFromId(SpellID id) const = 0;

    /// 获取指定城镇的信息
    virtual const CTown & getTown(TownID id) const = 0;

    /// 获取指定神器的信息
    virtual const CArtifact & artifactFromId(ArtifactID id) const = 0;

    /// 获取指定英雄的信息
    virtual const CGHeroInstance & getHero(HeroTypeID id) const = 0;

    /// 获取指定对象的信息
    virtual const CGObjectInstance & getObj(ObjectInstanceID id) const = 0;

    /// 检查玩家是否能看到指定位置
    virtual boolisVisible(const int3 & pos, PlayerColor player) const = 0;

    /// 检查玩家是否能看到指定对象
    virtual bool isVisible(const CGObjectInstance * obj, PlayerColor player) const = 0;

    /// 检查玩家是否能知道指定对象的详细信息
    virtual bool knowsDetailedInfo(const CGObjectInstance * obj, PlayerColor player) const = 0;

    /// 获取指定玩家可以看到的视野范围
    virtual std::shared_ptr<const CVisibleArea> getGlobalVisibilityMap(PlayerColor player) const = 0;

    /// 获取指定玩家的AI状态
    virtual std::shared_ptr<CBonusSystemNode> getAiState(PlayerColor color) const = 0;

    /// 获取当前轮次
    virtual int32_t getCurrentRound() const = 0;

    /// 获取当前玩家
    virtual PlayerColor getCurrentPlayer() const = 0;

    /// 获取当前英雄
    virtual const CGHeroInstance * getCurrentHero() const = 0;

    /// 获取当前城镇
    virtual const CGTownInstance * getCurrentTown() const = 0;
};
```

## 功能说明

IGameInfoCallback是VCMI中游戏信息查询的基础接口，提供对游戏状态、玩家信息、游戏对象等的访问。这个接口允许各个系统查询游戏中的各种信息，如生物、英雄、法术、神器等，同时考虑了视野和权限限制。

## 依赖关系

- [CGameState](./CGameState.md): 游戏状态类
- [PlayerState](./PlayerState.md): 玩家状态类
- [CCreature](../entities/CCreature.md): 生物类
- [CHeroClass](../entities/CHeroClass.md): 英雄职业类
- [Terrain](../entities/Terrain.md): 地形类
- [CFaction](../entities/CFaction.md): 派系类
- [CSkill](../entities/CSkill.md): 技能类
- [Spell](../spells/Spell.md): 法术类
- [CTown](../entities/CTown.md): 城镇类
- [CArtifact](../entities/CArtifact.md): 神器类
- [CGHeroInstance](../entities/CGHeroInstance.md): 英雄实例类
- [CGObjectInstance](../mapObjects/CGObjectInstance.md): 游戏对象实例类
- [CVisibleArea](../visibility/CVisibleArea.md): 可见区域类
- STL库: shared_ptr等

## 函数注释

- `getGameState()`: 获取当前游戏状态
- `getPlayerState(color, localCheck)`: 获取指定玩家的状态
- `creatureFromId(id)`: 根据ID获取生物信息
- `getHeroClass(id)`: 根据ID获取英雄职业信息
- `terrainType(id)`: 根据ID获取地形信息
- `getFaction(id)`: 根据ID获取派系信息
- `skillFromId(id)`: 根据ID获取技能信息
- `spellFromId(id)`: 根据ID获取法术信息
- `getTown(id)`: 根据ID获取城镇信息
- `artifactFromId(id)`: 根据ID获取神器信息
- `getHero(id)`: 根据ID获取英雄信息
- `getObj(id)`: 根据ID获取游戏对象
- `isVisible(pos, player)`: 检查位置对玩家是否可见
- `isVisible(obj, player)`: 检查对象对玩家是否可见
- `knowsDetailedInfo(obj, player)`: 检查玩家是否知道对象的详细信息
- `getGlobalVisibilityMap(player)`: 获取玩家的全局可见性地图
- `getAiState(color)`: 获取指定玩家的AI状态
- `getCurrentRound()`: 获取当前游戏轮次
- `getCurrentPlayer()`: 获取当前玩家
- `getCurrentHero()`: 获取当前英雄
- `getCurrentTown()`: 获取当前城镇