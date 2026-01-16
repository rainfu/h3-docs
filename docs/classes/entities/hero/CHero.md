# CHero类

CHero类是VCMI系统中的英雄类型类，用于表示游戏中的英雄类型。它包含了英雄的基本属性、初始军队、技能、专长等信息。

## 类定义

```cpp
class DLL_LINKAGE CHero : public HeroType
{
    friend class CHeroHandler;

    HeroTypeID ID;
    std::string identifier;
    std::string modScope;

public:
    struct InitialArmyStack
    {
        ui32 minAmount;              // 最小数量
        ui32 maxAmount;              // 最大数量
        CreatureID creature;         // 生物ID
    };
    si32 imageIndex = 0;             // 图像索引

    std::vector<InitialArmyStack> initialArmy; // 初始军队

    const CHeroClass * heroClass = nullptr;   // 英雄职业

    // 初始二级技能；第一个是技能ID，第二个是技能等级（1-基础，2-进阶，3-专家）
    std::vector<std::pair<SecondarySkill, ui8>> secSkillsInit;

    BonusList specialty;             // 专长奖励列表
    std::set<SpellID> spells;        // 法术集合
    bool haveSpellBook = false;      // 是否有法术书
    bool special = false;            // 是否为特殊英雄（不会随机出现在游戏中，除非在地图上预设）
    bool onlyOnWaterMap;             // 仅在含水地图上出现
    bool onlyOnMapWithoutWater;      // 仅在无水地图上出现
    EHeroGender gender = EHeroGender::MALE; // 性别：0=男性，1=女性

    /// 图形资源
    std::string iconSpecSmall;       // 小规格图标
    std::string iconSpecLarge;       // 大规格图标
    std::string portraitSmall;       // 小头像
    std::string portraitLarge;       // 大头像
    AnimationPath battleImage;       // 战斗图像路径

    CHero();                         // 构造函数
    virtual ~CHero();                // 析构函数

    int32_t getIndex() const override;      // 获取索引
    int32_t getIconIndex() const override;  // 获取图标索引
    std::string getJsonKey() const override; // 获取JSON键
    std::string getModScope() const override; // 获取模组范围
    HeroTypeID getId() const override;       // 获取ID
    void registerIcons(const IconRegistar & cb) const override; // 注册图标

    std::string getNameTranslated() const override;              // 获取翻译名称
    std::string getBiographyTranslated() const override;         // 获取翻译传记
    std::string getSpecialtyNameTranslated() const override;     // 获取翻译专长名称
    std::string getSpecialtyDescriptionTranslated() const override; // 获取翻译专长描述
    std::string getSpecialtyTooltipTranslated() const override;  // 获取翻译专长提示

    std::string getNameTextID() const override;                  // 获取名称文本ID
    std::string getBiographyTextID() const override;             // 获取传记文本ID
    std::string getSpecialtyNameTextID() const override;         // 获取专长名称文本ID
    std::string getSpecialtyDescriptionTextID() const override;  // 获取专长描述文本ID
    std::string getSpecialtyTooltipTextID() const override;      // 获取专长提示文本ID

    void updateFrom(const JsonNode & data);                      // 从JSON节点更新
    void serializeJson(JsonSerializeFormat & handler);            // JSON序列化
};
```

## 功能说明

CHero类是VCMI系统中表示英雄类型的类，它不仅包含了英雄的基本属性（如名称、性别、职业等），还包括了初始军队、技能、专长、法术等高级功能。

该类继承自HeroType接口，实现了标准化的访问方法，确保了不同组件间的兼容性。

## 重要方法

### 基本属性访问
- `getId()`：获取英雄类型ID
- `getIndex()`：获取英雄类型索引
- `getNameTranslated()`：获取翻译后的英雄名称
- `getBiographyTranslated()`：获取翻译后的英雄传记
- `getIconIndex()`：获取图标索引

### 专长系统
- `getSpecialtyNameTranslated()`：获取翻译后的专长名称
- `getSpecialtyDescriptionTranslated()`：获取翻译后的专长描述
- `getSpecialtyTooltipTranslated()`：获取翻译后的专长提示

### 图标和资源
- `registerIcons()`：注册图标资源
- `getJsonKey()`：获取JSON键，用于配置文件

### 序列化
- `updateFrom()`：从JSON节点更新英雄数据
- `serializeJson()`：JSON序列化英雄数据

## 重要属性

### 初始配置
- `initialArmy`：初始军队配置，包含生物类型和数量范围
- `secSkillsInit`：初始二级技能及其等级
- `spells`：英雄拥有的法术集合
- `haveSpellBook`：是否拥有法术书

### 特殊属性
- `special`：是否为特殊英雄，特殊英雄不会在游戏中随机出现
- `onlyOnWaterMap`：是否仅在含水地图上出现
- `onlyOnMapWithoutWater`：是否仅在无水地图上出现
- `gender`：英雄性别（男性或女性）

### 图形资源
- `iconSpecSmall/Large`：小/大规格图标
- `portraitSmall/Large`：小/大头像
- `battleImage`：战斗图像路径

## InitialArmyStack结构

InitialArmyStack结构定义了英雄初始军队的配置：
- `minAmount`：最小数量
- `maxAmount`：最大数量
- `creature`：生物类型ID

## 设计说明

CHero类设计为一个综合性的英雄类型数据容器，具有以下特点：

1. **接口兼容性**：继承自HeroType接口，确保与其他系统的兼容性
2. **初始配置**：通过initialArmy和secSkillsInit属性定义英雄的初始状态
3. **专长系统**：通过specialty属性实现独特的英雄专长
4. **扩展性**：支持特殊英雄类型和地图相关限制
5. **资源管理**：通过图形资源路径管理英雄的视觉表现
6. **序列化**：支持JSON格式的序列化和反序列化，便于配置管理