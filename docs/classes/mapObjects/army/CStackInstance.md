# CStackInstance

## 概述

`CStackInstance` 类实现了VCMI中生物堆栈实例的完整功能。生物堆栈是游戏中军队的基本单位，包含生物类型、数量、经验、神器装备、奖励加成等完整信息。该类是战斗系统和军队管理的基础组件。

## 主要组件

### CStackInstance 类

生物堆栈实例类，多重继承自多个基类以提供完整功能。

#### 继承层次

- **CBonusSystemNode**: 奖励系统节点，提供加成计算
- **CStackBasicDescriptor**: 基础堆栈描述符，提供基本属性
- **CArtifactSet**: 神器集合，提供装备功能
- **ACreature**: 生物抽象，提供生物相关接口
- **GameCallbackHolder**: 游戏回调持有者

#### 主要属性

- `nativeTerrain`: 原生地形奖励缓存
- `initiative`: 先攻奖励缓存
- `armyInstance`: 所属军队实例指针
- `totalExperience`: 总经验值
- `randomStack`: 随机堆栈信息（地图加载时使用）

#### 核心方法

```cpp
CArmedInstance * getArmy();
const CArmedInstance * getArmy() const;
void setArmy(CArmedInstance * ArmyObj);
```

获取和设置所属军队。

```cpp
TExpType getTotalExperience() const;
TExpType getAverageExperience() const;
virtual bool canGainExperience() const;
```

经验值管理。

```cpp
virtual ui64 getPower() const;
```

获取战斗力。

```cpp
virtual ui64 getMarketValue() const;
```

获取市场价值。

```cpp
CCreature::CreatureQuantityId getQuantityID() const;
std::string getQuantityTXT(bool capitalized = true) const;
```

获取数量标识和文本。

```cpp
virtual int getExpRank() const;
virtual int getLevel() const;
```

获取经验等级和生物等级。

```cpp
CreatureID getCreatureID() const;
std::string getName() const;
```

获取生物ID和名称。

#### 构造函数

```cpp
CStackInstance(IGameInfoCallback * cb);
CStackInstance(IGameInfoCallback * cb, BonusNodeType nodeType, bool isHypothetic = false);
CStackInstance(IGameInfoCallback * cb, const CreatureID & id, TQuantity count, bool isHypothetic = false);
```

创建堆栈实例。

#### 生物管理方法

```cpp
void setType(const CreatureID & creID);
void setType(const CCreature * c) final;
void setCount(TQuantity amount) final;
```

设置生物类型和数量。

#### 经验管理方法

```cpp
void giveAverageStackExperience(TExpType exp);
void giveTotalStackExperience(TExpType exp);
```

给予经验值。

#### 验证和装备方法

```cpp
bool valid(bool allowUnrandomized) const;
```

验证堆栈有效性。

```cpp
ArtPlacementMap putArtifact(const ArtifactPosition & pos, const CArtifactInstance * art) override;
void removeArtifact(const ArtifactPosition & pos) override;
ArtBearer bearerType() const override;
```

神器装备管理。

#### 奖励系统方法

```cpp
std::string bonusToString(const std::shared_ptr<Bonus> & bonus) const override;
ImagePath bonusToGraphics(const std::shared_ptr<Bonus> & bonus) const;
```

奖励描述和图形。

```cpp
const IBonusBearer * getBonusBearer() const override;
FactionID getFactionID() const override;
```

奖励承载者和派系ID。

#### 战斗相关方法

```cpp
int32_t getInitiative(int turn = 0) const final;
TerrainId getNativeTerrain() const final;
TerrainId getCurrentTerrain() const;
```

先攻和地形相关。

```cpp
std::string nodeName() const override;
PlayerColor getOwner() const override;
```

节点名称和拥有者。

## 机制说明

### 经验系统

