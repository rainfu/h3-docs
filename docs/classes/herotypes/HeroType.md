# HeroType接口

HeroType接口是VCMI中英雄类型的抽象接口，继承自EntityT。

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

HeroType是VCMI游戏中英雄类型的基接口，用于表示游戏中的各种英雄类型（如肯达尔、索姆拉等）。它提供了访问英雄基本信息的方法，如传记、特长名称和描述等。该接口继承自EntityT，使其具备实体特征和ID管理功能。

## 依赖关系

- [EntityT](../entities/EntityT.md): 通用实体基类
- [HeroTypeID](../identifiers/HeroTypeID.md): 英雄类型ID
- STL库: string

## 函数注释

### 翻译文本相关
- `getBiographyTranslated()`: 获取翻译后的英雄传记
- `getSpecialtyNameTranslated()`: 获取翻译后的特长名称
- `getSpecialtyDescriptionTranslated()`: 获取翻译后的特长描述
- `getSpecialtyTooltipTranslated()`: 获取翻译后的特长提示信息

### 文本ID相关
- `getBiographyTextID()`: 获取传记的文本ID
- `getSpecialtyNameTextID()`: 获取特长名称的文本ID
- `getSpecialtyDescriptionTextID()`: 获取特长描述的文本ID
- `getSpecialtyTooltipTextID()`: 获取特长提示信息的文本ID