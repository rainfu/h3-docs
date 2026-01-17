<!-- 来源: E:\develop\heroes\vcmi\lib\Color.h -->
# Color头文件

Color头文件定义了VCMI中RGBA颜色的表示和操作。

## ColorRGBA类

### 类定义
```cpp
class ColorRGBA
```

### 枚举常量
- `ALPHA_OPAQUE = 255`: 不透明alpha值
- `ALPHA_TRANSPARENT = 0`: 透明alpha值

### 成员变量
- `uint8_t r`: 红色分量 (0-255)
- `uint8_t g`: 绿色分量 (0-255)
- `uint8_t b`: 蓝色分量 (0-255)
- `uint8_t a`: alpha分量 (0-255)

### 构造函数
- `constexpr ColorRGBA()`: 默认构造函数，初始化为黑色透明
- `constexpr ColorRGBA(uint8_t r, uint8_t g, uint8_t b, uint8_t a)`: 构造指定RGBA值的颜色
- `constexpr ColorRGBA(uint8_t r, uint8_t g, uint8_t b)`: 构造指定RGB值的颜色，alpha默认为不透明

### 运算符重载
- `bool operator==(ColorRGBA const& rhs) const`: 相等比较
- `bool operator<(const ColorRGBA& rhs) const`: 小于比较（基于平均值）

### 序列化支持
- `template <typename Handler> void serialize(Handler &h)`: 序列化支持

## vstd命名空间中的函数

### lerp函数
```cpp
template<typename Floating>
ColorRGBA lerp(const ColorRGBA & left, const ColorRGBA & right, const Floating & factor)
```
对两个颜色进行线性插值。

**参数:**
- `left`: 起始颜色
- `right`: 结束颜色
- `factor`: 插值因子 (0.0-1.0)

**返回值:**
- 插值后的颜色

**功能:**
- 对RGBA各个分量分别进行线性插值
- 支持任意浮点类型作为插值因子