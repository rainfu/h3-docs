# scripting::Script接口

scripting::Script接口是VCMI中脚本对象的抽象接口，定义了脚本的基本属性和操作。

## 类定义

```cpp
class DLL_LINKAGE Script
{
public:
    virtual ~Script() = default;

    virtual const std::string & getName() const = 0;
    virtual const std::string & getSource() const = 0;

    virtual std::shared_ptr<Context> createContext(const Environment * env) const = 0;
};
```

## 功能说明

Script是VCMI脚本系统中的核心接口之一，代表一个可执行的脚本对象。它封装了脚本的元数据（如名称和源代码）以及创建执行上下文的能力。这个接口抽象了底层脚本实现的细节，使系统可以统一处理不同来源的脚本。

## 依赖关系

- STL库: string, shared_ptr
- [Context](./Context.md): 脚本执行上下文
- [Environment](../environment/Environment.md): 环境接口

## 函数注释

- `~Script()`: 虚析构函数，确保派生类正确销毁
- `getName()`: 获取脚本的名称，返回对脚本名称的常量引用
- `getSource()`: 获取脚本的源代码，返回对脚本源代码的常量引用
- `createContext(env)`: 根据给定的环境创建一个新的脚本执行上下文

## 设计说明

Script接口采用了抽象工厂模式，将脚本定义与其执行上下文的创建分离。这种设计允许脚本对象本身保持轻量级，而执行上下文可以根据需要创建和销毁。通过将Script设为抽象接口，VCMI可以支持多种脚本来源（如文件、数据库、网络等），同时保持上层代码的一致性。

该接口还体现了单一职责原则，只关注脚本的基本属性和上下文创建功能，而不涉及具体的执行逻辑。