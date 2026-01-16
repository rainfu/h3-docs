# CBuilding类

CBuilding类是VCMI系统中的建筑类，用于表示城堡中的各种建筑物。它包含了与游戏机制相关的建筑数据，如资源成本、产出、前置条件等。

## 类定义

```cpp
class CTown;

/// 一个典型的在每个城堡中都能遇到的建筑物
/// 这是客户端和服务器都可用的结构
/// 包含有关城镇建筑的全部机制相关数据
class DLL_LINKAGE CBuilding
{
    std::string modScope;          // 模组范围
    std::string identifier;        // 标识符

public:
    using TRequired = LogicalExpression<BuildingID>; // 前置条件的逻辑表达式类型

    CTown * town;                              // 所属城镇
    TResources resources;                      // 建造所需资源
    TResources produce;                        // 建筑产出资源
    TRequired requirements;                    // 建造前置条件
    ArtifactID warMachine;                     // 战争机器
    TownFortifications fortifications;         // 城镇防御工事
    std::set<EMarketMode> marketModes;        // 市场模式
    std::vector<TradeItemBuy> marketOffer;    // 市场供应

    BuildingID bid;                           // 建筑ID
    BuildingID upgrade;                       // 升级目标，-1表示无
    BuildingSubID::EBuildingSubID subId;      // 特殊建筑子类型，-1表示非特殊建筑
    bool upgradeReplacesBonuses = false;     // 升级是否替换奖励
    bool manualHeroVisit = false;            // 是否需要手动英雄访问
    BonusList buildingBonuses;               // 建筑奖励列表
    MapObjectID mapObjectLikeBonuses;        // 类似地图对象的奖励

    Rewardable::Info rewardableObjectInfo;   // 可奖励对象信息（用于特殊建筑的可配置奖励）

    enum EBuildMode
    {
        BUILD_NORMAL,  // 0 - 正常，正常建造
        BUILD_AUTO,    // 1 - 自动，当所有前置建筑都建成后自动出现
        BUILD_SPECIAL, // 2 - 特殊，无法正常建造
        BUILD_GRAIL    // 3 - 圣杯，需要圣杯才能建造
    } mode;

    static const std::map<std::string, CBuilding::EBuildMode> MODES; // 建造模式映射

    CBuilding() : town(nullptr), mode(BUILD_NORMAL) {}; // 构造函数

    BuildingTypeUniqueID getUniqueTypeID() const;      // 获取唯一类型ID

    std::string getJsonKey() const;                   // 获取JSON键

    std::string getNameTranslated() const;            // 获取翻译名称
    std::string getDescriptionTranslated() const;     // 获取翻译描述

    std::string getBaseTextID() const;                // 获取基础文本ID
    std::string getNameTextID() const;                // 获取名称文本ID
    std::string getDescriptionTextID() const;         // 获取描述文本ID

    // 返回升级链的根节点或本身
    BuildingID getBase() const;                       // 获取基础建筑ID

    // 返回建筑需要升级多少次才能成为目标建筑
    si32 getDistance(const BuildingID & build) const; // 获取升级距离

    STRONG_INLINE
    bool IsTradeBuilding() const                      // 是否为贸易建筑
    {
        return !marketModes.empty();
    }

    void addNewBonus(const std::shared_ptr<Bonus> & b, BonusList & bonusList) const; // 添加新奖励

    friend class CTownHandler;                        // CTownHandler是友元类
};
```

## 功能说明

CBuilding类是VCMI系统中表示城镇建筑的核心类，它不仅包含了建筑的基本属性（如建造成本、产出等），还包括了复杂的前置条件系统、奖励系统和升级机制。

该类设计为客户端和服务器共享的数据结构，确保了游戏状态的一致性。

## 重要方法

### 基本属性访问
- `getUniqueTypeID()`：获取建筑的唯一类型ID
- `getNameTranslated()`：获取翻译后的建筑名称
- `getDescriptionTranslated()`：获取翻译后的建筑描述
- `getJsonKey()`：获取JSON键，用于配置文件

### 升级系统
- `getBase()`：获取升级链的根节点建筑ID
- `getDistance()`：获取当前建筑到目标建筑的升级距离

### 商业功能
- `IsTradeBuilding()`：检查建筑是否为贸易建筑
- 通过`marketModes`和`marketOffer`属性实现市场功能

### 奖励系统
- `addNewBonus()`：向奖励列表添加新奖励

## 建造模式

CBuilding类支持四种建造模式：
1. `BUILD_NORMAL`：普通模式，玩家可以正常建造
2. `BUILD_AUTO`：自动模式，当所有前置建筑建成后自动解锁
3. `BUILD_SPECIAL`：特殊模式，无法通过常规方式建造
4. `BUILD_GRAIL`：圣杯模式，需要圣杯才能建造

## 设计说明

CBuilding类设计为一个数据容器，存储了游戏中建筑的全部必要信息：

1. **资源管理**：通过`resources`和`produce`属性管理建筑的成本和产出
2. **前置条件系统**：使用`LogicalExpression<BuildingID>`类型的`requirements`属性，支持复杂的前置条件逻辑
3. **升级系统**：通过`upgrade`属性和相关方法实现建筑升级链
4. **奖励系统**：通过`buildingBonuses`属性和`addNewBonus`方法实现建筑奖励
5. **贸易系统**：通过`marketModes`和`marketOffer`属性实现市场功能
6. **特殊功能**：通过`rewardableObjectInfo`属性实现特殊建筑的奖励系统

CBuilding类是CTown类的重要组成部分，与城镇系统紧密集成，构成了VCMI经济和战略系统的基础。