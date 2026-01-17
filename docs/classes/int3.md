<!-- 来源: E:\develop\heroes\vcmi\lib\int3.h -->
# int3类

int3类表示三维整数坐标，主要用于冒险地图上的位置表示。

## 类定义
```cpp
class int3
```

## 成员变量
- `si32 x`: X坐标
- `si32 y`: Y坐标  
- `si32 z`: Z坐标（层级）

## 构造函数
- `constexpr int3()`: 默认构造函数，初始化为(0,0,0)
- `explicit constexpr int3(const si32 i)`: 从单个值构造，所有坐标设为i
- `constexpr int3(const si32 X, const si32 Y, const si32 Z)`: 指定XYZ坐标构造
- `constexpr int3(const int3 & c) = default`: 拷贝构造函数

## 运算符重载

### 算术运算符
- `constexpr int3 operator-() const`: 一元负号
- `constexpr int3 operator+(const int3 & i) const`: 加法
- `constexpr int3 operator-(const int3 & i) const`: 减法
- `constexpr int3 operator+(const si32 i) const`: 标量加法
- `constexpr int3 operator-(const si32 i) const`: 标量减法
- `constexpr int3 operator*(const double i) const`: 浮点乘法
- `constexpr int3 operator/(const double i) const`: 浮点除法
- `constexpr int3 operator*(const si32 i) const`: 整数乘法
- `constexpr int3 operator/(const si32 i) const`: 整数除法

### 复合赋值运算符
- `constexpr int3 & operator+=(const int3 & i)`: 加等于
- `constexpr int3 & operator-=(const int3 & i)`: 减等于
- `constexpr int3 & operator+=(const si32 i)`: 标量加等于
- `constexpr int3 & operator-=(const si32 i)`: 标量减等于

### 比较运算符
- `constexpr bool operator==(const int3 & i) const`: 相等比较
- `constexpr bool operator!=(const int3 & i) const`: 不等比较
- `constexpr bool operator<(const int3 & i) const`: 小于比较（按z,y,x顺序）

## 距离计算

### 距离公式枚举
```cpp
enum EDistanceFormula
```
- `DIST_2D`: 二维欧几里得距离
- `DIST_MANHATTAN`: 曼哈顿距离（巡逻距离）
- `DIST_CHEBYSHEV`: 切比雪夫距离（环境音效距离）
- `DIST_2DSQ`: 二维平方距离

### 距离方法
- `ui32 dist(const int3 & o, EDistanceFormula formula) const`: 计算距离
- `constexpr ui32 dist2dSQ(const int3 & o) const`: 二维平方距离
- `double dist2d(const int3 & o) const`: 二维欧几里得距离
- `constexpr double mandist2d(const int3 & o) const`: 二维曼哈顿距离
- `constexpr double chebdist2d(const int3 & o) const`: 二维切比雪夫距离

## 其他方法
- `constexpr bool areNeighbours(const int3 & o) const`: 检查是否为邻居
- `std::string toString() const`: 转换为字符串"(x y z)"
- `constexpr bool isValid() const`: 检查是否有效（z >= 0）

## 静态方法
- `constexpr static std::array<int3, 8> getDirs()`: 获取8个方向的偏移量

## 序列化支持
- `template <typename Handler> void serialize(Handler &h)`: 序列化支持

## 哈希支持
- `friend std::size_t hash_value(const int3& v)`: 哈希值计算
- `std::hash`特化：支持用作unordered容器键

## 工具函数
- `template<typename Container> int3 findClosestTile(Container & container, int3 dest)`: 在容器中查找最接近目标的瓦片

## 设计特点

- 提供完整的三维坐标运算
- 支持多种距离计算公式
- 适用于地图导航和位置计算
- 高效的哈希函数支持快速查找