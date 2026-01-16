# CGHeroInstance

英雄实例类，表示游戏中具体的英雄对象，包含所有英雄属性和功能。

## 概述

`CGHeroInstance` 是VCMI中英雄实例的核心类，继承自多个接口以支持英雄的各种功能。它代表地图上实际存在的英雄，包含经验、技能、法术、装备、军队等所有英雄相关的数据和行为。

## 主要属性
- `exp`: 经验值
- `level`: 当前等级
- `mana`: 当前法力值
- `movement`: 剩余移动点数
- `secSkills`: 次要技能列表
- `spells`: 已知法术集合
- `gender`: 英雄性别
- `commander`: 指挥官实例
- `visitedTown`: 正在访问的城镇
- `boardedBoat`: 乘坐的船只

## 核心方法
- `int getSightRadius() const`: 获取视野半径
- `bool gainsLevel() const`: 检查是否可以升级
- `void setExperience(...)`: 设置经验值
- `int getPrimSkillLevel(...)`: 获取主要技能等级
- `ui8 getSecSkillLevel(...)`: 获取次要技能等级
- `bool canLearnSpell(...)`: 检查是否可以学习法术
- `bool canCastThisSpell(...)`: 检查是否可以施放法术
- `ResourceSet dailyIncome() const`: 获取每日收入

## 继承关系
- `CArmedInstance`: 武装实例（军队管理）
- `IBoatGenerator`: 船只生成器
- `CArtifactSet`: 神器集合
- `spells::Caster`: 法术施放者
- `AFactionMember`: 派系成员
- `ICreatureUpgrader`: 生物升级器
- `IOwnableObject`: 可拥有对象

## 依赖关系
- 关联：`CHero`, `CGBoat`, `CGTownInstance`, `CCommanderInstance`
- 使用：`IGameInfoCallback`, `TurnInfo`, `TerrainTile`

## 用途
- 英雄属性管理：经验、等级、技能、法术
- 军队指挥：领导军队进行战斗和移动
- 资源管理：每日收入和资源收集
- 探索功能：视野计算和地图探索
- 交互系统：与城镇、对象和其他英雄的交互

## 实现说明
- 多重继承：组合多种英雄功能接口
- 缓存系统：主要技能和法术学校的缓存优化
- 序列化支持：完整的保存和加载功能
- 状态验证：内置的状态一致性检查