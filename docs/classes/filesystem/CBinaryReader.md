<!-- 来源: E:\develop\heroes\vcmi\lib\filesystem\CBinaryReader.h -->
# CBinaryReader类

CBinaryReader类是VCMI文件系统中用于从流中读取二进制数据的类。它提供类型安全的方式读取各种基本数据类型，支持小端字节序转换。

## 类定义

```cpp
class DLL_LINKAGE CBinaryReader : public boost::noncopyable
```

## 概述

CBinaryReader封装了从CInputStream读取二进制数据的操作。它自动处理字节序转换（小端到大端），提供读取各种整数类型和字符串的方法。

## 构造函数

- `CBinaryReader()`: 默认构造函数
- `CBinaryReader(CInputStream * stream)`: 使用指定流构造

## 流管理方法

- `CInputStream * getStream()`: 获取底层流
- `void setStream(CInputStream * stream)`: 设置底层流

## 数据读取方法

### 原始字节读取
- `si64 read(ui8 * data, si64 size)`: 读取指定数量的字节到缓冲区

### 整数读取方法
- `ui8 readUInt8()`: 读取无符号8位整数
- `si8 readInt8()`: 读取有符号8位整数
- `ui16 readUInt16()`: 读取无符号16位整数
- `si16 readInt16()`: 读取有符号16位整数
- `ui32 readUInt32()`: 读取无符号32位整数
- `si32 readInt32()`: 读取有符号32位整数
- `ui64 readUInt64()`: 读取无符号64位整数
- `si64 readInt64()`: 读取有符号64位整数

### 布尔值读取
- `bool readBool()`: 读取布尔值（非零为true）

### 字符串读取
- `std::string readBaseString()`: 读取基础字符串（无编码转换）

### 跳过字节
- `void skip(int count)`: 跳过指定数量的字节

## 字节序处理

CBinaryReader假设流中的整数始终为小端字节序。在大端机器上会自动进行转换：

```cpp
// 读取16位整数
ui16 value = reader.readUInt16();
// 在大端机器上自动从LE转换
```

## 错误处理

所有读取方法在意外到达流末尾时抛出 `std::runtime_error`：

```cpp
try {
    ui32 value = reader.readUInt32();
} catch (const std::runtime_error& e) {
    // 处理读取错误
}
```

## 使用示例

### 基本使用
```cpp
// 创建读取器
CBinaryReader reader(stream);

// 读取各种数据类型
ui32 magic = reader.readUInt32();
ui16 version = reader.readUInt16();
bool flag = reader.readBool();
std::string name = reader.readBaseString();
```

### 结构化数据读取
```cpp
struct FileHeader {
    ui32 magic;
    ui16 version;
    ui16 count;
};

FileHeader header;
header.magic = reader.readUInt32();
header.version = reader.readUInt16();
header.count = reader.readUInt16();
```

### 跳过数据
```cpp
// 跳过4个字节的保留字段
reader.skip(4);
```

## 私有方法

- `template <typename CData> CData readInteger()`: 读取任意整数类型
- `std::string getEndOfStreamExceptionMsg(long bytesToRead) const`: 生成流结束异常消息

## 内部状态

- `CInputStream * stream`: 底层输入流指针

## 性能考虑

- 直接操作流缓冲区，性能开销最小
- 模板化整数读取，避免重复代码
- 支持批量字节读取

## 线程安全

非线程安全。多个线程同时使用同一个CBinaryReader实例需要外部同步。

## 相关类

- `CInputStream`: 输入流基类
- `CFileInputStream`: 文件输入流
- `CMemoryStream`: 内存流