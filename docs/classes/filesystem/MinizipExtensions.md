<!-- 来源: E:\develop\heroes\vcmi\lib\filesystem\MinizipExtensions.h -->
# MinizipExtensions头文件

MinizipExtensions头文件定义了将minizip库的IO操作重定向到VCMI文件流系统的API类。

## CIOApi类

### 类定义
```cpp
class DLL_LINKAGE CIOApi
```

### 主要方法
- `virtual zlib_filefunc64_def getApiStructure() = 0`: 获取64位minizip IO API结构

## CDefaultIOApi类

### 类定义
```cpp
class DLL_LINKAGE CDefaultIOApi: public CIOApi
```

### 主要方法
- `zlib_filefunc64_def getApiStructure() override`: 返回默认的minizip IO API结构

### 条件编译
- 在Android API < 24的系统上，提供32位API结构以兼容旧版zlib

## CProxyIOApi类

### 类定义
```cpp
class DLL_LINKAGE CProxyIOApi: public CIOApi
```

### 构造函数
- `CProxyIOApi(CInputOutputStream * buffer)`: 构造代理IO API
- `~CProxyIOApi() override`: 析构函数

### 主要方法
- `zlib_filefunc64_def getApiStructure() override`: 返回代理的minizip IO API结构

### 私有方法
- `CInputOutputStream * openFile(const boost::filesystem::path & filename, int mode)`: 打开文件代理

### 静态回调函数
- `openFileProxy`: 文件打开代理
- `readFileProxy`: 文件读取代理
- `writeFileProxy`: 文件写入代理
- `tellFileProxy`: 文件位置查询代理
- `seekFileProxy`: 文件定位代理
- `closeFileProxy`: 文件关闭代理
- `errorFileProxy`: 错误处理代理

## CProxyROIOApi类

### 类定义
```cpp
class DLL_LINKAGE CProxyROIOApi: public CIOApi
```

### 构造函数
- `CProxyROIOApi(CInputStream * buffer)`: 构造只读代理IO API
- `~CProxyROIOApi() override`: 析构函数

### 主要方法
- `zlib_filefunc64_def getApiStructure() override`: 返回只读代理的minizip IO API结构

### 私有方法
- `CInputStream * openFile(const boost::filesystem::path & filename, int mode)`: 打开只读文件代理

### 静态回调函数
- 同CProxyIOApi，但只支持读取操作

## 设计目的

这些类允许minizip库通过VCMI的文件流系统进行IO操作，支持：
- 从内存缓冲区读取ZIP文件
- 将ZIP操作重定向到自定义流
- 兼容不同平台的minizip版本