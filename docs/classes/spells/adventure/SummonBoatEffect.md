<!-- 来源: E:\develop\heroes\vcmi\lib\spells\adventure\SummonBoatEffect.h -->
# SummonBoatEffect类

SummonBoatEffect类实现了冒险地图中召唤船只法术的效果，如"Summon Boat"法术。

## 类定义

```cpp
class DLL_LINKAGE SummonBoatEffect final : public IAdventureSpellEffect
```

## 概述

SummonBoatEffect直接继承自IAdventureSpellEffect，专门用于实现能够在水域中召唤船只的冒险法术效果。

## 成员变量

### 所有者信息
```cpp
const CSpell * owner;
```
指向拥有此效果的法术对象。

### 船只配置
```cpp
BoatId createdBoat = BoatId::NONE;
```
指定要召唤的船只类型ID。

```cpp
bool useExistingBoat;
```
是否优先使用已存在的船只，而不是创建新的船只。

## 构造函数

```cpp
SummonBoatEffect(const CSpell * s, const JsonNode & config);
```

**参数:**
- `s`: 拥有此效果的法术
- `config`: JSON配置文件

## 主要方法

### canCreateNewBoat()
检查是否可以创建新船只：

```cpp
bool canCreateNewBoat() const;
```

**返回值:** 如果可以创建新船只则返回true

### getSuccessChance()
获取法术施放的成功几率：

```cpp
int getSuccessChance(const spells::Caster * caster) const;
```

**参数:**
- `caster`: 法术施法者

**返回值:** 成功几率百分比(0-100)

### canBeCastImpl()
检查是否可以施放法术：

```cpp
bool canBeCastImpl(
    spells::Problem & problem,
    const IGameInfoCallback * cb,
    const spells::Caster * caster) const final;
```

**检查条件:**
- 施法者必须在水域附近
- 目标位置必须是有效的水域
- 施法者必须有足够的法力

### applyAdventureEffects()
应用冒险地图效果，召唤船只：

```cpp
ESpellCastResult applyAdventureEffects(
    SpellCastEnvironment * env,
    const AdventureSpellCastParameters & parameters) const final;
```

**执行步骤:**
1. 检查施放成功几率
2. 确定召唤位置
3. 创建或重用船只
4. 将船只放置在地图上
5. 返回施放结果

## 配置方式

通过JSON配置定义船只召唤行为：

```json
{
    "createdBoat": "boatId",
    "useExistingBoat": false
}
```

## 继承关系

```
SummonBoatEffect
    └── IAdventureSpellEffect
```

## 相关法术

通常用于实现Heroes III的**Summon Boat**法术，允许英雄在水域中召唤船只用于水上旅行。

## 成功几率机制

法术的成功几率可能受到以下因素影响：
- 施法者的法术技能等级
- 英雄的智力属性
- 法术的魔法抗性
- 游戏难度设置

## 使用场景

SummonBoatEffect用于：
- 在湖泊或海洋中召唤船只
- 帮助陆地英雄进行水上旅行
- 开启水路探索的可能性

## 注意事项

- 只在水域地形上生效
- 可能有成功几率限制
- 船只数量可能受到游戏限制
- 优先使用现有船只可以节省资源