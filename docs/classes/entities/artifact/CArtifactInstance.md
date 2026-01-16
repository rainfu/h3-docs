# CArtifactInstance

神器实例类，表示游戏中具体的神器对象，包含状态和属性。

## 概述

`CArtifactInstance` 是VCMI中神器实例的核心类，继承自多个基类以支持不同的神器类型和功能。它表示游戏中实际存在的神器对象，具有唯一ID、类型信息和各种特殊能力。

## 主要属性
- `id`: 神器实例的唯一标识符
- `artTypeID`: 神器类型的ID
- `partsInfo`: 组合神器的部件信息（如果是组合神器）

## 核心方法
- `ArtifactID getTypeId() const`: 获取神器类型ID
- `const CArtifact * getType() const`: 获取神器类型定义
- `ArtifactInstanceID getId() const`: 获取实例ID
- `bool canBePutAt(...)`: 检查是否可以放置在指定位置
- `bool isCombined() const`: 检查是否为组合神器
- `bool isScroll() const`: 检查是否为法术卷轴

## 继承关系
- `CBonusSystemNode`: 奖励系统节点
- `CCombinedArtifactInstance`: 组合神器功能
- `CScrollArtifactInstance`: 卷轴神器功能
- `CGrowingArtifactInstance`: 成长神器功能
- `CChargedArtifactInstance`: 充能神器功能

## 依赖关系
- 关联：`CArtifact`, `CArtifactSet`, `ArtifactLocation`
- 使用：`CGameState`, `IGameInfoCallback`

## 用途
- 神器实例管理：表示地图上、英雄背包中或对象中的具体神器
- 类型区分：支持普通、组合、卷轴、成长、充能等多种神器类型
- 奖励系统集成：通过奖励节点提供神器效果
- 序列化支持：完整的保存和加载功能

## 实现说明
- 多重继承：使用多重继承实现不同神器类型的功能组合
- 唯一标识：每个实例都有全局唯一的ID
- 延迟初始化：在反序列化时进行初始化
- 类型安全：强类型检查和验证