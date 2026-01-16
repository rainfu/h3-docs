# CNonConstInfoCallback类

CNonConstInfoCallback类是VCMI系统中的非恒定信息回调类，扩展了CGameInfoCallback的功能。它提供对游戏状态的非恒定（可修改）访问，允许修改游戏实体的状态。

## 类定义

```cpp
class JsonNode;

class DLL_LINKAGE CNonConstInfoCallback : public CGameInfoCallback
{
public:
    // 保持回调的恒定版本可访问
    using CGameInfoCallback::getPlayerState;
    using CGameInfoCallback::getTeam;
    using CGameInfoCallback::getPlayerTeam;
    using CGameInfoCallback::getHero;
    using CGameInfoCallback::getTown;
    using CGameInfoCallback::getTile;
    using CGameInfoCallback::getArtInstance;
    using CGameInfoCallback::getObjInstance;
    using CGameInfoCallback::getArtSet;

    PlayerState * getPlayerState(const PlayerColor & color, bool verbose = true);           // 获取玩家状态指针
    TeamState * getTeam(const TeamID & teamID);                                          // 根据团队ID获取团队
    TeamState * getPlayerTeam(const PlayerColor & color);                                // 根据玩家颜色获取团队
    CGHeroInstance * getHero(const ObjectInstanceID & objid);                            // 获取英雄实例
    CGTownInstance * getTown(const ObjectInstanceID & objid);                            // 获取城镇实例
    TerrainTile * getTile(const int3 & pos);                                            // 获取地形瓦片
    CArtifactInstance * getArtInstance(const ArtifactInstanceID & aid);                  // 获取神器实例
    CGObjectInstance * getObjInstance(const ObjectInstanceID & oid);                     // 获取对象实例
    CArmedInstance * getArmyInstance(const ObjectInstanceID & oid);                      // 获取军队实例
    CArtifactSet * getArtSet(const ArtifactLocation & loc);                             // 获取神器集合

    virtual void updateEntity(Metatype metatype, int32_t index, const JsonNode & data) = 0; // 更新实体
};
```

## 功能说明

CNonConstInfoCallback类是CGameInfoCallback的扩展，提供对游戏实体的非恒定（可修改）访问。与基类的恒定访问不同，此类返回的是指向可修改对象的指针，允许修改游戏状态。

该类的主要作用是提供对游戏状态的修改能力，同时保留对原有恒定访问方法的访问权限。

## 继承关系

- 继承自CGameInfoCallback，扩展了其功能
- 使用`using`声明保留了基类的恒定版本方法

## 重要方法

### 状态获取方法（非恒定）
- `getPlayerState(color, verbose)`: 获取玩家状态的非恒定指针
- `getTeam(teamID)`: 根据团队ID获取团队的非恒定指针
- `getPlayerTeam(color)`: 根据玩家颜色获取团队的非恒定指针
- `getHero(objid)`: 获取英雄实例的非恒定指针
- `getTown(objid)`: 获取城镇实例的非恒定指针
- `getTile(pos)`: 获取地形瓦片的非恒定指针
- `getArtInstance(aid)`: 获取神器实例的非恒定指针
- `getObjInstance(oid)`: 获取对象实例的非恒定指针
- `getArmyInstance(oid)`: 获取军队实例的非恒定指针
- `getArtSet(loc)`: 获取神器集合的非恒定指针

### 实体更新
- `updateEntity(metatype, index, data)`: 纯虚函数，用于更新实体，需要派生类实现

## 设计说明

CNonConstInfoCallback类的设计体现了以下特点：

1. **双重访问**: 既保留了基类的恒定访问方法，又提供了非恒定访问方法
2. **类型安全**: 所有方法都返回特定类型的指针，确保类型安全
3. **职责分离**: 专门用于需要修改游戏状态的场景
4. **扩展性**: 通过纯虚函数updateEntity允许派生类实现特定的实体更新逻辑

这类主要用于需要修改游戏状态的场景，例如AI决策、游戏事件处理等，与只读的CGameInfoCallback形成对比，提供了完整的读写访问能力。