<!-- 来源: E:\develop\heroes\vcmi\lib\CCreatureHandler.h -->
# CCreatureHandler头文件

CCreatureHandler头文件定义了VCMI中生物管理的相关类，包括生物类和生物处理器类。

## CCreature类

### 类定义
```cpp
class DLL_LINKAGE CCreature : public Creature, public CBonusSystemNode
```

### 主要属性

#### 基本信息
- `CreatureID idNumber`: 生物ID编号
- `FactionID faction`: 阵营ID
- `ui8 level`: 生物等级 (0-7)
- `bool doubleWide`: 是否双宽单位
- `bool special`: 是否特殊生物
- `bool excludeFromRandomization`: 是否排除随机化

#### 战斗属性
- `ui32 fightValue`: 战斗价值
- `ui32 AIValue`: AI价值
- `ui32 growth`: 增长率
- `ui32 hordeGrowth`: 部落增长率

#### 资源和升级
- `TResources cost`: 招募成本
- `std::set<CreatureID> upgrades`: 可升级到的生物ID

#### 冒险地图属性
- `ui32 ammMin`: 最小冒险地图数量
- `ui32 ammMax`: 最大冒险地图数量

#### 图形和声音
- `AnimationPath animDefName`: 战斗动画定义
- `ImagePath mapAttackFromLeft`: 冒险地图左攻击图像
- `ImagePath mapAttackFromRight`: 冒险地图右攻击图像
- `CreatureBattleSounds sounds`: 战斗音效

### 嵌套结构体

#### CreatureAnimation
```cpp
struct CreatureAnimation
```
包含动画时间、导弹偏移、射线颜色等信息。

#### CreatureBattleSounds
```cpp
struct CreatureBattleSounds
```
包含攻击、防御、死亡、移动等音效路径。

### 主要方法

#### 名称和描述
- `std::string getNameTranslated() const override`: 获取翻译后的名称
- `std::string getDescriptionTranslated() const`: 获取翻译后的描述

#### 基本属性查询
- `FactionID getFactionID() const override`: 获取阵营ID
- `int32_t getIndex() const override`: 获取索引
- `int32_t getLevel() const override`: 获取等级
- `bool isDoubleWide() const override`: 是否双宽

#### 战斗属性查询
- `int32_t getBaseAttack() const override`: 获取基础攻击
- `int32_t getBaseDefense() const override`: 获取基础防御
- `int32_t getBaseDamageMin() const override`: 获取最小伤害
- `int32_t getBaseDamageMax() const override`: 获取最大伤害

#### 招募相关
- `int32_t getRecruitCost(GameResID resIndex) const override`: 获取特定资源的招募成本
- `const TResources & getFullRecruitCost() const override`: 获取完整招募成本
- `si32 maxAmount(const TResources &res) const`: 计算可购买的最大数量

#### 升级相关
- `bool hasUpgrades() const override`: 是否有升级
- `bool isMyDirectUpgrade(const CCreature * target) const`: 是否可直接升级到目标
- `bool isMyDirectOrIndirectUpgrade(const CCreature *target) const`: 是否可直接或间接升级到目标

#### 其他方法
- `void addBonus(int val, BonusType type)`: 添加奖励
- `int getRandomAmount(vstd::RNG & ranGen) const`: 获取随机数量

## CCreatureHandler类

### 类定义
```cpp
class DLL_LINKAGE CCreatureHandler : public CHandlerBase<CreatureID, Creature, CCreature, CreatureService>
```

### 构造函数和析构函数
- `CCreatureHandler()`: 构造函数
- `~CCreatureHandler()`: 析构函数

### 主要方法

#### 数据加载
- `std::vector<JsonNode> loadLegacyData() override`: 加载遗留数据
- `std::shared_ptr<CCreature> loadFromJson(const std::string & scope, const JsonNode & node, const std::string & identifier, size_t index) override`: 从JSON加载生物

#### 经验系统
- `void loadCrExpBon(CBonusSystemNode & globalEffects)`: 加载堆栈经验奖励
- `void loadCrExpMod()`: 加载堆栈经验修正

#### 其他
- `void afterLoadFinalization() override`: 加载完成后的最终化处理
- `std::set<CreatureID> getDefaultAllowed() const`: 获取默认允许的生物

### 公共成员

#### 双倍生物
- `std::set<CreatureID> doubledCreatures`: 双倍周生物

#### 经验系统
- `std::vector<std::vector<ui32>> expRanks`: 堆栈经验等级要求
- `std::vector<ui32> maxExpPerBattle`: 每场战斗最大经验百分比
- `si8 expAfterUpgrade`: 升级后经验倍数

#### 指挥官系统
- `BonusList commanderLevelPremy`: 指挥官等级奖励
- `std::vector<std::vector<ui8>> skillLevels`: 技能等级
- `std::vector<std::pair<std::vector<std::shared_ptr<Bonus>>, std::pair<ui8, ui8>>> skillRequirements`: 技能需求

## 相关类型

- `CreatureID`: 生物ID类型
- `FactionID`: 阵营ID类型
- `AnimationPath`: 动画路径类型
- `ImagePath`: 图像路径类型
- `AudioPath`: 音频路径类型