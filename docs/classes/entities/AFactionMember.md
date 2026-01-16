# AFactionMember类

AFactionMember类是VCMI中抽象派系成员类，为属于特定派系的游戏实体提供通用功能。

## 类定义

```cpp
class DLL_LINKAGE AFactionMember: public IConstBonusProvider, public INativeTerrainProvider
{
public:
    /**
     返回原生地形，考虑某些地形奖励。
    */
    virtual TerrainId getNativeTerrain() const;
    /**
     返回魔法抗性，考虑某些奖励。
    */
    virtual int32_t magicResistance() const;
    /**
     返回生物或（如果实现）英雄的最小伤害。
    */
    virtual int getMinDamage(bool ranged) const;
    /**
     返回生物或（如果实现）英雄的最大伤害。
    */
    virtual int getMaxDamage(bool ranged) const;
    /**
     返回生物或英雄的攻击力。
    */
    virtual int getAttack(bool ranged) const;
    /**
     返回生物或英雄的防御力。
    */
    virtual int getDefense(bool ranged) const;
    /**
     返回生物或英雄的士气。考虑绝对奖励。
     目前，使用EGameSettings中的范围
    */
    int moraleVal() const;
    /**
     返回生物或英雄的运气。考虑绝对奖励。
     目前，使用EGameSettings中的范围
    */
    int luckVal() const;
    /**
     返回所有士气奖励的总值，并将bonusList设置为所选奖励的列表指针。
     @param bonusList 是输出参数，它是所有选定奖励的列表
     @return EGameSettings范围内的所有士气的总值，否则为0
    */
    int moraleValAndBonusList(std::shared_ptr<const BonusList> & bonusList) const;
    int luckValAndBonusList(std::shared_ptr<const BonusList> & bonusList) const;

    bool unaffectedByMorale() const;
};
```

## 功能说明

AFactionMember是VCMI实体系统中的抽象基类，为属于特定派系的游戏实体（如生物、英雄等）提供通用功能。它继承自IConstBonusProvider和INativeTerrainProvider，因此具有奖励系统访问能力和原生地形信息。这个类定义了派系成员的基本战斗属性（攻击、防御、伤害等）和状态属性（士气、运气、魔法抗性等）。

## 依赖关系

- [IConstBonusProvider](./IConstBonusProvider.md): 常量奖励提供者接口
- [INativeTerrainProvider](./INativeTerrainProvider.md): 原生地形提供者接口
- [BonusList](../bonuses/BonusList.md): 奖励列表
- [TerrainId](./TerrainId.md): 地形ID
- STL库: shared_ptr等

## 函数注释

- `getNativeTerrain()`: 虚函数，返回考虑某些地形奖励的原生地形
- `magicResistance()`: 虚函数，返回考虑某些奖励的魔法抗性
- `getMinDamage(ranged)`: 虚函数，返回生物或英雄的最小伤害
- `getMaxDamage(ranged)`: 虚函数，返回生物或英雄的最大伤害
- `getAttack(ranged)`: 虚函数，返回生物或英雄的攻击力
- `getDefense(ranged)`: 虚函数，返回生物或英雄的防御力
- `moraleVal()`: 返回生物或英雄的士气，考虑绝对奖励
- `luckVal()`: 返回生物或英雄的运气，考虑绝对奖励
- `moraleValAndBonusList(bonusList)`: 返回所有士气奖励的总值，并提供奖励列表
- `luckValAndBonusList(bonusList)`: 返回所有运气奖励的总值，并提供奖励列表
- `unaffectedByMorale()`: 检查是否不受士气影响