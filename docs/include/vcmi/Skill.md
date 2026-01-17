# Skill

## 源文件地址
`e:\develop\heroes\vcmi-assets\vcmi-client\include\vcmi/Skill.h`

## 概述
`Skill`定义了VCMI引擎中的技能接口。该文件定义了[Skill](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/Skill.h#L15-L26)类，继承自[EntityWithBonuses](file:///e:/develop/heroes/vcmi-assets/vcmi-client/lib/entities/CArtHandler.h#L37-L37)，表示游戏中的技能实体。

## 依赖关系
- [Entity.h](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/Entity.h) - 定义基础实体接口

## 类定义

### Skill
表示游戏中的技能实体，继承自[EntityWithBonuses](file:///e:/develop/heroes/vcmi-assets/vcmi-client/lib/entities/CArtHandler.h#L37-L37)<[SecondarySkillID](file:///e:/develop/heroes/vcmi-assets/vcmi-client/lib/SecondarySkillsManager.h#L31-L31)>。

#### 公共方法

- `virtual int32_t getIndex() const override = 0;`
  - 功能：获取技能索引
  - 返回值：技能索引值

- `virtual std::string getNameTranslated() const override = 0;`
  - 功能：获取翻译后的技能名称
  - 返回值：翻译后的技能名称

- `virtual std::string getNameTextID() const override = 0;`
  - 功能：获取技能名称的文本ID
  - 返回值：技能名称的文本ID

- `virtual std::string getJsonKey() const override = 0;`
  - 功能：获取技能的JSON键
  - 返回值：技能的JSON键

- `virtual std::string getDescriptionTranslated() const = 0;`
  - 功能：获取翻译后的技能描述
  - 返回值：翻译后的技能描述

- `virtual std::string getDescriptionTextID() const = 0;`
  - 功能：获取技能描述的文本ID
  - 返回值：技能描述的文本ID