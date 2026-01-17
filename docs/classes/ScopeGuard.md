<!-- 来源: E:\develop\heroes\vcmi\lib\ScopeGuard.h -->
# ScopeGuard头文件

ScopeGuard头文件定义了VCMI中的作用域守卫类，用于确保在作用域结束时执行清理操作。

## vstd命名空间

### ScopeGuard模板类

#### 类定义
```cpp
template<typename Func>
class ScopeGuard
```

#### 构造函数
- `ScopeGuard(ScopeGuard &&other)`: 移动构造函数
- `explicit ScopeGuard(Func && f)`: 构造带函数的作用域守卫

#### 析构函数
```cpp
~ScopeGuard()
```
在作用域结束时执行函数（如果fire为true）。

#### 私有成员
- `bool fire`: 是否执行函数的标志
- `Func f`: 要执行的函数

#### 私有方法（禁用）
- `explicit ScopeGuard(ScopeGuard&)`: 禁用拷贝构造函数
- `ScopeGuard& operator=(ScopeGuard&)`: 禁用赋值运算符

### makeScopeGuard函数

#### 函数定义
```cpp
template <typename Func>
ScopeGuard<Func> makeScopeGuard(Func&& exitScope)
```

#### 参数
- `exitScope`: 作用域结束时要执行的函数

#### 返回值
- ScopeGuard对象

#### 功能
- 创建作用域守卫的便捷函数
- 支持完美转发

## 设计特点

- 实现RAII（Resource Acquisition Is Initialization）模式
- 确保资源清理或回滚操作在作用域结束时执行
- 支持移动语义
- 禁用拷贝以避免意外行为
- 提供便捷的创建函数