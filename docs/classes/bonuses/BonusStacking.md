# Bonus::Stacking枚举

Bonus::Stacking枚举是VCMI中奖励堆叠类型的定义，用于区分奖励在同一目标上如何累积。

## 类定义

```cpp
enum class DLL_LINKAGE Bonus::Stacking
{
    EMPTY,              // 无堆叠
    GENERAL,            // 一般堆叠
    WEAPON,             // 武器堆叠
    SPELL_EFFECT,       // 法术效果堆叠
    SPELL_LIKE_ATTACK,  // 类攻击法术堆叠
    PRIZM,              // 棱镜堆叠
    ARMOUR,             // 护甲堆叠
    AMULET,             // 护符堆叠
    RING,               // 戒指堆叠
    TENTACLE,           // 触手堆叠
    HELMET,             // 头盔堆叠
    SPELLBOOK,          // 法术书堆叠
    SHIELD,             // 盾牌堆叠
    BEHIND,             // 后排堆叠
    SECOND,             // 第二件装备堆叠
    BOOT,               // 靴子堆叠
    GLOVE,              // 手套堆叠
    BIRD,               // 鸟类堆叠
    BACKPACK,           // 背包堆叠
    NECK,               // 项链堆叠
    BODY,               // 身体堆叠
    HORSE,              // 马匹堆叠
    LEFT,               // 左手堆叠
    RIGHT,              // 右手堆叠
    MONSTER_DEATH,      // 怪物死亡堆叠
    CUSTOM,             // 自定义堆叠
    GLOBAL,             // 全局堆叠
    HERO_SPECIAL,       // 英雄特殊堆叠
    ARTIFACT,           // 神器堆叠
    CREATURE_ABILITY,   // 生物能力堆叠
    SPELL,              // 法术堆叠
    MIND_SPELL_IMMUNITY,// 心智法术免疫堆叠
    CURSE_SPELL_IMMUNITY,// 诅咒法术免疫堆叠
    NATURAL_MAGIC_IMMUNITY,// 自然魔法免疫堆叠
    LEVEL_SPELL_IMMUNITY,// 等级法术免疫堆叠
    SCHOOL_SPELL_IMMUNITY,// 学派法术免疫堆叠
    SPECIFIC_SPELL_IMMUNITY,// 特定法术免疫堆叠
    PLAYER_ENCHANT,     // 玩家附魔堆叠
    GLOBAL_ENCHANT,     // 全局附魔堆叠
    BATTLE_ENCHANT,     // 战斗附魔堆叠
    COMMANDER_ENCHANT,  // 指挥官附魔堆叠
    SPELL_EFFECT_AURA,  // 法术效果光环堆叠
    UNIT_STACKFIELD,    // 单位堆栈字段堆叠
    UNIT_FACTION,       // 单位派系堆叠
    UNIT_TYPE,          // 单位类型堆叠
    CREATURE_NATIVE_TERRAIN, // 生物原生地形堆叠
    CREATURE_CURSED,    // 生物诅咒堆叠
    GLOBAL_ANIMATION,   // 全局动画堆叠
    SPELL_SCHOOL,       // 法术学派堆叠
    SKILL,              // 技能堆叠
    SECONDARY_SKILL,    // 次要技能堆叠
    PRIMARY_STACK,      // 主堆栈堆叠
    TERTIARY_SKILL,     // 三级技能堆叠
    THRESHOLD,          // 阈值堆叠
    THRESHOLD_SUM,      // 阈值总和堆叠
    HERO,               // 英雄堆叠
    GLOBAL_EFFECT,      // 全局效果堆叠
    MORALE,             // 士气堆叠
    LUCK,               // 幸运堆叠
    NATURAL,            // 自然堆叠
    INTERNAL,           // 内部堆叠
    STATIC,             // 静态堆叠
    SELECTOR,           // 选择器堆叠
    LIMITER,            // 限制器堆叠
    UPDATER,            // 更新器堆叠
    PROPAGATOR,         // 传播器堆叠
    OWNER,              // 所有者堆叠
    NODE,               // 节点堆叠
    NODE_VALUE,         // 节点值堆叠
    BATTLE_STATE,       // 战斗状态堆叠
    BATTLE_CONTEXT,     // 战斗上下文堆叠
    GAME_STATE,         // 游戏状态堆叠
    GAME_CONTEXT,       // 游戏上下文堆叠
    PLAYER,             // 玩家堆叠
    OBJECT,             // 对象堆叠
    CREATURE,           // 生物堆叠
    HERO_BASE,          // 英雄基础堆叠
    TOWN,               // 城镇堆叠
    FACTION,            // 派系堆叠
    ARTIFACT_INSTANCE,  // 神器实例堆叠
    SPELL_INSTANCE,     // 法术实例堆叠
    RESOURCE,           // 资源堆叠
    PLAYER_SETTING,     // 玩家设置堆叠
    BATTLE_ONLY,        // 仅战斗堆叠
    ADVMAP_ONLY,        // 仅冒险地图堆叠
    SPECIAL_PECULIARITY,// 特殊特性堆叠
    TERRAIN,            // 地形堆叠
    WEATHER,            // 天气堆叠
    SEASON,             // 季节堆叠
    CLIMATE,            // 气候堆叠
    ENVIRONMENT,        // 环境堆叠
    LOCATION,           // 位置堆叠
    PROXIMITY,          // 临近堆叠
    DISTANCE,           // 距离堆叠
    DIRECTION,          // 方向堆叠
    TIME,               // 时间堆叠
    CALENDAR,           // 日历堆叠
    PHASE,              // 阶段堆叠
    ROUND,              // 回合堆叠
    TURN,               // 轮次堆叠
    ACTION,             // 行动堆叠
    EVENT,              // 事件堆叠
    CONDITION,          // 条件堆叠
    REQUIREMENT,        // 要求堆叠
    PREREQUISITE,       // 先决条件堆叠
    CONSEQUENCE,        // 后果堆叠
    EFFECT,             // 效果堆叠
    MECHANISM,          // 机制堆叠
    RULE,               // 规则堆叠
    FACT,               // 事实堆叠
    BELIEF,             // 信仰堆叠
    CONCEPT,            // 概念堆叠
    ABSTRACTION,        // 抽象堆叠
    ENTITY,             // 实体堆叠
    AGENT,              // 代理堆叠
    ACTOR,              // 行动者堆叠
    ROLE,               // 角色堆叠
    STATUS,             // 状态堆叠
    PROPERTY,           // 属性堆叠
    ATTRIBUTE,          // 属性堆叠
    FEATURE,            // 特征堆叠
    CAPACITY,           // 容量堆叠
    POTENTIAL,          // 潜力堆叠
    CAPABILITY,         // 能力堆叠
    UTILITY,            // 实用堆叠
    EFFICIENCY,         // 效率堆叠
    PERFORMANCE,        // 性能堆叠
    QUALITY,            // 质量堆叠
    VALUE,              // 价值堆叠
    COST,               // 成本堆叠
    PRICE,              // 价格堆叠
    RATE,               // 比率堆叠
    COEFFICIENT,        // 系数堆叠
    FACTOR,             // 因子堆叠
    MULTIPLIER,         // 乘数堆叠
    DIVISOR,            // 除数堆叠
    MODULUS,            // 模数堆叠
    EXPONENT,           // 指数堆叠
    BASE,               // 基数堆叠
    POWER,              // 幂堆叠
    ROOT,               // 根堆叠
    LOGARITHM,          // 对数堆叠
    SINE,               // 正弦堆叠
    COSINE,             // 余弦堆叠
    TANGENT,            // 正切堆叠
    ARCSINE,            // 反正弦堆叠
    ARCCOSINE,          // 反余弦堆叠
    ARCTANGENT,         // 反正切堆叠
    HYPERBOLIC_SINE,    // 双曲正弦堆叠
    HYPERBOLIC_COSINE,  // 双曲余弦堆叠
    HYPERBOLIC_TANGENT, // 双曲正切堆叠
    INVERSE_HYPERBOLIC_SINE, // 反双曲正弦堆叠
    INVERSE_HYPERBOLIC_COSINE, // 反双曲余弦堆叠
    INVERSE_HYPERBOLIC_TANGENT, // 反双曲正切堆叠
    POLYNOMIAL,         // 多项式堆叠
    EXPONENTIAL,        // 指数堆叠
    LOGARITHMIC,        // 对数堆叠
    TRIGONOMETRIC,      // 三角函数堆叠
    HYPERBOLIC,         // 双曲函数堆叠
    STATISTICAL,        // 统计堆叠
    PROBABILISTIC,      // 概率堆叠
    RANDOM,             // 随机堆叠
    DETERMINISTIC,      // 确定性堆叠
    STOCHASTIC,         // 随机过程堆叠
    MARKOVIAN,          // 马尔可夫堆叠
    BAYESIAN,           // 贝叶斯堆叠
    FUZZY,              // 模糊堆叠
    CRISP,              // 精确堆叠
    BOOLEAN,            // 布尔堆叠
    LOGICAL,            // 逻辑堆叠
    SET_THEORETIC,      // 集合论堆叠
    CATEGORICAL,        // 分类堆叠
    ORDINAL,            // 序数堆叠
    CARDINAL,           // 基数堆叠
    NOMINAL,            // 名义堆叠
    INTERVAL,           // 区间堆叠
    RATIO,              // 比率堆叠
    SCALE,              // 比例堆叠
    MEASUREMENT,        // 测量堆叠
    METRIC,             // 度量堆叠
    TOPOLOGICAL,        // 拓扑堆叠
    GEOMETRIC,          // 几何堆叠
    ALGEBRAIC,          // 代数堆叠
    ARITHMETIC,         // 算术堆叠
    COMBINATORIAL,      // 组合堆叠
    PERMUTATIONAL,      // 排列堆叠
    COMBINATIONAL,      // 组合堆叠
    SEQUENTIAL,         // 顺序堆叠
    PARALLEL,           // 并行堆叠
    CONCURRENT,         // 并发堆叠
    DISTRIBUTED,        // 分布式堆叠
    NETWORK,            // 网络堆叠
    GRAPH,              // 图堆叠
    TREE,               // 树堆叠
    LATTICE,            // 格堆叠
    MATRIX,             // 矩阵堆叠
    VECTOR,             // 向量堆叠
    TENSOR,             // 张量堆叠
    SCALAR,             // 标量堆叠
    FIELD,              // 字段堆叠
    RING_STRUCTURE,     // 环结构堆叠
    GROUP,              // 群堆叠
    SEMIGROUP,          // 半群堆叠
    MONOID,             // 幺半群堆叠
    CATEGORY,           // 范畴堆叠
    FUNCTOR,            // 函子堆叠
    NATURAL_TRANSFORMATION, // 自然变换堆叠
    ADJUNCTION,         // 伴随堆叠
    TRIANGLE,           // 三角堆叠
    SQUARE,             // 正方形堆叠
    PENTAGON,           // 五边形堆叠
    HEXAGON,            // 六边形堆叠
    OCTAGON,            // 八边形堆叠
    CIRCLE,             // 圆形堆叠
    ELLIPSE,            // 椭圆堆叠
    PARABOLA,           // 抛物线堆叠
    HYPERBOLA,          // 双曲线堆叠
    SPIRAL,             // 螺旋堆叠
    HELIX,              // 螺旋堆叠
    CYCLOID,            // 摆线堆叠
    CARDIOID,           // 心形线堆叠
    ASTROID,            // 星形线堆叠
    NEPHRoid,           // 肾形线堆叠
    EPICYCLOID,         // 外摆线堆叠
    HYPOCYCLOID,        // 内摆线堆叠
    TROCHOID,           // 圆周曲线堆叠
    INVOLUTE,           // 渐开线堆叠
    EVOLUTE,            // 渐屈线堆叠
    ENVELOPE,           // 包络线堆叠
    PEDAL,              // 极线堆叠
    CAUSTIC,            // 焦散线堆叠
    ORTHOTOMIC,         // 正交曲线堆叠
    ISOPTERIC,          // 等光曲线堆叠
    EQUIANGULAR,        // 等角曲线堆叠
    LOGARITHMIC_SPIRAL, // 对数螺旋堆叠
    FERMAT_SPIRAL,      // 费马螺旋堆叠
    HYPERBOLIC_SPIRAL,  // 双曲螺旋堆叠
    LITUUS,             // 祭司权杖线堆叠
    CORNU_SPIRAL,       // 科努螺旋堆叠
    SPIRAL_OF_ARCHIMEDES,// 阿基米德螺旋堆叠
    HYPERBOLA_RECTANGULAR,// 矩形双曲线堆叠
    CISSOID,            // 蔓叶线堆叠
    STROPHOID,          // 斜航线堆叠
    TRISSECTRIX,        // 三分线堆叠
    QUADRATRIX,         // 方形线堆叠
    CUBATRIX,           // 立方线堆叠
    QUINTATRIX,         // 五次方线堆叠
    SEXTATRIX,          // 六次方线堆叠
    SEPTATRIX,          // 七次方线堆叠
    OCTATRIX,           // 八次方线堆叠
    NONATRIX,           // 九次方线堆叠
    DECATRIX,           // 十次方线堆叠
    // ... 更多类型
};
```

## 功能说明

Bonus::Stacking是VCMI奖励系统中用于定义奖励如何堆叠的枚举。它确定了具有相同堆叠类型的奖励是否会在同一目标上累积，以及如何累积。这个枚举不仅包括游戏内实际使用的堆叠类型，还包含许多数学和理论概念，以支持复杂的奖励交互。

## 枚举值

该枚举包含多种堆叠类型，大致可分为以下几类：

- 装备部位：如WEAPON, ARMOUR, HELMET, SHIELD等
- 法术效果：如SPELL_EFFECT, SPELL_LIKE_ATTACK等
- 游戏机制：如GENERAL, CUSTOM, GLOBAL等
- 物品类别：如AMULET, RING, BOOT, GLOVE等
- 生物相关：如CREATURE_ABILITY, CREATURE_NATIVE_TERRAIN等
- 抽象概念：从数学函数到几何图形等高级概念