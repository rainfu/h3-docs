# CHero

英雄实体类，管理英雄的属性、技能和装备。

## 📋 类概述

`CHero` 类是 VCMI 中英雄实体的核心实现，继承自 `HeroType` 接口。该类定义了英雄的所有基本属性，包括：

- 基础信息（ID、名称、性别等）
- 初始军队配置
- 职业和技能
- 特性和法术
- 图形资源

## 🔧 主要属性

### 基础信息
- `ID`: 英雄类型ID
- `identifier`: 英雄标识符
- `modScope`: 模组作用域
- `imageIndex`: 图像索引
- `gender`: 性别（男/女）

### 职业和技能
- `heroClass`: 英雄职业指针
- `secSkillsInit`: 初始二级技能列表（技能ID -> 等级）
- `specialty`: 英雄特长奖励列表

### 军队和装备
- `initialArmy`: 初始军队配置
- `spells`: 英雄拥有的法术集合
- `haveSpellBook`: 是否拥有法术书

### 地图和战役设置
- `special`: 是否为特殊英雄（战役专用）
- `onlyOnWaterMap`: 仅在水上地图出现
- `onlyOnMapWithoutWater`: 仅在非水上地图出现

### 图形资源
- `iconSpecSmall`: 小型特长图标
- `iconSpecLarge`: 大型特长图标
- `portraitSmall`: 小型肖像
- `portraitLarge`: 大型肖像
- `battleImage`: 战斗图像路径

## 🎯 核心方法

### 基本信息查询
```cpp
// 获取英雄索引
int32_t getIndex() const;

// 获取图标索引
int32_t getIconIndex() const;

// 获取JSON键
std::string getJsonKey() const;

// 获取模组作用域
std::string getModScope() const;

// 获取英雄ID
HeroTypeID getId() const;
```

### 本地化文本
```cpp
// 获取翻译后的名称
std::string getNameTranslated() const;

// 获取传记文本
std::string getBiographyTranslated() const;

// 获取特长相关文本
std::string getSpecialtyNameTranslated() const;
std::string getSpecialtyDescriptionTranslated() const;
std::string getSpecialtyTooltipTranslated() const;
```

### 文本ID获取
```cpp
// 获取文本ID（用于本地化）
std::string getNameTextID() const;
std::string getBiographyTextID() const;
std::string getSpecialtyNameTextID() const;
std::string getSpecialtyDescriptionTextID() const;
std::string getSpecialtyTooltipTextID() const;
```

### 数据管理
```cpp
// 从JSON更新数据
void updateFrom(const JsonNode & data);

// JSON序列化
void serializeJson(JsonSerializeFormat & handler);
```

## 🔗 依赖关系

### 依赖的类
- `HeroType`: 英雄类型接口
- `EHeroGender`: 英雄性别枚举
- `BonusList`: 奖励列表
- `CHeroClass`: 英雄职业类
- `SecondarySkill`: 二级技能枚举
- `SpellID`: 法术ID
- `AnimationPath`: 动画路径

### 被依赖关系
- 被 `CGameState` 用于管理游戏中的英雄
- 被 `CGHeroInstance` 用于创建英雄实例
- 被UI系统用于显示英雄信息
- 被奖励系统用于计算英雄特长

## 📝 使用示例

### 创建英雄实例
```cpp
// 从配置创建英雄
CHero * hero = new CHero();
hero->identifier = "hero_of_might";
hero->gender = EHeroGender::MALE;

// 设置初始技能
hero->secSkillsInit = {
    {SecondarySkill::ATTACK, 1},    // 基础攻击
    {SecondarySkill::DEFENSE, 1}    // 基础防御
};

// 设置特长
hero->specialty.addNewBonus(std::make_shared<Bonus>(
    BonusDuration::PERMANENT,
    BonusType::PRIMARY_SKILL,
    BonusSource::HERO_SPECIAL,
    1,  // +1
    BonusSourceID(),
    BonusSubtypeID(PrimarySkill::ATTACK)
));
```

### 查询英雄信息
```cpp
// 获取英雄基本信息
std::string name = hero->getNameTranslated();
HeroTypeID id = hero->getId();

// 检查英雄能力
if (hero->haveSpellBook) {
    // 英雄有法术书
    for (const auto & spellId : hero->spells) {
        // 处理每个法术
    }
}

// 获取特长奖励
const auto & specialtyBonuses = hero->specialty;
for (const auto & bonus : specialtyBonuses) {
    // 处理特长奖励
}
```

### 序列化和配置
```cpp
// 从JSON配置加载
JsonNode config = JsonNode("path/to/hero/config.json");
hero->updateFrom(config);

// 序列化为JSON
JsonSerializeFormat format;
hero->serializeJson(format);
```

## ⚡ 性能特性

- **延迟加载**: 图形资源按需加载
- **缓存机制**: 翻译文本可能被缓存
- **共享数据**: 职业和技能数据在多个英雄间共享

## 🔍 注意事项

1. **内存管理**: 英雄实例需要手动管理生命周期
2. **配置验证**: 从JSON加载时需要验证数据完整性
3. **本地化**: 文本获取依赖于本地化系统
4. **特长计算**: 特长奖励在创建时计算，后续不可修改

## 📊 相关结构

### InitialArmyStack 结构体
```cpp
struct InitialArmyStack {
    ui32 minAmount;        // 最小数量
    ui32 maxAmount;        // 最大数量
    CreatureID creature;   // 生物类型
};
```

### 英雄配置示例
```json
{
  "name": "Orrin",
  "class": "knight",
  "female": false,
  "special": false,
  "texts": {
    "name": "Orrin",
    "biography": "Orrin 的传记...",
    "specialty": {
      "name": "Archery",
      "description": "提高远程攻击力"
    }
  },
  "images": {
    "small": "heroes/orrin-small.png",
    "large": "heroes/orrin-large.png"
  },
  "army": [
    {
      "creature": "pikeman",
      "min": 10,
      "max": 20
    }
  ],
  "skills": [
    ["attack", 1],
    ["leadership", 1]
  ],
  "specialty": {
    "type": "secondarySkill",
    "subtype": "archery"
  }
}
```