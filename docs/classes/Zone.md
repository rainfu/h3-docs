<!-- 来源: E:\develop\heroes\vcmi\lib\rmg\Zone.h -->
# Zone头文件

Zone头文件定义了VCMI中随机地图生成器的核心区域类，用于管理地图区域的生成、对象放置和修改器系统。

## 全局常量

### 区域过滤器
```cpp
extern const std::function<bool(const int3 &)> AREA_NO_FILTER;
```
无过滤器的区域函数。

### 类型定义
```cpp
typedef std::list<std::shared_ptr<Modificator>> TModificators;
```
修改器列表类型。

## ThreadSafeProxy模板类

### 模板定义
```cpp
template<typename T>
class ThreadSafeProxy
```

线程安全的资源代理类，提供对共享资源的线程安全访问。

### 构造函数
- `ThreadSafeProxy(T& resource, std::recursive_mutex& mutex)`: 构造函数

### 运算符重载
- `T* operator->()`: 指针访问运算符
- `const T* operator->() const`: 常量指针访问运算符
- `T& operator*()`: 解引用运算符
- `const T& operator*() const`: 常量解引用运算符
- `T& get()`: 获取引用
- `const T& get() const`: 获取常量引用
- `T operator+(const T & other)`: 加法运算符
- `T operator+(ThreadSafeProxy<U> & other)`: 代理加法运算符

### 私有成员
- `T& resourceRef`: 资源引用
- `std::lock_guard<std::recursive_mutex> lock`: 互斥锁守卫

## Zone类

### 继承关系
```cpp
class Zone : public rmg::ZoneOptions
```

### 构造函数
- `Zone(RmgMap & map, CMapGenerator & generator, vstd::RNG & rand)`: 构造函数

### 析构函数
- `~Zone()`: 析构函数

### 选项设置
- `void setOptions(const rmg::ZoneOptions & options)`: 设置区域选项

### 层级查询
- `bool isUnderground() const`: 检查是否为地下区域

### 位置和中心管理
- `float3 getCenter() const`: 获取中心位置
- `void setCenter(const float3 &f)`: 设置中心位置
- `int3 getPos() const`: 获取位置
- `void setPos(const int3 &pos)`: 设置位置
- `void moveToCenterOfMass()`: 移动到质心位置

### 线程安全区域访问
- `ThreadSafeProxy<rmg::Area> area()`: 获取区域代理
- `ThreadSafeProxy<const rmg::Area> area() const`: 获取常量区域代理
- `ThreadSafeProxy<rmg::Area> areaPossible()`: 获取可能区域代理
- `ThreadSafeProxy<const rmg::Area> areaPossible() const`: 获取常量可能区域代理
- `ThreadSafeProxy<rmg::Area> freePaths()`: 获取自由路径代理
- `ThreadSafeProxy<const rmg::Area> freePaths() const`: 获取常量自由路径代理
- `ThreadSafeProxy<rmg::Area> areaUsed()`: 获取已使用区域代理
- `ThreadSafeProxy<const rmg::Area> areaUsed() const`: 获取常量已使用区域代理

### 道路相关方法
- `rmg::Area areaForRoads() const`: 获取道路区域

### 瓦片管理
- `void initFreeTiles()`: 初始化自由瓦片
- `void clearTiles()`: 清空瓦片
- `void fractalize()`: 分形化处理

### 城镇和地形类型
- `FactionID getTownType() const`: 获取城镇类型
- `void setTownType(FactionID town)`: 设置城镇类型
- `TerrainId getTerrainType() const`: 获取地形类型
- `void setTerrainType(TerrainId terrain)`: 设置地形类型

### 路径搜索
- `void connectPath(const rmg::Path & path)`: 连接路径
- `rmg::Path searchPath(const rmg::Area & src, bool onlyStraight, const std::function<bool(const int3 &)> & areafilter = AREA_NO_FILTER) const`: 搜索路径
- `rmg::Path searchPath(const int3 & src, bool onlyStraight, const std::function<bool(const int3 &)> & areafilter = AREA_NO_FILTER) const`: 从点搜索路径
- `rmg::Path searchPath(const rmg::Area & src, bool onlyStraight, const rmg::Area & searchArea) const`: 在指定区域搜索路径

### 修改器管理
- `TModificators getModificators()`: 获取修改器列表

#### 模板方法
- `template<class T> T* getModificator()`: 获取指定类型的修改器
- `template<class T> void addModificator()`: 添加指定类型的修改器
- `void initModificators()`: 初始化修改器

### 随机数生成器
- `vstd::RNG & getRand()`: 获取随机数生成器

### 公共成员
- `mutable std::recursive_mutex areaMutex`: 区域互斥锁
- `using Lock = std::unique_lock<std::recursive_mutex>`: 锁类型别名

### 受保护成员
- `CMapGenerator & generator`: 地图生成器引用
- `std::unique_ptr<vstd::RNG> rand`: 随机数生成器
- `RmgMap & map`: RMG地图引用
- `TModificators modificators`: 修改器列表
- `bool finished`: 是否完成

#### 位置信息
- `int3 pos`: 位置
- `float3 center`: 中心

#### 区域数据
- `rmg::Area dArea`: 不规则区域
- `rmg::Area dAreaPossible`: 可能区域
- `rmg::Area dAreaFree`: 自由瓦片核心路径
- `rmg::Area dAreaUsed`: 已使用区域
- `std::vector<int3> possibleQuestArtifactPos`: 可能的任务神器位置

#### 模板信息
- `FactionID townType`: 城镇类型
- `TerrainId terrainType`: 地形类型

## 设计特点

- 继承自ZoneOptions，提供完整的区域配置
- 使用线程安全代理确保并发访问安全
- 支持物理模拟的区域布局（中心、质心计算）
- 提供路径搜索和连接功能
- 支持修改器插件系统进行对象放置
- 管理多种类型的区域（可用、已用、自由路径）
- 支持分形化处理创建不规则形状