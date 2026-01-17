<!-- 来源: E:\develop\heroes\vcmi\lib\Point.h -->
# Point类

Point类表示VCMI中的二维坐标点，主要用于图形渲染。

## 类定义
```cpp
class Point
```

## 成员变量
- `int x`: X坐标
- `int y`: Y坐标

## 构造函数
- `constexpr Point()`: 默认构造函数，初始化为(0,0)
- `constexpr Point(int X, int Y)`: 指定坐标构造函数
- `explicit DLL_LINKAGE Point(const int3 &a)`: 从int3构造（仅取x,y分量）

## 静态方法
- `constexpr static Point makeInvalid()`: 创建无效点（使用最小int值）

## 算术运算符

### 二元运算符
- `template<typename T> constexpr Point operator+(const T &b) const`: 加法
- `template<typename T> constexpr Point operator-(const T &b) const`: 减法
- `template<typename T> constexpr Point operator*(const T &mul) const`: 标量乘法
- `template<typename T> constexpr Point operator/(const T &div) const`: 标量除法
- `constexpr Point operator*(const Point &b) const`: 逐元素乘法
- `constexpr Point operator/(const Point &b) const`: 逐元素除法

### 一元运算符
- `constexpr Point operator-() const`: 一元负号

### 复合赋值运算符
- `template<typename T> constexpr Point& operator+=(const T &b)`: 加等于
- `template<typename T> constexpr Point& operator-=(const T &b)`: 减等于

### 比较运算符
- `template<typename T> constexpr bool operator==(const T &t) const`: 相等比较
- `template<typename T> constexpr bool operator!=(const T &t) const`: 不等比较

## 主要方法

### 验证方法
- `constexpr bool isValid() const`: 检查是否有效（坐标不等于最小int值）

### 几何方法
- `constexpr int lengthSquared() const`: 计算平方长度
- `int length() const`: 计算长度
- `double angle() const`: 计算角度（弧度）

## 序列化支持
- `template <typename Handler> void serialize(Handler &h)`: 序列化支持

## 设计特点

- 提供完整的二维向量运算
- 支持模板化的运算符重载
- 包含几何计算方法
- 适用于图形渲染和UI布局