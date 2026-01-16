# Unit

战斗单位抽象类，定义了战斗中单位的基本属性和行为。

## 📋 类概述

`Unit` 是战斗系统中单位的核心抽象类，继承自多个接口：
- `IUnitInfo`: 单位信息接口
- `spells::Caster`: 法术施放者
- `IBonusBearer`: 奖励承载者
- `ACreature`: 生物基础类

此类定义了战斗单位的所有基本属性和行为，包括生命值、位置、状态等。

## 🔧 主要属性

### 单位基本信息
- **creatureIndex()**: 生物索引
- **creatureId()**: 生物ID
- **creatureLevel()**: 生物等级
- **creatureCost()**: 生物成本
- **creatureIconIndex()**: 生物图标索引

### 生命和状态
- **getCount()**: 单位初始数量
- **getFirstHPleft()**: 第一个单位剩余生命值
- **getKilled()**: 被击杀数量
- **getAvailableHealth()**: 剩余总生命值
- **getTotalHealth()**: 初始总生命值

### 战斗状态
- **alive()**: 是否存活
- **isGhost()**: 是否为幽灵状态
- **isFrozen()**: 是否被冻结
- **isValidTarget()**: 是否为有效目标

### 特殊状态
- **isHypnotized()**: 是否被催眠
- **isInvincible()**: 是否无敌
- **isClone()**: 是否为克隆体
- **hasClone()**: 是否有克隆体

## 🎯 核心方法

### 位置和移动
```cpp
// 获取/设置位置
BattleHex getPosition() const;
void setPosition(const BattleHex & hex);

// 获取占据的六角格
const BattleHexArray & getHexes() const;
const BattleHexArray & getSurroundingHexes(const BattleHex & assumedPosition = BattleHex::INVALID) const;

// 检查位置覆盖
bool coversPos(const BattleHex & position) const;
```

### 战斗能力
```cpp
// 攻击能力
bool canShoot() const;
bool isShooter() const;
bool isMeleeAttacker() const;
bool ableToRetaliate() const;

// 法术能力
bool canCast() const;
bool isCaster() const;
```

### 移动状态
```cpp
// 移动相关
bool canMove(int turn = 0) const;
bool defended(int turn = 0) const;
bool moved(int turn = 0) const;
bool willMove(int turn = 0) const;
bool waited(int turn = 0) const;
```

### 伤害和治疗
```cpp
// 造成伤害
void damage(int64_t & amount);

// 治疗单位
HealInfo heal(int64_t & amount, EHealLevel level, EHealPower power);
```

### 战斗阶段
```cpp
// 获取战斗队列阶段
BattlePhases::Type battleQueuePhase(int turn) const;
```

## 🔗 依赖关系

### 依赖的类
- `IUnitInfo`: 单位信息接口
- `spells::Caster`: 法术施放者接口
- `IBonusBearer`: 奖励承载者接口
- `ACreature`: 生物基础类
- `BattleHexArray`: 战场六角格数组
- `CUnitState`: 单位状态类

### 被依赖关系
- 被 `BattleInfo` 用于管理战斗单位
- 被战斗AI用于决策制定
- 被UI系统用于显示单位信息
- 被伤害计算系统使用

## 📝 使用示例

### 查询单位状态
```cpp
// 检查单位是否可以行动
if (unit->alive() && unit->canMove()) {
    // 单位可以移动
    auto possibleMoves = unit->getSurroundingHexes();
}

// 检查单位攻击能力
if (unit->canShoot()) {
    // 远程攻击单位
} else if (unit->isMeleeAttacker()) {
    // 近战攻击单位
}
```

### 处理伤害
```cpp
// 对单位造成伤害
int64_t damage = 100;
unit->damage(damage);

// 治疗单位
HealInfo healResult = unit->heal(50, EHealLevel::HEAL, EHealPower::NORMAL);
log.info() << "治疗了 " << healResult.healedHealthPoints << " 点生命值";
```

### 位置管理
```cpp
// 移动单位
BattleHex newPosition(5, 5);
unit->setPosition(newPosition);

// 检查单位占据的格子
auto occupiedHexes = unit->getHexes();
for (const auto & hex : occupiedHexes) {
    // 处理每个占据的格子
}
```

## ⚡ 性能特性

- **抽象设计**: 通过纯虚函数实现，允许不同实现优化
- **状态缓存**: 位置和周围格子的计算结果会被缓存
- **内存效率**: 使用共享指针管理状态，避免不必要的拷贝

## 🔍 注意事项

1. **抽象类**: `Unit` 是抽象类，不能直接实例化
2. **线程安全**: 需要外部同步机制保证线程安全
3. **状态一致性**: 修改单位状态时需要保持内部一致性
4. **生命周期**: 单位状态可能在战斗过程中动态变化

## 📊 相关结构

### HealInfo 结构体
```cpp
struct HealInfo {
    int64_t healedHealthPoints = 0;  // 治疗的生命值
    int32_t resurrectedCount = 0;    // 复活的单位数量
};
```

### UnitInfo 结构体
```cpp
struct UnitInfo {
    uint32_t id = 0;           // 单位ID
    TQuantity count = 0;       // 单位数量
    CreatureID type;           // 生物类型
    BattleSide side;           // 所属方
    BattleHex position;        // 位置
    bool summoned = false;     // 是否为召唤单位
};
```