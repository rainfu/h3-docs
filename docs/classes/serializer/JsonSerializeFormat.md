# JsonSerializeFormat类

JsonSerializeFormat类是VCMI中JSON序列化格式的抽象基类，提供了序列化和反序列化JSON数据的功能。

## 类定义

```cpp
class DLL_LINKAGE JsonSerializeFormat: public boost::noncopyable
{
public:
    ///user-provided callback to resolve string identifier
    ///returns resolved identifier or -1 on error
    using TDecoder = std::function<si32(const std::string &)>;

    ///user-provided callback to get string identifier
    ///may assume that object index is valid
    using TEncoder = std::function<std::string(si32)>;

    struct LICSet
    {
        LICSet(const std::set<si32> & Standard, TDecoder Decoder, TEncoder Encoder);

        const std::set<si32> & standard;
        const TDecoder decoder;
        const TEncoder encoder;
        std::set<si32> all;
        std::set<si32> any;
        std::set<si32> none;
    };

    const bool saving;
    const bool updating;

    JsonSerializeFormat() = delete;
    virtual ~JsonSerializeFormat() = default;

    virtual const JsonNode & getCurrent() = 0;

    JsonStructSerializer enterStruct(const std::string & fieldName);
    JsonArraySerializer enterArray(const std::string & fieldName);

    ///Anything comparable <-> Json bool
    template <typename T>
    void serializeBool(const std::string & fieldName, T & value, const T trueValue, const T falseValue, const T defaultValue);

    ///bool <-> Json bool
    void serializeBool(const std::string & fieldName, bool & value);
    void serializeBool(const std::string & fieldName, bool & value, const bool defaultValue);

    ///tribool <-> Json bool
    void serializeBool(const std::string & fieldName, boost::logic::tribool & value);

    /** @brief Restrictive ("anyOf") simple serialization of Logical identifier condition, simple deserialization (allOf=anyOf)
     *
     * @param fieldName
     * @param decoder resolve callback, should report errors itself and do not throw
     * @param encoder encode callback, should report errors itself and do not throw
     * @param value target value, must be resized properly
     *
     */
    virtual void serializeLIC(const std::string & fieldName, const TDecoder & decoder, const TEncoder & encoder, const std::set<int32_t> & standard, std::set<int32_t> & value) = 0;

    template<typename T>
    void serializeLIC(const std::string & fieldName, const TDecoder & decoder, const TEncoder & encoder, const std::set<T> & standard, std::set<T> & value);

    /** @brief Complete serialization of Logical identifier condition.
     * Assumes that all values are allowed by default, and standard contains them
     */
    virtual void serializeLIC(const std::string & fieldName, LICSet & value) = 0;

    ///String <-> Json string
    virtual void serializeString(const std::string & fieldName, std::string & value) = 0;

    ///si32-convertible enum <-> Json string enum
    template <typename T>
    void serializeEnum(const std::string & fieldName, T & value, const std::vector<std::string> & enumMap);

    ///si32-convertible enum <-> Json string enum
    template <typename T, typename U>
    void serializeEnum(const std::string & fieldName, T & value, const U & defaultValue, const std::vector<std::string> & enumMap);

    template <typename T, typename U, typename C>
    void serializeEnum(const std::string & fieldName, T & value, const U & defaultValue, const C & enumMap);

    ///Anything double-convertible <-> Json double
    template <typename T>
    void serializeFloat(const std::string & fieldName, T & value);

    ///Anything double-convertible <-> Json double
    template <typename T, typename U>
    void serializeFloat(const std::string & fieldName, T & value, const U & defaultValue);

    ///Anything int64-convertible <-> Json integer
    ///no default value
    template <typename T>
    void serializeInt(const std::string & fieldName, T & value);

    ///Anything int64-convertible <-> Json integer
    ///custom default value
    template <typename T, typename U>
    void serializeInt(const std::string & fieldName, T & value, const U & defaultValue);

    ///Anything int64-convertible <-> Json integer
    ///default value is std::nullopt
    template<typename T>
    void serializeInt(const std::string & fieldName, std::optional<T> & value);

    ///si32-convertible identifier <-> Json string
    template <typename T, typename U>
    void serializeId(const std::string & fieldName, T & value, const U & defaultValue, const TDecoder & decoder, const TEncoder & encoder);

    ///si32-convertible identifier <-> Json string
    template <typename IdentifierType, typename IdentifierTypeBase = IdentifierType>
    void serializeId(const std::string & fieldName, IdentifierType & value, const IdentifierTypeBase & defaultValue = IdentifierType::NONE);

    /// si32-convertible identifier map <-> Json object of {key: string}
    template <typename Key, typename T, typename E = T>
    void serializeIdMap(const std::string & fieldName, std::map<Key, T> & value);

    ///si32-convertible identifier vector <-> Json array of string
    template <typename T, typename E = T>
    void serializeIdArray(const std::string & fieldName, std::vector<T> & value);

    ///si32-convertible identifier set <-> Json array of string
    template <typename T, typename U = T>
    void serializeIdArray(const std::string & fieldName, std::set<T> & value);

    ///si32-convertible instance identifier <-> Json string
    template <typename T>
    void serializeInstance(const std::string & fieldName, T & value, const T & defaultValue);

    ///any serializable object <-> Json struct
    template <typename T>
    void serializeStruct(const std::string & fieldName, T & value);

    virtual void serializeRaw(const std::string & fieldName, JsonNode & value, const std::optional<std::reference_wrapper<const JsonNode>> defaultValue) = 0;

protected:
    JsonSerializeFormat(const IInstanceResolver * instanceResolver_, const bool saving_, const bool updating_);

    ///bool <-> Json bool, indeterminate is default
    virtual void serializeInternal(const std::string & fieldName, boost::logic::tribool & value) = 0;

    ///Numeric Id <-> String Id
    virtual void serializeInternal(const std::string & fieldName, si32 & value, const std::optional<si32> & defaultValue, const TDecoder & decoder, const TEncoder & encoder) = 0;

    ///Numeric Id vector <-> String Id vector
    virtual void serializeInternal(const std::string & fieldName, std::vector<si32> & value, const TDecoder & decoder, const TEncoder & encoder) = 0;

    ///Numeric <-> Json double
    virtual void serializeInternal(const std::string & fieldName, double & value, const std::optional<double> & defaultValue) = 0;

    ///Numeric <-> Json integer
    virtual void serializeInternal(const std::string & fieldName, si64 & value, const std::optional<si64> & defaultValue) = 0;

    ///Enum/Numeric <-> Json string enum
    virtual void serializeInternal(const std::string & fieldName, si32 & value, const std::optional<si32> & defaultValue, const std::vector<std::string> & enumMap) = 0;

    ///String vector <-> Json string vector
    virtual void serializeInternal(const std::string & fieldName, std::vector<std::string> & value) = 0;

    ///String map <-> Json map of int
    virtual void serializeInternal(const std::string & fieldName, std::map<std::string, uint16_t> & value) = 0;

    virtual void pop() = 0;
    virtual void pushStruct(const std::string & fieldName) = 0;
    virtual void pushArray(const std::string & fieldName) = 0;
    virtual void pushArrayElement(const size_t index) = 0;
    virtual void pushField(const std::string & fieldName) = 0;

    virtual void resizeCurrent(const size_t newSize, JsonNode::JsonType type){};

    virtual void serializeInternal(std::string & value) = 0;
    virtual void serializeInternal(int64_t & value) = 0;

    void readLICPart(const JsonNode & part, const JsonSerializeFormat::TDecoder & decoder, std::set<si32> & value) const;

private:
    const IInstanceResolver * instanceResolver;

    template<typename VType, typename DVType, typename IType, typename... Args>
    void doSerializeInternal(const std::string & fieldName, VType & value, const std::optional<DVType> & defaultValue, Args... args);

    template<typename VType, typename IType, typename... Args>
    void dispatchOptional(const std::string & fieldName, std::optional<VType> & value, Args... args);

    friend class JsonSerializeHelper;
    friend class JsonStructSerializer;
    friend class JsonArraySerializer;
};
```

