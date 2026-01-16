# CHeroClassHandler

## 概述

`CHeroClassHandler` 类负责管理游戏中的所有英雄职业数据。它继承自 `CHandlerBase`，提供了英雄职业的加载、配置和验证功能。

## 继承关系

```cpp
CHandlerBase<HeroClassID, HeroClass, CHeroClass, HeroClassService>
└── CHeroClassHandler
```

## 主要功能

CHeroClassHandler 提供了以下核心功能：

1. **英雄职业加载**: 从JSON配置加载英雄职业数据
2. **遗留数据支持**: 支持从旧版游戏文件加载职业数据
3. **技能数据验证**: 验证主属性技能的配置正确性
4. **概率计算**: 处理技能成长和选择概率
5. **本地化支持**: 注册职业名称的多语言支持

## 核心方法

### 数据加载

#### loadLegacyData
```cpp
std::vector<JsonNode> loadLegacyData() override;
```
- **返回值**: 遗留英雄职业数据的JsonNode向量
- **功能**: 从旧版游戏文件加载英雄职业配置

#### loadFromJson
```cpp
std::shared_ptr<CHeroClass> loadFromJson(const std::string & scope, const JsonNode & node, const std::string & identifier, size_t index) override;
```
- **参数**:
  - `scope`: 模组范围
  - `node`: JSON配置节点
  - `identifier`: 职业标识符
  - `index`: 职业索引
- **返回值**: 新创建的英雄职业对象的智能指针
- **功能**: 从JSON配置创建英雄职业对象

### 数据验证

#### fillPrimarySkillData
```cpp
void fillPrimarySkillData(const JsonNode & node, CHeroClass * heroClass, PrimarySkill pSkill) const;
```
- **参数**:
  - `node`: JSON配置节点
  - `heroClass`: 目标英雄职业
  - `pSkill`: 主属性技能类型
- **功能**: 填充指定主属性技能的数据，包括初始值和成长概率
- **验证**: 检查初始值是否符合最低要求

### 生命周期方法

#### afterLoadFinalization
```cpp
void afterLoadFinalization() override;
```
- **功能**: 数据加载完成后的最终化处理

#### getTypeNames
```cpp
const std::vector<std::string> & getTypeNames() const override;
```
- **返回值**: 类型名称向量，包含 "heroClass"
- **功能**: 获取处理器支持的对象类型名称

## JSON配置处理

CHeroClassHandler 处理以下JSON配置字段：

### 基本信息
- **name**: 职业显示名称
- **affinity**: 职业倾向 ("might" 或 "magic")

### 视觉资源
- **animation.battle.female**: 女性战斗动画路径
- **animation.battle.male**: 男性战斗动画路径
- **animation.map.female**: 女性地图头像路径
- **animation.map.male**: 男性地图头像路径

### 主属性技能
- **primarySkills**: 各主属性技能的初始值
  - attack: 攻击力
  - defense: 防御力
  - spellpower: 法术强度
  - knowledge: 知识
- **lowLevelChance**: 低等级成长概率 (1-10级)
- **highLevelChance**: 高等级成长概率 (10+级)

### 次要技能
- **secondarySkills**: 次要技能获得概率映射

### 选择概率
- **tavern**: 酒馆出现概率
- **selectionProbability**: 在各派系城镇中的选择概率

## 使用示例

### 获取英雄职业处理器
```cpp
// 获取全局英雄职业处理器
const auto& heroClassHandler = LIBRARY->heroclassesh;

// 获取特定职业
const CHeroClass* knightClass = heroClassHandler->getById(HeroClassID::KNIGHT);
```

### 加载自定义职业
```cpp
// 在模组中定义新英雄职业
JsonNode classData = {
    {"name", "Custom Hero"},
    {"affinity", "might"},
    {"primarySkills", {
        {"attack", 2},
        {"defense", 2},
        {"spellpower", 1},
        {"knowledge", 1}
    }},
    {"lowLevelChance", {
        {"attack", 40},
        {"defense", 40},
        {"spellpower", 10},
        {"knowledge", 10}
    }}
};

heroClassHandler->loadObject("myMod", "customClass", classData);
```

### 验证职业数据
```cpp
// 处理器会自动验证加载的数据
// 检查技能成长概率总和是否大于0
// 检查初始技能值是否符合最低要求
// 验证倾向设置是否正确
```

## 设计意图

CHeroClassHandler 的设计目的是为了：

1. **数据完整性**: 确保英雄职业数据的配置正确性
2. **平衡控制**: 通过概率和初始值控制职业强度平衡
3. **模组支持**: 允许模组添加自定义英雄职业
4. **向后兼容**: 支持遗留数据格式的加载
5. **本地化**: 完整的多语言职业信息支持
6. **类型安全**: 使用强类型ID和枚举避免配置错误

这为VCMI提供了灵活而强大的英雄职业系统，支持复杂的角色平衡和模组定制。