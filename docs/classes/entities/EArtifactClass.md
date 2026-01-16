# EArtifactClass

## 概述

`EArtifactClass` 枚举定义了神器的等级分类。这些分类决定了神器的稀有度和价值，在游戏平衡和奖励系统中发挥重要作用。

## 枚举值

### ART_SPECIAL
```cpp
ART_SPECIAL = 1
```
- **数值**: 1
- **描述**: 特殊神器
- **特点**: 独特的特殊效果，通常与特定英雄、派系或事件相关
- **示例**: 特殊任务奖励、独特的神器

### ART_TREASURE
```cpp
ART_TREASURE = 2
```
- **数值**: 2
- **描述**: 宝物级神器
- **特点**: 常见的低级神器，容易获得
- **示例**: 基础装备、简单的魔法物品

### ART_MINOR
```cpp
ART_MINOR = 4
```
- **数值**: 4
- **描述**: 次级神器
- **特点**: 中等稀有度的神器，具有较好的属性加成
- **示例**: 较好的装备、魔法饰品

### ART_MAJOR
```cpp
ART_MAJOR = 8
```
- **数值**: 8
- **描述**: 主要神器
- **特点**: 高价值的神器，具有强大的属性加成
- **示例**: 强大的装备、重要的魔法物品

### ART_RELIC
```cpp
ART_RELIC = 16
```
- **数值**: 16
- **描述**: 遗物级神器
- **特点**: 最稀有的神器，具有传奇级别的属性和效果
- **示例**: 游戏中最强大的神器、传说中的物品

## 使用方式

### 位运算支持
由于枚举值都是2的幂，EArtifactClass 支持位运算：

```cpp
// 检查神器是否为主要或遗物级
if ((artifact.getClass() & (EArtifactClass::ART_MAJOR | EArtifactClass::ART_RELIC)) != 0) {
    // 是高级神器
}

// 组合多个等级
EArtifactClass allowedClasses = EArtifactClass::ART_MAJOR | EArtifactClass::ART_RELIC;
```

### 等级比较
```cpp
// 比较神器等级
EArtifactClass class1 = artifact1.getClass();
EArtifactClass class2 = artifact2.getClass();

// 数值越大，等级越高
if (static_cast<int>(class1) > static_cast<int>(class2)) {
    // artifact1 等级更高
}
```

## 在游戏系统中的应用

### 奖励系统
```cpp
// 根据神器等级给予不同奖励
switch (artifact.getClass()) {
    case EArtifactClass::ART_TREASURE:
        reward = 500; // 宝物级奖励
        break;
    case EArtifactClass::ART_RELIC:
        reward = 10000; // 遗物级奖励
        break;
    // ...
}
```

### 装备限制
```cpp
// 检查英雄等级是否足够装备神器
bool canEquip = hero.getLevel() >= getMinLevelForArtifactClass(artifact.getClass());
```

### 市场价格
```cpp
// 根据等级计算神器价格
int basePrice = getArtifactBasePrice(artifact.getType());
int multiplier = static_cast<int>(artifact.getClass());
int finalPrice = basePrice * multiplier;
```

## 设计意图

EArtifactClass 的设计目的是为了：

1. **等级区分**: 清晰地区分不同价值和稀有度的神器
2. **平衡控制**: 为游戏平衡提供基础，支持不同的难度和奖励机制
3. **位运算友好**: 支持组合检查和过滤操作
4. **扩展性**: 可以轻松添加新的神器等级
5. **向后兼容**: 数值设计支持旧版本的兼容性

这为神器系统提供了结构化的等级体系，支持从普通宝物到传奇遗物的完整神器生态。