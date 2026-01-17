<!-- 来源: E:\develop\heroes\vcmi\lib\CThreadHelper.h -->
# CThreadHelper头文件

CThreadHelper头文件定义了VCMI中线程管理的辅助函数和类。

## 全局函数

### setThreadName
```cpp
void DLL_LINKAGE setThreadName(const std::string &name)
```
设置线程名称，用于日志和调试器。

**参数:**
- `name`: 线程名称

**警告:**
- 在类Unix系统上不应该用于主线程，因为这也会改变进程名称

### setThreadNameLoggingOnly
```cpp
void DLL_LINKAGE setThreadNameLoggingOnly(const std::string &name)
```
仅设置用于日志的线程名称。

**参数:**
- `name`: 线程名称

### getThreadName
```cpp
std::string DLL_LINKAGE getThreadName()
```
获取人类可读的线程名称。

**返回值:**
- 如果之前设置了人类可读名称，则返回该名称
- 否则返回系统提供的线程ID的字符串形式

## ScopedThreadName类

### 类定义
```cpp
class DLL_LINKAGE ScopedThreadName : boost::noncopyable
```

### 构造函数
```cpp
ScopedThreadName(const std::string & name)
```
构造时设置线程名称。

**参数:**
- `name`: 线程名称

### 析构函数
```cpp
~ScopedThreadName()
```
析构时重置线程名称为空。

## 设计特点

- 提供作用域内的线程命名管理
- 支持日志和调试器的线程标识
- 自动资源管理（RAII模式）
- 跨平台线程名称设置