# 文件系统模块 (filesystem)

filesystem模块负责管理游戏资源文件的加载、访问和处理，包括各种类型的文件（图片、音频、动画、存档等）。

## 主要类和结构体

### ResourcePath
资源路径类，用于唯一标识游戏中的资源。

- 功能：封装资源路径和类型，确保资源的唯一性标识
- 依赖：[JsonNode](../json/JsonNode.md), [JsonSerializeFormat](../json/JsonSerializeFormat.md)
- 函数注释：
  - [ResourcePath(fullName)](#): 构造函数，根据完整名称构造资源路径
  - [ResourcePath(name, type)](#): 构造函数，根据名称和类型构造资源路径
  - [operator==()](#): 比较两个资源路径是否相等
  - [operator!=()](#): 比较两个资源路径是否不等
  - [operator<()](#): 比较两个资源路径的顺序
  - [empty()](#): 检查资源路径是否为空
  - [getName()](#): 获取资源名称
  - [getOriginalName()](#): 获取原始名称（保留大小写）
  - [getType()](#): 获取资源类型
  - [serializeJson()](#): 序列化为JSON格式

### ResourcePathTempl
资源路径模板类，为特定类型的资源提供强类型支持。

- 功能：提供类型安全的资源路径，避免不同类型资源的混淆
- 依赖：[ResourcePath](#resourcepath)
- 函数注释：
  - [fromResource()](#): 从普通资源路径创建类型化资源路径
  - [builtin()](#): 创建内置资源路径
  - [builtinTODO()](#): 创建待处理的内置资源路径
  - [fromJson()](#): 从JSON节点创建资源路径
  - [toType()](#): 转换到另一种资源类型
  - [addPrefix()](#): 添加路径前缀

### EResType
枚举类，定义了支持的资源类型。

- 功能：分类各种游戏资源类型，如文本、JSON、动画、音频、视频等
- 常量值：
  - TEXT: 文本文件(.txt)
  - JSON: JSON文件(.json)
  - ANIMATION: 动画文件(.def)
  - MASK: 遮罩文件(.msk/.msg)
  - IMAGE: 图像文件(.bmp/.jpg/.pcx/.png/.tga)
  - SOUND: 音频文件(.wav/.82m)
  - VIDEO: 视频文件(.smk/.bik/.ogv/.webm)
  - MAP: 地图文件(.h3m)
  - CAMPAIGN: 战役文件(.h3c)
  - ARCHIVE_*: 各种存档格式(.lod/.snd/.vid/.pac/.zip)
  - SAVEGAME: 存档文件(.v*gm1)

### EResTypeHelper
资源类型辅助类，提供资源类型转换功能。

- 功能：提供资源类型与文件扩展名之间的相互转换
- 函数注释：
  - [getTypeFromExtension()](#): 根据文件扩展名获取资源类型
  - [getEResTypeAsString()](#): 将资源类型转换为字符串表示

## 预定义别名类型

### AnimationPath
动画资源路径，专门用于.def动画文件。

### ImagePath
图像资源路径，专门用于图像文件。

### TextPath
文本资源路径，专门用于文本文件。

### JsonPath
JSON资源路径，专门用于JSON文件。

### VideoPath
视频资源路径，专门用于视频文件。

### AudioPath
音频资源路径，专门用于音频文件。

## 依赖关系

filesystem模块依赖以下组件：
- [json](../json/index.md): 用于JSON序列化
- [serializer](../serializer/index.md): 用于数据序列化

## 类依赖排序

1. [constants](../constants/index.md) - 游戏常量
2. [serializer](../serializer/index.md) - 数据序列化
3. [json](../json/index.md) - JSON处理
4. filesystem/ - 文件系统模块