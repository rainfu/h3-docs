# CLogger类

CLogger类是VCMI系统中的日志记录类，用于将消息记录到特定目标的特定域/名称。它是线程安全的，可以由多个线程并发使用。

## 类定义

```cpp
/// 日志域类，提供对子域的超域的便捷访问
class DLL_LINKAGE CLoggerDomain
{
public:
    /// 构造一个由名称指定的域的CLoggerDomain
    /// 子域可以通过点分隔的域来指定，例如"ai.battle"。全局域名为"global"
    explicit CLoggerDomain(std::string name);

    const std::string& getName() const;              // 获取域名称
    CLoggerDomain getParent() const;                 // 获取父域
    bool isGlobalDomain() const;                     // 检查是否为全局域

    static const std::string DOMAIN_GLOBAL;          // 全局域名称

private:
    std::string name;                                // 域名称
};

/// 日志记录器用于将消息记录到特定域/名称的特定目标
/// 它是线程安全的，可以由多个线程并发使用
class DLL_LINKAGE CLogger final: public vstd::CLoggerBase
{
public:
    ELogLevel::ELogLevel getLevel() const;            // 获取日志级别
    void setLevel(ELogLevel::ELogLevel level);       // 设置日志级别
    const CLoggerDomain & getDomain() const;         // 获取域

    /// 日志器访问方法
    static CLogger * getLogger(const CLoggerDomain & domain); // 获取指定域的日志器
    static CLogger * getGlobalLogger();              // 获取全局日志器

    void log(ELogLevel::ELogLevel level, const std::string & message) const override; // 记录日志
    void log(ELogLevel::ELogLevel level, const boost::format & fmt) const override; // 记录格式化日志

    void addTarget(std::unique_ptr<ILogTarget> && target); // 添加日志目标
    void clearTargets();                             // 清除所有目标

    /// 如果调试/跟踪日志消息将被记录则返回true，否则返回false
    /// 如果性能很重要且连接日志消息是一项昂贵的任务，则很有用
    bool isDebugEnabled() const override;            // 检查是否启用调试
    bool isTraceEnabled() const override;            // 检查是否启用跟踪

private:
    explicit CLogger(const CLoggerDomain & domain);   // 构造函数
    inline ELogLevel::ELogLevel getEffectiveLevel() const override; /// 返回应用于此日志器的级别（直接或间接）
    inline void callTargets(const LogRecord & record) const; // 调用所有目标

    CLoggerDomain domain;                            // 日志域
    CLogger * parent;                                // 父日志器
    ELogLevel::ELogLevel level;                      // 日志级别
    std::vector<std::unique_ptr<ILogTarget> > targets; // 日志目标列表
    mutable std::mutex mx;                           // 互斥锁
    static std::recursive_mutex smx;                 // 静态互斥锁
};

/* ---------------------------------------------------------------------------- */
/* 实现/细节类，私有API */
/* ---------------------------------------------------------------------------- */

/// CLogManager类是日志器对象的全局存储
class DLL_LINKAGE CLogManager : public boost::noncopyable
{
public:
    static CLogManager & get();                      // 获取日志管理器单例

    void addLogger(CLogger * logger);                // 添加日志器
    CLogger * getLogger(const CLoggerDomain & domain); /// 返回日志器，如果没有为给定域注册则返回nullptr
    std::vector<std::string> getRegisteredDomains() const; // 获取已注册的域

private:
    CLogManager();                                   // 构造函数
    virtual ~CLogManager();                          // 析构函数

    std::map<std::string, CLogger *> loggers;        // 日志器映射
    mutable std::mutex mx;                           // 互斥锁
    static std::recursive_mutex smx;                 // 静态互斥锁
};

/// LogRecord结构体保存日志消息和额外的日志信息
struct DLL_LINKAGE LogRecord
{
    LogRecord(const CLoggerDomain & domain, ELogLevel::ELogLevel level, const std::string & message); // 构造函数

    CLoggerDomain domain;                            // 日志域
    ELogLevel::ELogLevel level;                      // 日志级别
    std::string message;                             // 消息内容
    boost::posix_time::ptime timeStamp;              // 时间戳
    std::string threadId;                            // 线程ID
};

/// CLogFormatter类格式化日志记录
///
/// 有几个模式字符可用于格式化日志记录:
/// %d = 日期/时间
/// %l = 日志级别
/// %n = 日志器名称
/// %t = 线程ID
/// %m = 消息
class DLL_LINKAGE CLogFormatter
{
public:
    CLogFormatter();                                 // 构造函数
    CLogFormatter(std::string pattern);              // 使用模式构造

    void setPattern(const std::string & pattern);    // 设置模式
    void setPattern(std::string && pattern);         // 设置模式(移动)
    const std::string & getPattern() const;          // 获取模式
    std::string format(const LogRecord & record) const; // 格式化记录

private:
    std::string pattern;                             // 模式字符串
};

/// ILogTarget接口由所有日志目标实现，它包含
/// 子类应实现的write抽象方法
class DLL_LINKAGE ILogTarget : public boost::noncopyable
{
public:
    virtual ~ILogTarget() { };                       // 虚析构函数
    virtual void write(const LogRecord & record) = 0; // 写入日志记录
};

/// CColorMapping类将日志器名称和级别映射到特定颜色，支持域继承
class DLL_LINKAGE CColorMapping
{
public:
    CColorMapping();                                 // 构造函数

    void setColorFor(const CLoggerDomain & domain, ELogLevel::ELogLevel level, EConsoleTextColor color); // 为域设置颜色
    EConsoleTextColor getColorFor(const CLoggerDomain & domain, ELogLevel::ELogLevel level) const; // 获取域的颜色

private:
    std::map<std::string, std::map<ELogLevel::ELogLevel, EConsoleTextColor> > map; // 颜色映射
};

/// 控制台日志目标，将消息写入控制台
class DLL_LINKAGE CLogConsoleTarget : public ILogTarget
{
public:
    explicit CLogConsoleTarget(CConsoleHandler * console); // 构造函数

    bool isColoredOutputEnabled() const;             // 检查是否启用彩色输出
    void setColoredOutputEnabled(bool coloredOutputEnabled); // 设置彩色输出启用状态

    ELogLevel::ELogLevel getThreshold() const;       // 获取阈值
    void setThreshold(ELogLevel::ELogLevel threshold); // 设置阈值

    const CLogFormatter & getFormatter() const;      // 获取格式化器
    void setFormatter(const CLogFormatter & formatter); // 设置格式化器

    const CColorMapping & getColorMapping() const;   // 获取颜色映射
    void setColorMapping(const CColorMapping & colorMapping); // 设置颜色映射

    void write(const LogRecord & record) override;   // 写入日志记录

private:
#if !defined(VCMI_MOBILE)
    CConsoleHandler * console;                       // 控制台处理器
#endif
    ELogLevel::ELogLevel threshold;                  // 阈值级别
    bool coloredOutputEnabled;                       // 是否启用彩色输出
    CLogFormatter formatter;                         // 格式化器
    CColorMapping colorMapping;                      // 颜色映射
    mutable std::mutex mx;                           // 互斥锁
};

/// 文件日志目标，将消息写入日志文件
class DLL_LINKAGE CLogFileTarget : public ILogTarget
{
public:
    /// 构造CLogFileTarget并打开filePath指定的文件，如果append参数为true，则追加到文件末尾
    /// 否则在打开前截断指定的文件
    explicit CLogFileTarget(const boost::filesystem::path & filePath, bool append = true);
    ~CLogFileTarget();                               // 析构函数

    const CLogFormatter & getFormatter() const;      // 获取格式化器
    void setFormatter(const CLogFormatter & formatter); // 设置格式化器

    void write(const LogRecord & record) override;   // 写入日志记录

private:
    std::fstream file;                               // 文件流
    CLogFormatter formatter;                         // 格式化器
    mutable std::mutex mx;                           // 互斥锁
};
```

