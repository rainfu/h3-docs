<!-- 来源: E:\develop\heroes\vcmi\lib\spells\adventure\RemoveObjectEffect.h -->
# RemoveObjectEffect类

RemoveObjectEffect类实现了冒险地图中移除障碍物法术的效果，如"Remove Obstacle"法术。

## 类定义

```cpp
class RemoveObjectEffect final : public AdventureSpellRangedEffect
```

## 概述

RemoveObjectEffect继承自AdventureSpellRangedEffect，专门用于实现能够移除地图上障碍物或特定对象的冒险法术效果。

## 成员变量

### 所有者信息
```cpp
const CSpell * owner;
```
指向拥有此效果的法术对象。

### 移除对象列表
```cpp
std::vector<MapObjectID> removedObjects;
```
记录可以被此法术移除的地图对象ID列表。

### 消息和界面
```cpp
MetaString failMessage;
```
当法术施放失败时显示的消息。

```cpp
std::string cursor;
```
鼠标悬停在目标上时显示的光标样式。

## 构造函数

```cpp
RemoveObjectEffect(const CSpell * s, const JsonNode & config);
```

**参数:**
- `s`: 拥有此效果的法术
- `config`: JSON配置文件

## 主要方法

### canBeCastAtImpl()
检查是否可以在指定位置施放法术：

```cpp
bool canBeCastAtImpl(
    spells::Problem & problem,
    const IGameInfoCallback * cb,
    const spells::Caster * caster,
    const int3 & pos) const final;
```

**检查条件:**
- 位置必须在施法范围内
- 目标位置必须有可移除的对象
- 对象ID必须在`removedObjects`列表中

### applyAdventureEffects()
应用冒险地图效果，移除指定位置的对象：

```cpp
ESpellCastResult applyAdventureEffects(
    SpellCastEnvironment * env,
    const AdventureSpellCastParameters & parameters) const final;
```

**执行步骤:**
1. 获取目标位置
2. 查找该位置的可移除对象
3. 从地图上移除对象
4. 返回施放结果

### getCursorForTarget()
获取鼠标悬停在目标上时显示的光标：

```cpp
std::string getCursorForTarget(
    const IGameInfoCallback * cb,
    const spells::Caster * caster,
    const int3 & pos) const final;
```

## 配置方式

通过JSON配置定义可移除的对象类型：

```json
{
    "removedObjects": [
        "objectId1",
        "objectId2"
    ],
    "failMessage": "无法移除此对象",
    "cursor": "combat/cursors/removeObstacle.def"
}
```

## 继承关系

```
RemoveObjectEffect
    └── AdventureSpellRangedEffect
        └── IAdventureSpellEffect
```

## 相关法术

通常用于实现以下Heroes III法术：
- **Remove Obstacle**: 移除地图上的障碍物
- 其他移除类法术

## 使用场景

RemoveObjectEffect用于：
- 清理地图障碍物
- 开启被阻挡的道路
- 移除特定的地图装饰物

## 注意事项

- 只在冒险地图模式下生效
- 需要在`removedObjects`列表中定义可移除的对象类型
- 移除操作不可逆转