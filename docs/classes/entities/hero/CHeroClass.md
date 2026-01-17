# CHeroClass

## 概述

`CHeroClass` 类定义了英雄职业的属性和行为，包括职业倾向、技能成长、指挥官配置等。每个英雄职业都属于特定的派系，并具有独特的成长特性和视觉表现。

## 继承关系

```cpp
HeroClass
└── CHeroClass
```

## 枚举定义

### EClassAffinity
```cpp
enum EClassAffinity
{
    MIGHT,  // 力量型
    MAGIC   // 魔法型
};
```
- **MIGHT**: 力量型职业，更容易获得攻击、防御等战斗技能
- **MAGIC**: 魔法型职业，更容易获得法术和知识技能

## 主要属性

### 基本信息
```cpp
HeroClassID id;           // 职业唯一标识
std::string modScope;     // 模组范围
std::string identifier;   // 字符串标识符
FactionID faction;        // 所属派系
ui8 affinity;             // 职业倾向 (MIGHT/MAGIC)
```

### 酒馆概率
```cpp
ui32 defaultTavernChance; // 默认酒馆出现概率
```
- **计算公式**: 最终概率 = sqrt(城镇概率 × 职业概率)
- **用途**: 控制英雄在酒馆中出现的频率

### 指挥官配置
```cpp
CreatureID commander;     // 默认指挥官生物ID
```
- **说明**: 该职业英雄默认携带的指挥官单位

### 初始技能
```cpp
std::vector<int> primarySkillInitial; // 初始主属性技能
```
- **内容**: [攻击, 防御, 法术, 知识] 的初始值
- **说明**: 英雄创建时的初始属性分配

### 技能成长概率
```cpp
std::vector<int> primarySkillLowLevel;  // 低等级成长概率 (1-10级)
std::vector<int> primarySkillHighLevel; // 高等级成长概率 (10+级)
```
- **格式**: [攻击%, 防御%, 法术%, 知识%] 
- **说明**: 升级时获得对应主属性点的概率

### 次要技能概率
```cpp
std::map<SecondarySkill, int> secSkillProbability;
```
- **键**: 次要技能ID
- **值**: 获得概率 (0-112)
- **说明**: 英雄升级时获得各次要技能的概率

### 城镇选择概率
```cpp
std::map<FactionID, int> selectionProbability;
```
- **键**: 派系ID
- **值**: 在该派系城镇中被选择的概率
- **说明**: 控制英雄在不同派系城镇中的出现频率

### 视觉资源
```cpp
AnimationPath imageBattleMale;   // 男性战斗头像
AnimationPath imageBattleFemale; // 女性战斗头像
std::string imageMapMale;        // 男性地图头像
std::string imageMapFemale;      // 女性地图头像
```

## 核心方法

### 基本信息获取
```cpp
int32_t getIndex() const override;           // 获取索引
int32_t getIconIndex() const override;       // 获取图标索引
std::string getJsonKey() const override;     // 获取JSON键
std::string getModScope() const override;    // 获取模组范围
HeroClassID getId() const override;          // 获取职业ID
```

### 本地化支持
```cpp
std::string getNameTranslated() const override; // 获取翻译名称
std::string getNameTextID() const override;     // 获取文本ID
```

### 职业判断
```cpp
bool isMagicHero() const; // 是否为魔法型英雄
```
- **返回值**: true 如果 affinity 为 MAGIC
- **说明**: 快速判断英雄的魔法倾向

### 阵营判断
```cpp
EAlignment getAlignment() const; // 获取阵营
```
- **返回值**: 基于派系的阵营信息
- **说明**: 确定英雄的善恶阵营倾向

### 概率计算
```cpp
int tavernProbability(FactionID faction) const; // 计算酒馆概率
```
- **参数**: 目标派系
- **返回值**: 在指定派系酒馆中的出现概率
- **计算**: 结合 defaultTavernChance 和 selectionProbability

### 数据操作
```cpp
void updateFrom(const JsonNode & data);           // 从JSON更新
void registerIcons(const IconRegistar & cb) const; // 注册图标
void serializeJson(JsonSerializeFormat & handler); // JSON序列化
```

## 使用示例

### 创建英雄职业
```cpp
// 创建骑士职业
CHeroClass knightClass;
knightClass.id = HeroClassID::KNIGHT;
knightClass.faction = FactionID::CASTLE;
knightClass.affinity = CHeroClass::MIGHT;
knightClass.commander = CreatureID::CAVALIER;

// 设置初始技能
knightClass.primarySkillInitial = {2, 2, 1, 1}; // 攻防较高，法知较低

// 设置成长概率
knightClass.primarySkillLowLevel = {40, 40, 10, 10}; // 偏重战斗技能
```

### 检查职业属性
```cpp
// 判断职业类型
if (heroClass.isMagicHero()) {
    // 这是魔法型职业
    std::cout << "魔法英雄擅长法术";
} else {
    // 这是力量型职业
    std::cout << "力量英雄擅长战斗";
}

// 获取职业阵营
auto alignment = heroClass.getAlignment();
switch (alignment) {
    case EAlignment::GOOD: std::cout << "善良阵营"; break;
    case EAlignment::EVIL: std::cout << "邪恶阵营"; break;
    case EAlignment::NEUTRAL: std::cout << "中立阵营"; break;
}
```

### 计算出现概率
```cpp
// 计算在城堡派系的酒馆概率
int castleTavernProb = knightClass.tavernProbability(FactionID::CASTLE);

// 检查在特定城镇的选择概率
auto it = knightClass.selectionProbability.find(FactionID::CASTLE);
if (it != knightClass.selectionProbability.end()) {
    std::cout << "在城堡中的选择概率: " << it->second;
}
```

### JSON配置示例
```json
{
  "name": "Knight",
  "faction": "castle",
  "affinity": "might",
  "commander": "cavalier",
  "primarySkillInitial": [2, 2, 1, 1],
  "primarySkillLowLevel": [40, 40, 10, 10],
  "primarySkillHighLevel": [30, 30, 20, 20],
  "tavern": 90,
  "selectionProbability": {
    "castle": 100,
    "rampart": 50
  }
}
```

## 设计意图

CHeroClass 的设计目的是为了：

1. **职业平衡**: 通过技能成长概率控制不同职业的强度平衡
2. **派系关联**: 将英雄职业与特定派系绑定
3. **视觉定制**: 支持性别特定的视觉资源
4. **概率控制**: 灵活的出现概率系统支持游戏平衡
5. **模组扩展**: 允许模组添加自定义英雄职业
6. **本地化支持**: 完整的多语言名称和描述支持

这为VCMI提供了丰富而平衡的英雄职业系统，支持复杂的角色扮演和策略选择。