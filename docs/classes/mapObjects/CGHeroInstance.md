# CGHeroInstance

## 概述

`CGHeroInstance` 是VCMI中英雄实例的核心类，代表地图上可控制的英雄单位。它继承自多个基类，集成了军队管理、神器装备、法术施放、派系成员等多种功能，是游戏中最重要的实体之一。

## 继承层次

```cpp
CGHeroInstance : public CArmedInstance,           // 武装实例（军队管理）
                 public IBoatGenerator,           // 船只生成器
                 public CArtifactSet,             // 神器集合
                 public spells::Caster,           // 法术施放者
                 public AFactionMember,           // 派系成员
                 public ICreatureUpgrader,        // 生物升级器
                 public IOwnableObject            // 可拥有对象
```

## 核心属性

### 基本信息
```cpp
TExpType exp;                    // 经验值
ui32 level;                      // 当前等级
HeroTypeID customPortraitSource; // 自定义肖像来源
si32 mana;                       // 当前法力值
EHeroGender gender;              // 性别
```

### 技能和法术
```cpp
std::vector<std::pair<SecondarySkill,ui8>> secSkills; // 次要技能列表
std::set<SpellID> spells;                             // 已知法术
```

### 位置和状态
```cpp
ui32 movement;                   // 剩余移动点数
bool inTownGarrison;             // 是否在城镇驻军中
ObjectInstanceID visitedTown;    // 访问的城镇ID
ObjectInstanceID boardedBoat;    // 登上的船只ID
```

### 巡逻系统
```cpp
struct Patrol
{
    bool patrolling{false};      // 是否在巡逻
    int3 initialPos;             // 初始位置
    ui32 patrolRadius{NO_PATROLLING}; // 巡逻半径
} patrol;
```

## 构造函数和初始化

### CGHeroInstance
```cpp
CGHeroInstance(IGameInfoCallback *cb);
```
- **参数**: `cb` - 游戏信息回调接口
- **功能**: 创建英雄实例

### 初始化方法
```cpp
void initObj(IGameRandomizer & gameRandomizer) override;
void initHero(IGameRandomizer & gameRandomizer, bool isFake = false);
void initHero(IGameRandomizer & gameRandomizer, const HeroTypeID & SUBID, bool isFake = false);
```
- **功能**: 初始化英雄对象和英雄数据

## 英雄类型和外观

### 类型信息
```cpp
const CHero * getHeroType() const;           // 获取英雄类型定义
HeroTypeID getHeroTypeID() const;            // 获取英雄类型ID
void setHeroType(HeroTypeID type);           // 设置英雄类型

const CHeroClass * getHeroClass() const;     // 获取英雄职业
HeroClassID getHeroClassID() const;          // 获取英雄职业ID
```

### 名称和传记
```cpp
std::string getNameTextID() const;           // 获取名称文本ID
std::string getNameTranslated() const;       // 获取本地化名称

std::string getBiographyTextID() const;      // 获取传记文本ID
std::string getBiographyTranslated() const;  // 获取本地化传记

std::string getClassNameTextID() const;      // 获取职业名称文本ID
std::string getClassNameTranslated() const;  // 获取本地化职业名称
```

### 肖像和图标
```cpp
HeroTypeID getPortraitSource() const;       // 获取肖像来源
int32_t getIconIndex() const;               // 获取图标索引
```

## 技能系统

### 主要技能
```cpp
int getPrimSkillLevel(PrimarySkill id) const;                    // 获取主要技能等级
int getBasePrimarySkillValue(PrimarySkill which) const;          // 获取基础主要技能值

void setPrimarySkill(PrimarySkill primarySkill, si64 value, ChangeValueMode mode); // 设置主要技能
```

### 次要技能
```cpp
ui8 getSecSkillLevel(const SecondarySkill & skill) const;        // 获取次要技能等级
void setSecSkillLevel(const SecondarySkill & which, int val, ChangeValueMode mode); // 设置次要技能等级

bool canLearnSkill() const;                                      // 是否可以学习技能
bool canLearnSkill(const SecondarySkill & which) const;          // 是否可以学习特定技能
```

### 升级系统
```cpp
bool gainsLevel() const;                                         // 是否可以升级
std::vector<SecondarySkill> getLevelupSkillCandidates(IGameRandomizer & gameRandomizer) const; // 获取升级技能候选
void levelUp();                                                 // 升级英雄
```

## 经验和等级

### 经验管理
```cpp
void setExperience(si64 value, ChangeValueMode mode);           // 设置经验值
TExpType calculateXp(TExpType exp) const;                       // 计算经验值（应用学习技能）
```

## 移动系统

### 移动点数
```cpp
void setMovementPoints(int points);                             // 设置移动点数
int movementPointsRemaining() const;                            // 获取剩余移动点数
int movementPointsLimit(bool onLand) const;                     // 获取移动点数上限
int movementPointsLimitCached(bool onLand, const TurnInfo * ti) const; // 缓存版本
```

