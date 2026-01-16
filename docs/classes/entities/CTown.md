# CTown类

CTown类是VCMI中城镇类型的实现类，定义了游戏中城镇的基本属性和功能。

## 类定义

```cpp
struct DLL_LINKAGE CStructure
{
    const CBuilding * building;  // 基础建筑，如果为null，则此结构将始终显示在屏幕上
    const CBuilding * buildable; // 用于确定建造建筑和可见成本的建筑，通常与"building"相同

    int3 pos;
    AnimationPath defName;
    ImagePath borderName;
    ImagePath campaignBonus;
    ImagePath areaName;
    std::string identifier;

    bool hiddenUpgrade; // 仅当"building"是升级时使用，如果为true - 城镇屏幕上的结构将表现得完全像父级（鼠标点击、悬停文本等）
};

class DLL_LINKAGE CTown : boost::noncopyable
{
    friend class CTownHandler;
    size_t namesCount = 0;

public:
    CTown();
    ~CTown();

    std::string getBuildingScope() const;
    std::set<si32> getAllBuildings() const;
    const CBuilding * getSpecialBuilding(BuildingSubID::EBuildingSubID subID) const;
    BuildingID getBuildingType(BuildingSubID::EBuildingSubID subID) const;

    std::string getRandomNameTextID(size_t index) const;
    size_t getRandomNamesCount() const;

    CFaction * faction;

    /// 等级 -> 此等级生物列表
    std::vector<std::vector<CreatureID> > creatures;

    std::map<BuildingID, std::unique_ptr<const CBuilding>> buildings;

    std::vector<std::string> dwellings; // 冒险地图生物栖息地的defs，[0]表示1级生物等
    std::vector<std::string> dwellingNames;

    // 应该从配置中移除以支持自动检测
    std::map<int,int> hordeLvl; //[0] - 第一部落建筑生物等级; [1] - 第二部落建筑（如果不支持则为-1）
    ui32 mageLevel; // 最大可用法师公会等级
    GameResID primaryRes;
    CreatureID warMachineDeprecated;

    /// 空城的堡垒基础状态
    /// 用于定义射手单位和护城河法术ID
    TownFortifications fortifications;

    // 默认酒馆英雄出现几率，如果未设置"tavern"字段
    // 结果几率 = sqrt(town.chance * heroClass.chance)
    ui32 defaultTavernChance;

    // 仅客户端数据，应从lib中移出
    struct ClientInfo
    {
        // 图标 [有堡垒?][达到建筑限制?] -> def文件中的图标索引
        int icons[2][2];
        std::string iconSmall[2][2]; /// 加载期间使用的图标名
        std::string iconLarge[2][2];
        VideoPath tavernVideo;
        std::vector<AudioPath> musicTheme;
        ImagePath townBackground;
        std::vector<ImagePath> guildBackground;
        std::vector<ImagePath> guildWindow;
        Point guildWindowPosition;
        std::vector<std::vector<Point>> guildSpellPositions;
        AnimationPath buildingsIcons;
        ImagePath hallBackground;
        /// vector[row][column] = 此槽位的建筑列表
        std::vector< std::vector< std::vector<BuildingID> > > hallSlots;

        /// 城镇屏幕结构列表
        /// 注意：向量中的索引无意义，使用向量代替列表是为了稍快的访问
        std::vector<std::unique_ptr<const CStructure>> structures;

        std::string siegePrefix;
        std::vector<Point> siegePositions;
        std::string towerIconSmall;
        std::string towerIconLarge;

    } clientInfo;
};
```

## 功能说明

CTown是VCMI中城镇类型的实现类，定义了游戏中每个城镇类型的基本属性、生物栖息地、建筑物、法术公会等级等特征。它包含客户端专用的信息，如界面图标、背景图片、音乐主题等，也包含游戏逻辑相关的信息，如生物列表、建筑物定义等。

## 依赖关系

