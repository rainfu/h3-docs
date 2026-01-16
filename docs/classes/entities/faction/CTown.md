# CTown

城镇类型定义类，表示游戏中城镇的模板和配置，包含建筑、法术、生物等所有城镇相关设置。

## 概述

`CTown` 是VCMI中城镇类型定义的核心类。它定义了城镇的所有静态属性和配置，包括建筑列表、生物等级、法术公会、城防系统等，是城镇实例化的模板。

## 主要属性
- `faction`: 所属派系
- `creatures`: 各等级的生物列表
- `buildings`: 建筑映射
- `dwellings`: 冒险地图居民地定义
- `mageLevel`: 法师公会最大等级
- `primaryRes`: 主要资源
- `fortifications`: 城防配置
- `defaultTavernChance`: 默认酒馆英雄出现几率
- `clientInfo`: 客户端相关信息（图标、背景、音乐等）

## 核心方法
- `std::set<si32> getAllBuildings()`: 获取所有建筑
- `const CBuilding * getSpecialBuilding(...)`: 获取特殊建筑
- `BuildingID getBuildingType(...)`: 获取建筑类型
- `std::string getRandomNameTextID(...)`: 获取随机城镇名称
- `size_t getRandomNamesCount()`: 获取随机名称数量

## 依赖关系
- 关联：`CFaction`, `CBuilding`, `CreatureID`, `BuildingID`
- 使用：`TownFortifications`, `ClientInfo`

## 用途
- 城镇模板：定义城镇的静态属性和配置
- 建筑系统：管理城镇的建筑类型和依赖关系
- 生物配置：定义城镇可生产的生物类型
- 法术系统：配置法师公会的等级和法术
- 城防系统：定义城镇的防御能力和城墙配置
- 客户端显示：提供城镇的视觉和音频资源

## 实现说明
- 配置驱动：基于JSON配置文件的城镇定义
- 建筑依赖：复杂的建筑前置条件系统
- 客户端分离：将显示相关数据分离到ClientInfo结构
- 序列化支持：完整的保存和加载功能