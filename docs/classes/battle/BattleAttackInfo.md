# BattleAttackInfo类

BattleAttackInfo类是VCMI战斗系统中战斗攻击信息的表示类，用于描述一次战斗攻击的详细信息。

## 类定义

``cpp
class DLL_LINKAGE BattleAttackInfo
{
public:
    const CUnitState * attacker;        // 攻击者单位状态
    const CUnitState * defender;        // 防御者单位状态
    BattleHex targetHex;                // 攻击目标格子
    bool ranged;                        // 是否远程攻击
    bool negativeAttack;                // 是否负面攻击（削弱攻击能力）
    bool luckyHit;                      // 是否幸运打击
    bool unluckyHit;                    // 是否不幸打击
    bool deathBlow;                     // 是否致死打击
    bool retaliation;                   // 是否反击
    double effectiveness;               // 攻击效果系数

    BattleAttackInfo();                                         // 默认构造函数
    BattleAttackInfo(const CUnitState * att, 
                     const CUnitState * def);                  // 用攻击者和防御者构造

    void calculate();                                          // 计算攻击信息
    bool isMeleeAttack() const;                                // 是否近战攻击
    bool isRangedAttack() const;                               // 是否远程攻击

    static BattleAttackInfo construct(const CUnitState * att,
                                     const CUnitState * def,
                                     BattleHex destination,
                                     bool ret = false);       // 构造攻击信息
};
```

## 功能说明

BattleAttackInfo是VCMI战斗系统中用于描述战斗攻击信息的类。它包含了攻击的详细信息，如攻击者、防御者、目标位置、攻击类型和特殊效果等。这个类用于计算攻击的各个方面，如伤害、特殊效果触发等，是战斗逻辑处理的重要组成部分。

## 构造函数

- `BattleAttackInfo()`: 默认构造函数，初始化所有成员为默认值
- `BattleAttackInfo(att, def)`: 用攻击者和防御者单位状态构造

## 函数注释

- `calculate()`: 根据攻击者和防御者的信息计算攻击的详细参数
- `isMeleeAttack()`: 判断是否为近战攻击（非远程攻击）
- `isRangedAttack()`: 判断是否为远程攻击
- `construct(att, def, destination, ret)`: 静态工厂方法，构造包含完整信息的攻击对象

## 成员变量

- `attacker`: 攻击者单位状态的常量指针
- `defender`: 防御者单位状态的常量指针
- `targetHex`: 攻击的目标格子
- `ranged`: 标志是否为远程攻击
- `negativeAttack`: 标志是否为负面攻击（削弱攻击能力）
- `luckyHit`: 标志是否为幸运打击
- `unluckyHit`: 标志是否为不幸打击
- `deathBlow`: 标志是否为致死打击
- `retaliation`: 标志是否为反击
- `effectiveness`: 攻击效果系数，影响伤害计算

## 设计说明

BattleAttackInfo类是战斗系统中攻击处理的核心组件。通过封装攻击的详细信息，它使战斗逻辑能够正确处理各种攻击类型和特殊效果。该类的工厂方法和计算方法使其能够灵活适应不同类型的攻击场景，确保战斗结果的准确性。