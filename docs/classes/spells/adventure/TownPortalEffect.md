# TownPortalEffect类

TownPortalEffect类是VCMI中城镇传送门法术效果的实现类，用于处理城镇传送门法术在冒险地图上的具体效果。

## 类定义

```cpp
class CGTownInstance;

class DLL_LINKAGE TownPortalEffect final : public IAdventureSpellEffect
{
    const CSpell * owner;
    int movementPointsRequired;
    int movementPointsTaken;
    bool allowTownSelection;
    bool skipOccupiedTowns;

public:
    TownPortalEffect(const CSpell * s, const JsonNode & config);

    int getMovementPointsRequired() const { return movementPointsRequired; }
    bool townSelectionAllowed() const { return allowTownSelection; }

private:
    ESpellCastResult applyAdventureEffects(SpellCastEnvironment * env, const AdventureSpellCastParameters & parameters) const override;
    ESpellCastResult beginCast(SpellCastEnvironment * env, const AdventureSpellCastParameters & parameters, const AdventureSpellMechanics & mechanics) const override;
    void endCast(SpellCastEnvironment * env, const AdventureSpellCastParameters & parameters) const override;
    const CGTownInstance * findNearestTown(SpellCastEnvironment * env, const AdventureSpellCastParameters & parameters, const std::vector<const CGTownInstance *> & pool) const;
    std::vector<const CGTownInstance *> getPossibleTowns(SpellCastEnvironment * env, const AdventureSpellCastParameters & parameters) const;
};
```

## 功能说明

TownPortalEffect是VCMI城镇传送门法术效果的具体实现类，继承自IAdventureSpellEffect接口。它负责处理城镇传送门法术在冒险地图上的具体效果，包括寻找可传送的目标城镇、验证传送条件、扣除移动点数等。该类会根据配置参数确定传送门的范围和行为，可以选择最近的城镇或让玩家选择传送目标。

## 依赖关系

- [IAdventureSpellEffect](./IAdventureSpellEffect.md): 冒险法术效果接口
- [CSpell](./CSpell.md): 法术类
- [CGTownInstance](../mapObjects/CGTownInstance.md): 城镇实例
- [JsonNode](../json/JsonNode.md): JSON节点
- [SpellCastEnvironment](./SpellCastEnvironment.md): 法术施放环境
- [AdventureSpellCastParameters](./AdventureSpellCastParameters.md): 冒险法术施放参数
- [AdventureSpellMechanics](./AdventureSpellMechanics.md): 冒险法术机制
- STL库: vector等

## 函数注释

### 构造函数
- `TownPortalEffect(spell, config)`: 构造函数，使用法术对象和配置节点初始化城镇传送门效果

### 公共方法
- `getMovementPointsRequired()`: 获取传送所需的移动点数
- `townSelectionAllowed()`: 检查是否允许玩家选择城镇

### 私有方法
- `applyAdventureEffects(env, parameters)`: 应用冒险法术效果，执行传送操作
- `beginCast(env, parameters, mechanics)`: 开始施放法术，处理传送逻辑
- `endCast(env, parameters)`: 结束施放法术，完成传送过程
- `findNearestTown(env, parameters, pool)`: 在给定城镇池中查找最近的可传送城镇
- `getPossibleTowns(env, parameters)`: 获取所有可能的传送目标城镇