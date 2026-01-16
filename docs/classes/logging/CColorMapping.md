# CColorMapping类

CColorMapping类是VCMI日志系统中的颜色映射类，用于将日志名称和级别映射到特定颜色，支持域继承。

## 类定义

```cpp
class DLL_LINKAGE CColorMapping
{
public:
    CColorMapping();

    void setColorFor(const CLoggerDomain & domain, ELogLevel::ELogLevel level, EConsoleTextColor color);
    EConsoleTextColor getColorFor(const CLoggerDomain & domain, ELogLevel::ELogLevel level) const;

private:
    std::map<std::string, std::map<ELogLevel::ELogLevel, EConsoleTextColor> > map;
};
```

## 功能说明

CColorMapping是VCMI日志系统中的颜色映射类，用于将日志域和日志级别映射到特定的颜色，以便在控制台输出中以不同颜色显示不同类型的日志消息。该类支持域继承，使得子域可以继承父域的颜色配置。

## 依赖关系

- [CLoggerDomain](./CLoggerDomain.md): 日志域类
- [ELogLevel](./ELogLevel.md): 日志级别枚举
- [EConsoleTextColor](./EConsoleTextColor.md): 控制台文本颜色枚举
- STL库: map等

## 函数注释

- `CColorMapping()`: 构造函数，创建颜色映射对象
- `setColorFor(domain, level, color)`: 为指定域和级别的日志设置颜色
- `getColorFor(domain, level)`: 获取指定域和级别的日志颜色