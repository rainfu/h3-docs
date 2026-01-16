# CTypeList类

CTypeList类是VCMI中实现类似反射机制的类，为每种通过registerType()注册的类型生成继承树。

## 类定义

```cpp
/// Class that implements basic reflection-like mechanisms
/// For every type registered via registerType() generates inheritance tree
/// Rarely used directly - usually used as part of CApplier
class CTypeList
{
    std::map<std::string, uint16_t> typeInfos;

    DLL_LINKAGE CTypeList();

    template <typename T>
    const std::type_info & getTypeInfo(const T * t = nullptr) const
    {
        if(t)
            return typeid(*t);
        else
            return typeid(T);
    }

public:
    static CTypeList & getInstance()
    {
        static CTypeList registry;
        return registry;
    }

    template<typename T>
    void registerType(uint16_t index)
    {
        const std::type_info & typeInfo = typeid(T);

        if (typeInfos.count(typeInfo.name()) != 0)
            return;

        typeInfos[typeInfo.name()] = index;
    }

    template<typename T>
    uint16_t getTypeID(T * typePtr)
    {
        static_assert(!std::is_pointer_v<T>, "CTypeList does not Supports pointers!");
        static_assert(!std::is_reference_v<T>, "CTypeList does not Supports references!");

        const std::type_info & typeInfo = getTypeInfo(typePtr);

        if (typeInfos.count(typeInfo.name()) == 0)
            return 0;

        return typeInfos.at(typeInfo.name());
    }
};
```

## 功能说明

CTypeList是VCMI序列化系统中实现基本反射机制的类，用于在运行时获取类型信息。它为通过registerType()注册的每种类型生成继承树，主要用于序列化系统中的类型识别。这个类很少直接使用，通常作为CApplier的一部分使用。

## 依赖关系

- STL库: map, string, typeinfo
- C++标准库: type_traits

## 成员变量

- `typeInfos`: 存储类型信息的映射，键为类型名称，值为类型ID

## 函数注释

### 单例获取
- `getInstance()`: 获取CTypeList的单例实例

### 类型注册
- `registerType(index)`: 注册指定类型的索引ID，如果类型已存在则不做任何操作

### 类型ID获取
- `getTypeID(typePtr)`: 根据类型指针获取其注册的类型ID，如果未注册则返回0

### 内部辅助函数
- `getTypeInfo(t)`: 获取类型信息，如果提供了指针则获取实际对象的类型信息，否则获取模板参数的类型信息

## 设计说明

CTypeList使用了单例模式，确保整个程序中只有一个类型注册表。该类通过typeid操作符获取类型信息，并将其与用户提供的索引ID关联起来。当获取类型ID时，它会根据类型名称查找相应的ID。该类不支持指针和引用类型，通过static_assert在编译时进行检查。