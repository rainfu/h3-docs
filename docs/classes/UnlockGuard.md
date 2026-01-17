<!-- 来源: E:\develop\heroes\vcmi\lib\UnlockGuard.h -->
# UnlockGuard头文件

UnlockGuard头文件定义了用于临时解锁互斥量的RAII守卫类，类似于std::lock_guard但用于解锁操作。

## vstd命名空间

### unlock_policy模板类

#### 类定义
```cpp
template<typename Mutex>
class unlock_policy
```

#### 保护方法
- `void unlock(Mutex &m)`: 解锁互斥量
- `void lock(Mutex &m)`: 锁定互斥量

### unlock_shared_policy模板类

#### 类定义
```cpp
template<typename Mutex>
class unlock_shared_policy
```

#### 保护方法
- `void unlock(Mutex &m)`: 解锁共享互斥量
- `void lock(Mutex &m)`: 锁定共享互斥量

## unlock_guard模板类

### 类定义
```cpp
template<typename Mutex, typename LockingPolicy = detail::unlock_policy<Mutex> >
class unlock_guard : LockingPolicy
```

### 构造函数
- `explicit unlock_guard(Mutex& m_)`: 构造时解锁互斥量
- `unlock_guard()`: 默认构造函数
- `unlock_guard(unlock_guard &&other)`: 移动构造函数

### 主要方法
- `void release()`: 释放互斥量所有权

### 析构函数
- `~unlock_guard()`: 析构时重新锁定互斥量

## 辅助函数

### makeUnlockGuard函数
```cpp
template<typename Mutex>
unlock_guard<Mutex, detail::unlock_policy<Mutex> > makeUnlockGuard(Mutex &m_)
```
创建解锁守卫。

### makeUnlockSharedGuard函数
```cpp
template<typename Mutex>
unlock_guard<Mutex, detail::unlock_shared_policy<Mutex> > makeUnlockSharedGuard(Mutex &m_)
```
创建共享解锁守卫。

## 类型别名

- `using unlock_shared_guard = unlock_guard<std::shared_mutex, detail::unlock_shared_policy<std::shared_mutex>>`: 共享解锁守卫类型别名

## 设计特点

- RAII机制确保解锁后自动重新锁定
- 支持普通互斥量和共享互斥量
- 提供便捷的创建函数
- 防止拷贝构造和赋值，确保单一所有权