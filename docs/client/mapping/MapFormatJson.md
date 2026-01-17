# MapFormatJson

## 概述

`MapFormatJson` 是 VCMI 的 JSON 地图格式处理系统。该文件定义了完整的 JSON 地图格式支持，包括加载、保存和补丁功能。JSON 格式是 VCMI 的原生地图格式，提供了人类可读的地图存储方式。

## 类层次结构

```
CMapFormatJson (基础类)
├── CMapPatcher (地图补丁器)
├── CMapLoaderJson (地图加载器)
└── CMapSaverJson (地图保存器)
```

## CMapFormatJson 基类

### 概述
JSON地图格式的基础处理类，包含通用的序列化功能。

### 版本常量

#### VERSION_MAJOR/VERSION_MINOR
```cpp
static const int VERSION_MAJOR;
static const int VERSION_MINOR;
```
JSON格式的主版本号和次版本号。

#### 文件名常量
```cpp
static const std::string HEADER_FILE_NAME;     // "header.json"
static const std::string OBJECTS_FILE_NAME;    // "objects.json"
static const std::string TERRAIN_FILE_NAMES[2]; // ["terrain_0.json", "terrain_1.json"]
```
ZIP存档中各个文件的名称。

### 成员变量

#### fileVersionMajor/fileVersionMinor
```cpp
int fileVersionMajor;
int fileVersionMinor;
```
当前文件的版本号。

#### map/mapHeader
```cpp
CMap * map;
CMapHeader * mapHeader;
```
指向地图对象和地图头信息的指针。

### 静态工具方法

#### getTerrainByCode
```cpp
static TerrainId getTerrainByCode(const std::string & code);
```
根据字符串代码获取地形ID。

#### getRiverByCode
```cpp
static RiverId getRiverByCode(const std::string & code);
```
根据字符串代码获取河流ID。

#### getRoadByCode
```cpp
static RoadId getRoadByCode(const std::string & code);
```
根据字符串代码获取道路ID。

### 序列化方法

#### serializeHeader
```cpp
void serializeHeader(JsonSerializeFormat & handler);
```
序列化地图头信息的公共部分。

#### serializePlayerInfo
```cpp
void serializePlayerInfo(JsonSerializeFormat & handler);
```
序列化玩家信息。

#### serializeAllowedFactions
```cpp
void serializeAllowedFactions(JsonSerializeFormat & handler, std::set<FactionID> & value) const;
```
序列化允许的派系列表。

#### serializeOptions
```cpp
void serializeOptions(JsonSerializeFormat & handler);
```
序列化地图选项。

### 读取方法

#### readTeams
```cpp
void readTeams(JsonDeserializer & handler);
```
读取队伍设置。

#### readTriggeredEvents
```cpp
void readTriggeredEvents(JsonDeserializer & handler);
```
读取触发事件（包括胜利/失败条件）。

#### readTriggeredEvent
```cpp
void readTriggeredEvent(TriggeredEvent & event, const JsonNode & source) const;
```
读取单个触发事件。

#### readOptions
```cpp
void readOptions(JsonDeserializer & handler);
```
读取地图选项。

### 写入方法

#### writeTeams
```cpp
void writeTeams(JsonSerializer & handler);
```
写入队伍设置。

#### writeTriggeredEvents
```cpp
void writeTriggeredEvents(JsonSerializer & handler);
```
写入触发事件。

#### writeTriggeredEvent
```cpp
void writeTriggeredEvent(const TriggeredEvent & event, JsonNode & dest) const;
```
写入单个触发事件。

## CMapPatcher 类

### 概述
地图补丁器，用于使用JSON数据修改地图头信息。

### 构造函数
```cpp
CMapPatcher(const JsonNode & stream);
```

### 主要方法

#### patchMapHeader
```cpp
void patchMapHeader(std::unique_ptr<CMapHeader> & header) override;
```
使用JSON数据修改地图头信息。

#### readPatchData
```cpp
void readPatchData();
```
读取可以被补丁替换的头信息子集。

## CMapLoaderJson 类

### 概述
JSON格式地图加载器。

### 构造函数
```cpp
CMapLoaderJson(CInputStream * stream);
```

