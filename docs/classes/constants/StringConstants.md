# StringConstants相关字符串常量

StringConstants相关字符串常量是VCMI系统中定义的各种字符串常量集合，涵盖了游戏中重要的名称映射和标识符。

## 常量定义

```cpp
namespace GameConstants
{
    const std::string RESOURCE_NAMES [RESOURCE_QUANTITY] = {
        "wood", "mercury", "ore", "sulfur", "crystal", "gems", "gold"  // 资源名称数组
    };

    const std::string PLAYER_COLOR_NAMES [PlayerColor::PLAYER_LIMIT_I] = {
        "red", "blue", "tan", "green", "orange", "purple", "teal", "pink"  // 玩家颜色名称数组
    };

    const std::string ALIGNMENT_NAMES [3] = {"good", "evil", "neutral"};  // 阵营名称

    const std::string DIFFICULTY_NAMES [5] = {"pawn", "knight", "rook", "queen", "king"};  // 难度名称
}

namespace NPrimarySkill
{
    const std::string names [GameConstants::PRIMARY_SKILLS] = { "attack", "defence", "spellpower", "knowledge" };  // 主要技能名称
}

namespace NSecondarySkill
{
    const std::string names [GameConstants::SKILL_QUANTITY] =
    {
        "pathfinding",  "archery",      "logistics",    "scouting",     "diplomacy",    //  5
        "navigation",   "leadership",   "wisdom",       "mysticism",    "luck",         // 10
        "ballistics",   "eagleEye",     "necromancy",   "estates",      "fireMagic",    // 15
        "airMagic",     "waterMagic",   "earthMagic",   "scholar",      "tactics",      // 20
        "artillery",    "learning",     "offence",      "armorer",      "intelligence", // 25
        "sorcery",      "resistance",   "firstAid"
    };  // 次要技能名称

    const std::vector<std::string> levels =
    {
        "none", "basic", "advanced", "expert"  // 技能等级名称
    };
}

namespace EBuildingType
{
    const std::string names [46] =
    {
        "mageGuild1",       "mageGuild2",       "mageGuild3",       "mageGuild4",       "mageGuild5",       //  5
        "tavern",           "shipyard",         "fort",             "citadel",          "castle",           // 10
        "villageHall",      "townHall",         "cityHall",         "capitol",          "marketplace",      // 15
        "resourceSilo",     "blacksmith",       "special1",         "horde1",           "horde1Upgr",       // 20
        "ship",             "special2",         "special3",         "special4",         "horde2",           // 25
        "horde2Upgr",       "grail",            "extraTownHall",    "extraCityHall",    "extraCapitol",     // 30
        "dwellingLvl1",     "dwellingLvl2",     "dwellingLvl3",     "dwellingLvl4",     "dwellingLvl5",     // 35
        "dwellingLvl6",     "dwellingLvl7",     "dwellingUpLvl1",   "dwellingUpLvl2",   "dwellingUpLvl3",   // 40
        "dwellingUpLvl4",   "dwellingUpLvl5",   "dwellingUpLvl6",   "dwellingUpLvl7",   "dwellingLvl8",
        "dwellingUpLvl8"
    };  // 建筑类型名称
}

namespace NFaction
{
    const std::string names [GameConstants::F_NUMBER] =
    {
        "castle",       "rampart",      "tower",
        "inferno",      "necropolis",   "dungeon",
        "stronghold",   "fortress",     "conflux"
    };  // 派系名称
}

namespace NArtifactPosition
{
    inline constexpr std::array namesHero =
    {
        "head", "shoulders", "neck", "rightHand", "leftHand", "torso", //5
        "rightRing", "leftRing", "feet", //8
        "misc1", "misc2", "misc3", "misc4", //12
        "mach1", "mach2", "mach3", "mach4", //16
        "spellbook", "misc5" //18
    };  // 英雄神器位置名称

    inline constexpr std::array namesCreature =
    {
        "creature1"
    };  // 生物神器位置名称

    inline constexpr std::array namesCommander =
    {
        "commander1", "commander2", "commander3", "commander4", "commander5", "commander6", "commander7", "commander8", "commander9"
    };  // 指挥官神器位置名称

    const std::string backpack = "backpack";  // 背包位置名称
}

namespace NMetaclass
{
    const std::string names [16] =
    {
        "",
        "artifact", "creature", "faction", "experience", "hero",
        "heroClass", "luck", "mana", "morale", "movement",
        "object", "primarySkill", "secondarySkill", "spell", "resource"
    };  // 元类名称
}

namespace NPathfindingLayer
{
    const std::string names[EPathfindingLayer::NUM_LAYERS] =
    {
        "land", "sail", "water", "air"  // 寻路层名称
    };
}

namespace MappedKeys
{
    static const std::map<std::string, BuildingSubID::EBuildingSubID> SPECIAL_BUILDINGS =
    {
        { "mysticPond", BuildingSubID::MYSTIC_POND },
        { "castleGate", BuildingSubID::CASTLE_GATE },
        { "portalOfSummoning", BuildingSubID::PORTAL_OF_SUMMONING },
        { "library", BuildingSubID::LIBRARY },
        { "escapeTunnel", BuildingSubID::ESAPE_TUNNEL },
        { "treasury", BuildingSubID::TREASURY },
        { "bank", BuildingSubID::BANK },
        { "auroraBorealis", BuildingSubID::AURORA_BOREALIS },
        { "deityOfFire", BuildingSubID::DEITY_OF_FIRE }
    };  // 特殊建筑映射

    static const std::map<std::string, EMarketMode> MARKET_NAMES_TO_TYPES =
    {
        { "resource-resource", EMarketMode::RESOURCE_RESOURCE },
        { "resource-player", EMarketMode::RESOURCE_PLAYER },
        { "creature-resource", EMarketMode::CREATURE_RESOURCE },
        { "resource-artifact", EMarketMode::RESOURCE_ARTIFACT },
        { "artifact-resource", EMarketMode::ARTIFACT_RESOURCE },
        { "artifact-experience", EMarketMode::ARTIFACT_EXP },
        { "creature-experience", EMarketMode::CREATURE_EXP },
        { "creature-undead", EMarketMode::CREATURE_UNDEAD },
        { "resource-skill", EMarketMode::RESOURCE_SKILL },
    };  // 市场模式映射
}
```

