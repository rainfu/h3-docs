# CChargedArtifact类

CChargedArtifact类是VCMI中充能神器的实现类，用于处理具有使用次数限制的神器。

## 类定义

```cpp
class DLL_LINKAGE CChargedArtifact
{
    DischargeArtifactCondition condition;
    bool removeOnDepletion;
    uint16_t defaultStartCharges;

protected:
    CChargedArtifact();

public:
    bool isCharged() const;

    void setCondition(const DischargeArtifactCondition & dischargeCondition);
    void setRemoveOnDepletion(const bool remove);
    void setDefaultStartCharges(const uint16_t charges);
    uint16_t getDefaultStartCharges() const;
    DischargeArtifactCondition getDischargeCondition() const;
    bool getRemoveOnDepletion() const;
    std::optional<uint16_t> getChargeCost(const SpellID & id) const;
};
```

## 功能说明

CChargedArtifact是VCMI神器系统中处理充能神器的实现类，用于表示具有使用次数限制的神器。这类神器在使用时会消耗一定数量的充能，当充能耗尽时可能有不同的处理方式（如移除或保留）。该类管理充能的初始数量、消耗规则以及耗尽后的处理方式。

## 依赖关系

- [DischargeArtifactCondition](../conditions/DischargeArtifactCondition.md): 神器放电条件
- [SpellID](../identifiers/SpellID.md): 法术ID类型
- STL库: optional

## 构造函数

- `CChargedArtifact()`: 保护构造函数，初始化充能神器

## 函数注释

- `isCharged()`: 检查神器是否为充能类型
- `setCondition(dischargeCondition)`: 设置放电条件
- `setRemoveOnDepletion(remove)`: 设置耗尽时是否移除神器
- `setDefaultStartCharges(charges)`: 设置默认起始充能数
- `getDefaultStartCharges()`: 获取默认起始充能数
- `getDischargeCondition()`: 获取放电条件
- `getRemoveOnDepletion()`: 获取耗尽时是否移除的设置
- `getChargeCost(id)`: 获取指定法术的充能消耗，若未指定则返回空值