## 功能说明

CLogger类是VCMI系统中的日志记录核心组件，提供了完整的日志记录功能。它支持日志域的概念，允许将日志按功能或模块进行组织。该类是线程安全的，可以安全地在多线程环境中使用。

CLoggerDomain类用于定义日志域，支持嵌套的域结构（如"ai.battle"表示ai域下的battle子域）。

CLogManager是日志器的全局管理器，负责创建和管理所有日志器实例。

## 重要方法

### 日志记录
- `log(level, message)`：记录指定级别的日志消息
- `isDebugEnabled()`：检查是否启用调试日志
- `isTraceEnabled()`：检查是否启用跟踪日志

### 配置管理
- `getLevel()/setLevel()`：获取/设置日志级别
- `getDomain()`：获取日志域
- `addTarget()`：添加日志输出目标
- `clearTargets()`：清除所有日志输出目标

### 工厂方法
- `getLogger(domain)`：获取指定域的日志器
- `getGlobalLogger()`：获取全局日志器

## 日志目标类型

### 控制台目标
CLogConsoleTarget将日志写入控制台，支持彩色输出和自定义格式。

### 文件目标
CLogFileTarget将日志写入文件，支持追加模式。

## 设计说明

CLogger类的设计体现了以下特点：

1. **域层次结构**：通过CLoggerDomain实现日志域的层次结构
2. **线程安全**：使用互斥锁保证多线程环境下的安全访问
3. **灵活输出**：支持多种日志输出目标（控制台、文件等）
4. **可配置性**：支持自定义日志格式和过滤级别
5. **性能优化**：提供isDebugEnabled等方法以避免不必要的日志拼接操作

这套日志系统为VCMI提供了强大而灵活的日志记录能力，支持开发和调试过程中的各种需求。