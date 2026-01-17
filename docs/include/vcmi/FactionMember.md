# FactionMember

## 源文件地址
`e:\develop\heroes\vcmi-assets\vcmi-client\include\vcmi\FactionMember.h`

## 概述
`FactionMember`定义了VCMI引擎中派系成员的基类接口。该文件定义了[AFactionMember](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/FactionMember.h#L16-L66)抽象类，继承自[IConstBonusProvider](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/Entity.h#L17-L21)和[INativeTerrainProvider](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/Entity.h#L23-L29)，提供派系成员的通用功能。

## 依赖关系
- [Entity.h](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/Entity.h) - 定义基础实体接口

## 类定义

### AFactionMember
派系成员的抽象基类，继承自[IConstBonusProvider](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/Entity.h#L17-L21)和[INativeTerrainProvider](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/Entity.h#L23-L29)。

#### 公共方法

- `virtual TerrainId getNativeTerrain() const;`
  - 功能：获取原生地形，考虑某些地形奖励

- `virtual int32_t magicResistance() const;`
  - 功能：获取魔法抗性，考虑某些奖励

- `virtual int getMinDamage(bool ranged) const;`
  - 功能：获取生物或英雄的最小伤害值
  - 参数：ranged - 是否为远程攻击
  - 返回值：最小伤害值

- `virtual int getMaxDamage(bool ranged) const;`
  - 功能：获取生物或英雄的最大伤害值
  - 参数：ranged - 是否为远程攻击
  - 返回值：最大伤害值

- `virtual int getAttack(bool ranged) const;`
  - 功能：获取生物或英雄的攻击力
  - 参数：ranged - 是否为远程攻击
  - 返回值：攻击力

- `virtual int getDefense(bool ranged) const;`
  - 功能：获取生物或英雄的防御力
  - 参数：ranged - 是否为远程攻击
  - 返回值：防御力

- `int moraleVal() const;`
  - 功能：获取生物或英雄的士气值，考虑绝对奖励
  - 返回值：士气值

- `int luckVal() const;`
  - 功能：获取生物或英雄的运气值，考虑绝对奖励
  - 返回值：运气值

- `int moraleValAndBonusList(std::shared_ptr<const BonusList> & bonusList) const;`
  - 功能：获取所有士气奖励的总值，并将bonusList设为所选奖励列表的指针
  - 参数：bonusList - 输出参数，所选奖励的列表
  - 返回值：EGameSettings范围内所有士气的总值，否则为0

- `int luckValAndBonusList(std::shared_ptr<const BonusList> & bonusList) const;`
  - 功能：获取所有运气奖励的总值，并将bonusList设为所选奖励列表的指针
  - 参数：bonusList - 输出参数，所选奖励的列表
  - 返回值：EGameSettings范围内所有运气的总值，否则为0

- `bool unaffectedByMorale() const;`
  - 功能：判断是否不受士气影响
  - 返回值：如果不受士气影响返回true，否则返回false