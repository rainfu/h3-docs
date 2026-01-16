# CFaction类

CFaction类是VCMI系统中的派系类，用于表示游戏中的不同派系（如城堡、壁垒、塔楼等）。它包含了派系的基本属性、原生地形、对齐方式等信息。

## 类定义

```cpp
class CTown;

// 拼图信息结构
struct DLL_LINKAGE SPuzzleInfo
{
    Point position;                    // 位置坐标
    ui16 number;                      // 拼图类型
    ui16 whenUncovered;               // 发现顺序（数值越小越早发现）
    ImagePath filename;               // 拼图图形文件路径
};

// 派系类
class DLL_LINKAGE CFaction : public Faction
{
    friend class CTownHandler;
    friend class CBuilding;
    friend class CTown;

    std::string modScope;             // 模组范围
    std::string identifier;           // 标识符

    FactionID index = FactionID::NEUTRAL; // 派系索引

    FactionID getFactionID() const override; // 此函数不应被使用

public:
    TerrainId nativeTerrain;          // 原生地形
    EAlignment alignment = EAlignment::NEUTRAL; // 阵营对齐
    bool preferUndergroundPlacement = false;   // 是否偏向地下放置
    bool special = false;             // 是否为特殊派系

    /// 城镇船坞使用的船只类型（如果有）
    /// 以及用于在船上直接放置英雄（在地图编辑器、水监狱和酒馆中）
    BoatId boatType = BoatId::CASTLE; // 船只类型

    std::unique_ptr<CTown> town;      // 派系城镇（注意：可能为空）

    ImagePath creatureBg120;          // 生物背景图片（120像素）
    ImagePath creatureBg130;          // 生物背景图片（130像素）

    std::vector<SPuzzleInfo> puzzleMap; // 拼图地图信息

    CFaction();                       // 构造函数
    ~CFaction();                      // 析构函数

    int32_t getIndex() const override;      // 获取索引
    int32_t getIconIndex() const override;  // 获取图标索引
    std::string getJsonKey() const override; // 获取JSON键
    std::string getModScope() const override; // 获取模组范围
    void registerIcons(const IconRegistar & cb) const override; // 注册图标
    FactionID getId() const override;       // 获取ID

    std::string getNameTranslated() const override;  // 获取翻译名称
    std::string getNameTextID() const override;      // 获取名称文本ID
    std::string getDescriptionTranslated() const;    // 获取翻译描述
    std::string getDescriptionTextID() const;        // 获取描述文本ID

    bool hasTown() const override;                  // 是否有城镇
    TerrainId getNativeTerrain() const override;    // 获取原生地形
    EAlignment getAlignment() const override;       // 获取阵营对齐
    BoatId getBoatType() const override;            // 获取船只类型

    void updateFrom(const JsonNode & data);         // 从JSON节点更新
    void serializeJson(JsonSerializeFormat & handler); // JSON序列化
};
```

## 功能说明

CFaction类是VCMI系统中表示游戏派系的核心类，它不仅包含了派系的基本属性（如阵营、原生地形等），还包括了城镇信息、拼图地图、船只类型等高级功能。

该类继承自Faction接口，实现了标准化的访问方法，确保了不同组件间的兼容性。

## 重要方法

### 基本属性访问
- `getId()`：获取派系ID
- `getIndex()`：获取派系索引
- `getNameTranslated()`：获取翻译后的派系名称
- `getDescriptionTranslated()`：获取翻译后的派系描述

### 派系特性
- `getNativeTerrain()`：获取派系的原生地形
- `getAlignment()`：获取派系的阵营对齐（善良、邪恶、中立）
- `getBoatType()`：获取派系的船只类型
- `hasTown()`：检查派系是否有城镇

### 图标和资源
- `getIconIndex()`：获取图标索引
- `registerIcons()`：注册图标资源

### 序列化
- `updateFrom()`：从JSON节点更新派系数据
- `serializeJson()`：JSON序列化派系数据

## 重要属性

### 派系特性
- `nativeTerrain`：派系的原生地形，影响生物在该地形上的加成
- `alignment`：派系的阵营对齐，决定AI的外交行为
- `boatType`：派系的船只类型，用于船坞建造和英雄放置

### 城镇和生物
- `town`：派系的城镇信息（unique_ptr），可能为空
- `creatureBg120`和`creatureBg130`：生物展示时的背景图片

### 拼图地图
- `puzzleMap`：拼图地图信息向量，包含拼图位置、类型、发现顺序等

## SPuzzleInfo结构

SPuzzleInfo结构存储拼图地图的相关信息：
- `position`：拼图在世界地图上的位置
- `number`：拼图类型编号
- `whenUncovered`：发现顺序（数值越小越早发现）
- `filename`：拼图图形文件路径

## 设计说明

CFaction类设计为一个综合性的派系数据容器，具有以下特点：

1. **接口兼容性**：继承自Faction接口，确保与其他系统的兼容性
2. **派系特性**：通过nativeTerrain、alignment等属性定义派系的独特玩法特征
3. **扩展性**：通过puzzleMap支持世界地图拼图功能
4. **模块化**：通过modScope和identifier支持模组功能
5. **序列化**：支持JSON格式的序列化和反序列化，便于配置管理