<!-- 来源: E:\develop\heroes\vcmi\lib\pathfinder\PathfindingRules.h -->
# PathfindingRules头文件

PathfindingRules头文件定义了VCMI中寻路规则的接口和实现类，用于控制寻路算法的行为。

## IPathfindingRule接口类

### 类定义
```cpp
class IPathfindingRule
```

### 纯虚方法
- `virtual void process(const PathNodeInfo & source, CDestinationNodeInfo & destination, const PathfinderConfig * pathfinderConfig, CPathfinderHelper * pathfinderHelper) const = 0`: 处理寻路规则

### 虚析构函数
- `virtual ~IPathfindingRule() = default`: 虚析构函数

## MovementCostRule类

### 类定义
```cpp
class DLL_LINKAGE MovementCostRule : public IPathfindingRule
```

### 主要方法
- `void process(...) const override`: 处理移动成本规则

## LayerTransitionRule类

### 类定义
```cpp
class DLL_LINKAGE LayerTransitionRule : public IPathfindingRule
```

### 主要方法
- `void process(...) const override`: 处理层转换规则

## DestinationActionRule类

### 类定义
```cpp
class DLL_LINKAGE DestinationActionRule : public IPathfindingRule
```

### 主要方法
- `void process(...) const override`: 处理目标动作规则

## PathfinderBlockingRule类

### 类定义
```cpp
class DLL_LINKAGE PathfinderBlockingRule : public IPathfindingRule
```

### 枚举类型
```cpp
enum class BlockingReason
```
- `NONE = 0`: 无阻挡
- `SOURCE_GUARDED = 1`: 源点被守卫
- `DESTINATION_GUARDED = 2`: 目标点被守卫
- `SOURCE_BLOCKED = 3`: 源点被阻挡
- `DESTINATION_BLOCKED = 4`: 目标点被阻挡
- `DESTINATION_BLOCKVIS = 5`: 目标点阻挡访问
- `DESTINATION_VISIT = 6`: 目标点可访问

### 主要方法
- `void process(...) const override`: 处理阻挡规则

### 保护方法
- `virtual BlockingReason getBlockingReason(...) const = 0`: 获取阻挡原因

## MovementAfterDestinationRule类

### 类定义
```cpp
class DLL_LINKAGE MovementAfterDestinationRule : public PathfinderBlockingRule
```

### 主要方法
- `void process(...) const override`: 处理目标后移动规则

### 保护方法
- `BlockingReason getBlockingReason(...) const override`: 获取阻挡原因

## MovementToDestinationRule类

### 类定义
```cpp
class DLL_LINKAGE MovementToDestinationRule : public PathfinderBlockingRule
```

### 保护方法
- `BlockingReason getBlockingReason(...) const override`: 获取阻挡原因

## 设计特点

- 规则系统设计，支持组合不同寻路规则
- 提供移动成本、层转换、目标动作、阻挡等规则
- 支持复杂的阻挡原因判断
- 模块化架构，易于扩展新的寻路规则