<!-- 来源: E:\develop\heroes\vcmi\lib\rmg\RmgArea.h -->
# RmgArea头文件

RmgArea头文件定义了VCMI中随机地图生成器的区域几何类，用于处理瓦片集合和空间运算。

## rmg命名空间

### 方向常量

#### 四个主要方向
```cpp
static const std::array<int3, 4> dirs4 = { int3(0,1,0),int3(0,-1,0),int3(-1,0,0),int3(+1,0,0) };
```

#### 对角线方向
```cpp
static const std::array<int3, 4> dirsDiagonal= { int3(1,1,0),int3(1,-1,0),int3(-1,1,0),int3(-1,-1,0) };
```

### 类型定义

#### Tileset类型
```cpp
using Tileset = std::unordered_set<int3>;
```
瓦片的无序集合。

#### DistanceMap类型
```cpp
using DistanceMap = std::map<int3, int>;
```
距离映射，从瓦片到距离的映射。

### 辅助函数

#### toAbsolute函数
```cpp
void toAbsolute(Tileset & tiles, const int3 & position);
```
将相对瓦片坐标转换为绝对坐标。

#### toRelative函数
```cpp
void toRelative(Tileset & tiles, const int3 & position);
```
将绝对瓦片坐标转换为相对坐标。

## Area类

### 类定义
```cpp
class DLL_LINKAGE Area
```

### 构造函数
- `Area() = default`: 默认构造函数
- `Area(const Area &)`: 拷贝构造函数
- `Area(Area &&) noexcept`: 移动构造函数
- `Area(Tileset tiles)`: 从瓦片集合构造
- `Area(Tileset relative, const int3 & position)`: 从相对位置构造

### 赋值运算符
- `Area & operator= (const Area &)`: 赋值运算符

### 瓦片访问方法
- `const Tileset & getTiles() const`: 获取瓦片集合
- `const std::vector<int3> & getTilesVector() const`: 获取瓦片向量（缓存）
- `const Tileset & getBorder() const`: 获取边界瓦片（懒缓存）
- `const Tileset & getBorderOutside() const`: 获取外部边界瓦片（懒缓存）

### 计算方法
- `DistanceMap computeDistanceMap(std::map<int, Tileset> & reverseDistanceMap) const`: 计算距离映射
- `int3 getCenterOfMass() const`: 获取质心
- `Area getSubarea(const std::function<bool(const int3 &)> & filter) const`: 获取子区域

### 几何查询方法
- `bool connected(bool noDiagonals = false) const`: 检查是否连通
- `bool empty() const`: 检查是否为空
- `bool contains(const int3 & tile) const`: 检查是否包含瓦片
- `bool contains(const std::vector<int3> & tiles) const`: 检查是否包含瓦片列表
- `bool contains(const Area & area) const`: 检查是否包含区域
- `bool overlap(const Area & area) const`: 检查是否重叠
- `bool overlap(const std::vector<int3> & tiles) const`: 检查是否与瓦片列表重叠
- `int distance(const int3 & tile) const`: 计算到瓦片的距离
- `int distanceSqr(const int3 & tile) const`: 计算到瓦片的平方距离
- `int distanceSqr(const Area & area) const`: 计算到区域的平方距离
- `int3 nearest(const int3 & tile) const`: 找到最近的瓦片
- `int3 nearest(const Area & area) const`: 找到最近的区域瓦片

### 修改方法
- `void clear()`: 清空区域
- `void assign(const Tileset tiles)`: 分配瓦片集合
- `void add(const int3 & tile)`: 添加瓦片
- `void erase(const int3 & tile)`: 删除瓦片
- `void unite(const Area & area)`: 并集运算
- `void intersect(const Area & area)`: 交集运算
- `void subtract(const Area & area)`: 差集运算
- `void translate(const int3 & shift)`: 平移区域
- `void erase_if(std::function<bool(const int3&)> predicate)`: 条件删除

### 运算符重载
- `friend Area operator+ (const Area & l, const int3 & r)`: 平移运算
- `friend Area operator- (const Area & l, const int3 & r)`: 平移运算
- `friend Area operator+ (const Area & l, const Area & r)`: 并集运算
- `friend Area operator* (const Area & l, const Area & r)`: 交集运算
- `friend Area operator- (const Area & l, const Area & r)`: 差集运算
- `friend bool operator== (const Area & l, const Area & r)`: 相等比较
- `friend std::list<Area> connectedAreas(const Area & area, bool disableDiagonalConnections)`: 获取连通区域

### 私有方法
- `void invalidate()`: 使缓存无效
- `void computeBorderCache()`: 计算边界缓存
- `void computeBorderOutsideCache()`: 计算外部边界缓存

### 私有成员变量
- `mutable Tileset dTiles`: 瓦片集合
- `mutable std::vector<int3> dTilesVectorCache`: 瓦片向量缓存
- `mutable Tileset dBorderCache`: 边界缓存
- `mutable Tileset dBorderOutsideCache`: 外部边界缓存
- `mutable int3 dTotalShiftCache`: 总偏移缓存

## 设计特点

- 高效的瓦片集合操作和几何运算
- 懒计算的边界缓存优化性能
- 支持相对和绝对坐标转换
- 完整的集合运算（并集、交集、差集）
- 距离计算和最近点查找功能
- 连通性分析和子区域提取