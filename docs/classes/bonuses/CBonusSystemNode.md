# CBonusSystemNode

奖励系统节点类，实现奖励树状结构的节点。

## 📋 类概述

`CBonusSystemNode` 是 VCMI 奖励系统的核心节点类，实现了一个复杂的树状奖励传播系统。该类管理奖励的继承、传播和缓存，支持父子节点关系和复杂的奖励计算逻辑。

## 🔧 主要属性

### 奖励存储
- `bonuses`: 影响此节点的所有奖励（本地和继承的）
- `exportedBonuses`: 从此节点导出的奖励
- `cachedBonuses`: 缓存的奖励列表
- `cachedRequests`: 缓存的查询请求

### 节点关系
- `parentsToInherit`: 继承奖励的父节点
- `parentsToPropagate`: 传播奖励的父节点
- `children`: 子节点列表

### 节点状态
- `nodeType`: 节点类型
- `isHypotheticNode`: 是否为假设节点
- `nodeChanged`: 节点变更计数器
- `cachedLast`: 最后缓存版本

## 🎯 核心方法

### 构造函数
```cpp
// 指定类型和假设状态
CBonusSystemNode(BonusNodeType nodeType, bool isHypotetic);

// 仅指定类型
CBonusSystemNode(BonusNodeType nodeType);
```

### 奖励查询
```cpp
// 获取所有符合条件的奖励
TConstBonusListPtr getAllBonuses(const CSelector &selector, const std::string &cachingStr = "") const override;

// 获取第一个符合条件的奖励
std::shared_ptr<const Bonus> getFirstBonus(const CSelector & selector) const;

// 获取本地奖励（可写）
std::shared_ptr<Bonus> getLocalBonus(const CSelector & selector);
```

### 节点关系管理
```cpp
// 连接到父节点
void attachTo(CBonusSystemNode & parent);
void attachToSource(const CBonusSystemNode & parent);

// 从父节点断开
void detachFrom(CBonusSystemNode & parent);
void detachFromSource(const CBonusSystemNode & parent);
void detachFromAll();

// 获取父节点
void getDirectParents(TCNodes &out) const;
const TCNodesVector & getParentNodes() const;
```

### 奖励管理
```cpp
// 添加新奖励
virtual void addNewBonus(const std::shared_ptr<Bonus>& b);

// 累积奖励（合并相同类型）
void accumulateBonus(const std::shared_ptr<Bonus>& b);

// 移除奖励
void removeBonus(const std::shared_ptr<Bonus>& b);
void removeBonuses(const CSelector & selector);
void removeBonusesRecursive(const CSelector & s);
```

### 奖励持续时间
```cpp
// 减少奖励持续时间
void reduceBonusDurations(const CSelector &s);
```

### 缓存管理
```cpp
// 标记节点已变更
void nodeHasChanged();

// 获取树版本
int32_t getTreeVersion() const override;
```

### 导出奖励
```cpp
// 获取导出的奖励列表
BonusList & getExportedBonusList();
const BonusList & getExportedBonusList() const;
```

## 🔗 依赖关系

### 依赖的类
- `IBonusBearer`: 奖励承载者接口
- `BonusList`: 奖励列表
- `CSelector`: 奖励选择器
- `BonusNodeType`: 节点类型枚举

### 被依赖关系
- 被所有游戏实体继承实现奖励系统
- 被 `CStackInstance`、`CHero` 等类使用
- 被奖励传播算法使用

## 📝 使用示例

### 创建和配置节点
```cpp
// 创建英雄节点
CBonusSystemNode heroNode(BonusNodeType::HERO);

// 创建神器节点
CBonusSystemNode artifactNode(BonusNodeType::ARTIFACT);

// 将神器附加到英雄
artifactNode.attachTo(heroNode);
```

