<!-- 来源: E:\develop\heroes\vcmi\lib\CConsoleHandler.h -->
# CConsoleHandler类

CConsoleHandler类是VCMI中用于控制台输出的包装类，支持彩色文本输出和控制台监听。

## EConsoleTextColor枚举

### 定义
```cpp
enum class EConsoleTextColor : int8_t
```

### 颜色值
- `DEFAULT = -1`: 默认颜色
- `GREEN`: 绿色
- `RED`: 红色
- `MAGENTA`: 品红
- `YELLOW`: 黄色
- `WHITE`: 白色
- `GRAY`: 灰色
- `TEAL = -2`: 青色

## CConsoleHandler类

### 类定义
```cpp
class DLL_LINKAGE CConsoleHandler
```

### 构造函数
- `CConsoleHandler(const std::function<void(const std::string &, bool)> & callback)`: 构造带回调的控制台处理器
- `CConsoleHandler()`: 默认构造函数
- `~CConsoleHandler()`: 析构函数

### 主要方法

#### start
```cpp
void start()
```
启动监听线程。

#### print模板方法
```cpp
template<typename T> void print(const T &data, bool addNewLine = false, EConsoleTextColor color = EConsoleTextColor::DEFAULT, bool printToStdErr = false)
```
打印数据到控制台。

**参数:**
- `data`: 要打印的数据
- `addNewLine`: 是否添加换行符
- `color`: 文本颜色
- `printToStdErr`: 是否打印到标准错误输出

**功能:**
- 支持彩色文本输出
- 在非Windows平台上使用文件锁定确保输出完整性
- 自动重置颜色

### 私有方法
- `int run()`: 运行监听循环
- `void end()`: 结束监听线程
- `void setColor(EConsoleTextColor color)`: 设置文本颜色

### 私有成员
- `TColor defColor`: 默认颜色
- `TColor defErrColor`: 默认错误颜色
- `std::function<void(const std::string &, bool)> cb`: 消息回调函数
- `std::condition_variable shutdownVariable`: 关闭条件变量
- `std::mutex shutdownMutex`: 关闭互斥锁
- `std::atomic<bool> shutdownPending`: 关闭待处理标志
- `std::mutex smx`: 输出互斥锁
- `std::thread thread`: 监听线程

## 平台相关

- 在非Windows平台上使用`flockfile/funlockfile`确保输出原子性
- 颜色实现因平台而异（Windows使用int32_t，类Unix使用字符串）