# scripting::Context接口

scripting::Context接口是VCMI中脚本执行上下文的抽象接口，定义了脚本执行所需的基本功能。

## 类定义

```cpp
class DLL_LINKAGE Context
{
public:
    virtual ~Context() = default;

    virtual void run(const JsonNode & initialState) = 0;
    virtual void run(ServerCallback * server, const JsonNode & initialState) = 0;

    virtual JsonNode callGlobal(const std::string & name, const JsonNode & parameters) = 0;
    virtual JsonNode callGlobal(ServerCallback * server, const std::string & name, const JsonNode & parameters) = 0;

    virtual void setGlobal(const std::string & name, int value) = 0;
    virtual void setGlobal(const std::string & name, const std::string & value) = 0;
    virtual void setGlobal(const std::string & name, double value) = 0;
    virtual void setGlobal(const std::string & name, const JsonNode & value) = 0;

    virtual void getGlobal(const std::string & name, int & value) = 0;
    virtual void getGlobal(const std::string & name, std::string & value) = 0;
    virtual void getGlobal(const std::string & name, double & value) = 0;
    virtual void getGlobal(const std::string & name, JsonNode & value) = 0;

    virtual JsonNode saveState() = 0;
};
```

## 功能说明

Context是VCMI脚本系统中的核心接口之一，为脚本执行提供必要的上下文环境。它允许脚本访问全局变量、调用全局函数，并管理脚本的执行状态。这个接口抽象了底层脚本引擎的具体实现，使系统可以支持不同的脚本语言。

## 依赖关系

- [JsonNode](../json/JsonNode.md): JSON节点类型
- [ServerCallback](../server/ServerCallback.md): 服务器回调接口
- [Environment](../environment/Environment.md): 环境接口

## 函数注释

- `~Context()`: 虚析构函数，确保派生类正确销毁
- `run(initialState)`: 使用初始状态运行脚本
- `run(server, initialState)`: 在指定服务器环境中使用初始状态运行脚本
- `callGlobal(name, parameters)`: 调用指定名称的全局函数，传入参数
- `callGlobal(server, name, parameters)`: 在指定服务器环境中调用指定名称的全局函数
- `setGlobal(name, value)`: 设置全局变量的值（重载多个版本支持不同类型）
- `getGlobal(name, value)`: 获取全局变量的值（重载多个版本支持不同类型）
- `saveState()`: 保存当前上下文的状态并返回状态数据

## 类型别名

- `BattleCb`: 战斗回调类型别名
- `GameCb`: 游戏回调类型别名

## 设计说明

Context接口采用了抽象工厂模式，允许创建不同的脚本执行上下文实例。它提供了完整的脚本执行环境，包括变量访问、函数调用和状态管理功能。通过将Context设为抽象接口，VCMI可以支持多种脚本引擎（如JavaScript、Lua等），同时保持上层代码的一致性。