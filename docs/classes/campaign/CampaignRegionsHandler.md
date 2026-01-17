<!-- 来源: E:\develop\heroes\vcmi\lib\campaign\CampaignRegionsHandler.h -->
# CampaignRegionsHandler类

CampaignRegionsHandler类是VCMI战役系统中管理战役区域配置的处理器，继承自IHandlerBase。

## 类定义

```cpp
class DLL_LINKAGE CampaignRegionsHandler : public IHandlerBase
```

## 概述

CampaignRegionsHandler负责管理战役区域的配置数据，主要用于H3C格式的战役文件。VCMP格式的战役直接在地图文件中嵌入区域布局信息。

## 继承关系

```cpp
CampaignRegionsHandler : public IHandlerBase
```

## 主要功能

### 数据加载

#### loadLegacyData()
```cpp
std::vector<JsonNode> loadLegacyData() override
```
加载遗留数据格式。

**返回值:** JSON节点向量

#### loadObject()
提供两种重载，用于加载区域对象：

```cpp
void loadObject(std::string scope, std::string name, const JsonNode & data) override;
void loadObject(std::string scope, std::string name, const JsonNode & data, size_t index) override;
```

**参数:**
- `scope`: 对象命名空间（通常是源mod名称）
- `name`: 对象名称
- `data`: JSON配置数据
- `index`: 对象索引（第二种重载）

### 数据访问

#### getByIndex()
```cpp
const CampaignRegions * getByIndex(int index) const
```
通过索引获取战役区域对象。

**参数:**
- `index`: 对象索引

**返回值:** 指向CampaignRegions对象的常量指针

## 私有成员

```cpp
std::vector<std::shared_ptr<CampaignRegions>> objects;
```
存储所有加载的战役区域对象的向量。

## 使用限制

- **仅用于H3C战役**: 只处理.h3c格式的战役文件
- **VCMP不适用**: VCMP格式的战役直接在地图文件中定义区域布局

## 相关类

- `CampaignRegions`: 被管理的区域数据结构
- `IHandlerBase`: 基础处理器接口
- `JsonNode`: JSON数据节点

## 配置格式

战役区域配置通常通过JSON文件定义，包含：

- 区域位置信息
- 图像资源配置
- 状态显示设置

## 处理器模式

作为IHandlerBase的实现，CampaignRegionsHandler遵循标准的处理器模式：

1. **加载阶段**: 通过loadObject()加载配置
2. **访问阶段**: 通过getByIndex()访问数据
3. **管理阶段**: 自动管理对象的生命周期