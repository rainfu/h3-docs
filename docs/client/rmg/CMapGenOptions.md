# CMapGenOptions

## 概述

`CMapGenOptions` 类是 VCMI 随机地图生成器的配置管理类。该类封装了所有地图生成相关的选项，包括地图尺寸、玩家设置、水域内容、怪物强度、道路类型等。它继承自 `Serializeable` 以支持序列化。

## 类定义

```cpp
class DLL_LINKAGE CMapGenOptions : public Serializeable
```

## CPlayerSettings 内部类

### 概述
玩家设置类，管理单个玩家的颜色、起始城镇、起始英雄、玩家类型和队伍信息。

### 构造函数
```cpp
CPlayerSettings();
```
默认构造函数。

### 颜色设置
```cpp
PlayerColor getColor() const;
void setColor(const PlayerColor & value);
```
获取/设置玩家颜色（0 到 PlayerColor::PLAYER_LIMIT - 1）。

### 起始城镇设置
```cpp
FactionID getStartingTown() const;
void setStartingTown(FactionID value);
```
获取/设置起始城镇（0 到城镇最大数量，或 RANDOM_TOWN）。

### 起始英雄设置
```cpp
HeroTypeID getStartingHero() const;
void setStartingHero(HeroTypeID value);
```
获取/设置起始英雄（0 到英雄最大数量，或 RANDOM_HERO）。

### 玩家类型设置
```cpp
EPlayerType getPlayerType() const;
void setPlayerType(EPlayerType value);
```
获取/设置玩家类型（HUMAN、AI、COMP_ONLY）。

### 队伍设置
```cpp
TeamID getTeam() const;
void setTeam(const TeamID & value);
```
获取/设置队伍ID（TeamID::NO_TEAM 表示随机分配）。

### 序列化
```cpp
template <typename Handler>
void serialize(Handler & h);
```
序列化玩家设置。

## 构造函数

```cpp
CMapGenOptions();
```
默认构造函数。

```cpp
CMapGenOptions(const CMapGenOptions&) = delete;
```
删除复制构造函数。

## 地图尺寸设置

### 宽度
```cpp
si32 getWidth() const;
void setWidth(si32 value);
```
获取/设置地图宽度。

### 高度
```cpp
si32 getHeight() const;
void setHeight(si32 value);
```
获取/设置地图高度。

### 层数
```cpp
int getLevels() const;
void setLevels(int value);
```
获取/设置地图层数（地下层数量）。

## 玩家数量设置

### 人类或电脑玩家数量
```cpp
si8 getHumanOrCpuPlayerCount() const;
void setHumanOrCpuPlayerCount(si8 value);
```
获取/设置人类或电脑玩家总数（1 到 PlayerColor::PLAYER_LIMIT，或 RANDOM_SIZE）。

### 队伍数量
```cpp
si8 getTeamCount() const;
void setTeamCount(si8 value);
```
获取/设置队伍数量（0 到玩家数量-1，或 RANDOM_SIZE）。

### 纯电脑玩家数量
```cpp
si8 getCompOnlyPlayerCount() const;
void setCompOnlyPlayerCount(si8 value);
```
获取/设置纯电脑玩家数量（0 到 PlayerColor::PLAYER_LIMIT - 玩家数量，或 RANDOM_SIZE）。

### 纯电脑玩家队伍数量
```cpp
si8 getCompOnlyTeamCount() const;
void setCompOnlyTeamCount(si8 value);
```
获取/设置纯电脑玩家队伍数量（0 到纯电脑玩家数量-1，或 RANDOM_SIZE）。

## 玩家限制查询

```cpp
si8 getMinPlayersCount(bool withTemplateLimit = true) const;
si8 getMaxPlayersCount(bool withTemplateLimit = true) const;
si8 getPlayerLimit() const;
```
获取最小/最大玩家数量和玩家限制。

## 地图内容设置

### 水域内容
```cpp
EWaterContent::EWaterContent getWaterContent() const;
void setWaterContent(EWaterContent::EWaterContent value);
```
获取/设置水域内容（NONE、NORMAL、ISLANDS）。

### 怪物强度
```cpp
EMonsterStrength::EMonsterStrength getMonsterStrength() const;
void setMonsterStrength(EMonsterStrength::EMonsterStrength value);
```
获取/设置怪物强度（WEAK、NORMAL、STRONG）。

## 道路设置

```cpp
bool isRoadEnabled(const RoadId & roadType) const;
bool isRoadEnabled() const;
void setRoadEnabled(const RoadId & roadType, bool enable);
```
检查/设置道路类型是否启用。

## 玩家设置管理

### 获取玩家设置
```cpp
const std::map<PlayerColor, CPlayerSettings> & getPlayersSettings() const;
const std::map<PlayerColor, CPlayerSettings> & getSavedPlayersMap() const;
```
获取当前玩家设置和保存的玩家设置。

