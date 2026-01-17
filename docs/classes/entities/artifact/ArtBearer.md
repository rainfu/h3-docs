# ArtBearer

## 概述

`ArtBearer` 枚举定义了游戏中可以装备神器的实体类型。这些实体类型决定了神器可以被哪些对象携带和使用。

## 枚举值

### HERO
```cpp
HERO
```
- **描述**: 英雄可以装备神器
- **说明**: 这是最常见的神器载体，英雄可以装备各种类型的装备神器

### CREATURE
```cpp
CREATURE
```
- **描述**: 生物可以装备神器
- **说明**: 某些特殊生物可以装备神器，通常用于特殊单位或事件

### COMMANDER
```cpp
COMMANDER
```
- **描述**: 指挥官可以装备神器
- **说明**: 英雄的指挥官单位可以装备特定的神器

### ALTAR
```cpp
ALTAR
```
- **描述**: 祭坛相关的神器载体
- **说明**: 用于祭坛系统，可能涉及神器的献祭或转化

## 使用示例

### 检查神器载体类型
```cpp
// 检查神器是否可以被英雄装备
if (artifact.canBeEquippedBy(ArtBearer::HERO)) {
    // 英雄可以使用此神器
}

// 遍历所有可能的载体类型
for (auto bearer : {ArtBearer::HERO, ArtBearer::CREATURE, ArtBearer::COMMANDER}) {
    if (artifact.isCompatibleWith(bearer)) {
        // 神器与此载体兼容
    }
}
```

### 在神器配置中使用
```cpp
// 定义神器配置
ArtifactConfig config;
config.allowedBearers = {ArtBearer::HERO, ArtBearer::COMMANDER};
config.forbiddenBearers = {ArtBearer::ALTAR};
```

## 设计意图

`ArtBearer` 枚举的设计目的是为了：

1. **类型安全**: 使用强类型枚举而不是魔数，避免错误
2. **扩展性**: 可以轻松添加新的神器载体类型
3. **配置灵活性**: 允许神器定义支持的载体类型
4. **游戏平衡**: 控制不同类型实体可以装备的神器范围

这为神器系统提供了灵活的载体类型管理，支持从标准英雄装备到特殊单位装备的各种场景。