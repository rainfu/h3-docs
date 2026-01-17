<!-- 来源: E:\develop\heroes\vcmi\lib\campaign\CampaignConstants.h -->
# CampaignConstants枚举

CampaignConstants.h文件定义了VCMI战役系统中的各种常量和枚举类型。

## 枚举定义

### CampaignVersion
定义战役文件的版本信息：

```cpp
enum class CampaignVersion : uint8_t
{
    NONE = 0,
    RoE = 4,        // Restoration of Erathia
    AB = 5,         // Armageddon's Blade
    SoD = 6,        // Shadow of Death
    WoG = 6,        // Wake of Gods (与SoD相同版本)
    Chr = 7,        // Chronicles

    HotA = 10,      // Horn of the Abyss

    VCMI = 1,       // VCMI自定义版本
    VCMI_MIN = 1,   // VCMI版本范围最小值
    VCMI_MAX = 1,   // VCMI版本范围最大值
};
```

### CampaignStartOptions
定义战役开始时的选项：

```cpp
enum class CampaignStartOptions : int8_t
{
    NONE = 0,              // 无特殊选项
    START_BONUS,           // 起始奖励
    HERO_CROSSOVER,        // 英雄传承
    HERO_OPTIONS           // 英雄选项
};
```

### CampaignBonusType
定义战役奖励的类型：

```cpp
enum class CampaignBonusType : int8_t
{
    SPELL,                          // 法术奖励
    MONSTER,                        // 生物奖励
    BUILDING,                       // 建筑奖励
    ARTIFACT,                       // 神器奖励
    SPELL_SCROLL,                   // 法术卷轴奖励
    PRIMARY_SKILL,                  // 主要技能奖励
    SECONDARY_SKILL,                // 次要技能奖励
    RESOURCE,                       // 资源奖励
    HEROES_FROM_PREVIOUS_SCENARIO, // 从前一个场景继承英雄
    HERO                            // 英雄奖励
};
```

## 版本兼容性

CampaignVersion枚举支持多个Heroes of Might and Magic III扩展版本：

- **RoE (4)**: 基础游戏版本
- **AB (5)**: Armageddon's Blade扩展
- **SoD/WoG (6)**: Shadow of Death/Wake of Gods
- **Chr (7)**: Chronicles版本
- **HotA (10)**: Horn of the Abyss扩展
- **VCMI (1)**: VCMI引擎自定义版本

## 使用场景

这些常量主要用于：

1. **战役文件解析**: 根据版本信息正确读取战役数据
2. **奖励系统**: 确定奖励的类型和处理方式
3. **战役选项**: 控制战役开始时的各种设置

## 相关类

- `CampaignBonus`: 使用CampaignBonusType定义奖励类型
- `CampaignHandler`: 处理战役逻辑时使用这些常量