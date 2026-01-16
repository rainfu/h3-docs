# Bonus

奖励/加成系统的基础类，定义各种加成的类型和效果。

## 📋 类概述

`Bonus` 是 VCMI 奖励系统的核心结构体，定义了游戏中所有类型的加成和奖励效果。该结构体支持：

- 多种奖励类型（攻击、防御、生命值等）
- 不同持续时间（永久、临时、一次性）
- 复杂的限制和传播机制
- 自定义图标和描述

## 🔧 主要属性

### 基本属性
- `duration`: 奖励持续时间类型
- `val`: 奖励数值
- `turnsRemain`: 剩余回合数（临时奖励）
- `valType`: 数值类型（加法/乘法/百分比等）
- `type`: 奖励类型
- `subtype`: 奖励子类型ID

### 来源信息
- `source`: 奖励来源类型
- `sid`: 来源ID（对象/神器/法术的ID）
- `targetSourceType`: 目标来源类型（用于百分比加成）
- `bonusOwner`: 奖励拥有者（玩家颜色）

### 高级特性
- `stacking`: 堆叠标识（相同标识的奖励不堆叠）
- `additionalInfo`: 额外信息数组
- `limiter`: 限制器（控制奖励生效条件）
- `propagator`: 传播器（控制奖励如何传播）
- `updater`: 更新器（控制奖励如何更新）
- `propagationUpdater`: 传播更新器

### 显示属性
- `customIconPath`: 自定义图标路径
- `description`: 奖励描述文本
- `hidden`: 是否隐藏奖励

## 🎯 核心方法

### 构造函数
```cpp
// 基础构造函数
Bonus(BonusDuration::Type Duration, BonusType Type, BonusSource Src, si32 Val, BonusSourceID sourceID);

// 带子类型的构造函数
Bonus(BonusDuration::Type Duration, BonusType Type, BonusSource Src, si32 Val, BonusSourceID sourceID, BonusSubtypeID subtype);

// 完整构造函数
Bonus(BonusDuration::Type Duration, BonusType Type, BonusSource Src, si32 Val, BonusSourceID sourceID, BonusSubtypeID subtype, BonusValueType ValType);
```

### 持续时间检查
```cpp
// 各种持续时间类型的静态检查函数
static bool NDays(const Bonus *hb);        // N天
static bool NTurns(const Bonus *hb);       // N回合
static bool OneDay(const Bonus *hb);       // 一天
static bool OneWeek(const Bonus *hb);      // 一周
static bool OneBattle(const Bonus *hb);    // 一场战斗
static bool Permanent(const Bonus *hb);    // 永久
static bool UntilGetsTurn(const Bonus *hb); // 直到获得回合
static bool UntilAttack(const Bonus *hb);   // 直到攻击
static bool UntilBeingAttacked(const Bonus *hb); // 直到被攻击
static bool UntilCommanderKilled(const Bonus *hb); // 直到指挥官被杀
static bool UntilOwnAttack(const Bonus *hb); // 直到自己攻击
```

### 描述生成
```cpp
// 生成奖励描述
std::string Description(const IGameInfoCallback * cb, std::optional<si32> customValue = {}) const;

// 转换为JSON节点
JsonNode toJsonNode() const;
```

### 链式调用方法
```cpp
// 添加限制器
std::shared_ptr<Bonus> addLimiter(const TLimiterPtr & Limiter);

// 添加传播器
std::shared_ptr<Bonus> addPropagator(const TPropagatorPtr & Propagator);

// 添加更新器
std::shared_ptr<Bonus> addUpdater(const TUpdaterPtr & Updater);
```

## 🔗 依赖关系

### 依赖的类
- `BonusEnum`: 奖励枚举定义
- `BonusCustomTypes`: 自定义奖励类型
- `Limiters`: 限制器系统
- `Propagators`: 传播器系统
- `Updaters`: 更新器系统
- `Serializeable`: 序列化接口

### 被依赖关系
- 被 `BonusList` 用于管理奖励集合
- 被 `CBonusSystemNode` 用于构建奖励树
- 被所有游戏实体用于属性计算
- 被UI系统用于显示奖励效果

## 📝 使用示例

### 创建基础奖励
```cpp
// 创建攻击力+2的永久奖励
auto attackBonus = std::make_shared<Bonus>(
    BonusDuration::PERMANENT,     // 永久持续
    BonusType::PRIMARY_SKILL,     // 主要技能
    BonusSource::ARTIFACT,        // 来源：神器
    2,                            // +2
    BonusSourceID(artifactId),    // 神器ID
    BonusSubtypeID(PrimarySkill::ATTACK)  // 子类型：攻击
);
```

### 创建复杂奖励
```cpp
// 创建战斗中+50%伤害的奖励，持续一场战斗
auto battleBonus = std::make_shared<Bonus>(
    BonusDuration::ONE_BATTLE,
    BonusType::GENERAL_DAMAGE_REDUCTION,  // 一般伤害减少（负数即为加成）
    BonusSource::SPELL,
    -50,  // -50% (即+50%伤害)
    BonusSourceID(spellId),
    BonusValueType::PERCENT_TO_BASE  // 百分比类型
);

// 添加限制器：仅对远程攻击生效
battleBonus->addLimiter(std::make_shared<HasAnotherBonusLimiter>(
    BonusType::SHOOTER  // 必须是远程单位
));
```

### 奖励堆叠和限制
```cpp
// 创建不堆叠的奖励
auto moraleBonus = std::make_shared<Bonus>(
    BonusDuration::PERMANENT,
    BonusType::MORALE,
    BonusSource::HERO_SPECIAL,
    1,  // +1士气
    BonusSourceID(),
    BonusSubtypeID()  // 空子类型
);
moraleBonus->stacking = "angel_morale";  // 堆叠标识

// 相同stacking的奖励不会堆叠
auto anotherMoraleBonus = std::make_shared<Bonus>(*moraleBonus);
// 这两个奖励不会同时生效
```

### 奖励描述
```cpp
// 生成奖励描述
std::string desc = bonus->Description(gameCallback);

// 自定义数值的描述
std::string customDesc = bonus->Description(gameCallback, 5);  // 使用5作为数值
```

## ⚡ 性能特性

- **轻量级设计**: 结构体设计，内存占用小
- **共享指针**: 使用智能指针管理复杂组件
- **延迟计算**: 描述按需生成，支持缓存
- **位标志**: 持续时间使用位标志，支持多类型组合

## 🔍 注意事项

1. **数值约定**: 负数通常表示有利效果（如伤害减免）
2. **堆叠机制**: 相同stacking标识的奖励不堆叠
3. **类型匹配**: valType必须与奖励类型匹配
4. **序列化**: 复杂奖励需要完整序列化所有组件

## 📊 奖励类型示例

### 主要技能奖励
```cpp
BonusType::PRIMARY_SKILL  // 主要技能（攻击/防御/力量/知识）
BonusSubtypeID(PrimarySkill::ATTACK)  // 攻击力
val = 2  // +2攻击
```

### 战斗奖励
```cpp
BonusType::GENERAL_DAMAGE_REDUCTION  // 伤害减免
val = -20  // -20%伤害（即+20%减伤）
valType = BonusValueType::PERCENT_TO_BASE
```

### 特殊效果
```cpp
BonusType::LUCK  // 幸运
val = 1  // +1幸运
BonusType::MORALE  // 士气
val = 2  // +2士气
```

### 法术和魔法
```cpp
BonusType::SPELL_DAMAGE_REDUCTION  // 法术伤害减免
val = -50  // -50%法术伤害
additionalInfo = {SpellID::FIREBALL}  // 仅对火球术生效
```