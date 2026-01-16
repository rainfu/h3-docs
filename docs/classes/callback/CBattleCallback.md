# CBattleCallback类

CBattleCallback类是VCMI战斗系统中的战斗回调实现类，用于处理战斗相关的请求和操作。它继承自IBattleCallback接口，管理多个正在进行的战斗并协调玩家与战斗系统之间的交互。

## 类定义

```cpp
class IBattleInfo;
class IClient;

class DLL_LINKAGE CBattleCallback : public IBattleCallback
{
    std::map<BattleID, std::shared_ptr<CPlayerBattleCallback>> activeBattles; // 活跃战斗映射表
    std::optional<PlayerColor> player;                                       // 玩家颜色
    IClient *cl;                                                           // 客户端指针

protected:
    int sendRequest(const CPackForServer & request); // 发送请求（返回请求ID，用于匹配PackageApplied中的请求ID）

public:
    CBattleCallback(std::optional<PlayerColor> player, IClient * C); // 构造函数

    void battleMakeSpellAction(const BattleID & battleID, const BattleAction & action) override;    // 英雄施法操作（注意：不用于移动主动堆栈）
    void battleMakeUnitAction(const BattleID & battleID, const BattleAction & action) override;     // 单位操作
    void battleMakeTacticAction(const BattleID & battleID, const BattleAction & action) override;  // 战术阶段操作
    std::optional<BattleAction> makeSurrenderRetreatDecision(const BattleID & battleID, const BattleStateInfoForRetreat & battleState) override; // 做出投降/撤退决策

    std::shared_ptr<CPlayerBattleCallback> getBattle(const BattleID & battleID) override; // 获取指定战斗的回调
    std::optional<PlayerColor> getPlayerID() const override;                            // 获取玩家ID

    void onBattleStarted(const IBattleInfo * info);                                     // 战斗开始时调用
    void onBattleEnded(const BattleID & battleID);                                      // 战斗结束时调用
    std::map<BattleID, std::shared_ptr<CPlayerBattleCallback>> getActiveBattles();      // 获取活跃战斗映射表
};
```

## 功能说明

CBattleCallback类是VCMI战斗系统中的核心回调实现，负责处理战斗相关的请求和操作。它作为玩家与战斗系统之间的桥梁，管理多个正在进行的战斗并协调各种战斗动作。

## 成员变量

- `activeBattles`: 存储当前活跃战斗的映射表，键为战斗ID，值为CPlayerBattleCallback的智能指针
- `player`: 可选的玩家颜色，标识当前操作的玩家
- `cl`: 指向IClient的指针，用于与客户端通信

## 重要方法

- `sendRequest`: 发送服务器请求并返回请求ID，用于匹配PackageApplied中的请求ID
- `battleMakeSpellAction`: 处理英雄施法操作（注意：不用于移动主动堆栈）
- `battleMakeUnitAction`: 处理单位操作
- `battleMakeTacticAction`: 处理战术阶段操作
- `makeSurrenderRetreatDecision`: 基于战斗状态做出投降或撤退决策
- `getBattle`: 根据战斗ID获取对应的战斗回调对象
- `getPlayerID`: 获取当前操作的玩家ID

## 事件处理

- `onBattleStarted`: 战斗开始时调用，用于初始化战斗相关信息
- `onBattleEnded`: 战斗结束时调用，用于清理战斗相关资源
- `getActiveBattles`: 返回当前所有活跃战斗的映射表

## 设计说明

CBattleCallback类实现了IBattleCallback接口，提供了一个完整的战斗操作处理系统。该类设计的主要特点包括：

1. **多战斗管理**: 通过activeBattles映射表管理多个正在进行的战斗
2. **操作分离**: 区分不同类型的战斗操作（法术、单位、战术）
3. **决策支持**: 提供投降/撤退决策功能
4. **生命周期管理**: 通过onBattleStarted和onBattleEnded方法管理战斗生命周期

这种设计使得CBattleCallback可以有效地协调玩家与战斗系统之间的交互，同时支持多个战斗的同时进行。