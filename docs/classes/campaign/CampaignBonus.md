<!-- 来源: E:\develop\heroes\vcmi\lib\campaign\CampaignBonus.h -->
# CampaignBonus类

CampaignBonus类是VCMI战役系统中用于管理战役奖励的核心类。它定义了各种类型的战役奖励，包括法术、生物、建筑、神器等。

## 类定义

```cpp
class CampaignBonus
```

## 概述

CampaignBonus类使用std::variant来存储不同类型的战役奖励数据，支持序列化和反序列化操作。

## 奖励类型

CampaignBonus支持以下类型的奖励：

### CampaignBonusSpell
- **用途**: 给予英雄法术奖励
- **字段**:
  - `HeroTypeID hero`: 目标英雄类型
  - `SpellID spell`: 奖励的法术

### CampaignBonusCreatures
- **用途**: 给予英雄生物奖励
- **字段**:
  - `HeroTypeID hero`: 目标英雄类型
  - `CreatureID creature`: 生物类型
  - `int32_t amount`: 生物数量

### CampaignBonusBuilding
- **用途**: 给予建筑奖励
- **字段**:
  - `BuildingID buildingH3M`: H3M格式的建筑ID
  - `BuildingID buildingDecoded`: 解码后的建筑ID

### CampaignBonusArtifact
- **用途**: 给予英雄神器奖励
- **字段**:
  - `HeroTypeID hero`: 目标英雄类型
  - `ArtifactID artifact`: 神器ID

### CampaignBonusSpellScroll
- **用途**: 给予英雄法术卷轴奖励
- **字段**:
  - `HeroTypeID hero`: 目标英雄类型
  - `SpellID spell`: 卷轴中的法术

### CampaignBonusPrimarySkill
- **用途**: 给予英雄主要技能奖励
- **字段**:
  - `HeroTypeID hero`: 目标英雄类型
  - `std::array<uint8_t, 4> amounts`: 四个主要技能的奖励值

### CampaignBonusSecondarySkill
- **用途**: 给予英雄次要技能奖励
- **字段**:
  - `HeroTypeID hero`: 目标英雄类型
  - `SecondarySkill skill`: 次要技能类型
  - `int32_t mastery`: 技能等级

### CampaignBonusStartingResources
- **用途**: 给予玩家起始资源奖励
- **字段**:
  - `GameResID resource`: 资源类型
  - `int32_t amount`: 资源数量

### CampaignBonusHeroesFromScenario
- **用途**: 从前一个场景继承英雄
- **字段**:
  - `PlayerColor startingPlayer`: 起始玩家
  - `CampaignScenarioID scenario`: 场景ID

### CampaignBonusStartingHero
- **用途**: 设置玩家的起始英雄
- **字段**:
  - `PlayerColor startingPlayer`: 起始玩家
  - `HeroTypeID hero`: 英雄类型

## 构造函数

```cpp
CampaignBonus() = default;

template<typename BonusType>
CampaignBonus(const BonusType & value)
```

## 主要方法

### getValue<T>()
```cpp
template<typename T>
const T & getValue() const
```
获取奖励数据的具体值。

### getTargetedHero()
```cpp
HeroTypeID getTargetedHero() const
```
获取奖励针对的英雄类型（如果适用）。

### isBonusForHero()
```cpp
bool isBonusForHero() const
```
检查奖励是否针对特定英雄。

### getType()
```cpp
CampaignBonusType getType() const
```
获取奖励类型。

### toJson()
```cpp
JsonNode toJson() const
```
将奖励转换为JSON格式。

## 序列化支持

CampaignBonus支持二进制序列化和JSON序列化：

```cpp
template <typename Handler> void serialize(Handler &h)
{
    h & data;
}
```

## 相关枚举

- `CampaignBonusType`: 定义奖励类型枚举
- `CampaignStartOptions`: 定义战役开始选项

## 注意事项

- 某些奖励类型标记为"UNTESTED"，可能存在兼容性问题
- CampaignBonusBuilding类型在某些场景下可能无法正常工作