1. **总经验**: 堆栈的总经验值
2. **平均经验**: 每个单位的平均经验
3. **经验获取**: 可以获得经验并升级
4. **等级计算**: 根据经验计算等级和经验等级

### 神器装备

1. **装备槽位**: 支持多种神器装备位置
2. **装备效果**: 装备的神器提供各种加成
3. **装备管理**: 装备和卸载神器的完整系统

### 奖励系统集成

1. **节点注册**: 作为奖励系统节点注册
2. **加成计算**: 计算各种奖励加成效果
3. **地形加成**: 原生地形和当前地形加成
4. **先攻计算**: 动态计算先攻值

### 军队集成

1. **军队所属**: 每个堆栈属于特定军队
2. **所有权**: 通过军队确定拥有者
3. **战斗定位**: 在军队中的位置和角色

## 依赖关系

- **CBonusSystemNode**: 奖励系统节点
- **CStackBasicDescriptor**: 基础堆栈描述符
- **CArtifactSet**: 神器集合
- **ACreature**: 生物抽象类
- **GameCallbackHolder**: 游戏回调持有者
- **CArmedInstance**: 武装实例
- **CCreature**: 生物类

## 使用示例

### 创建生物堆栈

```cpp
#include "CStackInstance.h"

// 创建指定生物的堆栈
auto stack = std::make_shared<CStackInstance>(cb, CreatureID::GOBLIN, 50);

// 设置到军队中
stack->setArmy(hero); // hero是CArmedInstance的子类
```

### 经验管理

```cpp
#include "CStackInstance.h"

// 给予平均经验（每个单位）
stack->giveAverageStackExperience(100);

// 给予总经验
stack->giveTotalStackExperience(5000);

// 检查等级
int level = stack->getLevel();
int expRank = stack->getExpRank();
```

### 神器装备

```cpp
#include "CStackInstance.h"

// 装备神器
auto sword = std::make_shared<CArtifactInstance>(ArtifactID::SWORD_OF_HELLFIRE);
auto placement = stack->putArtifact(ArtifactPosition::RIGHT_HAND, sword);

// 检查装备
bool hasSword = stack->hasArt(ArtifactID::SWORD_OF_HELLFIRE);
```

### 奖励计算

```cpp
#include "CStackInstance.h"

// 获取先攻值
int initiative = stack->getInitiative(currentTurn);

// 获取原生地形
TerrainId nativeTerrain = stack->getNativeTerrain();

// 获取当前地形加成
TerrainId currentTerrain = stack->getCurrentTerrain();
```

### 战斗力评估

```cpp
#include "CStackInstance.h"

// 获取战斗力
ui64 power = stack->getPower();

// 获取市场价值
ui64 marketValue = stack->getMarketValue();

// 获取数量文本
std::string quantityText = stack->getQuantityTXT(); // "50 Goblins"
```

### 序列化

```cpp
#include "CStackInstance.h"

// JSON序列化
JsonSerializeFormat jsonHandler;
stack->serializeJson(jsonHandler);

// 二进制序列化
BinarySerializer binary;
stack->serialize(binary);
```

## 性能特性

- **内存使用**: 存储经验、神器、奖励等完整信息
- **计算开销**: 奖励和加成计算有一定开销
- **序列化**: 支持多种序列化格式
- **查询效率**: 快速的属性查询

## 实现注意事项

1. **军队关联**: 确保正确设置和维护军队关联
2. **经验一致性**: 正确处理总经验和平均经验的转换
3. **神器验证**: 确保神器装备的有效性和兼容性
4. **奖励同步**: 保持奖励系统与堆栈状态同步

## 相关文档

- [CStackBasicDescriptor](CStackBasicDescriptor.md) - 基础堆栈描述符
- [CArmedInstance](CArmedInstance.md) - 武装实例基类
- [CArtifactSet](../entities/CArtifactSet.md) - 神器集合
- [CBonusSystemNode](../bonuses/CBonusSystemNode.md) - 奖励系统节点