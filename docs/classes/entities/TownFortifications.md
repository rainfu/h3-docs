# TownFortifications

## 概述

`TownFortifications` 结构体定义了城镇的防御工事配置，包括城墙、塔楼、护城河等防御设施的属性。这些配置决定了城镇在战斗中的防御能力和特殊效果。

## 结构体成员

### 防御单位配置

#### citadelShooter
```cpp
CreatureID citadelShooter;
```
- **类型**: `CreatureID`
- **描述**: 要塞射手单位ID
- **说明**: 定义在要塞位置射击的生物类型

#### upperTowerShooter
```cpp
CreatureID upperTowerShooter;
```
- **类型**: `CreatureID`
- **描述**: 上塔楼射手单位ID
- **说明**: 定义在上塔楼位置射击的生物类型

#### lowerTowerShooter
```cpp
CreatureID lowerTowerShooter;
```
- **类型**: `CreatureID`
- **描述**: 下塔楼射手单位ID
- **说明**: 定义在下塔楼位置射击的生物类型

#### moatSpell
```cpp
SpellID moatSpell;
```
- **类型**: `SpellID`
- **描述**: 护城河法术ID
- **说明**: 定义护城河触发的法术效果

### 生命值配置

#### wallsHealth
```cpp
int8_t wallsHealth = 0;
```
- **类型**: `int8_t`
- **默认值**: 0
- **描述**: 城墙生命值
- **范围**: 0-255

#### citadelHealth
```cpp
int8_t citadelHealth = 0;
```
- **类型**: `int8_t`
- **默认值**: 0
- **描述**: 要塞生命值
- **范围**: 0-255

#### upperTowerHealth
```cpp
int8_t upperTowerHealth = 0;
```
- **类型**: `int8_t`
- **默认值**: 0
- **描述**: 上塔楼生命值
- **范围**: 0-255

#### lowerTowerHealth
```cpp
int8_t lowerTowerHealth = 0;
```
- **类型**: `int8_t`
- **默认值**: 0
- **描述**: 下塔楼生命值
- **范围**: 0-255

### 特殊设施

#### hasMoat
```cpp
bool hasMoat = false;
```
- **类型**: `bool`
- **默认值**: false
- **描述**: 是否有护城河
- **说明**: 确定城镇是否拥有护城河防御

## 操作符重载

### operator +=
```cpp
const TownFortifications & operator +=(const TownFortifications & other);
```
- **参数**:
  - `other`: 要合并的防御工事配置
- **返回值**: 返回自身引用，支持链式操作
- **合并逻辑**:
  - **单位ID**: 如果other中有有效值，则覆盖当前值
  - **生命值**: 取两个配置中的最大值
  - **护城河**: 逻辑或操作，有一个为true则为true

## 使用示例

### 基本配置
```cpp
// 创建城镇防御工事配置
TownFortifications forts;
forts.citadelShooter = CreatureID::ARCHER;
forts.upperTowerShooter = CreatureID::MARKSMAN;
forts.lowerTowerShooter = CreatureID::MARKSMAN;
forts.moatSpell = SpellID::MAGIC_ARROW;

forts.wallsHealth = 10;
forts.citadelHealth = 5;
forts.upperTowerHealth = 3;
forts.lowerTowerHealth = 3;
forts.hasMoat = true;
```

### 配置合并
```cpp
// 合并多个防御工事配置
TownFortifications baseForts;
TownFortifications upgradeForts;

// 基础配置
baseForts.wallsHealth = 5;
baseForts.hasMoat = false;

// 升级配置
upgradeForts.wallsHealth = 10;
upgradeForts.citadelShooter = CreatureID::BALLISTA;
upgradeForts.hasMoat = true;

// 合并配置
baseForts += upgradeForts;
// 结果：wallsHealth = 10, hasMoat = true, citadelShooter 被设置
```

### 在城镇系统中的应用
```cpp
// 在城镇类中使用防御工事
class CTown {
    TownFortifications fortifications;

    void applyBuildingUpgrade(BuildingID building) {
        auto upgradeForts = getBuildingFortifications(building);
        fortifications += upgradeForts; // 合并升级效果
    }

    bool hasMoatProtection() const {
        return fortifications.hasMoat;
    }

    CreatureID getTowerShooter(bool upper) const {
        return upper ? fortifications.upperTowerShooter : fortifications.lowerTowerShooter;
    }
};
```

## 设计意图

TownFortifications 的设计目的是为了：

1. **模块化配置**: 将城镇防御属性独立管理
2. **升级支持**: 通过+=操作符支持防御工事升级
3. **灵活组合**: 允许不同建筑提供不同的防御加成
4. **类型安全**: 使用强类型ID避免配置错误
5. **内存效率**: 使用紧凑的数据类型（int8_t, bool）

这为城镇防御系统提供了灵活的配置机制，支持复杂的建筑升级和防御策略。