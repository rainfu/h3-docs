<!-- 来源: E:\develop\heroes\vcmi\lib\rmg\float3.h -->
# float3头文件

float3头文件定义了VCMI中随机地图生成器使用的三维浮点坐标类，表示RMG虚拟(0;1)区域中的位置。

## float3类

### 类定义
```cpp
class float3
```

### 成员变量
- `float x`: X坐标
- `float y`: Y坐标
- `si32 z`: Z坐标（层级）

### 构造函数
- `float3()`: 默认构造函数，初始化为(0,0,0)
- `float3(const float X, const float Y, const si32 Z)`: 带参数构造函数
- `float3(const float3 & copy)`: 拷贝构造函数

### 赋值运算符
- `float3 & operator=(const float3 & copy)`: 赋值运算符

### 算术运算符

#### 加法运算
- `float3 operator+(const float3 & i) const`: 向量加法
- `float3 operator+(const float i) const`: 标量加法

#### 减法运算
- `float3 operator-(const float3 & i) const`: 向量减法
- `float3 operator-(const float i) const`: 标量减法
- `float3 operator-() const`: 取反

#### 乘法和除法运算
- `float3 operator*(const float i) const`: 标量乘法
- `float3 operator/(const float i) const`: 标量除法

### 复合赋值运算符
- `float3& operator+=(const float3 & i)`: 向量加法赋值
- `float3& operator+=(const float & i)`: 标量加法赋值
- `float3& operator-=(const float3 & i)`: 向量减法赋值
- `float3& operator-=(const float & i)`: 标量减法赋值
- `float3& operator*=(const float & i)`: 标量乘法赋值
- `float3& operator/=(const float & i)`: 标量除法赋值

### 几何方法
- `double dist2dSQ(const float3 & o) const`: 计算二维平方距离（不使用z坐标）
- `double mag() const`: 计算二维向量长度
- `float3 unitVector() const`: 返回单位向量
- `double dist2d(const float3 &other) const`: 计算二维距离
- `bool areNeighbours(const float3 &other) const`: 检查是否为邻居（距离<4.0且同层）

### 工具方法
- `std::string toString() const`: 转换为字符串表示
- `bool valid() const`: 检查坐标是否有效（z >= 0）

### 序列化支持
- `template <typename Handler> void serialize(Handler &h, const float version)`: 序列化方法

## Shashfloat3结构体

### 结构体定义
```cpp
struct Shashfloat3
```

### 哈希函数
- `size_t operator()(float3 const& pos) const`: 为float3提供哈希函数

## 设计特点

- 专门为随机地图生成器设计的三维坐标类
- 支持完整的向量运算和几何计算
- 主要用于二维平面计算（z坐标用于层级区分）
- 提供哈希函数支持，可作为unordered_map的键使用
- 包含邻居检查等地图生成相关功能