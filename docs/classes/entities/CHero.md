# CHero类

CHero类是VCMI中英雄类型的实现类，定义了英雄的基本属性和特殊能力。

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
        ui32 minAmount;
        ui32 maxAmount;
        CreatureID creature;
    };
    si32 imageIndex = 0;

    std::vector<InitialArmyStack> initialArmy;

    const CHeroClass * heroClass = nullptr;

    // 初始二级技能; first - 技能ID, second - 技能等级 (1 - 基础, 2 - 高级, 3 - 专家)
    std::vector<std::pair<SecondarySkill, ui8>> secSkillsInit;

    BonusList specialty;
    std::set<SpellID> spells;
    bool haveSpellBook = false;
    bool special = false; // 英雄是特殊的，不会被放置在游戏中（除非在地图上预设），例如战役英雄
    bool onlyOnWaterMap; // 英雄仅在包含水的地图上出现
    bool onlyOnMapWithoutWater; // 英雄仅在不含水的地图上出现
    EHeroGender gender = EHeroGender::MALE; // 性别：0=男性, 1=女性

    /// 图形资源
    std::string iconSpecSmall;
    std::string iconSpecLarge;
    std::string portraitSmall;
    std::string portraitLarge;
    AnimationPath battleImage;

    CHero();
    virtual ~CHero();

    int32_t getIndex() const override;
    int32_t getIconIndex() const override;
    std::string getJsonKey() const override;
    std::string getModScope() const override;
    HeroTypeID getId() const override;
    void registerIcons(const IconRegistar & cb) const override;

    std::string getNameTranslated() const override;
    std::string getBiographyTranslated() const override;
    std::string getSpecialtyNameTranslated() const override;
    std::string getSpecialtyDescriptionTranslated() const override;
    std::string getSpecialtyTooltipTranslated() const override;

    std::string getNameTextID() const override;
    std::string getBiographyTextID() const override;
    std::string getSpecialtyNameTextID() const override;
    std::string getSpecialtyDescriptionTextID() const override;
    std::string getSpecialtyTooltipTextID() const override;

    void updateFrom(const JsonNode & data);
    void serializeJson(JsonSerializeFormat & handler);
};
```

## 功能说明

CHero是VCMI中英雄类型的实现类，定义了游戏中每个英雄类型的基本属性、初始军队、技能、法术、性别等特征。它继承自HeroType接口，实现了英雄类型的各种方法。

## 依赖关系

- [HeroType](../../include/vcmi/HeroType.md): 英雄类型接口
- [CHeroClass](./CHeroClass.md): 英雄职业
- [BonusList](../bonuses/BonusList.md): 奖励列表
- [SecondarySkill](../constants/SecondarySkill.md): 二级技能
- [EHeroGender](./EHeroGender.md): 英雄性别
- [AnimationPath](../filesystem/ResourcePath.md): 动画路径
- [JsonNode](../json/JsonNode.md): JSON节点
- [JsonSerializeFormat](../json/JsonSerializeFormat.md): JSON序列化格式

## 函数注释

- `CHero()`: 构造函数，创建英雄对象
- `getIndex()`: 获取英雄索引
- `getIconIndex()`: 获取图标索引
- `getJsonKey()`: 获取JSON键值
- `getModScope()`: 获取模组范围
- `getId()`: 获取英雄ID
- `registerIcons(cb)`: 注册图标
- `getNameTranslated()`: 获取翻译后的英雄名称
- `getBiographyTranslated()`: 获取翻译后的英雄传记
- `getSpecialtyNameTranslated()`: 获取翻译后的特长名称
- `getSpecialtyDescriptionTranslated()`: 获取翻译后的特长描述
- `getSpecialtyTooltipTranslated()`: 获取翻译后的特长提示
- `getNameTextID()`: 获取名称文本ID
- `getBiographyTextID()`: 获取传记文本ID
- `getSpecialtyNameTextID()`: 获取特长名称文本ID
- `getSpecialtyDescriptionTextID()`: 获取特长描述文本ID
- `getSpecialtyTooltipTextID()`: 获取特长提示文本ID
- `updateFrom(data)`: 从JSON数据更新英雄信息
- `serializeJson(handler)`: JSON序列化
