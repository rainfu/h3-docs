# Registry

## 概述

`Registry` 类是 VCMI 法术效果系统中的效果注册表系统，负责管理和创建各种法术效果实例。它提供了工厂模式接口，允许动态注册和实例化不同的效果类型。

## 类结构

### IEffectFactory 接口

```cpp
class DLL_LINKAGE IEffectFactory
{
public:
    virtual ~IEffectFactory() = default;
    virtual Effect * create() const = 0;
};
```

效果工厂的抽象接口，定义了创建效果实例的契约。

**公共方法：**

#### create

```cpp
virtual Effect * create() const = 0;
```

创建新的效果实例。

**返回值：**
- 新创建的效果对象指针

### Registry 类

```cpp
class DLL_LINKAGE Registry
{
public:
    using FactoryPtr = std::shared_ptr<IEffectFactory>;
    virtual ~Registry() = default;
    virtual const IEffectFactory * find(const std::string & name) const = 0;
    virtual void add(const std::string & name, FactoryPtr item) = 0;
};
```

效果注册表的抽象基类，定义了注册表的基本操作。

**公共类型定义：**

#### FactoryPtr

```cpp
using FactoryPtr = std::shared_ptr<IEffectFactory>;
```

效果工厂的智能指针类型。

**公共方法：**

#### find

```cpp
virtual const IEffectFactory * find(const std::string & name) const = 0;
```

根据名称查找效果工厂。

**参数：**
- `name`: 效果类型的名称标识符

**返回值：**
- 对应的效果工厂指针，如果未找到则返回 nullptr

#### add

```cpp
virtual void add(const std::string & name, FactoryPtr item) = 0;
```

向注册表添加效果工厂。

**参数：**
- `name`: 效果类型的名称标识符
- `item`: 效果工厂的智能指针

### GlobalRegistry 类

```cpp
class DLL_LINKAGE GlobalRegistry
{
public:
    static Registry * get();
};
```

全局注册表访问器，提供对全局效果注册表的访问。

**静态方法：**

#### get

```cpp
static Registry * get();
```

获取全局效果注册表的实例。

**返回值：**
- 全局注册表指针

### EffectFactory 模板类

```cpp
template<typename E>
class EffectFactory : public IEffectFactory
{
public:
    Effect * create() const override
    {
        return new E();
    }
};
```

模板化的效果工厂实现，为任意效果类型提供工厂功能。

**模板参数：**
- `E`: 具体的效果类型，必须继承自 `Effect`

**重写方法：**

#### create

```cpp
Effect * create() const override
```

创建指定类型的新效果实例。

**返回值：**
- 新创建的效果对象指针

## 使用模式

### 注册效果类型

```cpp
// 1. 创建注册表实例
Registry * registry = GlobalRegistry::get();

// 2. 为具体效果类型创建工厂
auto damageFactory = std::make_shared<EffectFactory<Damage>>();
auto healFactory = std::make_shared<EffectFactory<Heal>>();

// 3. 注册到全局注册表
registry->add("damage", damageFactory);
registry->add("heal", healFactory);
```

### 创建效果实例

```cpp
// 1. 查找效果工厂
const IEffectFactory * factory = registry->find("damage");

// 2. 创建效果实例
if (factory)
{
    Effect * effect = factory->create();
    // 使用效果...
    delete effect; // 记得释放内存
}
```

### 自定义注册表实现

```cpp
class CustomRegistry : public Registry
{
private:
    std::map<std::string, FactoryPtr> factories;

public:
    const IEffectFactory * find(const std::string & name) const override
    {
        auto it = factories.find(name);
        return (it != factories.end()) ? it->second.get() : nullptr;
    }

    void add(const std::string & name, FactoryPtr item) override
    {
        factories[name] = item;
    }
};
```

## 设计意图

`Registry` 系统提供了以下关键功能：

1. **解耦合**: 效果创建与具体类型解耦
2. **扩展性**: 易于添加新的效果类型
3. **配置化**: 支持基于字符串标识符的效果创建
4. **内存管理**: 使用智能指针管理工厂生命周期
5. **多态性**: 通过抽象工厂接口支持不同实现

## 相关类

- `Effect`: 效果系统的根基类
- `Damage`: 伤害效果实现
- `Heal`: 治疗效果实现
- 其他各种具体效果类

## 注意事项

- 工厂创建的对象需要手动释放内存
- 注册表查找操作应检查返回值是否为空
- 效果名称标识符应保持唯一性
- 全局注册表是线程安全的单例模式
- 模板工厂自动处理类型安全
- 支持运行时效果类型注册和创建