## 功能说明

JsonSerializeFormat是VCMI序列化系统中处理JSON格式数据的核心抽象基类。它提供了序列化和反序列化JSON数据的各种功能，支持基本数据类型、枚举、标识符、集合等类型的序列化操作。这个类是所有JSON序列化器的基类，定义了标准的序列化接口。

## 依赖关系

- [JsonNode](../json/JsonNode.md): JSON节点类型
- [IInstanceResolver](./IInstanceResolver.md): 实例解析器接口
- [IdentifierBase](../identifiers/IdentifierBase.md): 标识符基类
- STL库: function, string, vector, map, set, optional
- Boost库: tribool, noncopyable

## 类型别名

- `TDecoder`: 解码回调函数类型，将字符串标识符转换为数字ID
- `TEncoder`: 编码回调函数类型，将数字ID转换为字符串标识符

## 结构体

- `LICSet`: 逻辑标识符条件集合结构，用于处理复杂的标识符条件

## 成员变量

- `saving`: 布尔值，指示当前是否处于保存模式
- `updating`: 布尔值，指示当前是否处于更新模式
- `instanceResolver`: 实例解析器指针，用于处理标识符转换

## 函数注释

### 构造与析构
- `JsonSerializeFormat(instanceResolver_, saving_, updating_)`: 构造函数，接受实例解析器和模式标志
- `~JsonSerializeFormat()`: 虚析构函数

