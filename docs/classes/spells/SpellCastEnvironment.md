# SpellCastEnvironment类

SpellCastEnvironment类是VCMI中法术施放环境的实现类，为法术施放提供服务器回调和环境信息。

## 类定义

```cpp
///回调由服务器提供
class DLL_LINKAGE SpellCastEnvironment : public ServerCallback
{
public:
    virtual ~SpellCastEnvironment() = default;

    virtual const CMap * getMap() const = 0;
    virtual const IGameInfoCallback * getCb() const = 0;

    virtual void createBoat(const int3 & visitablePosition, BoatId type, PlayerColor initiator) = 0;
    virtual bool moveHero(ObjectInstanceID hid, int3 dst, EMovementMode mode) = 0;	//TODO: remove

    virtual void genericQuery(Query * request, PlayerColor color, std::function<void(std::optional<int32_t>)> callback) = 0;//TODO: type safety on query, use generic query packet when implemented
};
```

## 功能说明

SpellCastEnvironment是VCMI法术系统中法术施放环境的实现类，继承自ServerCallback接口。它为冒险法术的施放提供必要的环境信息和服务器交互功能。这个类允许法术在施放时与游戏世界进行交互，如创建船只、移动英雄等。它作为法术施放时与服务器通信的桥梁，确保法术效果能正确地应用到游戏状态。

## 依赖关系

- [ServerCallback](../network/ServerCallback.md): 服务器回调接口
- [CMap](../map/CMap.md): 地图类
- [IGameInfoCallback](../gameState/IGameInfoCallback.md): 游戏信息回调接口
- [int3](../math/int3.md): 三维坐标
- [BoatId](../objects/BoatId.md): 船只ID
- [PlayerColor](../players/PlayerColor.md): 玩家颜色
- [ObjectInstanceID](../objects/ObjectInstanceID.md): 对象实例ID
- [EMovementMode](../movement/EMovementMode.md): 移动模式枚举
- [Query](../queries/Query.md): 查询类
- STL库: functional, optional等

## 函数注释

- `~SpellCastEnvironment()`: 虚析构函数，确保派生类正确析构
- `getMap()`: 获取当前地图的指针
- `getCb()`: 获取游戏信息回调接口的指针
- `createBoat(visitablePosition, type, initiator)`: 在指定位置创建船只
- `moveHero(hid, dst, mode)`: 移动指定英雄到目标位置
- `genericQuery(request, color, callback)`: 发起通用查询请求，异步获取结果