# CLoggerBase

## 源文件地址
`e:\develop\heroes\vcmi-assets\vcmi-client\include\vstd/CLoggerBase.h`

## 概述
`CLoggerBase`定义了VCMI引擎中的日志记录基类接口。该文件定义了[CLoggerBase](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vstd/CLoggerBase.h#L33-L127)类，提供了基础的日志记录功能。

## 类定义

### CLoggerBase
日志记录基类，提供了一套标准的日志记录接口，包括不同级别的日志消息（调试、信息、警告、错误等）。该类定义了日志记录的基本方法和格式化功能，是VCMI中所有日志记录器的基类。

该类提供了多种日志级别：
- trace: 最详细的日志信息，通常只在开发和调试期间启用
- debug: 用于调试的详细信息，在生产环境中通常不启用
- info: 一般信息消息，表明应用程序正在按预期工作
- warn: 警告消息，表示发生了意外情况，但应用程序仍能正常工作
- error: 错误事件，通常表示更严重的问题
- fatal: 严重的错误事件，表明应用程序本身可能无法继续运行