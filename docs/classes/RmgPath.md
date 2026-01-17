<!-- 来源: E:\develop\heroes\vcmi\lib\rmg\RmgPath.h -->
# RmgPath头文件

RmgPath头文件定义了VCMI中随机地图生成器的路径类，用于处理地图中的路径搜索和连接。

## rmg命名空间

### Path类

#### 类定义
```cpp
class Path
```

#### 类型定义
- `using MoveCostFunction = std::function<float(const int3 &, const int3 &)>`: 移动成本函数类型
- `const static MoveCostFunction DEFAULT_MOVEMENT_FUNCTION`: 默认移动函数

#### 构造函数
- `Path(const Area & area)`: 基于区域的构造函数
- `Path(const Area & area, const int3 & src)`: 带起始点的构造函数
- `Path(const Path & path) = default`: 拷贝构造函数

#### 赋值运算符
- `Path & operator=(const Path & path)`: 赋值运算符

#### 状态检查
- `bool valid() const`: 检查路径是否有效

#### 路径搜索方法
- `Path search(const Tileset & dst, bool straight, MoveCostFunction moveCostFunction = DEFAULT_MOVEMENT_FUNCTION) const`: 搜索到地块集合
- `Path search(const int3 & dst, bool straight, MoveCostFunction moveCostFunction = DEFAULT_MOVEMENT_FUNCTION) const`: 搜索到指定点
- `Path search(const Area & dst, bool straight, MoveCostFunction moveCostFunction = DEFAULT_MOVEMENT_FUNCTION) const`: 搜索到区域
- `Path search(const Path & dst, bool straight, MoveCostFunction moveCostFunction = DEFAULT_MOVEMENT_FUNCTION) const`: 搜索到路径

#### 路径连接方法
- `void connect(const Path & path)`: 连接路径
- `void connect(const int3 & path)`: 连接到点
- `void connect(const Area & path)`: 连接到区域
- `void connect(const Tileset & path)`: 连接到地块集合

#### 访问方法
- `const Area & getPathArea() const`: 获取路径区域

#### 静态方法
- `static Path invalid()`: 创建无效路径
- `static MoveCostFunction createCurvedCostFunction(const Area & border)`: 创建曲线成本函数
- `static MoveCostFunction createBezierCostFunction(const int3 & p0, const int3 & p1, const int3 & p2, const int3 & p3)`: 创建贝塞尔曲线成本函数
- `static float nonEuclideanCostFunction(const int3& src, const int3& dst, const int3& center)`: 非欧几里得成本函数
- `static float distanceToCubicBezier(const int3 & point, const int3 & p0, const int3 & p1, const int3 & p2, const int3 & p3)`: 计算到三次贝塞尔曲线的距离

#### 私有成员
- `const Area * dArea`: 区域指针
- `Area dPath`: 路径区域

## 设计特点

- 支持多种路径搜索目标（点、区域、地块集合）
- 提供灵活的移动成本函数系统
- 支持曲线和贝塞尔路径生成
- 包含路径连接和组合功能