# CSerializer类

CSerializer是VCMI序列化系统的基类，提供了一套完整的序列化/反序列化框架。

## 类定义

```cpp
class CSerializer
{
public:
    template<typename T>
    void operator&(T & data);
    
    template<typename T>
    void serialize(const T & data);
    
    virtual int64_t saveSimple(const T & data);
    virtual int64_t loadSimple(T & data);
    
    template<typename T>
    static si64 saveTo(std::vector<std::byte> & dest, T & data);
    
    template<typename T>
    static si64 loadFrom(const std::vector<std::byte> & src, T & data);
    
    virtual void reportState(ISerializationReport * handler) = 0;
    
protected:
    virtual void registerPtr(const void * ptr, si64 id) = 0;
    virtual si64 getId(const void * ptr) const = 0;
    virtual const void * getPtr(si64 id) const = 0;
    virtual bool isNullPtrRegistered() const = 0;
    virtual void setPtrRegistered(const void * ptr) = 0;
    virtual bool isPtrBeingSerialized(const void * ptr) const = 0;
    virtual void setPtrBeingSerialized(const void * ptr) = 0;
    virtual void finishSerialization(const void * ptr) = 0;
};
```

## 功能说明

CSerializer是VCMI序列化系统的基类，它定义了序列化和反序列化的通用接口。这个类主要用于保存和加载游戏状态，包括地图、英雄、部队等对象。

## 依赖关系

- [ISerializationReport](./ISerializationReport.md): 用于报告序列化状态
- STL库: `<vector>`, `<memory>`, `<type_traits>`

## 函数注释

- `operator&(T & data)`: 序列化操作符，用于序列化数据
- `serialize(const T & data)`: 序列化数据
- `saveSimple(const T & data)`: 保存简单数据
- `loadSimple(T & data)`: 加载简单数据
- `saveTo(std::vector<std::byte> & dest, T & data)`: 将数据序列化到字节向量
- `loadFrom(const std::vector<std::byte> & src, T & data)`: 从字节向量反序列化数据
- `reportState(ISerializationReport * handler)`: 报告序列化状态
- `registerPtr(const void * ptr, si64 id)`: 注册指针与ID的映射
- `getId(const void * ptr) const`: 获取指针的ID
- `getPtr(si64 id) const`: 根据ID获取指针
- `isNullPtrRegistered() const`: 检查空指针是否已注册
- `setPtrRegistered(const void * ptr)`: 设置指针已注册
- `isPtrBeingSerialized(const void * ptr) const`: 检查指针是否正在被序列化
- `setPtrBeingSerialized(const void * ptr)`: 设置指针正在被序列化
- `finishSerialization(const void * ptr)`: 完成指针的序列化

## 📋 类概述

`CSerializer` 模块提供了 VCMI 的序列化系统基础，包括序列化检测模板、以及二进制读写器的接口定义。该模块支持多种序列化格式，并提供类型安全的序列化操作。

## 🔧 主要组件

### 序列化检测模板
```cpp
template<class S, class T>
struct is_serializeable
{
    // 编译时检测类是否提供 serialize 方法
    static const bool value = /* 检测结果 */;
};
```

### 二进制读取器接口
```cpp
class IBinaryReader
{
public:
    virtual ~IBinaryReader() = default;
    virtual int read(std::byte * data, unsigned size) = 0;
};
```

### 二进制写入器接口
```cpp
class IBinaryWriter
{
public:
    virtual ~IBinaryWriter() = default;
    virtual int write(const std::byte * data, unsigned size) = 0;
};
```

## 🎯 核心功能

### 序列化检测
- **编译时检查**：使用 SFINAE 技术检测类是否提供 `serialize` 方法
- **类型安全**：确保只有正确实现的类才能被序列化
- **模板元编程**：零运行时开销的类型检查

### 二进制 I/O 接口
- **抽象接口**：定义统一的二进制数据读写接口
- **多态支持**：支持不同实现的序列化器
- **错误处理**：返回实际读写的字节数

## 🔗 依赖关系

- **基类**：无
- **关联类**：Serializeable, JsonSerializer, BinarySerializer
- **关联模块**：无（基础模块）

## 💡 使用示例

### 序列化检测
```cpp
// 检查类是否可序列化
if constexpr (is_serializeable<CSerializer, MyClass>::value)
{
    // MyClass 提供了 serialize 方法
    serializer & myObject;
}
```

### 自定义序列化器
```cpp
class MyBinaryWriter : public IBinaryWriter
{
public:
    int write(const std::byte * data, unsigned size) override
    {
        // 实现具体的写入逻辑
        return file.write(data, size);
    }
};
```

## 📝 实现说明

- **SFINAE 技术**：使用 Substitution Failure is Not An Error 实现编译时类型检测
- **模板元编程**：零开销的类型检查和代码生成
- **接口分离**：读写器分离，支持不同的序列化策略

## 🔍 相关类

- **Serializeable**：序列化标记基类
- **JsonSerializer**：JSON 格式序列化器
- **BinarySerializer**：二进制格式序列化器
- **CSaveFile/CLoadFile**：文件序列化实现

## ⚡ 性能特性

- **编译时优化**：序列化检测在编译时完成，无运行时开销
- **接口抽象**：支持高效的虚拟函数调用
- **内存安全**：使用 std::byte 避免类型转换问题
