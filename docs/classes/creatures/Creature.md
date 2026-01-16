# Creature接口

Creature接口是VCMI中生物/单位的抽象接口，继承自CreatureEntity。

## 类定义

```cpp
class DLL_LINKAGE Creature : public CreatureEntity<CreatureID>
{
protected:
    // use getNamePlural/Singular instead
    std::string getNameTranslated() const override = 0;
    std::string getNameTextID() const override = 0;

public:
    virtual std::string getNamePluralTranslated() const = 0;
    virtual std::string getNameSingularTranslated() const = 0;

    virtual std::string getNamePluralTextID() const = 0;
    virtual std::string getNameSingularTextID() const = 0;

    virtual int32_t getAdvMapAmountMin() const = 0;
    virtual int32_t getAdvMapAmountMax() const = 0;
    virtual int32_t getAIValue() const = 0;
    virtual int32_t getFightValue() const = 0;
    virtual int32_t getLevel() const = 0;
    virtual int32_t getGrowth() const = 0;
    virtual int32_t getHorde() const = 0;

    virtual int32_t getBaseAttack() const = 0;
    virtual int32_t getBaseDefense() const = 0;
    virtual int32_t getBaseDamageMin() const = 0;
    virtual int32_t getBaseDamageMax() const = 0;
    virtual int32_t getBaseHitPoints() const = 0;
    virtual int32_t getBaseSpellPoints() const = 0;
    virtual int32_t getBaseSpeed() const = 0;
    virtual int32_t getBaseShots() const = 0;

    virtual int32_t getRecruitCost(GameResID resIndex) const = 0;
    virtual const ResourceSet & getFullRecruitCost() const = 0;
    
    virtual bool hasUpgrades() const = 0;

    virtual bool isDoubleWide() const = 0;
};
```

## 功能说明

Creature是VCMI游戏中生物/单位系统的基接口，用于表示游戏中的各种生物（如哥布林、骑士等）。它提供了访问生物基本属性的方法，如攻击力、防御力、生命值、速度、伤害范围等。该接口还提供了招募成本、升级可能性等信息。

## 依赖关系

- [CreatureEntity](./CreatureEntity.md): 生物实体基类
- [CreatureID](../identifiers/CreatureID.md): 生物ID类型
- [AFactionMember](../factions/AFactionMember.md): 派系成员基类
- [EntityT](../entities/EntityT.md): 通用实体基类
- [GameResID](../identifiers/GameResID.md): 游戏资源ID类型
- [ResourceSet](../resources/ResourceSet.md): 资源集
- STL库: string

## 函数注释

### 名称相关
- `getNamePluralTranslated()`: 获取复数形式的翻译名称
- `getNameSingularTranslated()`: 获取单数形式的翻译名称
- `getNamePluralTextID()`: 获取复数形式的文本ID
- `getNameSingularTextID()`: 获取单数形式的文本ID

### 数量相关
- `getAdvMapAmountMin()`: 获取冒险地图上最小数量
- `getAdvMapAmountMax()`: 获取冒险地图上最大数量
- `getAIValue()`: 获取AI评估价值
- `getFightValue()`: 获取战斗价值
- `getLevel()`: 获取等级
- `getGrowth()`: 获取每周增长率
- `getHorde()`: 获取群体加成（第二栖息地额外生物数量）

### 战斗属性
- `getBaseAttack()`: 获取基础攻击力
- `getBaseDefense()`: 获取基础防御力
- `getBaseDamageMin()`: 获取基础最小伤害
- `getBaseDamageMax()`: 获取基础最大伤害
- `getBaseHitPoints()`: 获取基础生命值
- `getBaseSpellPoints()`: 获取基础魔法值
- `getBaseSpeed()`: 获取基础速度
- `getBaseShots()`: 获取基础射击次数

### 招募成本
- `getRecruitCost(resIndex)`: 获取指定资源类型的招募成本
- `getFullRecruitCost()`: 获取完整的招募成本

### 其他属性
- `hasUpgrades()`: 判断是否有升级形态
- `isDoubleWide()`: 判断是否占据双倍空间