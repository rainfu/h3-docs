# IMarket

## 概述

`IMarket` 接口定义了VCMI中市场对象的标准行为，为所有市场类型（如城镇市场、黑市、大学等）提供统一的交易接口。该接口支持多种交易模式，包括资源、生物、神器、技能等的买卖。

## 主要组件

### IMarket 接口

市场对象的基接口，继承自Serializeable。

#### 嵌套类

##### CArtifactSetAltar 类

市场神器存储的特殊神器集合类。

```cpp
class CArtifactSetAltar : public CArtifactSet
{
public:
    CArtifactSetAltar(IGameInfoCallback *cb);
    IGameInfoCallback * getCallback() const override;
    ArtBearer bearerType() const override;
};
```

#### 公共方法

```cpp
virtual ObjectInstanceID getObjInstanceID() const = 0;
```

获取市场对象的实例ID。

```cpp
virtual int getMarketEfficiency() const = 0;
```

获取市场效率（在CGTownInstance中为marketCount）。

```cpp
virtual bool allowsTrade(const EMarketMode mode) const;
```

检查是否允许指定交易模式。

```cpp
virtual int availableUnits(const EMarketMode mode, const int marketItemSerial) const;
```

获取指定交易模式和物品的可用单位数量（-1表示无限）。

```cpp
virtual std::vector<TradeItemBuy> availableItemsIds(const EMarketMode mode) const;
```

获取指定交易模式下可用的物品ID列表。

```cpp
virtual std::set<EMarketMode> availableModes() const = 0;
```

获取市场支持的所有交易模式。

```cpp
CArtifactSet * getArtifactsStorage() const;
```

获取神器存储。

```cpp
virtual bool getOffer(int id1, int id2, int &val1, int &val2, EMarketMode mode) const;
```

获取交易报价：用val1个id1物品换取val2个id2物品。

#### 私有属性

- `altarArtifactsStorage`: 神器祭坛存储的唯一指针

## 交易模式

### EMarketMode 枚举

市场支持的交易模式：

- **RESOURCE_RESOURCE**: 资源间交易
- **RESOURCE_PLAYER**: 资源与玩家交易
- **CREATURE_RESOURCE**: 生物与资源交易
- **RESOURCE_ARTIFACT**: 资源与神器交易
- **ARTIFACT_RESOURCE**: 神器与资源交易
- **ARTIFACT_EXP**: 神器与经验交易
- **CREATURE_EXP**: 生物与经验交易
- **RESOURCE_SKILL**: 资源与技能交易
- **ARTIFACT_SKILL**: 神器与技能交易
- **CREATURE_SKILL**: 生物与技能交易
- **SKILL_RESOURCE**: 技能与资源交易

## 机制说明

### 交易系统

1. **模式支持**: 不同市场类型支持不同的交易模式
2. **物品可用性**: 检查交易物品的可用数量
3. **价格计算**: 根据市场效率计算交易价格
4. **神器存储**: 专门的神器存储系统用于市场交易

### 市场效率

1. **效率等级**: 影响交易的价格比率
2. **城镇市场**: 通常有最高的效率
3. **特殊市场**: 黑市、大学等有特定限制
4. **动态调整**: 可以根据游戏状态调整效率

## 依赖关系

- **Serializeable**: 序列化基类
- **TradeItem**: 交易物品结构
- **EMarketMode**: 市场模式枚举
- **CArtifactSet**: 神器集合类
- **ObjectInstanceID**: 对象实例ID类型

## 使用示例

### 实现市场接口

```cpp
#include "IMarket.h"

class MyMarket : public CGObjectInstance, public IMarket
{
public:
    MyMarket(IGameInfoCallback *cb) : CGObjectInstance(cb), IMarket(cb) {}

    ObjectInstanceID getObjInstanceID() const override
    {
        return id;
    }

    int getMarketEfficiency() const override
    {
        return 5; // 市场效率等级
    }

    std::set<EMarketMode> availableModes() const override
    {
        return {EMarketMode::RESOURCE_RESOURCE, EMarketMode::CREATURE_RESOURCE};
    }
};
```

### 检查交易可用性

```cpp
#include "IMarket.h"

// 检查是否允许资源交易
bool canTradeResources = market->allowsTrade(EMarketMode::RESOURCE_RESOURCE);

// 获取可用物品
auto availableItems = market->availableItemsIds(EMarketMode::CREATURE_RESOURCE);

// 检查物品数量
int goblinCount = market->availableUnits(EMarketMode::CREATURE_RESOURCE, 
                                        CreatureID::GOBLIN);
```

### 获取交易报价

```cpp
#include "IMarket.h"

// 获取用10金币购买食尸鬼的报价
int goldAmount = 10;
int creatureId = CreatureID::GHOUL;
int requiredGold, receivedCreatures;

bool offerValid = market->getOffer(goldAmount, creatureId, 
                                  requiredGold, receivedCreatures,
                                  EMarketMode::CREATURE_RESOURCE);

if (offerValid)
{
    // 显示交易信息
    std::cout << "用 " << requiredGold << " 金币购买 " 
              << receivedCreatures << " 个食尸鬼" << std::endl;
}
```

### 使用神器存储

```cpp
#include "IMarket.h"

// 获取市场神器存储
CArtifactSet * artifacts = market->getArtifactsStorage();

// 检查是否有特定神器
if (artifacts->hasArt(ArtifactID::SPELLBOOK))
{
    // 神器可用用于交易
}
```

## 性能特性

- **查询效率**: 快速的交易模式和物品可用性检查
- **存储开销**: 神器存储根据市场大小决定内存使用
- **计算复杂度**: 报价计算通常是O(1)操作

## 实现注意事项

1. **模式一致性**: 确保availableModes()返回的模式在其他方法中正确支持
2. **物品验证**: 正确验证交易物品的ID和可用性
3. **价格合理性**: 确保交易价格符合游戏平衡
4. **存储管理**: 正确管理神器存储的生命周期

## 相关文档

- [CGMarket](CGMarket.md) - 市场对象实现
- [TradeItem](../networkPacks/TradeItem.md) - 交易物品结构
- [CArtifactSet](../entities/CArtifactSet.md) - 神器集合类