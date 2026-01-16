# Bonus::BonusType枚举

Bonus::BonusType枚举是VCMI中奖励类型的定义，用于区分不同类型的奖励效果。

## 类定义

```cpp
enum class DLL_LINKAGE Bonus::BonusType
{
    // 攻击防御调整
    ATTACK_REDUCTION,           // 攻击减成
    DEFENSE_REDUCTION,          // 防御减成
    MORALE,                     // 士气
    LUCK,                       // 幸运
    PRIMARY_SKILL,              // 主要技能
    SECONDARY_SKILL,            // 次要技能
    
    // 生命和魔法
    STACK_HEALTH,               // 堆栈生命值
    STACKS_SPEED,               // 堆栈速度
    MANA_PER_KNOWLEDGE,         // 每点知识获得魔法值
    
    // 战斗属性
    DAMAGE_BONUS,               // 伤害加成
    DAMAGE_PERCENT,             // 伤害百分比
    SPOILS_OF_WAR,              // 战利品
    CURSED,                     // 诅咒
    
    // 特殊能力
    REBIRTH,                    // 重生
    REBIRTH_FULL_HP,            // 满血重生
    UNDEAD_RAISE,               // 亡灵复活
    SOUL_STEAL,                 // 灵魂窃取
    HP_REGENERATION,            // 生命恢复
    MANA_REGENERATION,          // 魔法恢复
    POISON,                     // 毒素
    BIND_EFFECT,                // 绑定效果
    SHOOTER,                    // 射手
    FLYING,                     // 飞行
    CHARGE_IMMUNITY,            // 冲锋免疫
    MELEE_WEAPON,               // 近战武器
    RANGED_WEAPON,              // 远程武器
    MAGIC_RESISTANCE,           // 魔法抗性
    GENERAL_DAMAGE_REDUCTION,   // 通用伤害减免
    COLLATERAL_DAMAGE_REDUCTION, // 附带伤害减免
    AREA_DAMAGE_REDUCTION,      // 区域伤害减免
    ELEMENTAL_DAMAGE_REDUCTION, // 元素伤害减免
    SPELL_DAMAGE_REDUCTION,     // 法术伤害减免
    PHYSICAL_DAMAGE_REDUCTION,  // 物理伤害减免
    FIRE_SPELL_DMG_REDUCTION,   // 火系法术伤害减免
    WATER_SPELL_DMG_REDUCTION,  // 水系法术伤害减免
    AIR_SPELL_DMG_REDUCTION,    // 气系法术伤害减免
    EARTH_SPELL_DMG_REDUCTION,  // 土系法术伤害减免
    MIND_SPELL_RESISTANCE,      // 心智法术抗性
    NECROMANCY_SPELL_RESISTANCE, // 死灵法术抗性
    MYSTERY_SPELL_RESISTANCE,   // 神秘法术抗性
    BLESS_SPELL_SCHOOL,         // 祝福法术学派
    CURSE_SPELL_SCHOOL,         // 诅咒法术学派
    SUMMONING_SPELL_SCHOOL,     // 召唤法术学派
    DIPLOMACY_FIGHTING,         // 外交战斗
    FEAR,                       // 恐惧
    FEARLESS,                   // 无畏
    CHARGE_DAMAGE,              // 冲锋伤害
    BLOCKS_RETALIATION,         // 阻止反击
    ALTERNATIVE_COMBAT,         // 替代战斗
    DOUBLE_DAMAGE_CHANCE,       // 双倍伤害几率
    DEATH_STARE,                // 致死凝视
    LIFE_DRAIN,                 // 生命汲取
    MANA_DRAIN,                 // 魔法汲取
    TELEPORT,                   // 传送
    FORGETFULL,                 // 遗忘（遗忘法术）
    BLIND,                      // 致盲
    STUN,                       // 眩晕
    HYPNOTIZED,                 // 催眠
    SLEEP,                      // 睡眠
    TERROR,                     // 恐怖
    PANIC,                      // 惊慌
    DAZZLE,                     // 晕眩
    PARALYZE,                   // 麻痹
    PETRIFY,                    // 石化
    DISPEL_HELPFUL_SPELLS,      // 驱散有益法术
    RESURRECT,                  // 复活
    ANIMATE_DEAD,               // 死灵复活
    TRANSFORM,                  // 变形
    DESTRUCTION,                // 摧毁
    UNLUCK,                     // 倒霉
    BAD_MORALE,                 // 士气低落
    NO_MORALE,                  // 无士气
    NO_LUCK,                    // 无幸运
    SIEGE_WEAPON,               // 攻城武器
    HAUNT_OBJECT,               // 幽灵物体
    SPELL_IMMUNITY,             // 法术免疫
    SPELL_LIKE_ATTACK,          // 法术攻击
    JAILER,                     // 监狱长
    MAGIC_MIRROR,               // 魔法镜像
    ENDURANCE,                  // 耐力
    REVENGE,                    // 复仇
    ENEMY_OF,                   // 敌人
    SPELLCASTER,                // 法术施放者
    SPELL_POWER,                // 法术力量
    RESIST_SPELL_POWER,         // 抗性法术力量
    CASTS,                      // 施法次数
    FLANKING,                   // 侧翼攻击
    ADAPTATION,                 // 适应
    LEARN_BATTLE_SPELL_CHANCE,  // 学习战斗法术几率
    RAISE_DEFENSE,              // 提高防御
    LOWER_TERRAIN_DEFENSE,      // 降低地形防御
    TERRAIN_NATIVE,             // 原生地形
    TERRAIN_VISITOR,            // 访问地形
    SWARM,                      // 虫群
    SPELL_DURATION,             // 法术持续时间
    CREATURE_ENCHANT_POWER,     // 生物附魔力量
    CREATURE_SPELL_POWER,       // 生物法术力量
    ENCHANTED,                  // 附魔
    SPECIFIC_SPELL_POWER,       // 特定法术力量
    OWNED_ABILITY,              // 拥有能力
    UNIT_UPGRADE,               // 单位升级
    MORALE_UNMODIFIABLE,        // 不可修改士气
    LUCK_UNMODIFIABLE,          // 不可修改幸运
    NO_WALL_PENALTY,            // 无视城墙惩罚
    NO_TERRAIN_PENALTY,         // 无视地形惩罚
    FEROCITY,                   // 凶猛
    DOUBLE_DAMAGE_CREATURE,     // 双倍伤害生物
    MATTER_RESISTANCE,          // 物质抗性
    MIND_IMMUNITY,              // 心智免疫
    ACID_BREATH,                // 酸液吐息
    DRAGON_NATURE,              // 龙族天性
    LIFE_DRAIN_PERCENT,         // 生命汲取百分比
    MANA_DRAIN_PERCENT,         // 魔法汲取百分比
    DEATH_STARE_PERCENT,        // 致死凝视百分比
    POISON_DAMAGE,              // 毒素伤害
    POISON_PREHEALED,           // 毒素预治疗
    OVERFLOW,                   // 溢出
    SPELL_SCHOOL_IMMUNITY,      // 法术学派免疫
    SPECIFIC_SPELL_DAMAGE_IMMUNITY, // 特定法术伤害免疫
    SPECIFIC_SPELL_DAMAGE_REDUCTION, // 特定法术伤害减免
    AREA_SPELL_SCHOOL_IMMUNITY, // 区域法术学派免疫
    AREA_SPELL_IMMUNITY,        // 区域法术免疫
    SPECIFIC_SPELL_IMMUNITY,    // 特定法术免疫
    DAMAGE_REDUCTION_PERCENT,   // 伤害减免百分比
    DAMAGE_INCREASE_PERCENT,    // 伤害增加百分比
    GENERAL_DAMAGE_PREMY,       // 通用伤害预增
    MECHANICAL_REPAIR,          // 机械修理
    NO_CRITICAL_HIT,            // 无暴击
    NO_LIFE_DRain,              // 无生命汲取
    SNAKE_FORM,                 // 蛇形态
    RECEPTACLE,                 // 容器
    AURA,                       // 光环
    AURA_IMMUNITY,              // 光环免疫
    HEALER,                     // 治疗师
    SYNERGY_TARGET,             // 协同目标
    ENCHANTER,                  // 附魔师
    NO_MELEE_PENALTY,           // 无近战惩罚
    FULL_HP_TRIGGER,            // 满血触发
    ONLY_DISTANCE_FIGHT,        // 仅远程战斗
    ONLY_MELEE_FIGHT,           // 仅近战战斗
    PSYCHOLOGICAL,              // 心理
    NO_SPELLCAST_BY_OWNER,      // 主人无法施法
    HATE,                       // 仇恨
    AIMED_SHOT,                 // 瞄准射击
    LAST_LEVEL_SPELL_IMMUNITY,  // 最终等级法术免疫
    NO_RETALIATION_IF_ATTACKING, // 攻击时无反击
    MAX_SPELL_RADIUS,           // 最大法术半径
    FAVORITE_HERO,              // 最喜欢的英雄
    SPELL_AFTER_ATTACK,         // 攻击后施法
    SPELL_BEFORE_ATTACK,        // 攻击前施法
    SPELL_RESISTANCE_AURA,      // 抗性光环
    CREATURE_SPELLCASTER,       // 生物施法者
    CREATURE_ENCHANTER,         // 生物附魔师
    OBSTACLE,                   // 障碍
    NATURAL_IMMUNITY,           // 天然免疫
    SPELL_DAMAGE,               // 法术伤害
    DAMAGE_TO_MANA,             // 伤害转法力
    MANA_TO_DAMAGE,             // 法力转伤害
    HEAL_PER_TURN,              // 每回合治疗
    LIMITED_SHOOTING_RANGE,     // 有限射击距离
    SPELL_SCHOOL_DAMAGE,        // 法术学派伤害
    SPECIFIC_SPELL_DAMAGE,      // 特定法术伤害
    KEEPS_RETALIATIONS,         // 保持反击
    MOVEMENT,                   // 移动
    SEA_MOVEMENT,               // 海上移动
    LANDING,                    // 登陆
    FLYING_MOVEMENT,            // 飞行移动
    GARRISON_BONUS,             // 驻军奖励
    GARRISON_BONUS_MODIFIER,    // 驻军奖励修正
    SAVAGE,                     // 野蛮
    HATES,                      // 憎恨
    DUMMY,                      // 假奖励
    SPELL_DAMAGE_REDUCTION,     // 法术伤害减免
    MORALE_OBJECT,              // 士气物品
    LUCK_OBJECT,                // 幸运物品
    NO_DISTANCE_PENALTY,        // 无距离惩罚
    NO_OBSTACLE_PENALTY,        // 无障碍惩罚
    REBIRTH_MODULAR,            // 模块化重生
    CASTS_PER_KNOWLEDGE,        // 每点知识施法次数
    MANA_PER_TURN,              // 每回合法力值
    FLAT_SPELL_DAMAGE_BONUS,    // 固定法术伤害奖励
    SPELL_DAMAGE_PERCENT_BONUS, // 法术伤害百分比奖励
    CREATURE_DAMAGE,            // 生物伤害
    CREATURE_ENCHANT_POWER_BOOST, // 生物附魔力量提升
    CREATURE_SPELL_IMMUNITY,    // 生物法术免疫
    CREATURE_SPELL_DAMAGE_IMMUNITY, // 生物法术伤害免疫
    CREATURE_SPELL_DAMAGE_REDUCTION, // 生物法术伤害减免
    CREATURE_SPELL_SCHOOL_IMMUNITY, // 生物法术学派免疫
    CREATURE_SPELL_SCHOOL_REDUCTION, // 生物法术学派减免
    CREATURE_SPECIFIC_SPELL_IMMUNITY, // 生物特定法术免疫
    CREATURE_SPECIFIC_SPELL_REDUCTION, // 生物特定法术减免
    CREATURE_AREA_SPELL_IMMUNITY, // 生物区域法术免疫
    CREATURE_AREA_SPELL_REDUCTION, // 生物区域法术减免
    CREATURE_SPELL_SCHOOL_DMG_BONUS, // 生物法术学派伤害奖励
    CREATURE_SPECIFIC_SPELL_DMG_BONUS, // 生物特定法术伤害奖励
    CREATURE_AREA_SPELL_DMG_BONUS, // 生物区域法术伤害奖励
    CREATURE_SPELLCASTER_BONUS, // 生物施法者奖励
    CREATURE_ENCHANTER_BONUS,   // 生物附魔师奖励
    CREATURE_HEALER_BONUS,      // 生物治疗师奖励
    CREATURE_ENCHANT_POWER_REDUCTION, // 生物附魔力量减免
    CREATURE_SPELL_POWER_REDUCTION, // 生物法术力量减免
    CREATURE_RESISTANCE_REDUCTION, // 生物抗性减免
    CREATURE_DAMAGE_REDUCTION,  // 生物伤害减免
    CREATURE_SPEED_BONUS,       // 生物速度奖励
    CREATURE_MELEE_BONUS,       // 生物近战奖励
    CREATURE_RANGED_BONUS,      // 生物远程奖励
    CREATURE_MELEE_REDUCTION,   // 生物近战减免
    CREATURE_RANGED_REDUCTION,  // 生物远程减免
    CREATURE_DEFENSE_BONUS,     // 生物防御奖励
    CREATURE_ATTACK_BONUS,      // 生物攻击奖励
    CREATURE_SPELL_IMMUNITY_AURA, // 生物法术免疫光环
    CREATURE_SPELL_DAMAGE_IMMUNITY_AURA, // 生物法术伤害免疫光环
    CREATURE_SPELL_DAMAGE_REDUCTION_AURA, // 生物法术伤害减免光环
    CREATURE_SPELL_SCHOOL_IMMUNITY_AURA, // 生物法术学派免疫光环
    CREATURE_SPELL_SCHOOL_REDUCTION_AURA, // 生物法术学派减免光环
    CREATURE_SPECIFIC_SPELL_IMMUNITY_AURA, // 生物特定法术免疫光环
    CREATURE_SPECIFIC_SPELL_REDUCTION_AURA, // 生物特定法术减免光环
    CREATURE_AREA_SPELL_IMMUNITY_AURA, // 生物区域法术免疫光环
    CREATURE_AREA_SPELL_REDUCTION_AURA, // 生物区域法术减免光环
    CREATURE_SPELL_SCHOOL_DMG_BONUS_AURA, // 生物法术学派伤害奖励光环
    CREATURE_SPECIFIC_SPELL_DMG_BONUS_AURA, // 生物特定法术伤害奖励光环
    CREATURE_AREA_SPELL_DMG_BONUS_AURA, // 生物区域法术伤害奖励光环
    CREATURE_SPELLCASTER_BONUS_AURA, // 生物施法者奖励光环
    CREATURE_ENCHANTER_BONUS_AURA, // 生物附魔师奖励光环
    CREATURE_HEALER_BONUS_AURA, // 生物治疗师奖励光环
    CREATURE_ENCHANT_POWER_REDUCTION_AURA, // 生物附魔力量减免光环
    CREATURE_SPELL_POWER_REDUCTION_AURA, // 生物法术力量减免光环
    CREATURE_RESISTANCE_REDUCTION_AURA, // 生物抗性减免光环
    CREATURE_DAMAGE_REDUCTION_AURA, // 生物伤害减免光环
    CREATURE_SPEED_BONUS_AURA,  // 生物速度奖励光环
    CREATURE_MELEE_BONUS_AURA,  // 生物近战奖励光环
    CREATURE_RANGED_BONUS_AURA, // 生物远程奖励光环
    CREATURE_MELEE_REDUCTION_AURA, // 生物近战减免光环
    CREATURE_RANGED_REDUCTION_AURA, // 生物远程减免光环
    CREATURE_DEFENSE_BONUS_AURA, // 生物防御奖励光环
    CREATURE_ATTACK_BONUS_AURA, // 生物攻击奖励光环
    CREATURE_SPELL_IMMUNITY_NEG, // 生物法术免疫负向
    CREATURE_SPELL_DAMAGE_IMMUNITY_NEG, // 生物法术伤害免疫负向
    CREATURE_SPELL_DAMAGE_REDUCTION_NEG, // 生物法术伤害减免负向
    CREATURE_SPELL_SCHOOL_IMMUNITY_NEG, // 生物法术学派免疫负向
    CREATURE_SPELL_SCHOOL_REDUCTION_NEG, // 生物法术学派减免负向
    CREATURE_SPECIFIC_SPELL_IMMUNITY_NEG, // 生物特定法术免疫负向
    CREATURE_SPECIFIC_SPELL_REDUCTION_NEG, // 生物特定法术减免负向
    CREATURE_AREA_SPELL_IMMUNITY_NEG, // 生物区域法术免疫负向
    CREATURE_AREA_SPELL_REDUCTION_NEG, // 生物区域法术减免负向
    CREATURE_SPELL_SCHOOL_DMG_BONUS_NEG, // 生物法术学派伤害奖励负向
    CREATURE_SPECIFIC_SPELL_DMG_BONUS_NEG, // 生物特定法术伤害奖励负向
    CREATURE_AREA_SPELL_DMG_BONUS_NEG, // 生物区域法术伤害奖励负向
    CREATURE_SPELLCASTER_BONUS_NEG, // 生物施法者奖励负向
    CREATURE_ENCHANTER_BONUS_NEG, // 生物附魔师奖励负向
    CREATURE_HEALER_BONUS_NEG,   // 生物治疗师奖励负向
    CREATURE_ENCHANT_POWER_REDUCTION_NEG, // 生物附魔力量减免负向
    CREATURE_SPELL_POWER_REDUCTION_NEG, // 生物法术力量减免负向
    CREATURE_RESISTANCE_REDUCTION_NEG, // 生物抗性减免负向
    CREATURE_DAMAGE_REDUCTION_NEG, // 生物伤害减免负向
    CREATURE_SPEED_BONUS_NEG,    // 生物速度奖励负向
    CREATURE_MELEE_BONUS_NEG,    // 生物近战奖励负向
    CREATURE_RANGED_BONUS_NEG,   // 生物远程奖励负向
    CREATURE_MELEE_REDUCTION_NEG, // 生物近战减免负向
    CREATURE_RANGED_REDUCTION_NEG, // 生物远程减免负向
    CREATURE_DEFENSE_BONUS_NEG,  // 生物防御奖励负向
    CREATURE_ATTACK_BONUS_NEG,   // 生物攻击奖励负向
    // ... 更多类型
};
```

## 功能说明

Bonus::BonusType是VCMI奖励系统中用于定义奖励类型的主要枚举。它涵盖了游戏中几乎所有的奖励效果，包括攻击、防御、生命值、速度、特殊能力、抗性、法术效果等。每种类型都有特定的游戏机制含义。

## 枚举值

该枚举包含多种类型的奖励，大致可分为以下几类：

- 攻击防御调整：如ATTACK_REDUCTION, DEFENSE_REDUCTION等
- 属性调整：如MORALE, LUCK, PRIMARY_SKILL等
- 生命和魔法：如STACK_HEALTH, MANA_PER_KNOWLEDGE等
- 战斗属性：如DAMAGE_BONUS, DAMAGE_PERCENT等
- 特殊能力：如REBIRTH, UNDEAD_RAISE, SOUL_STEAL等
- 抗性与免疫：如MAGIC_RESISTANCE, SPELL_IMMUNITY等
- 状态效果：如FEAR, FEARLESS, STUN, SLEEP等
- 法术相关：如SPELLCASTER, SPELL_POWER, CASTS等
- 地形与移动：如TERRAIN_NATIVE, MOVEMENT等
- 生物特定效果：如CREATURE_*系列奖励