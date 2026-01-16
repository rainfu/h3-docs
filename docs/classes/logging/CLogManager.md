# CLogManager类

CLogManager类是VCMI日志系统中的日志管理器，负责管理所有日志记录器的生命周期和注册。

## 类定义

```cpp
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
```

## 功能说明

CLogManager是VCMI日志系统的核心管理类，使用单例模式提供对所有日志记录器的集中管理。它负责创建、注册和检索日志记录器实例，并确保线程安全的访问。该类不允许拷贝，确保只存在一个实例。

## 依赖关系

- [CLogger](./CLogger.md): 日志记录器类
- [CLoggerDomain](./CLoggerDomain.md): 日志域类
- Boost库: noncopyable
- STL库: map, vector, mutex

## 函数注释

- `get()`: 获取日志管理器的单例实例
- `addLogger(logger)`: 添加一个新的日志记录器到管理器
- `getLogger(domain)`: 根据域获取日志记录器，如果不存在则返回nullptr
- `getRegisteredDomains()`: 获取所有已注册域的列表

## 成员变量

- `loggers`: 存储日志记录器的映射，键为域名称
- `mx`: 用于线程安全的互斥锁
- `smx`: 静态互斥锁，用于保护单例访问