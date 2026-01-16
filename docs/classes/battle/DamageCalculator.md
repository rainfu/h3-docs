# DamageCalculator

伤害计算器，负责计算战斗中的各种伤害类型和效果。

## 📋 类概述

`DamageCalculator` 是战斗系统的核心计算组件，负责处理所有类型的伤害计算，包括：

- 基础伤害计算
- 各种加成和减免效果
- 特殊技能和状态影响
- 随机性和概率因素

此类使用复杂的因子系统来精确计算战斗伤害。

## 🔧 主要属性

### 输入参数
- `callback`: 战斗信息回调接口，提供战斗状态信息
- `info`: 战斗攻击信息，包含攻击者和目标的详细信息

## 🎯 核心方法

### 主要计算接口
```cpp
// 计算伤害范围
DamageEstimation calculateDmgRange() const;
```

### 基础伤害计算
```cpp
// 单次攻击基础伤害
DamageRange getBaseDamageSingle() const;

// 祝福/诅咒影响的伤害
DamageRange getBaseDamageBlessCurse() const;

// 单位栈总伤害
DamageRange getBaseDamageStack() const;
```

### 属性计算
```cpp
// 攻击方属性
int getActorAttackBase() const;        // 基础攻击
int getActorAttackEffective() const;   // 有效攻击
int getActorAttackSlayer() const;      // 屠戮者加成
int getActorAttackIgnored() const;     // 忽略防御

// 防御方属性
int getTargetDefenseBase() const;      // 基础防御
int getTargetDefenseEffective() const; // 有效防御
int getTargetDefenseIgnored() const;   // 忽略防御
```

### 因子计算
```cpp
// 攻击因子
double getAttackSkillFactor() const;           // 技能因子
double getAttackOffenseArcheryFactor() const;  // 进攻/射术因子
double getAttackBlessFactor() const;           // 祝福因子
double getAttackLuckFactor() const;            // 幸运因子
double getAttackJoustingFactor() const;        // 骑枪因子
double getAttackDeathBlowFactor() const;       // 致命一击因子
double getAttackDoubleDamageFactor() const;    // 双倍伤害因子
double getAttackHateCreatureFactor() const;    // 仇恨生物因子
double getAttackHateTraitFactor() const;       // 仇恨特性因子
double getAttackRevengeFactor() const;         // 复仇因子
double getAttackFromBackFactor() const;        // 背刺因子

// 防御因子
double getDefenseSkillFactor() const;          // 技能因子
double getDefenseArmorerFactor() const;        // 防具因子
double getDefenseMagicShieldFactor() const;    // 魔法盾因子
double getDefenseRangePenaltiesFactor() const; // 远程惩罚因子
double getDefenseObstacleFactor() const;       // 障碍物因子
double getDefenseBlindParalysisFactor() const; // 致盲/麻痹因子
double getDefenseUnluckyFactor() const;        // 不幸因子
double getDefenseForgetfulnessFactor() const;  // 遗忘因子
double getDefensePetrificationFactor() const;  // 石化因子
double getDefenseMagicFactor() const;          // 魔法因子
double getDefenseMindFactor() const;           // 心灵因子
```

### 辅助计算
```cpp
// 计算伤亡
DamageRange getCasualties(const DamageRange & damageDealt) const;
int64_t getCasualties(int64_t damageDealt) const;

// 获取因子列表
std::vector<double> getAttackFactors() const;
std::vector<double> getDefenseFactors() const;

// 获取伤害上限
int64_t getDamageCap() const;
```

## 🔗 依赖关系

### 依赖的类
- `CBattleInfoCallback`: 战斗信息回调接口
- `BattleAttackInfo`: 战斗攻击信息结构
- `IBonusBearer`: 奖励承载者接口
- `CSelector`: 奖励选择器
- `DamageRange`: 伤害范围结构
- `DamageEstimation`: 伤害估算结构

### 被依赖关系
- 被 `BattleAction` 用于计算战斗结果
- 被战斗AI用于伤害评估
- 被UI系统用于伤害预览

## 📝 使用示例

### 基本伤害计算
```cpp
// 创建伤害计算器
DamageCalculator calculator(battleCallback, attackInfo);

// 计算伤害范围
DamageEstimation damage = calculator.calculateDmgRange();

// 输出结果
log.info() << "最小伤害: " << damage.damage.min
           << ", 最大伤害: " << damage.damage.max
           << ", 平均伤害: " << damage.damage.avg;
```

### 因子分析
```cpp
// 获取各种因子
double attackFactor = calculator.getAttackSkillFactor();
double defenseFactor = calculator.getDefenseSkillFactor();
double luckFactor = calculator.getAttackLuckFactor();

// 分析关键因子
std::vector<double> attackFactors = calculator.getAttackFactors();
std::vector<double> defenseFactors = calculator.getDefenseFactors();

// 计算总伤害倍率
double totalMultiplier = 1.0;
for (double factor : attackFactors) {
    totalMultiplier *= factor;
}
for (double factor : defenseFactors) {
    totalMultiplier /= factor;  // 防御因子是除法
}
```

### 高级用法
```cpp
// 计算特定情况下的伤害
auto baseDamage = calculator.getBaseDamageStack();
auto casualties = calculator.getCasualties(baseDamage);

// 考虑特殊效果
if (calculator.getAttackDeathBlowFactor() > 1.0) {
    // 致命一击效果
}
if (calculator.getAttackFromBackFactor() > 1.0) {
    // 背刺伤害加成
}
```

## ⚡ 性能特性

- **因子缓存**: 复杂的因子计算结果会被缓存以提高性能
- **精确计算**: 使用双精度浮点数确保计算精度
- **模块化设计**: 每个因子独立计算，便于维护和扩展

## 🔍 注意事项

1. **状态依赖**: 计算结果依赖于战斗的当前状态
2. **随机性**: 伤害计算包含随机因素，结果可能有变数
3. **因子组合**: 多个因子相乘可能导致极端结果
4. **边界检查**: 需要检查伤害上限和下限

## 📊 相关结构

### DamageRange 结构
```cpp
struct DamageRange {
    int64_t min = 0;  // 最小伤害
    int64_t max = 0;  // 最大伤害
};
```

### DamageEstimation 结构
```cpp
struct DamageEstimation {
    DamageRange damage;     // 伤害范围
    int64_t casualties;     // 预计伤亡
    // 其他估算信息...
};
```

### BattleAttackInfo 结构
```cpp
struct BattleAttackInfo {
    const battle::Unit * attacker;    // 攻击者
    const battle::Unit * defender;    // 防御者
    BattleHex destination;            // 目标位置
    // 其他攻击信息...
};
```