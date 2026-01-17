# AdventureSpellMechanics类

AdventureSpellMechanics类是VCMI中冒险法术机制的实现类，用于处理冒险地图上的法术效果。

## 类定义

```cpp
class IAdventureSpellEffect;

class AdventureSpellMechanics final : public IAdventureSpellMechanics, boost::noncopyable
{
    struct LevelOptions
    {
        std::unique_ptr<IAdventureSpellEffect> effect;
        std::vector<std::shared_ptr<Bonus>> bonuses;
        int castsPerDay;
        int castsPerDayXL;
    };

    std::array<LevelOptions, GameConstants::SPELL_SCHOOL_LEVELS> levelOptions;

    const LevelOptions & getLevel(const spells::Caster * caster) const;
    void giveBonuses(SpellCastEnvironment * env, const AdventureSpellCastParameters & parameters) const;
    std::unique_ptr<IAdventureSpellEffect> createAdventureEffect(const CSpell * s, const JsonNode & node);

public:
    AdventureSpellMechanics(const CSpell * s);
    ~AdventureSpellMechanics();

    void performCast(SpellCastEnvironment * env, const AdventureSpellCastParameters & parameters) const;

private:
    bool canBeCast(spells::Problem & problem, const IGameInfoCallback * cb, const spells::Caster * caster) const final;
    bool canBeCastAt(spells::Problem & problem, const IGameInfoCallback * cb, const spells::Caster * caster, const int & pos) const final;
    bool adventureCast(SpellCastEnvironment * env, const AdventureSpellCastParameters & parameters) const final;
    const IAdventureSpellEffect * getEffect(const spells::Caster * caster) const final;
    bool givesBonus(const spells::Caster * caster, BonusType which) const final;
};
```

## 功能说明

AdventureSpellMechanics是VCMI冒险法术机制的具体实现类，用于处理在冒险地图上施放的法术效果。它继承自IAdventureSpellMechanics接口，负责处理冒险法术的施放逻辑，包括传送门、维度门、移除对象等特殊效果。该类为不同等级的法术存储特定的配置选项，并提供相应的施法机制。

## 依赖关系

- [IAdventureSpellMechanics](./IAdventureSpellMechanics.md): 冒险法术机制接口
- [IAdventureSpellEffect](./IAdventureSpellEffect.md): 冒险法术效果接口
- [CSpell](./CSpell.md): 法术类
- [spells::Caster](./Caster.md): 施法者接口
- [SpellCastEnvironment](./SpellCastEnvironment.md): 法术施放环境
- [AdventureSpellCastParameters](./AdventureSpellCastParameters.md): 冒险法术施放参数
- [JsonNode](../json/JsonNode.md): JSON节点
- [Bonus](../bonuses/Bonus.md): 奖励类
- [IGameInfoCallback](../gameState/IGameInfoCallback.md): 游戏信息回调接口
- STL库: array, vector, unique_ptr, shared_ptr等

## 函数注释

### 构造/析构函数
- `AdventureSpellMechanics(spell)`: 构造函数，使用法术对象初始化冒险法术机制
- `~AdventureSpellMechanics()`: 析构函数

### 公共方法
- `performCast(env, parameters)`: 执行法术施放，根据参数执行具体的冒险法术效果

### 私有方法
- `getLevel(caster)`: 获取施法者对应的法术等级选项
- `giveBonuses(env, parameters)`: 给予法术奖励
- `createAdventureEffect(spell, node)`: 从JSON节点创建冒险法术效果

### 实现接口的方法
- `canBeCast(problem, cb, caster)`: 检查法术是否可以施放
- `canBeCastAt(problem, cb, caster, pos)`: 检查法术是否可以在指定位置施放
- `adventureCast(env, parameters)`: 冒险模式法术施放
- `getEffect(caster)`: 获取施法者对应的法术效果
- `givesBonus(caster, which)`: 检查是否给予特定类型的奖励