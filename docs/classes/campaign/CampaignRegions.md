<!-- 来源: E:\develop\heroes\vcmi\lib\campaign\CampaignRegions.h -->
# CampaignRegions类

CampaignRegions类管理VCMI战役系统中的区域信息，包括区域位置、图像资源和状态显示。

## 类定义

```cpp
class DLL_LINKAGE CampaignRegions
```

## 概述

CampaignRegions负责处理战役地图中各个区域的视觉表示和位置信息，包括：

- 区域图像资源管理
- 区域位置坐标
- 不同状态下的图像显示（可用、选中、已征服）
- 背景图像管理

## 数据结构

### RegionDescription
描述单个区域的信息：

```cpp
struct RegionDescription
{
    std::string infix;           // 区域图像中缀
    Point pos;                   // 区域位置坐标
    std::optional<Point> labelPos; // 标签位置（可选）

    // 序列化支持
    template <typename Handler> void serialize(Handler &h)
    {
        h & infix;
        h & pos;
        h & labelPos;
    }
};
```

## 成员变量

### 图像资源配置
```cpp
std::string campPrefix;              // 战役图像共享前缀
std::vector<std::string> campSuffix; // 启用/选中/完成状态的后缀
std::string campBackground;          // 自定义背景名称
int colorSuffixLength = 0;           // 彩色图像位置查找方案
```

### 区域数据
```cpp
std::vector<RegionDescription> regions; // 所有区域的描述信息
```

## 构造函数

```cpp
CampaignRegions() = default;
explicit CampaignRegions(const JsonNode & node);
```

## 主要方法

### 图像资源获取

#### getBackgroundName()
```cpp
ImagePath getBackgroundName() const
```
获取战役背景图像名称。

#### getAvailableName()
```cpp
ImagePath getAvailableName(CampaignScenarioID which, int color) const
```
获取区域可用状态的图像名称。

**参数:**
- `which`: 场景ID
- `color`: 玩家颜色

#### getSelectedName()
```cpp
ImagePath getSelectedName(CampaignScenarioID which, int color) const
```
获取区域选中状态的图像名称。

#### getConqueredName()
```cpp
ImagePath getConqueredName(CampaignScenarioID which, int color) const
```
获取区域已征服状态的图像名称。

### 位置信息获取

#### getPosition()
```cpp
Point getPosition(CampaignScenarioID which) const
```
获取区域的位置坐标。

#### getLabelPosition()
```cpp
std::optional<Point> getLabelPosition(CampaignScenarioID which) const
```
获取区域标签的位置坐标（如果有的话）。

### 工具方法

#### regionsCount()
```cpp
int regionsCount() const
```
获取区域总数。

#### getNameFor()
```cpp
ImagePath getNameFor(CampaignScenarioID which, int color, const std::string & type) const
```
根据场景ID、颜色和类型生成图像名称。

## 序列化支持

支持二进制和JSON序列化：

```cpp
template <typename Handler> void serialize(Handler &h)
{
    h & campPrefix;
    h & colorSuffixLength;
    h & regions;
    h & campSuffix;
    h & campBackground;
}

JsonNode toJson() const;
```

## 图像命名规则

战役图像使用特定的命名规则：

- **前缀**: `campPrefix` + 区域中缀 + 颜色后缀 + 状态后缀
- **颜色后缀长度**: 由`colorSuffixLength`决定
- **状态后缀**: 对应`campSuffix`数组中的值

## 相关类

- `CampaignScenarioID`: 场景ID类型
- `Point`: 坐标点类型
- `ImagePath`: 图像路径类型

## 使用场景

CampaignRegions主要用于：

1. **战役地图显示**: 确定各个区域的视觉位置和图像
2. **状态管理**: 根据区域状态显示不同的图像
3. **用户交互**: 处理区域选择和悬停效果