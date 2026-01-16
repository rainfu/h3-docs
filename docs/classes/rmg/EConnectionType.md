# EConnectionType枚举

EConnectionType枚举是VCMI中随机地图生成系统中连接类型的定义，用于区分区域间的不同连接方式。

## 类定义

```cpp
enum class EConnectionType
{
    GUARDED = 0, // 默认
    FICTIVE,
    REPULSIVE,
    WIDE,
    FORCE_PORTAL
};
```

## 功能说明

EConnectionType是VCMI随机地图生成系统中用来定义区域间连接类型的枚举。它决定了两个区域之间的连接性质和生成方式，对地图的连通性和难度有直接影响。每种类型代表了不同的连接特征和生成策略。

## 枚举值

- `GUARDED = 0`: 受保护的连接，这是默认类型，通常意味着连接处会有守卫或其他障碍
- `FICTIVE`: 虚拟连接，一种概念上的连接，不一定在地图上实际连接两个区域
- `REPULSIVE`: 排斥连接，一种倾向于分离区域的连接类型
- `WIDE`: 宽连接，表示较大或更容易通过的连接
- `FORCE_PORTAL`: 强制传送门连接，使用传送门等方式强制连接两个区域