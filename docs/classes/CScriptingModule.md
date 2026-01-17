<!-- 来源: E:\develop\heroes\vcmi\lib\CScriptingModule.h -->
# CScriptingModule头文件

CScriptingModule头文件定义了VCMI中脚本模块的接口类，仅在启用脚本功能时有效。

## ContextBase类

### 类定义
```cpp
class DLL_LINKAGE ContextBase : public Context
```

### 构造函数
- `ContextBase(vstd::CLoggerBase * logger_)`: 构造带日志器的上下文

### 析构函数
- `virtual ~ContextBase() = default`: 虚析构函数

### 保护成员
- `vstd::CLoggerBase * logger`: 日志器指针

## Module类

### 类定义
```cpp
class DLL_LINKAGE Module
```

### 构造函数和析构函数
- `Module() = default`: 默认构造函数
- `virtual ~Module() = default`: 虚析构函数

### 纯虚方法

#### compile
```cpp
virtual std::string compile(const std::string & name, const std::string & source, vstd::CLoggerBase * logger) const = 0
```
编译脚本源代码。

**参数:**
- `name`: 脚本名称
- `source`: 脚本源代码
- `logger`: 日志器

**返回值:**
- 编译后的脚本代码

#### createContextFor
```cpp
virtual std::shared_ptr<ContextBase> createContextFor(const Script * source, const Environment * env) const = 0
```
为脚本创建执行上下文。

**参数:**
- `source`: 脚本对象
- `env`: 执行环境

**返回值:**
- 上下文对象的智能指针

#### registerSpellEffect
```cpp
virtual void registerSpellEffect(spells::effects::Registry * registry, const Script * source) const = 0
```
注册法术效果。

**参数:**
- `registry`: 法术效果注册表
- `source`: 脚本对象

## 编译条件

- 仅在`SCRIPTING_ENABLED`定义时有效
- 需要包含`<vcmi/scripting/Service.h>`头文件

## 相关命名空间

- `scripting`: 脚本相关类
- `spells::effects`: 法术效果相关类