## 功能说明

StringConstants相关字符串常量是VCMI系统中定义的各种字符串常量集合，涵盖游戏中重要的名称映射和标识符。这些字符串常量主要用于将程序内部的枚举值、索引等映射为人类可读的字符串，以及提供标准化的标识符。

## 主要常量分类

### 游戏基本元素
- `RESOURCE_NAMES`: 资源名称数组，对应木材、水银、矿石等7种资源
- `PLAYER_COLOR_NAMES`: 玩家颜色名称数组，对应红、蓝、棕等8种颜色
- `ALIGNMENT_NAMES`: 阵营名称，包括善良、邪恶、中立
- `DIFFICULTY_NAMES`: 难度名称，使用棋子名称（兵、骑士、车、皇后、国王）

### 技能系统
- `NPrimarySkill::names`: 主要技能名称（攻击、防御、魔法力量、知识）
- `NSecondarySkill::names`: 次要技能名称（28种技能名称）
- `NSecondarySkill::levels`: 技能等级名称（无、基础、高级、专家）

### 建筑系统
- `EBuildingType::names`: 46种建筑类型名称，包括法师公会、酒馆、船坞等

### 派系系统
- `NFaction::names`: 9个派系名称（城堡、要塞、高塔等）

### 神器系统
- `NArtifactPosition::namesHero`: 英雄神器位置名称（头部、肩膀、颈部等）
- `NArtifactPosition::namesCreature`: 生物神器位置名称
- `NArtifactPosition::namesCommander`: 指挥官神器位置名称
- `NArtifactPosition::backpack`: 背包位置名称

### 元类系统
- `NMetaclass::names`: 16种元类名称（神器、生物、派系等）

### 寻路系统
- `NPathfindingLayer::names`: 寻路层名称（陆地、航行、水域、空中）

### 映射表
- `MappedKeys::SPECIAL_BUILDINGS`: 特殊建筑名称到枚举值的映射
- `MappedKeys::MARKET_NAMES_TO_TYPES`: 市场模式名称到枚举值的映射

## 设计说明

这些字符串常量的设计遵循了以下原则：

1. **一致性**: 所有名称使用小写字母和下划线分隔的格式
2. **可读性**: 名称直接反映其代表的游戏概念
3. **映射性**: 提供了从字符串到枚举值的双向映射
4. **模块化**: 按功能领域组织在不同命名空间中
5. **标准化**: 为国际化和本地化提供了基础

这些字符串常量在整个VCMI系统中用于配置文件解析、用户界面显示、调试信息输出等场景，是连接内部数据结构和外部表示的重要桥梁。