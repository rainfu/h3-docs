# RmgArea

## 概述

`rmg::Area` 类是 VCMI 随机地图生成器（RMG）中的核心空间管理类。该类表示地图上的一个区域，支持瓦片集合的管理、几何运算、距离计算和边界分析。它为 RMG 算法提供了高效的区域操作基础。

## 命名空间

```cpp
namespace rmg
```

## 全局常量

### 方向数组
```cpp
static const std::array<int3, 4> dirs4 = { int3(0,1,0),int3(0,-1,0),int3(-1,0,0),int3(+1,0,0) };
```
四个基本方向（上、下、左、右）。

```cpp
static const std::array<int3, 4> dirsDiagonal= { int3(1,1,0),int3(1,-1,0),int3(-1,1,0),int3(-1,-1,0) };
```
四个对角线方向。

## 类型定义

### Tileset
```cpp
using Tileset = std::unordered_set<int3>;
```
瓦片集合类型，使用无序集合存储坐标。

### DistanceMap
```cpp
using DistanceMap = std::map<int3, int>;
```
距离映射类型，存储坐标到距离的映射。

## 工具函数

### toAbsolute
```cpp
void toAbsolute(Tileset & tiles, const int3 & position);
```
将相对坐标转换为绝对坐标。

### toRelative
```cpp
void toRelative(Tileset & tiles, const int3 & position);
```
将绝对坐标转换为相对坐标。

## Area 类定义

```cpp
class DLL_LINKAGE Area
```

## 构造函数

### 默认构造函数
```cpp
Area() = default;
```
创建空的区域。

### 复制构造函数
```cpp
Area(const Area &);
```
复制构造。

### 移动构造函数
```cpp
Area(Area &&) noexcept;
```
移动构造。

### 从瓦片集合构造
```cpp
Area(Tileset tiles);
```
从瓦片集合创建区域。

### 从相对坐标构造
```cpp
Area(Tileset relative, const int3 & position);
```
从相对坐标和位置创建区域。

## 赋值操作符

```cpp
Area & operator= (const Area &);
```
复制赋值。

## 访问方法

### getTiles
```cpp
const Tileset & getTiles() const;
```
获取区域内的所有瓦片。

**返回值：** 瓦片集合的常量引用

### getTilesVector
```cpp
const std::vector<int3> & getTilesVector() const;
```
获取瓦片向量（缓存版本）。

**返回值：** 瓦片向量的常量引用

### getBorder
```cpp
const Tileset & getBorder() const;
```
获取区域边界（内部边界，懒加载缓存）。

**返回值：** 边界瓦片集合

### getBorderOutside
```cpp
const Tileset & getBorderOutside() const;
```
获取区域外部边界（懒加载缓存）。

**返回值：** 外部边界瓦片集合

## 计算方法

### computeDistanceMap
```cpp
DistanceMap computeDistanceMap(std::map<int, Tileset> & reverseDistanceMap) const;
```
计算距离映射。

**参数：**
- `reverseDistanceMap`: 反向距离映射输出

**返回值：** 从区域到各点的距离映射

### getCenterOfMass
```cpp
int3 getCenterOfMass() const;
```
计算区域的质量中心。

**返回值：** 中心坐标

### getSubarea
```cpp
Area getSubarea(const std::function<bool(const int3 &)> & filter) const;
```
获取满足过滤条件的子区域。

**参数：**
- `filter`: 过滤函数

**返回值：** 子区域

## 几何查询

### connected
```cpp
bool connected(bool noDiagonals = false) const;
```
检查区域是否连通。

**参数：**
- `noDiagonals`: 是否禁用对角线连接

**返回值：** 如果连通返回 true

### empty
```cpp
bool empty() const;
```
检查区域是否为空。

**返回值：** 如果为空返回 true

### contains (单个瓦片)
```cpp
bool contains(const int3 & tile) const;
```
检查是否包含指定瓦片。

### contains (瓦片向量)
```cpp
bool contains(const std::vector<int3> & tiles) const;
```
检查是否包含所有指定瓦片。

### contains (区域)
```cpp
bool contains(const Area & area) const;
```
检查是否完全包含另一个区域。

### overlap (区域)
```cpp
bool overlap(const Area & area) const;
```
检查是否与另一个区域重叠。

### overlap (瓦片向量)
```cpp
bool overlap(const std::vector<int3> & tiles) const;
```
检查是否与瓦片向量重叠。

### distance
```cpp
int distance(const int3 & tile) const;
```
计算到指定瓦片的距离。

### distanceSqr
```cpp
int distanceSqr(const int3 & tile) const;
```
计算到指定瓦片的平方距离。

### distanceSqr (区域)
```cpp
int distanceSqr(const Area & area) const;
```
计算到另一个区域的平方距离。

