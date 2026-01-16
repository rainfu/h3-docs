# TargetCondition

## 概述

`TargetCondition` 系统用于检查法术目标是否对特定法术效果 receptive（可接受）。它通过一系列条件项来评估目标单位的属性、状态和免疫情况，决定法术是否可以对该目标生效。

## 架构设计

TargetCondition 系统采用组合模式设计：

- `TargetCondition`: 主控制器，管理三种类型的条件集合
- `TargetConditionItem`: 单个条件项的抽象接口
- `TargetConditionItemFactory`: 工厂类，用于创建各种类型的条件项

## 条件类型

TargetCondition 将条件分为三种类型：

### normal
```cpp
ItemVector normal;
```
- **描述**: 普通条件，必须全部满足（AND逻辑）
- **行为**: 如果任何普通条件失败，目标不可接受

### absolute
```cpp
ItemVector absolute;
```
- **描述**: 绝对条件，必须全部满足（AND逻辑），优先级最高
- **行为**: 如果任何绝对条件失败，立即返回false

### negation
```cpp
ItemVector negation;
```
- **描述**: 否定条件，任何一项满足即返回true（OR逻辑）
- **行为**: 用于处理特殊的免疫否定情况

## TargetConditionItem 接口

### 概述
`TargetConditionItem` 是单个条件检查项的抽象基类。

### 继承关系
```cpp
IReceptiveCheck
└── TargetConditionItem
```

### 纯虚方法

#### setInverted
```cpp
virtual void setInverted(bool value) = 0;
```
- **描述**: 设置条件是否取反（NOT逻辑）

#### setExclusive
```cpp
virtual void setExclusive(bool value) = 0;
```
- **描述**: 设置条件是否为排他性（必须满足）

#### isExclusive
```cpp
virtual bool isExclusive() const = 0;
```
- **返回值**: 条件是否为排他性
- **描述**: 获取条件的排他性设置

## TargetConditionItemFactory 工厂类

### 概述
`TargetConditionItemFactory` 提供创建各种预定义条件项的工厂方法。

### 类型定义

#### Object
```cpp
using Object = std::shared_ptr<TargetConditionItem>;
```
- **描述**: 条件项对象的智能指针类型

### 静态方法

#### getDefault
```cpp
static const TargetConditionItemFactory * getDefault();
```
- **返回值**: 默认工厂实例
- **描述**: 获取默认的条件项工厂

### 预定义条件创建方法

#### createAbsoluteLevel
```cpp
virtual Object createAbsoluteLevel() const = 0;
```
- **返回值**: 绝对等级条件（反魔法）
- **描述**: 创建检查目标是否有绝对免疫等级的条件

#### createAbsoluteSpell
```cpp
virtual Object createAbsoluteSpell() const = 0;
```
- **返回值**: 绝对法术条件
- **描述**: 创建检查目标是否有绝对法术免疫的条件

#### createElemental
```cpp
virtual Object createElemental() const = 0;
```
- **返回值**: 元素免疫条件
- **描述**: 创建检查目标元素免疫的条件

#### createNormalLevel
```cpp
virtual Object createNormalLevel() const = 0;
```
- **返回值**: 普通等级条件
- **描述**: 创建检查目标普通等级免疫的条件

#### createNormalSpell
```cpp
virtual Object createNormalSpell() const = 0;
```
- **返回值**: 普通法术条件
- **描述**: 创建检查目标普通法术免疫的条件

#### createResistance
```cpp
virtual Object createResistance() const = 0;
```
- **返回值**: 抗性条件
- **描述**: 创建检查目标法术抗性的条件

#### createReceptiveFeature
```cpp
virtual Object createReceptiveFeature() const = 0;
```
- **返回值**: 接受特性条件
- **描述**: 创建检查目标特殊接受特性的条件

#### createImmunityNegation
```cpp
virtual Object createImmunityNegation() const = 0;
```
- **返回值**: 免疫否定条件
- **描述**: 创建检查免疫被否定的条件

### 配置化创建方法

