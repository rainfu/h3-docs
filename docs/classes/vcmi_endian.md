<!-- 来源: E:\develop\heroes\vcmi\lib\vcmi_endian.h -->
# vcmi_endian头文件

vcmi_endian头文件提供字节序转换和内存读取功能，支持跨平台的小端序数据处理。

## 依赖

- `<boost/endian/conversion.hpp>`: Boost字节序转换库

## 宏定义

### 打包结构体宏
- `PACKED_STRUCT_BEGIN`: 开始打包结构体定义
- `PACKED_STRUCT_END`: 结束打包结构体定义

### 字节序读取宏
- `read_le_u16(p)`: 读取16位小端序无符号整数
- `read_le_u32(p)`: 读取32位小端序无符号整数

## 结构体定义

### unaligned_Uint16结构体
```cpp
PACKED_STRUCT_BEGIN struct unaligned_Uint16 { ui16 val; } PACKED_STRUCT_END;
```
用于非对齐的16位无符号整数访问。

### unaligned_Uint32结构体
```cpp
PACKED_STRUCT_BEGIN struct unaligned_Uint32 { ui32 val; } PACKED_STRUCT_END;
```
用于非对齐的32位无符号整数访问。

## 内联函数

### 内存读取函数
- `ui16 read_unaligned_u16(const void *p)`: 读取非对齐的16位无符号整数
- `ui32 read_unaligned_u32(const void *p)`: 读取非对齐的32位无符号整数

### 数据解析函数
- `char readChar(const ui8 * buffer, int & i)`: 从缓冲区读取字符并递增索引
- `std::string readString(const ui8 * buffer, int & i)`: 从缓冲区读取字符串并递增索引

## 设计特点

- 支持跨平台字节序转换（小端序到本地序）
- 处理非对齐内存访问
- 提供安全的字符串读取（长度检查）
- 使用Boost库进行字节序转换
- 兼容不同编译器的打包结构体语法