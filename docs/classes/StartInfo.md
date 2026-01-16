# StartInfo

游戏开始信息结构体，包含游戏初始化的所有配置。

## 概述

`StartInfo` 定义了游戏开始时所需的全部信息，包括玩家设置、地图信息、游戏模式、难度等。是游戏初始化的核心配置结构体。

## 主要属性
- `mode`: 开始模式（新游戏/加载游戏/战役）
- `difficulty`: 游戏难度
- `playerInfos`: 玩家设置映射
- `mapname`: 地图名称
- `mapGenOptions`: 随机地图生成选项
- `campState`: 战役状态
- `simturnsInfo`: 同时回合信息
- `turnTimerInfo`: 回合计时器信息

## 核心方法
- `bool createRandomMap() const`：检查是否创建随机地图
- `PlayerSettings & getIthPlayersSettings(const PlayerColor & no)`：获取玩家设置
- `std::string getCampaignName() const`：获取战役名称
- `bool restrictedGarrisonsForAI() const`：检查AI驻军限制

## 依赖关系
- 继承：`Serializeable`
- 关联：`PlayerSettings`, `CMapGenOptions`, `CampaignState`
- 使用：游戏初始化和大厅系统

## 用途
- 游戏启动：定义游戏初始状态
- 玩家配置：设置玩家属性和连接
- 地图选择：指定地图或生成选项
- 网络同步：大厅中的游戏配置同步

## 实现说明
- 灵活配置：支持多种游戏模式和地图类型
- 序列化支持：完整的网络传输序列化
- 验证逻辑：内置的配置验证和默认值处理