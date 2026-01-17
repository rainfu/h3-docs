<!-- 来源: E:\develop\heroes\vcmi\lib\rmg\CRoadRandomizer.h -->
# CRoadRandomizer头文件

CRoadRandomizer头文件定义了VCMI中随机地图生成器的道路随机化类。

## CRoadRandomizer类

### 类定义
```cpp
class CRoadRandomizer
```

### 构造函数
- `CRoadRandomizer(RmgMap & map)`: 构造函数，接收RMG地图引用

### 析构函数
- `~CRoadRandomizer() = default`: 默认析构函数

### 公共方法
- `void dropRandomRoads(vstd::RNG * rand)`: 随机放置道路

### 私有成员
- `RmgMap & map`: RMG地图引用

## 辅助函数

### 并查集辅助函数

#### findSet函数
```cpp
TRmgTemplateZoneId findSet(std::map<TRmgTemplateZoneId, TRmgTemplateZoneId> & parent, TRmgTemplateZoneId x)
```
查找集合的根节点（路径压缩）。

**参数:**
- `parent`: 父节点映射
- `x`: 要查找的节点

**返回值:** 根节点ID

#### unionSets函数
```cpp
void unionSets(std::map<TRmgTemplateZoneId, TRmgTemplateZoneId> & parent, TRmgTemplateZoneId x, TRmgTemplateZoneId y)
```
合并两个集合。

**参数:**
- `parent`: 父节点映射
- `x`: 第一个节点
- `y`: 第二个节点

## 设计特点

- 专门负责随机地图中的道路生成
- 使用并查集算法优化道路连接逻辑
- 支持随机数生成器确保可重现的结果
- 与RMG地图紧密集成