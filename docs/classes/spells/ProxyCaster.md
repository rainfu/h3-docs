# ProxyCaster

## 概述

`ProxyCaster` 类实现了代理模式，用于代理另一个 `Caster` 对象的所有操作。它继承自 `Caster` 接口，并将所有方法调用转发给被代理的实际施法者对象。

## 继承关系

```cpp
Caster
└── ProxyCaster
```

## 受保护成员变量

### actualCaster
```cpp
const Caster * actualCaster;
```
- **描述**: 被代理的实际施法者对象指针

## 构造函数和析构函数

### ProxyCaster
```cpp
ProxyCaster(const Caster * actualCaster_);
```
- **参数**:
  - `actualCaster_`: 要代理的实际施法者对象
- **描述**: 使用指定的施法者对象初始化代理

### ~ProxyCaster
```cpp
virtual ~ProxyCaster();
```
- **描述**: 虚析构函数

## 代理方法

`ProxyCaster` 重写了 `Caster` 接口的所有方法，并将调用转发给 `actualCaster`。如果 `actualCaster` 为 nullptr，则提供合理的默认值。

### getCasterUnitId
```cpp
int32_t getCasterUnitId() const override;
```
- **返回值**: 如果有实际施法者则返回其单位ID，否则返回-1
- **描述**: 获取施法者单位ID

### getSpellSchoolLevel
```cpp
int32_t getSpellSchoolLevel(const Spell * spell, SpellSchool * outSelectedSchool = nullptr) const override;
```
- **返回值**: 如果有实际施法者则返回其法术等级，否则返回0
- **描述**: 获取法术学派等级

### getEffectLevel
```cpp
int32_t getEffectLevel(const Spell * spell) const override;
```
- **返回值**: 如果有实际施法者则返回其效果等级，否则返回0
- **描述**: 获取法术效果等级

### getSpellBonus
```cpp
int64_t getSpellBonus(const Spell * spell, int64_t base, const battle::Unit * affectedStack) const override;
```
- **返回值**: 如果有实际施法者则返回其法术加成，否则返回基础值
- **描述**: 获取法术加成值

### getSpecificSpellBonus
```cpp
int64_t getSpecificSpellBonus(const Spell * spell, int64_t base) const override;
```
- **返回值**: 如果有实际施法者则返回其特定法术加成，否则返回基础值
- **描述**: 获取特定法术的加成值

### getEffectPower
```cpp
int32_t getEffectPower(const Spell * spell) const override;
```
- **返回值**: 如果有实际施法者则返回其效果强度，否则返回法术等级对应的基础强度
- **描述**: 获取法术效果强度

### getEnchantPower
```cpp
int32_t getEnchantPower(const Spell * spell) const override;
```
- **返回值**: 如果有实际施法者则返回其附魔强度，否则返回法术等级对应的基础强度
- **描述**: 获取法术附魔强度

### getEffectValue
```cpp
int64_t getEffectValue(const Spell * spell) const override;
```
- **返回值**: 如果有实际施法者则返回其效果值，否则返回0
- **描述**: 获取法术效果数值

### getEffectRange
```cpp
int64_t getEffectRange(const Spell * spell) const override;
```
- **返回值**: 如果有实际施法者则返回其效果范围，否则返回0
- **描述**: 获取法术效果范围

### getCasterOwner
```cpp
PlayerColor getCasterOwner() const override;
```
- **返回值**: 如果有实际施法者则返回其所有者，否则返回 `PlayerColor::CANNOT_DETERMINE`
- **描述**: 获取施法者所有者

### getCasterName
```cpp
void getCasterName(MetaString & text) const override;
```
- **描述**: 如果有实际施法者则获取其名称

### getCastDescription
```cpp
void getCastDescription(const Spell * spell, const battle::Units & attacked, MetaString & text) const override;
```
- **描述**: 如果有实际施法者则获取施法描述

### spendMana
```cpp
void spendMana(ServerCallback * server, const int32_t spellCost) const override;
```
- **描述**: 如果有实际施法者则消耗其法力值

### getHeroCaster
```cpp
const CGHeroInstance * getHeroCaster() const override;
```
- **返回值**: 如果有实际施法者且为英雄则返回英雄对象，否则返回nullptr
- **描述**: 获取英雄施法者

### manaLimit
```cpp
int32_t manaLimit() const override;
```
- **返回值**: 如果有实际施法者则返回其法力上限，否则返回0
- **描述**: 获取法力值上限

## 使用示例

### 基本代理用法
```cpp
// 创建实际施法者
const Caster* realCaster = hero;

// 创建代理
ProxyCaster proxyCaster(realCaster);

// 代理的所有操作都会转发给实际施法者
int level = proxyCaster.getSpellSchoolLevel(spell); // 等同于 realCaster->getSpellSchoolLevel(spell)
int power = proxyCaster.getEffectPower(spell);      // 等同于 realCaster->getEffectPower(spell)
```

### 空代理的默认行为
```cpp
// 创建空代理（actualCaster为nullptr）
ProxyCaster nullProxy(nullptr);

// 所有方法返回默认值
int unitId = nullProxy.getCasterUnitId();     // 返回 -1
int level = nullProxy.getSpellSchoolLevel(spell); // 返回 0
PlayerColor owner = nullProxy.getCasterOwner();   // 返回 CANNOT_DETERMINE
```

### 继承和扩展
```cpp
class CustomProxyCaster : public ProxyCaster {
public:
    CustomProxyCaster(const Caster* caster) : ProxyCaster(caster) {}

    // 重写特定方法以添加自定义逻辑
    int32_t getEffectPower(const Spell* spell) const override {
        int32_t basePower = ProxyCaster::getEffectPower(spell);
        return basePower + customBonus; // 添加自定义加成
    }
};
```

## 设计意图

`ProxyCaster` 的设计采用了经典的代理模式，主要用于：

1. **透明代理**: 提供与实际施法者相同的接口，无缝替换
2. **空值处理**: 优雅处理nullptr情况，提供合理的默认值
3. **扩展基础**: 作为基类供子类继承和扩展特定行为
4. **解耦合**: 将施法者接口与具体实现分离

这在需要修改或扩展施法者行为而不改变原有代码的场景中特别有用，比如 `ExternalCaster`、`SilentCaster` 等子类。