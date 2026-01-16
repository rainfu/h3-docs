# CInputStream

## 概述

`CInputStream` 是VCMI文件系统中的抽象输入流类，提供从各种数据源读取数据的统一接口。它继承自 `CStream`，定义了读取操作的基本方法。

## 继承关系

```cpp
CStream
└── CInputStream
```

## 主要功能

CInputStream 提供了以下核心功能：

1. **数据读取**: 从流中读取指定数量的字节
2. **完整读取**: 一次性读取整个流的内容
3. **校验和计算**: 计算流的CRC32校验和
4. **抽象接口**: 为不同类型的输入流提供统一接口

## 核心方法

### 数据读取

#### read
```cpp
virtual si64 read(ui8 * data, si64 size) = 0;
```
- **参数**:
  - `data`: 指向目标数据数组的指针
  - `size`: 要读取的字节数
- **返回值**: 实际读取的字节数
- **功能**: 从流中读取指定数量的字节到数据缓冲区
- **说明**: 这是一个纯虚函数，必须在派生类中实现

### 便捷读取方法

#### readAll
```cpp
std::pair<std::unique_ptr<ui8[]>, si64> readAll()
```
- **返回值**: pair对象，包含：
  - `first`: 包含完整数据的unique_ptr数组
  - `second`: 数据大小（字节数）
- **功能**: 一次性读取整个流的所有内容
- **实现**: 自动定位到流开始，读取所有数据到新分配的缓冲区

### 校验和计算

#### calculateCRC32
```cpp
virtual ui32 calculateCRC32()
```
- **返回值**: 计算得到的CRC32校验和
- **功能**: 计算整个流的CRC32校验和
- **实现**:
  - 保存当前位置
  - 读取完整数据
  - 使用boost::crc_32_type计算校验和
  - 恢复原始位置

## 实现类

CInputStream 有多个具体实现类：

### 文件流
- **CFileInputStream**: 从文件读取数据
- **CMemoryStream**: 从内存缓冲区读取数据

### 压缩流
- **CCompressedStream**: 处理压缩数据流

### 网络流
- **CBinaryReader**: 用于网络数据读取

## 使用场景

### 基本文件读取
```cpp
// 从文件创建输入流
std::unique_ptr<CInputStream> stream = CResourceHandler::get()->load(ResourcePath("data/file.txt"))->getStream();

// 读取数据到缓冲区
std::vector<ui8> buffer(1024);
si64 bytesRead = stream->read(buffer.data(), buffer.size());
```

### 完整文件读取
```cpp
// 一次性读取整个文件
auto [data, size] = stream->readAll();

// 使用数据...
processData(data.get(), size);
```

### 文件校验
```cpp
// 计算文件的CRC32校验和
ui32 checksum = stream->calculateCRC32();

// 用于文件完整性验证
if (checksum != expectedChecksum) {
    logGlobal->error("File corrupted!");
}
```

### 流式处理
```cpp
// 流式读取大文件
const size_t BUFFER_SIZE = 8192;
std::vector<ui8> buffer(BUFFER_SIZE);

while (true) {
    si64 bytesRead = stream->read(buffer.data(), BUFFER_SIZE);
    if (bytesRead == 0) break;

    // 处理读取的数据块
    processChunk(buffer.data(), bytesRead);
}
```

## 设计意图

CInputStream 的设计目的是为了：

1. **抽象接口**: 为所有输入操作提供统一的抽象接口
2. **多态性**: 支持不同类型的输入源（文件、内存、网络等）
3. **资源管理**: 自动处理资源分配和释放
4. **错误处理**: 提供读取状态和错误检查
5. **性能优化**: 支持流式读取和缓冲操作
6. **数据完整性**: 内置校验和计算功能

## 注意事项

- **位置管理**: read操作会移动流的位置指针
- **边界检查**: 实际读取的字节数可能小于请求的字节数
- **资源释放**: 使用unique_ptr确保自动资源管理
- **线程安全**: 大多数实现不是线程安全的
- **异常处理**: 读取失败时可能抛出异常

这个抽象类为VCMI的文件I/O系统提供了基础，所有的数据读取操作都通过这个统一的接口进行。