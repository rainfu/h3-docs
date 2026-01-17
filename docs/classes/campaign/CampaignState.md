<!-- 来源: E:\develop\heroes\vcmi\lib\campaign\CampaignState.h -->
# CampaignState头文件

CampaignState.h定义了VCMI战役系统的核心数据结构，包括战役头部信息、场景配置、旅行选项和战役状态管理。

## 主要类和结构体

### CampaignHeader类
战役头部信息管理类。

```cpp
class DLL_LINKAGE CampaignHeader : public boost::noncopyable
```

#### 主要成员变量
- `CampaignVersion version`: 战役版本
- `CampaignRegions campaignRegions`: 区域配置
- `MetaString name`: 战役名称
- `MetaString description`: 战役描述
- `MetaString author`: 作者信息
- `AudioPath music`: 背景音乐
- `ImagePath loadingBackground`: 加载背景
- `VideoPath introVideo/outroVideo`: 介绍/结束视频
- `HeroTypeID yogWizardID/gemSorceressID`: 特殊英雄ID

#### 主要方法
- `getFormat()`: 获取战役格式版本
- `getNameTranslated()`: 获取翻译后的名称
- `getDescriptionTranslated()`: 获取翻译后的描述
- `getRegions()`: 获取区域配置

### CampaignTravel结构体
定义场景间的旅行选项和奖励。

```cpp
struct DLL_LINKAGE CampaignTravel
```

#### WhatHeroKeeps子结构体
定义英雄在场景间旅行时保留的属性：

```cpp
struct WhatHeroKeeps
{
    bool experience = false;      // 经验值
    bool primarySkills = false;   // 主要技能
    bool secondarySkills = false; // 次要技能
    bool spells = false;          // 法术
    bool artifacts = false;       // 神器
};
```

#### 成员变量
- `std::set<CreatureID> monstersKeptByHero`: 英雄保留的生物
- `std::set<ArtifactID> artifactsKeptByHero`: 英雄保留的神器
- `std::vector<CampaignBonus> bonusesToChoose`: 可选奖励
- `WhatHeroKeeps whatHeroKeeps`: 保留属性配置
- `CampaignStartOptions startOptions`: 开始选项
- `PlayerColor playerColor`: 玩家颜色

### CampaignScenario结构体
定义单个战役场景的配置。

```cpp
struct DLL_LINKAGE CampaignScenario
```

#### 成员变量
- `std::string mapName`: 地图文件名
- `MetaString scenarioName`: 场景名称
- `std::set<CampaignScenarioID> preconditionRegions`: 前置区域
- `ui8 regionColor`: 区域颜色
- `ui8 difficulty`: 难度等级
- `CampaignScenarioPrologEpilog prolog/epilog`: 前奏/尾声
- `CampaignTravel travelOptions`: 旅行选项

### Campaign类
表示加载的战役信息。

```cpp
class DLL_LINKAGE Campaign : public CampaignHeader, public Serializeable
```

#### 主要方法
- `scenario(CampaignScenarioID)`: 获取指定场景
- `allScenarios()`: 获取所有场景ID
- `scenariosCount()`: 获取场景数量

### CampaignState类
表示正在进行的战役状态。

```cpp
class DLL_LINKAGE CampaignState : public Campaign
```

#### 主要功能
- **进度跟踪**: 记录已征服的地图和当前地图
- **英雄管理**: 处理英雄池和英雄传承
- **奖励系统**: 管理战役奖励的选择
- **地图加载**: 提供地图数据的访问接口

#### 关键方法
- `isAvailable(CampaignScenarioID)`: 检查场景是否可用
- `isConquered(CampaignScenarioID)`: 检查场景是否已征服
- `getBonus(CampaignScenarioID)`: 获取场景奖励
- `getMap(CampaignScenarioID)`: 获取地图数据
- `strongestHero()`: 获取最强英雄
- `crossoverSerialize/Deserialize()`: 英雄传承序列化

## 版本兼容性

支持多个序列化版本：
- `CAMPAIGN_VIDEO`: 视频支持
- `CAMPAIGN_BONUSES`: 奖励系统支持

## 相关类

- `CampaignBonus`: 战役奖励定义
- `CampaignRegions`: 区域配置
- `CampaignScenarioPrologEpilog`: 前奏尾声配置
- `HighScoreParameter`: 排行榜参数

## 数据流

1. **CampaignHeader**: 基本战役信息
2. **Campaign**: 完整战役配置
3. **CampaignState**: 运行时状态管理

## 序列化支持

所有类都支持完整的序列化，用于保存和加载战役状态。