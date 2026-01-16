# ArtifactUtils

## 概述

`ArtifactUtils` 命名空间提供了神器系统的核心工具函数。这些工具函数处理神器装备、位置验证、背包管理以及神器组合等功能，是神器系统的重要组成部分。

## 主要功能

ArtifactUtils 提供了以下核心功能：

1. **位置验证**: 检查神器槽位是否对特定载体有效
2. **位置查找**: 查找神器在装备或背包中的位置
3. **槽位管理**: 提供各种槽位集合的访问
4. **装备检查**: 验证神器是否可以移除或装备
5. **背包管理**: 检查背包容量和可用空间
6. **组合装配**: 处理神器组合的可能性
7. **描述处理**: 处理卷轴法术名称的插入

## 核心函数

### 位置验证

#### checkIfSlotValid
```cpp
bool checkIfSlotValid(const CArtifactSet & artSet, const ArtifactPosition & slot);
```
- **参数**:
  - `artSet`: 神器集合
  - `slot`: 要检查的槽位
- **返回值**: 槽位是否对该载体有效
- **逻辑**: 根据载体类型（HERO, CREATURE, COMMANDER, ALTAR）验证槽位有效性

### 位置查找

#### getArtAnyPosition
```cpp
ArtifactPosition getArtAnyPosition(const CArtifactSet * target, const ArtifactID & aid);
```
- **返回值**: 神器在装备或背包中的位置，优先返回装备位置
- **说明**: 查找神器的任何有效位置

#### getArtEquippedPosition
```cpp
ArtifactPosition getArtEquippedPosition(const CArtifactSet * target, const ArtifactID & aid);
```
- **返回值**: 神器在装备中的位置，如果不在装备中返回 PRE_FIRST
- **说明**: 查找神器在装备槽位中的位置

#### getArtBackpackPosition
```cpp
ArtifactPosition getArtBackpackPosition(const CArtifactSet * target, const ArtifactID & aid);
```
- **返回值**: 神器在背包中的位置，如果不在背包中返回 PRE_FIRST
- **说明**: 查找神器在背包中的位置

### 槽位集合

#### unmovableSlots
```cpp
const std::vector<ArtifactPosition> & unmovableSlots();
```
- **返回值**: 不可移动的槽位列表
- **包含**: SPELLBOOK, MACH4

#### commonWornSlots
```cpp
const std::vector<ArtifactPosition> & commonWornSlots();
```
- **返回值**: 普通装备槽位列表
- **包含**: HEAD, SHOULDERS, NECK, HANDS, RINGS, FEET, MISC1-5

#### allWornSlots
```cpp
const std::vector<ArtifactPosition> & allWornSlots();
```
- **返回值**: 所有装备槽位列表
- **包含**: 普通槽位 + MACH1-4 + SPELLBOOK

#### commanderSlots
```cpp
const std::vector<ArtifactPosition> & commanderSlots();
```
- **返回值**: 指挥官槽位列表
- **包含**: COMMANDER1-9

### 装备检查

#### isArtRemovable
```cpp
bool isArtRemovable(const std::pair<ArtifactPosition, ArtSlotInfo> & slot);
```
- **返回值**: 神器是否可以移除
- **条件**: 神器存在 + 未锁定 + 不在不可移动槽位中

#### checkSpellbookIsNeeded
```cpp
bool checkSpellbookIsNeeded(const CGHeroInstance * heroPtr, const ArtifactID & artID, const ArtifactPosition & slot);
```
- **返回值**: 是否需要创建法术书
- **特殊情况**: Titan's Thunder 装备时自动创建法术书

### 槽位类型检查

#### isSlotBackpack
```cpp
bool isSlotBackpack(const ArtifactPosition & slot);
```
- **返回值**: 槽位是否为背包槽位
- **判断**: slot >= BACKPACK_START

#### isSlotEquipment
```cpp
bool isSlotEquipment(const ArtifactPosition & slot);
```
- **返回值**: 槽位是否为装备槽位
- **判断**: 0 <= slot < BACKPACK_START

### 背包管理

#### isBackpackFreeSlots
```cpp
bool isBackpackFreeSlots(const CArtifactSet * target, const size_t reqSlots = 1);
```
- **参数**:
  - `target`: 目标神器集合
  - `reqSlots`: 需要空闲槽位数（默认1）
- **返回值**: 背包是否有足够空闲槽位
- **逻辑**: 检查英雄背包容量限制

### 组合装配

#### assemblyPossibilities
```cpp
std::vector<const CArtifact*> assemblyPossibilities(const CArtifactSet * artSet, const ArtifactID & aid, const bool onlyEquiped = false);
```
- **参数**:
  - `artSet`: 神器集合
  - `aid`: 基础神器ID
  - `onlyEquiped`: 是否只考虑已装备的神器
- **返回值**: 可以组装的组合神器列表
- **逻辑**: 检查是否有足够的部件来组装组合神器

### 描述处理

#### insertScrrollSpellName
```cpp
void insertScrrollSpellName(std::string & description, const SpellID & sid);
```
- **参数**:
  - `description`: 要修改的描述字符串
  - `sid`: 法术ID
- **功能**: 在卷轴描述中插入法术名称
- **处理**: 替换 [spell name] 占位符为实际法术名称

## 使用示例

### 检查槽位有效性
```cpp
// 检查英雄是否可以在指定槽位装备神器
if (ArtifactUtils::checkIfSlotValid(heroArtifacts, ArtifactPosition::RIGHT_HAND)) {
    // 可以装备到右手
    heroArtifacts.putArtifact(ArtifactPosition::RIGHT_HAND, artifact);
}
```

### 查找神器位置
```cpp
// 查找神器在英雄装备中的位置
auto position = ArtifactUtils::getArtAnyPosition(hero, ArtifactID::DRAGON_SCALE_SHIELD);
if (position != ArtifactPosition::PRE_FIRST) {
    // 神器已装备
    std::cout << "神器在位置: " << position << std::endl;
}
```

### 检查背包容量
```cpp
// 检查是否可以拾取多个神器
if (ArtifactUtils::isBackpackFreeSlots(hero, 3)) {
    // 背包有足够空间
    hero->pickUpArtifacts(artifacts);
}
```

### 处理组合神器
```cpp
// 查找可以组装的组合神器
auto possibilities = ArtifactUtils::assemblyPossibilities(hero, ArtifactID::HELM_OF_HEAVENLY_ENLIGHTENMENT);
for (const auto* combinedArt : possibilities) {
    std::cout << "可以组装: " << combinedArt->getNameTranslated() << std::endl;
}
```

## 设计意图

ArtifactUtils 的设计目的是为了：

1. **统一接口**: 提供标准的神器操作接口
2. **类型安全**: 使用强类型枚举和ID
3. **性能优化**: 预计算和缓存常用槽位集合
4. **灵活性**: 支持不同载体类型的特殊逻辑
5. **扩展性**: 便于添加新的神器类型和规则

这为神器系统提供了强大的工具支持，使神器管理更加可靠和高效。