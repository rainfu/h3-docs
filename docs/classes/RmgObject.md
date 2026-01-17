<!-- 来源: E:\develop\heroes\vcmi\lib\rmg\RmgObject.h -->
# RmgObject头文件

RmgObject头文件定义了VCMI中随机地图生成器的对象管理类，用于处理地图对象及其几何属性。

## rmg命名空间

## Object::Instance类

### 类定义
```cpp
class Instance
```

### 构造函数
- `Instance(const Object& parent, std::shared_ptr<CGObjectInstance> object)`: 构造函数
- `Instance(const Object& parent, std::shared_ptr<CGObjectInstance> object, const int3 & position)`: 带位置的构造函数

### 区域访问方法
- `const Area & getBlockedArea() const`: 获取阻塞区域
- `const Area & getAccessibleArea() const`: 获取可访问区域
- `Area getBorderAbove() const`: 获取上方边界

### 位置和访问方法
- `int3 getVisitablePosition() const`: 获取可访问位置
- `bool isVisitableFrom(const int3 & tile) const`: 检查是否可以从瓦片访问
- `bool isBlockedVisitable() const`: 检查是否为阻塞可访问
- `bool isRemovable() const`: 检查是否可移除
- `int3 getTopTile() const`: 获取顶部瓦片
- `int3 getPosition(bool isAbsolute = false) const`: 获取位置

### 位置设置方法
- `void setPosition(const int3 & position)`: 设置位置（会使缓存无效）
- `void setPositionRaw(const int3 & position)`: 设置位置（不使缓存无效）

### 模板设置方法
- `void setTemplate(TerrainId terrain, vstd::RNG &)`: 设置模板（会使缓存无效）
- `void setAnyTemplate(vstd::RNG &)`: 设置任意模板（会使缓存无效）

### 对象访问方法
- `const CGObjectInstance & object() const`: 获取对象常量引用
- `CGObjectInstance & object()`: 获取对象引用
- `std::shared_ptr<CGObjectInstance> pointer() const`: 获取对象智能指针

### 生命周期方法
- `void finalize(RmgMap & map, vstd::RNG &)`: 完成对象（会使缓存无效）
- `void clear()`: 清空对象

### 回调
- `std::function<void(CGObjectInstance &)> onCleared`: 清空时的回调

### 私有成员
- `mutable Area dBlockedAreaCache`: 阻塞区域缓存
- `int3 dPosition`: 位置
- `mutable Area dAccessibleAreaCache`: 可访问区域缓存
- `std::shared_ptr<CGObjectInstance> dObject`: 对象智能指针
- `const Object & dParent`: 父对象引用

## Object类

### 类定义
```cpp
class Object
```

### 构造函数
- `Object() = default`: 默认构造函数
- `Object(const Object & object)`: 拷贝构造函数
- `Object(std::shared_ptr<CGObjectInstance> object)`: 从对象构造
- `Object(std::shared_ptr<CGObjectInstance> object, const int3 & position)`: 从对象和位置构造

### 实例管理方法
- `void addInstance(Instance & object)`: 添加实例
- `Instance & addInstance(std::shared_ptr<CGObjectInstance> object)`: 添加实例并返回引用
- `Instance & addInstance(std::shared_ptr<CGObjectInstance> object, const int3 & position)`: 添加带位置的实例并返回引用
- `std::list<Instance*> & instances()`: 获取实例列表
- `std::list<const Instance*> & instances() const`: 获取常量实例列表

### 位置和访问方法
- `int3 getVisitablePosition() const`: 获取可访问位置
- `const int3 & getPosition() const`: 获取位置
- `void setPosition(const int3 & position)`: 设置位置

### 区域访问方法
- `const Area & getAccessibleArea(bool exceptLast = false) const`: 获取可访问区域
- `const Area & getBlockVisitableArea() const`: 获取阻塞可访问区域
- `const Area & getVisitableArea() const`: 获取可访问区域
- `const Area & getRemovableArea() const`: 获取可移除区域
- `const Area getEntrableArea() const`: 获取可进入区域
- `const Area & getBorderAbove() const`: 获取上方边界
- `const Area & getArea() const`: 获取完整区域（懒缓存）
- `const int3 getVisibleTop() const`: 获取可见顶部

### 属性查询方法
- `bool isVisitable() const`: 检查是否可访问
- `bool isGuarded() const`: 检查是否被守卫
- `int3 getGuardPos() const`: 获取守卫位置
- `uint32_t getValue() const`: 获取价值

### 属性设置方法
- `void setTemplate(const TerrainId & terrain, vstd::RNG &)`: 设置模板
- `void setGuardedIfMonster(const Instance & object)`: 如果是怪物则设置守卫
- `void setValue(uint32_t value)`: 设置价值

### 生命周期方法
- `void finalize(RmgMap & map, vstd::RNG &)`: 完成对象
- `void clearCachedArea() const`: 清空缓存区域
- `void clear()`: 清空对象

### 私有成员变量
- `std::list<Instance> dInstances`: 实例列表
- `mutable Area dFullAreaCache`: 完整区域缓存
- `mutable Area dAccessibleAreaCache`: 可访问区域缓存
- `mutable Area dAccessibleAreaFullCache`: 完整可访问区域缓存
- `mutable Area dBlockVisitableCache`: 阻塞可访问缓存
- `mutable Area dVisitableCache`: 可访问缓存
- `mutable Area dRemovableAreaCache`: 可移除区域缓存
- `mutable Area dBorderAboveCache`: 上方边界缓存
- `int3 dPosition`: 位置
- `mutable std::optional<int3> visibleTopOffset`: 可见顶部偏移
- `mutable std::list<Object::Instance*> cachedInstanceList`: 缓存实例列表
- `mutable std::list<const Object::Instance*> cachedInstanceConstList`: 缓存常量实例列表
- `bool guarded`: 是否被守卫
- `uint32_t value`: 价值

## 设计特点

- 支持对象的实例管理和几何属性计算
- 提供懒计算的区域缓存优化性能
- 支持对象的访问性和位置管理
- 处理对象的守卫和价值属性
- 支持对象的模板设置和地形适应
- 提供完整生命周期管理和清理功能