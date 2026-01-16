# CCreatureSet

生物集合接口，定义管理多支生物栈的通用操作。

## 概述

`CCreatureSet` 提供统一的接口来管理多支生物栈，支持添加、移除、查询、重组等操作。是所有拥有多支军队的实体的基类。

## 主要方法
- `SlotID addToSlot(SlotID slot, const CStackInstance & stack)`：添加生物栈到指定槽位
- `void addToSlot(SlotID slot, CreatureID cre, TQuantity count)`：添加指定数量的生物
- `bool eraseStack(SlotID slot, bool del = true)`：移除指定槽位的生物栈
- `void clearArmy()`：清空所有军队
- `int getSlotFor(const CStackInstance * stack) const`：获取生物栈所在的槽位
- `const CStackInstance * getCreature(SlotID slot) const`：获取指定槽位的生物栈
- `TQuantity getCreatureCount(SlotID slot) const`：获取指定槽位的生物数量
- `TQuantity getCreatureCount(CreatureID cre = CreatureID::NONE) const`：获取指定类型生物总数

## 依赖关系
- 关联：`CStackInstance`, `SlotID`, `CreatureID` 等
- 实现：`CArmedInstance` 等类

## 用途
- 军队管理：英雄、城镇、巢穴的军队组织
- 战斗准备：重组军队阵型
- 资源管理：计算军队维护成本

## 实现说明
- 槽位系统：固定数量的军队槽位
- 类型安全：强类型ID和数量
- 状态一致性：操作后自动更新相关状态