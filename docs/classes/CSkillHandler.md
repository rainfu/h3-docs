<!-- 来源: E:\develop\heroes\vcmi\lib\CSkillHandler.h -->
# CSkillHandler头文件

CSkillHandler头文件定义了VCMI中技能管理的相关类，包括技能类和技能处理器类。

## CSkill类

### 类定义
```cpp
class DLL_LINKAGE CSkill : public Skill
```

### 嵌套结构体

#### LevelInfo
```cpp
struct LevelInfo
```
技能等级信息结构体。

**成员:**
- `std::string iconSmall`: 小图标
- `std::string iconMedium`: 中图标
- `std::string iconLarge`: 大图标
- `std::string scenarioBonus`: 场景奖励
- `std::vector<std::shared_ptr<Bonus>> effects`: 效果列表

### 枚举

#### Obligatory
```cpp
enum class Obligatory : ui8
```
强制技能类型枚举。

**值:**
- `MAJOR = 0`: 主要技能
- `MINOR = 1`: 次要技能

### 构造函数
- `CSkill(const SecondarySkill & id = SecondarySkill::NONE, std::string identifier = "default", bool obligatoryMajor = false, bool obligatoryMinor = false)`: 构造技能
- `~CSkill() = default`: 析构函数

### 主要属性
- `SecondarySkill id`: 技能ID
- `std::vector<LevelInfo> levels`: 各级别信息
- `std::array<si32, 2> gainChance`: 升级获得几率（力量/魔法英雄）
- `std::vector<std::shared_ptr<const Bonus>> specialtyTargetBonuses`: 专精目标奖励
- `bool onlyOnWaterMap`: 仅水上地图
- `bool special`: 特殊技能
- `bool obligatoryMajor`: 强制主要技能
- `bool obligatoryMinor`: 强制次要技能

### 主要方法

#### 基本信息
- `int32_t getIndex() const override`: 获取索引
- `SecondarySkill getId() const override`: 获取技能ID
- `std::string getJsonKey() const override`: 获取JSON键
- `std::string getModScope() const override`: 获取模组范围

#### 名称和描述
- `std::string getNameTextID() const override`: 获取名称文本ID
- `std::string getNameTranslated() const override`: 获取翻译后名称
- `std::string getDescriptionTextID(int level) const override`: 获取描述文本ID
- `std::string getDescriptionTranslated(int level) const override`: 获取翻译后描述

#### 等级信息访问
- `const LevelInfo & at(int level) const`: 获取指定等级信息（常量）
- `LevelInfo & at(int level)`: 获取指定等级信息（可修改）

#### 其他
- `std::string toString() const`: 转换为字符串
- `bool obligatory(Obligatory val) const`: 检查是否强制技能
- `int32_t getIconIndex(uint8_t skillMasterLevel) const`: 获取图标索引

### 私有方法
- `void addNewBonus(const std::shared_ptr<Bonus> & b, int level)`: 添加新奖励

## CSkillHandler类

### 类定义
```cpp
class DLL_LINKAGE CSkillHandler: public CHandlerBase<SecondarySkill, Skill, CSkill, SkillService>
```

### 主要方法

#### 数据加载
- `std::vector<JsonNode> loadLegacyData() override`: 加载遗留数据
- `void afterLoadFinalization() override`: 加载完成后的最终化
- `void beforeValidate(JsonNode & object) override`: 验证前的预处理

#### 其他
- `std::set<SecondarySkill> getDefaultAllowed() const`: 获取默认允许的技能

### 保护方法
- `const std::vector<std::string> & getTypeNames() const override`: 获取类型名称
- `std::shared_ptr<CSkill> loadFromJson(const std::string & scope, const JsonNode & json, const std::string & identifier, size_t index) override`: 从JSON加载技能

## 相关类型

- `SecondarySkill`: 次要技能枚举类型
- `SkillService`: 技能服务类