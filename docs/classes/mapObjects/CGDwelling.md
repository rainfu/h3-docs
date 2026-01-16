# CGDwelling

## 概述

`CGDwelling` 类表示地图上的生物栖息地，是玩家招募生物的重要场所。该类继承自 `CArmedInstance` 和 `IOwnableObject`，提供了生物招募、守卫生成和所有权管理等功能。

## 主要属性

- **randomizationInfo**: 随机化信息（可选，不序列化）
- **creatures**: 生物集合，按等级组织的生物ID向量对

## CGDwellingRandomizationInfo 结构体

随机化栖息地信息结构体。

#### 属性

- `allowedFactions`: 允许的派系集合
- `instanceId`: VCMI地图实例标识符
- `identifier`: H3M内部标识符
- `minLevel`: 最小生物等级（1-7）
- `maxLevel`: 最大生物等级（1-7）

## 类型定义

```cpp
using TCreaturesSet = std::vector<std::pair<ui32, std::vector<CreatureID>>>;
```

生物集合类型：向量中的每个元素都是一个pair，第一个是数量，第二个是可选的生物ID向量。

## 核心方法

### 初始化

```cpp
CGDwelling(IGameInfoCallback *cb, BonusNodeType nodeType);
CGDwelling(IGameInfoCallback *cb);
```

构造函数，支持奖励节点类型。

### 所有权接口

```cpp
const IOwnableObject * asOwnable() const final;
ResourceSet dailyIncome() const override;
std::vector<CreatureID> providedCreatures() const override;
```

实现IOwnableObject接口。

### 显示和图像

```cpp
AnimationPath getKingdomOverviewImage() const;
```

获取王国概览图像路径。

### 游戏事件

```cpp
void onHeroVisit(IGameEventCallback & gameEvents, const CGHeroInstance * h) const override;
void newTurn(IGameEventCallback & gameEvents, IGameRandomizer & gameRandomizer) const override;
void battleFinished(IGameEventCallback & gameEvents, const CGHeroInstance *hero, const BattleResult &result) const override;
void blockingDialogAnswered(IGameEventCallback & gameEvents, const CGHeroInstance *hero, int32_t answer) const override;
```

处理英雄访问、新回合、战斗结束和对话回答。

### 随机化和初始化

```cpp
void pickRandomObject(IGameRandomizer & gameRandomizer) override;
void initObj(IGameRandomizer & gameRandomizer) override;
```

随机对象选择和对象初始化。

### 访问控制

```cpp
std::vector<Component> getPopupComponents(PlayerColor player) const override;
bool wasVisited(PlayerColor player) const override;
```

获取弹出组件和检查访问状态。

## 私有方法

### 随机化逻辑

```cpp
FactionID randomizeFaction(IGameRandomizer & gameRandomizer);
int randomizeLevel(vstd::RNG & rand);
```

随机化派系和等级。

### 守卫管理

```cpp
void updateGuards(IGameEventCallback & gameEvents) const;
```

更新守卫生物。

### 英雄交互

```cpp
void heroAcceptsCreatures(IGameEventCallback & gameEvents, const CGHeroInstance *h) const;
```

处理英雄接受生物的逻辑。

## 栖息地机制

1. **生物招募**: 玩家可以从栖息地招募生物加入军队
2. **守卫系统**: 栖息地通常有守卫生物保护
3. **所有权**: 栖息地可以被玩家拥有，提供日常收入
4. **随机化**: 支持随机派系和等级的栖息地生成
5. **等级系统**: 不同等级的生物在不同级别的栖息地中可用

## 依赖关系

- **CArmedInstance**: 武装实例基类
- **IOwnableObject**: 可拥有对象接口
- **IGameInfoCallback**: 游戏信息回调接口
- **CGHeroInstance**: 英雄实例类
- **FactionID**: 派系ID类型

## 使用示例

### 创建栖息地

```cpp
#include "CGDwelling.h"

// 创建栖息地实例
auto dwelling = std::make_shared<CGDwelling>(gameCallback);

// 设置生物配置
dwelling->creatures = {
    {10, {CreatureID::PEASANT}},     // 10个农民
    {5, {CreatureID::ARCHER}},       // 5个弓箭手
    {2, {CreatureID::GRIFFIN}}       // 2个狮鹫
};
```

### 配置随机化

```cpp
#include "CGDwelling.h"

// 设置随机化信息
CGDwellingRandomizationInfo randInfo;
randInfo.allowedFactions = {FactionID::CASTLE, FactionID::RAMPART};
randInfo.minLevel = 1;
randInfo.maxLevel = 4;

dwelling->randomizationInfo = randInfo;
```

### 处理英雄访问

```cpp
#include "CGDwelling.h"

void handleHeroVisit(const CGDwelling * dwelling, const CGHeroInstance * hero, IGameEventCallback & events) {
    // 英雄访问栖息地
    dwelling->onHeroVisit(events, hero);
}
```

### 获取栖息地信息

```cpp
#include "CGDwelling.h"

// 获取提供的生物类型
std::vector<CreatureID> availableCreatures = dwelling->providedCreatures();

// 获取日常收入
ResourceSet income = dwelling->dailyIncome();

// 检查是否被访问过
bool visited = dwelling->wasVisited(playerColor);
```

## 性能特性

- **内存使用**: 存储生物配置和随机化信息
- **初始化开销**: 随机化过程涉及派系和等级选择
- **访问效率**: 直接查询生物配置，无复杂计算

## 实现注意事项

1. **随机化时机**: 随机化在initObj阶段进行，确保一致性
2. **守卫更新**: 新回合时更新守卫状态
3. **所有权管理**: 通过IOwnableObject接口管理所有权
4. **序列化**: 只序列化生物配置，不序列化随机化信息

## 相关文档

- [CArmedInstance](CArmedInstance.md) - 武装实例基类
- [IOwnableObject](IOwnableObject.md) - 可拥有对象接口
- [CGHeroInstance](CGHeroInstance.md) - 英雄实例类