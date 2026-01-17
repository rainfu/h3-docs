# MapIdentifiersH3M

## 概述

`MapIdentifiersH3M` 类是 VCMI 地图标识符映射系统。它负责在不同地图格式之间转换各种游戏对象的标识符，包括建筑、派系、生物、英雄、神器等。这个类解决了不同 Heroes 3 版本之间对象ID不一致的问题。

## 类定义

```cpp
class DLL_LINKAGE MapIdentifiersH3M
```

## 私有成员变量

### 标识符映射表

#### mappingBuilding
```cpp
std::map<BuildingID, BuildingID> mappingBuilding;
```
建筑ID映射（通用建筑）。

#### mappingFactionBuilding
```cpp
std::map<FactionID, std::map<BuildingID, BuildingID>> mappingFactionBuilding;
```
派系特定建筑ID映射。

#### mappingFaction
```cpp
std::map<FactionID, FactionID> mappingFaction;
```
派系ID映射。

#### mappingCreature
```cpp
std::map<CreatureID, CreatureID> mappingCreature;
```
生物ID映射。

#### mappingHeroType
```cpp
std::map<HeroTypeID, HeroTypeID> mappingHeroType;
```
英雄类型ID映射。

#### mappingHeroPortrait
```cpp
std::map<HeroTypeID, HeroTypeID> mappingHeroPortrait;
```
英雄肖像ID映射。

#### mappingHeroClass
```cpp
std::map<HeroClassID, HeroClassID> mappingHeroClass;
```
英雄职业ID映射。

#### mappingTerrain
```cpp
std::map<TerrainId, TerrainId> mappingTerrain;
```
地形ID映射。

#### mappingArtifact
```cpp
std::map<ArtifactID, ArtifactID> mappingArtifact;
```
神器ID映射。

#### mappingSecondarySkill
```cpp
std::map<SecondarySkill, SecondarySkill> mappingSecondarySkill;
```
二级技能ID映射。

#### mappingCampaignRegions
```cpp
std::map<CampaignRegionID, CampaignRegionID> mappingCampaignRegions;
```
战役区域ID映射。

#### mappingCampaignVideo
```cpp
std::map<int, std::pair<VideoPath, VideoPath>> mappingCampaignVideo;
```
战役视频路径映射。

#### mappingCampaignMusic
```cpp
std::map<int, AudioPath> mappingCampaignMusic;
```
战役音乐路径映射。

#### mappingObjectTemplate
```cpp
std::map<AnimationPath, AnimationPath> mappingObjectTemplate;
```
对象模板动画路径映射。

#### mappingObjectIndex
```cpp
std::map<ObjectTypeIdentifier, ObjectTypeIdentifier> mappingObjectIndex;
```
对象类型标识符映射。

#### formatSettings
```cpp
JsonNode formatSettings;
```
格式特定设置。

## 私有方法

### loadMapping
```cpp
template<typename IdentifierID>
void loadMapping(std::map<IdentifierID, IdentifierID> & result, const JsonNode & mapping, const std::string & identifierName);
```
模板方法，从JSON配置加载标识符映射。

## 公共方法

### loadMapping
```cpp
void loadMapping(const JsonNode & mapping);
```
从JSON节点加载所有标识符映射。

### remapTemplate
```cpp
void remapTemplate(ObjectTemplate & objectTemplate);
```
重新映射对象模板的动画路径。

### 战役媒体映射

#### remapCampaignMusic
```cpp
AudioPath remapCampaignMusic(int index) const;
```
重新映射战役音乐路径。

#### remapCampaignVideo
```cpp
std::pair<VideoPath, VideoPath> remapCampaignVideo(int index) const;
```
重新映射战役视频路径（返回视频和掩码路径对）。

### 标识符重新映射方法

#### remapBuilding
```cpp
BuildingID remapBuilding(std::optional<FactionID> owner, BuildingID input) const;
```
重新映射建筑ID，支持派系特定的建筑。

**参数：**
- `owner`: 建筑拥有者派系（可选）
- `input`: 输入的建筑ID

**返回值：** 重新映射后的建筑ID

#### remapPortrait
```cpp
HeroTypeID remapPortrait(HeroTypeID input) const;
```
重新映射英雄肖像ID。

#### remap (FactionID)
```cpp
FactionID remap(FactionID input) const;
```
重新映射派系ID。

#### remap (CreatureID)
```cpp
CreatureID remap(CreatureID input) const;
```
重新映射生物ID。

#### remap (HeroTypeID)
```cpp
HeroTypeID remap(HeroTypeID input) const;
```
重新映射英雄类型ID。

#### remap (HeroClassID)
```cpp
HeroClassID remap(HeroClassID input) const;
```
重新映射英雄职业ID。

#### remap (TerrainId)
```cpp
TerrainId remap(TerrainId input) const;
```
重新映射地形ID。

#### remap (ArtifactID)
```cpp
ArtifactID remap(ArtifactID input) const;
```
重新映射神器ID。

#### remap (SecondarySkill)
```cpp
SecondarySkill remap(SecondarySkill input) const;
```
重新映射二级技能ID。

#### remap (CampaignRegionID)
```cpp
CampaignRegionID remap(CampaignRegionID input) const;
```
重新映射战役区域ID。

### getFormatSettings
```cpp
const JsonNode & getFormatSettings() const;
```
获取格式特定设置。

## ObjectTypeIdentifier 结构体

### 概述
对象类型标识符，组合了对象ID和子ID。

### 成员变量
```cpp
Obj ID;        // 对象主ID
int32_t subID; // 对象子ID
```

### 比较运算符
```cpp
bool operator < (const ObjectTypeIdentifier & other) const;
```
按ID和子ID进行字典序比较。

## 工作原理

### 映射机制
标识符映射通过查找表实现版本间的转换：

1. **输入ID**: 从地图文件中读取的原始ID
2. **查找映射**: 在相应的映射表中查找对应的VCMI ID
3. **返回结果**: 返回转换后的ID，如果未找到则返回原ID

### 加载配置
映射配置通常从JSON文件中加载：

```json
{
  "buildings": {
    "1": 2,
    "3": 5
  },
  "creatures": {
    "10": 15,
    "20": 25
  }
}
```

### 派系特定映射
某些映射是派系特定的，例如建筑ID：

```json
{
  "factionBuildings": {
    "castle": {
      "1": 2,
      "3": 4
    },
    "rampart": {
      "1": 3,
      "2": 5
    }
  }
}
```

## 使用场景

`MapIdentifiersH3M` 用于：

1. **地图加载**: 将H3M格式的ID转换为VCMI内部ID
2. **兼容性处理**: 解决不同游戏版本间的ID差异
3. **模组支持**: 支持自定义ID映射
4. **格式转换**: 在不同地图格式间转换

## 使用示例

```cpp
// 加载映射配置
MapIdentifiersH3M mapping;
mapping.loadMapping(jsonConfig);

// 重新映射生物ID
CreatureID vcmiCreatureId = mapping.remap(h3mCreatureId);

// 重新映射建筑ID（派系特定）
BuildingID vcmiBuildingId = mapping.remapBuilding(factionId, h3mBuildingId);

// 重新映射对象模板
mapping.remapTemplate(objectTemplate);
```

## 相关类

- `ObjectTemplate`: 对象模板类
- `JsonNode`: JSON节点类
- 各种ID类型：`BuildingID`, `CreatureID`, `HeroTypeID` 等