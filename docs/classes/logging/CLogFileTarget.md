# CLogFileTarget类

CLogFileTarget类是VCMI日志系统中的文件日志输出目标，将消息写入日志文件。

## 类定义

```cpp
/// 此目标是写入消息到日志文件的日志目标。
/// 该目标可能在多个记录器之间共享。除了write之外的所有方法都不是线程安全的。
/// 文件目标旨在配置一次，然后添加到记录器。
class DLL_LINKAGE CLogFileTarget : public ILogTarget
{
public:
    /// 构造CLogFileTarget并打开filePath指定的文件。如果append参数为true，
    /// 文件将被追加。否则filePath指定的文件将被截断后再打开。
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

CLogFileTarget是VCMI日志系统中的文件输出目标实现，它继承自ILogTarget接口，将日志消息输出到指定的文件中。该类支持追加模式写入，可以配置是否在每次启动时清空文件或追加到现有文件末尾。

## 依赖关系

- [ILogTarget](./ILogTarget.md): 日志目标接口
- [CLogFormatter](./CLogFormatter.md): 日志格式化器
- [LogRecord](./LogRecord.md): 日志记录结构
- boost::filesystem::path: 文件系统路径
- STL库: fstream, mutex等

## 函数注释

- `CLogFileTarget(filePath, append)`: 构造函数，使用指定的文件路径创建文件日志目标，可以选择是否追加到现有文件
- `~CLogFileTarget()`: 析构函数，关闭日志文件
- `getFormatter()`: 获取格式化器
- `setFormatter(formatter)`: 设置格式化器
- `write(record)`: ILogTarget接口实现，写入日志记录到文件