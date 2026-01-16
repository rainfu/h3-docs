# ETemplateZoneType枚举

ETemplateZoneType枚举是VCMI中随机地图生成系统中区域类型的定义，用于区分随机地图模板中不同类型的区域。

## 类定义

```cpp
enum class ETemplateZoneType
{
    PLAYER_START,
    CPU_START,
    TREASURE,
    JUNCTION,
    WATER,
    SEALED
};
```

## 功能说明

ETemplateZoneType是VCMI随机地图生成系统中用来定义不同区域类型的枚举。它用于标识随机地图模板中各个区域的功能和角色，对地图生成算法有直接影响。每种类型代表了区域在地图中的不同用途和特征。

## 枚举值

- `PLAYER_START`: 玩家起始区域，用于放置玩家的起始位置和初始资源
- `CPU_START`: AI玩家起始区域，用于放置AI玩家的起始位置和初始资源
- `TREASURE`: 宝藏区域，用于放置地图上的宝藏和资源点
- `JUNCTION`: 连接区域，用于连接地图上的其他重要区域
- `WATER`: 水域区域，在某些地图类型中表示水体
- `SEALED`: 封印区域，通常为需要解锁或征服的封闭区域