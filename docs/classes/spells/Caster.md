# Caster接口

Caster接口是VCMI中施法者的抽象接口，定义了能够施放法术的对象所需的基本功能。

## 类定义

```cpp
namespace spells
{
    class DLL_LINKAGE Caster
    {
    public:
        virtual ~Caster() = default;

        virtual int32_t getCasterUnitId() const = 0;
        virtual int32_t getSpellSchoolLevel(const Spell * spell, SpellSchool * outSelectedSchool = nullptr) const = 0;
        virtual int32_t getEffectLevel(const Spell * spell) const = 0;
        virtual int64_t getSpellBonus(const Spell * spell, int64_t base, const Unit * affectedStack) const = 0;
        virtual int64_t getSpecificSpellBonus(const Spell * spell, int64_t base) const = 0;

        virtual int32_t getEffectPower(const Spell * spell) const = 0;
        virtual int32_t getEnchantPower(const Spell * spell) const = 0;
        virtual int64_t getEffectValue(const Spell * spell) const = 0;
        virtual int64_t getEffectRange(const Spell * spell) const = 0;

        virtual PlayerColor getCasterOwner() const = 0;
        virtual const CGHeroInstance * getHeroCaster() const = 0;
        virtual void getCasterName(MetaString & text) const = 0;
        virtual void getCastDescription(const Spell * spell, const battle::Units & attacked, MetaString & text) const = 0;

        virtual int32_t manaLimit() const = 0;

        // helpers
        int32_t getEffectValue(const Spell * spell, int64_t base, const Unit * affectedStack) const;
    };
}
```

## 功能说明

Caster是VCMI法术系统中表示施法者的抽象接口，定义了任何能够施放法术的对象（如英雄、生物等）必须实现的方法。该接口提供了获取施法者信息、计算法术效果、处理法术加成等功能，是法术系统的核心组成部分。

## 依赖关系

- [Spell](./Spell.md): 法术类
- [SpellSchool](./SpellSchool.md): 法术学派枚举
- [Unit](../../battle/Unit.md): 战斗单位接口
- [PlayerColor](../identifiers/PlayerColor.md): 玩家颜色类型
- [CGHeroInstance](../mapObjects/CGHeroInstance.md): 英雄实例
- [MetaString](./MetaString.md): 元字符串类
- [battle::Units](../../battle/Units.md): 战斗单位集合

## 函数注释

- `getCasterUnitId()`: 获取施法单位的ID
- `getSpellSchoolLevel(spell, outSelectedSchool)`: 获取特定法术的学派等级，可选择输出所选学派
- `getEffectLevel(spell)`: 获取法术效果等级
- `getSpellBonus(spell, base, affectedStack)`: 获取法术的基础加成
- `getSpecificSpellBonus(spell, base)`: 获取特定法术的特殊加成
- `getEffectPower(spell)`: 获取法术效果力量
- `getEnchantPower(spell)`: 获取附魔力量
- `getEffectValue(spell)`: 获取法术效果值
- `getEffectRange(spell)`: 获取法术效果范围
- `getCasterOwner()`: 获取施法者所属的玩家
- `getHeroCaster()`: 获取施法英雄实例（如果不是英雄则返回nullptr）
- `getCasterName(text)`: 获取施法者名称
- `getCastDescription(spell, attacked, text)`: 获取施法描述
- `manaLimit()`: 获取法力值上限
- `getEffectValue(spell, base, affectedStack)`: 辅助方法，计算法术效果值

## 设计说明

Caster接口是法术系统的关键抽象，它使不同的施法实体（如英雄、生物）能够以统一的方式被法术系统处理。通过这个接口，法术系统可以查询施法者的能力、计算法术效果并应用适当的修正。