# CHero

## 概述

`CHero` 类是VCMI中英雄类型的核心实现类，定义了游戏中每个英雄的基本属性、初始军队配置、技能、法术、特长、外观等所有特征。它是英雄系统的基石，为每个英雄类型提供完整的数据结构。

## 继承层次

```cpp
CHero : public HeroType
```

## 核心属性

### 基本标识
```cpp
HeroTypeID ID;                    // 英雄类型ID
std::string identifier;           // 字符串标识符
std::string modScope;             // 模组范围
si32 imageIndex = 0;              // 图像索引
```

### 初始军队配置
```cpp
struct InitialArmyStack
{
    ui32 minAmount;               // 最小数量
    ui32 maxAmount;               // 最大数量
    CreatureID creature;          // 生物类型ID
};
std::vector<InitialArmyStack> initialArmy; // 初始军队配置
```

### 职业和技能
```cpp
const CHeroClass * heroClass;     // 英雄职业指针
// 初始二级技能：first - 技能ID, second - 技能等级 (1-基础, 2-高级, 3-专家)
std::vector<std::pair<SecondarySkill, ui8>> secSkillsInit;
```

### 特长和法术
```cpp
BonusList specialty;              // 英雄特长奖励列表
std::set<SpellID> spells;         // 初始法术集合
bool haveSpellBook = false;       // 是否拥有法术书
```

### 游戏逻辑属性
```cpp
bool special = false;             // 是否为特殊英雄（战役英雄等）
bool onlyOnWaterMap;              // 仅在有水的地图上出现
bool onlyOnMapWithoutWater;       // 仅在无水的地图上出现
EHeroGender gender = EHeroGender::MALE; // 性别（默认男性）
```

### 图形资源
```cpp
std::string iconSpecSmall;        // 小型特长图标
std::string iconSpecLarge;        // 大型特长图标
std::string portraitSmall;        // 小型肖像
std::string portraitLarge;        // 大型肖像
AnimationPath battleImage;        // 战斗图像
```

## 构造函数和析构函数

### CHero
```cpp
CHero();
```
- **功能**: 创建英雄对象，初始化默认值

### ~CHero
```cpp
virtual ~CHero();
```
- **功能**: 销毁英雄对象

## 基本信息获取

### 索引和标识
```cpp
int32_t getIndex() const override;           // 获取英雄索引
int32_t getIconIndex() const override;       // 获取图标索引
std::string getJsonKey() const override;     // 获取JSON键值
std::string getModScope() const override;    // 获取模组范围
HeroTypeID getId() const override;           // 获取英雄类型ID
```

### 图标注册
```cpp
void registerIcons(const IconRegistar & cb) const override;
```
- **参数**: `cb` - 图标注册器回调
- **功能**: 向系统注册英雄相关的图标资源

## 本地化文本

### 翻译文本获取
```cpp
std::string getNameTranslated() const override;                    // 获取本地化名称
std::string getBiographyTranslated() const override;               // 获取本地化传记
std::string getSpecialtyNameTranslated() const override;           // 获取本地化特长名称
std::string getSpecialtyDescriptionTranslated() const override;    // 获取本地化特长描述
std::string getSpecialtyTooltipTranslated() const override;        // 获取本地化特长提示
```

### 文本ID获取
```cpp
std::string getNameTextID() const override;                         // 获取名称文本ID
std::string getBiographyTextID() const override;                    // 获取传记文本ID
std::string getSpecialtyNameTextID() const override;                // 获取特长名称文本ID
std::string getSpecialtyDescriptionTextID() const override;         // 获取特长描述文本ID
std::string getSpecialtyTooltipTextID() const override;             // 获取特长提示文本ID
```

## 数据更新和序列化

### JSON数据更新
```cpp
void updateFrom(const JsonNode & data);
```
- **参数**: `data` - JSON数据节点
- **功能**: 从JSON配置数据更新英雄属性

### JSON序列化
```cpp
void serializeJson(JsonSerializeFormat & handler);
```
- **参数**: `handler` - JSON序列化处理器
- **功能**: 将英雄数据序列化为JSON格式

## 设计意图

CHero类的设计目标：

1. **英雄类型定义**: 为每个英雄类型提供完整的数据结构
2. **模组支持**: 支持通过JSON配置自定义英雄
3. **本地化支持**: 提供完整的多语言文本支持
4. **图形资源管理**: 管理所有相关的图像和动画资源
5. **游戏平衡**: 定义英雄的初始能力和限制条件
6. **扩展性**: 支持模组添加新的英雄类型和属性

## 重要枚举和类型

### EHeroGender
```cpp
enum class EHeroGender { MALE, FEMALE };
```
- **MALE**: 男性
- **FEMALE**: 女性

### InitialArmyStack
定义英雄初始军队的结构，包含生物类型和数量范围。

## 依赖关系

- **HeroType**: 英雄类型接口
- **CHeroClass**: 英雄职业定义
- **BonusList**: 奖励系统
- **SecondarySkill**: 二级技能枚举
- **SpellID**: 法术标识符
- **CreatureID**: 生物标识符
- **AnimationPath**: 动画资源路径
- **JsonNode**: JSON数据处理
- **JsonSerializeFormat**: JSON序列化

这个类是VCMI英雄系统的核心，定义了游戏中所有英雄的基础数据和行为。
