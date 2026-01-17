# RmgObject

## 概述

`rmg::Object` 类是 VCMI 随机地图生成器（RMG）中的对象管理核心。该类表示地图上的一个逻辑对象，可以包含多个实例，支持位置管理、区域计算、访问控制和缓存优化。它为 RMG 算法提供了完整的对象生命周期管理。

## 命名空间

```cpp
namespace rmg
```

## Object::Instance 内部类

### 概述
表示对象的一个具体实例，包含位置、模板和缓存信息。

### 构造函数

```cpp
Instance(const Object& parent, std::shared_ptr<CGObjectInstance> object);
Instance(const Object& parent, std::shared_ptr<CGObjectInstance> object, const int3 & position);
```

### 区域访问

#### getBlockedArea
```cpp
const Area & getBlockedArea() const;
```
获取被阻塞的区域。

**返回值：** 阻塞区域的常量引用

#### getAccessibleArea
```cpp
const Area & getAccessibleArea() const;
```
获取可访问区域。

**返回值：** 可访问区域的常量引用

#### getBorderAbove
```cpp
Area getBorderAbove() const;
```
获取上边界区域。

**返回值：** 上边界区域

### 位置和访问

#### getVisitablePosition
```cpp
int3 getVisitablePosition() const;
```
获取可访问位置。

**返回值：** 可访问坐标

#### isVisitableFrom
```cpp
bool isVisitableFrom(const int3 & tile) const;
```
检查是否可以从指定瓦片访问。

**参数：**
- `tile`: 源瓦片坐标

**返回值：** 如果可访问返回 true

#### isBlockedVisitable
```cpp
bool isBlockedVisitable() const;
```
检查是否为阻塞的可访问对象。

**返回值：** 如果是阻塞可访问返回 true

#### isRemovable
```cpp
bool isRemovable() const;
```
检查对象是否可移除。

**返回值：** 如果可移除返回 true

### 模板设置

#### setTemplate
```cpp
void setTemplate(TerrainId terrain, vstd::RNG &);
```
设置地形特定的模板（会导致缓存失效）。

**参数：**
- `terrain`: 目标地形类型
- 随机数生成器

#### setAnyTemplate
```cpp
void setAnyTemplate(vstd::RNG &);
```
设置任意模板（会导致缓存失效）。

**参数：**
- 随机数生成器

### 位置管理

#### getTopTile
```cpp
int3 getTopTile() const;
```
获取顶部瓦片坐标。

**返回值：** 顶部瓦片坐标

#### getPosition
```cpp
int3 getPosition(bool isAbsolute = false) const;
```
获取实例位置。

**参数：**
- `isAbsolute`: 是否返回绝对坐标

**返回值：** 位置坐标

#### setPosition
```cpp
void setPosition(const int3 & position);
```
设置位置（会导致缓存失效）。

#### setPositionRaw
```cpp
void setPositionRaw(const int3 & position);
```
设置位置（不导致缓存失效）。

### 对象访问

#### object (常量)
```cpp
const CGObjectInstance & object() const;
```
获取对象实例的常量引用。

#### object (可变)
```cpp
CGObjectInstance & object();
```
获取对象实例的可变引用。

#### pointer
```cpp
std::shared_ptr<CGObjectInstance> pointer() const;
```
获取对象实例的智能指针。

### 生命周期

#### finalize
```cpp
void finalize(RmgMap & map, vstd::RNG &);
```
完成实例初始化（会导致缓存失效）。

#### clear
```cpp
void clear();
```
清除实例。

#### onCleared
```cpp
std::function<void(CGObjectInstance &)> onCleared;
```
清除时的回调函数。

## Object 类

### 构造函数

```cpp
Object() = default;
Object(const Object & object);
Object(std::shared_ptr<CGObjectInstance> object);
Object(std::shared_ptr<CGObjectInstance> object, const int3 & position);
```

### 实例管理

#### addInstance (引用)
```cpp
void addInstance(Instance & object);
```
添加现有实例。

#### addInstance (智能指针)
```cpp
Instance & addInstance(std::shared_ptr<CGObjectInstance> object);
Instance & addInstance(std::shared_ptr<CGObjectInstance> object, const int3 & position);
```
添加新实例并返回引用。

### 实例访问

#### instances (可变)
```cpp
std::list<Instance*> & instances();
```
获取实例指针列表。

#### instances (常量)
```cpp
std::list<const Instance*> & instances() const;
```
获取常量实例指针列表。

### 聚合属性

#### getVisitablePosition
```cpp
int3 getVisitablePosition() const;
```
获取对象的可访问位置。

#### getAccessibleArea
```cpp
const Area & getAccessibleArea(bool exceptLast = false) const;
```
获取可访问区域。

**参数：**
- `exceptLast`: 是否排除最后一个实例

#### getBlockVisitableArea
```cpp
const Area & getBlockVisitableArea() const;
```
获取阻塞可访问区域。

