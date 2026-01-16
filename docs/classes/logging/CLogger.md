# CLogger类

CLogger类是VCMI中的日志系统实现，用于记录各种级别的日志消息到不同的目标。

## 类定义

```cpp
class DLL_LINKAGE CLoggerDomain
{
public:
    explicit CLoggerDomain(std::string name);
    const std::string& getName() const;
    CLoggerDomain getParent() const;
    bool isGlobalDomain() const;

    static const std::string DOMAIN_GLOBAL;

private:
    std::string name;
};

class DLL_LINKAGE CLogger final: public vstd::CLoggerBase
{
public:
    ELogLevel::ELogLevel getLevel() const;
    void setLevel(ELogLevel::ELogLevel level);
    const CLoggerDomain & getDomain() const;

    static CLogger * getLogger(const CLoggerDomain & domain);
    static CLogger * getGlobalLogger();

    void log(ELogLevel::ELogLevel level, const std::string & message) const override;
    void log(ELogLevel::ELogLevel level, const boost::format & fmt) const override;

    void addTarget(std::unique_ptr<ILogTarget> && target);
    void clearTargets();

    bool isDebugEnabled() const override;
    bool isTraceEnabled() const override;

private:
    explicit CLogger(const CLoggerDomain & domain);
    inline ELogLevel::ELogLevel getEffectiveLevel() const override;
    inline void callTargets(const LogRecord & record) const;

    CLoggerDomain domain;
    CLogger * parent;
    ELogLevel::ELogLevel level;
    std::vector<std::unique_ptr<ILogTarget> > targets;
    mutable std::mutex mx;
    static std::recursive_mutex smx;
};

class DLL_LINKAGE CLogManager : public boost::noncopyable
{
public:
    static CLogManager & get();

    void addLogger(CLogger * logger);
    CLogger * getLogger(const CLoggerDomain & domain);
    std::vector<std::string> getRegisteredDomains() const;

private:
    CLogManager();
    virtual ~CLogManager();

    std::map<std::string, CLogger *> loggers;
    mutable std::mutex mx;
    static std::recursive_mutex smx;
};

struct DLL_LINKAGE LogRecord
{
    LogRecord(const CLoggerDomain & domain, ELogLevel::ELogLevel level, const std::string & message);

    CLoggerDomain domain;
    ELogLevel::ELogLevel level;
    std::string message;
    boost::posix_time::ptime timeStamp;
    std::string threadId;
};

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

class DLL_LINKAGE ILogTarget : public boost::noncopyable
{
public:
    virtual ~ILogTarget() { };
    virtual void write(const LogRecord & record) = 0;
};

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
    CConsoleHandler * console;
    ELogLevel::ELogLevel threshold;
    bool coloredOutputEnabled;
    CLogFormatter formatter;
    CColorMapping colorMapping;
    mutable std::mutex mx;
};

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

CLogger是VCMI中日志系统的实现，提供了多域、多级别的日志记录功能。系统支持多种日志目标，包括控制台和文件输出。日志系统具有线程安全性，允许多个线程同时记录日志。

- **CLoggerDomain**: 用于区分不同模块或组件的日志域
- **CLogger**: 核心日志记录类，提供日志记录接口
- **CLogManager**: 管理所有日志记录器的全局存储
- **LogRecord**: 日志记录的数据结构
- **CLogFormatter**: 日志格式化器，支持模式化输出
- **ILogTarget**: 日志输出目标接口
- **CLogConsoleTarget**: 控制台日志输出目标
- **CLogFileTarget**: 文件日志输出目标

## 依赖关系

- [CConsoleHandler](../console/CConsoleHandler.md): 控制台处理器
- [ELogLevel](./ELogLevel.md): 日志级别枚举
- [ILogTarget](./ILogTarget.md): 日志目标接口
- [LogRecord](./LogRecord.md): 日志记录结构
- [CLogFormatter](./CLogFormatter.md): 日志格式化器
- [CLogConsoleTarget](./CLogConsoleTarget.md): 控制台日志目标
- [CLogFileTarget](./CLogFileTarget.md): 文件日志目标
- boost库: date_time, filesystem, format等
- vstd::CLoggerBase: 基础日志类

## 函数注释

- `CLogger(domain)`: 构造函数，创建日志记录器
- `getLevel()`: 获取日志级别
- `setLevel(level)`: 设置日志级别
- `getDomain()`: 获取日志域
- `getLogger(domain)`: 获取指定域的日志记录器
- `getGlobalLogger()`: 获取全局日志记录器
- `log(level, message)`: 记录日志消息
- `log(level, fmt)`: 记录格式化日志消息
- `addTarget(target)`: 添加日志输出目标
- `clearTargets()`: 清除所有日志输出目标
- `isDebugEnabled()`: 检查是否启用了调试日志
- `isTraceEnabled()`: 检查是否启用了追踪日志
- `CLoggerDomain(name)`: 构造函数，创建日志域
- `getName()`: 获取域名称
- `getParent()`: 获取父域
- `isGlobalDomain()`: 检查是否是全局域
- `write(record)`: ILogTarget接口，写入日志记录
- `setFormatter(formatter)`: 设置日志格式化器
- `setPattern(pattern)`: 设置格式化模式
- `format(record)`: 格式化日志记录