- [CFaction](./CFaction.md): 派系类
- [CBuilding](./CBuilding.md): 建筑类
- [CreatureID](../constants/CreatureID.md): 生物ID
- [BuildingID](../constants/BuildingID.md): 建筑ID
- [BuildingSubID](../constants/BuildingSubID.md): 建筑子ID
- [GameResID](../constants/GameResID.md): 游戏资源ID
- [TownFortifications](./TownFortifications.md): 城镇堡垒
- [CStructure](./CStructure.md): 城镇结构
- [AnimationPath](../filesystem/ResourcePath.md): 动画路径
- [ImagePath](../filesystem/ResourcePath.md): 图片路径
- [VideoPath](../filesystem/ResourcePath.md): 视频路径
- [AudioPath](../filesystem/ResourcePath.md): 音频路径
- [Point](../Point.md): 点坐标

## 函数注释

- `CTown()`: 构造函数，创建城镇对象
- `getBuildingScope()`: 获取建筑作用域
- `getAllBuildings()`: 获取所有建筑ID
- `getSpecialBuilding(subID)`: 根据子ID获取特殊建筑
- `getBuildingType(subID)`: 根据子ID获取建筑类型
- `getRandomNameTextID(index)`: 获取指定索引的随机名称文本ID
- `getRandomNamesCount()`: 获取随机名称的数量
- `~CTown()`: 析构函数

## 📋 类概述

`CTown` 是 VCMI 中城镇系统的核心类，定义了游戏中所有城镇的基本属性、建筑、生物招募和客户端显示信息。该类是非拷贝的，包含了城镇的完整配置信息。

## 🔧 主要属性

### 基本信息
- `faction`: 所属阵营指针
- `namesCount`: 随机名称数量
- `primaryRes`: 主要资源类型
- `defaultTavernChance`: 默认酒馆英雄出现几率

### 生物系统
- `creatures`: 等级 -> 生物列表的映射
- `dwellings`: 冒险地图居民地定义文件
- `dwellingNames`: 居民地名称列表

### 建筑系统
- `buildings`: 建筑ID -> 建筑对象的映射
- `mageLevel`: 法师公会最大等级
- `hordeLvl`: 部落等级配置

### 防御系统
- `fortifications`: 城防基础状态
- `warMachineDeprecated`: 战争机器（已弃用）

## 🎯 核心方法

### 建筑查询
```cpp
// 获取所有建筑
std::set<si32> getAllBuildings() const;

// 获取特殊建筑
const CBuilding * getSpecialBuilding(BuildingSubID::EBuildingSubID subID) const;

// 获取建筑类型
BuildingID getBuildingType(BuildingSubID::EBuildingSubID subID) const;

// 获取建筑作用域
std::string getBuildingScope() const;
```

### 名称管理
```cpp
// 获取随机名称数量
size_t getRandomNamesCount() const;

// 获取随机名称文本ID
std::string getRandomNameTextID(size_t index) const;
```

## 🔗 依赖关系

### 依赖的类
- `CFaction`: 阵营类
- `CBuilding`: 建筑类
- `TownFortifications`: 城镇防御工事
- `CStructure`: 城镇结构（客户端专用）

### 被依赖关系
- 被 `CTownHandler` 用于管理城镇数据
- 被 `CGTownInstance` 用于创建城镇实例
- 被客户端UI用于显示城镇界面
- 被游戏逻辑用于建筑和生物管理

## 📝 使用示例

### 查询城镇建筑
```
// 获取城镇的所有建筑
auto allBuildings = town->getAllBuildings();
for (auto buildingId : allBuildings) {
    // 处理每个建筑
}

// 获取特殊建筑
auto townHall = town->getSpecialBuilding(BuildingSubID::EBuildingSubID::TOWN_HALL);
if (townHall) {
    // 城镇大厅存在
}

// 获取建筑类型
auto fortBuildingId = town->getBuildingType(BuildingSubID::EBuildingSubID::FORT);
```

### 生物系统管理
```cpp
// 获取指定等级的生物
for (size_t level = 0; level < town->creatures.size(); ++level) {
    const auto & levelCreatures = town->creatures[level];
    for (auto creatureId : levelCreatures) {
        // 处理该等级的生物
    }
}

// 检查居民地
for (size_t i = 0; i < town->dwellings.size(); ++i) {
    const auto & dwelling = town->dwellings[i];
    const auto & name = town->dwellingNames[i];
    // 处理居民地信息
}
```

