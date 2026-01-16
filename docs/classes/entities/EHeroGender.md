# EHeroGender

## 概述

`EHeroGender` 枚举定义了英雄的性别类型，用于区分男性、女性英雄以及默认性别设置。

## 枚举定义

```cpp
enum class EHeroGender : int8_t
{
    DEFAULT = -1, // 从h3m文件，实例与英雄类型具有相同性别
    MALE = 0,
    FEMALE = 1,
};
```

## 枚举值说明

### DEFAULT (-1)
- **含义**: 默认性别，表示从地图文件(h3m)读取，英雄实例使用英雄类型的默认性别
- **用途**: 用于地图编辑器中未明确指定性别的英雄实例
- **行为**: 实际性别由英雄类型决定

### MALE (0)
- **含义**: 男性英雄
- **用途**: 明确指定英雄为男性
- **影响**: 影响英雄的视觉资源、动画和某些游戏逻辑

### FEMALE (1)
- **含义**: 女性英雄
- **用途**: 明确指定英雄为女性
- **影响**: 影响英雄的视觉资源、动画和某些游戏逻辑

## 使用场景

### 英雄类型定义
```cpp
// 在英雄类型配置中指定性别
JsonNode heroConfig = {
    {"female", true},  // 设置为女性英雄
    // ... 其他配置
};

// 加载时转换为枚举
EHeroGender gender = node["female"].Bool() ? EHeroGender::FEMALE : EHeroGender::MALE;
```

### 地图实例
```cpp
// 在地图中放置英雄实例
// gender = DEFAULT 表示使用英雄类型的默认性别
// gender = MALE 或 FEMALE 覆盖默认性别
EHeroGender instanceGender = EHeroGender::DEFAULT;
```

### 视觉资源选择
```cpp
// 根据性别选择合适的动画和肖像
std::string portraitPath;
if (gender == EHeroGender::FEMALE)
    portraitPath = hero->portraitFemale;
else if (gender == EHeroGender::MALE)
    portraitPath = hero->portraitMale;
else // DEFAULT
    portraitPath = (heroType->gender == EHeroGender::FEMALE) ?
        hero->portraitFemale : hero->portraitMale;
```

## 设计意图

EHeroGender 枚举的设计考虑了以下需求：

1. **向后兼容**: 支持原版英雄无敌的性别系统
2. **灵活性**: 允许地图制作者覆盖英雄类型的默认性别
3. **类型安全**: 使用强类型枚举避免魔法数字
4. **扩展性**: 预留空间用于未来可能的其他性别选项

## 注意事项

- **DEFAULT值**: 仅在地图实例中使用，在英雄类型定义中应使用明确的MALE或FEMALE
- **资源依赖**: 不同性别的英雄需要对应的视觉资源文件
- **游戏逻辑**: 性别可能影响某些模组的特殊游戏机制
- **本地化**: 性别相关的文本可能需要根据性别调整

这个枚举为VCMI提供了基本的性别区分系统，支持原版游戏的兼容性同时为模组提供扩展空间。