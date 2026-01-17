# CMapService

## 概述

`CMapService` 是 VCMI 地图服务的核心类，负责地图文件的加载、保存和验证。该文件定义了完整的地图服务接口和实现，支持多种地图格式和数据源。

## 类层次结构

```
IMapService (接口)
  └── CMapService (实现)

辅助接口:
├── IMapLoader (地图加载器)
├── IMapSaver (地图保存器)
└── IMapPatcher (地图补丁器)
```

## IMapService 接口

### 概述
地图服务的基础接口，定义了地图加载和保存的核心功能。

### 纯虚方法

#### loadMap (文件路径)
```cpp
virtual std::unique_ptr<CMap> loadMap(const ResourcePath & name, IGameInfoCallback * cb) const = 0;
```
从文件路径加载完整地图。

**参数：**
- `name`: 地图资源路径
- `cb`: 游戏信息回调（可选）

**返回值：** 加载的地图对象的唯一指针

#### loadMapHeader (文件路径)
```cpp
virtual std::unique_ptr<CMapHeader> loadMapHeader(const ResourcePath & name) const = 0;
```
从文件路径加载地图头信息。

#### loadMap (缓冲区)
```cpp
virtual std::unique_ptr<CMap> loadMap(const uint8_t * buffer, int size, const std::string & name, const std::string & modName, const std::string & encoding, IGameInfoCallback * cb) const = 0;
```
从内存缓冲区加载地图。

**参数：**
- `buffer`: 地图数据缓冲区
- `size`: 缓冲区大小
- `name`: 地图名称
- `modName`: 模组名称
- `encoding`: 文本编码
- `cb`: 游戏信息回调

#### loadMapHeader (缓冲区)
```cpp
virtual std::unique_ptr<CMapHeader> loadMapHeader(const uint8_t * buffer, int size, const std::string & name, const std::string & modName, const std::string & encoding) const = 0;
```
从内存缓冲区加载地图头信息。

#### saveMap
```cpp
virtual void saveMap(const std::unique_ptr<CMap> & map, boost::filesystem::path fullPath) const = 0;
```
保存地图到指定路径。

## CMapService 实现类

### 概述
`IMapService` 的具体实现类。

### 静态方法

#### verifyMapHeaderMods
```cpp
static ModCompatibilityInfo verifyMapHeaderMods(const CMapHeader & map);
```
验证地图所需的模组是否已加载。

**返回值：** 模组兼容性信息，包含缺失或不兼容的模组

### 私有静态方法

#### getStreamFromFS
```cpp
static std::unique_ptr<CInputStream> getStreamFromFS(const ResourcePath & name);
```
从文件系统获取地图输入流。

#### getStreamFromMem
```cpp
static std::unique_ptr<CInputStream> getStreamFromMem(const uint8_t * buffer, int size);
```
从内存缓冲区获取地图输入流。

#### getMapLoader
```cpp
static std::unique_ptr<IMapLoader> getMapLoader(std::unique_ptr<CInputStream> & stream, std::string mapName, std::string modName, std::string encoding);
```
根据流数据创建合适的地图加载器。自动检测地图格式。

#### getMapPatcher
```cpp
static std::unique_ptr<IMapPatcher> getMapPatcher(std::string scenarioName);
```
为指定场景创建地图补丁器。

## IMapLoader 接口

### 概述
地图加载器的接口定义。

### 纯虚方法

#### loadMap
```cpp
virtual std::unique_ptr<CMap> loadMap(IGameInfoCallback * cb) = 0;
```
加载完整地图。

#### loadMapHeader
```cpp
virtual std::unique_ptr<CMapHeader> loadMapHeader() = 0;
```
加载地图头信息。

## IMapPatcher 接口

### 概述
地图补丁器的接口，用于修改地图头信息。

### 纯虚方法

#### patchMapHeader
```cpp
virtual void patchMapHeader(std::unique_ptr<CMapHeader> & header) = 0;
```
使用JSON数据修改地图头信息。

## IMapSaver 接口

### 概述
地图保存器的接口定义。

### 纯虚方法

#### saveMap
```cpp
virtual void saveMap(const std::unique_ptr<CMap> & map) = 0;
```
保存地图到文件。

## 支持的地图格式

CMapService 支持多种地图格式：

1. **VCMI原生格式**: 优化的二进制格式
2. **Heroes 3格式**: 兼容H3地图文件
3. **JSON格式**: 人类可读的文本格式
4. **内存缓冲区**: 支持从内存直接加载

## 工作流程

### 地图加载流程：
1. **获取流**: `getStreamFromFS()` 或 `getStreamFromMem()`
2. **创建加载器**: `getMapLoader()` 自动检测格式
3. **加载数据**: `IMapLoader::loadMap()` 或 `loadMapHeader()`
4. **应用补丁**: 如需要，使用 `IMapPatcher` 修改数据

### 地图保存流程：
1. **创建保存器**: 根据目标格式创建相应的 `IMapSaver`
2. **序列化数据**: `IMapSaver::saveMap()` 保存到文件

## 模组验证

```cpp
// 验证地图模组兼容性
ModCompatibilityInfo modInfo = CMapService::verifyMapHeaderMods(*mapHeader);
if (!modInfo.missingMods.empty()) {
    // 处理缺失的模组
}
```

## 使用示例

```cpp
// 从文件加载地图
CMapService mapService;
auto map = mapService.loadMap(ResourcePath("maps/myMap.vmap"), nullptr);

// 从缓冲区加载地图头
std::vector<uint8_t> buffer = loadFileData();
auto header = mapService.loadMapHeader(buffer.data(), buffer.size(), "myMap", "myMod", "UTF-8");

// 保存地图
mapService.saveMap(map, "output.vmap");
```

## 相关类

- `CMap`: 地图类
- `CMapHeader`: 地图头信息
- `ResourcePath`: 资源路径
- `ModCompatibilityInfo`: 模组兼容性信息
- `IGameInfoCallback`: 游戏信息回调接口