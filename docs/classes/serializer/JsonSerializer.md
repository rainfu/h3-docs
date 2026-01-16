# JsonSerializer类

JsonSerializer类是VCMI中JSON序列化器的具体实现，继承自JsonTreeSerializer。

## 类定义

```cpp
class DLL_LINKAGE JsonSerializer : public JsonTreeSerializer<JsonNode *>
{
public:
    JsonSerializer(const IInstanceResolver * instanceResolver_, JsonNode & root_);

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

    void pushStruct(const std::string & fieldName) override;
    void pushArray(const std::string & fieldName) override;
    void pushArrayElement(const size_t index) override;
    void resizeCurrent(const size_t newSize, JsonNode::JsonType type) override;
private:
    void writeLICPart(const std::string & fieldName, const std::string & partName, const TEncoder & encoder, const std::vector<bool> & data);
    void writeLICPart(const std::string & fieldName, const std::string & partName, const TEncoder & encoder, const std::set<si32> & data);
    void writeLICPartBuffer(const std::string & fieldName, const std::string & partName, std::vector<std::string> & buffer);
};
```

## 功能说明

JsonSerializer是VCMI序列化系统中处理JSON格式数据的具体实现类。它继承自JsonTreeSerializer，提供了对JSON节点树的序列化和反序列化功能。这个类负责将C++对象转换为JSON格式的数据，或将JSON数据转换回C++对象。

## 依赖关系

- [JsonTreeSerializer](./JsonTreeSerializer.md): JSON树序列化器基类
- [JsonNode](../json/JsonNode.md): JSON节点类型
- [IInstanceResolver](./IInstanceResolver.md): 实例解析器接口
- STL库: set, vector, map, string, optional
- Boost库: tribool

## 构造函数

- `JsonSerializer(instanceResolver_, root_)`: 使用实例解析器和根节点构造JSON序列化器

## 函数注释

### 公共方法
- `serializeLIC(fieldName, decoder, encoder, standard, value)`: 序列化LIC（Limited In Combat）数据
- `serializeLIC(fieldName, value)`: 重载版本，序列化LICSet类型
- `serializeString(fieldName, value)`: 序列化字符串
- `serializeRaw(fieldName, value, defaultValue)`: 序列化原始JSON节点

### 受保护方法
- `serializeInternal(fieldName, value)`: 序列化内部值（多种重载版本，处理不同数据类型）
- `pushStruct(fieldName)`: 推入结构体到序列化栈
- `pushArray(fieldName)`: 推入数组到序列化栈
- `pushArrayElement(index)`: 推入数组元素到序列化栈
- `resizeCurrent(newSize, type)`: 调整当前节点大小

### 私有方法
- `writeLICPart(fieldName, partName, encoder, data)`: 写入LIC部分数据（多种重载版本）
- `writeLICPartBuffer(fieldName, partName, buffer)`: 写入LIC部分数据到缓冲区