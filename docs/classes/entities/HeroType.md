# HeroType类

HeroType类是VCMI中英雄类型接口，定义了游戏中英雄类型的基本属性和功能。

## 类定义

```cpp
class DLL_LINKAGE HeroType : public EntityT<HeroTypeID>
{
    virtual std::string getBiographyTranslated() const = 0;
    virtual std::string getSpecialtyNameTranslated() const = 0;
    virtual std::string getSpecialtyDescriptionTranslated() const = 0;
    virtual std::string getSpecialtyTooltipTranslated() const = 0;

    virtual std::string getBiographyTextID() const = 0;
    virtual std::string getSpecialtyNameTextID() const = 0;
    virtual std::string getSpecialtyDescriptionTextID() const = 0;
    virtual std::string getSpecialtyTooltipTextID() const = 0;
};
```

## 功能说明

HeroType是VCMI英雄系统的基础接口，定义了游戏中所有英雄类型的通用功能。它继承自EntityT<HeroTypeID>，因此具备基本实体功能。这个接口主要关注英雄的背景故事和专长技能信息，这些是区分不同英雄的关键特征。

## 依赖关系

- [EntityT](./EntityT.md): 带ID的实体基类
- [HeroTypeID](./HeroTypeID.md): 英雄类型ID
- STL库: string等

## 函数注释

- `getBiographyTranslated()`: 纯虚函数，获取翻译后的英雄传记
- `getSpecialtyNameTranslated()`: 纯虚函数，获取翻译后的专长名称
- `getSpecialtyDescriptionTranslated()`: 纯虚函数，获取翻译后的专长描述
- `getSpecialtyTooltipTranslated()`: 纯虚函数，获取翻译后的专长提示信息
- `getBiographyTextID()`: 纯虚函数，获取英雄传记的文本ID
- `getSpecialtyNameTextID()`: 纯虚函数，获取专长名称的文本ID
- `getSpecialtyDescriptionTextID()`: 纯虚函数，获取专长描述的文本ID
- `getSpecialtyTooltipTextID()`: 纯虚函数，获取专长提示信息的文本ID