### 客户端信息访问
```cpp
// 访问客户端专用信息
const auto & client = town->clientInfo;

// 获取城镇背景
auto background = client.townBackground;

// 获取公会背景
for (const auto & bg : client.guildBackground) {
    // 处理公会背景
}

// 获取建筑图标
auto icons = client.buildingsIcons;

// 获取城镇结构
for (const auto & structure : client.structures) {
    // 处理城镇结构
}
```

### 防御工事配置
```cpp
// 访问城防信息
const auto & forts = town->fortifications;

// 获取城防相关信息
auto moatSpell = forts.moatSpell;  // 护城河法术
auto shooterUnits = forts.shooter; // 射手单位

// 检查城防状态
if (forts.citadel) {
    // 有城堡
}
if (forts.castle) {
    // 有城堡升级
}
```

## ⚡ 性能特性

- **预编译数据**: 建筑和生物数据预先计算
- **缓存机制**: 常用查询结果缓存
- **共享数据**: 城镇数据在多个实例间共享
- **延迟加载**: 客户端资源按需加载

## 🔍 注意事项

1. **非拷贝设计**: CTown 类不可拷贝，只能通过指针引用
2. **客户端数据**: ClientInfo 结构仅用于客户端
3. **建筑依赖**: 建筑间可能存在依赖关系
4. **生物等级**: 生物按等级组织，等级从0开始

## 📊 相关结构

### CStructure 结构体
```cpp
struct CStructure {
    const CBuilding * building;    // 基础建筑
    const CBuilding * buildable;   // 可建造建筑
    int3 pos;                      // 位置
    AnimationPath defName;         // DEF文件名
    ImagePath borderName;          // 边框图像
    ImagePath areaName;            // 区域图像
    std::string identifier;        // 标识符
    bool hiddenUpgrade;            // 隐藏升级
};
```

### ClientInfo 结构体
```cpp
struct ClientInfo {
    int icons[2][2];                              // 图标索引
    std::string iconSmall[2][2];                  // 小图标
    std::string iconLarge[2][2];                  // 大图标
    VideoPath tavernVideo;                        // 酒馆视频
    std::vector<AudioPath> musicTheme;            // 音乐主题
    ImagePath townBackground;                     // 城镇背景
    std::vector<ImagePath> guildBackground;       // 公会背景
    std::vector<ImagePath> guildWindow;           // 公会窗口
    Point guildWindowPosition;                    // 公会窗口位置
    std::vector<std::vector<Point>> guildSpellPositions; // 法术位置
    AnimationPath buildingsIcons;                 // 建筑图标
    ImagePath hallBackground;                     // 大厅背景
    std::vector<std::vector<std::vector<BuildingID>>> hallSlots; // 大厅槽位
    std::vector<std::unique_ptr<const CStructure>> structures; // 城镇结构
    std::string siegePrefix;                      // 攻城前缀
    std::vector<Point> siegePositions;            // 攻城位置
    std::string towerIconSmall;                   // 塔楼小图标
    std::string towerIconLarge;                   // 塔楼大图标
};
```

## 🔧 配置示例

### 城镇配置JSON
```json
{
  "name": "Castle",
  "faction": "castle",
  "primaryResource": "gold",
  "mageGuild": 5,
  "creatures": [
    ["pikeman", "halberdier", "royal_pikeman"],
    ["archer", "marksman", "longbowman"],
    ["griffin", "royal_griffin"],
    ["monk", "zealot", "fanatic"],
    ["cavalier", "champion"],
    ["angel", "archangel"]
  ],
  "buildings": {
    "townHall": {
      "name": "Town Hall",
      "cost": {"gold": 2500}
    }
  },
  "client": {
    "icons": [[0, 1], [2, 3]],
    "townBackground": "castle-background.png",
    "musicTheme": ["castle-theme.mp3"]
  }
}