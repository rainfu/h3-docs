# HeroType

## 源文件地址
`e:\develop\heroes\vcmi-assets\vcmi-client\include\vcmi\HeroType.h`

## 概述
`HeroType`定义了VCMI引擎中的英雄类型接口。该文件定义了[HeroType](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/HeroType.h#L17-L27)类，继承自[EntityWithBonuses](file:///e:/develop/heroes/vcmi-assets/vcmi-client/lib/entities/CArtHandler.h#L37-L37)，表示游戏中的具体英雄类型实体。

## 依赖关系
- [Entity.h](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/Entity.h) - 定义基础实体接口

## 类定义

### HeroType
表示游戏中的具体英雄类型实体，继承自[EntityWithBonuses](file:///e:/develop/heroes/vcmi-assets/vcmi-client/lib/entities/CArtHandler.h#L37-L37)<[HeroTypeID](file:///e:/develop/heroes/vcmi-assets/vcmi-client/lib/HeroTypeService.h#L30-L30)>。

#### 公共方法

- `virtual const HeroClass * getHeroClass() const = 0;`
  - 功能：获取英雄的职业
  - 返回值：指向英雄职业的常量指针

- `virtual const Faction * getBiographyTextID() const = 0;`
  - 功能：获取传记文本ID
  - 注意：这个方法名看起来可能有误，应该是获取传记文本ID，而不是Faction

- `virtual const Faction * getFaction() const = 0;`
  - 功能：获取英雄所属派系
  - 返回值：指向派系的常量指针

- `virtual bool isDefault() const = 0;`
  - 功能：判断是否为默认英雄
  - 返回值：如果是默认英雄返回true，否则返回false