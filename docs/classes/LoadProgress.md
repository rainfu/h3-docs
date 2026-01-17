<!-- 来源: E:\develop\heroes\vcmi\lib\LoadProgress.h -->
# LoadProgress头文件

LoadProgress头文件定义了VCMI中加载进度跟踪的类和函数。

## Load命名空间

### 类型定义
- `using Type = unsigned char`: 进度类型

## Progress类

### 类定义
```cpp
class DLL_LINKAGE Progress
```

### 构造函数
- `Progress()`: 默认构造函数，步骤数为100
- `Progress(int steps)`: 指定步骤数的构造函数
- `virtual ~Progress() = default`: 虚析构函数

### 主要方法

#### 获取状态
- `Type get() const`: 获取当前进度状态
- `bool finished() const`: 检查是否完成

#### 设置状态
- `void set(Type)`: 设置当前状态
- `void reset(int steps = 100)`: 重置进度
- `void finish()`: 立即完成进度
- `void setupSteps(int steps)`: 设置步骤数
- `void setupStepsTill(int steps, Type state)`: 设置到达指定状态的步骤数

#### 进度更新
- `void step(int count = 1)`: 增加进度步骤

### 私有成员
- `std::atomic<Type> _progress`: 当前进度
- `std::atomic<Type> _target`: 目标进度
- `std::atomic<int> _step`: 当前步骤
- `std::atomic<int> _maxSteps`: 最大步骤数

## ProgressAccumulator类

### 类定义
```cpp
class DLL_LINKAGE ProgressAccumulator
```

### 构造函数
- `ProgressAccumulator() = default`: 默认构造函数

### 主要方法

#### 管理进度
- `void include(const Progress &)`: 包含进度
- `void exclude(const Progress &)`: 排除进度

#### 获取状态
- `bool finished() const`: 检查是否完成
- `Type get() const`: 获取累积进度

### 私有成员
- `mutable std::mutex _mx`: 互斥锁
- `long long _accumulated`: 累积值
- `long long _steps`: 步骤数
- `std::vector<std::reference_wrapper<const Progress>> _progress`: 进度引用列表

## 设计特点

- 使用原子操作支持多线程访问
- 支持进度累积和组合
- 提供灵活的进度跟踪机制
- 适用于长时间运行的操作进度显示