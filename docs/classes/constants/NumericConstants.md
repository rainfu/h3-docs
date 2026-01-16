# NumericConstants相关常量

NumericConstants相关常量是VCMI系统中定义的各种数值常量集合，涵盖了游戏中重要的数值设定和配置参数。

## 常量定义

```cpp
namespace GameConstants
{
    DLL_LINKAGE extern const std::string VCMI_VERSION;  // VCMI版本字符串

    constexpr int PUZZLE_MAP_PIECES = 48;  // 拼图地图碎片数量

    constexpr int MAX_HEROES_PER_PLAYER = 8;        // 每个玩家最大英雄数量
    constexpr int AVAILABLE_HEROES_PER_PLAYER = 2;  // 每个玩家可用英雄数量

    constexpr int ALL_PLAYERS = 255;  // 所有玩家位域标记

    constexpr int CREATURES_PER_TOWN = 8;  // 每个城镇生物数量（不含升级）
    constexpr int SPELL_LEVELS = 5;        // 法术等级数量
    constexpr int SPELL_SCHOOL_LEVELS = 4; // 法术学派等级数量
    constexpr int CRE_LEVELS = 10;         // 生物经验值等级数量

    constexpr int HERO_GOLD_COST = 2500;   // 英雄招募费用
    constexpr int SPELLBOOK_GOLD_COST = 500;  // 法术书费用
    constexpr int BATTLE_SHOOTING_PENALTY_DISTANCE = 10;  // 战斗射击惩罚距离阈值
    constexpr int BATTLE_SHOOTING_RANGE_DISTANCE = std::numeric_limits<uint8_t>::max();  // 战斗射击范围距离
    constexpr int ARMY_SIZE = 7;           // 军队规模（最多7个单位位置）
    constexpr ui32 HERO_HIGH_LEVEL = 10;   // 影响英雄高级别时主技能升级顺序的等级

    constexpr int SKILL_QUANTITY = 28;     // 技能总数
    constexpr int PRIMARY_SKILLS = 4;      // 主要技能数量
    constexpr int RESOURCE_QUANTITY = 7;   // 资源类型数量
    constexpr int HEROES_PER_TYPE = 8;     // 每种类型的英雄数量

    // OH3对象数量。可通过mod修改，仅应在H3加载阶段使用
    constexpr int F_NUMBER = 9;           // 派系数
    constexpr int ARTIFACTS_QUANTITY = 171;  // 神器数量
    constexpr int HEROES_QUANTITY = 156;     // 英雄数量
    constexpr int SPELLS_QUANTITY = 70;      // 法术数量
    constexpr int CREATURES_COUNT = 197;     // 生物总数

    constexpr int64_t PLAYER_RESOURCES_CAP = 1000 * 1000 * 1000;  // 玩家资源上限
    constexpr int ALTAR_ARTIFACTS_SLOTS = 22;  // 神器祭坛的装备槽位数
    constexpr int TOURNAMENT_RULES_DD_MAP_TILES_THRESHOLD = 144*144*2;  // 锦标赛规则下空间之门施法的阈值
    constexpr int KINGDOM_WINDOW_HEROES_SLOTS = 4;  // 王国窗口中英雄槽位数
    constexpr int INFO_WINDOW_ARTIFACTS_MAX_ITEMS = 14;  // 信息窗口中神器最大显示项目数

    constexpr int FULL_MAP_RANGE = std::numeric_limits<int>::max();  // 全地图范围
}
```

## 功能说明

NumericConstants相关常量是VCMI系统中定义的各种数值常量集合，涵盖了游戏中重要的数值设定和配置参数。这些常量为游戏提供了统一的数值配置，确保游戏逻辑的一致性和可维护性。

## 主要常量分类

### 游戏版本信息
- `VCMI_VERSION`: 定义VCMI的版本字符串

### 地图与谜题
- `PUZZLE_MAP_PIECES`: 拼图地图碎片数量，用于显示世界地图的拼图视图

### 英雄相关
- `MAX_HEROES_PER_PLAYER`: 每个玩家最大英雄数量
- `AVAILABLE_HEROES_PER_PLAYER`: 每个玩家可选择的英雄数量
- `HEROES_PER_TYPE`: 每种类型的英雄数量
- `HERO_GOLD_COST`: 招募英雄的费用
- `HERO_HIGH_LEVEL`: 影响高级英雄主技能升级顺序的等级

### 城镇与生物
- `CREATURES_PER_TOWN`: 每个城镇的生物种类数量（不含升级）
- `CREATURES_COUNT`: 游戏中总的生物数量
- `CRE_LEVELS`: 生物经验值等级数量

### 法术系统
- `SPELL_LEVELS`: 法术等级数量（1-5级）
- `SPELL_SCHOOL_LEVELS`: 法术学派等级数量（基础、高级、专家级等）

### 战斗系统
- `BATTLE_SHOOTING_PENALTY_DISTANCE`: 超过此距离的射击会有惩罚
- `BATTLE_SHOOTING_RANGE_DISTANCE`: 无射击距离限制的特殊值
- `ARMY_SIZE`: 军队最大单位数量（7个位置）
- `FULL_MAP_RANGE`: 表示全地图范围的值

### 技能系统
- `SKILL_QUANTITY`: 游戏中次要技能总数
- `PRIMARY_SKILLS`: 主要技能数量（攻击、防御、力量、知识）

### 资源系统
- `RESOURCE_QUANTITY`: 资源类型数量（7种）
- `PLAYER_RESOURCES_CAP`: 玩家资源持有上限

### 物品与装备
- `ALTAR_ARTIFACTS_SLOTS`: 神器祭坛的装备槽位数
- `INFO_WINDOW_ARTIFACTS_MAX_ITEMS`: 信息窗口中神器最大显示数量
- `ARTIFACTS_QUANTITY`: 游戏中神器总数

### 游戏规则
- `SPELLS_QUANTITY`: 游戏中法术总数
- `F_NUMBER`: 派系数
- `TOURNAMENT_RULES_DD_MAP_TILES_THRESHOLD`: 锦标赛规则下空间之门施法的地图面积阈值

## 设计说明

这些常量的设计遵循了以下原则：

1. **集中管理**: 所有数值常量都定义在GameConstants命名空间中，便于统一管理
2. **可读性强**: 常量名称明确反映其含义
3. **可扩展性**: 支持MOD对某些值进行修改
4. **类型安全**: 使用合适的数值类型（int, int64_t等）
5. **编译期常量**: 使用constexpr确保在编译期确定值

这些常量在整个VCMI系统中广泛使用，为游戏逻辑提供了统一的数值配置基础。