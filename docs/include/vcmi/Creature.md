# Creature

## 源文件地址
`e:\develop\heroes\vcmi-assets\vcmi-client\include\vcmi\Creature.h`

## 概述
`Creature`定义了VCMI引擎中的生物系统接口。该文件定义了[Creature](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/Creature.h#L41-L74)类，继承自[FactionMember.h](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/FactionMember.h)，表示游戏中的生物实体。

## 依赖关系
- [FactionMember.h](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/FactionMember.h) - 定义派系成员接口

## 类定义

### ACreature
基础生物类，继承自[AFactionMember](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/FactionMember.h#L20-L40)，提供了生物的基本功能。

#### 公共方法

- `bool isLiving() const;`
  - 功能：判断是否为活物（非亡灵，非非生命体）
  
- `virtual ui32 getMovementRange(int turn) const;`
  - 功能：获取生物的移动范围（带有修饰符）
  - 参数：turn - 回合数
  - 返回值：移动范围（格数）
  
- `virtual ui32 getMovementRange() const;`
  - 功能：获取生物的移动范围（带有修饰符）
  - 返回值：移动范围（格数）

- `virtual ui32 getMaxHealth() const;`
  - 功能：获取生物的最大生命值（带有修饰符）
  - 返回值：最大生命值

- `virtual int32_t getInitiative(int turn = 0) const;`
  - 功能：获取生物的行动顺序值
  - 参数：turn - 回合数（默认为0）
  - 返回值：行动顺序值

### CreatureEntity
模板类，继承自[EntityT](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/Entity.h#L30-L30)<IdType>和[ACreature](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/Creature.h#L20-L33)，提供具体生物类型的基类。

### Creature
表示游戏中的具体生物实体，继承自[CreatureEntity](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/Creature.h#L35-L39)<[CreatureID](file:///e:/develop/heroes/vcmi-assets/vcmi-client/lib/CreatureService.h#L30-L30)>。

#### 公共方法

- `virtual std::string getNamePluralTranslated() const = 0;`
  - 功能：获取复数形式的生物名称（已翻译）

- `virtual std::string getNameSingularTranslated() const = 0;`
  - 功能：获取单数形式的生物名称（已翻译）

- `virtual std::string getNamePluralTextID() const = 0;`
  - 功能：获取复数形式的生物名称文本ID

- `virtual std::string getNameSingularTextID() const = 0;`
  - 功能：获取单数形式的生物名称文本ID

- `virtual int32_t getAdvMapAmountMin() const = 0;`
  - 功能：获取冒险地图上该生物的最小数量

- `virtual int32_t getAdvMapAmountMax() const = 0;`
  - 功能：获取冒险地图上该生物的最大数量

- `virtual int32_t getAIValue() const = 0;`
  - 功能：获取AI价值（影响AI购买决策）

- `virtual int32_t getFightValue() const = 0;`
  - 功能：获取战斗价值

- `virtual int32_t getLevel() const = 0;`
  - 功能：获取生物等级

- `virtual int32_t getGrowth() const = 0;`
  - 功能：获取每周增长率

- `virtual int32_t getHorde() const = 0;`
  - 功能：获取群体奖励（在城镇中的额外数量）

- `virtual int32_t getBaseAttack() const = 0;`
  - 功能：获取基础攻击力

- `virtual int32_t getBaseDefense() const = 0;`
  - 功能：获取基础防御力

- `virtual int32_t getBaseDamageMin() const = 0;`
  - 功能：获取基础最小伤害值

- `virtual int32_t getBaseDamageMax() const = 0;`
  - 功能：获取基础最大伤害值

- `virtual int32_t getBaseHitPoints() const = 0;`
  - 功能：获取基础生命值

- `virtual int32_t getBaseSpellPoints() const = 0;`
  - 功能：获取基础法力值

- `virtual int32_t getBaseSpeed() const = 0;`
  - 功能：获取基础速度

- `virtual int32_t getBaseShots() const = 0;`
  - 功能：获取基础射击次数

- `virtual int32_t getRecruitCost(GameResID resIndex) const = 0;`
  - 功能：获取招募成本（指定资源类型）
  - 参数：resIndex - 资源类型索引
  - 返回值：该资源类型的招募成本

- `virtual const ResourceSet & getFullRecruitCost() const = 0;`
  - 功能：获取完整的招募成本
  - 返回值：完整的资源消耗

- `virtual bool hasUpgrades() const = 0;`
  - 功能：判断该生物是否有升级形态
  - 返回值：如果有升级形态返回true，否则返回false

- `virtual bool isDoubleWide() const = 0;`
  - 功能：判断生物是否占用双格
  - 返回值：如果是双格生物返回true，否则返回false