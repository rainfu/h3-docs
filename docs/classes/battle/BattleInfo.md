# BattleInfo

战斗信息管理类，负责存储和管理战斗相关的所有信息。

## 📋 类概述

`BattleInfo` 是 VCMI 战斗系统的核心类，继承自多个接口：
- `CBonusSystemNode`: 奖励系统节点
- `CBattleInfoCallback`: 战斗信息回调
- `IBattleState`: 战斗状态接口
- `GameCallbackHolder`: 游戏回调持有者

此类管理整个战斗的状态，包括参战双方、战场布局、战斗单位、障碍物等。

## 🔧 主要属性

### 战斗基本信息
- `battleID`: 战斗唯一标识符
- `round`: 当前回合数
- `activeStack`: 当前活跃单位ID
- `townID`: 城镇ID（攻城战时）
- `tile`: 战斗发生的位置坐标

### 战场信息
- `battlefieldType`: 战场类型（如 `!!BA:B`）
- `terrainType`: 地形类型
- `layout`: 战场布局
- `tacticsSide`: 战术阶段的发起方
- `tacticDistance`: 战术移动距离

### 参战单位和对象
- `sides`: 战斗双方信息数组
- `stacks`: 战斗单位列表
- `obstacles`: 战场障碍物列表
- `si`: 攻城战信息

## 🎯 核心方法

### 战斗状态查询
```cpp
// 获取战斗ID
BattleID getBattleID() const;

// 获取当前活跃单位ID
int32_t getActiveStackID() const;

// 根据条件获取单位列表
TStacks getStacksIf(const TStackFilter & predicate) const;
battle::Units getUnitsIf(const battle::UnitFilter & predicate) const;

// 获取战场信息
BattleField getBattlefieldType() const;
TerrainId getTerrainType() const;
```

### 战斗控制
```cpp
// 进入下一回合
void nextRound();

// 切换到下一个单位
void nextTurn(uint32_t unitId, BattleUnitTurnReason reason);

// 添加/移除单位
void addUnit(uint32_t id, const JsonNode & data);
void removeUnit(uint32_t id);
void moveUnit(uint32_t id, const BattleHex & destination);
```

### 奖励系统
```cpp
// 管理单位奖励
void addUnitBonus(uint32_t id, const std::vector<Bonus> & bonus);
void updateUnitBonus(uint32_t id, const std::vector<Bonus> & bonus);
void removeUnitBonus(uint32_t id, const std::vector<Bonus> & bonus);
```

### 障碍物管理
```cpp
// 管理战场障碍物
void addObstacle(const ObstacleChanges & changes);
void updateObstacle(const ObstacleChanges& changes);
void removeObstacle(uint32_t id);
```

## 🔗 依赖关系

### 依赖的类
- `CBattleInfoCallback`: 战斗信息回调接口
- `IBattleState`: 战斗状态接口
- `SideInBattle`: 战斗一方信息
- `SiegeInfo`: 攻城战信息
- `BattleLayout`: 战场布局
- `CStack`: 战斗单位栈
- `CObstacleInstance`: 障碍物实例
- `Bonus`: 奖励系统

### 被依赖关系
- 被 `BattleProxy` 等战斗代理类使用
- 被战斗AI和UI系统调用
- 作为战斗状态的主要数据源

## 📝 使用示例

### 创建战斗实例
```cpp
// 设置战斗参数
BattleSideArray<const CArmedInstance *> armies = {attackerArmy, defenderArmy};
BattleSideArray<const CGHeroInstance *> heroes = {attackerHero, defenderHero};

// 创建战斗
auto battle = BattleInfo::setupBattle(
    gameCallback,
    tile,
    terrainType,
    battlefieldType,
    armies,
    heroes,
    layout,
    town
);
```

### 查询战斗状态
```cpp
// 获取当前活跃单位
auto activeStackId = battle->getActiveStackID();
auto activeStack = battle->getStack(activeStackId);

// 获取特定玩家的单位
auto playerUnits = battle->getStacksIf([player](const CStack * stack) {
    return stack->getOwner() == player;
});
```

## ⚡ 性能特性

- **内存管理**: 使用智能指针管理单位和障碍物
- **序列化支持**: 支持完整的状态保存和加载
- **回调机制**: 通过回调接口实现松耦合设计
- **奖励系统集成**: 深度集成奖励和加成系统

## 🔍 注意事项

1. **线程安全**: 该类不是线程安全的，应在单线程环境中使用
2. **生命周期**: 战斗实例应在战斗结束后及时销毁
3. **状态一致性**: 修改战斗状态时需要保持数据一致性
4. **序列化**: 保存/加载时会自动调用 `postDeserialize()` 进行后处理