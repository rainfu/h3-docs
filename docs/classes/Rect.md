<!-- 来源: E:\develop\heroes\vcmi\lib\Rect.h -->
# Rect类

Rect类表示VCMI中的矩形，具有位置和尺寸。

## 类定义
```cpp
class Rect
```

## 成员变量
- `int x`: 左上角X坐标
- `int y`: 左上角Y坐标
- `int w`: 宽度
- `int h`: 高度

## 构造函数
- `Rect()`: 默认构造函数，初始化为(-1,-1,-1,-1)
- `Rect(int X, int Y, int W, int H)`: 指定坐标和尺寸构造函数
- `Rect(const Point & position, const Point & size)`: 从位置点和尺寸点构造
- `Rect(const Rect& r) = default`: 拷贝构造函数

## 静态方法
- `static Rect createCentered(const Point & around, const Point & size)`: 创建居中于点的矩形
- `static Rect createCentered(const Rect & target, const Point & size)`: 创建居中于矩形的矩形
- `static Rect createAround(const Rect &r, int borderWidth)`: 创建围绕矩形的边框矩形

## 位置和尺寸方法

### 边界方法
- `int top() const`: 上边界
- `int bottom() const`: 下边界
- `int left() const`: 左边界
- `int right() const`: 右边界

### 角点方法
- `Point topLeft() const`: 左上角
- `Point topRight() const`: 右上角
- `Point bottomLeft() const`: 左下角
- `Point bottomRight() const`: 右下角
- `Point center() const`: 中心点
- `Point dimensions() const`: 尺寸点

## 几何方法

### 包含测试
- `bool isInside(int qx, int qy) const`: 测试点是否在矩形内
- `bool isInside(const Point & q) const`: 测试点是否在矩形内

### 变换方法
- `Rect resize(const int size) const`: 调整大小（增加边框）
- `void moveTo(const Point & dest)`: 移动到指定位置

## 运算符重载

### 算术运算符
- `Rect operator+(const Point &p) const`: 平移
- `Rect operator-(const Point &p) const`: 反向平移
- `template<typename T> Rect operator*(const T &mul) const`: 缩放

### 复合赋值运算符
- `Rect& operator+=(const Point &p)`: 平移赋值
- `Rect& operator-=(const Point &p)`: 反向平移赋值

### 比较运算符
- `bool operator==(const Rect & other)`: 相等比较

## 几何运算

### 距离和相交
- `int distanceTo(const Point & target) const`: 计算到点的距离（0表示在内部）
- `bool intersectionTest(const Rect & other) const`: 测试与另一个矩形相交
- `bool intersectionTest(const Point & line1, const Point & line2) const`: 测试与线段相交

### 集合运算
- `Rect intersect(const Rect & other) const`: 计算交集矩形
- `Rect include(const Rect & other) const`: 计算并集矩形

## 序列化支持
- `template <typename Handler> void serialize(Handler &h)`: 序列化支持

## 设计特点

- 提供完整的矩形几何运算
- 支持点包含测试和相交检测
- 适用于UI布局和碰撞检测
- 包含便捷的边界和角点访问方法