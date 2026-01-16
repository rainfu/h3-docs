# Serializeable

序列化基类，所有可序列化类的基类。

## 📋 类概述

`Serializeable` 是 VCMI 中所有可序列化类的基类。它是一个标记类（tag class），本身不包含任何数据成员或方法，只是作为类型标识符使用。通过继承自 `Serializeable`，类可以被序列化系统识别和处理。

## 🔧 主要属性

此类为纯虚基类，不包含任何数据成员。

## 🎯 核心方法

### 析构函数
```cpp
virtual ~Serializeable() = default;
```

## 🔗 依赖关系

- **基类**：无
- **派生类**：大量 VCMI 核心类都继承自此基类
- **关联模块**：serializer/

## 💡 使用示例

```cpp
// 继承自 Serializeable 的类示例
class MyClass : public Serializeable
{
    // 类实现
};

// 在序列化时使用
void serialize(CSerializer & s, const int version)
{
    // Serializeable 派生类可以被序列化
    s & mySerializeableObject;
}
```

## 📝 实现说明

- **标记类设计**：使用空基类作为类型标签，避免虚函数表开销
- **多态序列化**：支持通过基类指针序列化派生类对象
- **类型安全**：编译时类型检查，确保只有标记类才能被序列化

## 🔍 相关类

- **CSerializer**：序列化器基类
- **IBinaryReader**：二进制读取器接口
- **IBinaryWriter**：二进制写入器接口