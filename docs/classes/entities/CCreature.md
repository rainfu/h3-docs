# CCreature

生物类，定义游戏中各种生物的属性和行为。

## 📋 类概述

`CCreature` 是 VCMI 中生物系统的核心类，定义了游戏中所有生物的基本属性、战斗能力、升级关系和视觉效果。该类继承自 `Creature` 接口和 `CBonusSystemNode`，提供了完整的生物数据管理。

## 🔧 主要属性

### 基本信息
- `idNumber`: 生物ID
- `identifier`: 生物标识符
- `modScope`: 模组作用域
- `faction`: 所属阵营
- `level`: 生物等级 (1-7)
- `iconIndex`: 图标索引

### 战斗属性
- `fightValue`: 战斗价值
- `AIValue`: AI评估价值
- `growth`: 基础增长率
- `hordeGrowth`: 部落增长率
- `doubleWide`: 是否双格宽

### 资源和招募
- `cost`: 招募成本（各资源数量）
- `ammMin`: 冒险地图最小数量
- `ammMax`: 冒险地图最大数量

### 状态标志
- `special`: 是否为特殊生物
- `excludeFromRandomization`: 是否排除随机化

### 升级系统
- `upgrades`: 可升级到的生物ID集合

## 🎯 核心方法

### 基本信息查询
```cpp
// 获取ID和索引
CreatureID getId() const override;
int32_t getIndex() const override;
int32_t getIconIndex() const override;

// 获取本地化名称
std::string getNameTranslated() const override;
std::string getNamePluralTranslated() const override;
std::string getNameSingularTranslated() const override;

// 获取文本ID
std::string getNameTextID() const override;
std::string getNamePluralTextID() const override;
std::string getNameSingularTextID() const override;
```

### 战斗属性查询
```cpp
// 获取基础属性
int32_t getBaseAttack() const override;
int32_t getBaseDefense() const override;
int32_t getBaseDamageMin() const override;
int32_t getBaseDamageMax() const override;
int32_t getBaseHitPoints() const override;
int32_t getBaseSpellPoints() const override;
int32_t getBaseSpeed() const override;
int32_t getBaseShots() const override;

// 获取评估价值
int32_t getAIValue() const override;
int32_t getFightValue() const override;
int32_t getLevel() const override;
```

### 招募和增长
```cpp
// 获取招募成本
int32_t getRecruitCost(GameResID resIndex) const override;
const TResources & getFullRecruitCost() const override;

// 获取增长率
int32_t getGrowth() const override;
int32_t getHorde() const override;

// 获取冒险地图数量
int32_t getAdvMapAmountMin() const override;
int32_t getAdvMapAmountMax() const override;
```

### 状态和能力检查
```cpp
// 检查形态
bool isDoubleWide() const override;
bool hasUpgrades() const override;

// 检查阵营倾向
bool isGood() const;
bool isEvil() const;

// 获取阵营
FactionID getFactionID() const override;
```

### 升级系统
```cpp
// 检查升级关系
bool isMyDirectUpgrade(const CCreature * target) const;
bool isMyDirectOrIndirectUpgrade(const CCreature *target) const;
```

### 奖励系统
```cpp
// 获取奖励承载者
const IBonusBearer * getBonusBearer() const override;

// 添加奖励
void addBonus(int val, BonusType type);
void addBonus(int val, BonusType type, BonusSubtypeID subtype);
```

### 工具方法
```cpp
// 计算可招募最大数量
si32 maxAmount(const TResources &res) const;

// 获取随机数量
int getRandomAmount(vstd::RNG & ranGen) const;

// 获取数量描述
static CreatureQuantityId getQuantityID(const int & quantity);
static std::string getQuantityRangeStringForId(const CreatureQuantityId & quantityId);
static int estimateCreatureCount(ui32 countID);
```

## 🔗 依赖关系

### 依赖的类
- `Creature`: 生物接口
- `CBonusSystemNode`: 奖励系统节点
- `CCreatureHandler`: 生物处理器
- `FactionID`: 阵营ID
- `CreatureID`: 生物ID

### 被依赖关系
- 被 `CStackInstance` 用于创建单位栈
- 被 `CCreatureHandler` 用于管理生物数据
- 被战斗系统用于属性计算
- 被AI系统用于评估

## 📝 使用示例

### 查询生物属性
```cpp
// 获取生物基本信息
auto name = creature->getNameTranslated();
auto level = creature->getLevel();
auto faction = creature->getFactionID();

// 获取战斗属性
auto attack = creature->getBaseAttack();
auto defense = creature->getBaseDefense();
auto damageMin = creature->getBaseDamageMin();
auto damageMax = creature->getBaseDamageMax();
auto hitPoints = creature->getBaseHitPoints();
```

