<!-- 来源: E:\develop\heroes\vcmi\lib\FunctionList.h -->
# CFunctionList模板类

CFunctionList模板类用于管理具有相同签名的函数列表，可以方便地调用所有函数。

## 类定义
```cpp
template<typename Signature>
class CFunctionList
```

## 构造函数

### 默认构造函数
```cpp
CFunctionList()
```
创建空的函数列表。

### nullptr构造函数
```cpp
CFunctionList(std::nullptr_t)
```
创建空的函数列表。

### int构造函数
```cpp
CFunctionList(int)
```
创建空的函数列表。

### 函数对象构造函数
```cpp
template <typename Functor>
CFunctionList(const Functor &f)
```
从函数对象创建函数列表。

**参数:**
- `f`: 函数对象

### std::function构造函数
```cpp
CFunctionList(const std::function<Signature> &first)
```
从std::function创建函数列表。

**参数:**
- `first`: 第一个函数

## 主要方法

### operator+=
```cpp
CFunctionList & operator+=(const CFunctionList<Signature> &first)
```
添加另一个函数列表的所有函数。

**参数:**
- `first`: 要添加的函数列表

**返回值:**
- 自身引用，支持链式调用

### clear
```cpp
void clear()
```
清空所有函数。

### operator bool
```cpp
operator bool() const
```
检查函数列表是否为空。

**返回值:**
- 如果列表不为空则返回true

### operator()
```cpp
template <typename... Args>
void operator()(Args ... args) const
```
调用所有函数。

**参数:**
- `args`: 传递给函数的参数

**功能:**
- 创建函数列表的副本
- 依次调用每个函数
- 跳过空函数指针

## 私有成员
- `std::vector<std::function<Signature>> funcs`: 函数列表

## 设计特点

- 支持任意函数签名
- 线程安全的调用（使用副本）
- 支持函数对象的隐式转换
- 提供便捷的合并操作
- 自动跳过无效函数