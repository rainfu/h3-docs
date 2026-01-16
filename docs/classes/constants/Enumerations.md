# Enumerations相关枚举

Enumerations相关枚举是VCMI系统中定义的各种枚举类型集合，涵盖了游戏中几乎所有的重要常量和状态值。

## 枚举定义

```cpp
enum class EAlignment : int8_t
{
    ANY = -1,    // 任意阵营
    GOOD = 0,    // 善良阵营
    EVIL,        // 邪恶阵营
    NEUTRAL      // 中立阵营
};

namespace BuildingSubID
{
    enum EBuildingSubID
    {
        DEFAULT = -50,            // 默认值
        NONE = -1,               // 无
        CASTLE_GATE,             // 城堡大门
        MYSTIC_POND,             // 神秘池塘
        LIBRARY,                 // 图书馆
        PORTAL_OF_SUMMONING,     // 召唤之门
        ESCAPE_TUNNEL,           // 逃生隧道
        TREASURY,                // 金库
        BANK,                    // 银行
        AURORA_BOREALIS,         // 极光
        DEITY_OF_FIRE            // 火神殿
    };
}

enum class EMarketMode : int8_t
{
    RESOURCE_RESOURCE,           // 资源换资源
    RESOURCE_PLAYER,             // 资源换玩家
    CREATURE_RESOURCE,           // 生物换资源
    RESOURCE_ARTIFACT,           // 资源换神器
    ARTIFACT_RESOURCE,           // 神器换资源
    ARTIFACT_EXP,                // 神器换经验
    CREATURE_EXP,                // 生物换经验
    CREATURE_UNDEAD,             // 生物换亡灵
    RESOURCE_SKILL,              // 资源换技能
    MARKET_AFTER_LAST_PLACEHOLDER // 市场模式占位符
};

enum class EAiTactic : int8_t
{
    NONE = -1,    // 无战术
    RANDOM = 0,   // 随机
    WARRIOR = 1,  // 战士
    BUILDER = 2,  // 建设者
    EXPLORER = 3  // 探索者
};

enum class EBuildingState : int8_t
{
    HAVE_CAPITAL,        // 拥有首都
    NO_WATER,            // 没有水
    FORBIDDEN,           // 禁止
    ADD_MAGES_GUILD,     // 添加法师公会
    ALREADY_PRESENT,     // 已存在
    CANT_BUILD_TODAY,    // 今天无法建造
    NO_RESOURCES,        // 资源不足
    ALLOWED,             // 允许
    PREREQUIRES,         // 前置条件
    MISSING_BASE,        // 缺少基础建筑
    BUILDING_ERROR,      // 建筑错误
    TOWN_NOT_OWNED       // 城镇未拥有
};

enum class ESpellCastProblem : int8_t
{
    OK,                           // 无问题
    NO_HERO_TO_CAST_SPELL,        // 没有英雄施法
    CASTS_PER_TURN_LIMIT,         // 每回合施法次数限制
    NO_SPELLBOOK,                 // 没有法术书
    HERO_DOESNT_KNOW_SPELL,       // 英雄不知道法术
    NOT_ENOUGH_MANA,              // 法力不足
    ADVMAP_SPELL_INSTEAD_OF_BATTLE_SPELL, // 冒险地图法术而非战斗法术
    SPELL_LEVEL_LIMIT_EXCEEDED,   // 法术等级超出限制
    NO_SPELLS_TO_DISPEL,          // 没有可驱散的法术
    NO_APPROPRIATE_TARGET,        // 没有合适的目标
    STACK_IMMUNE_TO_SPELL,        // 堆栈免疫法术
    WRONG_SPELL_TARGET,           // 法术目标错误
    ONGOING_TACTIC_PHASE,         // 进行中的战术阶段
    MAGIC_IS_BLOCKED,             // 魔法被阻断
    INVALID                       // 无效
};

namespace ECommander
{
    enum SecondarySkills {ATTACK, DEFENSE, HEALTH, DAMAGE, SPEED, SPELL_POWER, CASTS, RESISTANCE}; // 指挥官次要技能
    const int MAX_SKILL_LEVEL = 5; // 最大技能等级
}

enum class EWallPart : int8_t
{
    INDESTRUCTIBLE_PART_OF_GATE = -3, // 无法破坏的大门部分
    INDESTRUCTIBLE_PART = -2,         // 无法破坏的部分
    INVALID = -1,                     // 无效
    KEEP = 0,                         // 城堡主楼
    BOTTOM_TOWER,                     // 底部塔楼
    BOTTOM_WALL,                      // 底部城墙
    BELOW_GATE,                       // 大门下方
    OVER_GATE,                        // 大门上方
    UPPER_WALL,                       // 上部城墙
    UPPER_TOWER,                      // 上部塔楼
    GATE,                             // 大门
    PARTS_COUNT                       // 部件计数（此常量应始终作为枚举中的最后一项）
};

enum class EWallState : int8_t
{
    NONE = -1,        // 无城墙
    DESTROYED,        // 毁坏
    DAMAGED,          // 损坏
    INTACT,           // 完好
    REINFORCED        // 加固（城堡城镇的城墙）
};

enum class EGateState : int8_t
{
    NONE,             // 无门
    CLOSED,           // 关闭
    BLOCKED,          // 阻塞（门被生物阻挡）
    OPENED,           // 开启
    DESTROYED         // 毁坏
};

enum class ETileType : int8_t
{
    FREE,             // 自由
    POSSIBLE,         // 可能
    BLOCKED,          // 阻塞
    USED              // 已使用
};

enum class ETeleportChannelType : int8_t
{
    IMPASSABLE,       // 无法通行
    BIDIRECTIONAL,    // 双向
    UNIDIRECTIONAL,   // 单向
    MIXED             // 混合
};

namespace MasteryLevel
{
    enum Type
    {
        NONE,           // 无
        BASIC,          // 基础
        ADVANCED,       // 高级
        EXPERT,         // 专家
        LEVELS_SIZE     // 等级大小
    };
}

enum class Date : int8_t
{
    DAY = 0,          // 天
    DAY_OF_WEEK = 1,  // 星期几
    WEEK = 2,         // 周
    MONTH = 3,        // 月
    DAY_OF_MONTH      // 月份中的天数
};

enum class EActionType : int8_t
{
    NO_ACTION,        // 无动作

    END_TACTIC_PHASE, // 结束战术阶段
    RETREAT,          // 撤退
    SURRENDER,        // 投降

    HERO_SPELL,       // 英雄施法

    WALK,             // 行走
    WAIT,             // 等待
    DEFEND,           // 防御
    WALK_AND_ATTACK,  // 行走并攻击
    SHOOT,            // 射击
    CATAPULT,         // 投石车
    MONSTER_SPELL,    // 怪物施法
    BAD_MORALE,       // 士气低落
    STACK_HEAL        // 堆栈治疗
};

enum class EDiggingStatus : int8_t
{
    UNKNOWN = -1,     // 未知
    CAN_DIG = 0,      // 可挖掘
    LACK_OF_MOVEMENT, // 移动力不足
    WRONG_TERRAIN,    // 地形错误
    TILE_OCCUPIED,    // 瓦片被占用
    BACKPACK_IS_FULL  // 背包已满
};

enum class EPlayerStatus : int8_t
{
    WRONG = -1,       // 错误
    INGAME,           // 游戏中
    LOSER,            // 失败者
    WINNER            // 获胜者
};

enum class PlayerRelations : int8_t
{
    ENEMIES,          // 敌人
    ALLIES,           // 盟友
    SAME_PLAYER       // 同一玩家
};

enum class EMetaclass : int8_t
{
    INVALID = 0,      // 无效
    ARTIFACT,         // 神器
    CREATURE,         // 生物
    FACTION,          // 派系
    EXPERIENCE,       // 经验
    HERO,             // 英雄
    HEROCLASS,        // 英雄职业
    LUCK,             // 幸运
    MANA,             // 法力
    MORALE,           // 士气
    MOVEMENT,         // 移动
    OBJECT,           // 对象
    PRIMARY_SKILL,    // 主要技能
    SECONDARY_SKILL,  // 次要技能
    SPELL,            // 法术
    RESOURCE          // 资源
};

enum class EHealLevel: int8_t
{
    HEAL,             // 治疗
    RESURRECT,        // 复活
    OVERHEAL          // 过度治疗
};

enum class EHealPower : int8_t
{
    ONE_BATTLE,       // 一次战斗
    PERMANENT         // 永久
};

enum class EBattleResult : int8_t
{
    NORMAL = 0,       // 正常
    ESCAPE = 1,       // 逃脱
    SURRENDER = 2     // 投降
};

enum class ETileVisibility : int8_t // 迷雾战争改变
{
    HIDDEN,           // 隐藏
    REVEALED           // 揭露
};

enum class EArmyFormation : int8_t
{
    LOOSE,            // 松散阵型
    TIGHT             // 紧密阵型
};

enum class EMovementMode : int8_t
{
    STANDARD,         // 标准
    DIMENSION_DOOR,   // 空间之门
    ONOLITH,          // 独石阵
    CASTLE_GATE,      // 城堡大门
    TOWN_PORTAL       // 城镇传送门
};

enum class EMapLevel : int8_t
{
    ANY = -1,         // 任意
    SURFACE = 0,      // 地面
    UNDERGROUND = 1   // 地下
};

enum class EWeekType : int8_t
{
    FIRST_WEEK,       // 第一周
    NORMAL,           // 普通
    DOUBLE_GROWTH,    // 双倍增长
    BONUS_GROWTH,     // 奖励增长
    DEITYOFFIRE,      // 火神周
    PLAGUE            // 瘟疫
};

enum class ColorScheme : int8_t
{
    NONE,             // 无
    KEEP,             // 保持
    GRAYSCALE,        // 灰度
    H2_SCHEME         // H2方案
};

enum class ChangeValueMode : int8_t
{
    RELATIVE,         // 相对
    ABSOLUTE          // 绝对
};
```

