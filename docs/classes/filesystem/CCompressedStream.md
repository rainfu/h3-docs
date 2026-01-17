<!-- 来源: E:\develop\heroes\vcmi\lib\filesystem\CCompressedStream.h -->
# CCompressedStream类

CCompressedStream头文件定义了VCMI文件系统中的压缩流处理类，支持gzip和deflate压缩格式。主要用于处理《英雄无敌3》的压缩资源文件。

## 概述

该头文件包含两个主要的类：
- `CBufferedStream`: 缓冲输入流抽象基类
- `CCompressedStream`: 具体压缩流实现类

## DecompressionException类

### 定义
```cpp
class DecompressionException : public std::runtime_error
```

解压过程中发生的异常类。

## CBufferedStream类

### 类定义
```cpp
class CBufferedStream : public CInputStream
```

### 功能描述
CBufferedStream为单向输入流提供缓冲功能。用于压缩数据支持，如zip归档和LOD deflate压缩。

### 公共方法
- `si64 read(ui8 * data, si64 size)`: 读取指定字节数到缓冲区
- `si64 seek(si64 position)`: 定位到指定位置（会解压数据直到找到位置）
- `si64 tell()`: 获取当前读取位置
- `si64 skip(si64 delta)`: 跳过指定字节数
- `si64 getSize()`: 获取流长度（会导致完整数据解压）

### 受保护方法
- `virtual si64 readMore(ui8 * data, si64 size) = 0`: 虚方法，获取更多数据到缓冲区
- `void reset()`: 重置所有内部状态

### 私有方法
- `void ensureSize(si64 size)`: 确保缓冲区包含至少指定字节数

### 内部状态
- `std::vector<ui8> buffer`: 已解压数据缓冲区
- `si64 position`: 当前读取位置
- `bool endOfFileReached`: 是否到达文件末尾

## CCompressedStream类

### 类定义
```cpp
class DLL_LINKAGE CCompressedStream : public CBufferedStream
```

### 功能描述
CCompressedStream提供gzip压缩文件的读取方法。实现延迟加载 - 数据只在请求时解压和缓存。

### 构造函数
- `CCompressedStream(std::unique_ptr<CInputStream> stream, bool gzip, size_t decompressedSize=0)`: 构造压缩流

### 参数说明
- `stream`: 包含压缩数据的流
- `gzip`: 是否为gzip文件（如战役或地图），false用于LOD文件
- `decompressedSize`: 可选参数，提示解压数据大小

### 析构函数
- `~CCompressedStream()`: 析构函数

### 公共方法
- `bool getNextBlock()`: 准备解压下一个块（用于包含多个串联压缩数据的流）

### 私有方法
- `si64 readMore(ui8 * data, si64 size)`: 解压数据以确保缓冲区有newSize字节

### 内部状态
- `std::unique_ptr<CInputStream> gzipStream`: 压缩数据文件流
- `std::vector<ui8> compressedBuffer`: 未解压数据缓冲区
- `std::unique_ptr<z_stream_s> inflateState`: 当前zlib解压状态结构体

### 状态枚举
```cpp
enum EState
{
    ERROR_OCCURRED,  // 发生错误
    INITIALIZED,     // 已初始化
    IN_PROGRESS,     // 进行中
    STREAM_END,      // 流结束
    FINISHED         // 已完成
};
```

## 使用示例

### 读取gzip文件
```cpp
// 打开压缩文件流
auto fileStream = std::make_unique<CFileInputStream>("data.gz");

// 创建压缩流
auto compressedStream = std::make_unique<CCompressedStream>(
    std::move(fileStream), 
    true  // gzip格式
);

// 读取解压数据
std::vector<char> buffer(1024);
compressedStream->read(reinterpret_cast<ui8*>(buffer.data()), buffer.size());
```

### 处理多块压缩数据
```cpp
CCompressedStream stream(std::move(fileStream), false);

// 处理第一个块
while (stream.read(buffer, size) > 0) {
    // 处理数据
}

// 移动到下一个块
if (stream.getNextBlock()) {
    // 处理下一个块
}
```

## 压缩格式支持

- **gzip**: 用于战役文件、地图文件等
- **deflate**: 用于LOD归档中的压缩条目

## 性能优化

- 延迟解压：只在需要时解压数据
- 缓冲管理：维护已解压数据的缓冲区
- 流式处理：支持大型文件的流式解压

## 错误处理

- 解压失败抛出 `DecompressionException`
- 意外的流结束抛出 `std::runtime_error`

## 相关类

- `CInputStream`: 输入流基类
- `CFileInputStream`: 文件输入流
- `CArchiveLoader`: 归档加载器（使用压缩流）