### 移动计算
```cpp
int movementPointsAfterEmbark(int MPsBefore, int basicCost, bool disembark, const TurnInfo * ti) const;
std::unique_ptr<TurnInfo> getTurnInfo(int days) const;
```

## 法术系统

### 法术书管理
```cpp
bool hasSpellbook() const;                                       // 是否有法术书
void addSpellToSpellbook(const SpellID & spell);                // 添加法术到法术书
void removeSpellFromSpellbook(const SpellID & spell);           // 从法术书移除法术
bool spellbookContainsSpell(const SpellID & spell) const;        // 检查法术书是否包含法术
const std::set<SpellID> & getSpellsInSpellbook() const;          // 获取法术书中的所有法术

void removeSpellbook();                                         // 移除法术书
void removeAllSpells();                                         // 移除所有法术
```

### 法术学习和施放
```cpp
bool canLearnSpell(const spells::Spell * spell, bool allowBanned = false) const; // 是否可以学习法术
bool canCastThisSpell(const spells::Spell * spell) const;        // 是否可以施放法术

int32_t getSpellCost(const spells::Spell * sp) const;            // 获取法术消耗
```

## 军队和指挥官

### 军队管理
继承自 `CArmedInstance`，提供完整的军队管理功能

### 指挥官系统
```cpp
const CCommanderInstance * getCommander() const;                // 获取指挥官
CCommanderInstance * getCommander();                            // 获取可修改的指挥官
```

## 船只系统

### 船只操作
```cpp
bool inBoat() const;                                             // 是否在船上
CGBoat * getBoat();                                             // 获取船只
const CGBoat * getBoat() const;
void setBoat(CGBoat * boat);                                    // 设置船只
```

### 船只生成 (IBoatGenerator)
```cpp
BoatId getBoatType() const override;                            // 获取船只类型
void getOutOffsets(std::vector<int3> &offsets) const override;  // 获取上岸偏移
```

## 城镇访问

### 城镇交互
```cpp
bool isGarrisoned() const;                                       // 是否驻军
const CGTownInstance * getVisitedTown() const;                  // 获取访问的城镇
CGTownInstance * getVisitedTown();
void setVisitedTown(const CGTownInstance * town, bool garrisoned); // 设置访问城镇
```

## 战斗相关

### 战斗属性
```cpp
double getFightingStrength() const;                             // 获取战斗强度
double getMagicStrength() const;                                // 获取魔法强度
double getHeroStrength() const;                                 // 获取英雄总强度
ui64 getTotalStrength() const;                                  // 获取总强度
```

### 战斗事件
```cpp
CStackBasicDescriptor calculateNecromancy(const BattleResult &battleResult) const; // 计算死灵术
```

## 奖励和加成

### 法力管理
```cpp
si32 manaRegain() const;                                        // 法力恢复量
si32 getManaNewTurn() const;                                    // 新回合法力值
si32 manaLimit() const override;                                // 法力上限
```

### 其他加成
```cpp
int getCurrentLuck(int stack=-1, bool town=false) const;        // 获取当前幸运值
ResourceSet dailyIncome() const override;                       // 每日收入
std::vector<CreatureID> providedCreatures() const override;     // 提供的生物
```

## 特殊功能

### 挖掘状态
```cpp
EDiggingStatus diggingStatus() const;                           // 挖掘状态
```

### 幻象系统
```cpp
bool hasVisions(const CGObjectInstance * target, BonusSubtypeID masteryLevel) const; // 是否有幻象
```

### 任务关键性
```cpp
bool isMissionCritical() const;                                 // 是否任务关键
```

## 序列化

### 二进制序列化
```cpp
template <typename Handler> void serialize(Handler &h)
```
- **功能**: 处理英雄实例的二进制序列化

### JSON序列化
```cpp
void serializeJsonOptions(JsonSerializeFormat & handler) override;
void updateFrom(const JsonNode & data) override;
```

## 设计意图

CGHeroInstance的设计目标：

1. **综合英雄系统**: 整合所有英雄相关的游戏机制
2. **多重继承架构**: 通过多重继承实现不同的英雄功能模块
3. **状态管理**: 管理英雄的各种状态和属性
4. **平衡计算**: 提供战斗和魔法强度的计算
5. **持久化支持**: 完整的序列化支持
6. **扩展性**: 支持模组和自定义英雄类型

## 重要常量

```cpp
static constexpr si32 UNINITIALIZED_MANA = -1;         // 未初始化法力值
static constexpr ui32 UNINITIALIZED_MOVEMENT = -1;     // 未初始化移动点数
static constexpr auto UNINITIALIZED_EXPERIENCE = std::numeric_limits<TExpType>::max(); // 未初始化经验值
static const ui32 NO_PATROLLING;                       // 无巡逻状态
```

这个类是VCMI英雄系统的核心，定义了游戏中英雄的行为、属性和交互逻辑。

## 实现说明
- 多重继承：组合多种英雄功能接口
- 缓存系统：主要技能和法术学校的缓存优化
- 序列化支持：完整的保存和加载功能
- 状态验证：内置的状态一致性检查