## 功能说明

Enumerations相关枚举是VCMI系统中定义的各种枚举类型集合，涵盖了游戏中几乎所有的重要常量和状态值。这些枚举类型用于统一管理游戏中的各种状态、类型和模式，提供类型安全和代码可读性。

## 主要枚举类型

### 阵营与关系
- `EAlignment`: 定义生物或玩家的阵营（善良、邪恶、中立）
- `PlayerRelations`: 定义玩家间的关系（敌人、盟友、同一玩家）

### 建筑相关
- `BuildingSubID`: 定义特殊建筑的子类型ID
- `EBuildingState`: 定义建筑的建造状态

### 战斗相关
- `EActionType`: 定义战斗中的动作类型
- `EWallPart`: 定义城墙的各个部分
- `EWallState`: 定义城墙状态
- `EGateState`: 定义大门状态
- `EBattleResult`: 定义战斗结果类型

### 法术相关
- `ESpellCastProblem`: 定义施法问题类型
- `EMetaclass`: 定义元类类型（神器、生物、法术等）

### AI相关
- `EAiTactic`: 定义AI战术类型
- `MasteryLevel`: 定义掌握等级（无、基础、高级、专家）

### 市场与交易
- `EMarketMode`: 定义市场交易模式

### 时间与日期
- `Date`: 定义日期类型（天、星期几、周、月等）
- `EWeekType`: 定义周类型（普通周、双倍增长周等）

### 移动与探索
- `EMovementMode`: 定义移动模式（标准、空间之门等）
- `EDiggingStatus`: 定义挖掘状态
- `ETeleportChannelType`: 定义传送通道类型

## 设计说明

这些枚举类型的设计遵循了以下原则：

1. **类型安全**: 使用强类型的枚举（enum class）避免隐式转换
2. **范围限定**: 使用命名空间组织相关的枚举值
3. **清晰命名**: 枚举值名称明确反映其含义
4. **合理范围**: 使用int8_t等较小的数据类型节省内存
5. **预留扩展**: 为未来可能的值预留空间

这些枚举在整个VCMI系统中广泛使用，为游戏逻辑提供了统一的状态和类型表示。