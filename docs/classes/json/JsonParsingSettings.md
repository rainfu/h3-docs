# JsonParsingSettings结构

JsonParsingSettings结构是VCMI中JSON解析设置的配置结构，用于控制JSON解析器的行为和格式支持。

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
```

## 功能说明

JsonParsingSettings是VCMI中用于配置JSON解析器行为的结构体。它定义了JSON解析器支持的格式模式、最大嵌套深度限制以及错误处理策略。这个结构允许应用程序根据需要自定义JSON解析器的行为，以适应不同的JSON格式变体和解析需求。

## 嵌套枚举

- `JsonFormatMode`: JSON格式模式枚举，定义了支持的JSON格式变体

### JsonFormatMode枚举值

- `JSON`: 严格的JSON格式，符合官方JSON标准
- `JSONC`: 支持注释的JSON格式，允许以`//`开头的行注释
- `JSON5`: 部分支持JSON5格式，提供更宽松的语法支持

## 成员变量

- `mode`: JSON解析格式模式，默认为JSON5
- `maxDepth`: 最大嵌套深度，默认为30层，防止过度嵌套导致的性能问题
- `strict`: 严格模式开关，默认为false，如果为true则在遇到错误时抛出异常