### 获取当前节点
- `getCurrent()`: 获取当前JSON节点的引用

### 进入结构体和数组
- `enterStruct(fieldName)`: 进入指定字段的结构体
- `enterArray(fieldName)`: 进入指定字段的数组

### 布尔值序列化
- `serializeBool(fieldName, value, trueValue, falseValue, defaultValue)`: 序列化可比较类型的布尔值
- `serializeBool(fieldName, value)`: 序列化布尔值
- `serializeBool(fieldName, value, defaultValue)`: 序列化带默认值的布尔值
- `serializeBool(fieldName, value)`: 序列化三值布尔值

### 逻辑标识符条件序列化
- `serializeLIC(fieldName, decoder, encoder, standard, value)`: 序列化逻辑标识符条件
- `serializeLIC(fieldName, value)`: 序列化LICSet

### 字符串序列化
- `serializeString(fieldName, value)`: 序列化字符串

### 枚举序列化
- `serializeEnum(fieldName, value, enumMap)`: 序列化可转换为si32的枚举
- `serializeEnum(fieldName, value, defaultValue, enumMap)`: 序列化带默认值的枚举

### 数值序列化
- `serializeFloat(fieldName, value)`: 序列化可转换为double的数值
- `serializeInt(fieldName, value)`: 序列化可转换为int64的数值

### 标识符序列化
- `serializeId(fieldName, value, defaultValue, decoder, encoder)`: 序列化si32可转换标识符
- `serializeId(fieldName, value, defaultValue)`: 序列化标识符
- `serializeIdMap(fieldName, value)`: 序列化标识符映射
- `serializeIdArray(fieldName, value)`: 序列化标识符数组或集合

### 对象序列化
- `serializeStruct(fieldName, value)`: 序列化可序列化对象
- `serializeRaw(fieldName, value, defaultValue)`: 序列化原始JSON节点

### 内部方法
- `serializeInternal(fieldName, value)`: 内部序列化方法（多个重载）
- `pop()`: 弹出当前节点
- `pushStruct(fieldName)`: 推入结构体
- `pushArray(fieldName)`: 推入数组
- `pushArrayElement(index)`: 推入数组元素
- `pushField(fieldName)`: 推入字段
- `resizeCurrent(newSize, type)`: 调整当前节点大小