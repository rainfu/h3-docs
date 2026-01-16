# 日志系统 (logging)

logging模块负责VCMI客户端的日志记录功能，提供多级日志输出、彩色控制台显示和文件记录功能。

## 主要类和结构体

### CLoggerDomain
日志域类，用于组织和管理日志记录域。

- 功能：将日志按功能模块分组，例如"ai.battle"表示AI战斗模块
- 依赖：无
- 函数注释：
  - [CLoggerDomain(name)](#): 构造函数，使用名称创建日志域
  - [getName()](#): 获取域名称
  - [getParent()](#): 获取父级日志域
  - [isGlobalDomain()](#): 检查是否为全局域
  - [DOMAIN_GLOBAL](#): 全局域名称常量

### CLogger
日志记录器类，负责实际的日志记录功能。

- 功能：提供线程安全的日志记录功能，支持多级日志输出
- 依赖：[CLoggerDomain](#cloggerdomain), [ILogTarget](#ilogtarget), [LogRecord](#logrecord), [vstd::CLoggerBase](../vstd/CLoggerBase.md)
- 函数注释：
  - [getLevel()](#): 获取当前日志级别
  - [setLevel()](#): 设置日志级别
  - [getDomain()](#): 获取所属日志域
  - [getLogger(domain)](#): 获取指定域的日志记录器
  - [getGlobalLogger()](#): 获取全局日志记录器
  - [log(level, message)](#): 记录消息日志
  - [log(level, fmt)](#): 记录格式化日志
  - [addTarget(target)](#): 添加日志输出目标
  - [clearTargets()](#): 清除所有日志输出目标
  - [isDebugEnabled()](#): 检查调试日志是否启用
  - [isTraceEnabled()](#): 检查跟踪日志是否启用

### CLogManager
日志管理器类，全局存储和管理所有日志记录器。

- 功能：作为全局存储，管理所有日志记录器实例
- 依赖：[CLogger](#clogger), [CLoggerDomain](#cloggerdomain)
- 函数注释：
  - [get()](#): 获取日志管理器单例实例
  - [addLogger(logger)](#): 添加日志记录器
  - [getLogger(domain)](#): 获取指定域的日志记录器
  - [getRegisteredDomains()](#): 获取已注册的域列表

### LogRecord
日志记录结构体，存储日志消息及相关信息。

- 功能：封装一条日志记录的所有信息，包括时间戳、消息内容、级别等
- 依赖：[CLoggerDomain](#cloggerdomain), [ELogLevel](#eloglevel)
- 函数注释：
  - [LogRecord(domain, level, message)](#): 构造函数，创建日志记录
  - [domain](#): 记录所属的日志域
  - [level](#): 日志级别
  - [message](#): 日志消息
  - [timeStamp](#): 时间戳
  - [threadId](#): 线程ID

### CLogFormatter
日志格式化器类，用于格式化日志输出。

- 功能：使用预定义的模式格式化日志记录
- 依赖：[LogRecord](#logrecord)
- 函数注释：
  - [CLogFormatter(pattern)](#): 构造函数，使用指定模式创建格式化器
  - [setPattern(pattern)](#): 设置格式化模式
  - [getPattern()](#): 获取当前格式化模式
  - [format(record)](#): 格式化日志记录
- 格式字符：
  - `%d` = 日期/时间
  - `%l` = 日志级别
  - `%n` = 记录器名称
  - `%t` = 线程ID
  - `%m` = 消息

### ILogTarget
日志输出目标接口，定义了日志输出的抽象方法。

- 功能：定义日志输出的通用接口，支持不同的输出方式
- 依赖：[LogRecord](#logrecord)
- 函数注释：
  - [write(record)](#): 将日志记录写入目标

### CColorMapping
颜色映射类，为不同日志级别和域设置颜色。

- 功能：为日志输出提供颜色映射，支持域继承
- 依赖：[CLoggerDomain](#cloggerdomain), [ELogLevel](#eloglevel), [EConsoleTextColor](#econsoletextcolor)
- 函数注释：
  - [setColorFor(domain, level, color)](#): 为特定域和级别设置颜色
  - [getColorFor(domain, level)](#): 获取特定域和级别的颜色

### CLogConsoleTarget
控制台日志输出目标类，将日志输出到控制台。

- 功能：将日志输出到控制台，支持彩色输出
- 依赖：[ILogTarget](#ilogtarget), [CConsoleHandler](#cconsolehandler), [CLogFormatter](#clogformatter), [CColorMapping](#ccolormapping)
- 函数注释：
  - [CLogConsoleTarget(console)](#): 构造函数，使用控制台处理器创建目标
  - [isColoredOutputEnabled()](#): 检查是否启用彩色输出
  - [setColoredOutputEnabled(enabled)](#): 设置是否启用彩色输出
  - [getThreshold()](#): 获取阈值级别
  - [setThreshold(threshold)](#): 设置阈值级别
  - [getFormatter()](#): 获取格式化器
  - [setFormatter(formatter)](#): 设置格式化器
  - [getColorMapping()](#): 获取颜色映射
  - [setColorMapping(mapping)](#): 设置颜色映射
  - [write(record)](#): 将日志记录写入控制台

### CLogFileTarget
文件日志输出目标类，将日志输出到文件。

- 功能：将日志输出到文件
- 依赖：[ILogTarget](#ilogtarget), [CLogFormatter](#clogformatter), [boost::filesystem::path](#)
- 函数注释：
  - [CLogFileTarget(filePath, append)](#): 构造函数，使用文件路径创建目标
  - [getFormatter()](#): 获取格式化器
  - [setFormatter(formatter)](#): 设置格式化器
  - [write(record)](#): 将日志记录写入文件

## 依赖关系

logging模块依赖以下组件：
- [vstd](../vstd/index.md): 基础工具库
- boost库: 日期时间、文件系统、线程安全等

## 类依赖排序

1. [vstd](../vstd/index.md) - 基础工具库
2. logging/ - 日志系统