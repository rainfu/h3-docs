# Creature类

Creature类是VCMI中生物类型的接口，定义了游戏中生物的基本属性和功能。

## 类定义

```cpp
class DLL_LINKAGE ACreature: public AFactionMember
{
public:
    bool isLiving() const; // 检查是否为活物（非亡灵，非非生命）
    virtual ui32 getMovementRange(int turn) const; // 获取带修饰符的生物速度（移动格数）
    virtual ui32 getMovementRange() const; // 获取带修饰符的生物速度（移动格数）
    virtual ui32 getMaxHealth() const; // 获取带修饰符的堆栈最大生命值
    virtual int32_t getInitiative(int turn = 0) const;
};

template <typename IdType>
class DLL_LINKAGE CreatureEntity : public EntityT<IdType>, public ACreature
{
};

class DLL_LINKAGE Creature : public CreatureEntity<CreatureID>
{
protected:
    // 使用getNamePlural/Singular代替
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

Creature是VCMI中生物类型的接口，定义了游戏中每个生物类型的基本属性，如攻击力、防御力、生命值、速度、伤害等。它继承自ACreature和AFactionMember，提供了生物在战斗和冒险地图中的各项参数。

## 依赖关系

- [AFactionMember](./AFactionMember.md): 派系成员基类
- [EntityT](./EntityT.md): 实体模板类
- [CreatureID](../constants/CreatureID.md): 生物ID
- [GameResID](../constants/GameResID.md): 游戏资源ID
- [ResourceSet](./ResourceSet.md): 资源集

## 函数注释

- `isLiving()`: 检查生物是否为活物（非亡灵，非非生命）
- `getMovementRange(turn)`: 获取指定回合的移动范围
- `getMaxHealth()`: 获取最大生命值
- `getInitiative(turn)`: 获取指定回合的主动性
- `getNamePluralTranslated()`: 获取翻译后的复数名称
- `getNameSingularTranslated()`: 获取翻译后的单数名称
- `getNamePluralTextID()`: 获取复数名称的文本ID
- `getNameSingularTextID()`: 获取单数名称的文本ID
- `getAdvMapAmountMin()`: 获取冒险地图最小数量
- `getAdvMapAmountMax()`: 获取冒险地图最大数量
- `getAIValue()`: 获取AI价值
- `getFightValue()`: 获取战斗价值
- `getLevel()`: 获取生物等级
- `getGrowth()`: 获取每周增长数量
- `getHorde()`: 获取部落加成数量
- `getBaseAttack()`: 获取基础攻击力
- `getBaseDefense()`: 获取基础防御力
- `getBaseDamageMin()`: 获取最小基础伤害
- `getBaseDamageMax()`: 获取最大基础伤害
- `getBaseHitPoints()`: 获取基础生命值
- `getBaseSpellPoints()`: 获取基础魔法值
- `getBaseSpeed()`: 获取基础速度
- `getBaseShots()`: 获取基础射击次数
- `getRecruitCost(resIndex)`: 获取招募成本
- `getFullRecruitCost()`: 获取完整招募成本
- `hasUpgrades()`: 检查是否有升级选项
- `isDoubleWide()`: 检查是否占用双倍空间