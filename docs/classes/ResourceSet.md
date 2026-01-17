<!-- 来源: E:\develop\heroes\vcmi\lib\ResourceSet.h -->
# ResourceSet类

ResourceSet类表示VCMI中的资源集合，支持各种资源类型的存储和操作。

## 类型定义

- `using TResource = int32_t`: 资源数量类型
- `using TResourceCap = int64_t`: 资源容量类型（避免溢出）
- `using TResources = ResourceSet`: 资源集合类型别名

## ResourceSet类

### 类定义
```cpp
class ResourceSet
```

### 构造函数
- `ResourceSet()`: 默认构造函数
- `ResourceSet(const ResourceSet& rhs)`: 拷贝构造函数

### JSON解析
- `void resolveFromJson(const JsonNode & node)`: 从JSON解析资源集合

## 算术运算符

### 标量运算符
- `ResourceSet& operator+=(const TResource &rhs)`: 加等于
- `ResourceSet& operator-=(const TResource &rhs)`: 减等于
- `ResourceSet& operator*=(const TResource &rhs)`: 乘等于
- `ResourceSet& operator/=(const TResource &rhs)`: 除等于

### 向量运算符
- `ResourceSet& operator+=(const ResourceSet &rhs)`: 向量加等于
- `ResourceSet& operator-=(const ResourceSet &rhs)`: 向量减等于

### 二元运算符
- `friend ResourceSet operator+(ResourceSet lhs, const TResource &rhs)`: 加法
- `friend ResourceSet operator-(ResourceSet lhs, const TResource &rhs)`: 减法
- `friend ResourceSet operator*(ResourceSet lhs, const TResource &rhs)`: 乘法
- `friend ResourceSet operator/(ResourceSet lhs, const TResource &rhs)`: 除法
- `friend ResourceSet operator+(ResourceSet lhs, const ResourceSet &rhs)`: 向量加法
- `friend ResourceSet operator-(ResourceSet lhs, const ResourceSet &rhs)`: 向量减法

## 数组式访问

### 运算符重载
- `TResource & operator[](GameResID index)`: 通过资源ID访问
- `const TResource & operator[](GameResID index) const`: 常量访问
- `TResource & operator[](size_t index)`: 通过索引访问
- `const TResource & operator[](size_t index) const`: 常量索引访问

## 容器接口

### 迭代器支持
- `auto begin()`: 开始迭代器
- `auto end()`: 结束迭代器
- `auto begin() const`: 常量开始迭代器
- `auto end() const`: 常量结束迭代器

### 容器信息
- `auto size() const`: 获取大小
- `bool empty() const`: 检查是否为空（所有资源为0）

## 特殊运算

### 购买能力计算
- `int operator/(const ResourceSet &rhs)`: 计算可购买数量
- `int maxPurchasableCount(const ResourceSet& availableFunds)`: 计算最大可购买数量

### 赋值运算符
- `ResourceSet & operator=(const TResource &rhs)`: 标量赋值
- `ResourceSet & operator=(const ResourceSet& rhs)`: 集合赋值

### 一元运算符
- `ResourceSet operator-() const`: 一元负号

### 比较运算符
- `bool operator==(const ResourceSet &rhs) const`: 相等比较

## 实用方法

### 资源操作
- `void amax(const TResourceCap &val)`: 对每个元素取最大值
- `void amin(const TResourceCap &val)`: 对每个元素取最小值
- `void positive()`: 将负值设为0
- `void applyHandicap(int percentage)`: 应用 handicap 百分比

### 检查方法
- `bool nonZero() const`: 检查是否有非零值
- `bool canAfford(const ResourceSet &price) const`: 检查是否能负担价格
- `bool canBeAfforded(const ResourceSet &res) const`: 检查是否能被资源负担

### 数值计算
- `TResourceCap marketValue() const`: 计算市场价值

### 字符串转换
- `std::string toString() const`: 转换为字符串

## 序列化支持

### 二进制序列化
- `template <typename Handler> void serialize(Handler &h)`: 序列化支持

### JSON序列化
- `void serializeJson(JsonSerializeFormat & handler, const std::string & fieldName)`: JSON序列化

## nziterator类

### 类定义
```cpp
class DLL_LINKAGE nziterator
```

非零资源迭代器，用于遍历非零资源。

### 嵌套结构体
```cpp
struct ResEntry
```
资源条目结构体。

**成员:**
- `GameResID resType`: 资源类型
- `TResourceCap resVal`: 资源值

### 主要方法
- `bool valid() const`: 检查是否有效
- `nziterator operator++()`: 前缀递增
- `nziterator operator++(int)`: 后缀递增
- `const ResEntry& operator*() const`: 解引用
- `const ResEntry* operator->() const`: 成员访问

## 设计特点

- 支持完整的向量算术运算
- 提供数组式和容器式访问接口
- 支持序列化和JSON转换
- 包含经济计算方法（购买能力等）
- 提供非零资源迭代器