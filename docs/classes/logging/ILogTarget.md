# ILogTarget接口

ILogTarget接口是VCMI日志系统中日志输出目标的基接口，定义了所有日志输出目标必须实现的方法。

## 类定义

```cpp
class DLL_LINKAGE ILogTarget : public boost::noncopyable
{
public:
    virtual ~ILogTarget() { };
    virtual void write(const LogRecord & record) = 0;
};
```

## 功能说明

ILogTarget是VCMI日志系统中所有日志输出目标的基接口。它定义了日志系统与不同输出目标（如控制台、文件等）之间的契约，使得日志消息可以被写入到不同的目标。所有具体的日志输出实现都必须继承此接口并实现write方法。

## 依赖关系

- [LogRecord](./LogRecord.md): 日志记录结构
- Boost库: noncopyable

## 函数注释

- `~ILogTarget()`: 虚析构函数，确保派生类正确销毁
- `write(record)`: 纯虚函数，将日志记录写入目标，必须由派生类实现