# COutputStream

## 概述

`COutputStream` 是VCMI文件系统中的抽象输出流类，提供向各种数据目标写入数据的统一接口。它继承自 `CStream`，定义了写入操作的基本方法。

## 继承关系

```cpp
CStream
└── COutputStream
```

## 主要功能

COutputStream 提供了以下核心功能：

1. **数据写入**: 向流中写入指定数量的字节
2. **抽象接口**: 为不同类型的输出流提供统一接口
3. **缓冲管理**: 支持流式写入和缓冲操作

## 核心方法

### 数据写入

#### write
```cpp
virtual si64 write(const ui8 * data, si64 size) = 0;
```
- **参数**:
  - `data`: 指向源数据数组的常量指针
  - `size`: 要写入的字节数
- **返回值**: 实际写入的字节数
- **功能**: 从数据缓冲区写入指定数量的字节到流中
- **说明**: 这是一个纯虚函数，必须在派生类中实现

## 实现类

COutputStream 有多个具体实现类：

### 文件流
- **CFileOutputStream**: 向文件写入数据

### 内存流
- **CMemoryStream**: 向内存缓冲区写入数据（如果支持双向操作）

### 压缩流
- **CCompressedStream**: 处理压缩数据输出

### 网络流
- 用于网络数据发送

## 使用场景

### 基本文件写入
```cpp
// 创建输出流（假设有具体的实现类）
std::unique_ptr<COutputStream> stream = createFileOutputStream("output.dat");

// 写入数据
const char* data = "Hello, World!";
si64 bytesWritten = stream->write(reinterpret_cast<const ui8*>(data), strlen(data));
```

### 流式数据写入
```cpp
// 流式写入大块数据
const size_t BUFFER_SIZE = 8192;
std::vector<ui8> buffer(BUFFER_SIZE);

// 填充缓冲区...
fillBuffer(buffer);

while (hasMoreData) {
    si64 bytesWritten = stream->write(buffer.data(), buffer.size());
    if (bytesWritten < buffer.size()) {
        // 处理写入不完整的情况
        handlePartialWrite(bytesWritten);
    }
    // 获取下一块数据...
}
```

### 数据序列化
```cpp
// 在序列化过程中使用
void serializeToStream(COutputStream& stream, const MyData& data) {
    // 写入头部信息
    stream.write(reinterpret_cast<const ui8*>(&data.header), sizeof(data.header));

    // 写入数据体
    stream.write(data.body.data(), data.body.size());

    // 写入校验和
    ui32 checksum = calculateChecksum(data);
    stream.write(reinterpret_cast<const ui8*>(&checksum), sizeof(checksum));
}
```

## 设计意图

COutputStream 的设计目的是为了：

1. **抽象接口**: 为所有输出操作提供统一的抽象接口
2. **多态性**: 支持不同类型的输出目标（文件、内存、网络等）
3. **数据完整性**: 确保数据的正确写入
4. **性能优化**: 支持流式写入和缓冲操作
5. **错误处理**: 提供写入状态检查

## 注意事项

- **位置管理**: write操作会移动流的位置指针
- **边界检查**: 实际写入的字节数可能小于请求的字节数
- **缓冲刷新**: 某些实现可能需要显式刷新缓冲区
- **异常处理**: 写入失败时可能抛出异常
- **资源管理**: 确保在适当的时候关闭流

## 与CInputStream的关系

COutputStream 和 CInputStream 是相对应的抽象类：

- **CInputStream**: 提供读取操作 (read, readAll, calculateCRC32)
- **COutputStream**: 提供写入操作 (write)

某些流实现可能同时继承两个类，提供双向操作能力。

这个抽象类为VCMI的文件I/O系统提供了输出基础，所有的数据写入操作都通过这个统一的接口进行。