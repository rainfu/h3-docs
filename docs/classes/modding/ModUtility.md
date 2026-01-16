# ModUtility类

ModUtility类是VCMI中模组实用工具的命名空间，提供了一系列用于处理模组标识符的辅助函数。

## 类定义

```cpp
namespace ModUtility
{
    DLL_LINKAGE std::string normalizeIdentifier(const std::string & scope, const std::string & remoteScope, const std::string & identifier);

    DLL_LINKAGE void parseIdentifier(const std::string & fullIdentifier, std::string & scope, std::string & type, std::string & identifier);

    DLL_LINKAGE std::string makeFullIdentifier(const std::string & scope, const std::string & type, const std::string & identifier);
};
```

## 功能说明

ModUtility是VCMI模组系统中的一个实用工具命名空间，提供了一系列静态函数，用于处理模组标识符。这些函数用于规范化、解析和生成模组标识符，确保在不同上下文中模组的唯一标识符能够正确处理。

## 依赖关系

- STL库: string等

## 函数注释

- `normalizeIdentifier(scope, remoteScope, identifier)`: 规范化标识符，根据远程作用域调整本地标识符，返回适当的完整标识符
- `parseIdentifier(fullIdentifier, scope, type, identifier)`: 解析完整标识符，将其分解为作用域、类型和标识符部分
- `makeFullIdentifier(scope, type, identifier)`: 使用作用域、类型和标识符创建完整标识符