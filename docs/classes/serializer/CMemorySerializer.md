# CMemorySerializer类

CMemorySerializer类是VCMI中内存序列化器的实现，用于在动态缓冲区中存储对象，支持深拷贝操作。

## 类定义

```cpp
/// Serializer that stores objects in the dynamic buffer. Allows performing deep object copies.
class DLL_LINKAGE CMemorySerializer
    : public IBinaryReader, public IBinaryWriter
{
    std::vector<std::byte> buffer;

    size_t readPos; //index of the next byte to be read
public:
    BinaryDeserializer iser;
    BinarySerializer oser;

    int read(std::byte * data, unsigned size) override; //throws!
    int write(const std::byte * data, unsigned size) override;

    CMemorySerializer();

    template <typename T>
    static std::unique_ptr<T> deepCopy(const T &data, IGameInfoCallback * cb = nullptr)
    {
        CMemorySerializer mem;
        mem.oser & data;
        mem.iser.cb = cb;

        std::unique_ptr<T> ret;
        mem.iser & ret;
        return ret;
    }

    template <typename T>
    static std::shared_ptr<T> deepCopyShared(const T &data, IGameInfoCallback * cb = nullptr)
    {
        CMemorySerializer mem;
        mem.oser & data;
        mem.iser.cb = cb;

        std::shared_ptr<T> ret;
        mem.iser & ret;
        return ret;
    }
};
```

## 功能说明

CMemorySerializer是VCMI序列化系统中的内存序列化器实现，它将对象序列化到动态缓冲区中，从而支持对象的深拷贝操作。这个类实现了二进制读写接口，可以将对象序列化到内存中，然后再反序列化出来，从而实现对象的完全复制。

## 依赖关系

- [IBinaryReader](./IBinaryReader.md): 二进制读取接口
- [IBinaryWriter](./IBinaryWriter.md): 二进制写入接口
- [BinarySerializer](./BinarySerializer.md): 二进制序列化器
- [BinaryDeserializer](./BinaryDeserializer.md): 二进制反序列化器
- [IGameInfoCallback](../gameState/IGameInfoCallback.md): 游戏信息回调接口
- STL库: vector, byte, unique_ptr, shared_ptr

## 成员变量

- `buffer`: 存储序列化数据的字节向量
- `readPos`: 下一个要读取的字节的索引
- `iser`: 二进制反序列化器实例
- `oser`: 二进制序列化器实例

## 函数注释

### 构造函数
- `CMemorySerializer()`: 默认构造函数，初始化内存序列化器

### 读写操作
- `read(data, size)`: 从缓冲区读取指定数量的字节
- `write(data, size)`: 将指定数量的字节写入缓冲区

### 深拷贝
- `deepCopy(data, cb)`: 深拷贝对象并返回unique_ptr
- `deepCopyShared(data, cb)`: 深拷贝对象并返回shared_ptr

## 设计说明

这个类通过将对象序列化到内存缓冲区再反序列化的方式来实现深拷贝。这种设计特别适用于那些具有复杂内部状态的对象，因为序列化过程会递归地处理对象的所有成员，确保创建出完全独立的副本。两个序列化器(iser和oser)共享同一个缓冲区，一个用于写入，一个用于读取。