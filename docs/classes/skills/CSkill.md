# CSkill

技能类，定义英雄的次要技能属性和效果。

## 概述

`CSkill` 定义英雄次要技能的基本信息，包括名称、描述、等级效果等。是英雄发展系统的组成部分，支持战斗加成、冒险能力等。

## 主要属性
- `id`: 技能ID
- `identifier`: 技能标识符
- `name`: 技能名称
- `description`: 技能描述
- `iconIndex`: 图标索引
- `levels`: 各等级的效果描述

## 核心方法
- `SecondarySkill getId() const`：获取技能ID
- `int32_t getIndex() const`：获取技能索引
- `const std::string & getName() const`：获取技能名称
- `const std::string & getDescription() const`：获取技能描述
- `int getIconIndex() const`：获取图标索引

## 等级系统
- 基础等级：提供基本效果
- 高级等级：增强效果
- 专家等级：最大化效果

## 依赖关系
- 关联：`SecondarySkill`, `Bonus` 等
- 使用：英雄系统、奖励系统

## 用途
- 英雄培养：技能学习和升级
- 战斗加成：提供战斗相关奖励
- 冒险能力：增强探索和交互能力

## 实现说明
- 等级递进：3级技能系统设计
- 奖励集成：通过奖励系统提供效果
- 平衡设计：技能强度和获取难度的平衡