<!-- 来源: E:\develop\heroes\vcmi\lib\campaign\CampaignHandler.h -->
# CampaignHandler类

CampaignHandler类是VCMI战役系统的核心处理器，负责战役文件的读取、解析和写入操作。

## 类定义

```cpp
class DLL_LINKAGE CampaignHandler
```

## 概述

CampaignHandler是一个静态类，提供战役文件处理的所有功能，包括：

- 原始H3C战役文件的解析
- VCMI自定义VCMP战役文件的读写
- 本地化字符串处理
- 战役状态管理

## 主要功能

### 战役文件读取

#### getHeader()
```cpp
static std::unique_ptr<Campaign> getHeader(const std::string & name)
```
读取战役文件的头部信息。

**参数:**
- `name`: 战役文件名

**返回值:** 包含战役头部信息的Campaign对象

#### getCampaign()
```cpp
static std::shared_ptr<CampaignState> getCampaign(const std::string & name)
```
读取完整的战役状态。

**参数:**
- `name`: 战役文件名

**返回值:** 战役状态对象

### VCMP文件格式支持

VCMP是VCMI自定义的战役文件格式，使用JSON配置。

#### 读取函数
- `readHeaderFromJson()`: 从JSON读取战役头部
- `readScenarioFromJson()`: 从JSON读取场景信息
- `readScenarioTravelFromJson()`: 从JSON读取场景旅行信息

#### 写入函数
- `writeHeaderToJson()`: 将战役头部写入JSON
- `writeScenarioToJson()`: 将场景信息写入JSON
- `writeScenarioTravelToJson()`: 将场景旅行信息写入JSON

### H3C文件格式支持

支持原始Heroes III战役文件(.h3c)的解析。

#### 读取函数
- `readHeaderFromMemory()`: 从内存缓冲区读取头部
- `readScenarioFromMemory()`: 从内存缓冲区读取场景
- `readScenarioTravelFromMemory()`: 从内存缓冲区读取旅行信息

### 文件处理工具

#### getFile()
```cpp
static std::vector<std::vector<ui8>> getFile(std::unique_ptr<CInputStream> file, const std::string & filename, bool headerOnly)
```
将H3C文件分割为多个部分。

**参数:**
- `file`: 输入流
- `filename`: 文件名
- `headerOnly`: 是否只读取头部

**返回值:** 文件分割后的数据块向量

### 本地化支持

#### readLocalizedString()
提供两种重载，用于读取本地化字符串：

```cpp
static std::string readLocalizedString(CampaignHeader & target, CBinaryReader & reader, const std::string & filename, const std::string & modName, const std::string & encoding, const std::string & identifier);

static std::string readLocalizedString(CampaignHeader & target, const std::string & text, const std::string & filename, const std::string & modName, const std::string & identifier);
```

## 文件格式支持

### 支持的文件格式
1. **H3C**: 原始Heroes III战役文件
2. **VCMP**: VCMI自定义JSON格式战役文件

### VCMP文件结构
- `header.json`: 战役头部配置
- 地图文件: 各个场景的H3M地图文件

## 相关类

- `Campaign`: 战役数据结构
- `CampaignState`: 战役状态管理
- `CampaignHeader`: 战役头部信息
- `CampaignScenario`: 场景信息
- `CampaignTravel`: 场景间旅行信息

## 注意事项

- CampaignHandler是静态类，所有方法都是静态的
- 支持多种编码格式的本地化字符串处理
- VCMP格式提供了更好的可扩展性和维护性