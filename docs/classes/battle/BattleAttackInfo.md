# BattleAttackInfo类

BattleAttackInfo类是VCMI中战斗攻击信息的表示，用于封装攻击相关的参数和状态。

## 类定义

虽然完整的定义没有在我们查看的文件中显示，但根据其在CBattleInfoCallback中的使用方式，我们可以推断其结构如下：

```cpp
class DLL_LINKAGE BattleAttackInfo
{
public:
    const battle::Unit * attacker;      // 攻击者
    const battle::Unit * defender;      // 防御者
    BattleHex attackerPos;             // 攻击者位置
    BattleHex defenderPos;             // 防御者位置
    bool shooting;                     // 是否为远程攻击
    bool luckyHit;                     // 是否为幸运一击
    bool unluckyHit;                   // 是否为倒霉一击
    bool deathBlow;                    // 是否为致命一击
    bool lifeDrain;                    // 是否为生命汲取
    bool retaliation;                  // 是否为反击
    int32_t additionalAttackCount;     // 额外攻击次数
    int32_t additionalHitPointPercent; // 额外生命值百分比

    BattleAttackInfo(
        const battle::Unit * att,
        const battle::Unit * def,
        BattleHex attPos = BattleHex::INVALID,
        BattleHex defPos = BattleHex::INVALID,
        bool isShooting = false
    );

    // 检查攻击是否为近战攻击
    bool isMeleeAttack() const;

    // 检查攻击是否为远程攻击
    bool isRangedAttack() const;

    // 检查是否可以造成反击
    bool canRetaliate() const;

    // 计算攻击造成的伤害
    DamageEstimation calculateDamage(const CBattleInfoCallback * battleCb) const;

    // 获取攻击者造成的最小伤害
    int64_t getAttackerMinDamage() const;

    // 获取攻击者造成的最大伤害
    int64_t getAttackerMaxDamage() const;

    // 获取防御者造成的最小伤害（反击时）
    int64_t getDefenderMinDamage() const;

    // 获取防御者造成的最大伤害（反击时）
    int64_t getDefenderMaxDamage() const;

    // 获取攻击者的生命值变化
    int64_t getAttackerHPGain() const;

    // 获取防御者的生命值变化
    int64_t getDefenderHPGain() const;

    // 检查攻击是否触发特殊效果
    bool hasSpecialEffects() const;
};
```

## 功能说明

BattleAttackInfo是VCMI战斗系统中用于封装攻击相关信息的类。它包含了攻击者、防御者、位置信息、攻击类型以及其他与攻击相关的标志。这个类提供了一个统一的接口来处理攻击的各个方面，包括伤害计算、特殊效果处理和反击判断等。通过将所有攻击相关信息封装在一起，这个类简化了战斗系统的复杂性。

## 依赖关系

- [battle::Unit](./Unit.md): 战斗单位
- [BattleHex](./BattleHex.md): 战斗格子
- [CBattleInfoCallback](./CBattleInfoCallback.md): 战斗信息回调
- [DamageEstimation](./DamageEstimation.md): 伤害估算

## 成员变量

- `attacker`: 指向攻击者的指针
- `defender`: 指向防御者的指针
- `attackerPos`: 攻击者的位置
- `defenderPos`: 防御者的位置
- `shooting`: 标识是否为远程攻击
- `luckyHit`: 标识是否为幸运一击
- `unluckyHit`: 标识是否为倒霉一击
- `deathBlow`: 标识是否为致命一击
- `lifeDrain`: 标识是否为生命汲取
- `retaliation`: 标识是否为反击
- `additionalAttackCount`: 额外攻击次数
- `additionalHitPointPercent`: 额外生命值百分比

## 构造函数

- `BattleAttackInfo(att, def, attPos, defPos, isShooting)`: 使用攻击者、防御者及相关参数初始化攻击信息

## 函数注释

- `isMeleeAttack()`: 检查是否为近战攻击
- `isRangedAttack()`: 检查是否为远程攻击
- `canRetaliate()`: 检查防御者是否可以反击
- `calculateDamage(battleCb)`: 使用战斗回调计算攻击造成的伤害
- `getAttackerMinDamage()`: 获取攻击者造成的最小伤害
- `getAttackerMaxDamage()`: 获取攻击者造成的最大伤害
- `getDefenderMinDamage()`: 获取防御者反击的最小伤害
- `getDefenderMaxDamage()`: 获取防御者反击的最大伤害
- `getAttackerHPGain()`: 获取攻击者的生命值变化（如生命汲取）
- `getDefenderHPGain()`: 获取防御者的生命值变化
- `hasSpecialEffects()`: 检查攻击是否触发特殊效果

## 设计说明

BattleAttackInfo类采用了专门化的设计，专注于封装战斗攻击的相关信息。它将复杂的攻击参数和状态集中在一个对象中，使战斗系统能够更容易地处理攻击相关的逻辑。

该类的接口设计考虑了攻击的各种方面，包括基础伤害计算、特殊效果处理和反击逻辑。通过将所有相关信息封装在一起，这个类减少了函数参数的数量，提高了代码的可读性和可维护性。

类中的标志变量（如shooting、luckyHit等）允许战斗系统轻松检查攻击的特殊属性，而不用重复计算这些条件。这种方法提高了性能并简化了代码逻辑。