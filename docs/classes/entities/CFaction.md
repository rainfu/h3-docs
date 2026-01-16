# CFaction类

CFaction类是VCMI中派系类型的实现类，定义了游戏中派系的基本属性和功能。

## 类定义

```cpp
struct DLL_LINKAGE SPuzzleInfo
{
    Point position;
    ui16 number; // 拼图类型
    ui16 whenUncovered; // 确定发现顺序（值越小越早发现）
    ImagePath filename; // 包含此拼图图形的文件
};

class DLL_LINKAGE CFaction : public Faction
{
    friend class CTownHandler;
    friend class CBuilding;
    friend class CTown;

    std::string modScope;
    std::string identifier;

    FactionID index = FactionID::NEUTRAL;

    FactionID getFactionID() const override; // 此函数不应被使用

public:
    TerrainId nativeTerrain;
    EAlignment alignment = EAlignment::NEUTRAL;
    bool preferUndergroundPlacement = false;
    bool special = false;

    /// 城镇造船厂将使用的船只（如果有）
    /// 以及用于直接在船上放置英雄（在地图编辑器、水上监狱和酒馆中）
    BoatId boatType = BoatId::CASTLE;

    std::unique_ptr<CTown> town; // 注意：可能为空

    ImagePath creatureBg120;
    ImagePath creatureBg130;

    std::vector<SPuzzleInfo> puzzleMap;

    CFaction();
    ~CFaction();

    int32_t getIndex() const override;
    int32_t getIconIndex() const override;
    std::string getJsonKey() const override;
    std::string getModScope() const override;
    void registerIcons(const IconRegistar & cb) const override;
    FactionID getId() const override;

    std::string getNameTranslated() const override;
    std::string getNameTextID() const override;
    std::string getDescriptionTranslated() const;
    std::string getDescriptionTextID() const;

    bool hasTown() const override;
    TerrainId getNativeTerrain() const override;
    EAlignment getAlignment() const override;
    BoatId getBoatType() const override;

    void updateFrom(const JsonNode & data);
    void serializeJson(JsonSerializeFormat & handler);
};
```

## 功能说明

CFaction是VCMI中派系类型的实现类，定义了游戏中每个派系的基本属性，如原生地形、阵营、船只类型、拼图信息等。它继承自Faction接口，提供了派系的各种方法实现。

## 依赖关系

- [Faction](../../../include/vcmi/Faction.md): 派系接口
- [CTown](./CTown.md): 城镇类
- [SPuzzleInfo](./SPuzzleInfo.md): 拼图信息结构
- [FactionID](../constants/FactionID.md): 派系ID
- [TerrainId](../constants/TerrainId.md): 地形ID
- [EAlignment](../constants/EAlignment.md): 阵营枚举
- [BoatId](../constants/BoatId.md): 船只ID
- [ImagePath](../filesystem/ResourcePath.md): 图片路径
- [Point](../Point.md): 点坐标
- [JsonNode](../json/JsonNode.md): JSON节点
- [JsonSerializeFormat](../json/JsonSerializeFormat.md): JSON序列化格式

## 函数注释

- `CFaction()`: 构造函数，创建派系对象
- `getIndex()`: 获取派系索引
- `getIconIndex()`: 获取图标索引
- `getJsonKey()`: 获取JSON键值
- `getModScope()`: 获取模组范围
- `getId()`: 获取派系ID
- `registerIcons(cb)`: 注册图标
- `getNameTranslated()`: 获取翻译后的派系名称
- `getNameTextID()`: 获取名称文本ID
- `getDescriptionTranslated()`: 获取翻译后的描述
- `getDescriptionTextID()`: 获取描述文本ID
- `hasTown()`: 检查派系是否有城镇
- `getNativeTerrain()`: 获取原生地形
- `getAlignment()`: 获取阵营
- `getBoatType()`: 获取船只类型
- `updateFrom(data)`: 从JSON数据更新派系信息
- `serializeJson(handler)`: JSON序列化