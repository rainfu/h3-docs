<!-- 来源: E:\develop\heroes\vcmi\lib\logging\CBasicLogConfigurator.h -->
# CBasicLogConfigurator头文件

CBasicLogConfigurator头文件定义了VCMI中基本的日志配置器类，用于配置和管理系统日志。

## CBasicLogConfigurator类

### 类定义
```cpp
class DLL_LINKAGE CBasicLogConfigurator
```

### 构造函数
- `CBasicLogConfigurator(boost::filesystem::path filePath, CConsoleHandler * const console)`: 构造函数

### 主要方法
- `void configure()`: 通过解析日志设置来配置日志系统，添加控制台和文件目标到全局日志器
- `void configureDefault()`: 配置默认日志系统，添加控制台和文件目标到全局日志器
- `void deconfigure()`: 从全局日志器移除所有目标

### 私有方法
- `static ELogLevel::ELogLevel getLogLevel(const std::string & level)`: 从字符串获取日志级别枚举
- `static EConsoleTextColor getConsoleColor(const std::string & colorName)`: 从字符串获取控制台颜色枚举

### 私有成员
- `boost::filesystem::path filePath`: 日志文件路径
- `CConsoleHandler * console`: 控制台处理器
- `bool appendToLogFile`: 是否追加到日志文件

## 设计特点

- 从settings.json读取日志属性
- 支持控制台和文件日志目标
- 提供默认配置选项
- 支持日志级别和颜色配置
- 确保使用相同配置器对象初始化整个日志系统