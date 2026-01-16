# JsonNode::JsonType枚举

JsonNode::JsonType枚举是VCMI中JSON节点类型的定义，用于标识JSON节点存储的数据类型。

## 类定义

```cpp
enum class JsonNode::JsonType
{
    DATA_NULL,
    DATA_BOOL,
    DATA_FLOAT,
    DATA_STRING,
    DATA_VECTOR,
    DATA_STRUCT,
    DATA_INTEGER
};
```

## 功能说明

JsonNode::JsonType是VCMI JSON系统中用于标识JSON节点数据类型的枚举。它用于确定JsonNode实例中存储的数据类型，以便正确地进行数据访问和类型转换。这个枚举对于JSON数据的解析、验证和操作至关重要。

## 枚举值

- `DATA_NULL`: 空值类型，表示null值
- `DATA_BOOL`: 布尔类型，表示true或false值
- `DATA_FLOAT`: 浮点类型，表示浮点数值
- `DATA_STRING`: 字符串类型，表示文本数据
- `DATA_VECTOR`: 向量类型，表示数组或列表数据
- `DATA_STRUCT`: 结构类型，表示对象或映射数据
- `DATA_INTEGER`: 整数类型，表示整数值