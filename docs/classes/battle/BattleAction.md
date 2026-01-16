# BattleAction

战斗动作类，定义了战斗中各种可执行的动作。

## 📋 类概述

`BattleAction` 是 VCMI 战斗系统的核心动作类，定义了战斗中所有可能的动作类型，包括移动、攻击、法术施放、防御等。该类是战斗逻辑的基础，用于表示和处理战斗参与者的所有行为。

## 🔧 主要属性

### 基本信息
- `side`: 执行动作的一方（攻击方/防御方）
- `stackNumber`: 单位栈ID（-1表示左边英雄，-2表示右边英雄）
- `actionType`: 动作类型（使用 EActionType 枚举）
- `spell`: 法术ID（用于法术相关动作）

### 目标信息
- `target`: 目标信息数组，包含单位值和六角格位置

## 🎯 核心方法

### 动作创建工厂方法
```cpp
// 治疗动作
static BattleAction makeHeal(const battle::Unit * healer, const battle::Unit * healed);

// 防御动作
static BattleAction makeDefend(const battle::Unit * stack);

// 等待动作
static BattleAction makeWait(const battle::Unit * stack);

// 近战攻击
static BattleAction makeMeleeAttack(const battle::Unit * stack, const BattleHex & destination, const BattleHex & attackFrom, bool returnAfterAttack = true);

// 远程攻击
static BattleAction makeShotAttack(const battle::Unit * shooter, const battle::Unit * target);

// 生物法术施放
static BattleAction makeCreatureSpellcast(const battle::Unit * stack, const battle::Target & target, const SpellID & spellID);

// 移动动作
static BattleAction makeMove(const battle::Unit * stack, const BattleHex & dest);

// 战术阶段结束
static BattleAction makeEndOFTacticPhase(BattleSide side);

// 撤退动作
static BattleAction makeRetreat(BattleSide side);

// 投降动作
static BattleAction makeSurrender(BattleSide side);
```

### 动作类型判断
```cpp
// 判断是否为战术动作
bool isTacticsAction() const;

// 判断是否为单位动作
bool isUnitAction() const;

// 判断是否为法术动作
bool isSpellAction() const;

// 判断是否为战斗结束动作
bool isBattleEndAction() const;
```

### 目标设置
```cpp
// 瞄准到六角格
void aimToHex(const BattleHex & destination);

// 瞄准到单位
void aimToUnit(const battle::Unit * destination);

// 获取目标
battle::Target getTarget(const CBattleInfoCallback * cb) const;

// 设置目标
void setTarget(const battle::Target & target_);
```

### 工具方法
```cpp
// 转换为字符串
std::string toString() const;
```

## 🔗 依赖关系

### 依赖的类
- `Destination`: 目标定义
- `GameConstants`: 游戏常量
- `CBattleInfoCallback`: 战斗信息回调
- `battle::Unit`: 战斗单位
- `BattleHex`: 战斗六角格
- `SpellID`: 法术ID
- `EActionType`: 动作类型枚举

### 被依赖关系
- 被 `BattleInfo` 用于处理战斗动作
- 被战斗AI用于决策制定
- 被网络系统用于动作同步
- 被UI系统用于动作显示

## 📝 使用示例

### 创建基本动作
```cpp
// 创建防御动作
BattleAction defendAction = BattleAction::makeDefend(unit);

// 创建移动动作
BattleHex destination(5, 5);
BattleAction moveAction = BattleAction::makeMove(unit, destination);

// 创建近战攻击
BattleHex attackDest(6, 6);
BattleHex attackFrom(5, 5);
BattleAction meleeAttack = BattleAction::makeMeleeAttack(attacker, attackDest, attackFrom);
```

### 处理动作类型
```cpp
// 判断动作类型并处理
if (action.isUnitAction()) {
    // 处理单位动作
    auto target = action.getTarget(battleCallback);
    // 执行单位移动或攻击
} else if (action.isSpellAction()) {
    // 处理法术动作
    SpellID spell = action.spell;
    // 执行法术施放
} else if (action.isBattleEndAction()) {
    // 处理战斗结束动作
    if (action.actionType == EActionType::RETREAT) {
        // 撤退处理
    } else if (action.actionType == EActionType::SURRENDER) {
        // 投降处理
    }
}
```

### 设置复杂目标
```cpp
// 创建多目标法术动作
BattleAction spellAction = BattleAction::makeCreatureSpellcast(caster, target, SpellID::FIREBALL);

// 设置多个目标位置
spellAction.aimToHex(BattleHex(3, 3));
spellAction.aimToHex(BattleHex(4, 4));
spellAction.aimToUnit(targetUnit);
```

### 动作序列化
```cpp
// 序列化动作（用于网络传输或保存）
JsonSerializer serializer;
action.serialize(serializer);

// 反序列化动作
JsonDeserializer deserializer(jsonData);
BattleAction loadedAction;
loadedAction.serialize(deserializer);
```

## ⚡ 性能特性

- **轻量级设计**: 结构体设计，内存占用小
- **工厂方法**: 提供便捷的动作创建接口
- **类型安全**: 强类型枚举确保动作类型正确
- **序列化支持**: 支持完整的状态保存和传输

## 🔍 注意事项

1. **动作验证**: 创建动作前应验证参数的有效性
2. **目标一致性**: 多目标动作需要保持目标列表的一致性
3. **状态依赖**: 动作执行依赖于当前战斗状态
4. **网络同步**: 动作需要通过网络同步到所有客户端

## 📊 动作类型枚举

### EActionType 主要类型
```cpp
enum EActionType {
    DEFEND,           // 防御
    WAIT,            // 等待
    WALK,            // 移动
    ATTACK,          // 攻击
    SHOOT,           // 射击
    SPELL,           // 法术
    END_TACTIC_PHASE, // 结束战术阶段
    RETREAT,         // 撤退
    SURRENDER,       // 投降
    // ... 其他类型
};
```

### DestinationInfo 结构
```cpp
struct DestinationInfo {
    int32_t unitValue;    // 单位值（-1表示无效）
    BattleHex hexValue;   // 六角格位置
};
```

## 🔧 相关概念

- **战术动作**: 在战术阶段执行的特殊动作
- **单位动作**: 影响特定单位的动作
- **法术动作**: 涉及法术施放的动作
- **战斗结束动作**: 导致战斗结束的动作（如撤退、投降）