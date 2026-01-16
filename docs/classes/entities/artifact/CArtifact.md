# CArtifact

神器类型定义类，表示游戏中神器的模板和配置，包含所有神器属性和效果。

## 概述

`CArtifact` 是VCMI中神器类型定义的核心类，继承自多个基类以支持不同类型的神器功能。它定义了神器的所有静态属性，包括外观、效果、装备位置、价格等，是神器实例化的模板。

## 主要属性
- `id`: 神器ID
- `image`: 神器图标
- `advMapDef`: 冒险地图定义
- `price`: 神器价格
- `warMachine`: 战争机器生物ID
- `possibleSlots`: 可装备位置映射
- `instanceBonuses`: 实例奖励
- `aClass`: 神器等级
- `onlyOnWaterMap`: 是否仅限水上地图

## 核心方法
- `uint32_t getPrice()`: 获取价格
- `CreatureID getWarMachine()`: 获取战争机器
- `bool isBig()`: 检查是否为大型神器
- `bool isTradable()`: 检查是否可交易
- `int getArtClassSerial()`: 获取神器等级序号
- `const std::map<ArtBearer, std::vector<ArtifactPosition>> & getPossibleSlots()`: 获取可装备位置
- `bool canBePutAt(...)`: 检查是否可以装备在指定位置

## 继承关系
- `Artifact`: 神器基础接口
- `CBonusSystemNode`: 奖励系统节点
- `CCombinedArtifact`: 组合神器功能
- `CScrollArtifact`: 卷轴神器功能
- `CGrowingArtifact`: 成长神器功能
- `CChargedArtifact`: 充能神器功能

## 依赖关系
- 关联：`ArtifactID`, `CreatureID`, `ArtBearer`, `ArtifactPosition`
- 使用：`Bonus`, `EArtifactClass`

## 用途
- 神器模板：定义神器的静态属性和配置
- 装备系统：控制神器的装备位置和兼容性
- 奖励系统：提供神器的效果和加成
- 经济系统：定义神器的价格和交易规则
- 特殊类型：支持组合、卷轴、成长、充能等多种神器类型
- 视觉系统：定义神器的图标和外观

## 实现说明
- 多重继承：使用多重继承实现不同神器类型的功能组合
- 装备规则：复杂的装备位置和兼容性检查
- 奖励集成：通过奖励系统提供神器效果
- 类型系统：支持多种神器分类和特殊行为