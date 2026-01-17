# CMapInfo

## 概述

`CMapInfo` 类存储了 VCMI 地图的基本信息，包括玩家数量、文件路径、地图头信息、战役信息等。它是地图管理系统中的核心信息存储类。

## 类定义

```cpp
class DLL_LINKAGE CMapInfo : public Serializeable
```

## 继承关系

```
Serializeable
  └── CMapInfo
```

## 公共成员变量

### mapHeader
```cpp
std::unique_ptr<CMapHeader> mapHeader;
```
地图头信息。对于战役地图可能为 `nullptr`。

### campaign
```cpp
std::unique_ptr<Campaign> campaign;
```
战役信息。对于独立场景可能为 `nullptr`。

### scenarioOptionsOfSave
```cpp
std::unique_ptr<StartInfo> scenarioOptionsOfSave;
```
场景启动选项，仅用于保存的游戏。

### fileURI
```cpp
std::string fileURI;
```
地图文件的URI路径。

### originalFileURI
```cpp
std::string originalFileURI;
```
原始文件URI，不需要序列化。

### fullFileURI
```cpp
std::string fullFileURI;
```
完整文件URI，不需要序列化。

### lastWrite
```cpp
std::time_t lastWrite;
```
文件最后写入时间，不需要序列化。

### date
```cpp
std::string date;
```
地图创建或修改日期。

### amountOfPlayersOnMap
```cpp
int amountOfPlayersOnMap;
```
地图上的玩家总数。

### amountOfHumanControllablePlayers
```cpp
int amountOfHumanControllablePlayers;
```
人类可控制的玩家数量。

### amountOfHumanPlayersInSave
```cpp
int amountOfHumanPlayersInSave;
```
保存游戏中的人类玩家数量。

### isRandomMap
```cpp
bool isRandomMap;
```
是否为随机生成的地图。

## 构造函数和析构函数

```cpp
CMapInfo();
virtual ~CMapInfo();
```

**注意：** 禁用了复制构造函数和赋值运算符，只能移动构造和移动赋值。

## 初始化方法

### mapInit
```cpp
void mapInit(const std::string & fname);
```
使用指定的文件名初始化地图信息。

### saveInit
```cpp
void saveInit(const ResourcePath & file);
```
使用保存文件路径初始化地图信息。

### campaignInit
```cpp
void campaignInit();
```
初始化战役相关信息。

### countPlayers
```cpp
void countPlayers();
```
统计地图上的玩家数量。

## 信息获取方法

### getNameTranslated
```cpp
std::string getNameTranslated() const;
```
获取翻译后的地图名称。

### getNameForList
```cpp
std::string getNameForList() const;
```
获取用于列表显示的地图名称。

### getDescriptionTranslated
```cpp
std::string getDescriptionTranslated() const;
```
获取翻译后的地图描述。

### getMapSizeIconId
```cpp
int getMapSizeIconId() const;
```
获取地图尺寸对应的图标ID。

### getMapSizeFormatIconId
```cpp
int getMapSizeFormatIconId() const;
```
获取地图尺寸格式对应的图标ID。

### getMapSizeName
```cpp
std::string getMapSizeName() const;
```
获取地图尺寸的名称。

## 序列化方法

### serialize
```cpp
template <typename Handler> void serialize(Handler &h)
```
模板序列化方法，支持二进制序列化。

**序列化的成员：**
- `mapHeader`
- `campaign`
- `scenarioOptionsOfSave`
- `fileURI`
- `date`
- `amountOfPlayersOnMap`
- `amountOfHumanControllablePlayers`
- `amountOfHumanPlayersInSave`
- `isRandomMap`

## 使用场景

`CMapInfo` 用于：

1. **地图加载**: 存储从文件加载的地图基本信息
2. **游戏启动**: 提供场景选项和玩家信息
3. **地图列表**: 在地图选择界面显示地图信息
4. **保存游戏**: 存储游戏状态相关信息

## 数据流

1. **地图加载**: `mapInit()` → 解析文件 → 填充成员变量
2. **玩家统计**: `countPlayers()` → 计算各种玩家数量
3. **信息显示**: 通过各种getter方法获取翻译后的信息

## 相关类

- `CMapHeader`: 地图头信息
- `Campaign`: 战役类
- `StartInfo`: 启动信息
- `ResourcePath`: 资源路径
- `Serializeable`: 可序列化基类