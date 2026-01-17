<!-- 来源: E:\develop\heroes\vcmi\lib\filesystem\CZipLoader.h -->
# CZipLoader类

CZipLoader头文件定义了VCMI文件系统中ZIP归档文件加载的相关类，包括ZIP流和ZIP加载器。

## 概述

该头文件包含处理ZIP压缩归档文件的类，支持从ZIP文件中加载和提取资源。

## CZipStream类

### 类定义
```cpp
class DLL_LINKAGE CZipStream : public CBufferedStream
```

### 功能描述
CZipStream提供从已打开的ZIP文件中读取数据的流接口。

### 构造函数
- `CZipStream(const std::shared_ptr<CIOApi> & api, const boost::filesystem::path & archive, unz64_file_pos filepos)`: 构造ZIP流

### 主要方法
- `si64 getSize()`: 获取流大小
- `ui32 calculateCRC32()`: 计算CRC32校验和
- `si64 readMore(ui8 * data, si64 size)`: 读取更多数据

## CZipLoader类

### 类定义
```cpp
class DLL_LINKAGE CZipLoader : public ISimpleResourceLoader
```

### 构造函数
- `CZipLoader(const std::string & mountPoint, const boost::filesystem::path & archive, std::shared_ptr<CIOApi> api = std::make_shared<CDefaultIOApi>())`: 构造ZIP加载器

### 主要方法
- `std::unique_ptr<CInputStream> load(const ResourcePath & resourceName) const`: 加载ZIP中的资源
- `bool existsResource(const ResourcePath & resourceName) const`: 检查资源是否存在
- `std::string getMountPoint() const`: 获取挂载点
- `std::unordered_set<ResourcePath> getFilteredFiles(std::function<bool(const ResourcePath &)> filter) const`: 获取过滤文件
- `std::string getFullFileURI(const ResourcePath& resourceName) const`: 获取完整文件URI
- `std::time_t getLastWriteTime(const ResourcePath& resourceName) const`: 获取最后写入时间

### 私有方法
- `std::unordered_map<ResourcePath, unz64_file_pos> listFiles(const std::string & mountPoint, const boost::filesystem::path &archive)`: 列出ZIP中的文件

## ZipArchive类

### 类定义
```cpp
class DLL_LINKAGE ZipArchive : boost::noncopyable
```

### 功能描述
ZipArchive提供ZIP归档文件的提取功能。

### 构造函数
- `ZipArchive(const boost::filesystem::path & from)`: 构造ZIP归档

### 主要方法
- `std::vector<std::string> listFiles()`: 列出归档中的文件
- `bool extract(const boost::filesystem::path & where, const std::vector<std::string> & what)`: 提取多个文件
- `bool extract(const boost::filesystem::path & where, const std::string & what)`: 提取单个文件

## 相关类

- `ISimpleResourceLoader`: 资源加载器接口
- `CBufferedStream`: 缓冲流基类
- `CIOApi`: IO API接口
- `CCompressedStream`: 压缩流类