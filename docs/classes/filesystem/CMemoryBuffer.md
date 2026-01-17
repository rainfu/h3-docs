<!-- 来源: E:\develop\heroes\vcmi\lib\filesystem\CMemoryBuffer.h -->
# CMemoryBuffer类

CMemoryBuffer类是VCMI文件系统中提供内存缓冲区IO操作的类。它继承自CInputOutputStream，支持内存数据的读写操作。

## 类定义

```cpp
class DLL_LINKAGE CMemoryBuffer : public CInputOutputStream
```

## 类型定义

- `TBuffer = std::vector<ui8>`: 缓冲区类型定义

## 构造函数

- `CMemoryBuffer()`: 默认构造函数

## 主要方法

### 数据操作
- `si64 write(const ui8 * data, si64 size)`: 写入指定字节数到缓冲区
- `si64 read(ui8 * data, si64 size)`: 从缓冲区读取指定字节数
- `si64 seek(si64 position)`: 定位到指定位置
- `si64 tell()`: 获取当前读取位置
- `si64 skip(si64 delta)`: 跳过指定字节数
- `si64 getSize()`: 获取缓冲区大小

### 缓冲区访问
- `const TBuffer & getBuffer()`: 获取缓冲区引用

## 内部状态

- `TBuffer buffer`: 实际数据缓冲区
- `si64 position`: 当前读取位置

## 使用示例

```cpp
// 创建内存缓冲区
CMemoryBuffer buffer;

// 写入数据
const char* data = "Hello World";
buffer.write(reinterpret_cast<const ui8*>(data), strlen(data));

// 读取数据
char readData[20];
buffer.seek(0); // 重置位置
buffer.read(reinterpret_cast<ui8*>(readData), strlen(data));
```

## 相关类

- `CInputOutputStream`: 输入输出流基类