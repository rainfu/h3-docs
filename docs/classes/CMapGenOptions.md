<!-- 来源: E:\develop\heroes\vcmi\lib\rmg\CMapGenOptions.h -->
# CMapGenOptions头文件

CMapGenOptions头文件定义了VCMI中随机地图生成的选项配置类，用于控制地图生成的所有参数。

## EPlayerType枚举

定义玩家类型：

- `HUMAN`: 人类玩家
- `AI`: AI玩家
- `COMP_ONLY`: 仅电脑玩家

## CPlayerSettings类

### 类定义
```cpp
class DLL_LINKAGE CPlayerSettings
```

### 构造函数
- `CPlayerSettings()`: 默认构造函数

### 颜色设置
- `PlayerColor getColor() const`: 获取玩家颜色
- `void setColor(const PlayerColor & value)`: 设置玩家颜色

### 城镇设置
- `FactionID getStartingTown() const`: 获取起始城镇
- `void setStartingTown(FactionID value)`: 设置起始城镇

### 英雄设置
- `HeroTypeID getStartingHero() const`: 获取起始英雄
- `void setStartingHero(HeroTypeID value)`: 设置起始英雄

### 玩家类型设置
- `EPlayerType getPlayerType() const`: 获取玩家类型
- `void setPlayerType(EPlayerType value)`: 设置玩家类型

### 队伍设置
- `TeamID getTeam() const`: 获取队伍ID
- `void setTeam(const TeamID & value)`: 设置队伍ID

### 序列化
- `template <typename Handler> void serialize(Handler & h)`: 序列化方法

## CMapGenOptions类

### 继承关系
```cpp
class DLL_LINKAGE CMapGenOptions : public Serializeable
```

### 构造函数
- `CMapGenOptions()`: 默认构造函数
- `CMapGenOptions(const CMapGenOptions&) = delete`: 禁用拷贝构造函数

### 地图尺寸设置
- `si32 getWidth() const`: 获取宽度
- `void setWidth(si32 value)`: 设置宽度
- `si32 getHeight() const`: 获取高度
- `void setHeight(si32 value)`: 设置高度
- `int getLevels() const`: 获取层数
- `void setLevels(int value)`: 设置层数

### 玩家数量设置
- `si8 getHumanOrCpuPlayerCount() const`: 获取人类或电脑玩家数量
- `void setHumanOrCpuPlayerCount(si8 value)`: 设置人类或电脑玩家数量
- `si8 getMinPlayersCount(bool withTemplateLimit = true) const`: 获取最小玩家数量
- `si8 getMaxPlayersCount(bool withTemplateLimit = true) const`: 获取最大玩家数量
- `si8 getPlayerLimit() const`: 获取玩家限制

### 队伍设置
- `si8 getTeamCount() const`: 获取队伍数量
- `void setTeamCount(si8 value)`: 设置队伍数量
- `si8 getCompOnlyPlayerCount() const`: 获取仅电脑玩家数量
- `void setCompOnlyPlayerCount(si8 value)`: 设置仅电脑玩家数量
- `si8 getCompOnlyTeamCount() const`: 获取仅电脑队伍数量
- `void setCompOnlyTeamCount(si8 value)`: 设置仅电脑队伍数量

### 地图内容设置
- `EWaterContent::EWaterContent getWaterContent() const`: 获取水域内容
- `void setWaterContent(EWaterContent::EWaterContent value)`: 设置水域内容
- `EMonsterStrength::EMonsterStrength getMonsterStrength() const`: 获取怪物强度
- `void setMonsterStrength(EMonsterStrength::EMonsterStrength value)`: 设置怪物强度

### 道路设置
- `bool isRoadEnabled(const RoadId & roadType) const`: 检查道路是否启用
- `bool isRoadEnabled() const`: 检查是否有道路启用
- `void setRoadEnabled(const RoadId & roadType, bool enable)`: 设置道路启用状态

### 玩家设置管理
- `const std::map<PlayerColor, CPlayerSettings> & getPlayersSettings() const`: 获取玩家设置
- `const std::map<PlayerColor, CPlayerSettings> & getSavedPlayersMap() const`: 获取保存的玩家映射
- `void setStartingTownForPlayer(const PlayerColor & color, FactionID town)`: 为玩家设置起始城镇
- `void setStartingHeroForPlayer(const PlayerColor & color, HeroTypeID hero)`: 为玩家设置起始英雄
- `void setPlayerTypeForStandardPlayer(const PlayerColor & color, EPlayerType playerType)`: 为标准玩家设置类型
- `void setPlayerTeam(const PlayerColor & color, const TeamID & team = TeamID::NO_TEAM)`: 设置玩家队伍

### 模板设置
- `const CRmgTemplate * getMapTemplate() const`: 获取地图模板
- `void setMapTemplate(const CRmgTemplate * value)`: 设置地图模板
- `void setMapTemplate(const std::string & name)`: 通过名称设置地图模板
- `std::vector<const CRmgTemplate *> getPossibleTemplates() const`: 获取可能的模板

### 选项验证和完成
- `void finalize(vstd::RNG & rand)`: 完成选项设置（将随机值转换为确定值）
- `bool checkOptions() const`: 检查选项是否有效
- `bool arePlayersCustomized() const`: 检查玩家是否被自定义

### 常量
- `static const si8 RANDOM_SIZE = -1`: 随机大小常量

### 私有方法
- `void initPlayersMap()`: 初始化玩家映射
- `void resetPlayersMap()`: 重置玩家映射
- `void savePlayersMap()`: 保存玩家映射
- `int countHumanPlayers() const`: 计算人类玩家数量
- `int countCompOnlyPlayers() const`: 计算仅电脑玩家数量
- `PlayerColor getNextPlayerColor() const`: 获取下一个玩家颜色
- `void updateCompOnlyPlayers()`: 更新仅电脑玩家
- `void updatePlayers()`: 更新玩家
- `const CRmgTemplate * getPossibleTemplate(vstd::RNG & rand) const`: 获取可能的模板

### 私有成员变量
- `si32 width, height`: 地图宽度和高度
- `si32 levels`: 地图层数
- `si8 humanOrCpuPlayerCount, teamCount, compOnlyPlayerCount, compOnlyTeamCount`: 各种玩家和队伍计数
- `EWaterContent::EWaterContent waterContent`: 水域内容
- `EMonsterStrength::EMonsterStrength monsterStrength`: 怪物强度
- `std::map<PlayerColor, CPlayerSettings> players, savedPlayerSettings`: 玩家设置映射
- `std::set<RoadId> enabledRoads`: 启用的道路集合
- `bool customizedPlayers`: 是否自定义玩家
- `const CRmgTemplate * mapTemplate`: 地图模板

### 序列化方法
- `template <typename Handler> void serialize(Handler & h)`: 序列化方法
- `void serializeJson(JsonSerializeFormat & handler)`: JSON序列化方法

## 设计特点

- 支持高度可配置的地图生成参数
- 提供完整的玩家设置管理（类型、城镇、英雄、队伍）
- 支持随机和确定性选项设置
- 包含选项验证和一致性检查
- 支持序列化和反序列化以保存/加载配置
- 兼容旧版本的序列化格式