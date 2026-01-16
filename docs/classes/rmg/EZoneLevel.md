# EZoneLevel枚举

EZoneLevel枚举是VCMI中随机地图生成系统中区域级别的定义，用于控制区域在地面或地下放置。

## 类定义

```cpp
enum class EZoneLevel // 用于强制区域在地面或地下放置
{
    AUTOMATIC = 0,
    SURFACE = 1,
    UNDERGROUND = 2
};
```

## 功能说明

EZoneLevel是VCMI随机地图生成系统中用来定义区域垂直位置级别的枚举。它控制着地图生成过程中区域是在地面层还是地下层放置，对于具有地下层的地图（如地下城）非常重要。这个枚举允许地图设计者指定区域的垂直位置。

## 枚举值

- `AUTOMATIC = 0`: 自动级别，让系统自动决定区域放置在地面还是地下
- `SURFACE = 1`: 地面级别，强制区域放置在地面层
- `UNDERGROUND = 2`: 地下级别，强制区域放置在地下层