#### createConfigurable
```cpp
virtual Object createConfigurable(std::string scope, std::string type, std::string identifier) const = 0;
```
- **参数**:
  - `scope`: 模组范围
  - `type`: 条件类型 ("bonus", "creature", "spell", "healthValueSpecial")
  - `identifier`: 具体标识符
- **返回值**: 配置化的条件项对象
- **描述**: 根据类型和标识符创建特定条件的检查项

#### createFromJsonStruct
```cpp
virtual Object createFromJsonStruct(const JsonNode & jsonStruct) const = 0;
```
- **参数**:
  - `jsonStruct`: JSON结构定义的条件
- **返回值**: 从JSON创建的条件项对象
- **描述**: 从JSON结构创建条件项

## TargetCondition 主类

### 主要方法

#### isReceptive
```cpp
bool isReceptive(const Mechanics * m, const battle::Unit * target) const override;
```
- **参数**:
  - `m`: 法术机制对象
  - `target`: 目标单位
- **返回值**: 目标是否可接受法术效果
- **逻辑流程**:
  1. 检查所有绝对条件，必须全部通过
  2. 检查否定条件，任何一项通过即返回true
  3. 检查所有普通条件，必须全部通过

#### serializeJson
```cpp
void serializeJson(JsonSerializeFormat & handler, const ItemFactory * itemFactory);
```
- **描述**: 从JSON配置加载条件设置
- **加载的结构**:
  - `anyOf`: 非排他条件（normal类型）
  - `allOf`: 排他条件（absolute类型）
  - `noneOf`: 取反排他条件（negation类型）

### 私有方法

#### check
```cpp
bool check(const ItemVector & condition, const Mechanics * m, const battle::Unit * target) const;
```
- **描述**: 检查指定条件集合
- **逻辑**: 排他条件使用AND逻辑，非排他条件使用OR逻辑

#### loadConditions
```cpp
void loadConditions(const JsonNode & source, bool exclusive, bool inverted, const ItemFactory * itemFactory);
```
- **描述**: 从JSON节点加载条件到相应集合

## JSON配置格式

### 基础配置结构
```json
{
  "anyOf": {
    "bonus.resistance.fire": "normal"
  },
  "allOf": {
    "spell.antimagic": "absolute"
  },
  "noneOf": {
    "creature.immune": "normal"
  }
}
```

### 配置字段说明

- **anyOf**: 非排他条件集合（normal），使用OR逻辑
- **allOf**: 排他条件集合（absolute），使用AND逻辑
- **noneOf**: 取反排他条件集合（negation），使用AND逻辑后取反

### 条件值格式

- **字符串值**: "normal" 或 "absolute" 指定条件类型
- **结构体值**: 包含 "type", "parameters" 等字段的复杂条件

## 使用示例

### 基本检查
```cpp
// 创建目标条件
TargetCondition condition;
const auto* factory = TargetConditionItemFactory::getDefault();

// 从JSON加载配置
JsonSerializeFormat handler(jsonData);
condition.serializeJson(handler, factory);

// 检查目标是否可接受
bool canCast = condition.isReceptive(mechanics, targetUnit);
```

### 自定义条件项
```cpp
// 创建配置化条件
auto bonusCondition = factory->createConfigurable("core", "bonus", "resistance.fire");
bonusCondition->setExclusive(true);

// 添加到条件集合
condition.absolute.push_back(bonusCondition);
```

### JSON配置示例
```json
{
  "anyOf": {
    "core:bonus:resistance:fire": "normal",
    "core:bonus:resistance:water": "normal"
  },
  "allOf": {
    "core:spell:antimagic": "absolute"
  },
  "noneOf": {
    "core:creature:efreet": "normal"
  }
}
```

## 设计意图

TargetCondition 系统的设计目的是为了：

1. **灵活的条件组合**: 支持AND、OR、NOT逻辑的复杂条件组合
2. **模块化设计**: 通过工厂模式支持扩展新的条件类型
3. **配置化**: 允许通过JSON配置复杂的法术目标条件
4. **性能优化**: 绝对条件优先检查，避免不必要的计算
5. **免疫处理**: 特殊处理免疫否定逻辑，支持复杂的魔法免疫机制

这为法术系统提供了强大的目标有效性检查能力，支持从简单免疫到复杂组合条件的各种场景。