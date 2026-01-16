# Problem

## 概述

`Problem` 是一个抽象接口，用于收集和报告法术施放过程中遇到的问题。`ProblemImpl` 是其具体实现，用于在法术验证和执行过程中记录各种问题信息。

## 架构设计

Problem 系统采用接口与实现的分离设计：

- `Problem`: 抽象接口，定义问题收集的基本操作
- `ProblemImpl`: 具体实现，位于 `spells::detail` 命名空间中

## Problem 接口

### 概述
`Problem` 类定义了问题收集和报告的抽象接口。

### 类型定义

#### Severity
```cpp
using Severity = int;
```
- **描述**: 问题严重程度的类型定义

#### ESeverity 枚举
```cpp
enum ESeverity
{
    LOWEST = std::numeric_limits<Severity>::min(),
    NORMAL = 0,
    CRITICAL = std::numeric_limits<Severity>::max()
};
```
- **LOWEST**: 最低严重程度
- **NORMAL**: 普通严重程度
- **CRITICAL**: 最高严重程度（默认值）

### 纯虚方法

#### add
```cpp
virtual void add(MetaString && description, Severity severity = CRITICAL) = 0;
```
- **参数**:
  - `description`: 问题的描述信息（MetaString类型，支持本地化）
  - `severity`: 问题的严重程度，默认为CRITICAL
- **描述**: 添加一个问题到集合中

#### getAll
```cpp
virtual void getAll(std::vector<std::string> & target) const = 0;
```
- **参数**:
  - `target`: 输出参数，用于存储所有问题的字符串描述
- **描述**: 获取所有问题的字符串表示

## ProblemImpl 实现

### 概述
`ProblemImpl` 是 `Problem` 接口的具体实现，使用向量存储问题数据。

### 私有成员变量

#### data
```cpp
std::vector<std::pair<MetaString, Severity>> data;
```
- **描述**: 存储问题数据的向量，每个元素包含问题的描述和严重程度

### 实现的方法

#### add (实现)
```cpp
void add(MetaString && description, Severity severity = CRITICAL) override;
```
- **实现**: 将问题描述和严重程度作为pair添加到data向量中
- **说明**: 使用移动语义优化性能

#### getAll (实现)
```cpp
void getAll(std::vector<std::string> & target) const override;
```
- **实现**: 遍历所有存储的问题，将MetaString转换为字符串并添加到目标向量中
- **说明**: 将本地化的MetaString转换为可读的字符串格式

## 使用示例

### 基本用法
```cpp
// 创建问题收集器
spells::detail::ProblemImpl problems;

// 添加不同严重程度的问题
problems.add(MetaString::createFromTextID("spell.problem.no_mana"), Problem::CRITICAL);
problems.add(MetaString::createFromTextID("spell.problem.wrong_target"), Problem::NORMAL);

// 获取所有问题
std::vector<std::string> allProblems;
problems.getAll(allProblems);

// 处理问题列表
for(const auto& problem : allProblems) {
    logGlobal->info("Spell problem: %s", problem);
}
```

### 在法术验证中的应用
```cpp
void validateSpellCast(const Spell* spell, const Caster* caster, Problem& problems) {
    // 检查法力值
    if(caster->getMana() < spell->getCost()) {
        problems.add(MetaString::createFromTextID("spell.error.insufficient_mana"));
    }

    // 检查施法距离
    if(!isInRange(caster, target)) {
        problems.add(MetaString::createFromTextID("spell.error.out_of_range"), Problem::NORMAL);
    }

    // 检查目标有效性
    if(!isValidTarget(spell, target)) {
        problems.add(MetaString::createFromTextID("spell.error.invalid_target"));
    }
}
```

## 设计意图

Problem 系统的设计目的是为了：

1. **统一问题报告**: 提供标准化的方式来收集和报告法术施放问题
2. **支持本地化**: 使用MetaString支持多语言问题描述
3. **严重程度分级**: 允许根据问题的严重程度进行不同的处理
4. **灵活的接口**: 抽象接口允许不同的实现方式

这在法术验证、法术执行和错误处理中都非常有用，可以帮助用户理解为什么某个法术无法施放或执行失败。