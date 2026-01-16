# ZoneOptions::CTownInfo类

ZoneOptions::CTownInfo类是VCMI中随机地图生成系统中城镇信息的表示类，定义了随机地图中城镇的相关配置选项。

## 类定义

```cpp
class DLL_LINKAGE ZoneOptions::CTownInfo
{
public:
    CTownInfo();

    int getTownCount() const;
    int getCastleCount() const;
    int getTownDensity() const;
    int getCastleDensity() const;

    void serializeJson(JsonSerializeFormat & handler);

private:
    int townCount;
    int castleCount;
    int townDensity;
    int castleDensity;

    TRmgTemplateZoneId townTypesLikeZone = NO_ZONE;
    TRmgTemplateZoneId townTypesNotLikeZone = NO_ZONE;
    TRmgTemplateZoneId townTypesRelatedToZoneTerrain = NO_ZONE;
};
```

## 功能说明

ZoneOptions::CTownInfo是VCMI随机地图生成系统中ZoneOptions类的嵌套类，用于描述区域中城镇的相关配置。它定义了区域内城镇和城堡的数量、密度以及其他与城镇类型相关的选项。这个类是随机地图模板中区域城镇配置的核心表示。

## 依赖关系

- [TRmgTemplateZoneId](./TRmgTemplateZoneId.md): 区域ID类型
- [JsonSerializeFormat](../serializer/JsonSerializeFormat.md): JSON序列化格式
- STL库: 基本数据类型

## 构造函数

- `CTownInfo()`: 默认构造函数

## 函数注释

- `getTownCount()`: 获取城镇数量
- `getCastleCount()`: 获取城堡数量
- `getTownDensity()`: 获取城镇密度
- `getCastleDensity()`: 获取城堡密度
- `serializeJson(handler)`: JSON序列化方法，用于保存和加载城镇信息

## 成员变量

- `townCount`: 城镇数量
- `castleCount`: 城堡数量
- `townDensity`: 城镇密度
- `castleDensity`: 城堡密度
- `townTypesLikeZone`: 与哪个区域的城镇类型相似
- `townTypesNotLikeZone`: 与哪个区域的城镇类型不相似
- `townTypesRelatedToZoneTerrain`: 与区域地形相关的城镇类型