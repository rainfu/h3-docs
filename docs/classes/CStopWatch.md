<!-- 来源: E:\develop\heroes\vcmi\lib\CStopWatch.h -->
# CStopWatch类

CStopWatch类是VCMI中的简单计时器类，用于测量代码执行时间。

## 类定义
```cpp
class CStopWatch
```

## 构造函数
```cpp
CStopWatch()
```
构造函数，初始化开始时间和最后检查时间。

## 主要方法

### getDiff
```cpp
si64 getDiff()
```
获取从上次调用到现在的毫秒差值。

**返回值:**
- 从上次调用到现在的毫秒数

**功能:**
- 更新最后检查时间
- 返回时间差

### update
```cpp
void update()
```
更新最后检查时间到当前时间。

### remember
```cpp
void remember()
```
记住当前时间点。

### memDif
```cpp
si64 memDif()
```
获取从记住的时间点到现在的毫秒差值。

**返回值:**
- 从记住的时间点到现在的毫秒数

## 私有方法

### clock
```cpp
si64 clock()
```
获取当前时钟值。

**平台相关:**
- FreeBSD/OpenBSD: 使用`getrusage`获取用户+系统CPU时间
- 其他平台: 使用`std::clock()`

## 私有成员
- `si64 start`: 开始时间
- `si64 last`: 最后检查时间
- `si64 mem`: 记住的时间点

## 宏定义

### TO_MS_DIVISOR
时间转换为毫秒的除数。

**平台相关:**
- FreeBSD/OpenBSD: 1000
- 其他平台: `CLOCKS_PER_SEC / 1000`

## 设计特点

- 提供简单的性能测量功能
- 支持跨平台时间获取
- 内存开销小，适合频繁使用