### 主要方法

#### loadMap
```cpp
std::unique_ptr<CMap> loadMap(IGameInfoCallback * cb) override;
```
加载完整的JSON地图。

#### loadMapHeader
```cpp
std::unique_ptr<CMapHeader> loadMapHeader() override;
```
加载地图头信息。

### 辅助方法

#### readHeader
```cpp
void readHeader(const bool complete);
```
读取地图头信息。

#### readMap
```cpp
void readMap();
```
读取完整地图。

#### readTerrain
```cpp
void readTerrain();
```
读取地形数据。

#### readObjects
```cpp
void readObjects();
```
读取地图对象。

#### readTranslations
```cpp
void readTranslations();
```
读取文本和翻译。

### MapObjectLoader 内部结构体

#### 概述
地图对象加载器，用于加载单个地图对象。

#### 构造函数
```cpp
MapObjectLoader(CMapLoaderJson * _owner, JsonMap::value_type & json);
MapObjectLoader(CMapLoaderJson * _owner, JsonVector::value_type & json);
```

#### 方法
```cpp
void construct();  // 构造对象（不含配置）
void configure();  // 配置对象
```

## CMapSaverJson 类

### 概述
JSON格式地图保存器。

### 构造函数
```cpp
CMapSaverJson(CInputOutputStream * stream);
```

### 主要方法

#### saveMap
```cpp
void saveMap(const std::unique_ptr<CMap> & map) override;
```
保存地图到JSON格式。

### 辅助方法

#### addToArchive
```cpp
void addToArchive(const JsonNode & data, const std::string & filename);
```
将数据作为JSON文件添加到ZIP存档。

#### writeHeader
```cpp
void writeHeader();
```
将头信息写入ZIP存档。

#### writeTerrain
```cpp
void writeTerrain();
```
将地形数据写入ZIP存档。

#### writeObjects
```cpp
void writeObjects();
```
将地图对象写入ZIP存档。

#### writeTranslations
```cpp
void writeTranslations();
```
将文本和翻译写入ZIP存档。

### 静态工具方法

#### writeTerrainTile
```cpp
static std::string writeTerrainTile(const TerrainTile & tile);
```
将地形块编码为字符串。

#### writeTerrainLevel
```cpp
JsonNode writeTerrainLevel(const int index);
```
将地图层写入JSON。

## 工作流程

### 地图加载流程：
1. **创建加载器**: 使用输入流初始化 `CMapLoaderJson`
2. **读取头信息**: 解析 `header.json` 获取基本信息
3. **读取地形**: 从 `terrain_*.json` 加载地形数据
4. **读取对象**: 从 `objects.json` 加载地图对象
5. **读取翻译**: 加载本地化文本
6. **组装地图**: 将所有组件组装成完整地图

### 地图保存流程：
1. **创建保存器**: 使用输出流初始化 `CMapSaverJson`
2. **写入头信息**: 将地图头信息序列化为 `header.json`
3. **写入地形**: 将地形数据序列化为 `terrain_*.json`
4. **写入对象**: 将地图对象序列化为 `objects.json`
5. **写入翻译**: 保存本地化文本
6. **打包存档**: 将所有文件打包到ZIP存档中

## 文件格式

JSON地图格式使用ZIP存档存储，包含以下文件：

- `header.json`: 地图头信息、玩家设置、选项等
- `terrain_0.json`: 地面层地形数据
- `terrain_1.json`: 地下层地形数据（如果存在）
- `objects.json`: 所有地图对象及其配置
- `translations.json`: 本地化文本（可选）

## 优势

1. **人类可读**: JSON格式易于阅读和编辑
2. **版本控制友好**: 文本格式适合版本控制系统
3. **可扩展**: 易于添加新的地图特性
4. **跨平台**: 纯文本格式具有良好的跨平台兼容性
5. **调试友好**: 便于开发者调试地图内容

## 相关类

- `CMap`: 地图类
- `CMapHeader`: 地图头信息
- `JsonSerializer`: JSON序列化器
- `JsonDeserializer`: JSON反序列化器
- `CZipLoader`: ZIP加载器
- `CZipSaver`: ZIP保存器