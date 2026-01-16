# BonusEnum相关枚举

BonusEnum相关枚举是VCMI奖励系统中定义奖励类型、来源、持续时间和值类型的枚举集合，用于描述游戏中各种奖励的属性和特征。

## 枚举定义

```cpp
enum class BonusType : uint16_t
{
    // 奖励类型枚举
    NONE,                                         // 无奖励
    ARTIFACT_GROWING,                            // 物品成长
    ARTIFACT_CHARGE,                             // 物品充能
    MOVEMENT,                                    // 移动点数 (子类型为 1 - 陆地, 0 - 海上)
    MORALE,                                      // 士气
    LUCK,                                        // 幸运
    PRIMARY_SKILL,                               // 主属性 (使用子类型选择技能; 附加信息若设置为: 1 - 仅近战, 2 - 仅远程)
    SIGHT_RADIUS,                                // 视野半径
    MANA_REGENERATION,                           // 法力再生 (每回合点数)
    MANA_PERCENTAGE_REGENERATION,                // 百分比法力再生 (每天恢复所有法力点数)
    NONEVIL_ALIGNMENT_MIX,                       // 非邪恶阵营混合 (好人和中立生物可以混合而无士气惩罚)
    SURRENDER_DISCOUNT,                          // 投降折扣 (%)
    STACKS_SPEED,                                // 堆栈速度 (附加信息 - 在直接奖励后应用的速度奖励百分比; >0 - 加, <0 - 减)
    FLYING_MOVEMENT,                             // 飞行移动 (值 - 罚款百分比)
    SPELL_DURATION,                              // 法术持续时间
    WATER_WALKING,                               // 水面行走 (值 - 罚款百分比)
    NEGATE_ALL_NATURAL_IMMUNITIES,               // 取消所有自然免疫
    STACK_HEALTH,                                // 堆栈生命值
    GENERATE_RESOURCE,                           // 生成资源 (每日值, 使用子类型(资源类型))
    CREATURE_GROWTH,                             // 生物增长 (用于军团神器: 值 - 每周增长奖励, 子类型 - 怪物等级)
    WHIRLPOOL_PROTECTION,                        // 漩涡保护 (英雄在通过漩涡传送时不会损失军队)
    SPELL,                                       // 法术 (英雄知道法术, val - 技能等级 (0 - 3), 子类型 - 法术ID)
    SPELLS_OF_LEVEL,                             // 某等级的法术 (英雄知道所有某等级的法术, val - 技能等级; 子类型 - 等级)
    SPELLS_OF_SCHOOL,                            // 某学派的法术 (英雄知道某学派的所有法术, 子类型 - 法术学派; 0 - 气, 1 - 火, 2 - 水, 3 - 土)
    BATTLE_NO_FLEEING,                           // 战斗不逃跑 (用于战争枷锁)
    MAGIC_SCHOOL_SKILL,                          // 魔法学校技能 (例如魔法平原地形, 子类型: 魔法学校 (0 - 全部, 1 - 火, 2 - 气, 4 - 水, 8 - 土), 值 - 等级)
    FREE_SHOOTING,                               // 自由射击 (即使被阻挡也能射击的堆栈)
    OPENING_BATTLE_SPELL,                        // 开战法术 (在战斗开始时施放专家级法术, val - 法术威力, 子类型 - 法术ID)
    IMPROVED_NECROMANCY,                         // 改进亡灵巫术 (召唤更强大的生物: 子类型 - 被召唤的生物类型, 附加信息 - [所需亡灵巫术等级, 所需堆栈等级], val - 亡灵巫术等级)
    CREATURE_GROWTH_PERCENT,                     // 生物增长率百分比 (增加所有城镇的所有单位的增长率, val - 百分比)
    FREE_SHIP_BOARDING,                          // 免费登船 (登船和登陆时保留移动点数)
    FLYING,                                      // 飞行
    SHOOTER,                                     // 射手
    CHARGE_IMMUNITY,                             // 冲锋免疫
    ADDITIONAL_ATTACK,                           // 额外攻击 (val: 执行的额外攻击次数)
    UNLIMITED_RETALIATIONS,                      // 无限反击
    NO_MELEE_PENALTY,                            // 无近战惩罚
    JOUSTING,                                    // 冲锋 (用于冠军)
    HATE,                                        // 仇恨 (例如天使恨恶魔, 子类型 - 被仇恨的生物ID, val - 伤害加成百分比)
    KING,                                        // 国王 (val - 影响所需的杀手奖励值)
    MAGIC_RESISTANCE,                            // 魔法抗性 (以%计算 (值))
    CHANGES_SPELL_COST_FOR_ALLY,                 // 改变盟军法术成本 (以法力点数计算 (值), 例如法师)
    CHANGES_SPELL_COST_FOR_ENEMY,                // 改变敌人法术成本 (以法力点数计算 (值), 例如天马)
    SPELL_AFTER_ATTACK,                          // 攻击后施法 (子类型 - 法术ID, 值 - 几率%, 附加信息[0] - 等级, 附加信息[1] -> [0 - 所有攻击, 1 - 仅射击, 2 - 仅近战], 附加信息[2] -> 多个SPELL_AFTER_ATTACK奖励的法术层)
    SPELL_BEFORE_ATTACK,                         // 攻击前施法 (子类型 - 法术ID, 值 - 几率%, 附加信息[0] - 等级, 附加信息[1] -> [0 - 所有攻击, 1 - 仅射击, 2 - 仅近战], 附加信息[2] -> 多个SPELL_BEFORE_ATTACK奖励的法术层)
    SPELL_RESISTANCE_AURA,                       // 法术抗性光环 (例如独角兽, 值 - 相邻生物的抗性加成%)
    LEVEL_SPELL_IMMUNITY,                        // 等级法术免疫 (生物免疫低于或等于此奖励值的法术)
    BLOCK_MAGIC_ABOVE,                           // 阻止高等级法术 (阻止施放等级>值的法术)
    BLOCK_ALL_MAGIC,                             // 阻止所有法术 (阻止施放法术)
    TWO_HEX_ATTACK_BREATH,                       // 双格攻击呼吸 (例如龙)
    SPELL_DAMAGE_REDUCTION,                      // 法术伤害减免 (例如傀儡, 值 - %减免, 子类型 - 法术学派; -1 - 全部, 0 - 气, 1 - 火, 2 - 水, 3 - 土)
    NO_WALL_PENALTY,                             // 无墙壁惩罚
    NON_LIVING,                                  // 非活物 (例如傀儡, 不能被复活或治疗, 只有中性士气)
    RANDOM_SPELLCASTER,                          // 随机施法者 (例如大师精灵, val - 等级)
    BLOCKS_RETALIATION,                          // 阻止反击 (例如娜迦)
    SPELL_IMMUNITY,                              // 法术免疫 (子ID - 法术ID)
    MANA_CHANNELING,                             // 法力引导 (值%, 例如熟悉)
    SPELL_LIKE_ATTACK,                           // 类法术攻击 (子类型 - 法术, 值 - 法术等级; 范围来自法术, 但伤害来自生物; 例如玛戈格)
    THREE_HEADED_ATTACK,                         // 三头攻击 (例如地狱犬)
    GENERAL_DAMAGE_PREMY,                        // 一般伤害预处理
    MIND_IMMUNITY,                               // 心智免疫
    FIRE_SHIELD,                                 // 火焰护盾
    UNDEAD,                                      // 亡灵
    HP_REGENERATION,                             // 生命再生 (生物每轮重生val HP)
    MANA_DRAIN,                                  // 法力汲取 (值 - 每回合法力点数)
    LIFE_DRAIN,                                  // 生命汲取
    DOUBLE_DAMAGE_CHANCE,                        // 双倍伤害几率 (值%, 例如恐惧骑士)
    RETURN_AFTER_STRIKE,                         // 击打后返回
    SPELLCASTER,                                 // 施法者 (子类型 - 法术ID, 值 - 学校等级, 附加信息 - 加权机会. 使用SPECIFIC_SPELL_POWER, CREATURE_SPELL_POWER或CREATURE_ENCHANT_POWER计算威力)
    CATAPULT,                                    // 投石机
    ENEMY_DEFENCE_REDUCTION,                     // 敌人防御降低 (%, 例如贝希摩斯)
    GENERAL_DAMAGE_REDUCTION,                    // 一般伤害减免 (护盾/空气护盾效果, 也适用于装甲师/石化效果, 子类型-1)
    GENERAL_ATTACK_REDUCTION,                    // 一般攻击降低 (例如石化或失明时 - %, 子类型未使用, 仅使用近战/远程战斗)
    DEFENSIVE_STANCE,                            // 防御姿态 (val - 防御时的防御加成)
    ATTACKS_ALL_ADJACENT,                        // 攻击所有相邻单位 (例如九头蛇)
    MORE_DAMAGE_FROM_SPELL,                      // 来自法术的更多伤害 (值 - %伤害增加, 子类型 - 法术ID)
    FEARFUL,                                     // 恐惧
    LIVING,                                      // 活物
    NO_DISTANCE_PENALTY,                         // 无距离惩罚
    ENCHANTER,                                   // 附魔师 (用于附魔师法术, val - 技能等级, 子类型 - 法术ID, 附加信息 - 冷却时间)
    HEALER,                                      // 治疗师
    SIEGE_WEAPON,                                // 攻城武器
    HYPNOTIZED,                                  // 被催眠
    NO_RETALIATION,                              // 无反击 (临时奖励, 用于 Basilisk, 独角兽和蝎狮麻痹)
    ADDITIONAL_RETALIATION,                      // 额外反击 (值 - 额外反击次数)
    MAGIC_MIRROR,                                // 魔法镜 (值 - 重定向几率%)
    ALWAYS_MINIMUM_DAMAGE,                       // 总是最小伤害 (单位造成最小伤害; 子类型: -1 - 任何攻击, 0 - 近战, 1 - 远程, 值: 额外伤害惩罚, 附加信息 - 伤害的乘法反加成%)
    ALWAYS_MAXIMUM_DAMAGE,                       // 总是最大伤害 (例如祝福效果, 子类型: -1 - 任何攻击, 0 - 近战, 1 - 远程, 值: 额外伤害, 附加信息 - 伤害的乘法加成%)
    ATTACKS_NEAREST_CREATURE,                    // 攻击最近的生物 (狂暴时)
    IN_FRENZY,                                   // 狂暴 (值 - 等级)
    SLAYER,                                      // 屠杀者 (值 - 等级)
    FORGETFULL,                                  // 健忘 (遗忘术效果, 值 - 等级)
    NOT_ACTIVE,                                  // 不活跃 (子类型 - 法术ID (麻痹, 失明, 石化凝视) 用于图形效果)
    NO_LUCK,                                     // 无幸运 (例如在诅咒地上战斗时)
    NO_MORALE,                                   // 无士气 (例如在诅咒地上战斗时)
    DARKNESS,                                    // 黑暗 (val = 半径)
    SPECIAL_SPELL_LEV,                           // 特殊法术等级 (子类型 = ID, val = 每级百分比值)
    SPELL_DAMAGE,                                // 法术伤害 (val = 值, 现在用于附魔, 子类型 - 法术学派; -1 - 全部, 0 - 气, 1 - 火, 2 - 水, 3 - 土)
    SPECIFIC_SPELL_DAMAGE,                       // 特定法术伤害 (子类型 = ID, val = 值)
    SPECIAL_PECULIAR_ENCHANT,                    // 特殊独特附魔 (祝福和诅咒, ID = val, 依赖于单位等级, 子类型 = 0 或 1 用于科罗尼乌斯)
    SPECIAL_UPGRADE,                             // 特殊升级 (子类型 = 基础, 附加信息 = 目标)
    DRAGON_NATURE,                               // 龙族本质
    CREATURE_DAMAGE,                             // 生物伤害 (子类型 0 = 两者, 1 = 最小, 2 = 最大)
    SHOTS,                                       // 射击
    DEATH_STARE,                                 // 死亡凝视 (子类型 0 - 石像鬼, 1 - 指挥官)
    POISON,                                      // 毒素 (val - 可能的最大中毒伤害)
    BIND_EFFECT,                                 // 绑定效果 (不做特别的事情, 作为标记使用)
    ACID_BREATH,                                 // 酸液呼吸 (攻击后每生物额外val伤害, 附加信息 - 几率%)
    RECEPTIVE,                                   // 接受 (即使有免疫也能接受友好法术)
    CASTS,                                       // 施法次数 (生物可以施放激活法术多少次)
    SPECIFIC_SPELL_POWER,                        // 特定法术威力 (用于雷电和复活术, 子类型 - 法术ID)
    CREATURE_SPELL_POWER,                        // 生物法术威力 (每单位值, 除以100, 所以仙女龙是800)
    CREATURE_ENCHANT_POWER,                      // 生物附魔威力 (生物施放的法术总持续时间)
    ENCHANTED,                                   // 附魔 (永久附魔, 用subID法术等级=val, 如果val > 3则法术是大规模的, 等级为val-3)
    REBIRTH,                                     // 重生 (val - 恢复的生命百分比, 子类型 = 0 - 常规, 1 - 至少一个单位 (神圣凤凰))
    DISGUISED,                                   // 伪装 (子类型 - 法术等级)
    VISIONS,                                     // 视野 (子类型 - 法术等级)
    NO_TERRAIN_PENALTY,                          // 无地形惩罚 (子类型 - 地形类型)
    SOUL_STEAL,                                  // 灵魂窃取 (val - 每杀一个敌人获得单位数, 子类型 = 0 - 获得的单位在战斗后生存, 1 - 不生存)
    TRANSMUTATION,                               // 变形 (val - 触发几率%, 子类型 = 0 - 基于HP复活, 1 - 基于单位数量, 附加信息 - 目标生物ID(默认攻击者))
    SUMMON_GUARDIANS,                            // 召唤守卫 (val - 堆栈计数的%, 子类型 = 生物ID)
    CATAPULT_EXTRA_SHOTS,                        // 投石机额外射击 (val - 投石机效果威力, 需要CATAPULT奖励才能工作)
    RANGED_RETALIATION,                          // 远程反击 (允许射手进行远程反击)
    BLOCKS_RANGED_RETALIATION,                   // 阻止远程反击 (阻止射手单位进行远程反击, BLOCKS_RETALIATION奖励仅用于近战反击)
    MANUAL_CONTROL,                                // 手动控制 (手动控制ID=subtype的战争机器, 机会=val)
    WIDE_BREATH,                                 // 广域呼吸 (初始设计: 龙息影响多个附近六角格)
    FIRST_STRIKE,                                // 先手攻击 (第一次反击, 然后如果可能就攻击)
    VULNERABLE_FROM_BACK,                        // 背后脆弱 (从背后攻击的额外伤害)
    SHOOTS_ALL_ADJACENT,                         // 射击所有相邻 (类似H4独眼巨人的射击, 攻击目标附近的所有六角格)
    BLOCK_MAGIC_BELOW,                           // 阻止低级法术 (阻止施放等级<值的法术)
    DESTRUCTION,                                 // 摧毁 (命中后杀死额外单位, 子类型 = 0 - 杀死百分比单位, 1 - 杀死数量, val = 触发几率%, 附加信息 - 要杀死的数量/百分比)
    SPECIAL_CRYSTAL_GENERATION,                  // 特殊水晶生成 (水晶龙水晶生成)
    NO_SPELLCAST_BY_DEFAULT,                     // 默认不施法 (默认攻击选项不包括施法)
    SKELETON_TRANSFORMER_TARGET,                 // 骷髅变形器目标 (用于骷髅变形器)
    SPECIAL_ADD_VALUE_ENCHANT,                   // 特殊附加值附魔 (像Aenin一样的专业法术, 法术效果增强, 附加信息 = 要添加的值)
    SPECIAL_FIXED_VALUE_ENCHANT,                 // 特殊固定值附魔 (像Melody一样的专业法术, 恒定法术效果(如3点运气), 附加信息 = 要固定的值)
    THIEVES_GUILD_ACCESS,                        // 盗贼公会访问
    LIMITED_SHOOTING_RANGE,                      // 限制射击范围 (限制射击生物的范围, 不调整任何其他机制(半伤vs全伤等). val - 范围(六角格), 附加信息 - 破箭机制的新范围)
    LEARN_BATTLE_SPELL_CHANCE,                   // 学习战斗法术几率 (技能无关鹰眼几率. 子类型 = 0 - 从敌人, 1 - TODO: 从整个战场)
    LEARN_BATTLE_SPELL_LEVEL_LIMIT,              // 学习战斗法术等级限制 (技能无关鹰眼限制, 子类型 - 学校(-1为全部), 其他TODO)
    PERCENTAGE_DAMAGE_BOOST,                     // 百分比伤害增强 (技能无关弓术和进攻, 子类型为0为进攻, 1为弓术)
    LEARN_MEETING_SPELL_LIMIT,                   // 学习见面法术限制 (技能无关学者, 子类型为-1为全部, 其他TODO)
    ROUGH_TERRAIN_DISCOUNT,                      // 粗糙地形折扣 (技能无关寻路)
    WANDERING_CREATURES_JOIN_BONUS,              // 游荡生物加入奖励 (技能无关外交)
    BEFORE_BATTLE_REPOSITION,                    // 战前重定位 (技能无关战术, 允许战术的奖励)
    BEFORE_BATTLE_REPOSITION_BLOCK,              // 战前重定位阻断 (技能无关战术, 阻止相反战术的奖励. 双方战术现在是TODO.)
    HERO_EXPERIENCE_GAIN_PERCENT,                // 英雄经验获得百分比 (技能无关学习, 我们也可以将其用作全局效果)
    UNDEAD_RAISE_PERCENTAGE,                     // 亡灵复活百分比 (战斗后被杀敌人生物的百分比将被转化为亡灵)
    MANA_PER_KNOWLEDGE_PERCENTAGE,               // 每知识百分比法力 (将英雄知识转化为10法力的百分比率, 用于智慧和全局奖励)
    HERO_GRANTS_ATTACKS,                         // 英雄授予攻击 (如果英雄可以向生物授予额外攻击, 值是攻击次数, 子类型是生物ID)
    BONUS_DAMAGE_PERCENTAGE,                     // 额外伤害百分比 (如果英雄可以向生物授予条件伤害, 值是百分比, 子类型是生物ID)
    BONUS_DAMAGE_CHANCE,                         // 额外伤害几率 (如果英雄可以向生物授予额外伤害, 值是几率, 子类型是生物ID)
    MAX_LEARNABLE_SPELL_LEVEL,                   // 最大学习法术等级 (这可以作为智慧的替代品. val = 最大学习法术等级)
    SPELL_SCHOOL_IMMUNITY,                       // 法术学派免疫 (此奖励将作为所有法术的法术学派免疫, 子类型 - 法术学派: 0 - 气, 1 - 火, 2 - 水, 3 - 土. 任意未处理以减少与LEVEL_SPELL_IMMUNITY的重叠)
    NEGATIVE_EFFECTS_IMMUNITY,                   // 负面效果免疫 (此奖励将作为来自法术的负面效果的法术学派免疫, 子类型 - 法术学派: -1 - 任意, 0 - 气, 1 - 火, 2 - 水, 3 - 土)
    TERRAIN_NATIVE,                              // 原生地形
    UNLIMITED_MOVEMENT,                          // 无限移动 (作弊奖励)
    MAX_MORALE,                                  // 最大士气 (作弊奖励)
    MAX_LUCK,                                    // 最大幸运 (作弊奖励)
    FEROCITY,                                    // 凶猛 (额外攻击, 仅当攻击目标单位时至少杀死一些生物, val = 额外攻击次数, 附加信息 = 触发所需的生物数量(默认1))
    ENEMY_ATTACK_REDUCTION,                      // 敌人攻击减少 (%, 例如Nix (HotA))
    REVENGE,                                     // 复仇 (基于堆栈中死亡单位数量的额外伤害)
    RESOURCES_CONSTANT_BOOST,                    // 资源恒定增强 (不考虑传播并提供额外资源/天的奖励. val - 资源量, 子类型 - 资源类型)
    RESOURCES_TOWN_MULTIPLYING_BOOST,            // 资源城镇乘数增强 (不考虑传播并提供额外资源/天的奖励, 数量乘以拥有的城镇数量. val - 乘以城镇数量的基础资源量, 子类型 - 资源类型)
    DISINTEGRATE,                                // 分解 (死后不留尸体)
    INVINCIBLE,                                  // 无敌 (不能成为攻击或法术的目标)
    MECHANICAL,                                  // 机械 (例如工厂生物, 不能被复活或治疗, 只有中性士气, 工程师可修复)
    PRISM_HEX_ATTACK_BREATH,                     // 棱镜六角攻击呼吸
    BASE_TILE_MOVEMENT_COST,                     // 基础瓷砖移动成本 (越野移动的最低成本)
    HERO_SPELL_CASTS_PER_COMBAT_TURN,            // 英雄战斗回合施法次数
    MULTIHEX_UNIT_ATTACK,                        // 多六角单位攻击
    MULTIHEX_ENEMY_ATTACK,                       // 多六角敌人攻击
    MULTIHEX_ANIMATION,                          // 多六角动画
    STACK_EXPERIENCE_GAIN_PERCENT,               // 堆栈经验获得百分比 (修改所有堆栈经验收益)
    FULL_MAP_SCOUTING,                           // 全图侦察 (天空船)
    FULL_MAP_DARKNESS,                           // 全图黑暗 (与天空船相反)
    TRANSMUTATION_IMMUNITY,                      // 变形免疫 (阻止变形成效)
    COMBAT_MANA_BONUS,                           // 战斗法力奖励 (战斗中额外法力)
    SPECIFIC_SPELL_RANGE,                        // 特定法术范围 (用于允许的法术范围, 子类型 - 法术ID)
    HATES_TRAIT,                                 // 仇恨特质 (受影响单位对具有特定奖励的单位造成额外伤害. 子类型 - 奖励, val - 伤害加成百分比)
    DAMAGE_RECEIVED_CAP,                         // 受伤上限 (限制对受影响单位造成的伤害)
    FORCE_NEUTRAL_ENCOUNTER_STACK_COUNT,         // 强制中立遭遇堆栈计数 (强制英雄-中立遭遇中的中立堆栈数量)
    
    BUILTIN_BONUSES_COUNT // 内置奖励计数
};

// 奖励来源枚举
enum class BonusSource : uint8_t
{
    ARTIFACT,             // 物品
    ARTIFACT_INSTANCE,    // 物品实例
    OBJECT_TYPE,          // 对象类型
    OBJECT_INSTANCE,      // 对象实例
    CREATURE_ABILITY,     // 生物能力
    TERRAIN_NATIVE,       // 原生地形
    TERRAIN_OVERLAY,      // 地形覆盖
    SPELL_EFFECT,         // 法术效果
    TOWN_STRUCTURE,       // 城镇建筑
    HERO_BASE_SKILL,      // 英雄基础技能
    SECONDARY_SKILL,      // 次要技能
    HERO_SPECIAL,         // 英雄特殊能力
    ARMY,                 // 军队
    CAMPAIGN_BONUS,       // 战役奖励
    STACK_EXPERIENCE,     // 堆栈经验
    COMMANDER,            // 指挥官
    GLOBAL,               // 全局 (用于所有英雄或所有堆栈都应该有的基础奖励)
    OTHER,                // 其他 (用于防御姿态和法术等级限制的默认值)
    
    NUM_BONUS_SOURCE      // 此为虚拟值，始终在最后
};

// 奖励持续时间枚举
namespace BonusDuration
{
    using Type = uint16_t;
    constexpr size_t Size = 11;

    enum BonusDuration : Type {
        PERMANENT = 1 << 0,           // 永久
        ONE_BATTLE = 1 << 1,          // 一场战斗 (战斗结束时)
        ONE_DAY = 1 << 2,             // 一天 (一天结束时)
        ONE_WEEK = 1 << 3,            // 一周 (一周结束时，不是7天)
        N_TURNS = 1 << 4,             // N回合 (用于战斗中, 战斗后奖励总是被移除)
        N_DAYS = 1 << 5,              // N天
        UNTIL_BEING_ATTACKED = 1 << 6, // 直到被攻击 (攻击和反击后移除)
        UNTIL_ATTACK = 1 << 7,        // 直到攻击 (攻击和反击后移除)
        STACK_GETS_TURN = 1 << 8,     // 堆栈获得回合 (当堆栈获得回合时移除 - 用于防御姿态)
        COMMANDER_KILLED = 1 << 9,    // 指挥官被杀时移除
        UNTIL_OWN_ATTACK = 1 << 10    // 直到自己的攻击 (攻击后移除(非反击))
    };
};

// 奖励限制效果枚举
enum class BonusLimitEffect : uint8_t
{
    NO_LIMIT = 0,              // 无限制
    ONLY_DISTANCE_FIGHT = 1,   // 仅远程战斗
    ONLY_MELEE_FIGHT          // 仅近战战斗
};

// 奖励值类型枚举
enum class BonusValueType : uint8_t
{
    ADDITIVE_VALUE,        // 加法值
    BASE_NUMBER,           // 基础数字
    PERCENT_TO_ALL,        // 对全部的百分比
    PERCENT_TO_BASE,       // 对基础的百分比
    PERCENT_TO_SOURCE,     // 对来源的百分比 (仅对同来源的奖励添加值)
    PERCENT_TO_TARGET_TYPE, // 对目标类型的百分比 (仅对SourceType目标的奖励添加值)
    INDEPENDENT_MAX,       // 独立最大值 (用于SPELL奖励)
    INDEPENDENT_MIN        // 独立最小值 (用于SECONDARY_SKILL_PREMY奖励)
};

// 奖励节点类型枚举
enum class BonusNodeType
{
    NONE = -1,              // 无
    UNKNOWN,                // 未知
    STACK_INSTANCE,         // 堆栈实例
    STACK_BATTLE,           // 战斗堆栈
    ARMY,                   // 军队
    ARTIFACT,               // 物品
    CREATURE,               // 生物
    ARTIFACT_INSTANCE,      // 物品实例
    HERO,                   // 英雄
    PLAYER,                 // 玩家
    TEAM,                   // 队伍
    TOWN_AND_VISITOR,       // 城镇与访客
    BATTLE_WIDE,            // 战场范围
    COMMANDER,              // 指挥官
    GLOBAL_EFFECTS,         // 全局效果
    BOAT,                   // 船只
    TOWN                    // 城镇
};
```

