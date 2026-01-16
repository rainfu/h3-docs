# CLogFormatter类

CLogFormatter类是VCMI日志系统中的日志格式化器，用于格式化日志记录。

## 类定义

```cpp
/// 类CLogFormatter格式化日志记录。
///
/// 有几个可用于格式化日志记录的模式字符：
/// %d = 日期/时间
/// %l = 日志级别
/// %n = 记录器名称
/// %t = 线程ID
/// %m = 消息
class DLL_LINKAGE CLogFormatter
{
public:
    CLogFormatter();

    CLogFormatter(std::string pattern);

    void setPattern(const std::string & pattern);
    void setPattern(std::string && pattern);

    const std::string & getPattern() const;

    std::string format(const LogRecord & record) const;

private:
    std::string pattern;
};
```

## 功能说明

CLogFormatter是VCMI日志系统中的日志格式化器，用于按照指定的模式格式化日志记录。它支持多种模式字符，可以灵活地定制日志输出的格式，包括日期时间、日志级别、记录器名称、线程ID和消息等内容。

## 依赖关系

- [LogRecord](./LogRecord.md): 日志记录结构
- STL库: string等

## 函数注释

- `CLogFormatter()`: 默认构造函数，创建日志格式化器对象
- `CLogFormatter(pattern)`: 带参数的构造函数，使用指定模式创建日志格式化器
- `setPattern(pattern)`: 设置格式化模式
- `getPattern()`: 获取当前格式化模式
- `format(record)`: 按照当前模式格式化日志记录