# ExternalCaster

## 概述

`ExternalCaster` 类继承自 `ProxyCaster`，用于表示外部施法者，比如通过脚本、事件或系统触发的法术施放。与普通施法者不同，外部施法者不消耗法力值，并且具有固定的法术等级。

## 继承关系

```cpp
ProxyCaster
└── ExternalCaster
```

## 公共成员变量

### schoolLevel
```cpp
int schoolLevel;
```
- **描述**: 外部施法者的法术等级
- **默认值**: 0

## 构造函数

### ExternalCaster()
```cpp
ExternalCaster();
```
- **描述**: 默认构造函数，初始化为空的代理施法者和0级法术等级

### ExternalCaster(const Caster * actualCaster_, int schoolLevel_)
```cpp
ExternalCaster(const Caster * actualCaster_, int schoolLevel_);
```
- **参数**:
  - `actualCaster_`: 实际的施法者对象
  - `schoolLevel_`: 法术等级
- **描述**: 使用指定的施法者和法术等级初始化外部施法者

## 公共方法

### setActualCaster
```cpp
void setActualCaster(const Caster * actualCaster);
```
- **参数**:
  - `actualCaster`: 要设置的实际施法者
- **描述**: 设置实际的施法者对象

### setSpellSchoolLevel
```cpp
void setSpellSchoolLevel(int level);
```
- **参数**:
  - `level`: 要设置的法术等级
- **描述**: 设置外部施法者的法术等级

### spendMana (重写)
```cpp
void spendMana(ServerCallback * server, const int32_t spellCost) const override;
```
- **参数**:
  - `server`: 服务器回调对象
  - `spellCost`: 法术消耗的法力值
- **描述**: 外部施法者不消耗法力值，此方法为空实现

### getSpellSchoolLevel (重写)
```cpp
int32_t getSpellSchoolLevel(const Spell * spell, SpellSchool * outSelectedSchool = nullptr) const override;
```
- **参数**:
  - `spell`: 法术对象
  - `outSelectedSchool`: 输出参数，用于返回选择的法术学派
- **返回值**: 返回外部施法者的固定法术等级
- **描述**: 返回预设的法术等级，而不是基于实际施法者的计算

## 使用示例

### 基本用法
```cpp
// 创建外部施法者
ExternalCaster externalCaster;

// 设置实际施法者和法术等级
externalCaster.setActualCaster(someHero);
externalCaster.setSpellSchoolLevel(3);

// 或者使用构造函数
ExternalCaster externalCaster2(someHero, 3);

// 外部施法者施放法术时不会消耗法力值
// 并且始终使用设定的法术等级
```

### 在脚本中的应用
```cpp
// 在地图脚本中创建外部施法者来施放法术
ExternalCaster scriptCaster;
scriptCaster.setSpellSchoolLevel(5); // 5级法术等级

// 施放法术而不消耗任何法力值
// 适用于事件触发或特殊效果
```

## 设计意图

`ExternalCaster` 的设计目的是为了处理那些不由游戏中的标准单位（如英雄、生物）施放的法术：

1. **脚本驱动的法术**: 地图事件或脚本触发的法术
2. **系统效果**: 游戏机制自动触发的法术效果
3. **特殊能力**: 不遵循标准法力消耗规则的法术施放

通过继承 `ProxyCaster`，`ExternalCaster` 可以代理任何实际的施法者，同时提供自定义的法术等级和法力消耗行为。