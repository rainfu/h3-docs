<!-- 来源: E:\develop\heroes\vcmi\lib\filesystem\CZipSaver.h -->
# CZipSaver类

CZipSaver头文件定义了VCMI文件系统中ZIP归档文件保存的相关类，包括ZIP输出流和ZIP保存器。

## CZipOutputStream类

### 类定义
```cpp
class DLL_LINKAGE CZipOutputStream: public COutputStream
```

### 构造函数
- `CZipOutputStream(CZipSaver * owner_, zipFile archive, const std::string & archiveFilename)`: 构造ZIP输出流

### 主要方法
- `si64 write(const ui8 * data, si64 size)`: 写入数据到ZIP文件
- `si64 seek(si64 position)`: 不支持定位（返回-1）
- `si64 tell()`: 不支持位置查询（返回0）
- `si64 skip(si64 delta)`: 不支持跳过（返回0）
- `si64 getSize()`: 不支持大小查询（返回0）

## CZipSaver类

### 类定义
```cpp
class DLL_LINKAGE CZipSaver
```

### 构造函数
- `CZipSaver(std::shared_ptr<CIOApi> api, const boost::filesystem::path & path)`: 构造ZIP保存器

### 主要方法
- `std::unique_ptr<COutputStream> addFile(const std::string & archiveFilename)`: 添加文件到ZIP归档

### 内部状态
- `std::shared_ptr<CIOApi> ioApi`: IO API接口
- `zlib_filefunc64_def zipApi`: ZIP API函数
- `zipFile handle`: ZIP文件句柄
- `COutputStream * activeStream`: 当前活动流（minizip限制同时只能打开一个文件流）

## 设计限制

由于minizip库的设计限制，CZipSaver每次只能有一个活动文件流。

## 相关类

- `COutputStream`: 输出流基类
- `CIOApi`: IO API接口