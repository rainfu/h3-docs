# ILogTarget类

ILogTarget类是VCMI日志系统中的日志目标接口，定义了所有日志目标实现类应该实现的方法。

## 类定义

```cpp
/// 接口ILogTarget被所有日志目标实现类使用。它包含
/// 抽象方法write，子类应该实现该方法。
class DLL_LINKAGE ILogTarget : public boost::noncopyable
{
public:
    virtual ~ILogTarget() { };
    virtual void write(const LogRecord & record) = 0;
};
```

## 功能说明

ILogTarget是VCMI日志系统中的一个接口类，作为所有日志输出目标的基类。它定义了一个纯虚函数write，所有具体的日志输出实现类（如控制台输出、文件输出等）都需要实现这个接口。这使得日志系统可以灵活地支持多种不同的输出方式。

## 依赖关系

- [LogRecord](./LogRecord.md): 日志记录结构
- boost::noncopyable: 防拷贝基类

## 函数注释

- `virtual ~ILogTarget()`: 虚析构函数，确保派生类能够正确析构
- `write(record)`: 纯虚函数，写入日志记录到目标输出设备，所有派生类必须实现此方法