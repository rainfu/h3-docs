<!-- 来源: E:\develop\heroes\vcmi\lib\pathfinder\PathfinderOptions.h -->
# PathfinderOptions头文件

PathfinderOptions头文件定义了VCMI中寻路系统的选项和配置类，用于控制英雄移动的各种规则和限制。

## PathfinderOptions结构体

### 结构体定义
```cpp
struct DLL_LINKAGE PathfinderOptions
```

### 飞行和水上行走选项
- `bool useFlying`: 使用飞行
- `bool useWaterWalking`: 使用水上行走
- `bool lightweightFlyingMode`: 轻量飞行模式（减少路径计算复杂度）

### 传送选项
- `bool useTeleportTwoWay`: 使用双向传送（双向巨石和地下之门）
- `bool useTeleportOneWay`: 使用单向传送（只有一个已知出口的单向巨石）
- `bool useTeleportOneWayRandom`: 使用随机单向传送（有多个已知出口的单向巨石）
- `bool useTeleportWhirlpool`: 使用漩涡传送
- `bool forceUseTeleportWhirlpool`: 强制使用漩涡传送
- `bool useCastleGate`: 使用城堡大门（未完成）

### 其他选项
- `bool ignoreGuards`: 忽略守卫
- `bool useEmbarkAndDisembark`: 使用登船和离船
- `bool oneTurnSpecialLayersLimit`: 单回合特殊层限制
- `bool originalFlyRules`: 原始飞行规则
- `bool canUseCast`: 允许使用施法（AI）
- `bool allowLayerTransitioningAfterBattle`: 允许战斗后层转换（AI）

### 限制选项
- `uint8_t turnLimit`: 最大计算回合数

### 构造函数
- `PathfinderOptions(const IGameInfoCallback & callback)`: 构造函数

## PathfinderConfig类

### 类定义
```cpp
class DLL_LINKAGE PathfinderConfig
```

### 成员变量
- `std::shared_ptr<INodeStorage> nodeStorage`: 节点存储
- `std::vector<std::shared_ptr<IPathfindingRule>> rules`: 寻路规则
- `PathfinderOptions options`: 寻路选项

### 构造函数
- `PathfinderConfig(std::shared_ptr<INodeStorage> nodeStorage, const IGameInfoCallback & callback, std::vector<std::shared_ptr<IPathfindingRule>> rules)`: 构造函数

### 虚方法
- `virtual CPathfinderHelper * getOrCreatePathfinderHelper(const PathNodeInfo & source, const IGameInfoCallback & gameInfo) = 0`: 获取或创建寻路助手

## SingleHeroPathfinderConfig类

### 类定义
```cpp
class DLL_LINKAGE SingleHeroPathfinderConfig : public PathfinderConfig
```

### 私有成员
- `std::unique_ptr<CPathfinderHelper> pathfinderHelper`: 寻路助手
- `const CGHeroInstance * hero`: 英雄指针

### 构造函数和析构函数
- `SingleHeroPathfinderConfig(CPathsInfo & out, const IGameInfoCallback & gs, const CGHeroInstance * hero)`: 构造函数
- `virtual ~SingleHeroPathfinderConfig()`: 虚析构函数

### 继承的方法
- `CPathfinderHelper * getOrCreatePathfinderHelper(const PathNodeInfo & source, const IGameInfoCallback & gameInfo) override`: 获取或创建寻路助手

### 静态方法
- `static std::vector<std::shared_ptr<IPathfindingRule>> buildRuleSet()`: 构建规则集

## 设计特点

- 灵活的寻路选项配置
- 支持多种移动方式（飞行、水上行走、传送）
- 提供性能优化选项（如轻量飞行模式）
- 支持AI特定的寻路规则
- 模块化设计，支持自定义寻路规则