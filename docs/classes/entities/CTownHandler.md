# CTownHandler

## 概述

`CTownHandler` 类是VCMI中城镇和派系系统的核心处理器，负责加载和管理所有城镇相关的配置数据。它继承自 `CHandlerBase`，提供了完整的城镇数据管理功能，包括建筑、防御工事、拼图等。

## 继承关系

```cpp
CHandlerBase<FactionID, Faction, CFaction, FactionService>
└── CTownHandler
```

## 主要功能

CTownHandler 提供了以下核心功能：

1. **城镇数据加载**: 从JSON配置和遗留数据加载城镇信息
2. **建筑系统管理**: 处理城镇建筑的配置和依赖关系
3. **防御工事配置**: 管理城镇的防御设施和属性
4. **派系数据管理**: 处理不同派系的城镇变体
5. **随机派系支持**: 提供随机派系的生成和管理
6. **本地化支持**: 处理城镇名称和描述的翻译

## 主要数据成员

### buildingsLibrary
```cpp
JsonNode buildingsLibrary;
```
- **类型**: `JsonNode`
- **描述**: 建筑库配置数据
- **初始化**: 从 "config/buildingsLibrary" 加载

### randomFaction
```cpp
std::unique_ptr<CFaction> randomFaction;
```
- **类型**: `std::unique_ptr<CFaction>`
- **描述**: 随机派系对象
- **用途**: 提供随机城镇选择的机制

### requirementsToLoad
```cpp
std::vector<BuildingRequirementsHelper> requirementsToLoad;
```
- **类型**: `std::vector<BuildingRequirementsHelper>`
- **描述**: 待加载的建筑需求列表

### overriddenBidsToLoad
```cpp
std::vector<BuildingRequirementsHelper> overriddenBidsToLoad;
```
- **类型**: `std::vector<BuildingRequirementsHelper>`
- **描述**: 待覆盖加成的建筑列表

## 核心方法

### 数据加载

#### loadLegacyData
```cpp
std::vector<JsonNode> loadLegacyData() override;
```
- **返回值**: 遗留城镇数据的JsonNode向量
- **功能**: 从BUILDING.TXT等遗留文件加载城镇数据

#### loadObject (重载)
```cpp
void loadObject(std::string scope, std::string name, const JsonNode & data) override;
void loadObject(std::string scope, std::string name, const JsonNode & data, size_t index) override;
```
- **功能**: 从JSON数据加载城镇对象

#### loadFromJson
```cpp
std::shared_ptr<CFaction> loadFromJson(const std::string & scope, const JsonNode & data, const std::string & identifier, size_t index) override;
```
- **返回值**: 新创建的派系对象的智能指针
- **功能**: 从JSON配置创建派系对象

### 建筑管理

#### loadBuildings
```cpp
void loadBuildings(CTown * town, const JsonNode & source);
```
- **功能**: 为指定城镇加载所有建筑配置

#### loadBuilding
```cpp
void loadBuilding(CTown * town, const std::string & stringID, const JsonNode & source);
```
- **功能**: 为城镇加载单个建筑

#### loadBuildingRequirements
```cpp
void loadBuildingRequirements(CBuilding * building, const JsonNode & source, std::vector<BuildingRequirementsHelper> & bidsToLoad) const;
```
- **功能**: 加载建筑的建造需求和依赖关系

#### loadBuildingBonuses
```cpp
void loadBuildingBonuses(const JsonNode & source, BonusList & bonusList, CBuilding * building) const;
```
- **功能**: 加载建筑提供的加成效果

### 城镇结构

#### loadStructures
```cpp
void loadStructures(CTown & town, const JsonNode & source) const;
```
- **功能**: 加载城镇的结构配置（如城墙、塔楼）

#### loadStructure
```cpp
void loadStructure(CTown & town, const std::string & stringID, const JsonNode & source) const;
```
- **功能**: 加载单个城镇结构

#### loadTownHall
```cpp
void loadTownHall(CTown & town, const JsonNode & source) const;
```
- **功能**: 加载城镇大厅配置

#### loadSiegeScreen
```cpp
void loadSiegeScreen(CTown & town, const JsonNode & source) const;
```
- **功能**: 加载攻城界面配置

### 其他功能

#### loadPuzzle
```cpp
void loadPuzzle(CFaction & faction, const JsonNode & source) const;
```
- **功能**: 加载派系的拼图地图配置

#### loadClientData
```cpp
void loadClientData(CTown & town, const JsonNode & source) const;
```
- **功能**: 加载城镇的客户端显示数据

#### getDefaultAllowed
```cpp
std::set<FactionID> getDefaultAllowed() const;
```
- **返回值**: 默认允许的派系ID集合
- **功能**: 获取默认情况下可用的派系

#### getAllowedFactions
```cpp
std::set<FactionID> getAllowedFactions(bool withTown = true) const;
```
- **返回值**: 允许的派系ID集合
- **参数**:
  - `withTown`: 是否包含有城镇的派系
- **功能**: 获取当前游戏设置下允许的派系

## 生命周期方法

### afterLoadFinalization
```cpp
void afterLoadFinalization() override;
```
- **功能**: 数据加载完成后的最终化处理

### beforeValidate
```cpp
void beforeValidate(JsonNode & object) override;
```
- **功能**: 验证前的预处理

### loadCustom
```cpp
void loadCustom() override;
```
- **功能**: 加载自定义配置

## 内部辅助结构

### BuildingRequirementsHelper
```cpp
struct BuildingRequirementsHelper
{
    JsonNode json;
    CBuilding * building;
    CTown * town;
};
```
- **功能**: 辅助建筑需求加载的临时结构

## 使用示例

### 获取城镇处理器
```cpp
// 获取全局城镇处理器
const auto& townHandler = LIBRARY->townh;

// 获取特定派系
const CFaction* castleFaction = townHandler->getById(FactionID::CASTLE);
```

### 加载自定义城镇
```cpp
// 在模组中定义新城镇
JsonNode townData;
// ... 配置城镇数据
townHandler->loadObject("myMod", "customTown", townData);
```

### 检查派系可用性
```cpp
// 获取所有可用派系
auto allowedFactions = townHandler->getAllowedFactions();

// 检查特定派系是否可用
if (allowedFactions.count(FactionID::RAMPART)) {
    // 堡垒派系可用
}
```

## 设计意图

CTownHandler 的设计目的是为了：

1. **统一管理**: 集中管理所有城镇和派系相关数据
2. **配置灵活性**: 支持JSON配置和遗留数据格式
3. **建筑系统**: 复杂的建筑依赖和升级系统
4. **本地化支持**: 完整的多语言城镇信息支持
5. **模组扩展**: 允许模组添加自定义城镇和建筑
6. **向后兼容**: 支持H3遗留数据格式

这为VCMI提供了强大而灵活的城镇系统，支持复杂的游戏平衡和模组定制。