# CLogManager类

CLogManager类是VCMI日志系统中的日志管理器，作为日志记录器的全局存储。

## 类定义

```cpp
/// 类CLogManager是日志记录器的全局存储。
class DLL_LINKAGE CLogManager : public boost::noncopyable
{
public:
    static CLogManager & get();

    void addLogger(CLogger * logger);
    CLogger * getLogger(const CLoggerDomain & domain); /// 返回日志器或如果给定域没有注册则返回nullptr。
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

CLogManager是VCMI日志系统的全局管理器，负责维护所有日志记录器的注册表。它提供了单例模式的访问方式，允许在整个应用程序中注册和获取日志记录器实例。该类是线程安全的，可以在多线程环境中使用。

## 依赖关系

- [CLogger](./CLogger.md): 日志记录器类
- [CLoggerDomain](./CLoggerDomain.md): 日志域类
- boost::noncopyable: 防拷贝基类
- STL库: map, vector, mutex等

## 函数注释

- `get()`: 获取CLogManager单例实例
- `addLogger(logger)`: 向管理器添加日志记录器
- `getLogger(domain)`: 获取指定域的日志记录器，如果未注册则返回nullptr
- `getRegisteredDomains()`: 获取所有已注册的域名称列表