<!-- 来源: E:\develop\heroes\vcmi\lib\ConditionalWait.h -->
# ConditionalWait头文件

ConditionalWait头文件定义了VCMI中条件等待和线程中断的辅助类。

## TerminationRequestedException类

### 类定义
```cpp
class TerminationRequestedException : public std::exception
```

### 主要方法
- `const char* what() const noexcept override`: 返回异常描述信息

**返回值:**
- "Thread termination requested"

## ThreadInterruption类

### 类定义
```cpp
class ThreadInterruption
```

### 主要方法

#### interruptionPoint
```cpp
void interruptionPoint()
```
检查中断请求，如果有则抛出异常。

**功能:**
- 检查并重置中断标志
- 如果中断被请求，抛出TerminationRequestedException

#### interruptThread
```cpp
void interruptThread()
```
请求中断线程。

**功能:**
- 设置中断标志为true

#### reset
```cpp
void reset()
```
重置中断状态。

**功能:**
- 将中断标志设置为false

### 私有成员
- `std::atomic<bool> interruptionRequested`: 原子中断请求标志

## ConditionalWait类

### 类定义
```cpp
class ConditionalWait
```

### 构造函数
- `ConditionalWait() = default`: 默认构造函数

### 主要方法

#### 状态设置
- `void setBusy()`: 设置为忙碌状态
- `void setFree()`: 设置为空闲状态并通知所有等待者

#### 终止控制
- `void requestTermination()`: 请求终止

#### 状态查询
- `bool isBusy()`: 检查是否忙碌

#### 等待
- `void waitWhileBusy()`: 等待直到不忙碌

**功能:**
- 如果正在终止，抛出TerminationRequestedException

### 私有方法
- `void set(bool value)`: 设置忙碌状态

### 私有成员
- `bool isBusyValue`: 忙碌状态标志
- `bool isTerminating`: 终止标志
- `std::condition_variable cond`: 条件变量
- `std::mutex mx`: 互斥锁

## 设计特点

- 使用条件变量实现线程安全的等待机制
- 支持优雅的线程终止
- 提供原子操作的中断检查点