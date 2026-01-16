# CMapHeader

地图头信息类，包含地图的基本信息和游戏设置。

## 概述

`CMapHeader` 定义了地图的基本属性，包括尺寸、玩家信息、难度、胜利/失败条件等。是地图系统的核心配置类。

## 主要属性
- `version`: 地图格式版本
- `width/height`: 地图尺寸
- `name/description`: 地图名称和描述
- `difficulty`: 地图难度
- `players`: 玩家信息列表
- `triggeredEvents`: 触发事件（胜利/失败条件）
- `allowedHeroes`: 允许的英雄列表
- `mods`: 需要的模组信息

## 核心方法
- `ui8 levels() const`：获取地图层数
- `void banWaterHeroes(bool isWaterMap)`：根据地图类型禁用英雄
- `void registerMapStrings()`：注册地图字符串
- `void setupEvents()`：设置事件

## 依赖关系
- 继承：`Serializeable`
- 关联：`PlayerInfo`, `TriggeredEvent`, `ModCompatibilityInfo`
- 使用：地图加载和游戏初始化系统

## 用途
- 地图信息：存储地图元数据
- 游戏设置：定义玩家和游戏规则
- 模组兼容性：检查需要的模组
- 序列化：地图文件的保存和加载

## 实现说明
- 版本兼容性：支持不同地图格式的向后兼容
- 动态配置：根据地图内容动态调整设置
- 本地化支持：地图文本的本地化处理