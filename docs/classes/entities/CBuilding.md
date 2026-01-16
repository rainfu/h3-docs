# CBuilding类

CBuilding类是VCMI中建筑类型的实现类，定义了游戏中建筑的基本属性和功能。

## 类定义

```cpp
class DLL_LINKAGE CBuilding
{
    std::string modScope;
    std::string identifier;

public:
    using TRequired = LogicalExpression<BuildingID>;

    CTown * town; // 建筑所属的城镇
    TResources resources; // 建造所需资源
    TResources produce; // 建筑产出资源
    TRequired requirements; // 建造前置条件
    ArtifactID warMachine; // 战争机器
    TownFortifications fortifications; // 城镇堡垒
    std::set<EMarketMode> marketModes; // 市场模式
    std::vector<TradeItemBuy> marketOffer; // 市场供应

    BuildingID bid; // 建筑ID
    BuildingID upgrade; /// 表示此建筑可升级的建筑，-1 = 空
    BuildingSubID::EBuildingSubID subId; /// 特殊建筑的子类型，-1 = 不是特殊建筑
    bool upgradeReplacesBonuses = false;
    bool manualHeroVisit = false;
    BonusList buildingBonuses; // 建筑奖励
    MapObjectID mapObjectLikeBonuses;

    Rewardable::Info rewardableObjectInfo; /// 特殊建筑的可配置奖励

    enum EBuildMode
    {
        BUILD_NORMAL,  // 0 - 正常，默认
        BUILD_AUTO,    // 1 - 自动 - 当所有前置建筑建成后自动出现
        BUILD_SPECIAL, // 2 - 特殊 - 建筑不能正常建造
        BUILD_GRAIL    // 3 - 圣杯 - 建筑需要圣杯才能建造
    } mode;

    static const std::map<std::string, CBuilding::EBuildMode> MODES;

    CBuilding() : town(nullptr), mode(BUILD_NORMAL) {};

    BuildingTypeUniqueID getUniqueTypeID() const;

    std::string getJsonKey() const;

    std::string getNameTranslated() const;
    std::string getDescriptionTranslated() const;

    std::string getBaseTextID() const;
    std::string getNameTextID() const;
    std::string getDescriptionTextID() const;

    // 返回升级的基建筑
    BuildingID getBase() const;

    // 返回建筑需要多少次升级才能成为目标建筑
    si32 getDistance(const BuildingID & build) const;

    STRONG_INLINE
    bool IsTradeBuilding() const
    {
        return !marketModes.empty();
    }

    void addNewBonus(const std::shared_ptr<Bonus> & b, BonusList & bonusList) const;

    friend class CTownHandler;
};
```

## 功能说明

CBuilding是VCMI中建筑类型的实现类，定义了游戏中每个建筑的基本属性，如建造成本、产出、前置条件、奖励等。它包含建筑的建造模式、市场功能、升级关系等特性，是城镇发展系统的核心组成部分。

## 依赖关系

- [CTown](./CTown.md): 城镇类
- [TResources](../ResourceSet.md): 资源集
- [LogicalExpression](../LogicalExpression.md): 逻辑表达式
- [BonusList](../bonuses/BonusList.md): 奖励列表
- [BuildingID](../constants/BuildingID.md): 建筑ID
- [BuildingSubID](../constants/BuildingSubID.md): 建筑子ID
- [MapObjectID](../constants/MapObjectID.md): 地图对象ID
- [ArtifactID](../constants/ArtifactID.md): 神器ID
- [EMarketMode](../constants/EMarketMode.md): 市场模式
- [TradeItemBuy](../networkPacks/TradeItemBuy.md): 买入交易项
- [Rewardable::Info](../rewardable/Info.md): 可奖励信息
- [TownFortifications](./TownFortifications.md): 城镇堡垒
- [Bonus](../bonuses/Bonus.md): 奖励类

## 函数注释

- `CBuilding()`: 构造函数，创建建筑对象
- `getUniqueTypeID()`: 获取唯一建筑类型ID
- `getJsonKey()`: 获取JSON键值
- `getNameTranslated()`: 获取翻译后的建筑名称
- `getDescriptionTranslated()`: 获取翻译后的建筑描述
- `getBaseTextID()`: 获取基础文本ID
- `getNameTextID()`: 获取名称文本ID
- `getDescriptionTextID()`: 获取描述文本ID
- `getBase()`: 获取建筑的基类型（如果是升级建筑则返回原始建筑）
- `getDistance(build)`: 获取当前建筑到目标建筑的升级距离
- `IsTradeBuilding()`: 检查建筑是否是贸易建筑
- `addNewBonus(b, bonusList)`: 向奖励列表添加新奖励