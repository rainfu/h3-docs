# CDefaultObjectTypeHandler

## 源文件

[CDefaultObjectTypeHandler.h](https://github.com/vcmi/vcmi/blob/master/lib/mapObjectConstructors/CDefaultObjectTypeHandler.h)

## 类定义

```cpp
template<class ObjectType>
class CDefaultObjectTypeHandler : public AObjectTypeHandler
```

`CDefaultObjectTypeHandler` 是一个模板类，作为多个对象构造函数的基础类。它继承自 `AObjectTypeHandler` 并实现了其纯虚函数。

## 继承关系

- 继承自 `AObjectTypeHandler`

## 模板参数

- `ObjectType` - 要创建的对象类型，必须是 `CGObjectInstance` 的子类

## 方法

### 实现的虚函数

- `void configureObject(CGObjectInstance * object, IGameRandomizer & gameRandomizer) const final` - 配置对象，调用随机化方法
- `std::shared_ptr<CGObjectInstance> create(IGameInfoCallback * cb, std::shared_ptr<const ObjectTemplate> tmpl) const final` - 创建对象实例

### 受保护的虚方法（供子类重写）

- `virtual void initializeObject(ObjectType * object) const` - 初始化对象（默认空实现）
- `virtual void randomizeObject(ObjectType * object, IGameRandomizer & gameRandomizer) const` - 随机化对象属性（默认空实现）
- `virtual std::shared_ptr<ObjectType> createObject(IGameInfoCallback * cb) const` - 创建对象实例（默认使用 `std::make_shared<ObjectType>(cb)`）

## 设计特点

- **模板类**: 使用模板参数指定要处理的对象类型
- **默认实现**: 为 `AObjectTypeHandler` 的纯虚函数提供默认实现
- **可扩展性**: 通过虚方法允许子类自定义初始化和随机化行为
- **类型安全**: 使用 `dynamic_cast` 确保对象类型正确
- **工厂模式**: 封装了对象创建、初始化和配置的逻辑