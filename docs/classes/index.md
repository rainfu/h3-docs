# 类帮助文档

本节包含 VCMI 客户端核心库中所有重要类的详细文档。

## 📂 按模块分类

### 战斗系统 (battle/)

#### [BattleInfo](./battle/BattleInfo.md)
战斗信息管理类，负责存储和管理战斗相关的所有信息。

#### [Unit](./battle/Unit.md)
战斗单位抽象类，定义了战斗中单位的基本属性和行为。

#### [DamageCalculator](./battle/DamageCalculator.md)
伤害计算器，负责计算战斗中的各种伤害类型。

#### [BattleAction](./battle/BattleAction.md)
战斗动作类，定义了战斗中可执行的各种动作。

### 实体系统 (entities/)

#### [CHero](./entities/CHero.md)
英雄实体类，管理英雄的属性、技能和装备。

#### [CArtifact](./entities/CArtifact.md)
神器实体类，定义神器的属性和效果。

#### [CTown](./entities/CTown.md)
城镇实体类，管理城镇的建筑、守卫和资源。

#### [CCreature](./entities/CCreature.md)
生物实体类，定义游戏中各种生物的属性。

### 奖励系统 (bonuses/)

#### [Bonus](./bonuses/Bonus.md)
奖励/加成系统的基础类，定义各种加成的类型和效果。

#### [BonusList](./bonuses/BonusList.md)
奖励列表管理类，用于管理多个奖励的集合。

#### [CBonusSystemNode](./bonuses/CBonusSystemNode.md)
奖励系统节点类，实现奖励系统的树状结构。

### 游戏状态 (gameState/)

#### [CGameState](./gameState/CGameState.md)
游戏状态管理类，维护整个游戏的全局状态。

#### [CPlayerState](./gameState/CPlayerState.md)
玩家状态类，管理单个玩家的游戏状态。

## 🔍 快速查找

使用页面顶部的搜索框快速查找特定类或功能。

## 📝 文档说明

每个类的文档包含以下内容：

- **类概述**: 类的基本功能和用途
- **主要属性**: 重要的成员变量
- **核心方法**: 关键的成员函数及其功能
- **依赖关系**: 该类依赖的其他类和模块
- **使用示例**: 简单的使用代码示例（如果适用）

::: tip 提示
如果您发现文档有误或需要补充，请在 [GitHub Issues](https://github.com/vcmi/vcmi/issues) 中报告。
:::