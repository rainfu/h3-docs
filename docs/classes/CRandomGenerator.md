<!-- 来源: E:\develop\heroes\vcmi\lib\CRandomGenerator.h -->
# CRandomGenerator类

CRandomGenerator类是VCMI中用于游戏随机化的随机数生成器，基于std::minstd_rand实现。

## 类型定义

- `TGenerator = std::minstd_rand`: 随机数生成器类型
- `TIntDist = std::uniform_int_distribution<int>`: 整数分布类型
- `TInt64Dist = std::uniform_int_distribution<int64_t>`: 64位整数分布类型
- `TRealDist = std::uniform_real_distribution<double>`: 实数分布类型

## CRandomGenerator类

### 类定义
```cpp
class DLL_LINKAGE CRandomGenerator final : public vstd::RNG, boost::noncopyable, public Serializeable
```

### 构造函数
- `CRandomGenerator()`: 默认构造函数，使用时间和线程ID作为种子
- `CRandomGenerator(int seed)`: 指定种子构造函数

### 种子管理
- `void setSeed(int seed)`: 设置种子
- `void resetSeed()`: 重置种子为默认值

### 整数生成

#### 范围生成
- `int nextInt(int upper) override`: 生成0到upper之间的整数
- `int64_t nextInt64(int64_t upper) override`: 生成0到upper之间的64位整数
- `int nextInt(int lower, int upper) override`: 生成lower到upper之间的整数
- `int64_t nextInt64(int64_t lower, int64_t upper) override`: 生成lower到upper之间的64位整数

#### 无范围生成
- `int nextInt() override`: 生成0到最大值之间的整数

#### 特殊分布
- `int nextBinomialInt(int coinsCount, double coinChance) override`: 生成二项分布随机数

### 实数生成
- `double nextDouble(double upper) override`: 生成0到upper之间的实数
- `double nextDouble(double lower, double upper) override`: 生成lower到upper之间的实数

### 静态方法
- `static CRandomGenerator & getDefault()`: 获取线程本地默认随机数生成器

### 序列化支持
- `template <typename Handler> void serialize(Handler & h)`: 序列化随机数生成器状态

### 私有成员
- `TGenerator rand`: 内部随机数生成器

## 设计特点

- 使用minstd_rand以减少保存游戏文件的大小
- 非线程安全，每个实例独立
- 支持序列化以便游戏存档
- 提供线程本地的默认实例