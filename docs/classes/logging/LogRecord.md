# LogRecord结构

LogRecord结构是VCMI日志系统中日志记录的表示，封装了一条日志消息的所有相关信息。

## 类定义

```cpp
struct DLL_LINKAGE LogRecord
{
    LogRecord(const CLoggerDomain & domain, ELogLevel::ELogLevel level, const std::string & message);

    CLoggerDomain domain;
    ELogLevel::ELogLevel level;
    std::string message;
    boost::posix_time::ptime timeStamp;
    std::string threadId;
};
```

## 功能说明

LogRecord是VCMI日志系统中表示单条日志记录的结构体，包含了日志消息的所有必要信息。它封装了日志的域、级别、消息内容、时间戳和线程ID等信息，作为日志系统中传输和处理日志消息的基本单元。

## 依赖关系

- [CLoggerDomain](./CLoggerDomain.md): 日志域类
- [ELogLevel](./ELogLevel.md): 日志级别枚举
- Boost库: posix_time
- STL库: string

## 构造函数

- `LogRecord(domain, level, message)`: 使用指定的域、级别和消息构造日志记录

## 成员变量

- `domain`: 日志所属的域
- `level`: 日志的级别（如调试、信息、警告、错误等）
- `message`: 日志消息内容
- `timeStamp`: 日志记录的时间戳
- `threadId`: 记录日志的线程ID