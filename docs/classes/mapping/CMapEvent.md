# CMapEvent

## 概述

`CMapEvent` 是 VCMI 地图事件系统的基类。地图事件可以定期或一次性发生，用于给予或获取玩家的资源、显示消息、删除地图对象等。

## 类定义

```cpp
class DLL_LINKAGE CMapEvent
```

## 公共方法

### 构造函数和析构函数
```cpp
CMapEvent();
virtual ~CMapEvent() = default;
```

### occursToday
```cpp
bool occursToday(int currentDay) const;
```
检查事件是否在指定日期发生。

**参数：**
- `currentDay`: 当前日期

**返回值：** 如果事件在今天发生返回 `true`

### affectsPlayer
```cpp
bool affectsPlayer(PlayerColor player, bool isHuman) const;
```
检查事件是否影响指定的玩家。

**参数：**
- `player`: 玩家颜色
- `isHuman`: 是否为人类玩家

**返回值：** 如果事件影响该玩家返回 `true`

## 公共成员变量

### name
```cpp
std::string name;
```
事件的名称，用于标识和显示。

### message
```cpp
MetaString message;
```
事件触发的消息文本。支持元字符串格式，可以包含变量替换。

### resources
```cpp
TResources resources;
```
事件给予或获取的资源。正值表示给予玩家，负值表示从玩家获取。

### players
```cpp
std::set<PlayerColor> players;
```
受事件影响的玩家集合。如果为空，则影响所有玩家。

### humanAffected
```cpp
bool humanAffected;
```
事件是否影响人类玩家。

### computerAffected
```cpp
bool computerAffected;
```
事件是否影响电脑玩家。

### firstOccurrence
```cpp
ui32 firstOccurrence;
```
事件首次发生的日期（从游戏开始计算的天数）。

### nextOccurrence
```cpp
ui32 nextOccurrence;
```
事件下次发生的间隔天数。设置为0表示事件只发生一次。

### deletedObjectsInstances
```cpp
std::vector<ObjectInstanceID> deletedObjectsInstances;
```
事件触发时要删除的地图对象实例ID列表。

## 序列化方法

### serialize
```cpp
template<typename Handler>
void serialize(Handler & h)
```
模板序列化方法，支持二进制序列化。

**序列化的成员：**
- `name`
- `message`
- `resources`
- `players`
- `humanAffected`
- `computerAffected`
- `firstOccurrence`
- `nextOccurrence`
- `deletedObjectsInstances`

### serializeJson
```cpp
virtual void serializeJson(JsonSerializeFormat & handler);
```
JSON格式序列化方法。虚函数，子类可以重写以提供自定义序列化。

## 事件类型

地图事件主要分为以下几类：

1. **一次性事件**: `nextOccurrence = 0`，只发生一次
2. **定期事件**: `nextOccurrence > 0`，按指定间隔重复发生
3. **玩家特定事件**: 通过 `players` 集合指定影响的玩家
4. **全局事件**: `players` 为空，影响所有玩家

## 使用场景

地图事件常用于：

- **剧情发展**: 随着游戏进度触发重要事件
- **资源管理**: 定期给予玩家资源或征收税款
- **动态世界**: 删除/创建地图对象改变游戏世界
- **玩家互动**: 显示重要消息或触发特殊效果

## 配置示例

```json
{
  "name": "Monthly Tax",
  "message": "You have received your monthly tax payment of {1} gold!",
  "resources": {
    "gold": 1000
  },
  "players": [],
  "humanAffected": true,
  "computerAffected": true,
  "firstOccurrence": 30,
  "nextOccurrence": 30,
  "deletedObjectsInstances": []
}
```

## 继承关系

`CMapEvent` 是其他地图事件类的基类：

- `CCastleEvent`: 城堡事件（继承自 `CMapEvent`）
- 其他特定类型的事件类

## 相关类

- `PlayerColor`: 玩家颜色类型
- `TResources`: 资源集合类型
- `MetaString`: 元字符串类
- `JsonSerializeFormat`: JSON序列化处理器
- `ObjectInstanceID`: 对象实例ID类型