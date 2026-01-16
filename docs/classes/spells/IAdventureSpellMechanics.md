# IAdventureSpellMechanics接口

IAdventureSpellMechanics接口是VCMI中冒险法术机制的接口，定义了冒险地图上法术的处理逻辑。

## 类定义

```cpp
class DLL_LINKAGE IAdventureSpellMechanics
{
public:
    IAdventureSpellMechanics(const CSpell * s);
    virtual ~IAdventureSpellMechanics() = default;

    virtual bool canBeCast(spells::Problem & problem, const IGameInfoCallback * cb, const spells::Caster * caster) const = 0;
    virtual bool canBeCastAt(spells::Problem & problem, const IGameInfoCallback * cb, const spells::Caster * caster, const int3 & pos) const = 0;
    virtual bool adventureCast(SpellCastEnvironment * env, const AdventureSpellCastParameters & parameters) const = 0;

    static std::unique_ptr<IAdventureSpellMechanics> createMechanics(const CSpell * s);

    virtual bool givesBonus(const spells::Caster * caster, BonusType which) const = 0;

    template<typename EffectType>
    const EffectType * getEffectAs(const spells::Caster * caster) const
    {
        return dynamic_cast<const EffectType *>(getEffect(caster));
    }
protected:
    virtual const IAdventureSpellEffect * getEffect(const spells::Caster * caster) const = 0;

    const CSpell * owner;
};
```

## 功能说明

IAdventureSpellMechanics是VCMI冒险法术机制的接口，定义了在冒险地图上施放法术所需的逻辑。它负责处理冒险法术的施放检查、目标验证和实际施放过程。该接口与战斗法术机制分离，专注于处理冒险地图特有的法术效果，如传送门、维度门、移除对象等。

## 依赖关系

- [CSpell](./CSpell.md): 法术类
- [spells::Caster](./Caster.md): 施法者接口
- [spells::Problem](./Problem.md): 问题类
- [IGameInfoCallback](../gameState/IGameInfoCallback.md): 游戏信息回调接口
- [SpellCastEnvironment](./SpellCastEnvironment.md): 法术施放环境
- [AdventureSpellCastParameters](./AdventureSpellCastParameters.md): 冒险法术施放参数
- [IAdventureSpellEffect](./IAdventureSpellEffect.md): 冒险法术效果接口
- [BonusType](../bonuses/BonusType.md): 奖励类型
- [int3](../math/int3.md): 三维坐标
- STL库: unique_ptr等

## 函数注释

- `IAdventureSpellMechanics(spell)`: 构造函数，使用法术对象初始化冒险法术机制
- `~IAdventureSpellMechanics()`: 虚析构函数
- `canBeCast(problem, cb, caster)`: 检查法术是否可以施放
- `canBeCastAt(problem, cb, caster, pos)`: 检查法术是否可以在指定位置施放
- `adventureCast(env, parameters)`: 在冒险地图上施放法术
- `createMechanics(spell)`: 静态工厂方法，创建指定法术的冒险法术机制
- `givesBonus(caster, which)`: 检查是否给予特定类型的奖励
- `getEffectAs<EffectType>(caster)`: 模板方法，将效果转换为特定类型
- `getEffect(caster)`: 获取施法者对应的法术效果（受保护方法）