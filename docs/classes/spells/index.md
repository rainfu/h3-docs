# 法术系统 (spells)

法术系统负责管理游戏中所有的魔法技能，包括战斗法术和冒险法术。

## 主要类和结构体

### SpellCastEnvironment
法术施放环境类，提供服务器回调接口。

- 功能：封装法术施放所需的环境信息和服务器操作接口
- 依赖：[ServerCallback](../../classes/ServerCallback.md), [CMap](../map/CMap.md), [IGameInfoCallback](../callback/IGameInfoCallback.md)
- 函数注释：
  - [getMap()](#): 获取地图信息
  - [getCb()](#): 获取游戏回调接口
  - [createBoat()](#): 创建船只
  - [moveHero()](#): 移动英雄

### IBattleCast
战斗法术施放接口，定义了战斗中法术施放所需的基本方法。

- 功能：定义战斗法术施放的基本接口
- 依赖：[CSpell](../entities/CSpell.md), [Caster](../entities/Caster.md), [CBattleInfoCallback](../battle/CBattleInfoCallback.md)
- 函数注释：
  - [getSpell()](#): 获取施放的法术
  - [getMode()](#): 获取施放模式
  - [getCaster()](#): 获取施法者
  - [getBattle()](#): 获取战斗信息
  - [getEffectPower()](#): 获取效果强度
  - [getEffectDuration()](#): 获取效果持续时间

### BattleCast
战斗法术施放类，实现了IBattleCast接口的具体实现。

- 功能：封装具体的战斗法术施放参数和行为
- 依赖：[IBattleCast](#ibattlecast), [CSpell](../entities/CSpell.md), [Caster](../entities/Caster.md)
- 函数注释：
  - [cast()](#): 施放法术
  - [castEval()](#): 评估法术效果
  - [applyEffects()](#): 应用法术效果
  - [findPotentialTargets()](#): 查找潜在目标

### Mechanics
法术机制类，定义了法术的具体效果和行为。

- 功能：定义法术的具体机制和效果
- 依赖：[effects::Effect](#), [BattleHex](../battle/BattleHex.md), [CStack](../battle/CStack.md)
- 函数注释：
  - [canBeCast()](#): 检查是否可以施放
  - [canBeCastAt()](#): 检查是否可以在指定目标施放
  - [applyEffects()](#): 应用法术效果
  - [cast()](#): 施放法术
  - [isReceptive()](#): 检查目标是否接受法术
  - [getAffectedStacks()](#): 获取受影响的部队

### BaseMechanics
基础法术机制类，提供了Mechanics接口的默认实现。

- 功能：提供法术机制的通用实现
- 依赖：[Mechanics](#mechanics), [CSpell](../entities/CSpell.md)
- 函数注释：
  - [adjustEffectValue()](#): 调整效果值
  - [calculateRawEffectValue()](#): 计算原始效果值
  - [ownerMatches()](#): 检查归属匹配

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