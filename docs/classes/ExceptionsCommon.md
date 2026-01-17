<!-- 来源: E:\develop\heroes\vcmi\lib\ExceptionsCommon.h -->
# ExceptionsCommon头文件

ExceptionsCommon头文件定义了VCMI中数据加载相关的异常类。

## DataLoadingException类

### 类定义
```cpp
class DLL_LINKAGE DataLoadingException: public std::runtime_error
```

### 继承关系
继承自`std::runtime_error`，用于数据加载过程中的异常。

### 构造函数
```cpp
using std::runtime_error::runtime_error;
```
使用基类的构造函数。

## ModLoadingException类

### 类定义
```cpp
class DLL_LINKAGE ModLoadingException: public DataLoadingException
```

### 构造函数
```cpp
ModLoadingException(const std::string & modName, const std::string & reason)
```
构造模组加载异常。

**参数:**
- `modName`: 模组名称
- `reason`: 错误原因

**功能:**
- 生成格式化的错误消息："Mod [modName] is corrupted! Please disable or reinstall this mod. Reason: [reason]"

## 设计特点

- 提供专门的数据加载异常类型
- 支持模组特定的错误信息
- 继承标准库异常，便于异常处理
- 提供用户友好的错误消息