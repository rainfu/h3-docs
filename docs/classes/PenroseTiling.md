<!-- 来源: E:\develop\heroes\vcmi\lib\rmg\PenroseTiling.h -->
# PenroseTiling头文件

PenroseTiling头文件定义了VCMI中彭罗斯铺砖算法的实现，用于生成非周期性图案的地图区域。

## Point2D类

### 类定义
```cpp
class Point2D : public model::d2::point_xy<float>
```

### 运算符重载
- `Point2D operator*(float scale) const`: 缩放
- `Point2D operator/(float scale) const`: 除法
- `Point2D operator+(const Point2D& other) const`: 加法
- `Point2D operator-(const Point2D& other) const`: 减法
- `Point2D rotated(float radians) const`: 旋转
- `bool operator<(const Point2D& other) const`: 小于比较
- `bool operator==(const Point2D& other) const`: 相等比较

### 工具方法
- `std::string toString() const`: 转换为字符串

## Triangle类

### 类定义
```cpp
class Triangle
```

### 成员变量
- `const bool tiling`: 铺砖标志
- `TIndices indices`: 索引数组
- `std::vector<Triangle *> subTriangles`: 子三角形列表

### 构造函数
- `Triangle(bool t_123, const TIndices & inds)`: 构造函数

### 析构函数
- `~Triangle()`: 析构函数

## PenroseTiling类

### 类定义
```cpp
class PenroseTiling
```

### 常量定义
- `const float PHI`: 黄金比例
- `const uint32_t POLY`: 对称数量
- `const float BASE_SIZE`: 基础大小
- `const uint32_t DEPTH`: 递归深度
- `const bool P2`: 铺砖类型

### 主要方法
- `std::set<Point2D> generatePenroseTiling(size_t numZones, vstd::RNG * rand)`: 生成彭罗斯铺砖

### 私有方法
- `void split(Triangle& p, std::vector<Point2D>& points, std::array<std::vector<uint32_t>, 5>& indices, uint32_t depth)`: 递归分割三角形

## 工具函数

### rotatePoint函数
```cpp
Point2D rotatePoint(const Point2D& point, double radians, const Point2D& origin)
```
绕指定原点旋转点。

## 设计特点

- 实现彭罗斯铺砖算法生成非周期性图案
- 支持递归分割生成复杂几何结构
- 提供二维几何变换和操作
- 用于创建自然-looking的地图区域分布