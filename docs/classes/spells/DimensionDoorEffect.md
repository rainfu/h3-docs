# DimensionDoorEffect类

DimensionDoorEffect类是VCMI中维度门法术效果的实现类，用于处理维度门法术在冒险地图上的具体效果。

## 类定义

```cpp
class DimensionDoorEffect final : public AdventureSpellRangedEffect
{
    std::string cursor;
    std::string cursorGuarded;
    int movementPointsRequired;
    int movementPointsTaken;
    bool waterLandFailureTakesPoints;
    bool exposeFow;

public:
    DimensionDoorEffect(const CSpell * s, const JsonNode & config);

private:
    bool canBeCastImpl(spells::Problem & problem, const IGameInfoCallback * cb, const spells::Caster * caster) const final;
    bool canBeCastAtImpl(spells::Problem & problem, const IGameInfoCallback * cb, const spells::Caster * caster, const int3 & pos) const final;
    ESpellCastResult applyAdventureEffects(SpellCastEnvironment * env, const AdventureSpellCastParameters & parameters) const final;
    void endCast(SpellCastEnvironment * env, const AdventureSpellCastParameters & parameters) const final;
    std::string getCursorForTarget(const IGameInfoCallback * cb, const spells::Caster * caster, const int3 & pos) const final;
};
```

## 功能说明

DimensionDoorEffect是VCMI维度门法术效果的具体实现类，继承自AdventureSpellRangedEffect基类。它负责处理维度门法术在冒险地图上的具体效果，包括允许英雄瞬间传送到视野范围内的任意位置。该类提供了范围限制、移动点数消耗、地形检查等功能，确保传送在合理的游戏规则内进行。

## 依赖关系

- [AdventureSpellRangedEffect](./AdventureSpellRangedEffect.md): 冒险法术范围效果基类
- [CSpell](./CSpell.md): 法术类
- [JsonNode](../json/JsonNode.md): JSON节点
- [SpellCastEnvironment](./SpellCastEnvironment.md): 法术施放环境
- [AdventureSpellCastParameters](./AdventureSpellCastParameters.md): 冒险法术施放参数
- [IGameInfoCallback](../gameState/IGameInfoCallback.md): 游戏信息回调接口
- [spells::Caster](./Caster.md): 施法者接口
- [spells::Problem](./Problem.md): 问题类
- [int3](../math/int3.md): 三维坐标
- STL库: string等

## 函数注释

### 构造函数
- `DimensionDoorEffect(spell, config)`: 构造函数，使用法术对象和配置节点初始化维度门效果

### 私有方法（重写基类方法）
- `canBeCastImpl(problem, cb, caster)`: 检查法术是否可以施放
- `canBeCastAtImpl(problem, cb, caster, pos)`: 检查法术是否可以在指定位置施放
- `applyAdventureEffects(env, parameters)`: 应用冒险法术效果，执行传送操作
- `endCast(env, parameters)`: 结束施放法术，完成传送过程
- `getCursorForTarget(cb, caster, pos)`: 获取目标位置的光标类型