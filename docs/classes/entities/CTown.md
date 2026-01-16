# CTown

城镇类，定义游戏中各种城镇的属性和建筑。

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
```cpp
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
```