<!-- 来源: E:\develop\heroes\vcmi\lib\GameLibrary.h -->
# GameLibrary类

GameLibrary类是VCMI的核心类，负责加载和构造各种游戏处理器和服务。

## 类定义
```cpp
class DLL_LINKAGE GameLibrary final : public Services
```

## 构造函数和析构函数
- `GameLibrary()`: 构造函数
- `~GameLibrary()`: 析构函数

## 主要方法

### 初始化方法
- `void initializeFilesystem(bool extractArchives)`: 初始化设置和文件系统
- `void initializeLibrary()`: 加载所有游戏实体

### 服务访问方法
- `const ArtifactService * artifacts() const override`: 获取神器服务
- `const CreatureService * creatures() const override`: 获取生物服务
- `const FactionService * factions() const override`: 获取阵营服务
- `const HeroClassService * heroClasses() const override`: 获取英雄职业服务
- `const HeroTypeService * heroTypes() const override`: 获取英雄类型服务
- `const ResourceTypeService * resources() const override`: 获取资源类型服务
- `const spells::Service * spells() const override`: 获取法术服务
- `const SkillService * skills() const override`: 获取技能服务
- `const BattleFieldService * battlefields() const override`: 获取战场服务
- `const ObstacleService * obstacles() const override`: 获取障碍物服务
- `const IGameSettings * engineSettings() const override`: 获取引擎设置

### 其他访问方法
- `const spells::effects::Registry * spellEffects() const override`: 获取法术效果注册表（常量）
- `spells::effects::Registry * spellEffects() override`: 获取法术效果注册表（可修改）
- `const IBonusTypeHandler * getBth() const`: 获取奖励类型处理器（已弃用）
- `const CIdentifierStorage * identifiers() const`: 获取标识符存储

## 处理器成员

### 核心处理器
- `std::unique_ptr<CArtHandler> arth`: 神器处理器
- `std::unique_ptr<CBonusTypeHandler> bth`: 奖励类型处理器
- `std::unique_ptr<CHeroHandler> heroh`: 英雄处理器
- `std::unique_ptr<CHeroClassHandler> heroclassesh`: 英雄职业处理器
- `std::unique_ptr<CCreatureHandler> creh`: 生物处理器
- `std::unique_ptr<CSpellHandler> spellh`: 法术处理器
- `std::unique_ptr<CSkillHandler> skillh`: 技能处理器

### 其他处理器
- `std::unique_ptr<CObjectClassesHandler> objtypeh`: 对象类处理器
- `std::unique_ptr<CTownHandler> townh`: 城镇处理器
- `std::unique_ptr<CGeneralTextHandler> generaltexth`: 通用文本处理器
- `std::unique_ptr<CModHandler> modh`: 模组处理器
- `std::unique_ptr<TerrainTypeHandler> terrainTypeHandler`: 地形类型处理器
- `std::unique_ptr<ResourceTypeHandler> resourceTypeHandler`: 资源类型处理器
- `std::unique_ptr<RoadTypeHandler> roadTypeHandler`: 道路类型处理器
- `std::unique_ptr<RiverTypeHandler> riverTypeHandler`: 河流类型处理器
- `std::unique_ptr<BattleFieldHandler> battlefieldsHandler`: 战场处理器
- `std::unique_ptr<ObstacleHandler> obstacleHandler`: 障碍物处理器
- `std::unique_ptr<GameSettings> settingsHandler`: 游戏设置处理器

### 辅助处理器
- `std::unique_ptr<CIdentifierStorage> identifiersHandler`: 标识符处理器
- `std::unique_ptr<CTerrainViewPatternConfig> terviewh`: 地形视图配置
- `std::unique_ptr<CRmgTemplateStorage> tplh`: RMG模板存储
- `std::unique_ptr<ObstacleSetHandler> biomeHandler`: 生物群落处理器
- `std::unique_ptr<MapFormatSettings> mapFormat`: 地图格式设置
- `std::unique_ptr<CampaignRegionsHandler> campaignRegions`: 战役区域处理器

### 条件编译
- `std::unique_ptr<scripting::ScriptHandler> scriptHandler`: 脚本处理器（仅在启用脚本时）

## 私有方法
- `void loadFilesystem(bool extractArchives)`: 加载文件系统
- `void loadModFilesystem()`: 加载模组文件系统
- `void scriptsLoaded()`: 脚本加载完成（仅在启用脚本时）

## 全局实例
- `extern DLL_LINKAGE GameLibrary * LIBRARY`: 全局游戏库实例

## 设计特点

- 单例模式，提供全局访问
- 管理所有游戏数据处理器
- 支持模组系统
- 条件编译支持脚本功能