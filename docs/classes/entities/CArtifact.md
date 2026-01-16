# CArtifact

神器类，定义游戏中各种神器的属性和行为。

## 📋 类概述

`CArtifact` 是 VCMI 中神器系统的核心类，定义了游戏中所有神器的基本属性和功能。该类继承自多个基类，支持复合神器、法术卷轴、成长神器和充能神器等多种类型。

## 🔧 主要属性

### 基本信息
- `id`: 神器唯一标识符 (ArtifactID)
- `identifier`: 神器标识符字符串
- `modScope`: 模组作用域
- `iconIndex`: 图标索引
- `image`: 图像路径
- `largeImage`: 大图像路径
- `advMapDef`: 冒险地图定义文件

### 经济属性
- `price`: 神器价格
- `warMachine`: 对应的战争机器生物ID

### 装备限制
- `possibleSlots`: 可能的装备位置映射（承载者类型 -> 位置列表）
- `aClass`: 神器类别
- `onlyOnWaterMap`: 仅在水上地图出现

### 奖励系统
- `instanceBonuses`: 每个实例的奖励列表
- `scenarioBonus`: 场景奖励

## 🎯 核心方法

### 基本信息查询
```cpp
// 获取索引和ID
int32_t getIndex() const override;
ArtifactID getId() const override;
int32_t getIconIndex() const override;
std::string getJsonKey() const override;
std::string getModScope() const override;

// 注册图标
void registerIcons(const IconRegistar & cb) const override;

// 获取本地化文本
std::string getNameTranslated() const override;
std::string getDescriptionTranslated() const override;
std::string getEventTranslated() const override;

// 获取文本ID
std::string getNameTextID() const override;
std::string getDescriptionTextID() const override;
std::string getEventTextID() const override;
std::string getBonusTextID(const std::string & bonusID) const;
```

### 属性查询
```cpp
// 获取价格和战争机器
uint32_t getPrice() const override;
CreatureID getWarMachine() const override;

// 检查属性
bool isBig() const override;        // 是否为大型神器
bool isTradable() const override;   // 是否可交易

// 获取类别序号
int getArtClassSerial() const;

// 节点名称
std::string nodeName() const override;
```

### 装备系统
```cpp
// 获取可能的装备位置
const std::map<ArtBearer, std::vector<ArtifactPosition>> & getPossibleSlots() const;

// 检查是否可以装备到指定位置
virtual bool canBePutAt(const CArtifactSet * artSet, ArtifactPosition slot = ArtifactPosition::FIRST_AVAILABLE, bool assumeDestRemoved = false) const;
```

### 奖励系统
```cpp
// 获取奖励承载者
const IBonusBearer * getBonusBearer() const override;

// 添加新奖励
void addNewBonus(const std::shared_ptr<Bonus> & b) override;

// 获取奖励文本ID
std::string getBonusTextID(const std::string & bonusID) const;
```

### 数据管理
```cpp
// 从JSON更新数据
void updateFrom(const JsonNode & data);

// 设置图像（测试用）
void setImage(int32_t iconIndex, const std::string & image, const std::string & large);
```

## 🔗 依赖关系

### 依赖的类
- `Artifact`: 神器接口
- `CBonusSystemNode`: 奖励系统节点
- `CCombinedArtifact`: 复合神器
- `CScrollArtifact`: 卷轴神器
- `CGrowingArtifact`: 成长神器
- `CChargedArtifact`: 充能神器
- `ArtBearer`: 神器承载者枚举

### 被依赖关系
- 被 `CArtHandler` 用于管理神器数据
- 被 `CArtifactInstance` 用于创建神器实例
- 被 `CArtifactSet` 用于装备管理
- 被奖励系统用于属性计算

## 📝 使用示例

### 查询神器信息
```cpp
// 获取神器基本信息
auto name = artifact->getNameTranslated();
auto description = artifact->getDescriptionTranslated();
auto price = artifact->getPrice();
auto artClass = artifact->getArtClassSerial();

// 检查神器属性
if (artifact->isBig()) {
    // 大型神器处理
}
if (artifact->isTradable()) {
    // 可交易神器
}
```

### 装备位置检查
```cpp
// 获取可能的装备位置
const auto & slots = artifact->getPossibleSlots();

// 检查英雄是否可以装备
if (artifact->canBePutAt(heroArtifactSet, ArtifactPosition::RIGHT_HAND)) {
    // 可以装备到右手
}

// 检查所有可能的装备位置
for (const auto & [bearer, positions] : slots) {
    for (const auto & pos : positions) {
        if (artifact->canBePutAt(targetSet, pos)) {
            // 找到可装备位置
            return pos;
        }
    }
}
```

### 奖励系统集成
```cpp
// 获取神器奖励
const auto * bearer = artifact->getBonusBearer();
auto bonuses = bearer->getAllBonuses();

// 处理实例奖励
for (const auto & bonus : artifact->instanceBonuses) {
    // 应用实例奖励
}

// 添加新奖励
auto newBonus = std::make_shared<Bonus>(
    BonusDuration::PERMANENT,
    BonusType::PRIMARY_SKILL,
    BonusSource::ARTIFACT,
    1,
    BonusSourceID(artifact->getId())
);
artifact->addNewBonus(newBonus);
```

### 复合神器处理
```cpp
// 检查是否为复合神器
if (artifact->isCombined()) {
    const auto & constituents = artifact->getConstituents();
    for (const auto * part : constituents) {
        // 处理组成部分
    }
}

// 检查是否为卷轴
if (artifact->isScroll()) {
    // 卷轴特殊处理
}

// 检查是否为成长神器
if (artifact->isGrowing()) {
    const auto & bonuses = artifact->getBonusesPerLevel();
    // 处理等级奖励
}
```

## ⚡ 性能特性

- **预编译奖励**: 实例奖励预先计算
- **缓存机制**: 装备位置检查结果缓存
- **共享数据**: 神器数据在多个实例间共享
- **延迟加载**: 本地化文本按需加载

## 🔍 注意事项

1. **装备限制**: 装备前必须检查 `canBePutAt()`
2. **复合神器**: 组成部分必须先装备才能组成
3. **充能神器**: 使用次数有限，需要特殊处理
4. **成长神器**: 奖励随等级变化

## 📊 神器类型

### EArtifactClass 枚举
```cpp
enum class EArtifactClass {
    ART_SPECIAL,     // 特殊神器
    ART_TREASURE,    // 宝物
    ART_MINOR,       // 小神器
    ART_MAJOR,       // 大神器
    ART_RELIC,       // 遗物
    ART_SCROLL       // 卷轴
};
```

### 神器类别序号
- 0: 宝物 (treasure)
- 1: 小神器 (minor)
- 2: 大神器 (major)
- 3: 遗物 (relic)
- 4: 法术卷轴 (spell scroll)
- 5: 其他 (other)

## 🔧 特殊神器类型

### 复合神器 (CCombinedArtifact)
- 由多个基础神器组合而成
- 具有独立的奖励效果
- 可以分解为组成部分

### 卷轴神器 (CScrollArtifact)
- 包含法术的特殊神器
- 可以使用法术但会消耗卷轴
- 不可重复使用

### 成长神器 (CGrowingArtifact)
- 奖励随英雄等级增长
- 支持等级阈值奖励
- 动态奖励计算

### 充能神器 (CChargedArtifact)
- 具有使用次数限制
- 支持自定义消耗条件
- 用尽后可选择是否移除