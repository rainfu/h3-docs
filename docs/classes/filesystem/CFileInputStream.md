<!-- 来源: E:\develop\heroes\vcmi\lib\filesystem\CFileInputStream.h -->
# CFileInputStream类

CFileInputStream类是VCMI文件系统中用于从文件系统读取文件的类。它继承自CInputStream，提供文件流的读取功能。

## 类定义

```cpp
class DLL_LINKAGE CFileInputStream : public CInputStream
```

## 构造函数

- `CFileInputStream(const boost::filesystem::path & file, si64 start = 0, si64 size = 0)`: 打开指定文件

### 参数说明
- `file`: 文件路径
- `start`: 数据开始的偏移量（用于归档中的文件）
- `size`: 数据大小，0表示使用整个文件

## 主要方法

### 数据读取
- `si64 read(ui8 * data, si64 size)`: 读取指定字节数到缓冲区
- `si64 seek(si64 position)`: 定位到指定位置
- `si64 tell()`: 获取当前读取位置
- `si64 skip(si64 delta)`: 跳过指定字节数
- `si64 getSize()`: 获取流长度

## 内部状态

- `si64 dataStart`: 数据开始偏移量
- `si64 dataSize`: 数据大小
- `std::fstream fileStream`: 原生C++文件输入流

## 使用示例

```cpp
// 打开整个文件
CFileInputStream stream("data.bin");

// 打开归档中的部分文件
CFileInputStream partialStream("archive.dat", 100, 1024);
```

## 相关类

- `CInputStream`: 输入流基类
- `CCompressedStream`: 压缩流类