### 添加和管理奖励
```cpp
// 添加攻击力奖励
auto attackBonus = std::make_shared<Bonus>(
    BonusDuration::PERMANENT,
    BonusType::PRIMARY_SKILL,
    BonusSource::ARTIFACT,
    2,
    BonusSourceID(swordId),
    BonusSubtypeID(PrimarySkill::ATTACK)
);
artifactNode.addNewBonus(attackBonus);

// 累积奖励（相同类型会合并）
auto anotherAttackBonus = std::make_shared<Bonus>(
    BonusDuration::PERMANENT,
    BonusType::PRIMARY_SKILL,
    BonusSource::ARTIFACT,
    1,
    BonusSourceID(shieldId),
    BonusSubtypeID(PrimarySkill::ATTACK)
);
artifactNode.accumulateBonus(anotherAttackBonus);  // 总共+3攻击
```

### 查询奖励
```cpp
// 查询所有攻击奖励
auto attackBonuses = heroNode.getAllBonuses(
    Selector::type()(BonusType::PRIMARY_SKILL)
           .And(Selector::subtype()(PrimarySkill::ATTACK))
);

// 获取第一个幸运奖励
auto luckBonus = heroNode.getFirstBonus(Selector::type()(BonusType::LUCK));

// 使用缓存查询
auto cachedResult = heroNode.getAllBonuses(
    Selector::sourceType()(BonusSource::ARTIFACT),
    "artifact_bonuses"  // 缓存键
);
```

### 奖励传播
```cpp
// 神器奖励会自动传播到英雄
// 查询英雄的所有奖励（包括继承的）
auto allHeroBonuses = heroNode.getAllBonuses(Selector::all());

// 奖励传播到子节点
CBonusSystemNode unitNode(BonusNodeType::STACK_BATTLE);
unitNode.attachTo(heroNode);  // 英雄奖励传播到单位

auto unitAttack = unitNode.getAllBonuses(
    Selector::type()(BonusType::PRIMARY_SKILL)
           .And(Selector::subtype()(PrimarySkill::ATTACK))
);
```

### 奖励生命周期管理
```cpp
// 减少临时奖励持续时间
heroNode.reduceBonusDurations(Selector::duration()(BonusDuration::N_TURNS));

// 移除特定奖励
heroNode.removeBonuses(Selector::sourceType()(BonusSource::SPELL));

// 递归移除（包括子节点）
heroNode.removeBonusesRecursive(Selector::type()(BonusType::MORALE));
```

### 节点关系查询
```cpp
// 获取直接父节点
TCNodes parents;
heroNode.getDirectParents(parents);

// 检查节点类型
if (heroNode.getNodeType() == BonusNodeType::HERO) {
    // 这是英雄节点
}

// 获取树版本（用于缓存验证）
int32_t version = heroNode.getTreeVersion();
```

## ⚡ 性能特性

- **智能缓存**: 多级缓存系统提高查询性能
- **并发安全**: 使用读写锁支持并发访问
- **懒加载**: 奖励计算按需进行
- **版本控制**: 变更计数器确保缓存一致性

## 🔍 注意事项

1. **树状结构**: 节点关系形成复杂的树状结构
2. **传播机制**: 奖励沿树结构传播，方向可配置
3. **缓存一致性**: 节点变更时需要更新缓存
4. **内存管理**: 奖励使用共享指针管理生命周期

## 📊 节点类型

### BonusNodeType 枚举
```cpp
enum class BonusNodeType {
    HERO,           // 英雄
    ARTIFACT,       // 神器
    STACK_BATTLE,   // 战斗单位
    CREATURE,       // 生物
    PLAYER,         // 玩家
    TEAM,           // 队伍
    GLOBAL          // 全局
};
```

### 关系类型
- **继承关系**: 从父节点继承奖励（`parentsToInherit`）
- **传播关系**: 向父节点传播奖励（`parentsToPropagate`）
- **父子关系**: 标准的树状结构（`children`）

## 🔧 高级特性

### 奖励传播算法
- **红色路径**: 奖励传播的路径
- **限制器**: 控制奖励生效条件
- **更新器**: 修改奖励属性
- **传播更新器**: 控制传播行为

### 缓存策略
- **请求缓存**: 基于选择器的查询结果缓存
- **版本控制**: 通过变更计数器验证缓存有效性
- **并发访问**: 支持多线程并发查询

### 调试支持
- **节点信息**: `nodeName()` 和 `nodeShortInfo()` 提供调试信息
- **奖励描述**: `bonusToString()` 生成奖励描述