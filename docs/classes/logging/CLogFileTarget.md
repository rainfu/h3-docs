# CLogFileTarget类

CLogFileTarget类是VCMI日志系统中的文件日志输出目标，将消息写入到文件。

## 类定义

```cpp
class DLL_LINKAGE CLogFileTarget : public ILogTarget
{
public:
    explicit CLogFileTarget(const boost::filesystem::path & filePath, bool append = true);
    ~CLogFileTarget();

    const CLogFormatter & getFormatter() const;
    void setFormatter(const CLogFormatter & formatter);
    void write(const LogRecord & record) override;

private:
    std::fstream file;
    CLogFormatter formatter;
    mutable std::mutex mx;
};
```

## 功能说明

CLogFileTarget是VCMI日志系统中的文件输出目标实现，它继承自ILogTarget接口，将日志消息输出到指定的文件。该类支持追加模式写入，并提供自定义格式化器的功能，使日志消息可以按特定格式写入文件。

## 依赖关系

- [ILogTarget](./ILogTarget.md): 日志目标接口
- [CLogFormatter](./CLogFormatter.md): 日志格式化器
- [LogRecord](./LogRecord.md): 日志记录结构
- Boost库: filesystem
- STL库: fstream, mutex

## 构造函数和析构函数

- `CLogFileTarget(filePath, append)`: 构造函数，使用指定的文件路径创建文件日志目标，append参数指定是否追加到文件末尾
- `~CLogFileTarget()`: 析构函数，清理资源

## 函数注释

- `getFormatter()`: 获取当前使用的格式化器
- `setFormatter(formatter)`: 设置格式化器
- `write(record)`: ILogTarget接口实现，将日志记录写入文件

## 成员变量

- `file`: 文件流对象，用于实际写入日志
- `formatter`: 格式化器，用于格式化日志消息
- `mx`: 互斥锁，确保线程安全的文件写入