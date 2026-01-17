<!-- 来源: E:\develop\heroes\vcmi\lib\filesystem\CMemoryStream.h -->
# CMemoryStream类

CMemoryStream类是VCMI文件系统中用于从内存读取数据的类。它继承自CInputStream，提供只读内存流的访问。

## 类定义

```cpp
class DLL_LINKAGE CMemoryStream : public CInputStream
```

## 注意事项

**已弃用**: 该类已被弃用，建议使用 `CMemoryBuffer` 替代。

## 构造函数

- `CMemoryStream(const ui8 * data, si64 size)`: 构造内存流

### 参数说明
- `data`: 数据数组指针（不拥有所有权）
- `size`: 数组大小（字节）

## 主要方法

- `si64 read(ui8 * data, si64 size)`: 从内存读取指定字节数
- `si64 seek(si64 position)`: 定位到指定位置
- `si64 tell()`: 获取当前读取位置
- `si64 skip(si64 delta)`: 跳过指定字节数
- `si64 getSize()`: 获取流大小

## 内部状态

- `const ui8 * data`: 数据数组指针
- `si64 size`: 数组大小
- `si64 position`: 当前读取位置

## 相关类

- `CInputStream`: 输入流基类
- `CMemoryBuffer`: 推荐的替代类