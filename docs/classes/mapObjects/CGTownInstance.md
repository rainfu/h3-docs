# CGTownInstance

## 概述

`CGTownInstance` 是VCMI中城镇实例的核心类，代表地图上实际存在的城镇。它继承自多个接口以支持城镇的各种功能，包括建筑系统、法术研究、生物生产、英雄驻扎、市场交易、船厂功能等完整的城镇管理功能。

## 继承层次

```cpp
CGTownInstance : public CGDwelling,                    // 居民地（生物生产）
                 public IShipyard,                     // 船厂
                 public IMarket,                       // 市场
                 public INativeTerrainProvider,        // 原生地形提供者
                 public ICreatureUpgrader              // 生物升级器
```

## 核心属性

### 基本信息
```cpp
std::string nameTextId;              // 城镇名称文本ID
std::string customName;              // 自定义名称
ui32 identifier;                     // H3M特殊标识符
PlayerColor alignmentToPlayer;       // 对齐玩家（随机城镇）
```

### 建筑系统
```cpp
std::set<BuildingID> builtBuildings; // 已建造建筑集合
std::set<BuildingID> forbiddenBuildings; // 禁止建造建筑
std::map<BuildingID, std::unique_ptr<TownRewardableBuildingInstance>> rewardableBuildings; // 可奖励建筑
```

### 英雄管理
```cpp
ObjectInstanceID garrisonHero;       // 驻守英雄ID
ObjectInstanceID visitingHero;       // 访问英雄ID
```

### 法术系统
```cpp
std::vector<SpellID> possibleSpells; // 可选法术
std::vector<SpellID> obligatorySpells; // 必选法术
std::vector<std::vector<SpellID>> spells; // 法术公会法术[level][spell]
```

### 事件和奖励
```cpp
std::vector<CCastleEvent> events;    // 城镇事件
std::pair<si32, si32> bonusValue;    // 城镇奖励值
```

### 法术研究
```cpp
int spellResearchCounterDay;         // 法术研究每日计数器
int spellResearchAcceptedCounter;    // 已接受研究计数器
bool spellResearchAllowed;           // 是否允许法术研究
```

### 统计信息
```cpp
si32 built;                         // 本回合建造建筑数
si32 destroyed;                     // 本回合摧毁建筑数
CBonusSystemNode townAndVis;        // 城镇和访问者奖励系统
```

## 构造函数和初始化

### CGTownInstance
```cpp
CGTownInstance(IGameInfoCallback *cb);
```
- **参数**: `cb` - 游戏信息回调接口
- **功能**: 创建城镇实例

### 初始化方法
```cpp
void initObj(IGameRandomizer & gameRandomizer) override;
void pickRandomObject(IGameRandomizer & gameRandomizer) override;
void postDeserialize();
void recreateBuildingsBonuses();
```
- **功能**: 初始化城镇对象、随机化属性、重建建筑奖励

## 名称和标识

### 名称管理
```cpp
std::string getNameTranslated() const;           // 获取本地化名称
std::string getNameTextID() const;               // 获取名称文本ID
void setNameTextId(const std::string & newName); // 设置名称文本ID
void setCustomName(const std::string & newName); // 设置自定义名称
```

### 标识符
```cpp
ui32 getObjInstanceID() const override;          // 获取对象实例ID
```

## 建筑系统

### 建筑状态检查
```cpp
bool hasBuilt(const BuildingID & buildingID) const;              // 检查建筑是否建造
bool hasBuilt(BuildingSubID::EBuildingSubID buildingID) const;   // 检查特殊建筑
bool hasFort() const;                                            // 是否有堡垒
bool hasCapitol() const;                                         // 是否有都城
bool hasBuiltResourceMarketplace() const;                       // 是否有资源市场
```

### 建筑管理
```cpp
void addBuilding(const BuildingID & buildingID);                // 添加建筑
void removeBuilding(const BuildingID & buildingID);             // 移除建筑
void removeAllBuildings();                                      // 移除所有建筑
std::set<BuildingID> getBuildings() const;                      // 获取所有建筑
```

### 建筑等级
```cpp
EFortLevel fortLevel() const;                                   // 获取城防等级
TownFortifications fortificationsLevel() const;                 // 获取防御工事等级
int hallLevel() const;                                          // 获取大厅等级 (-1无, 0村庄, 1城镇, 2城市, 3都城)
int mageGuildLevel() const;                                     // 获取法师公会等级
int getHordeLevel(const int & HID) const;                       // 获取兽穴等级
```

### 建筑要求
```cpp
LogicalExpression<BuildingID> genBuildingRequirements(const BuildingID & build, bool deep = false) const;
```
- **功能**: 生成建筑建造要求表达式

### 建筑成本
```cpp
ResourceSet getBuildingCost(const BuildingID & buildingID) const;
```
- **功能**: 获取建筑建造成本

## 生物生产系统 (CGDwelling)

### 生物生长
```cpp
int creatureGrowth(const int & level) const;                    // 获取生物生长数量
GrowthInfo getGrowthInfo(int level) const;                      // 获取生长信息详情
```

### 提供的生物
```cpp
std::vector<CreatureID> providedCreatures() const override;     // 获取提供的生物类型
```

