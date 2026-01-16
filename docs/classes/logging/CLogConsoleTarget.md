# CLogConsoleTarget类

CLogConsoleTarget类是VCMI日志系统中的控制台日志输出目标，将消息写入控制台。

## 类定义

```cpp
/// 此目标是写入消息到控制台的日志目标。
/// 该目标可能在多个记录器之间共享。除了write之外的所有方法都不是线程安全的。
/// 控制台目标旨在配置一次，然后添加到记录器。
class DLL_LINKAGE CLogConsoleTarget : public ILogTarget
{
public:
    explicit CLogConsoleTarget(CConsoleHandler * console);

    bool isColoredOutputEnabled() const;
    void setColoredOutputEnabled(bool coloredOutputEnabled);

    ELogLevel::ELogLevel getThreshold() const;
    void setThreshold(ELogLevel::ELogLevel threshold);

    const CLogFormatter & getFormatter() const;
    void setFormatter(const CLogFormatter & formatter);

    const CColorMapping & getColorMapping() const;
    void setColorMapping(const CColorMapping & colorMapping);

    void write(const LogRecord & record) override;

private:
#if !defined(VCMI_MOBILE)
    CConsoleHandler * console;
#endif
    ELogLevel::ELogLevel threshold;
    bool coloredOutputEnabled;
    CLogFormatter formatter;
    CColorMapping colorMapping;
    mutable std::mutex mx;
};
```

## 功能说明

CLogConsoleTarget是VCMI日志系统中的控制台输出目标实现，它继承自ILogTarget接口，将日志消息输出到控制台。该类支持彩色输出、日志级别阈值设置和自定义格式化器等功能。

## 依赖关系

- [ILogTarget](./ILogTarget.md): 日志目标接口
- [CConsoleHandler](./CConsoleHandler.md): 控制台处理器
- [CLogFormatter](./CLogFormatter.md): 日志格式化器
- [CColorMapping](./CColorMapping.md): 颜色映射类
- [LogRecord](./LogRecord.md): 日志记录结构
- [ELogLevel](./ELogLevel.md): 日志级别枚举
- STL库: mutex等

## 函数注释

- `CLogConsoleTarget(console)`: 构造函数，使用指定的控制台处理器创建控制台日志目标
- `isColoredOutputEnabled()`: 检查是否启用彩色输出
- `setColoredOutputEnabled(coloredOutputEnabled)`: 设置是否启用彩色输出
- `getThreshold()`: 获取日志级别阈值
- `setThreshold(threshold)`: 设置日志级别阈值
- `getFormatter()`: 获取格式化器
- `setFormatter(formatter)`: 设置格式化器
- `getColorMapping()`: 获取颜色映射
- `setColorMapping(colorMapping)`: 设置颜色映射
- `write(record)`: ILogTarget接口实现，写入日志记录到控制台