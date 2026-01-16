# AttackableTiles类

AttackableTiles类是VCMI战斗系统中可攻击格子的表示类，用于跟踪战斗中哪些格子可以被攻击。

## 类定义

```cpp
class DLL_LINKAGE AttackableTiles
{
    std::set<BattleHex> ourAttackingTiles;      // 我方攻击可达格子
    std::set<BattleHex> enemyAttackingTiles;    // 敌方攻击可达格子

public:
    AttackableTiles();                          // 默认构造函数

    void updateOurAttackingTiles(BattleHex position, ui8 side, const Unit * unit);
    void updateEnemyAttackingTiles(BattleHex position, ui8 side, const Unit * unit);

    bool isAttackable(BattleHex tile, ui8 attackerSide) const;  // 判断格子是否可攻击
    bool isAttackableByMe(BattleHex tile) const;               // 判断格子是否可被我方攻击
    bool isAttackableByEnemy(BattleHex tile) const;            // 判断格子是否可被敌方攻击

    const std::set<BattleHex> & getOurAttackingTiles() const;   // 获取我方攻击可达格子
    const std::set<BattleHex> & getEnemyAttackingTiles() const; // 获取敌方攻击可达格子
};
```

## 功能说明

AttackableTiles是VCMI战斗系统中用于管理可攻击格子的类。它跟踪战斗中哪些格子可以被哪一方攻击，这对于战斗AI和玩家界面显示攻击范围至关重要。该类通过维护两个集合分别记录我方和敌方的攻击可达格子。

## 构造函数

- `AttackableTiles()`: 默认构造函数，初始化两个集合为空

## 函数注释

- `updateOurAttackingTiles(position, side, unit)`: 更新我方攻击可达格子，基于给定位置、阵营和单位
- `updateEnemyAttackingTiles(position, side, unit)`: 更新敌方攻击可达格子，基于给定位置、阵营和单位
- `isAttackable(tile, attackerSide)`: 判断指定格子是否可被指定阵营攻击
- `isAttackableByMe(tile)`: 判断指定格子是否可被我方攻击
- `isAttackableByEnemy(tile)`: 判断指定格子是否可被敌方攻击
- `getOurAttackingTiles()`: 获取我方攻击可达格子集合
- `getEnemyAttackingTiles()`: 获取敌方攻击可达格子集合

## 成员变量

- `ourAttackingTiles`: 我方攻击可达格子集合
- `enemyAttackingTiles`: 敌方攻击可达格子集合

## 设计说明

AttackableTiles类是战斗系统中攻击范围管理的重要组成部分。通过精确跟踪可攻击格子，游戏可以正确显示攻击范围，辅助AI做出决策，并提供良好的用户体验。该类的设计考虑了双人对战的特性，分别维护双方的攻击范围，提高了查询效率。