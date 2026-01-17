# CHeroHandler

## 概述

`CHeroHandler` 类负责管理游戏中的所有英雄类型数据。它继承自 `CHandlerBase`，提供了英雄的加载、配置、经验系统和特长处理功能。

## 继承关系

```cpp
CHandlerBase<HeroTypeID, HeroType, CHero, HeroTypeService>
└── CHeroHandler
```

## 主要功能

CHeroHandler 提供了以下核心功能：

1. **英雄数据加载**: 从JSON配置加载英雄类型数据
2. **经验系统**: 管理英雄等级和经验值计算
3. **特长系统**: 处理英雄的生物特长和技能特长
4. **军队配置**: 加载英雄初始军队配置
5. **技能初始化**: 设置英雄的初始次要技能和法术书
6. **遗留数据支持**: 支持从旧版游戏文件加载英雄数据

## 核心方法

### 经验系统

#### level
```cpp
ui32 level(TExpType experience) const;
```
- **参数**: `experience` - 经验值
- **返回值**: 对应的英雄等级
- **功能**: 根据经验值计算英雄等级

#### reqExp
```cpp
TExpType reqExp(ui32 level) const;
```
- **参数**: `level` - 目标等级
- **返回值**: 达到该等级所需的经验值
- **功能**: 计算指定等级所需的经验值

#### maxSupportedLevel
```cpp
ui32 maxSupportedLevel() const;
```
- **返回值**: 游戏支持的最大英雄等级
- **功能**: 获取游戏支持的最高英雄等级

### 数据加载

#### loadFromJson
```cpp
std::shared_ptr<CHero> loadFromJson(const std::string & scope, const JsonNode & node, const std::string & identifier, size_t index) override;
```
- **参数**:
  - `scope`: 模组范围
  - `node`: JSON配置节点
  - `identifier`: 英雄标识符
  - `index`: 英雄索引
- **返回值**: 新创建的英雄对象的智能指针
- **功能**: 从JSON配置创建英雄对象

#### loadLegacyData
```cpp
std::vector<JsonNode> loadLegacyData() override;
```
- **返回值**: 遗留英雄数据的JsonNode向量
- **功能**: 从旧版游戏文件加载英雄配置

### 特长创建

#### createCreatureSpecialty
```cpp
std::vector<std::shared_ptr<Bonus>> createCreatureSpecialty(CreatureID cid, int fixedLevel, int growthPerStep) const;
```
- **参数**:
  - `cid`: 生物ID
  - `fixedLevel`: 固定等级 (0表示使用生物默认等级)
  - `growthPerStep`: 每级成长值
- **返回值**: 特长奖励向量
- **功能**: 为指定生物创建英雄特长奖励

#### createSecondarySkillSpecialty
```cpp
std::vector<std::shared_ptr<Bonus>> createSecondarySkillSpecialty(SecondarySkill skillID, int growthPerStep) const;
```
- **参数**:
  - `skillID`: 次要技能ID
  - `growthPerStep`: 每级成长值
- **返回值**: 特长奖励向量
- **功能**: 为指定技能创建英雄特长奖励

### 辅助加载方法

#### loadHeroArmy
```cpp
void loadHeroArmy(CHero * hero, const JsonNode & node) const;
```
- **功能**: 加载英雄的初始军队配置

#### loadHeroSkills
```cpp
void loadHeroSkills(CHero * hero, const JsonNode & node) const;
```
- **功能**: 加载英雄的初始次要技能和法术书

#### loadHeroSpecialty
```cpp
void loadHeroSpecialty(CHero * hero, const JsonNode & node) const;
```
- **功能**: 加载英雄的特长配置

### 生命周期方法

#### afterLoadFinalization
```cpp
void afterLoadFinalization() override;
```
- **功能**: 数据加载完成后的最终化处理，包括特长生成

#### getTypeNames
```cpp
const std::vector<std::string> & getTypeNames() const override;
```
- **返回值**: 类型名称向量，包含 "hero"
- **功能**: 获取处理器支持的对象类型名称

## JSON配置处理

CHeroHandler 处理以下JSON配置字段：

