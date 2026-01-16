# JsonTreeSerializer类

JsonTreeSerializer类是VCMI中JSON树序列化器的模板基类，继承自JsonSerializeFormat。

## 类定义

```cpp
template <typename T>
class JsonTreeSerializer : public JsonSerializeFormat
{
public:
    const JsonNode & getCurrent() override
    {
        return * currentObject;
    }

protected:
    T currentObject;
    std::vector<T> treeRoute;

    JsonTreeSerializer(const IInstanceResolver * instanceResolver_, T root, const bool saving_, const bool updating_):
        JsonSerializeFormat(instanceResolver_, saving_, updating_),
        currentObject(root)
    {
    }

    void pop() override
    {
        assert(!treeRoute.empty());
        currentObject = treeRoute.back();
        treeRoute.pop_back();
    }

    void pushStruct(const std::string & fieldName) override
    {
        pushObject(fieldName);
    }

    void pushArray(const std::string & fieldName) override
    {
        pushObject(fieldName);
    }

    void pushArrayElement(const size_t index) override
    {
        pushObject(&(currentObject->Vector().at(index)));
    }

    void pushField(const std::string & fieldName) override
    {
        pushObject(fieldName);
    }

private:
    void pushObject(const std::string & fieldName)
    {
        pushObject(&(currentObject->operator[](fieldName)));
    }

    void pushObject(T newCurrentObject)
    {
        treeRoute.push_back(currentObject);
        currentObject = newCurrentObject;
    }
};
```

## 功能说明

JsonTreeSerializer是VCMI序列化系统中处理JSON树结构的模板基类，继承自JsonSerializeFormat。它提供了在JSON树中导航和操作的通用功能，支持嵌套结构、数组和字段的访问。这个模板类是JsonSerializer和JsonDeserializer的共同基类，通过模板参数T来区分读取和写入操作。

## 模板参数

- `T`: JSON节点指针的类型，可以是指向JsonNode的指针(JsonNode *)或指向const JsonNode的指针(const JsonNode *)

## 依赖关系

- [JsonSerializeFormat](./JsonSerializeFormat.md): JSON序列化格式基类
- [JsonNode](../json/JsonNode.md): JSON节点类型
- [IInstanceResolver](./IInstanceResolver.md): 实例解析器接口
- STL库: vector, string

## 成员变量

- `currentObject`: 当前操作的JSON节点
- `treeRoute`: 树路径的栈，用于跟踪当前节点的父节点

## 函数注释

### 公共方法
- `getCurrent()`: 获取当前JSON节点的引用

### 受保护方法
- `JsonTreeSerializer(instanceResolver_, root, saving_, updating_)`: 构造函数，初始化实例解析器、根节点和操作标志
- `pop()`: 弹出当前节点，返回到父节点
- `pushStruct(fieldName)`: 推入结构体到序列化栈
- `pushArray(fieldName)`: 推入数组到序列化栈
- `pushArrayElement(index)`: 推入数组元素到序列化栈
- `pushField(fieldName)`: 推入字段到序列化栈

### 私有方法
- `pushObject(fieldName)`: 根据字段名推入对象
- `pushObject(newCurrentObject)`: 推入新的当前对象到栈中