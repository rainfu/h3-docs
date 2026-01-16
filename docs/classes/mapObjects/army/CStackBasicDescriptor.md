# CStackBasicDescriptor

生物栈基本描述符，定义生物栈的核心属性和状态。

## 概述

`CStackBasicDescriptor` 描述生物栈的基本信息，包括生物类型、数量、所有者等。是 `CStackInstance` 的基础组件，提供生物栈的核心数据结构。

## 主要属性
- `type`: 生物类型ID
- `count`: 生物数量
- `owner`: 所有者玩家
- `slot`: 在军队中的槽位
- `formation`: 阵型位置

## 核心方法
- `CreatureID getCreature() const`：获取生物类型
- `TQuantity getCount() const`：获取生物数量
- `PlayerColor getOwner() const`：获取所有者
- `SlotID getSlot() const`：获取槽位
- `bool valid(bool allowUnrandomized = false) const`：验证描述符有效性

## 序列化支持
- `template <typename Handler> void serialize(Handler &h)`：支持序列化

## 依赖关系
- 关联：`CreatureID`, `PlayerColor`, `SlotID` 等基础类型
- 继承：`CStackInstance` 等类

## 用途
- 军队表示：简化版生物栈信息
- 网络传输：轻量级数据结构
- 状态同步：快速状态更新

## 实现说明
- 轻量设计：只包含必要的基本信息
- 验证机制：确保数据的合理性
- 兼容性：支持旧版本数据格式