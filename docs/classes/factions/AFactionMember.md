# AFactionMember接口

AFactionMember接口是VCMI中派系成员的抽象基类，继承自IConstBonusProvider和INativeTerrainProvider。

## 类定义

```cpp
class DLL_LINKAGE AFactionMember: public IConstBonusProvider, public INativeTerrainProvider
{
public:
    /**
     Returns native terrain considering some terrain bonuses.
    */
    virtual TerrainId getNativeTerrain() const;
    /**
     Returns magic resistance considering some bonuses.
    */
    virtual int32_t magicResistance() const;
    /**
     Returns minimal damage of creature or (when implemented) hero.
    */
    virtual int getMinDamage(bool ranged) const;
    /**
     Returns maximal damage of creature or (when implemented) hero.
    */
    virtual int getMaxDamage(bool ranged) const;
    /**
     Returns attack of creature or hero.
    */
    virtual int getAttack(bool ranged) const;
    /**
     Returns defence of creature or hero.
    */
    virtual int getDefense(bool ranged) const;
    /**
     Returns morale of creature or hero. Taking absolute bonuses into account.
     For now, uses range from EGameSettings
    */
    int moraleVal() const;
    /**
     Returns luck of creature or hero. Taking absolute bonuses into account.
     For now, uses range from EGameSettings
    */
    int luckVal() const;
    /**
     Returns total value of all morale bonuses and sets bonusList as a pointer to the list of selected bonuses.
     @param bonusList is the out param it's list of all selected bonuses
     @return total value of all morale in the range from EGameSettings and 0 otherwise
    */
    int moraleValAndBonusList(std::shared_ptr<const BonusList> & bonusList) const;
    int luckValAndBonusList(std::shared_ptr<const BonusList> & bonusList) const;

    bool unaffectedByMorale() const;
};
```

## 功能说明

AFactionMember是VCMI中派系成员的抽象基类，代表属于某个派系的实体（如生物、英雄等）。它提供了访问派系成员基本战斗属性的方法，如原生地形、魔法抗性、攻击力、防御力、伤害范围等。该接口继承自IConstBonusProvider和INativeTerrainProvider，使其具备奖励计算和原生地形提供功能。

## 依赖关系

- [IConstBonusProvider](../bonuses/IConstBonusProvider.md): 常量奖励提供者接口
- [INativeTerrainProvider](./INativeTerrainProvider.md): 原生地形提供者接口
- [BonusList](../bonuses/BonusList.md): 奖励列表
- [TerrainId](../terrain/TerrainId.md): 地形ID类型
- STL库: shared_ptr

## 函数注释

### 属性获取
- `getNativeTerrain()`: 获取考虑地形奖励后的原生地形
- `magicResistance()`: 获取考虑奖励后的魔法抗性
- `getMinDamage(ranged)`: 获取近战或远程最小伤害
- `getMaxDamage(ranged)`: 获取近战或远程最大伤害
- `getAttack(ranged)`: 获取近战或远程攻击力
- `getDefense(ranged)`: 获取近战或远程防御力

### 幸运与士气
- `moraleVal()`: 获取考虑绝对奖励后的士气值
- `luckVal()`: 获取考虑绝对奖励后的幸运值
- `moraleValAndBonusList(bonusList)`: 获取士气值并返回奖励列表
- `luckValAndBonusList(bonusList)`: 获取幸运值并返回奖励列表
- `unaffectedByMorale()`: 判断是否不受士气影响