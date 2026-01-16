# JsonDeserializer类

JsonDeserializer类是VCMI中JSON反序列化器的具体实现，继承自JsonTreeSerializer。

## 类定义

```cpp
class DLL_LINKAGE JsonDeserializer: public JsonTreeSerializer<const JsonNode *>
{
public:
    JsonDeserializer(const IInstanceResolver * instanceResolver_, const JsonNode & root_);

    void serializeLIC(const std::string & fieldName, const TDecoder & decoder, const TEncoder & encoder, const std::set<int32_t> & standard, std::set<int32_t> & value) override;
    void serializeLIC(const std::string & fieldName, LICSet & value) override;
    void serializeString(const std::string & fieldName, std::string & value) override;

    void serializeRaw(const std::string & fieldName, JsonNode & value, const std::optional<std::reference_wrapper<const JsonNode>> defaultValue) override;

protected:
    void serializeInternal(const std::string & fieldName, boost::logic::tribool & value) override;
    void serializeInternal(const std::string & fieldName, si32 & value, const std::optional<si32> & defaultValue, const TDecoder & decoder, const TEncoder & encoder) override;
    void serializeInternal(const std::string & fieldName, std::vector<si32> & value, const TDecoder & decoder, const TEncoder & encoder) override;
    void serializeInternal(const std::string & fieldName, double & value, const std::optional<double> & defaultValue) override;
    void serializeInternal(const std::string & fieldName, si64 & value, const std::optional<si64> & defaultValue) override;
    void serializeInternal(const std::string & fieldName, si32 & value, const std::optional<si32> & defaultValue, const std::vector<std::string> & enumMap) override;
    void serializeInternal(const std::string & fieldName, std::vector<std::string> & value) override;
    void serializeInternal(const std::string & fieldName, std::map<std::string, uint16_t> & value) override;

    void serializeInternal(std::string & value) override;
    void serializeInternal(int64_t & value) override;
};
```

## 功能说明

JsonDeserializer是VCMI序列化系统中处理JSON格式数据的反序列化实现类。它继承自JsonTreeSerializer，专门用于从JSON节点树中读取数据并填充C++对象。这个类负责将JSON格式的数据转换为C++对象，与JsonSerializer类的功能相反。

## 依赖关系

- [JsonTreeSerializer](./JsonTreeSerializer.md): JSON树序列化器基类
- [JsonNode](../json/JsonNode.md): JSON节点类型
- [IInstanceResolver](./IInstanceResolver.md): 实例解析器接口
- STL库: set, vector, map, string, optional
- Boost库: tribool

## 构造函数

- `JsonDeserializer(instanceResolver_, root_)`: 使用实例解析器和根节点构造JSON反序列化器

## 函数注释

### 公共方法
- `serializeLIC(fieldName, decoder, encoder, standard, value)`: 反序列化LIC（Limited In Combat）数据
- `serializeLIC(fieldName, value)`: 重载版本，反序列化LICSet类型
- `serializeString(fieldName, value)`: 反序列化字符串
- `serializeRaw(fieldName, value, defaultValue)`: 反序列化原始JSON节点

### 受保护方法
- `serializeInternal(fieldName, value)`: 反序列化内部值（多种重载版本，处理不同数据类型）