### 检查招募条件
```cpp
// 获取招募成本
const auto & cost = creature->getFullRecruitCost();
for (GameResID res = GameResID::WOOD; res <= GameResID::GOLD; ++res) {
    auto resCost = creature->getRecruitCost(res);
    if (resCost > 0) {
        // 检查资源是否足够
    }
}

// 计算可招募最大数量
TResources availableResources = {1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000};
auto maxCanBuy = creature->maxAmount(availableResources);
```

### 升级系统
```cpp
// 检查直接升级
for (auto upgradeId : creature->upgrades) {
    auto upgradeCreature = creatureHandler->getById(upgradeId);
    if (creature->isMyDirectUpgrade(upgradeCreature)) {
        // 可以直接升级
    }
}

// 检查间接升级
if (creature->isMyDirectOrIndirectUpgrade(targetCreature)) {
    // 可以通过多级升级到达
}
```

### 奖励系统集成
```cpp
// 添加基础奖励
creature->addBonus(1, BonusType::PRIMARY_SKILL, BonusSubtypeID(PrimarySkill::ATTACK));

// 获取奖励承载者
const auto * bearer = creature->getBonusBearer();
auto attackBonus = bearer->getBonusValue(BonusType::PRIMARY_SKILL,
                                        BonusSubtypeID(PrimarySkill::ATTACK));
```

### 随机和数量处理
```cpp
// 获取冒险地图随机数量
auto minAmount = creature->getAdvMapAmountMin();
auto maxAmount = creature->getAdvMapAmountMax();
auto randomAmount = creature->getRandomAmount(rng);

// 获取数量描述
auto quantityId = CCreature::getQuantityID(randomAmount);
auto quantityText = CCreature::getQuantityRangeStringForId(quantityId);
```

## ⚡ 性能特性

- **预编译奖励**: 生物奖励预先计算
- **缓存机制**: 常用属性缓存
- **共享数据**: 生物数据在多个实例间共享
- **快速查找**: 通过ID快速访问

## 🔍 注意事项

1. **等级范围**: 生物等级为1-7，0表示未知
2. **阵营关联**: 生物属性可能受阵营影响
3. **特殊生物**: special标记的生物有特殊处理逻辑
4. **升级链**: 升级关系可能形成复杂网络

## 📊 相关结构

### CreatureQuantityId 枚举
```cpp
enum class CreatureQuantityId {
    FEW = 1,      // 几个
    SEVERAL,      // 一些
    PACK,         // 一群
    LOTS,         // 许多
    HORDE,        // 大群
    THRONG,       // 人群
    SWARM,        // 蜂群
    ZOUNDS,       // 大量
    LEGION       // 军团
};
```

### CreatureAnimation 结构体
```cpp
struct CreatureAnimation {
    double timeBetweenFidgets;    // 发呆间隔时间
    double idleAnimationTime;     // 空闲动画时间
    double walkAnimationTime;     // 行走动画时间
    double attackAnimationTime;   // 攻击动画时间
    // 投射物偏移和角度...
    AnimationPath projectileImageName;  // 投射物图像
    std::vector<RayColor> projectileRay; // 投射物光线颜色
};
```

### CreatureBattleSounds 结构体
```cpp
struct CreatureBattleSounds {
    AudioPath attack;     // 攻击音效
    AudioPath defend;     // 防御音效
    AudioPath killed;     // 死亡音效
    AudioPath move;       // 移动音效
    AudioPath shoot;      // 射击音效
    AudioPath wince;      // 受伤音效
    AudioPath startMoving; // 开始移动音效
    AudioPath endMoving;   // 结束移动音效
};
```

## 🔧 配置示例

### 生物配置JSON
```json
{
  "name": {
    "singular": "Pikeman",
    "plural": "Pikemen"
  },
  "faction": "castle",
  "level": 1,
  "cost": {
    "gold": 60
  },
  "fightValue": 84,
  "aiValue": 84,
  "growth": 14,
  "hitPoints": 10,
  "speed": 4,
  "attack": 4,
  "defense": 5,
  "damage": {
    "min": 1,
    "max": 3
  },
  "upgrades": ["halberdier"],
  "graphics": {
    "animation": "CPIKE.DEF",
    "map": "APike.bmp"
  },
  "sound": {
    "attack": "PIKEATTK.WAV",
    "defend": "PIKEDFND.WAV",
    "killed": "PIKEDIED.WAV"
  }
}
```