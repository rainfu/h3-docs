# CStackInstance

栈实例类，表示游戏中的生物单位栈。

## 📋 类概述

`CStackInstance` 是 VCMI 中生物单位栈的核心实现类，代表了游戏中一个具体的生物单位集合。该类继承自多个接口，提供了完整的单位栈功能，包括属性管理、奖励系统、神器装备、经验值等。

## 🔧 主要属性

### 基本信息
- `armyInstance`: 所属军队实例指针
- `totalExperience`: 总经验值
- `nativeTerrain`: 本土地形缓存
- `initiative`: 先攻权缓存

### 随机生成信息
- `randomStack`: 随机栈信息（等级、升级状态）

## 🎯 核心方法

### 构造函数
```cpp
// 基础构造函数
CStackInstance(IGameInfoCallback * cb);

// 指定节点类型的构造函数
CStackInstance(IGameInfoCallback * cb, BonusNodeType nodeType, bool isHypothetic = false);

// 指定生物类型的构造函数
CStackInstance(IGameInfoCallback * cb, const CreatureID & id, TQuantity count, bool isHypothetic = false);
```

### 军队管理
```cpp
// 获取所属军队
CArmedInstance * getArmy();
const CArmedInstance * getArmy() const;

// 设置所属军队
void setArmy(CArmedInstance * ArmyObj);
```

### 经验值管理
```cpp
// 获取经验值
TExpType getTotalExperience() const;
TExpType getAverageExperience() const;

// 给予经验值
void giveAverageStackExperience(TExpType exp);
void giveTotalStackExperience(TExpType exp);

// 检查是否可以获得经验
virtual bool canGainExperience() const;
```

### 生物属性
```cpp
// 获取力量值
virtual ui64 getPower() const;

// 获取市场价值
virtual ui64 getMarketValue() const;

// 获取等级和经验等级
virtual int getLevel() const;
virtual int getExpRank() const;

// 获取生物ID
CreatureID getCreatureID() const;

// 获取名称
std::string getName() const;
```

### 单位设置
```cpp
// 设置生物类型
void setType(const CreatureID & creID);
void setType(const CCreature * c) final;

// 设置数量
void setCount(TQuantity amount) final;
```

### 战斗属性
```cpp
// 获取先攻权
int32_t getInitiative(int turn = 0) const final;

// 获取本土地形
TerrainId getNativeTerrain() const final;

// 获取当前地形
TerrainId getCurrentTerrain() const;
```

### 神器管理
```cpp
// 装备神器
ArtPlacementMap putArtifact(const ArtifactPosition & pos, const CArtifactInstance * art) override;

// 移除神器
void removeArtifact(const ArtifactPosition & pos) override;

// 获取承载者类型
ArtBearer bearerType() const override;
```

### 奖励系统
```cpp
// 获取奖励承载者
const IBonusBearer * getBonusBearer() const override;

// 奖励描述
std::string bonusToString(const std::shared_ptr<Bonus> & bonus) const override;

// 奖励图形
ImagePath bonusToGraphics(const std::shared_ptr<Bonus> & bonus) const;
```

### 验证和序列化
```cpp
// 验证有效性
bool valid(bool allowUnrandomized) const;

// JSON序列化
void serializeJson(JsonSerializeFormat & handler);
```

## 🔗 依赖关系

### 依赖的类
- `CBonusSystemNode`: 奖励系统节点
- `CStackBasicDescriptor`: 栈基本描述符
- `CArtifactSet`: 神器集合
- `ACreature`: 生物抽象类
- `GameCallbackHolder`: 游戏回调持有者
- `CCreatureHandler`: 生物处理器
- `BonusCache`: 奖励缓存

### 被依赖关系
- 被 `CArmedInstance` 用于管理军队单位
- 被 `BattleInfo` 用于战斗单位管理
- 被 `CGHeroInstance` 用于英雄军队管理
- 被奖励系统用于属性计算

## 📝 使用示例

### 创建单位栈
```cpp
// 创建一个假设的单位栈（用于计算）
CStackInstance hypotheticalStack(cb, BonusNodeType::STACK_BATTLE, true);

// 创建指定生物类型的单位栈
CStackInstance stack(cb, CreatureID::PIKEMAN, 10);

// 设置到军队中
stack.setArmy(heroArmy);
```

### 经验值管理
```cpp
// 给予平均经验值
stack.giveAverageStackExperience(500);

// 给予总经验值
stack.giveTotalStackExperience(5000);

// 查询经验信息
auto totalExp = stack.getTotalExperience();
auto avgExp = stack.getAverageExperience();
auto level = stack.getLevel();
```

### 神器装备
```cpp
// 装备神器到指定位置
auto placement = stack.putArtifact(ArtifactPosition::HEAD, swordArtifact);
if (!placement.empty()) {
    // 神器装备成功
    log.info() << "神器已装备";
}

// 移除神器
stack.removeArtifact(ArtifactPosition::HEAD);
```

### 属性查询
```cpp
// 获取战斗相关属性
auto initiative = stack.getInitiative();
auto nativeTerrain = stack.getNativeTerrain();
auto power = stack.getPower();

// 获取市场信息
auto marketValue = stack.getMarketValue();
auto quantityText = stack.getQuantityTXT();
```

### 奖励系统集成
```cpp
// 获取奖励承载者
const auto * bearer = stack.getBonusBearer();

// 查询特定奖励
auto attackBonus = bearer->getBonusValue(BonusType::PRIMARY_SKILL, BonusSubtypeID(PrimarySkill::ATTACK));

// 奖励描述
for (const auto & bonus : bearer->getAllBonuses()) {
    auto description = stack.bonusToString(bonus);
    auto graphics = stack.bonusToGraphics(bonus);
    // 显示奖励信息
}
```

## ⚡ 性能特性

- **缓存机制**: 先攻权和本土地形使用缓存提高性能
- **延迟初始化**: 复杂属性按需计算
- **共享数据**: 生物类型数据在多个实例间共享
- **序列化优化**: 支持增量序列化和版本兼容

## 🔍 注意事项

1. **军队关联**: 单位栈必须属于某个军队实例
2. **经验计算**: 经验值会根据单位数量进行缩放
3. **神器限制**: 神器装备位置受生物类型限制
4. **验证重要**: 使用前应调用 `valid()` 验证状态

## 📊 相关结构

### RandomStackInfo 结构体
```cpp
struct RandomStackInfo {
    uint8_t level;    // 等级
    uint8_t upgrade;  // 升级状态
};
```

### 继承层次
```
CStackInstance
├── CBonusSystemNode (奖励系统)
├── CStackBasicDescriptor (基本描述)
├── CArtifactSet (神器集合)
├── ACreature (生物抽象)
└── GameCallbackHolder (回调持有者)
```

## 🔧 扩展点

- **自定义生物**: 通过继承扩展特定生物的行为
- **特殊效果**: 重写奖励相关方法实现特殊效果
- **AI集成**: 提供AI决策所需的信息接口