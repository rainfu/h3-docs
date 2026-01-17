# CCastleEvent

## 概述

`CCastleEvent` 类是 VCMI 地图事件系统的一部分，用于处理城堡相关的事件。这个类继承自 `CMapEvent`，专门用于在特定城镇中建造/添加建筑和生物。

## 类定义

```cpp
class DLL_LINKAGE CCastleEvent : public CMapEvent
```

## 继承关系

```
CMapEvent
  └── CCastleEvent
```

## 公共成员变量

### buildings
```cpp
std::set<BuildingID> buildings;
```
存储要建造的建筑ID集合。使用 `std::set` 确保建筑ID的唯一性。

### creatures
```cpp
std::vector<si32> creatures;
```
存储要添加的生物数量。每个元素代表对应槽位中要添加的生物数量。

## 序列化方法

### serialize
```cpp
template<typename Handler>
void serialize(Handler & h)
```
模板序列化方法，支持二进制序列化。

**参数：**
- `h`: 序列化处理器

**序列化内容：**
- 父类 `CMapEvent` 的数据
- `buildings` 集合
- `creatures` 向量

### serializeJson
```cpp
void serializeJson(JsonSerializeFormat & handler) override;
```
JSON格式序列化方法，重写了父类的虚函数。

## 使用场景

城堡事件通常用于：

1. **地图事件触发**: 当玩家进入特定区域或满足条件时触发
2. **城镇升级**: 自动为城镇添加新的建筑
3. **驻军补充**: 为城镇守卫添加额外的生物
4. **剧情发展**: 随着游戏进度的推进，逐步解锁城镇功能

## 配置示例

```json
{
  "type": "castleEvent",
  "buildings": [1, 5, 10],
  "creatures": [10, 5, 0, 0, 0, 0, 0],
  "message": "城镇获得了新的建筑！",
  "players": [0],
  "humanReadableName": "城镇升级事件"
}
```

## 相关类

- `CMapEvent`: 基础地图事件类
- `BuildingID`: 建筑ID类型
- `JsonSerializeFormat`: JSON序列化处理器