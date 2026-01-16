# IBonusBearer类

IBonusBearer类是VCMI奖励系统的接口类，定义了奖励承载者的基本功能。

## 类定义

```cpp
class DLL_LINKAGE IBonusBearer
{
public:
    virtual ~IBonusBearer() = default;
    virtual TConstBonusListPtr getAllBonuses(const CSelector &selector, const std::string &cachingStr = {}) const = 0;
    int valOfBonuses(const CSelector &selector, const std::string &cachingStr = {}, int baseValue = 0) const;
    bool hasBonus(const CSelector &selector, const std::string &cachingStr = {}) const;
    TConstBonusListPtr getBonuses(const CSelector &selector, const std::string &cachingStr = {}) const;
    std::shared_ptr<const Bonus> getBonus(const CSelector &selector) const;
    int applyBonuses(BonusType type, int baseValue) const;
    int valOfBonuses(BonusType type) const;
    bool hasBonusOfType(BonusType type) const;
    int valOfBonuses(BonusType type, BonusSubtypeID subtype) const;
    bool hasBonusOfType(BonusType type, BonusSubtypeID subtype) const;
    bool hasBonusFrom(BonusSource source) const;
    bool hasBonusFrom(BonusSource source, BonusSourceID sourceID) const;
    TConstBonusListPtr getBonusesFrom(BonusSource source) const;
    TConstBonusListPtr getBonusesOfType(BonusType type) const;
    TConstBonusListPtr getBonusesOfType(BonusType type, BonusSubtypeID subtype) const;
    virtual int32_t getTreeVersion() const = 0;
};
```

## 功能说明

IBonusBearer是VCMI奖励系统的基础接口，定义了所有奖励承载者（如英雄、生物、城镇等）应该实现的方法。通过这个接口，可以查询、获取和计算各种奖励（如属性加成、技能修正等）。

## 依赖关系

- [Bonus](./Bonus.md): 奖励类
- [CSelector](./CSelector.md): 奖励选择器
- [BonusType](../constants/BonusType.md): 奖励类型
- [BonusSubtypeID](../constants/BonusSubtypeID.md): 奖励子类型ID
- [BonusSource](../constants/BonusSource.md): 奖励来源
- [BonusSourceID](../constants/BonusSourceID.md): 奖励来源ID

## 函数注释

- `getAllBonuses(selector, cachingStr)`: 获取满足选择器条件的所有奖励
- `valOfBonuses(selector, cachingStr, baseValue)`: 计算满足选择器条件的奖励值总和
- `hasBonus(selector, cachingStr)`: 检查是否有满足选择器条件的奖励
- `getBonuses(selector, cachingStr)`: 获取满足选择器条件的奖励列表
- `getBonus(selector)`: 获取任意一个满足选择器条件的奖励
- `applyBonuses(type, baseValue)`: 对基础值应用指定类型的奖励
- `valOfBonuses(type)`: 获取指定类型奖励的总值
- `hasBonusOfType(type)`: 检查是否有指定类型的奖励
- `valOfBonuses(type, subtype)`: 获取指定类型和子类型的奖励总值
- `hasBonusOfType(type, subtype)`: 检查是否有指定类型和子类型的奖励
- `hasBonusFrom(source)`: 检查是否有来自指定来源的奖励
- `hasBonusFrom(source, sourceID)`: 检查是否有来自指定来源和ID的奖励
- `getBonusesFrom(source)`: 获取来自指定来源的奖励列表
- `getBonusesOfType(type)`: 获取指定类型的奖励列表
- `getBonusesOfType(type, subtype)`: 获取指定类型和子类型的奖励列表
- `getTreeVersion()`: 获取奖励树的版本号，用于缓存机制