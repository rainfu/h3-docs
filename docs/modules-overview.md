# VCMI 客户端 Lib 模块功能概览

本文档介绍了 VCMI 客户端 lib 目录下各个子目录的功能和作用。

## 模块分类

### 战斗系统 (battle/)
- 管理战斗流程和战斗单位
- 包括战斗信息管理、伤害计算、战斗行动处理等功能
- 核心类：
  - [BattleInfo](./classes/battle/BattleInfo.md) - 战斗信息管理
  - [Unit](./classes/battle/Unit.md) - 战斗单位抽象
  - [DamageCalculator](./classes/battle/DamageCalculator.md) - 伤害计算
  - [BattleAction](./classes/battle/BattleAction.md) - 战斗动作

### 奖励系统 (bonuses/)
- 管理游戏内各种属性加成效果
- 提供奖励系统节点管理和奖励计算功能
- 核心类：
  - [Bonus](./classes/bonuses/Bonus.md) - 奖励/加成系统
  - [BonusList](./classes/bonuses/BonusList.md) - 奖励列表管理
  - [CBonusSystemNode](./classes/bonuses/CBonusSystemNode.md) - 奖励系统节点

### 回调系统 (callback/)
- 提供对游戏状态的访问接口
- 用于处理游戏逻辑回调
- 核心类：
  - [GameCallbackHolder](./classes/callback/GameCallbackHolder.md) - 游戏回调持有者

### 常量系统 (constants/)
- 定义游戏中的各类常量值
- 包括标识符、数值范围等固定值

### 实体系统 (entities/)
- 管理游戏中各类实体对象
- 包括英雄、生物、城镇、神器等实体
- 核心类：
  - [CHero](./classes/entities/CHero.md) - 英雄实体
  - [CArtifact](./classes/entities/CArtifact.md) - 神器实体
  - [CTown](./classes/entities/CTown.md) - 城镇实体
  - [CCreature](./classes/entities/CCreature.md) - 生物实体

### 事件系统 (events/)
- 管理游戏中各类事件
- 提供事件触发和响应机制

### 文件系统 (filesystem/)
- 管理游戏资源文件的加载和访问
- 提供资源路径管理和文件操作接口

### 游戏状态 (gameState/)
- 管理整个游戏的状态
- 包括玩家状态、游戏统计数据等
- 核心类：
  - [CGameState](./classes/gameState/CGameState.md) - 全局游戏状态
  - [CPlayerState](./classes/gameState/CPlayerState.md) - 玩家状态

### JSON 系统 (json/)
- 处理 JSON 数据的解析和生成
- 提供与 JSON 相关的工具函数

### 日志系统 (logging/)
- 管理应用程序的日志记录
- 提供不同级别的日志输出功能

### 地图对象 (mapObjects/)
- 管理游戏地图上的各类对象
- 包括建筑、宝物、怪物等地图元素
- 核心类：
  - [CGObjectInstance](./classes/mapObjects/CGObjectInstance.md) - 地图对象实例基类

### 模组系统 (modding/)
- 支持游戏模组的加载和管理
- 提供模组系统的基础功能

### 网络系统 (network/)
- 处理游戏网络通信
- 管理客户端与服务器之间的数据传输

### 网络包系统 (networkPacks/)
- 定义和处理各类网络数据包
- 提供网络协议的序列化和反序列化

### 路径查找系统 (pathfinder/)
- 实现 AI 的路径查找算法
- 计算单位在地图上的移动路径

### RMG 系统 (rmg/)
- 随机地图生成器 (Random Map Generator)
- 用于生成随机地图和场景

### 序列化系统 (serializer/)
- 处理对象的序列化和反序列化
- 用于保存/加载游戏数据
- 核心类：
  - [Serializeable](./classes/serializer/Serializeable.md) - 序列化标记基类
  - [CSerializer](./classes/serializer/CSerializer.md) - 序列化器基类和工具

### 法术系统 (spells/)
- 管理游戏中的法术系统
- 包括法术效果计算、法术目标选择等

### 文本系统 (texts/)
- 管理游戏文本和字符串资源
- 提供多语言支持和文本处理功能
- 核心类：
  - [CGeneralTextHandler](./classes/texts/CGeneralTextHandler.md) - 通用文本处理器
  - [MetaString](./classes/texts/MetaString.md) - 元字符串类，支持本地化和占位符
  - [Languages](./classes/texts/Languages.md) - 语言定义和复数形式规则
  - [TextIdentifier](./classes/texts/TextIdentifier.md) - 文本标识符构建工具
  - [TextLocalizationContainer](./classes/texts/TextLocalizationContainer.md) - 本地化文本容器
  - [TextOperations](./classes/texts/TextOperations.md) - Unicode文本操作工具
  - [CLegacyConfigParser](./classes/texts/CLegacyConfigParser.md) - 遗留配置解析器

### 标准库扩展 (vstd/)
- 提供标准库功能的扩展
- 包括容器、算法等实用工具
