# CGTownInstance

城镇实例类，表示游戏中具体的城镇对象，包含建筑、法术、事件等所有城镇功能。

## 概述

`CGTownInstance` 是VCMI中城镇实例的核心类，继承自多个接口以支持城镇的各种功能。它代表地图上实际存在的城镇，包含建筑系统、法术研究、生物生产、英雄驻扎等完整的城镇管理功能。

## 主要属性
- `builtBuildings`: 已建造的建筑集合
- `forbiddenBuildings`: 禁止建造的建筑
- `possibleSpells/obligatorySpells`: 可选/必选法术
- `spells`: 法术公会中的法术
- `events`: 城镇事件列表
- `garrisonHero/visitingHero`: 驻守/访问英雄
- `spellResearchCounterDay`: 法术研究计数器
- `rewardableBuildings`: 可奖励建筑

## 核心方法
- `bool hasBuilt(...)`: 检查建筑是否已建造
- `void addBuilding(...)`: 添加建筑
- `int creatureGrowth(...)`: 获取生物生长数量
- `GrowthInfo getGrowthInfo(...)`: 获取生长信息
- `int spellsAtLevel(...)`: 获取指定等级的法术数量
- `ResourceSet dailyIncome() const`: 获取每日收入
- `EFortLevel fortLevel() const`: 获取城防等级
- `bool armedGarrison() const`: 检查是否有武装驻军

## 继承关系
- `CGDwelling`: 居民地（生物生产）
- `IShipyard`: 船厂
- `IMarket`: 市场
- `INativeTerrainProvider`: 原生地形提供者
- `ICreatureUpgrader`: 生物升级器

## 依赖关系
- 关联：`CTown`, `CFaction`, `CGHeroInstance`, `CCastleEvent`
- 使用：`IGameEventCallback`, `BuildingID`, `SpellID`

## 用途
- 建筑管理：建造、升级和维护城镇建筑
- 生物生产：生成和升级城镇生物
- 法术研究：管理法术公会的法术学习
- 英雄交互：处理英雄访问和驻守
- 经济系统：提供资源收入和市场功能
- 防御系统：城防和攻城战支持

## 实现说明
- 建筑依赖：复杂的建筑前置条件系统
- 事件系统：支持城镇事件的触发和效果
- 序列化支持：完整的保存和加载功能
- 奖励建筑：特殊的可重复访问建筑系统