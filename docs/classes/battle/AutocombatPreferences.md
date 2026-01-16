# AutocombatPreferences结构体

AutocombatPreferences结构体是VCMI战斗系统中自动战斗偏好设置的定义，用于配置自动战斗时的行为选项。

## 结构定义

```cpp
struct AutocombatPreferences
{
    bool enableSpellsUsage = true;  // 是否启用法术使用
    // TODO: 以下选项在原版H3中存在，考虑在启用战斗内自动战斗时混合人类-AI作战的实用性
    // bool enableUnitsUsage = true;        // 是否启用单位使用
    // bool enableCatapultUsage = true;     // 是否启用投石车使用
    // bool enableBallistaUsage = true;     // 是否启用弩车使用
    // bool enableFirstAidTendUsage = true; // 是否启用急救帐篷使用
};
```

## 功能说明

AutocombatPreferences是VCMI中用于存储自动战斗偏好设置的结构体。它定义了在自动战斗模式下各种功能的启用状态，允许玩家根据自己的喜好定制自动战斗的行为。当前版本只启用了法术使用选项，其他选项被暂时注释掉了，可能在未来版本中重新启用。

## 成员变量

- `enableSpellsUsage`: 布尔值，默认为true，控制在自动战斗中是否允许使用法术。如果设置为false，则AI在自动战斗期间不会施放任何法术。

## 设计说明

AutocombatPreferences结构体是VCMI自动战斗系统的重要组成部分，它允许玩家在自动战斗模式下控制AI的行为。当前版本只包含法术使用选项，但预留了其他可能的选项，如单位使用、攻城器械使用等，为未来扩展提供了可能性。

该结构体的设计体现了对原版《英雄无敌3》功能的考虑，注释中提到的其他选项反映了原版游戏中存在的自动战斗配置选项。