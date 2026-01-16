# ServerCallback接口

ServerCallback接口是VCMI中服务器回调的抽象接口，用于处理服务器发送的各种消息和操作。

## 类定义

```cpp
class DLL_LINKAGE ServerCallback
{
public:
    virtual ~ServerCallback() = default;

    virtual void complain(const std::string & problem) = 0;
    virtual bool describeChanges() const = 0;

    virtual vstd::RNG * getRNG() = 0;

    virtual void apply(CPackForClient & pack) = 0;

    virtual void apply(BattleLogMessage & pack) = 0;
    virtual void apply(BattleStackMoved & pack) = 0;
    virtual void apply(BattleUnitsChanged & pack) = 0;
    virtual void apply(SetStackEffect & pack) = 0;
    virtual void apply(StacksInjured & pack) = 0;
    virtual void apply(BattleObstaclesChanged & pack) = 0;
    virtual void apply(CatapultAttack & pack) = 0;
};
```

## 功能说明

ServerCallback是VCMI中处理服务器通信的核心接口，负责接收和处理来自服务器的各种消息包。它提供了应用各种游戏状态变化和战斗事件的方法，是客户端与服务器交互的关键组件。该接口还提供了随机数生成器的访问和问题报告机制。

## 依赖关系

- [vstd::RNG](../rng/RNG.md): 随机数生成器
- [CPackForClient](../networkPacks/CPackForClient.md): 发送给客户端的网络包
- [BattleLogMessage](../battle/BattleLogMessage.md): 战斗日志消息
- [BattleStackMoved](../battle/BattleStackMoved.md): 战斗单位移动消息
- [BattleUnitsChanged](../battle/BattleUnitsChanged.md): 战斗单位变化消息
- [SetStackEffect](../battle/SetStackEffect.md): 设置单位效果消息
- [StacksInjured](../battle/StacksInjured.md): 单位受伤消息
- [BattleObstaclesChanged](../battle/BattleObstaclesChanged.md): 战斗障碍变化消息
- [CatapultAttack](../battle/CatapultAttack.md): 投石车攻击消息

## 函数注释

### 通用功能
- `~ServerCallback()`: 虚析构函数
- `complain(problem)`: 报告问题或错误
- `describeChanges()`: 是否描述变化
- `getRNG()`: 获取随机数生成器

### 应用网络包
- `apply(pack)`: 应用发送给客户端的通用网络包
- `apply(BattleLogMessage & pack)`: 应用战斗日志消息
- `apply(BattleStackMoved & pack)`: 应用战斗单位移动消息
- `apply(BattleUnitsChanged & pack)`: 应用战斗单位变化消息
- `apply(SetStackEffect & pack)`: 应用设置单位效果消息
- `apply(StacksInjured & pack)`: 应用单位受伤消息
- `apply(BattleObstaclesChanged & pack)`: 应用战斗障碍变化消息
- `apply(CatapultAttack & pack)`: 应用投石车攻击消息