## 功能说明

BonusEnum相关枚举是VCMI奖励系统的核心组成部分，定义了奖励的各种属性类型。这些枚举用于描述奖励的种类、来源、持续时间、值类型和节点类型，构成了奖励系统的基础架构。

## BonusType枚举

定义了所有可能的奖励类型，从基本的移动、士气、幸运到复杂的特殊能力如龙族本质、变形等。每个奖励类型都有其独特的用途和效果，是奖励系统中最重要的部分。

## BonusSource枚举

定义了奖励的来源，如物品、生物能力、法术效果、城镇建筑等。这些来源决定了奖励是如何被应用到游戏对象上的。

## BonusDuration枚举

定义了奖励的持续时间，使用位掩码实现，可以组合多个持续时间类型。包括永久、一场战斗、一天、一周等不同类型。

## BonusLimitEffect枚举

定义了奖励的限制效果，用于控制奖励在特定情况下（如仅远程战斗或仅近战战斗）的应用。

## BonusValueType枚举

定义了奖励值的计算方式，包括加法、百分比、独立最大值/最小值等不同计算方式。

## BonusNodeType枚举

定义了奖励节点的类型，用于确定奖励应用到哪个游戏对象层级。

## 设计说明

这些枚举共同构成了VCMI奖励系统的完整框架，允许系统处理各种复杂的奖励效果，从简单的属性加成到复杂的特殊能力。通过这些枚举的组合，游戏可以实现丰富多样的奖励效果，同时保持代码的清晰和可维护性。