### 生物升级
```cpp
void fillUpgradeInfo(UpgradeInfo & info, const CStackInstance &stack) const override;
```
- **功能**: 填充生物升级信息

## 法术系统

### 法术公会
```cpp
int spellsAtLevel(int level, bool checkGuild) const;            // 获取指定等级法术数量
```

### 法术研究
```cpp
// 法术研究相关属性已在上面列出
```

## 英雄交互

### 英雄设置
```cpp
void setVisitingHero(CGHeroInstance *h);                        // 设置访问英雄
void setGarrisonedHero(CGHeroInstance *h);                      // 设置驻守英雄
```

### 英雄获取
```cpp
const CGHeroInstance * getVisitingHero() const;                 // 获取访问英雄
const CGHeroInstance * getGarrisonHero() const;                 // 获取驻守英雄
const CArmedInstance * getUpperArmy() const;                    // 获取上级军队（驻守英雄或城镇本身）
```

### 英雄访问事件
```cpp
void onHeroVisit(IGameEventCallback & gameEvents, const CGHeroInstance * h) const override;
void onHeroLeave(IGameEventCallback & gameEvents, const CGHeroInstance * h) const override;
```

## 市场系统 (IMarket)

### 市场效率
```cpp
int getMarketEfficiency() const override;                       // 获取市场效率
```

### 可用交易模式
```cpp
std::set<EMarketMode> availableModes() const override;          // 获取可用交易模式
```

### 可用物品
```cpp
std::vector<TradeItemBuy> availableItemsIds(EMarketMode mode) const override;
```
- **功能**: 获取指定模式下的可用物品

## 船厂系统 (IShipyard)

### 船只类型
```cpp
BoatId getBoatType() const override;                            // 获取船只类型
```

### 船厂状态
```cpp
EGeneratorState shipyardStatus() const override;                // 获取船厂状态
```

### 船只位置偏移
```cpp
void getOutOffsets(std::vector<int3> &offsets) const override;  // 获取船只放置偏移
```

## 经济系统

### 每日收入
```cpp
ResourceSet dailyIncome() const override;                       // 获取每日收入
```

### 城镇等级
```cpp
int getTownLevel() const;                                       // 获取城镇等级
```

## 战斗相关

### 防御系统
```cpp
DamageRange getTowerDamageRange() const;                        // 获取塔楼伤害范围
DamageRange getKeepDamageRange() const;                        // 获取主塔伤害范围
```

### 战斗事件
```cpp
void battleFinished(IGameEventCallback & gameEvents, const CGHeroInstance * hero, const BattleResult & result) const override;
```

### 攻城战逻辑
```cpp
void mergeGarrisonOnSiege(IGameEventCallback & gameEvents) const; // 攻城时合并驻军
bool isBattleOutsideTown(const CGHeroInstance * defendingHero) const; // 检查是否为城外战斗
```

## 地形和派系

### 原生地形 (INativeTerrainProvider)
```cpp
TerrainId getNativeTerrain() const override;                    // 获取原生地形
FactionID getFactionID() const override;                        // 获取派系ID
```

### 城镇和派系信息
```cpp
const CTown * getTown() const;                                  // 获取城镇定义
const CFaction * getFaction() const;                            // 获取派系定义
```

## 战争机器

### 战争机器生产
```cpp
ArtifactID getWarMachineInBuilding(BuildingID) const;           // 获取建筑生产的战争机器
bool isWarMachineAvailable(ArtifactID) const;                   // 检查战争机器是否可用
```

## 事件处理

### 回合事件
```cpp
void newTurn(IGameEventCallback & gameEvents, IGameRandomizer & gameRandomizer) const override;
```

### 地图事件
```cpp
void afterAddToMap(CMap * map) override;                        // 添加到地图后
void afterRemoveFromMap(CMap * map) override;                  // 从地图移除后
```

## 奖励建筑系统

奖励建筑是特殊的可重复访问建筑，提供各种奖励和功能：

```cpp
std::map<BuildingID, std::unique_ptr<TownRewardableBuildingInstance>> rewardableBuildings;
```

## 序列化

### 二进制序列化
```cpp
template <typename Handler> void serialize(Handler &h)
```
- **功能**: 处理城镇实例的二进制序列化

### JSON序列化
```cpp
void serializeJsonOptions(JsonSerializeFormat & handler) override;
```

## 设计意图

CGTownInstance的设计目标：

1. **完整的城镇模拟**: 实现所有经典游戏中的城镇功能
2. **模块化架构**: 通过多重继承实现不同功能模块
3. **建筑依赖系统**: 复杂的建筑前置条件和升级路径
4. **动态事件系统**: 支持城镇事件的触发和效果
5. **经济中心**: 作为玩家经济活动的核心
6. **战略据点**: 提供防御、生物生产和英雄发展功能
7. **扩展性**: 支持模组自定义建筑和功能

## 重要枚举

### EFortLevel
```cpp
enum EFortLevel {NONE = 0, FORT = 1, CITADEL = 2, CASTLE = 3};
```
- **NONE**: 无城防
- **FORT**: 堡垒
- **CITADEL**: 城堡
- **CASTLE**: 城堡（高级）

这个类是VCMI城镇系统的核心，定义了游戏中城镇的行为、属性和交互逻辑。