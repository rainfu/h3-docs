# CLoggerDomain类

CLoggerDomain类是VCMI日志系统中用于标识日志域的类，提供便捷的方式访问超域（super domains）。

## 类定义

```cpp
class DLL_LINKAGE CLoggerDomain
{
public:
    /// 构造一个由name指定的CLoggerDomain。
    /// 子域可以通过用点分隔域来指定，例如 "ai.battle"。全局域命名为 "global"。
    explicit CLoggerDomain(std::string name);

    const std::string& getName() const;
    CLoggerDomain getParent() const;
    bool isGlobalDomain() const;

    static const std::string DOMAIN_GLOBAL;

private:
    std::string name;
};
```

## 功能说明

CLoggerDomain是VCMI日志系统中的一个重要组件，用于组织和管理不同模块或组件的日志记录。通过域的概念，可以将日志按功能、模块或组件进行分类，便于过滤和查看特定部分的日志。域可以形成层次结构，例如"ai.battle"表示"ai"域下的"battle"子域。

## 依赖关系

- 无直接依赖

## 函数注释

- `CLoggerDomain(name)`: 构造函数，创建一个由name指定的日志域
- `getName()`: 获取域的名称
- `getParent()`: 获取父域
- `isGlobalDomain()`: 检查是否是全局域
- `DOMAIN_GLOBAL`: 全局域的静态常量名称