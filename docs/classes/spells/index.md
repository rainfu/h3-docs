# 法术系统 (spells)

法术系统负责管理游戏中所有的魔法技能，包括战斗法术和冒险法术。

## 主要类和结构体

### 核心施法者类

#### Caster
施法者接口，定义了施法者的基本属性和方法。

- 功能：定义施法者的基本接口
- 依赖：无
- 相关类：[ProxyCaster](ProxyCaster.md), [ExternalCaster](ExternalCaster.md), [BonusCaster](BonusCaster.md)

#### ProxyCaster
代理施法者类，实现代理模式用于转发施法者操作。

- 功能：代理其他施法者的操作，提供统一的接口
- 依赖：[Caster](Caster.md)
- 相关类：[ExternalCaster](ExternalCaster.md), [ObstacleCasterProxy](ObstacleCasterProxy.md)

#### ExternalCaster
外部施法者类，用于脚本或事件触发的法术。

- 功能：处理外部施法行为，不消耗法力值
- 依赖：[ProxyCaster](ProxyCaster.md)
- 相关类：[ProxyCaster](ProxyCaster.md)

#### BonusCaster
加成施法者类，基于奖励系统计算法术效果。

- 功能：根据奖励系统计算法术强度和效果
- 依赖：[ProxyCaster](ProxyCaster.md)
- 相关类：[ProxyCaster](ProxyCaster.md)

#### ObstacleCasterProxy
障碍物施法者代理，用于法术创建的持续效果。

- 功能：代理障碍物的施法行为，使用障碍物属性
- 依赖：[SilentCaster](ObstacleCasterProxy.md#silentcaster-类), [ProxyCaster](ProxyCaster.md)
- 相关类：[ProxyCaster](ProxyCaster.md)

### 法术机制类

#### ISpellMechanics
法术机制接口，定义了法术效果计算和应用的核心方法。

- 功能：定义法术机制的抽象接口
- 依赖：[Mechanics](Mechanics.md), [Caster](Caster.md)
- 相关类：[BaseMechanics](BaseMechanics.md), [BattleSpellMechanics](BattleSpellMechanics.md)

#### BattleSpellMechanics
战斗法术机制类，实现战斗中法术的具体行为。

- 功能：处理战斗法术的施放逻辑和效果应用
- 依赖：[ISpellMechanics](ISpellMechanics.md), [Mechanics](Mechanics.md)
- 相关类：[BaseMechanics](BaseMechanics.md)

#### AbilityCaster
能力施法者类，处理基于能力的法术施放。

- 功能：根据单位能力计算法术效果
- 依赖：[ProxyCaster](ProxyCaster.md)
- 相关类：[ProxyCaster](ProxyCaster.md)

### 法术数据管理

#### CSpellHandler
法术处理器类，管理所有法术对象的加载和生命周期。

- 功能：加载和管理法术配置数据
- 依赖：[CHandlerBase](../../classes/CHandlerBase.md), [CSpell](CSpell.md)
- 相关类：[CSpell](CSpell.md), [SpellSchoolHandler](SpellSchoolHandler.md)

#### SpellSchoolHandler
法术学派处理器，管理法术学派数据和资源。

- 功能：处理法术学派的配置和本地化
- 依赖：[IHandlerBase](../../classes/IHandlerBase.md), [SpellSchoolType](SpellSchoolHandler.md#spellschooltype-类)
- 相关类：[SpellSchoolType](SpellSchoolHandler.md#spellschooltype-类)

### 条件和验证

#### TargetCondition
目标条件系统，用于检查法术目标的有效性。

- 功能：验证法术是否可以对指定目标生效
- 依赖：[IReceptiveCheck](../../classes/IReceptiveCheck.md), [TargetConditionItem](TargetCondition.md#targetconditionitem-接口)
- 相关类：[TargetConditionItemFactory](TargetCondition.md#targetconditionitemfactory-工厂类)

#### Problem
问题收集系统，用于记录法术施放过程中的问题。

- 功能：收集和报告法术验证问题
- 依赖：[MetaString](../../classes/MetaString.md)
- 相关类：[ProblemImpl](Problem.md#problemimpl-实现)

### 辅助结构体

#### ViewSpellInt
法术视图辅助结构体，定义地图对象的定位信息。

- 功能：存储法术效果可视化所需的定位数据
- 依赖：[int3](../../classes/int3.md), [Obj](../../constants/Obj.md)
- 相关类：[ObjectPosInfo](ViewSpellInt.md#objectposinfo-结构体)

## 子目录

### adventure/
冒险法术相关的类和效果。

- [AdventureSpellMechanics](adventure/AdventureSpellMechanics.md): 冒险法术机制
- [TownPortalEffect](adventure/TownPortalEffect.md): 城镇传送效果
- [DimensionDoorEffect](adventure/DimensionDoorEffect.md): 任意门效果

### effects/
法术效果相关的类。

包含各种战斗法术效果的实现，如伤害、治疗、召唤等。

## 依赖关系

法术系统依赖以下模块：
- [battle](../battle/index.md): 战斗相关功能
- [entities](../entities/index.md): 法术和施法者定义
- [bonuses](../bonuses/index.md): 属性加成系统
- [GameConstants](../GameConstants.md): 游戏常量

## 类依赖排序

1. [GameConstants](../GameConstants.md) - 游戏常量
2. [bonuses](../bonuses/index.md) - 属性加成系统
3. [battle](../battle/index.md) - 战斗系统
4. [entities](../entities/index.md) - 实体系统
5. spells/ - 法术系统