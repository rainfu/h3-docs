# Creature类

Creature类是VCMI中生物接口，定义了游戏中生物的基本属性和功能。

## 类定义

```cpp
/// 基类用于生物和战斗堆栈
class DLL_LINKAGE ACreature: public AFactionMember
{
public:
    bool isLiving() const; //非亡灵，非非生命或活着
    virtual ui32 getMovementRange(int turn) const; //获取考虑所有修正的生物速度（移动格数）
    virtual ui32 getMovementRange() const; //获取考虑所有修正的生物速度（移动格数）
    virtual ui32 getMaxHealth() const; //获取考虑所有修正的堆栈最大生命值
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

Creature是VCMI生物系统的基础接口，定义了游戏中所有生物类型的通用功能。它继承自CreatureEntity，而后者又继承自EntityT和ACreature。这个接口不仅定义了生物的基本战斗属性（攻击、防御、伤害、生命值等），还包括招募成本、AI价值等属性。

## 依赖关系

- [AFactionMember](./AFactionMember.md): 派系成员基类
- [CreatureEntity](./CreatureEntity.md): 生物实体模板类
- [EntityT](./EntityT.md): 带ID的实体基类
- [ACreature](./ACreature.md): 抽象生物类
- [CreatureID](./CreatureID.md): 生物ID
- [GameResID](./GameResID.md): 游戏资源ID
- [ResourceSet](./ResourceSet.md): 资源集
- STL库: string等

## 函数注释

### ACreature类

- `isLiving()`: 检查生物是否为活物（非亡灵，非无生命单位）
- `getMovementRange(turn)`: 获取指定回合的移动范围
- `getMovementRange()`: 获取当前移动范围
- `getMaxHealth()`: 获取最大生命值
- `getInitiative(turn)`: 获取指定回合的主动性

### Creature类

- `getNamePluralTranslated()`: 获取复数形式的翻译名称
- `getNameSingularTranslated()`: 获取单数形式的翻译名称
- `getNamePluralTextID()`: 获取复数形式的文本ID
- `getNameSingularTextID()`: 获取单数形式的文本ID
- `getAdvMapAmountMin()`: 获取冒险地图上出现的最小数量
- `getAdvMapAmountMax()`: 获取冒险地图上出现的最大数量
- `getAIValue()`: 获取AI价值（用于评估生物强度）
- `getFightValue()`: 获取战斗价值
- `getLevel()`: 获取生物等级
- `getGrowth()`: 获取每周增长率
- `getHorde()`: 获取群体奖励（额外生物数量）
- `getBaseAttack()`: 获取基础攻击力
- `getBaseDefense()`: 获取基础防御力
- `getBaseDamageMin()`: 获取基础最小伤害
- `getBaseDamageMax()`: 获取基础最大伤害
- `getBaseHitPoints()`: 获取基础生命值
- `getBaseSpellPoints()`: 获取基础魔法值
- `getBaseSpeed()`: 获取基础速度
- `getBaseShots()`: 获取基础射击次数
- `getRecruitCost(resIndex)`: 获取招募成本（指定资源）
- `getFullRecruitCost()`: 获取完整招募成本
- `hasUpgrades()`: 检查生物是否有升级
- `isDoubleWide()`: 检查生物是否占据双格