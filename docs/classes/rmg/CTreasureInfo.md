# CTreasureInfo类

CTreasureInfo类是VCMI中随机地图生成系统中宝藏信息的表示类，定义了随机地图中宝藏的相关属性。

## 类定义

```cpp
class DLL_LINKAGE CTreasureInfo
{
public:
    ui32 min;
    ui32 max;
    ui16 density;
    CTreasureInfo();
    CTreasureInfo(ui32 min, ui32 max, ui16 density);

    bool operator ==(const CTreasureInfo & other) const;

    void serializeJson(JsonSerializeFormat & handler);
};
```

## 功能说明

CTreasureInfo是VCMI随机地图生成系统中用于描述宝藏信息的类。它定义了宝藏的最小值、最大值和密度，用于控制随机地图中宝藏的分布和价值范围。这些参数对地图生成过程中的资源分布有着直接影响。

## 依赖关系

- [JsonSerializeFormat](../serializer/JsonSerializeFormat.md): JSON序列化格式
- STL库: 基本数据类型

## 成员变量

- `min`: 宝藏的最小价值
- `max`: 宝藏的最大价值
- `density`: 宝藏的密度

## 构造函数

- `CTreasureInfo()`: 默认构造函数
- `CTreasureInfo(min, max, density)`: 使用指定的最小值、最大值和密度构造宝藏信息

## 函数注释

- `operator ==(other)`: 重载相等运算符，比较两个宝藏信息是否相等
- `serializeJson(handler)`: JSON序列化方法，用于保存和加载宝藏信息