### 设置玩家属性
```cpp
void setStartingTownForPlayer(const PlayerColor & color, FactionID town);
void setStartingHeroForPlayer(const PlayerColor & color, HeroTypeID hero);
void setPlayerTypeForStandardPlayer(const PlayerColor & color, EPlayerType playerType);
void setPlayerTeam(const PlayerColor & color, const TeamID & team = TeamID::NO_TEAM);
```
为指定玩家设置起始城镇、英雄、类型和队伍。

## 模板管理

### 地图模板
```cpp
const CRmgTemplate * getMapTemplate() const;
void setMapTemplate(const CRmgTemplate * value);
void setMapTemplate(const std::string & name);
```
获取/设置地图模板。

### 可用模板
```cpp
std::vector<const CRmgTemplate *> getPossibleTemplates() const;
```
获取所有可能的模板列表。

## 选项验证和最终化

### 最终化选项
```cpp
void finalize(vstd::RNG & rand);
```
最终化选项，将所有随机大小替换为具体数值。

### 验证选项
```cpp
bool checkOptions() const;
```
验证选项是否有效（是否有匹配的模板）。

### 玩家自定义检查
```cpp
bool arePlayersCustomized() const;
```
检查玩家颜色或队伍是否在游戏GUI中设置。

## 常量

```cpp
static const si8 RANDOM_SIZE = -1;
```
随机大小常量。

## 私有成员

### 地图尺寸
```cpp
si32 width, height, levels;
```

### 玩家配置
```cpp
si8 humanOrCpuPlayerCount, teamCount;
si8 compOnlyPlayerCount, compOnlyTeamCount;
```

### 地图内容
```cpp
EWaterContent::EWaterContent waterContent;
EMonsterStrength::EMonsterStrength monsterStrength;
```

### 玩家设置
```cpp
std::map<PlayerColor, CPlayerSettings> players;
std::map<PlayerColor, CPlayerSettings> savedPlayerSettings;
```

### 道路和模板
```cpp
std::set<RoadId> enabledRoads;
const CRmgTemplate * mapTemplate;
bool customizedPlayers;
```

## 序列化

### 二进制序列化
```cpp
template <typename Handler>
void serialize(Handler & h);
```
二进制序列化支持。

### JSON序列化
```cpp
void serializeJson(JsonSerializeFormat & handler);
```
JSON序列化支持。

## 工作原理

### 玩家设置管理
类维护两个玩家设置映射：
- `players`: 当前活动设置
- `savedPlayerSettings`: 保存的设置副本

### 模板兼容性
选项必须与可用模板兼容：

```cpp
// 检查选项是否有效
if (!options.checkOptions()) {
    // 没有匹配的模板
    return false;
}
```

### 随机值解析
`finalize()` 方法将所有 RANDOM_SIZE 值替换为具体数值：

```cpp
CMapGenOptions options;
// 设置随机玩家数量
options.setHumanOrCpuPlayerCount(CMapGenOptions::RANDOM_SIZE);

// 最终化选项
options.finalize(rng);
// 现在玩家数量是具体值
```

## 使用示例

### 基本地图设置
```cpp
CMapGenOptions options;

// 设置地图尺寸
options.setWidth(72);
options.setHeight(72);
options.setLevels(2); // 两层地图

// 设置玩家
options.setHumanOrCpuPlayerCount(4);
options.setTeamCount(2);

// 设置内容
options.setWaterContent(EWaterContent::NORMAL);
options.setMonsterStrength(EMonsterStrength::STRONG);

// 启用道路
options.setRoadEnabled(RoadId(RoadId::DIRT), true);
```

### 玩家配置
```cpp
// 配置玩家设置
options.setPlayerTypeForStandardPlayer(PlayerColor(0), EPlayerType::HUMAN);
options.setStartingTownForPlayer(PlayerColor(0), FactionID(0)); // 城堡
options.setStartingHeroForPlayer(PlayerColor(0), HeroTypeID(5)); // 英雄ID

// 设置队伍
options.setPlayerTeam(PlayerColor(0), TeamID(0));
options.setPlayerTeam(PlayerColor(1), TeamID(0)); // 同一队伍
```

### 模板选择
```cpp
// 设置特定模板
options.setMapTemplate("default");

// 或随机选择
options.setMapTemplate(nullptr);

// 获取可用模板
auto templates = options.getPossibleTemplates();
for (auto* tmpl : templates) {
    std::cout << tmpl->getName() << std::endl;
}
```

### 验证和最终化
```cpp
// 验证选项
if (!options.checkOptions()) {
    std::cerr << "无效的地图生成选项" << std::endl;
    return;
}

// 最终化随机值
options.finalize(rng);

// 现在所有设置都是具体值
auto map = generator.generate();
```

## 相关类

- `CRmgTemplate`: RMG模板类
- `CMapGenerator`: 地图生成器
- `EWaterContent`: 水域内容枚举
- `EMonsterStrength`: 怪物强度枚举
- `PlayerColor`: 玩家颜色类
- `FactionID`: 派系ID类
- `HeroTypeID`: 英雄类型ID类