#### getVisitableArea
```cpp
const Area & getVisitableArea() const;
```
获取可访问区域。

#### getRemovableArea
```cpp
const Area & getRemovableArea() const;
```
获取可移除区域。

#### getEntrableArea
```cpp
const Area getEntrableArea() const;
```
获取可进入区域。

#### getBorderAbove
```cpp
const Area & getBorderAbove() const;
```
获取上边界区域。

### 状态查询

#### isVisitable
```cpp
bool isVisitable() const;
```
检查对象是否可访问。

**返回值：** 如果可访问返回 true

### 位置管理

#### getPosition
```cpp
const int3 & getPosition() const;
```
获取对象位置。

#### setPosition
```cpp
void setPosition(const int3 & position);
```
设置对象位置。

#### setTemplate
```cpp
void setTemplate(const TerrainId & terrain, vstd::RNG &);
```
设置对象模板。

### 区域和显示

#### getArea
```cpp
const Area & getArea() const;
```
获取完整区域（懒加载缓存）。

#### getVisibleTop
```cpp
const int3 getVisibleTop() const;
```
获取可见顶部坐标。

### 守卫系统

#### isGuarded
```cpp
bool isGuarded() const;
```
检查对象是否被守卫。

#### getGuardPos
```cpp
int3 getGuardPos() const;
```
获取守卫位置。

#### setGuardedIfMonster
```cpp
void setGuardedIfMonster(const Instance & object);
```
如果对象是怪物则设置守卫。

### 值管理

#### setValue
```cpp
void setValue(uint32_t value);
```
设置对象值。

#### getValue
```cpp
uint32_t getValue() const;
```
获取对象值。

### 生命周期

#### finalize
```cpp
void finalize(RmgMap & map, vstd::RNG &);
```
完成对象初始化。

#### clearCachedArea
```cpp
void clearCachedArea() const;
```
清除缓存的区域。

#### clear
```cpp
void clear();
```
清除对象。

## 私有成员

### dInstances
```cpp
std::list<Instance> dInstances;
```
实例列表。

### 缓存成员
```cpp
mutable Area dFullAreaCache;
mutable Area dAccessibleAreaCache;
mutable Area dAccessibleAreaFullCache;
mutable Area dBlockVisitableCache;
mutable Area dVisitableCache;
mutable Area dRemovableAreaCache;
mutable Area dBorderAboveCache;
```
各种区域缓存。

### dPosition
```cpp
int3 dPosition;
```
对象位置。

### visibleTopOffset
```cpp
mutable std::optional<int3> visibleTopOffset;
```
可见顶部偏移。

### cachedInstanceList
```cpp
mutable std::list<Object::Instance*> cachedInstanceList;
mutable std::list<const Object::Instance*> cachedInstanceConstList;
```
实例指针缓存。

### guarded
```cpp
bool guarded;
```
是否被守卫。

### value
```cpp
uint32_t value;
```
对象值。

## 工作原理

### 实例管理
Object 类管理多个 Instance，每个实例代表对象的一个具体放置：

```cpp
rmg::Object town;
// 添加多个城镇实例
town.addInstance(townObject1, pos1);
town.addInstance(townObject2, pos2);
```

### 缓存机制
使用懒加载缓存避免重复计算：

- **区域缓存**: 阻塞区域、可访问区域等
- **边界缓存**: 上边界区域
- **实例列表缓存**: 实例指针列表

### 聚合计算
对象属性通过聚合所有实例计算：

```cpp
// 可访问区域 = 所有实例可访问区域的并集
const Area& accessible = object.getAccessibleArea();

// 完整区域 = 所有实例区域的并集
const Area& full = object.getArea();
```

### 守卫系统
支持怪物守卫机制：

```cpp
if (object.isGuarded()) {
    int3 guardPos = object.getGuardPos();
    // 处理守卫逻辑
}
```

## 使用示例

```cpp
// 创建RMG对象
rmg::Object treasure(std::make_shared<CGResource>());

// 设置位置和模板
treasure.setPosition(int3(10, 10, 0));
treasure.setTemplate(TerrainId::GRASS, rng);

// 添加实例
auto& instance = treasure.addInstance(resourceObj, int3(10, 10, 0));

// 检查可访问性
if (treasure.isVisitable()) {
    int3 visitPos = treasure.getVisitablePosition();
    // 可以访问
}

// 获取区域信息
const auto& area = treasure.getArea();
const auto& accessible = treasure.getAccessibleArea();

// 完成初始化
treasure.finalize(map, rng);
```

## 性能优化

- **懒加载缓存**: 仅在需要时计算复杂区域
- **智能失效**: 修改操作后自动失效相关缓存
- **聚合缓存**: 缓存实例列表避免重复遍历
- **内存管理**: 使用智能指针管理对象生命周期

## 相关类

- `rmg::Area`: 区域管理类
- `CGObjectInstance`: 游戏对象实例
- `RmgMap`: RMG地图类
- `vstd::RNG`: 随机数生成器