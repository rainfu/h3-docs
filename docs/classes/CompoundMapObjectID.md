<!-- 来源: E:\develop\heroes\vcmi\lib\mapObjects\CompoundMapObjectID.h -->
# CompoundMapObjectID头文件

CompoundMapObjectID头文件定义了VCMI中复合地图对象ID的结构体，用于唯一标识地图上的复合对象。

## CompoundMapObjectID结构体

### 结构体定义
```cpp
struct DLL_LINKAGE CompoundMapObjectID
```

### 成员变量
- `si32 primaryID`: 主ID
- `si32 secondaryID`: 次ID

### 构造函数
- `CompoundMapObjectID()`: 默认构造函数，初始化为(0,0)
- `CompoundMapObjectID(si32 primID, si32 secID)`: 带参数构造函数

### 比较运算符
- `bool operator<(const CompoundMapObjectID& other) const`: 小于比较运算符
- `bool operator==(const CompoundMapObjectID& other) const`: 相等比较运算符

## 设计特点

- 复合ID设计，支持主ID和次ID的组合标识
- 提供完整的比较运算，支持排序和查找
- 用于唯一标识复杂的地图对象组合
- 轻量级结构体，适合作为键使用