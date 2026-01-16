# Entity基类

Entity基类是VCMI中所有游戏实体的基类。

## 类定义

```cpp
class DLL_LINKAGE Entity : boost::noncopyable
{
public:
    using IconRegistar = std::function<void(int32_t index, int32_t group, const std::string & listName, const std::string & imageName)>;

    virtual ~Entity() = default;

    virtual int32_t getIndex() const = 0;
    virtual int32_t getIconIndex() const = 0;
    virtual std::string getJsonKey() const = 0;
    virtual std::string getModScope() const = 0;
    virtual std::string getNameTranslated() const = 0;
    virtual std::string getNameTextID() const = 0;

    virtual void registerIcons(const IconRegistar & cb) const = 0;
};
```

## 功能说明

Entity是VCMI中所有游戏实体的基类，提供了游戏实体的基本属性和功能。它定义了所有实体都应该具备的基本特征，如索引、图标索引、JSON键名、模组作用域、名称等。该类不可复制，确保了实体实例的唯一性。

## 依赖关系

- Boost库: noncopyable
- STL库: function, string

## 类型别名

- `IconRegistar`: 图标注册器类型，用于注册实体的图标

## 函数注释

- `~Entity()`: 虚析构函数
- `getIndex()`: 获取实体的索引
- `getIconIndex()`: 获取实体图标的索引
- `getJsonKey()`: 获取实体的JSON键名
- `getModScope()`: 获取实体所属的模组作用域
- `getNameTranslated()`: 获取翻译后的实体名称
- `getNameTextID()`: 获取实体名称的文本ID
- `registerIcons(cb)`: 使用提供的回调函数注册实体的图标