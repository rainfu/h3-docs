# ObjectTemplate

对象外观模板，定义地图对象的视觉外观和属性。

## 概述

`ObjectTemplate` 定义地图对象的视觉表现，包括动画、阻挡区域、渲染顺序等。是对象显示系统的核心配置类。

## 主要属性
- `id`: 模板ID
- `animationFile`: 动画文件路径
- `editorAnimationFile`: 编辑器动画文件
- `mask`: 阻挡遮罩
- `aiValue`: AI评估价值
- `drawPriority`: 绘制优先级
- `visitableOffset`: 可访问偏移
- `anchorOffset`: 锚点偏移
- `allowedTerrains`: 允许的地形类型

## 核心方法
- `int getWidth() const`：获取宽度
- `int getHeight() const`：获取高度
- `int3 getVisitableOffset() const`：获取可访问偏移
- `int3 getAnchorOffset() const`：获取锚点偏移
- `bool isVisitableFrom(int3 pos) const`：检查位置是否可访问
- `bool isBlockedAt(int3 pos) const`：检查位置是否阻挡

## 依赖关系
- 关联：`AnimationPath`, `TerrainId` 等
- 使用：`CGObjectInstance` 显示系统

## 用途
- 视觉渲染：对象的动画和外观
- 编辑器支持：地图编辑时的预览
- 游戏逻辑：阻挡和访问区域计算

## 实现说明
- 文件驱动：基于DEF文件的动画系统
- 性能优化：预计算的阻挡和访问数据
- 兼容性：支持多种动画格式