### nearest (瓦片)
```cpp
int3 nearest(const int3 & tile) const;
```
找到区域内距离指定瓦片最近的点。

### nearest (区域)
```cpp
int3 nearest(const Area & area) const;
```
找到距离另一个区域最近的点。

## 修改方法

### clear
```cpp
void clear();
```
清空区域。

### assign
```cpp
void assign(const Tileset tiles);
```
赋值瓦片集合。

### add
```cpp
void add(const int3 & tile);
```
添加单个瓦片。

### erase
```cpp
void erase(const int3 & tile);
```
移除单个瓦片。

### unite
```cpp
void unite(const Area & area);
```
与另一个区域求并集。

### intersect
```cpp
void intersect(const Area & area);
```
与另一个区域求交集。

### subtract
```cpp
void subtract(const Area & area);
```
减去另一个区域的瓦片。

### translate
```cpp
void translate(const int3 & shift);
```
平移区域。

### erase_if
```cpp
void erase_if(std::function<bool(const int3&)> predicate);
```
根据谓词移除瓦片。

## 操作符重载

### 翻译操作符
```cpp
friend Area operator+ (const Area & l, const int3 & r); // 平移
friend Area operator- (const Area & l, const int3 & r); // 平移
```

### 集合操作符
```cpp
friend Area operator+ (const Area & l, const Area & r); // 并集
friend Area operator* (const Area & l, const Area & r); // 交集
friend Area operator- (const Area & l, const Area & r); // 差集
```

### 比较操作符
```cpp
friend bool operator== (const Area & l, const Area & r);
```
相等比较。

## 工具函数

### connectedAreas
```cpp
friend std::list<Area> connectedAreas(const Area & area, bool disableDiagonalConnections);
```
将区域分割为连通的子区域。

**参数：**
- `area`: 要分割的区域
- `disableDiagonalConnections`: 是否禁用对角线连接

**返回值：** 连通子区域列表

## 私有成员

### dTiles
```cpp
mutable Tileset dTiles;
```
瓦片集合数据。

### dTilesVectorCache
```cpp
mutable std::vector<int3> dTilesVectorCache;
```
瓦片向量缓存。

### dBorderCache
```cpp
mutable Tileset dBorderCache;
```
边界缓存。

### dBorderOutsideCache
```cpp
mutable Tileset dBorderOutsideCache;
```
外部边界缓存。

### dTotalShiftCache
```cpp
mutable int3 dTotalShiftCache;
```
总偏移缓存。

## 私有方法

### invalidate
```cpp
void invalidate();
```
使缓存无效。

### computeBorderCache
```cpp
void computeBorderCache();
```
计算边界缓存。

### computeBorderOutsideCache
```cpp
void computeBorderOutsideCache();
```
计算外部边界缓存。

## 工作原理

### 懒加载缓存
Area 类使用懒加载机制缓存计算密集的结果：

- **边界计算**: 仅在需要时计算内部和外部边界
- **向量转换**: 自动在集合和向量之间转换
- **缓存失效**: 修改操作后自动失效相关缓存

### 几何运算
支持完整的集合运算：

```cpp
Area a = area1 + area2;  // 并集
Area b = area1 * area2;  // 交集
Area c = area1 - area2;  // 差集
Area d = area1 + int3(1,0,0);  // 平移
```

### 距离计算
提供多种距离度量：

- **曼哈顿距离**: `distance()`
- **欧几里得距离**: `distanceSqr()` 的平方根
- **最近点查找**: `nearest()`

### 连通性分析
- **连通检查**: 验证区域的连通性
- **连通分割**: 将不连通区域分割为多个连通组件

## 使用示例

```cpp
// 创建区域
rmg::Area area;
area.add(int3(0,0,0));
area.add(int3(1,0,0));
area.add(int3(0,1,0));

// 几何运算
rmg::Area expanded = area + int3(1,1,0);  // 平移
rmg::Area intersection = area * otherArea; // 交集

// 查询操作
if (area.contains(int3(0,0,0))) {
    // 包含指定瓦片
}

int dist = area.distance(int3(5,5,0));  // 计算距离

// 获取边界
const auto& border = area.getBorder();
const auto& outside = area.getBorderOutside();

// 连通性检查
if (area.connected()) {
    // 区域连通
}
```

## 性能特性

- **缓存机制**: 避免重复计算边界和向量转换
- **懒加载**: 仅在需要时计算复杂结果
- **高效查找**: 使用无序集合提供O(1)查找
- **内存优化**: 智能缓存管理减少内存占用

## 相关类

- `int3`: 三维坐标类
- `Tileset`: 瓦片集合类型别名
- `DistanceMap`: 距离映射类型别名