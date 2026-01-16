# ZoneConnection类

ZoneConnection类是VCMI中随机地图生成系统中区域连接的表示类，定义了随机地图中不同区域之间的连接关系。

## 类定义

```cpp
class DLL_LINKAGE ZoneConnection
{
public:
    ZoneConnection();

    int getId() const;
    void setId(int id);
    TRmgTemplateZoneId getZoneA() const;
    TRmgTemplateZoneId getZoneB() const;
    TRmgTemplateZoneId getOtherZoneId(TRmgTemplateZoneId id) const;
    int getGuardStrength() const;
    rmg::EConnectionType getConnectionType() const;
    rmg::ERoadOption getRoadOption() const;
    void setRoadOption(rmg::ERoadOption roadOption);

    void serializeJson(JsonSerializeFormat & handler);
    
    friend bool operator==(const ZoneConnection &, const ZoneConnection &);
    friend bool operator<(const ZoneConnection &, const ZoneConnection &);
private:
    int id;
    TRmgTemplateZoneId zoneA;
    TRmgTemplateZoneId zoneB;
    int guardStrength;
    rmg::EConnectionType connectionType;
    rmg::ERoadOption hasRoad;
};
```

## 功能说明

ZoneConnection是VCMI随机地图生成系统中用于描述区域间连接的类。它定义了两个区域之间的连接关系，包括连接ID、连接的区域、守卫强度、连接类型和道路选项等。这个类是随机地图模板中区域间连接关系的核心表示。

## 依赖关系

- [TRmgTemplateZoneId](./TRmgTemplateZoneId.md): 区域ID类型
- [EConnectionType](./EConnectionType.md): 连接类型枚举
- [ERoadOption](./ERoadOption.md): 道路选项枚举
- [JsonSerializeFormat](../serializer/JsonSerializeFormat.md): JSON序列化格式
- STL库: 基本数据类型

## 构造函数

- `ZoneConnection()`: 默认构造函数

## 函数注释

- `getId()`: 获取连接的ID
- `setId(id)`: 设置连接的ID
- `getZoneA()`: 获取连接的第一个区域ID
- `getZoneB()`: 获取连接的第二个区域ID
- `getOtherZoneId(id)`: 根据给定的区域ID获取另一个区域的ID
- `getGuardStrength()`: 获取守卫强度
- `getConnectionType()`: 获取连接类型
- `getRoadOption()`: 获取道路选项
- `setRoadOption(roadOption)`: 设置道路选项
- `serializeJson(handler)`: JSON序列化方法，用于保存和加载区域连接信息

## 友元函数

- `operator==(connection1, connection2)`: 比较两个连接是否相等
- `operator<(connection1, connection2)`: 比较两个连接的大小

## 成员变量

- `id`: 连接的唯一标识符
- `zoneA`: 连接的第一个区域
- `zoneB`: 连接的第二个区域
- `guardStrength`: 守卫强度
- `connectionType`: 连接类型
- `hasRoad`: 是否有道路的选项