# BonusCustomTypes相关类

BonusCustomTypes相关类是VCMI奖励系统中用于定义自定义奖励类型和子类型的组件，提供了灵活的奖励标识符系统。

## 类定义

```cpp
class DLL_LINKAGE BonusCustomSource : public StaticIdentifier<BonusCustomSource>
{
public:
    using StaticIdentifier<BonusCustomSource>::StaticIdentifier;

    static std::string encode(int32_t index);  // 编码索引为字符串
    static si32 decode(const std::string & identifier);  // 解码字符串为索引

    static const BonusCustomSource undeadMoraleDebuff; // 亡灵士气惩罚，值为-2
};

class DLL_LINKAGE BonusCustomSubtype : public StaticIdentifier<BonusCustomSubtype>
{
public:
    using StaticIdentifier<BonusCustomSubtype>::StaticIdentifier;

    static std::string encode(int32_t index);  // 编码索引为字符串
    static si32 decode(const std::string & identifier);  // 解码字符串为索引

    // 生物伤害相关子类型
    static const BonusCustomSubtype creatureDamageBoth; // 0 - 生物伤害（最小和最大）
    static const BonusCustomSubtype creatureDamageMin;  // 1 - 生物最小伤害
    static const BonusCustomSubtype creatureDamageMax;  // 2 - 生物最大伤害

    // 伤害类型相关子类型
    static const BonusCustomSubtype damageTypeAll;     // -1 - 所有伤害类型
    static const BonusCustomSubtype damageTypeMelee;   // 0 - 近战伤害类型
    static const BonusCustomSubtype damageTypeRanged;  // 1 - 远程伤害类型

    // 英雄移动相关子类型
    static const BonusCustomSubtype heroMovementLand;  // 1 - 陆地移动
    static const BonusCustomSubtype heroMovementSea;   // 0 - 海上移动

    // 死亡凝视相关子类型
    static const BonusCustomSubtype deathStareGorgon;           // 0 - 石像鬼凝视
    static const BonusCustomSubtype deathStareCommander;        // 指挥官死亡凝视
    static const BonusCustomSubtype deathStareNoRangePenalty;   // 无视距离惩罚的死亡凝视
    static const BonusCustomSubtype deathStareRangePenalty;     // 有距离惩罚的死亡凝视
    static const BonusCustomSubtype deathStareObstaclePenalty;  // 有障碍惩罚的死亡凝视
    static const BonusCustomSubtype deathStareRangeObstaclePenalty; // 有距离和障碍惩罚的死亡凝视

    // 复活相关子类型
    static const BonusCustomSubtype rebirthRegular;  // 0 - 普通复活
    static const BonusCustomSubtype rebirthSpecial;  // 1 - 特殊复活

    // 视野相关子类型
    static const BonusCustomSubtype visionsMonsters;  // 0 - 怪物视野
    static const BonusCustomSubtype visionsHeroes;    // 1 - 英雄视野
    static const BonusCustomSubtype visionsTowns;     // 2 - 城镇视野

    // 免疫相关子类型
    static const BonusCustomSubtype immunityBattleWide;  // 0 - 战斗范围免疫
    static const BonusCustomSubtype immunityEnemyHero;   // 1 - 敌方英雄免疫

    // 转变相关子类型
    static const BonusCustomSubtype transmutationPerHealth;  // 0 - 按生命值转变
    static const BonusCustomSubtype transmutationPerUnit;    // 1 - 按单位转变

    // 摧毁相关子类型
    static const BonusCustomSubtype destructionKillPercentage;  // 0 - 按百分比击杀摧毁
    static const BonusCustomSubtype destructionKillAmount;      // 1 - 按数量击杀摧毁

    // 灵魂窃取相关子类型
    static const BonusCustomSubtype soulStealPermanent;  // 0 - 永久灵魂窃取
    static const BonusCustomSubtype soulStealBattle;     // 1 - 战斗中灵魂窃取

    // 移动方式相关子类型
    static const BonusCustomSubtype movementFlying;      // 0 - 飞行移动
    static const BonusCustomSubtype movementTeleporting; // 1 - 传送移动

    static BonusCustomSubtype spellLevel(int level);    // 根据法术等级创建子类型
    static BonusCustomSubtype creatureLevel(int level); // 根据生物等级创建子类型
};

class DLL_LINKAGE BonusTypeID : public EntityIdentifier<BonusTypeID>
{
public:
    using EntityIdentifier<BonusTypeID>::EntityIdentifier;
    using EnumType = BonusType;  // 枚举类型别名

    static std::string encode(int32_t index);  // 编码索引为字符串
    static si32 decode(const std::string & identifier);  // 解码字符串为索引

    constexpr EnumType toEnum() const;  // 转换为枚举值
    constexpr BonusTypeID(const EnumType & enumValue);  // 从枚举值构造
};

// 类型别名
using BonusSubtypeID = VariantIdentifier<BonusCustomSubtype, SpellID, CreatureID, PrimarySkill, TerrainId, GameResID, SpellSchool, BonusTypeID>;  // 奖励子类型标识符
using BonusSourceID = VariantIdentifier<BonusCustomSource, SpellID, CreatureID, ArtifactID, CampaignScenarioID, SecondarySkill, HeroTypeID, Obj, ObjectInstanceID, BuildingTypeUniqueID, BattleField, ArtifactInstanceID>;  // 奖励来源标识符
```

## 功能说明

BonusCustomTypes相关类是VCMI奖励系统中用于定义自定义奖励类型和子类型的组件。它们扩展了标准的奖励类型系统，提供了更多的灵活性和特化功能。

## BonusCustomSource类

这是一个继承自StaticIdentifier的类，用于定义特殊的奖励来源。它提供编码和解码功能，可以将索引转换为字符串标识符或将字符串标识符转换回索引。目前定义了一个特殊的来源undeadMoraleDebuff，用于表示亡灵生物的负面士气效果。

## BonusCustomSubtype类

这是一个继承自StaticIdentifier的类，用于定义各种奖励子类型。它包含多个类别：

- 生物伤害子类型：用于区分生物伤害的最小值、最大值或两者
- 伤害类型子类型：用于区分近战、远程或所有类型的伤害
- 英雄移动子类型：用于区分陆地和海上移动奖励
- 死亡凝视子类型：用于不同类型的死亡凝视效果
- 复活子类型：用于区分普通和特殊复活效果
- 视野子类型：用于不同类型的视野效果
- 免疫子类型：用于不同类型的免疫效果
- 转变、摧毁、灵魂窃取、移动方式等其他子类型

该类还提供了静态方法来根据法术等级或生物等级创建相应的子类型。

## BonusTypeID类

这是一个继承自EntityIdentifier的类，用于将BonusType枚举值包装成标识符类型。它提供了枚举值和标识符之间的双向转换功能。

## 类型别名

- `BonusSubtypeID`：奖励子类型标识符，使用VariantIdentifier包装了多种可能的子类型来源
- `BonusSourceID`：奖励来源标识符，使用VariantIdentifier包装了多种可能的来源类型

## 设计说明

BonusCustomTypes系列类通过使用StaticIdentifier和EntityIdentifier基类，确保了类型安全和唯一性。通过VariantIdentifier，系统可以灵活地处理多种不同类型的奖励子类型和来源，同时保持类型安全。

这种设计允许奖励系统处理各种复杂的奖励情况，同时保持代码的清晰和可维护性。