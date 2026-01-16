# Player接口

Player接口是VCMI中游戏参与者的抽象接口，继承自EntityWithBonuses。

## 类定义

```cpp
class DLL_LINKAGE Player : public EntityWithBonuses<PlayerColor>
{
public:
    virtual TeamID getTeam() const = 0;
    virtual bool isHuman() const = 0;
    virtual int getResourceAmount(int type) const = 0;
};
```

## 功能说明

Player是VCMI游戏中玩家（参与者）系统的基接口，用于表示游戏中的玩家。它提供了访问玩家基本属性的方法，如所属队伍、是否为人类玩家、资源数量等。该接口继承自EntityWithBonuses，因此玩家也可以拥有奖励效果。

## 依赖关系

- [EntityWithBonuses](../entities/EntityWithBonuses.md): 带奖励的实体基类
- [PlayerColor](../identifiers/PlayerColor.md): 玩家颜色ID类型
- [TeamID](../identifiers/TeamID.md): 队伍ID类型
- [IBonusBearer](../bonuses/IBonusBearer.md): 奖励承载者接口

## 函数注释

- `getTeam()`: 获取玩家所属的队伍ID
- `isHuman()`: 判断玩家是否为人类玩家（而非AI）
- `getResourceAmount(type)`: 获取指定类型资源的数量