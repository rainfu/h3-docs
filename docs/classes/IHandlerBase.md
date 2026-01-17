# IHandlerBase接口

IHandlerBase接口是VCMI中处理游戏数据加载的基接口，为各种游戏对象处理器提供统一的接口。

## 接口定义

```cpp
class IHandlerBase
{
public:
    virtual ~IHandlerBase() = default;

    /// 验证传入的数据是否有效
    virtual bool verifyObject(const std::string & scope, const std::string & identifier, const JsonNode & object) = 0;

    /// 将数据加载到处理器中
    virtual void loadObject(const std::string & scope, const std::string & identifier, const JsonNode & object) = 0;

    /// 加载后处理
    virtual void afterLoadFinalization() = 0;

    /// 获取对象的完整标识符
    virtual std::string getFullIdentifier(const std::string & scope, const std::string & identifier) const = 0;

    /// 解析标识符
    virtual std::pair<std::string, std::string> parseIdentifier(const std::string & fullIdentifier) const = 0;
};
```

## 功能说明

IHandlerBase是VCMI游戏对象处理器的基接口，为各种游戏对象（如神器、生物、英雄等）的处理器提供统一的操作接口。它定义了数据验证、加载和后期处理的标准方法，确保所有处理器都遵循一致的API。

## 依赖关系

- [JsonNode](../json/JsonNode.md): JSON节点
- STL库: string, pair等

## 函数注释

- `verifyObject(scope, identifier, object)`: 验证指定作用域和标识符的对象数据是否有效
- `loadObject(scope, identifier, object)`: 将指定对象的数据加载到处理器中
- `afterLoadFinalization()`: 在所有数据加载完成后执行最终处理
- `getFullIdentifier(scope, identifier)`: 获取对象的完整标识符（作用域+标识符）
- `parseIdentifier(fullIdentifier)`: 解析完整标识符，返回作用域和标识符对