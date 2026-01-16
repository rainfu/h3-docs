# JSON系统 (json)

json模块负责处理JSON数据的解析、生成和操作，提供类型安全的JSON数据访问和转换功能。

## 主要类和结构体

### JsonParsingSettings
JSON解析设置结构体，配置JSON解析器的行为。

- 功能：定义JSON解析器的配置选项
- 依赖：无
- 函数注释：
  - [mode](#): 解析模式（JSON、JSONC、JSON5）
  - [maxDepth](#): 最大嵌套深度，默认30层
  - [strict](#): 是否严格模式，若为true则遇到错误时抛出异常

### JsonNode
JSON节点类，表示JSON树中的一个节点。

- 功能：提供类型安全的JSON数据操作，支持多种数据类型和嵌套结构
- 依赖：[ResourcePath](../filesystem/ResourcePath.md), [JsonPath](../filesystem/ResourcePath.md), [JsonMap](#jsonmap), [JsonVector](#jsonvector)
- 函数注释：
  - [JsonNode()](#): 默认构造函数，创建空节点
  - [JsonNode(value)](#): 使用特定值创建节点（bool、int、double、string等）
  - [JsonNode(map)](#): 从映射创建节点
  - [JsonNode(data, size, fileName)](#): 从字节数据创建JSON树
  - [JsonNode(fileURI)](#): 从JSON文件创建节点
  - [operator==()](#): 比较两个JSON节点是否相等
  - [getModScope()](#): 获取节点的模组来源
  - [setModScope()](#): 设置节点的模组来源
  - [setOverrideFlag()](#): 设置覆盖标志
  - [getOverrideFlag()](#): 获取覆盖标志
  - [setType()](#): 设置节点类型
  - [getType()](#): 获取节点类型
  - [isNull(), isBool(), isNumber(), isString(), isVector(), isStruct()](#): 检查节点类型
  - [containsBaseData()](#): 检查节点是否包含不可扩展的基础数据
  - [isCompact()](#): 检查节点是否紧凑
  - [clear()](#): 清除节点数据
  - [Bool(), Float(), Integer(), String(), Vector(), Struct()](#): 获取节点的特定类型值
  - [resolvePointer()](#): 解析JSON指针路径
  - [convertTo()](#): 将JSON节点转换为指定类型
  - [operator[]](#): 访问子节点
  - [toCompactString(), toString(), toBytes()](#): 转换为字符串或字节数组

### JsonType
枚举类，定义JSON节点的类型。

- 功能：标识JSON节点的具体数据类型
- 常量值：
  - DATA_NULL: 空值
  - DATA_BOOL: 布尔值
  - DATA_FLOAT: 浮点数
  - DATA_STRING: 字符串
  - DATA_VECTOR: 数组
  - DATA_STRUCT: 结构体（对象）
  - DATA_INTEGER: 整数

### JsonMap
JSON映射类型，定义为`std::map<std::string, JsonNode>`。

- 功能：表示JSON对象结构，键为字符串，值为JSON节点

### JsonVector
JSON数组类型，定义为`std::vector<JsonNode>`。

- 功能：表示JSON数组结构，元素为JSON节点

### JsonDetail命名空间
JSON转换细节命名空间，提供类型转换功能。

- 功能：提供JSON节点与C++类型之间的转换函数
- 函数注释：
  - [convert(bool&, JsonNode)](#): 将JSON节点转换为布尔值
  - [convert(numeric&, JsonNode)](#): 将JSON节点转换为数字类型
  - [convert(string&, JsonNode)](#): 将JSON节点转换为字符串
  - [convert(map&, JsonNode)](#): 将JSON节点转换为映射
  - [convert(vector&, JsonNode)](#): 将JSON节点转换为向量
  - [convert(set&, JsonNode)](#): 将JSON节点转换为集合

## 依赖关系

json模块依赖以下组件：
- [filesystem](../filesystem/index.md): 资源路径处理
- STL库: 标准容器、变体类型等

## 类依赖排序

1. [filesystem](../filesystem/index.md) - 文件系统
2. json/ - JSON系统