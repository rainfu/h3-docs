# CGMarket

## 概述

`CGMarket` 类及其子类实现了VCMI中的各种市场系统，包括普通市场、黑市和大学。该类继承自 `CGObjectInstance` 和 `IMarket`，提供了交易功能和市场管理的核心接口。

## 主要组件

### CGMarket 基类

基础市场类，提供通用的市场功能。

#### 核心方法

```cpp
CGMarket(IGameInfoCallback *cb);
```

构造函数。

```cpp
void onHeroVisit(IGameEventCallback & gameEvents, const CGHeroInstance * h) const override;
```

英雄访问时打开交易窗口。

```cpp
void initObj(IGameRandomizer & gameRandomizer) override;
```

初始化对象，设置交易技能。

#### IMarket 接口实现

```cpp
ObjectInstanceID getObjInstanceID() const override;
int getMarketEfficiency() const override;
int availableUnits(EMarketMode mode, int marketItemSerial) const override;
std::set<EMarketMode> availableModes() const override;
```

实现市场接口方法。

### CGBlackMarket 类

黑市类，提供随机神器的交易。

#### 主要属性

- `artifacts`: 可用的神器列表

#### 核心方法

```cpp
void newTurn(IGameEventCallback & gameEvents, IGameRandomizer & gameRandomizer) const override;
```

每月重置黑市的神器。

```cpp
std::vector<TradeItemBuy> availableItemsIds(EMarketMode mode) const override;
```

获取可用的物品ID列表。

### CGUniversity 类

大学类，提供技能学习的交易。

#### 主要属性

- `skills`: 可用的技能列表

#### 核心方法

```cpp
std::string getSpeechTranslated() const;
```

获取翻译后的演讲文本。

```cpp
std::vector<TradeItemBuy> availableItemsIds(EMarketMode mode) const override;
```

获取可用的技能ID列表。

```cpp
void onHeroVisit(IGameEventCallback & gameEvents, const CGHeroInstance * h) const override;
```

英雄访问时打开大学窗口。

```cpp
std::vector<Component> getPopupComponents(PlayerColor player) const override;
bool wasVisited(PlayerColor player) const override;
```

获取弹出组件和检查访问状态。

## 市场类型

### 普通市场 (CGMarket)
- 支持多种交易模式（资源、生物、神器等）
- 提供标准的交易界面
- 具有市场效率属性

### 黑市 (CGBlackMarket)
- 每月随机刷新可用神器
- 专门交易随机神器
- 提供稀有物品的获取途径

### 大学 (CGUniversity)
- 提供技能学习服务
- 具有独特的演讲系统
- 记录访问状态

## 依赖关系

- **CGObjectInstance**: 游戏对象实例基类
- **IMarket**: 市场接口
- **IGameInfoCallback**: 游戏信息回调接口
- **CGHeroInstance**: 英雄实例类
- **MarketInstanceConstructor**: 市场实例构造器

## 使用示例

### 创建普通市场

```cpp
#include "CGMarket.h"

// 创建市场实例
auto market = std::make_shared<CGMarket>(gameCallback);

// 初始化市场
market->initObj(gameRandomizer);
```

### 创建黑市

```cpp
#include "CGMarket.h"

// 创建黑市实例
auto blackMarket = std::make_shared<CGBlackMarket>(gameCallback);

// 设置可用神器
blackMarket->artifacts = {
    ArtifactID::SPELLBOOK,
    ArtifactID::MAGIC_BOOK,
    ArtifactID::ORB_OF_INHIBITION
};
```

### 创建大学

```cpp
#include "CGMarket.h"

// 创建大学实例
auto university = std::make_shared<CGUniversity>(gameCallback);

// 设置可用技能
university->skills = {
    SecondarySkill::SORCERY,
    SecondarySkill::WISDOM,
    SecondarySkill::SCHOLAR
};
```

### 处理英雄访问

```cpp
#include "CGMarket.h"

void handleHeroVisit(const CGMarket * market, const CGHeroInstance * hero, IGameEventCallback & events) {
    // 英雄访问市场
    market->onHeroVisit(events, hero);
}
```

### 查询市场信息

```cpp
#include "CGMarket.h"

// 获取市场效率
int efficiency = market->getMarketEfficiency();

// 获取可用交易模式
std::set<EMarketMode> modes = market->availableModes();

// 检查物品可用数量
int available = market->availableUnits(EMarketMode::RESOURCE_RESOURCE, resourceId);
```

## 市场机制

1. **交易模式**: 支持多种交易类型（资源、生物、神器、技能等）
2. **效率系统**: 市场效率影响交易比率
3. **供应限制**: 某些物品可能有数量限制
4. **动态更新**: 黑市每月刷新，大学记录访问状态

## 性能特性

- **内存使用**: 存储可用物品列表，内存使用与物品数量成正比
- **查询效率**: 直接列表查询，无复杂计算
- **初始化开销**: 黑市随机化过程涉及随机数生成

## 实现注意事项

1. **接口实现**: 正确实现IMarket接口的所有方法
2. **序列化**: 各子类序列化其特有属性
3. **随机化**: 黑市的神器随机化确保游戏重玩性
4. **状态管理**: 大学访问状态的正确维护

## 相关文档

- [CGObjectInstance](CGObjectInstance.md) - 游戏对象实例基类
- [IMarket](IMarket.md) - 市场接口
- [CGHeroInstance](CGHeroInstance.md) - 英雄实例类