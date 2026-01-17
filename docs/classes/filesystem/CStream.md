<!-- 来源: E:\develop\heroes\vcmi\lib\filesystem\CStream.h -->
# CStream类

CStream类是VCMI文件系统中所有流类的抽象基类。它定义了流操作的基本接口。

## 类定义

```cpp
class DLL_LINKAGE CStream : private boost::noncopyable
```

## 纯虚方法

- `virtual si64 seek(si64 position) = 0`: 定位到指定位置
- `virtual si64 tell() = 0`: 获取当前位置
- `virtual si64 skip(si64 delta) = 0`: 相对定位指定字节数
- `virtual si64 getSize() = 0`: 获取流长度

## 继承关系

CStream是以下类的基类：
- `CInputStream`: 输入流
- `COutputStream`: 输出流

## 设计目的

提供统一的流操作接口，确保所有流实现都支持基本的定位和大小查询操作。

## 相关类

- `CInputStream`: 输入流类
- `COutputStream`: 输出流类