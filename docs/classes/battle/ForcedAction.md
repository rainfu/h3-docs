# ForcedAction类

ForcedAction类是VCMI战斗系统中强制动作的表示类，用于描述战斗中必须执行的动作，如单位移动、攻击或其他特殊动作。

## 类定义

```cpp
class DLL_LINKAGE ForcedAction
{
public:
    enum EActionType
    {
        INVALID = -1,     // 无效动作
        MOVE,             // 移动
        ATTACK,           // 攻击
        WALK_AND_ATTACK,  // 走到并攻击
        SHOOT,            // 射击
        WALK_AND_SHOOT,   // 走到并射击
        WAIT,             // 等待
        DEFEND,           // 防御
        RETREAT,          // 撤退
        SURRENDER,        // 投降
        CAST_SPELL,       // 施法
        MONSTER_SPELL,    // 怪物施法
        CATAPULT,         // 投石车攻击
        HEAL,             // 治疗
        TAMING,           // 驯服
        DAEMON_SUMMONING  // 恶魔召唤
    };

    EActionType actionType;                    // 动作类型
    BattleHex destinationTile;                 // 目标格子
    BattleHex attackTarget;                    // 攻击目标格子
    ui8 attackingHex;                         // 攻击发起格子
    ui8 direction;                            // 方向
    si32 spellID;                             // 法术ID
    std::vector<BattleHex> spellDestinations;  // 法术目标格子列表

    ForcedAction();                           // 默认构造函数
    explicit ForcedAction(EActionType type);  // 用动作类型构造

    std::string toString() const;             // 转换为字符串表示
    bool isValid() const;                     // 检查动作是否有效
};
```

## 功能说明

ForcedAction是VCMI战斗系统中用于表示强制执行的动作的类。它包含了战斗中可能出现的各种动作类型，如移动、攻击、射击、等待、防御、施法等。每个动作都包含相关的参数，如目标位置、攻击目标等，以确保动作能够正确执行。这个类对于战斗逻辑的执行和动画播放至关重要。

## 枚举值

- `INVALID`: 无效动作
- `MOVE`: 移动动作
- `ATTACK`: 攻击动作
- `WALK_AND_ATTACK`: 走到并攻击动作
- `SHOOT`: 射击动作
- `WALK_AND_SHOOT`: 走到并射击动作
- `WAIT`: 等待动作
- `DEFEND`: 防御动作
- `RETREAT`: 撤退动作
- `SURRENDER`: 投降动作
- `CAST_SPELL`: 施法动作
- `MONSTER_SPELL`: 怪物施法动作
- `CATAPULT`: 投石车攻击动作
- `HEAL`: 治疗动作
- `TAMING`: 驯服动作
- `DAEMON_SUMMONING`: 恶魔召唤动作

## 构造函数

- `ForcedAction()`: 默认构造函数，初始化动作为INVALID
- `ForcedAction(type)`: 用指定动作类型构造

## 函数注释

- `toString()`: 返回动作的字符串表示，便于调试和日志记录
- `isValid()`: 检查动作是否有效，如果动作类型不是INVALID则返回true

## 成员变量

- `actionType`: 动作类型
- `destinationTile`: 动作的目标格子
- `attackTarget`: 攻击目标格子
- `attackingHex`: 攻击发起的格子
- `direction`: 攻击或移动的方向
- `spellID`: 施法动作对应的法术ID
- `spellDestinations`: 法术目标格子列表

## 设计说明

ForcedAction类是战斗系统中动作执行的核心组成部分。通过定义各种动作类型和相关参数，该类能够精确描述战斗中发生的每一个动作。这种设计使得战斗逻辑更加清晰，也方便了动画系统根据动作类型播放相应的动画效果。