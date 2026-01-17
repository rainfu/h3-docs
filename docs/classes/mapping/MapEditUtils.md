# MapEditUtils

## 概述

`MapEditUtils` 是 VCMI 地图编辑系统的工具类集合。该文件提供了地图编辑所需的基础数据结构和工具函数，包括矩形区域定义、选择系统、地形视图图案等。

## MapRect 结构体

### 概述
表示地图上的矩形区域。

### 构造函数
```cpp
MapRect();
MapRect(const int3 & pos, si32 width, si32 height);
```

### 成员变量
```cpp
si32 x, y, z;        // 矩形位置
si32 width, height;  // 矩形尺寸
```

### 边界方法
```cpp
si32 left() const;    // 左边界
si32 right() const;   // 右边界
si32 top() const;     // 上边界
si32 bottom() const;  // 下边界
```

### 角点方法
```cpp
int3 topLeft() const;     // 左上角
int3 topRight() const;    // 右上角
int3 bottomLeft() const;  // 左下角
int3 bottomRight() const; // 右下角
```

### 操作符
```cpp
MapRect operator&(const MapRect& rect) const;
```
计算两个矩形的交集。

### 遍历方法
```cpp
template<typename Func>
void forEach(Func f) const;
```
对矩形内的每个位置执行函数。

## CMapSelection<T> 模板类

### 概述
通用的地图选择类模板，用于选择任意类型的项目。

### 构造函数
```cpp
explicit CMapSelection(CMap* map);
```

### 选择方法
```cpp
void select(const T & item);           // 选择项目
void deselect(const T & item);         // 取消选择项目
const std::set<T> & getSelectedItems(); // 获取选中的项目
```

### 虚方法（子类实现）
```cpp
virtual void selectRange(const MapRect & rect);   // 选择矩形区域
virtual void deselectRange(const MapRect & rect); // 取消选择矩形区域
virtual void selectAll();                         // 选择全部
virtual void clearSelection();                    // 清除选择
```

## CTerrainSelection 类

### 概述
地形选择类，继承自 `CMapSelection<int3>`，用于选择地图地形块。

### 构造函数
```cpp
explicit CTerrainSelection(CMap * map);
```

### 特有方法
```cpp
void setSelection(const std::vector<int3> & vec);
```
直接设置选择的地形位置列表。

## CObjectSelection 类

### 概述
对象选择类，继承自 `CMapSelection<CGObjectInstance*>`，用于选择地图对象。

### 构造函数
```cpp
explicit CObjectSelection(CMap * map);
```

## TerrainViewPattern 结构体

### 概述
地形视图图案结构体，描述3x3地形块的组合模式和对应的视图帧。

### 常量定义

#### 翻转模式
```cpp
static const std::string FLIP_MODE_DIFF_IMAGES;
```
使用不同图像进行翻转的模式。

#### 规则常量
```cpp
static const std::string RULE_DIRT;           // 泥土边界规则
static const std::string RULE_SAND;           // 沙地边界规则
static const std::string RULE_TRANSITION;     // 过渡边界规则
static const std::string RULE_NATIVE;         // 原生边界规则
static const std::string RULE_NATIVE_STRONG;  // 强原生规则
static const std::string RULE_ANY;            // 任意规则
```

### 成员变量

#### data
```cpp
std::array<std::vector<WeightedRule>, PATTERN_DATA_SIZE> data;
```
3x3图案数据，每个位置包含多个加权规则。

#### id
```cpp
std::string id;
```
图案的标识符。

#### mapping
```cpp
std::vector<std::pair<int, int> > mapping;
```
图案到视图帧的映射范围。

#### diffImages
```cpp
bool diffImages;
```
是否使用不同图像进行旋转。

#### decoration
```cpp
bool decoration;
```
是否为装饰图案。

#### rotationTypesCount
```cpp
int rotationTypesCount;
```
旋转类型数量。

#### minPoints/maxPoints
```cpp
int minPoints, maxPoints;
```
验证图案成功所需的最小/最大点数。

### WeightedRule 内部结构体

#### 概述
加权规则，定义图案匹配的条件。

#### 构造函数
```cpp
WeightedRule(std::string& Name);
```

#### 规则类型检查
```cpp
bool isStandardRule() const;    // 是否为标准规则
bool isAnyRule() const;         // 是否为任意规则
bool isDirtRule() const;        // 是否为泥土规则
bool isSandRule() const;        // 是否为沙地规则
bool isTransition() const;      // 是否为过渡规则
bool isNativeStrong() const;    // 是否为强原生规则
bool isNativeRule() const;      // 是否为原生规则
```

#### 成员变量
```cpp
std::string name;  // 规则名称
int points;        // 规则点数
```

## CTerrainViewPatternConfig 类

### 概述
地形视图图案配置类，从文件系统加载图案数据。

### 构造函数
```cpp
CTerrainViewPatternConfig();
```

### 获取方法
```cpp
const std::vector<TVPVector> & getTerrainViewPatterns(TerrainId terrain) const;
```
获取指定地形的视图图案。

```cpp
std::optional<const std::reference_wrapper<const TerrainViewPattern>> getTerrainViewPatternById(const std::string & patternId, const std::string & id) const;
```
通过ID获取特定的视图图案。

```cpp
std::optional<const std::reference_wrapper<const CTerrainViewPatternConfig::TVPVector>> getTerrainViewPatternsById(TerrainId terrain, const std::string & id) const;
```
通过ID获取指定地形的图案向量。

```cpp
const TVPVector * getTerrainTypePatternById(const std::string & id) const;
```
通过ID获取地形类型图案。

### 工具方法
```cpp
void flipPattern(TerrainViewPattern & pattern, int flip) const;
```
翻转图案。

## CTerrainViewPatternUtils 类

### 概述
地形视图图案工具类。

### 静态方法
```cpp
static void printDebuggingInfoAboutTile(const CMap * map, const int3 & pos);
```
打印指定位置地形的调试信息。

## 工作原理

### 地形视图系统：
1. **图案匹配**: 使用3x3的WeightedRule矩阵匹配地形组合
2. **智能过渡**: 根据周围地形自动选择合适的边界图案
3. **加权验证**: 通过点数系统验证图案的有效性
4. **视图映射**: 将匹配的图案映射到对应的图形帧

### 选择系统：
1. **通用框架**: CMapSelection提供统一的接口
2. **类型安全**: 模板化支持不同类型的选择
3. **区域操作**: 支持矩形区域的批量选择

## 使用示例

```cpp
// 创建地形选择
CTerrainSelection terrainSel(map);

// 选择矩形区域
MapRect rect(int3(0,0,0), 10, 10);
terrainSel.selectRange(rect);

// 获取选中的地形
const auto& selected = terrainSel.getSelectedItems();

// 使用地形视图图案
CTerrainViewPatternConfig config;
const auto& patterns = config.getTerrainViewPatterns(TerrainId::GRASS);
```

## 相关类

- `CMap`: 地图类
- `TerrainId`: 地形ID类型
- `CGObjectInstance`: 地图对象实例
- `int3`: 三维坐标