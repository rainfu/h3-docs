# RandomMapInfo

## 源文件

[RandomMapInfo.h](https://github.com/vcmi/vcmi/blob/master/lib/mapObjectConstructors/RandomMapInfo.h)

## 结构体定义

```cpp
struct DLL_LINKAGE RandomMapInfo
```

`RandomMapInfo` 结构体描述了对象在随机地图生成（RMG）中的放置规则和属性。

## 成员变量

- `ui32 value` - 对象价值（1k = 无价值，10k = 乌托邦级别）
- `std::optional<ui32> mapLimit` - 该对象在地图上可以放置的最大数量，0表示不能由RMG放置
- `ui32 zoneLimit` - 该对象在一个区域内可以放置的最大数量，0表示不可放置
- `ui32 rarity` - 对象稀有度（5 = 极度稀有，100 = 常见）

## 构造函数

```cpp
RandomMapInfo():
    value(0),
    zoneLimit(0),
    rarity(0)
{}
```

默认构造函数，将所有数值初始化为0。

## 方法

- `void setMapLimit(ui32 val)` - 设置地图限制数量

## 设计特点

- **价值评估**: 通过价值评分系统控制对象的放置优先级
- **数量控制**: 支持全局和区域级别的数量限制
- **稀有度系统**: 控制对象的出现频率
- **灵活配置**: 地图限制是可选的，允许更灵活的配置
- **RMG集成**: 专门为随机地图生成器设计的数据结构