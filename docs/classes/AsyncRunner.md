<!-- 来源: E:\develop\heroes\vcmi\lib\AsyncRunner.h -->
# AsyncRunner类

AsyncRunner类是VCMI中使用TBB线程池执行异步任务的辅助类。

## 类定义
```cpp
class AsyncRunner : boost::noncopyable
```

## 主要方法

### run
```cpp
template<typename Functor>
void run(Functor && f)
```
异步运行提供的函数对象。

**参数:**
- `f`: 要异步执行的函数对象

**功能:**
- 使用TBB工作线程池异步执行任务
- 任务会被添加到任务组中等待执行

### wait
```cpp
void wait()
```
等待所有之前入队的任务完成。

**功能:**
- 阻塞当前线程直到所有任务完成
- 可重入 - 等待任务不会阻止提交新任务

## 析构函数
```cpp
~AsyncRunner()
```
在销毁时自动等待所有任务完成。

## 私有成员
- `tbb::task_arena arena`: TBB任务竞技场
- `tbb::task_group taskGroup`: TBB任务组

## 设计特点

- 使用TBB库提供高效的线程池管理
- 自动等待机制确保资源安全释放
- 支持任意可调用对象的异步执行