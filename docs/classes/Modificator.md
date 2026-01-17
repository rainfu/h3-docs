<!-- 来源: E:\develop\heroes\vcmi\lib\rmg\modificators\Modificator.h -->
# Modificator头文件

Modificator头文件定义了VCMI中随机地图生成器的修改器基类，用于实现地图生成的各个步骤。

## 宏定义

### MODIFICATOR宏
```cpp
#define MODIFICATOR(x) x(Zone & z, RmgMap & m, CMapGenerator & g): Modificator(z, m, g) {setName(#x);}
```
用于定义修改器类的构造函数。

### DEPENDENCY宏
```cpp
#define DEPENDENCY(x) dependency(zone.getModificator<x>())
```
添加依赖关系。

### POSTFUNCTION宏
```cpp
#define POSTFUNCTION(x) postfunction(zone.getModificator<x>())
```
添加后处理函数。

### DEPENDENCY_ALL宏
```cpp
#define DEPENDENCY_ALL(x) for(auto & z : map.getZones()) { dependency(z.second->getModificator<x>()); }
```
为所有区域添加依赖。

### POSTFUNCTION_ALL宏
```cpp
#define POSTFUNCTION_ALL(x) for(auto & z : map.getZones()) { postfunction(z.second->getModificator<x>()); }
```
为所有区域添加后处理函数。

## Modificator类

### 类定义
```cpp
class Modificator
```

### 构造函数
- `Modificator(Zone & zone, RmgMap & map, CMapGenerator & generator)`: 构造函数

### 虚方法
- `virtual void init()`: 初始化方法，可重写以添加依赖
- `virtual char dump(const int3 &)`: 调试输出方法
- `virtual ~Modificator() = default`: 虚析构函数

### 主要方法
- `void setName(const std::string & n)`: 设置名称
- `const std::string & getName() const`: 获取名称
- `bool isReady()`: 检查是否准备就绪
- `bool isFinished()`: 检查是否完成
- `void run()`: 运行修改器
- `void dependency(Modificator * modificator)`: 添加依赖
- `void postfunction(Modificator * modificator)`: 添加后处理函数

### 保护成员
- `RmgMap & map`: RMG地图引用
- `std::shared_ptr<MapProxy> mapProxy`: 地图代理
- `CMapGenerator & generator`: 地图生成器引用
- `Zone & zone`: 区域引用
- `bool finished`: 完成标志
- `mutable std::recursive_mutex externalAccessMutex`: 外部访问互斥量

### 私有方法
- `virtual void process() = 0`: 纯虚处理方法
- `void dump()`: 调试输出

### 私有成员
- `std::string name`: 修改器名称
- `std::list<Modificator*> preceeders`: 前置修改器列表
- `mutable std::shared_mutex mx`: 任务调度互斥量

## 设计特点

- 提供依赖管理和任务调度机制
- 支持多线程安全的地图修改
- 模块化设计，易于扩展新的地图生成步骤
- 包含调试和状态检查功能