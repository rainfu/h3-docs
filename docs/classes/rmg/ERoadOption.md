# ERoadOption枚举

ERoadOption枚举是VCMI中随机地图生成系统中道路选项的定义，用于控制区域间是否生成道路。

## 类定义

```cpp
enum class ERoadOption
{
    ROAD_RANDOM = 0,
    ROAD_TRUE,
    ROAD_FALSE
};
```

## 功能说明

ERoadOption是VCMI随机地图生成系统中用来定义区域间道路生成选项的枚举。它控制着在两个区域之间是否生成道路，对地图的可通行性和战略要素有重要影响。这个枚举允许地图设计者指定区域间道路的存在与否。

## 枚举值

- `ROAD_RANDOM = 0`: 随机道路，让系统随机决定是否在区域间生成道路
- `ROAD_TRUE`: 有道路，强制在区域间生成道路
- `ROAD_FALSE`: 无道路，确保不在区域间生成道路