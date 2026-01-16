# LogRecord类

LogRecord类是VCMI日志系统中的日志记录结构，包含日志消息和附加的日志信息。

## 类定义

```cpp
/// 结构LogRecord持有日志消息和附加的日志信息。
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

LogRecord是VCMI日志系统中的日志记录数据结构，用于存储一条完整的日志记录。它包含日志域、日志级别、消息内容、时间戳和线程ID等信息，是日志系统中传递和处理的基本单元。

## 依赖关系

- [CLoggerDomain](./CLoggerDomain.md): 日志域类
- [ELogLevel](./ELogLevel.md): 日志级别枚举
- boost::posix_time::ptime: POSIX时间类型
- STL库: string等

## 函数注释

- `LogRecord(domain, level, message)`: 构造函数，使用指定的域、级别和消息创建日志记录
- `domain`: 日志域信息
- `level`: 日志级别
- `message`: 日志消息内容
- `timeStamp`: 时间戳
- `threadId`: 线程ID