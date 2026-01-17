# MapFormatSettings

## 概述

`MapFormatSettings` 类是 VCMI 地图格式设置管理器。它负责管理不同地图格式的标识符映射、兼容性检查以及配置覆盖。支持多种地图格式（ROE、AB、SOD等）和战役版本的设置管理。

## 类定义

```cpp
class MapFormatSettings : boost::noncopyable
```

## 私有静态方法

### generateMapping
```cpp
static MapIdentifiersH3M generateMapping(EMapFormat format);
```
为指定地图格式生成标识符映射。

### generateMappings
```cpp
static std::map<EMapFormat, MapIdentifiersH3M> generateMappings();
```
生成所有支持地图格式的标识符映射。

### generateCampaignMapping
```cpp
static std::map<CampaignVersion, EMapFormat> generateCampaignMapping();
```
生成战役版本到地图格式的映射。

## 私有成员变量

### mapping
```cpp
std::map<EMapFormat, MapIdentifiersH3M> mapping;
```
存储每个地图格式对应的标识符映射。

### campaignToMap
```cpp
std::map<CampaignVersion, EMapFormat> campaignToMap;
```
战役版本到地图格式的映射关系。

### campaignOverridesConfig
```cpp
JsonNode campaignOverridesConfig;
```
战役覆盖配置，用于自定义特定战役的设置。

### mapOverridesConfig
```cpp
JsonNode mapOverridesConfig;
```
地图覆盖配置，用于自定义特定地图的设置。

## 公共方法

### 构造函数
```cpp
MapFormatSettings();
```
初始化设置管理器，加载所有映射和配置。

### 格式支持检查

#### isSupported (地图格式)
```cpp
bool isSupported(EMapFormat format) const;
```
检查指定的地图格式是否被支持。

**返回值：** 如果格式被支持返回 `true`

#### isSupported (战役版本)
```cpp
bool isSupported(CampaignVersion format) const;
```
检查指定的战役版本是否被支持。

**返回值：** 如果战役版本被支持返回 `true`

### 获取映射

#### getMapping (地图格式)
```cpp
const MapIdentifiersH3M & getMapping(EMapFormat format) const;
```
获取指定地图格式的标识符映射。

**返回值：** 对应的标识符映射对象

#### getMapping (战役版本)
```cpp
const MapIdentifiersH3M & getMapping(CampaignVersion format) const;
```
获取指定战役版本对应的标识符映射。

**返回值：** 对应的标识符映射对象

### 配置覆盖

#### campaignOverrides
```cpp
const JsonNode & campaignOverrides(const std::string & campaignName);
```
获取指定战役的覆盖配置。

**参数：**
- `campaignName`: 战役名称

**返回值：** 战役的JSON覆盖配置

#### mapOverrides
```cpp
const JsonNode & mapOverrides(const std::string & mapName);
```
获取指定地图的覆盖配置。

**参数：**
- `mapName`: 地图名称

**返回值：** 地图的JSON覆盖配置

## 工作原理

### 标识符映射
每个地图格式都有自己的标识符映射（`MapIdentifiersH3M`），用于：

1. **对象ID映射**: 将格式特定的对象ID转换为VCMI内部ID
2. **地形映射**: 处理不同版本的地形类型差异
3. **兼容性处理**: 解决版本间的对象和地形兼容性问题

### 配置覆盖系统
支持两种类型的配置覆盖：

1. **战役覆盖**: 为特定战役提供自定义设置
2. **地图覆盖**: 为特定地图提供自定义设置

覆盖配置通常用于：
- 修复特定地图的兼容性问题
- 提供自定义的游戏平衡
- 支持模组特定的设置

## 初始化流程

1. **生成映射**: 为所有支持的格式生成标识符映射
2. **建立关联**: 创建战役版本到地图格式的映射
3. **加载配置**: 从配置文件加载覆盖设置
4. **验证完整性**: 确保所有映射和配置都有效

## 使用示例

```cpp
// 创建设置管理器
MapFormatSettings settings;

// 检查格式支持
if (settings.isSupported(EMapFormat::SOD)) {
    // 获取SOD格式的映射
    const auto& mapping = settings.getMapping(EMapFormat::SOD);
    
    // 使用映射进行对象ID转换
    auto vcmiId = mapping.getObjectId(h3mId);
}

// 获取地图覆盖配置
const JsonNode& overrides = settings.mapOverrides("myMap");
if (!overrides.isNull()) {
    // 应用覆盖设置
    applyMapOverrides(overrides);
}
```

## 配置文件格式

### 战役覆盖配置
```json
{
  "campaignName": {
    "setting1": "value1",
    "setting2": "value2"
  }
}
```

### 地图覆盖配置
```json
{
  "mapName": {
    "compatibility": "fix",
    "balance": "custom"
  }
}
```

## 相关类

- `MapIdentifiersH3M`: 地图标识符映射
- `EMapFormat`: 地图格式枚举
- `CampaignVersion`: 战役版本枚举
- `JsonNode`: JSON节点类