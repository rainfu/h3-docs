# JsonNode类

JsonNode类是VCMI中JSON数据节点的表示类，用于处理JSON数据的解析、存储和操作。

## 类定义

```cpp
struct DLL_LINKAGE JsonParsingSettings
{
    enum class JsonFormatMode
    {
        JSON, // 严格实现的json格式
        JSONC, // 允许以'//'开头的注释的json格式
        JSON5 // 部分支持'json5'格式
    };

    JsonFormatMode mode = JsonFormatMode::JSON5;

    /// 最大嵌套深度
    uint32_t maxDepth = 30;

    /// 如果设置为true，解析器将在遇到任何错误时抛出异常
    bool strict = false;
};

class DLL_LINKAGE JsonNode
{
public:
    enum class JsonType
    {
        DATA_NULL,
        DATA_BOOL,
        DATA_FLOAT,
        DATA_STRING,
        DATA_VECTOR,
        DATA_STRUCT,
        DATA_INTEGER
    };

private:
    using JsonData = std::variant<std::monostate, bool, double, std::string, JsonVector, JsonMap, int64_t>;

    JsonData data;

    /// 此字段的模组来源
    std::string modScope;

    bool overrideFlag = false;

public:
    JsonNode() = default;

    /// 创建具有指定值的单个节点
    explicit JsonNode(bool boolean);
    explicit JsonNode(int32_t number);
    explicit JsonNode(uint32_t number);
    explicit JsonNode(int64_t number);
    explicit JsonNode(double number);
    explicit JsonNode(const char * string);
    explicit JsonNode(const std::string & string);

    /// 从映射创建树
    explicit JsonNode(const JsonMap & map);

    /// 从Json格式输入创建树
    explicit JsonNode(const std::byte * data, size_t datasize, const std::string & fileName);
    explicit JsonNode(const std::byte * data, size_t datasize, const JsonParsingSettings & parserSettings, const std::string & fileName);

    explicit JsonNode(const char * data, size_t datasize, const std::string & fileName);
    explicit JsonNode(const char * data, size_t datasize, const JsonParsingSettings & parserSettings, const std::string & fileName);

    /// 从JSON文件创建树
    explicit JsonNode(const JsonPath & fileURI);
    explicit JsonNode(const JsonPath & fileURI, const JsonParsingSettings & parserSettings);
    explicit JsonNode(const JsonPath & fileURI, const std::string & modName);
    explicit JsonNode(const JsonPath & fileURI, const std::string & modName, bool & isValidSyntax);

    bool operator==(const JsonNode & other) const;
    bool operator!=(const JsonNode & other) const;

    const std::string & getModScope() const;
    void setModScope(const std::string & metadata, bool recursive = true);

    void setOverrideFlag(bool value);
    bool getOverrideFlag() const;

    /// 将节点转换为另一种类型，转换为nullptr将清除所有数据
    void setType(JsonType Type);
    JsonType getType() const;

    bool isNull() const;
    bool isBool() const;
    bool isNumber() const;
    bool isString() const;
    bool isVector() const;
    bool isStruct() const;
    /// true if node contains not-null data that cannot be extended via merging
    /// used for generating common base node from multiple nodes (e.g. bonuses)
    bool containsBaseData() const;
    bool isCompact() const;
    /// 删除节点中的所有数据并将类型设置为null
    void clear();

    /// 非const访问器，节点将在类型不匹配时更改类型
    bool & Bool();
    double & Float();
    si64 & Integer();
    std::string & String();
    JsonVector & Vector();
    JsonMap & Struct();

    /// const访问器，类型不匹配时会导致断言失败
    bool Bool() const;
    ///允许浮点数和整数
    double Float() const;
    ///仅允许整数
    si64 Integer() const;
    const std::string & String() const;
    const JsonVector & Vector() const;
    const JsonMap & Struct() const;

    /// 返回解析的"json指针"(格式为"/path/to/node"的字符串)
    const JsonNode & resolvePointer(const std::string & jsonPointer) const;
    JsonNode & resolvePointer(const std::string & jsonPointer);

    /// 将json树转换为指定类型，Json树必须具有与Type相同的类型
    /// 有效类型: bool, string, 任意数字类型, map 和 vector
    /// 示例: convertTo< std::map< std::vector<int> > >();
    template<typename Type>
    Type convertTo() const;

    //operator []，对于结构体 - 通过名称获取子节点
    JsonNode & operator[](const std::string & child);
    const JsonNode & operator[](const std::string & child) const;

    JsonNode & operator[](size_t child);
    const JsonNode & operator[](size_t child) const;

    std::string toCompactString() const;
    std::string toString() const;
    std::vector<std::byte> toBytes() const;

    template<typename Handler>
    void serialize(Handler & h)
    {
        h & modScope;
        h & overrideFlag;
        h & data;
    }
};
```

## 功能说明

JsonNode是VCMI中JSON数据处理的核心类，它可以表示各种JSON数据类型（null、布尔值、数字、字符串、数组、对象）。该类支持JSON数据的解析、创建、修改和序列化，还提供了对JSON指针的解析支持，允许访问嵌套结构中的特定节点。

## 依赖关系

- [JsonPath](../filesystem/ResourcePath.md): JSON文件路径
- [JsonMap](./JsonMap.md): JSON映射类型
- [JsonVector](./JsonVector.md): JSON向量类型
- STL库: variant, string, vector, map, byte等
- [JsonParsingSettings](./JsonParsingSettings.md): JSON解析设置

## 函数注释

- `JsonNode()`: 默认构造函数，创建空节点
- `JsonNode(value)`: 从各种值类型创建节点的构造函数
- `JsonNode(map)`: 从映射创建JSON树
- `JsonNode(fileURI)`: 从JSON文件创建树
- `getType()`: 获取节点类型
- `setType(type)`: 设置节点类型
- `isNull(), isBool(), isNumber(), isString(), isVector(), isStruct()`: 检查节点类型
- `Bool(), Float(), Integer(), String(), Vector(), Struct()`: 获取节点值的访问器
- `operator[](key)`: 通过键访问子节点
- `resolvePointer(jsonPointer)`: 解析JSON指针
- `convertTo()`: 将节点转换为指定类型
- `toString(), toCompactString()`: 将节点转换为字符串表示
- `clear()`: 清除节点数据
- `getModScope(), setModScope()`: 获取/设置模组来源
- `setOverrideFlag(), getOverrideFlag()`: 设置/获取覆盖标志