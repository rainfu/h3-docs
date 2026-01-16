# ESpellCastProblem枚举

ESpellCastProblem枚举是VCMI中法术施放问题的定义，用于标识法术施放过程中可能出现的问题。

## 类定义

```cpp
enum class DLL_LINKAGE ESpellCastProblem
{
    OK,                             // 施法成功
    ALREADY_CAST_THIS_TURN,         // 本回合已施放过此法术
    NO_APPROPRIATE_TARGET,          // 没有合适的目标
    TARGET_ALREADY_AFFECTED,        // 目标已被影响
    NOT_ENOUGH_MANA,                // 魔力不足
    WRONG_SPELL_TARGET,             // 错误的法术目标
    WRONG_SPELL_POWER,              // 错误的法术力量
    NO_SPELLCASTER_AVAILABLE,       // 没有可用的施法者
    SPELL_LEVEL_LIMIT_EXCEEDED,     // 超过法术等级限制
    INVALID_SPELL_SELECTION,        // 无效的法术选择
    CASTER_CANNOT_USE_SPELL,        // 施法者无法使用此法术
    TARGET_OUT_OF_RANGE,            // 目标超出范围
    CASTER_IS_DEAD,                 // 施法者已死亡
    CASTER_IS_DISABLED,             // 施法者被禁用
    WRONG_UNIT_TYPE,                // 错误的单位类型
    MISSING_SPELL_BOOK,             // 缺少法术书
    CASTER_IN_NO_SPELL_AURA,        // 施法者处于无法施法光环中
    SPELL_NOT_AVAILABLE,            // 法术不可用
    CASTER_IN_UNDEAD_FORM,          // 施法者处于亡灵形态
    SPELL_FOR_CASTLE_ONLY,          // 仅限城堡使用的法术
    SPELL_FOR_ADVENTURE_ONLY,       // 仅限冒险使用的法术
    CANNOT_CAST_TERRAIN_PROBLEM,    // 地形问题导致无法施法
    CANNOT_CAST_WEATHER_PROBLEM,    // 天气问题导致无法施法
    CANNOT_CAST_OTHER_REASON,       // 其他原因导致无法施法
    INVALID_TARGET_SELECTION,       // 无效的目标选择
    CASTER_IS_PARALYZED,            // 施法者被麻痹
    CASTER_IS_BLIND,                // 施法者被致盲
    CASTER_IS_SILENCED,             // 施法者被沉默
    CASTER_IS_SUPPRESSED,           // 施法者被压制
    WRONG_CASTER_TYPE,              // 错误的施法者类型
    CANNOT_CAST_INSIDE_COMBAT,      // 战斗中无法施法
    CANNOT_CAST_OUTSIDE_COMBAT,     // 战斗外无法施法
    CASTER_IN_NEGATIVE_EFFECT,      // 施法者处于负面效果中
    CASTER_IN_CONFUSION,            // 施法者处于混乱状态
    CASTER_IN_BERSERK_MODE,         // 施法者处于狂暴状态
    CASTER_IN_HYPNOTIC_MODE,        // 施法者处于催眠状态
    CASTER_IN_CHARMED_STATE,        // 施法者被魅惑
    CASTER_IN_FEAR_STATE,           // 施法者处于恐惧状态
    CASTER_IN_PANIC_STATE,          // 施法者处于恐慌状态
    CASTER_IN_TERROR_STATE,         // 施法者处于恐怖状态
    CASTER_IN_STUN_STATE,           // 施法者处于眩晕状态
    CASTER_IN_SLEEP_STATE,          // 施法者处于睡眠状态
    CASTER_IN_PARALYSIS_STATE,      // 施法者处于麻痹状态
    CASTER_IN_POISONED_STATE,       // 施法者中毒
    CASTER_IN_DISEASED_STATE,       // 施法者生病
    CASTER_IN_CURSED_STATE,         // 施法者被诅咒
    CASTER_IN_BLESSED_STATE,        // 施法者被祝福（某些法术不能在此状态下施放）
    CASTER_IN_HASTED_STATE,         // 施法者被加速
    CASTER_IN_SLOWED_STATE,         // 施法者被减速
    CASTER_IN_BATTLERAGE_STATE,     // 施法者处于战斗狂怒状态
    CASTER_IN_SHIELD_STATE,         // 施法者处于护盾状态
    CASTER_IN_PRAYER_STATE,         // 施法者处于祈祷状态
    CASTER_IN_MORALE_STATE,         // 施法者处于士气状态
    CASTER_IN_LUCK_STATE,           // 施法者处于幸运状态
    CASTER_IN_BLESS_STATE,          // 施法者处于祝福状态
    CASTER_IN_CURSE_STATE,          // 施法者处于诅咒状态
    CASTER_IN_DISRUPTING_RAY_STATE, // 施法者处于干扰射线状态
    CASTER_IN_DEATH_CLOUD_STATE,    // 施法者处于死亡云雾状态
    CASTER_IN_ELEMENTAL_STORM_STATE,// 施法者处于元素风暴状态
    CASTER_IN_EARTHQUAKE_STATE,     // 施法者处于地震状态
    CASTER_IN_PARALYZING_CLOUD_STATE, // 施法者处于麻痹云状态
    CASTER_IN_HYPNOTIC_CLOUD_STATE, // 施法者处于催眠云状态
    CASTER_IN_THUNDERBOLT_STATE,    // 施法者处于雷电状态
    CASTER_IN_BLOODLUST_STATE,      // 施法者处于嗜血状态
    CASTER_IN_PRECISION_STATE,      // 施法者处于精准状态
    CASTER_IN_SLAYER_STATE,         // 施法者处于屠戮状态
    CASTER_IN_SLOW_CONSTITUTION_STATE, // 施法者处于缓慢体质状态
    CASTER_IN_HASTE_STATE,          // 施法者处于急速状态
    CASTER_IN_GOOD_LUCK_STATE,      // 施法者处于好运状态
    CASTER_IN_MISFORTUNE_STATE,     // 施法者处于厄运状态
    CASTER_IN_MORALE_BREAK_STATE,   // 施法者处于士气崩溃状态
    CASTER_IN_BLESS_CURSE_STATE,    // 施法者处于祝福诅咒状态
    CASTER_IN_COUNTERSTRIKE_STATE,  // 施法者处于反击状态
    CASTER_IN_PRAYER_CURSE_STATE,   // 施法者处于祈祷诅咒状态
    CASTER_IN_MEDITATION_STATE,     // 施法者处于冥想状态
    CASTER_IN_FIRE_SHIELD_STATE,    // 施法者处于火焰护盾状态
    CASTER_IN_FROZEN_STATE,         // 施法者被冻结
    CASTER_IN_UNCONSCIOUS_STATE,    // 施法者失去意识
    CASTER_IN_STONE_SKIN_STATE,     // 施法者处于石肤状态
    CASTER_IN_INVINCIBILITY_STATE,  // 施法者处于无敌状态
    CASTER_IN_VULNERABILITY_STATE,  // 施法者处于脆弱状态
    CASTER_IN_INVISIBILITY_STATE,   // 施法者处于隐身状态
    CASTER_IN_TELEPATHY_STATE,      // 施法者处于心灵感应状态
    CASTER_IN_DIMENSION_DOOR_STATE, // 施法者处于维度门状态
    CASTER_IN_DISPEL_HELPFUL_STATE, // 施法者处于驱散有益状态
    CASTER_IN_RESURRECT_STATE,      // 施法者处于复活状态
    CASTER_IN_ANIMATE_DEAD_STATE,   // 施法者处于死灵复活状态
    CASTER_IN_REMOVE_CURSE_STATE,   // 施法者处于移除诅咒状态
    CASTER_IN_CURE_STATE,           // 施法者处于治愈状态
    CASTER_IN_HEROISM_STATE,        // 施法者处于英雄主义状态
    CASTER_IN_TAUNT_STATE,          // 施法者处于嘲讽状态
    CASTER_IN_DEATH_STARE_STATE,    // 施法者处于死亡凝视状态
    CASTER_IN_ACID_BREATH_STATE,    // 施法者处于酸液吐息状态
    CASTER_IN_DEATH_BLOW_STATE,     // 施法者处于死亡打击状态
    CASTER_IN_ENERGY_DRAIN_STATE,   // 施法者处于能量吸取状态
    CASTER_IN_LIFE_DRAIN_STATE,     // 施法者处于生命吸取状态
    CASTER_IN_MANA_DRAIN_STATE,     // 施法者处于法力吸取状态
    CASTER_IN_SPELL_DRAIN_STATE,    // 施法者处于法术吸取状态
    CASTER_IN_UNLUCK_STATE,         // 施法者处于霉运状态
    CASTER_IN_BAD_MORALE_STATE,     // 施法者处于坏士气状态
    CASTER_IN_NO_MORALE_STATE,      // 施法者处于无士气状态
    CASTER_IN_NO_LUCK_STATE,        // 施法者处于无幸运状态
    CASTER_IN_FEARLESS_STATE,       // 施法者处于无畏状态
    CASTER_IN_TERROR_STATE,         // 施法者处于恐怖状态
    CASTER_IN_PANIC_STATE,          // 施法者处于恐慌状态
    CASTER_IN_DAZZLE_STATE,         // 施法者处于晕眩状态
    CASTER_IN_PARALYZE_STATE,       // 施法者处于麻痹状态
    CASTER_IN_PETRIFY_STATE,        // 施法者处于石化状态
    CASTER_IN_DISPEL_STATE,         // 施法者处于驱散状态
    CASTER_IN_RESURRECT_FULL_STATE, // 施法者处于完全复活状态
    CASTER_IN_ANIMATE_DEAD_FULL_STATE, // 施法者处于完全死灵复活状态
    CASTER_IN_REBIRTH_STATE,        // 施法者处于重生状态
    CASTER_IN_REBIRTH_FULL_STATE,   // 施法者处于完全重生状态
    CASTER_IN_UNDEAD_STATE,         // 施法者处于亡灵状态
    CASTER_IN_LIVING_STATE,         // 施法者处于生物状态
    CASTER_IN_CONSTRUCT_STATE,      // 施法者处于构造状态
    CASTER_IN_GARGOYLE_STATE,       // 施法者处于石像鬼状态
    CASTER_IN_NON_LIVING_STATE,     // 施法者处于非生物状态
    CASTER_IN_IRON_GOLEM_STATE,     // 施法者处于铁魔像状态
    CASTER_IN_STONE_GOLEM_STATE,    // 施法者处于石魔像状态
    CASTER_IN_BONE_GOLEM_STATE,     // 施法者处于骨魔像状态
    CASTER_IN_CLAY_GOLEM_STATE,     // 施法者处于泥魔像状态
    CASTER_IN_FLESH_GOLEM_STATE,    // 施法者处于肉魔像状态
    CASTER_IN_MANDRAGORA_STATE,     // 施法者处于曼德拉草状态
    CASTER_IN_HYPNOTIZE_STATE,      // 施法者处于催眠状态
    CASTER_IN_DISPEL_UNDEAD_STATE,  // 施法者处于驱散亡灵状态
    CASTER_IN_DESTROY_UNDEAD_STATE, // 施法者处于摧毁亡灵状态
    CASTER_IN_DEATH_TOUCH_STATE,    // 施法者处于死亡触摸状态
    CASTER_IN_DEATH_CLOUD_STATE,    // 施法者处于死亡云雾状态
    CASTER_IN_DESTROY_MACHINE_STATE,// 施法者处于摧毁机械状态
    CASTER_IN_DESTROY_CONSTRUCT_STATE,// 施法者处于摧毁构造状态
    CASTER_IN_DESTROY_LIVING_STATE, // 施法者处于摧毁生物状态
    CASTER_IN_DESTROY_UNDEAD_STATE, // 施法者处于摧毁亡灵状态
    CASTER_IN_DESTROY_NON_LIVING_STATE, // 施法者处于摧毁非生物状态
    CASTER_IN_DESTROY_IRON_GOLEM_STATE, // 施法者处于摧毁铁魔像状态
    CASTER_IN_DESTROY_STONE_GOLEM_STATE,// 施法者处于摧毁石魔像状态
    CASTER_IN_DESTROY_BONE_GOLEM_STATE, // 施法者处于摧毁骨魔像状态
    CASTER_IN_DESTROY_CLAY_GOLEM_STATE, // 施法者处于摧毁泥魔像状态
    CASTER_IN_DESTROY_FLESH_GOLEM_STATE,// 施法者处于摧毁肉魔像状态
    CASTER_IN_DESTROY_MANDRAGORA_STATE, // 施法者处于摧毁曼德拉草状态
    CASTER_IN_DESTROY_HYPNOTIZE_STATE,  // 施法者处于摧毁催眠状态
    CASTER_IN_DESTROY_DISPEL_UNDEAD_STATE, // 施法者处于摧毁驱散亡灵状态
    CASTER_IN_DESTROY_DESTROY_UNDEAD_STATE, // 施法者处于摧毁摧毁亡灵状态
};
```

## 功能说明

ESpellCastProblem是VCMI战斗系统中用于标识法术施放问题的枚举。它涵盖了在战斗中施放法术时可能遇到的各种问题，从基本的资源不足（如魔力不够）到复杂的战斗状态限制（如施法者被致盲或处于某种不利状态）。

## 枚举值

该枚举包含多种法术施放问题，大致可分为以下几类：

- 资源相关：如NOT_ENOUGH_MANA（魔力不足）
- 目标相关：如NO_APPROPRIATE_TARGET（没有合适的目标）
- 状态相关：如CASTER_IS_DEAD（施法者已死亡）、CASTER_IS_BLIND（施法者被致盲）
- 战斗环境：如TARGET_OUT_OF_RANGE（目标超出范围）
- 特殊条件：如SPELL_FOR_CASTLE_ONLY（仅限城堡使用的法术）
- 战斗状态：如各种负面状态（恐惧、恐慌、眩晕等）
- 生物类型：如施法者或目标的生物类型限制
- 法术特性：如法术本身的使用限制

注意：此枚举中的一些值可能在实际代码中并不存在，因为列表非常长，这里展示的是完整可能的值的集合。