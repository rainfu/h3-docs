<!-- 来源: E:\develop\heroes\vcmi\lib\filesystem\CInputOutputStream.h -->
# CInputOutputStream类

CInputOutputStream类是VCMI文件系统中同时支持输入和输出操作的流类。它同时继承自CInputStream和COutputStream。

## 类定义

```cpp
class CInputOutputStream: public CInputStream, public COutputStream
```

## 概述

CInputOutputStream是一个多重继承类，结合了输入流和输出流的功能，允许对同一流进行读写操作。

## 继承关系

- **父类**: `CInputStream`, `COutputStream`
- **接口**: 同时支持所有输入和输出流操作

## 使用场景

适用于需要同时读取和写入数据的流操作，如：
- 内存缓冲区的读写
- 双向网络通信
- 文件的就地修改

## 相关类

- `CInputStream`: 输入流基类
- `COutputStream`: 输出流基类