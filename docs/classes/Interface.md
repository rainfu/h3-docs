<!-- 来源: E:\develop\heroes\vcmi\lib\rewardable\Interface.h -->
# Interface头文件

Interface头文件定义了VCMI中可奖励对象的接口类，用于处理游戏中各种奖励机制。

## Rewardable命名空间

### Interface类

#### 类定义
```cpp
class DLL_LINKAGE Interface
```

#### 私有成员
- `mutable spells::ExternalCaster caster`: 外部施法者（用于施放冒险法术）

#### 保护方法

##### 奖励授予方法
- `void grantRewardAfterLevelup(IGameEventCallback & gameEvents, const Rewardable::VisitInfo & reward, const CArmedInstance * army, const CGHeroInstance * hero) const`: 在升级后授予奖励
- `void grantRewardBeforeLevelup(IGameEventCallback & gameEvents, const Rewardable::VisitInfo & reward, const CGHeroInstance * hero) const`: 在升级前授予奖励
- `virtual void grantRewardWithMessage(IGameEventCallback & gameEvents, const CGHeroInstance * contextHero, int rewardIndex, bool markAsVisit) const`: 带消息授予奖励
- `void selectRewardWithMessage(IGameEventCallback & gameEvents, const CGHeroInstance * contextHero, const std::vector<ui32> & rewardIndices, const MetaString & dialog) const`: 带消息选择奖励
- `void grantAllRewardsWithMessage(IGameEventCallback & gameEvents, const CGHeroInstance * contextHero, const std::vector<ui32>& rewardIndices, bool markAsVisit) const`: 带消息授予所有奖励

##### 辅助方法
- `std::vector<Component> loadComponents(const CGHeroInstance * contextHero, const std::vector<ui32> & rewardIndices) const`: 加载组件
- `void doHeroVisit(IGameEventCallback & gameEvents, const CGHeroInstance *h) const`: 执行英雄访问

##### 纯虚方法
- `virtual const IObjectInterface * getObject() const = 0`: 获取对象接口
- `virtual bool wasVisitedBefore(const CGHeroInstance * hero) const = 0`: 检查是否被访问过
- `virtual bool wasVisited(PlayerColor player) const = 0`: 检查玩家是否访问过
- `virtual void markAsVisited(IGameEventCallback & gameEvents, const CGHeroInstance * hero) const = 0`: 标记为已访问
- `virtual void markAsScouted(IGameEventCallback & gameEvents, const CGHeroInstance * hero) const = 0`: 标记为已侦察
- `virtual void grantReward(IGameEventCallback & gameEvents, ui32 rewardID, const CGHeroInstance * hero) const = 0`: 授予奖励

##### 事件处理
- `void onBlockingDialogAnswered(IGameEventCallback & gameEvents, const CGHeroInstance * hero, int32_t answer) const`: 阻塞对话回答处理

#### 公共方法
- `std::vector<ui32> getAvailableRewards(const CGHeroInstance * hero, Rewardable::EEventType event) const`: 获取可用奖励

#### 公共成员
- `Rewardable::Configuration configuration`: 配置

#### 序列化支持
- `void serializeJson(JsonSerializeFormat & handler)`: JSON序列化
- `template <typename Handler> void serialize(Handler &h)`: 序列化

## 设计特点

- 提供完整的奖励系统接口
- 支持多种奖励类型和事件类型
- 处理英雄升级相关的奖励逻辑
- 支持消息显示和用户交互
- 提供访问状态跟踪机制