### 基本信息
- **female**: 是否为女性英雄
- **special**: 是否为特殊英雄
- **onlyOnWaterMap**: 仅在水上地图出现
- **onlyOnMapWithoutWater**: 仅在无水地图出现

### 文本信息
- **texts.name**: 英雄名称
- **texts.biography**: 英雄传记
- **texts.specialty.name**: 特长名称
- **texts.specialty.tooltip**: 特长提示
- **texts.specialty.description**: 特长描述

### 视觉资源
- **images.specialtySmall**: 小型特长图标
- **images.specialtyLarge**: 大型特长图标
- **images.small**: 小型肖像
- **images.large**: 大型肖像
- **battleImage**: 战斗图像路径

### 军队配置
- **army**: 初始军队数组
  - **creature**: 生物ID
  - **min**: 最小数量
  - **max**: 最大数量

### 技能配置
- **skills**: 初始次要技能数组
  - **skill**: 技能ID
  - **level**: 技能等级 ("basic", "advanced", "expert")
- **spellbook**: 初始法术书中的法术ID数组

### 职业关联
- **class**: 英雄职业ID

## 经验系统

CHeroHandler 维护了一个经验等级表：

- **expPerLevel**: 存储达到各等级所需的经验值
- 支持最多196个等级
- 更高等级需要超过TExpType最大值的经验

## 特长系统

### 生物特长
- 增加指定生物的攻击速度
- 按英雄等级提升生物的攻击和防御力
- 支持固定等级和成长系数配置

### 技能特长
- 使用技能预定义的特长奖励模板
- 支持成长系数调整
- 自动应用技能相关的所有特长效果

## 使用示例

### 获取英雄处理器
```cpp
// 获取全局英雄处理器
const auto& heroHandler = LIBRARY->heroesh;

// 获取特定英雄
const CHero* hero = heroHandler->getById(HeroTypeID::HEROES_PER_GROUP);
```

### 计算等级
```cpp
// 计算10000经验对应的等级
ui32 currentLevel = heroHandler->level(10000);

// 计算升级到下一级需要的经验
TExpType expNeeded = heroHandler->reqExp(currentLevel + 1);
```

### 创建特长奖励
```cpp
// 为龙类生物创建特长
auto dragonSpecialty = heroHandler->createCreatureSpecialty(CreatureID::DRAGON, 0, 5);

// 为剑术技能创建特长
auto swordSpecialty = heroHandler->createSecondarySkillSpecialty(SecondarySkill::SWORD, 3);
```

### 加载自定义英雄
```cpp
// 在模组中定义新英雄
JsonNode heroData = {
    {"female", false},
    {"special", false},
    {"texts", {
        {"name", "My Hero"},
        {"biography", "A brave hero..."},
        {"specialty", {
            {"name", "Dragon Slayer"},
            {"tooltip", "Bonus vs Dragons"},
            {"description", "Increases damage against dragons"}
        }}
    }},
    {"images", {
        {"small", "heroes/myhero/small.png"},
        {"large", "heroes/myhero/large.png"},
        {"specialtySmall", "heroes/myhero/spec-small.png"},
        {"specialtyLarge", "heroes/myhero/spec-large.png"}
    }},
    {"army", {
        {{"creature", "pikeman"}, {"min", 10}, {"max", 20}},
        {{"creature", "archer"}, {"min", 5}, {"max", 10}}
    }},
    {"skills", {
        {{"skill", "sword"}, {"level", "basic"}},
        {{"skill", "archery"}, {"level", "advanced"}}
    }},
    {"class", "knight"}
};

heroHandler->loadObject("myMod", "myHero", heroData);
```

## 设计意图

CHeroHandler 的设计目的是为了：

1. **经验管理**: 提供完整的英雄成长系统
2. **特长平衡**: 通过可配置的特长系统保持游戏平衡
3. **模组支持**: 允许模组添加自定义英雄
4. **向后兼容**: 支持遗留数据格式
5. **类型安全**: 使用强类型ID避免配置错误
6. **性能优化**: 预计算经验表提高运行时性能

这为VCMI提供了灵活而强大的英雄系统，支持复杂的角色定制和平衡控制。