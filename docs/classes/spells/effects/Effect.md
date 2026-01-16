# Effect

## 概述

`Effect` 类是VCMI法术效果系统的基类，定义了所有法术效果的通用接口和行为。每个具体的法术效果（如伤害、治疗、召唤等）都继承自这个基类，并实现其纯虚函数。

## 继承层次

```cpp
Effect
├── Damage      // 伤害效果
├── Heal        // 治疗效果
├── Summon      // 召唤效果
├── Teleport    // 传送效果
├── Clone       // 克隆效果
├── Dispel      // 驱散效果
└── ...         // 其他具体效果
```

## 核心属性

### 基本属性
```cpp
bool indirect = false;     // 是否为间接效果
bool optional = false;     // 是否为可选效果
std::string name;          // 效果名称
```

## 构造函数和析构函数

### ~Effect
```cpp
virtual ~Effect() = default;
```
- **功能**: 虚析构函数，确保子类正确析构

## 目标类型调整

### adjustTargetTypes
```cpp
virtual void adjustTargetTypes(std::vector<TargetType> & types) const = 0;
```
- **功能**: 调整法术效果的目标类型列表
- **参数**: `types` - 目标类型向量（输入输出参数）
- **说明**: 子类实现此函数来指定效果适用的目标类型

## 影响区域计算

### adjustAffectedHexes
```cpp
virtual void adjustAffectedHexes(BattleHexArray & hexes, const Mechanics * m, const Target & spellTarget) const = 0;
```
- **功能**: 计算法术效果影响的战场格子
- **参数**:
  - `hexes` - 受影响的格子数组（输出参数）
  - `m` - 法术机制对象
  - `spellTarget` - 法术目标

## 适用性检查

### applicable (战场检查)
```cpp
virtual bool applicable(Problem & problem, const Mechanics * m) const;
```
- **功能**: 检查效果在当前战场上是否有有效目标
- **参数**:
  - `problem` - 问题报告对象
  - `m` - 法术机制对象
- **返回值**: true表示有有效目标

### applicable (目标检查)
```cpp
virtual bool applicable(Problem & problem, const Mechanics * m, const EffectTarget & target) const;
```
- **功能**: 检查效果是否可以应用到指定目标
- **参数**:
  - `problem` - 问题报告对象
  - `m` - 法术机制对象
  - `target` - 效果目标
- **返回值**: true表示可以应用

## 效果应用

### apply
```cpp
virtual void apply(ServerCallback * server, const Mechanics * m, const EffectTarget & target) const = 0;
```
- **功能**: 将效果应用到目标
- **参数**:
  - `server` - 服务器回调接口
  - `m` - 法术机制对象
  - `target` - 效果目标

## 目标过滤和转换

### filterTarget
```cpp
virtual EffectTarget filterTarget(const Mechanics * m, const EffectTarget & target) const = 0;
```
- **功能**: 过滤目标，只保留有效的目标子集
- **参数**:
  - `m` - 法术机制对象
  - `target` - 输入目标
- **返回值**: 过滤后的有效目标

### transformTarget
```cpp
virtual EffectTarget transformTarget(const Mechanics * m, const Target & aimPoint, const Target & spellTarget) const = 0;
```
- **功能**: 转换目标位置
- **参数**:
  - `m` - 法术机制对象
  - `aimPoint` - 瞄准点
  - `spellTarget` - 法术目标
- **返回值**: 转换后的目标

## 序列化

### serializeJson
```cpp
void serializeJson(JsonSerializeFormat & handler);
```
- **功能**: JSON序列化效果参数
- **参数**: `handler` - JSON序列化处理器

### serializeJsonEffect (受保护)
```cpp
virtual void serializeJsonEffect(JsonSerializeFormat & handler) = 0;
```
- **功能**: 子类实现的JSON序列化逻辑
- **参数**: `handler` - JSON序列化处理器

## 工厂方法

### create
```cpp
static std::shared_ptr<Effect> create(const Registry * registry, const std::string & type);
```
- **功能**: 工厂方法创建效果实例
- **参数**:
  - `registry` - 效果注册表
  - `type` - 效果类型字符串
- **返回值**: 效果实例的共享指针

## 设计意图

Effect类的设计目标：

1. **统一接口**: 为所有法术效果提供一致的接口
2. **目标处理**: 复杂的瞄准和目标过滤逻辑
3. **适用性检查**: 确保效果只在有效目标上应用
4. **序列化支持**: 支持效果配置的保存和加载
5. **扩展性**: 通过继承支持新的法术效果类型
6. **类型安全**: 使用强类型和智能指针

## 重要概念

### 间接效果 (indirect)
- **true**: 效果是间接的（如反弹伤害）
- **false**: 效果是直接的

### 可选效果 (optional)
- **true**: 效果是可选的（玩家可以选择应用或不应用）
- **false**: 效果是强制性的

## 依赖关系

- **Mechanics**: 法术机制类
- **Target**: 目标定义
- **Problem**: 问题报告
- **ServerCallback**: 服务器回调接口
- **Registry**: 效果注册表
- **JsonSerializeFormat**: JSON序列化

这个类是VCMI法术系统的核心，定义了所有法术效果的基本框架和行为。