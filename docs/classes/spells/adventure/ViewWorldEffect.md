<!-- 来源: E:\develop\heroes\vcmi\lib\spells\adventure\ViewWorldEffect.h -->
# ViewWorldEffect类

ViewWorldEffect类实现了冒险地图中"View World"系列法术的效果，如"View Earth"、"View Air"等侦察法术。

## 类定义

```cpp
class ViewWorldEffect final : public IAdventureSpellEffect
```

## 概述

ViewWorldEffect直接继承自IAdventureSpellEffect，专门用于实现能够显示地图信息或揭示隐藏内容的侦察类冒险法术效果。

## 成员变量

### 对象过滤
```cpp
std::vector<MapObjectID> filteredObjects;
```
指定要显示或过滤的地图对象ID列表。只有在此列表中的对象才会被法术效果影响。

### 地形显示
```cpp
bool showTerrain = false;
```
是否显示地形信息。如果为true，法术会揭示目标区域的地形；如果为false，只显示对象。

## 构造函数

```cpp
ViewWorldEffect(const CSpell * s, const JsonNode & config);
```

**参数:**
- `s`: 拥有此效果的法术
- `config`: JSON配置文件

## 主要方法

### applyAdventureEffects()
应用冒险地图效果，显示地图信息：

```cpp
ESpellCastResult applyAdventureEffects(
    SpellCastEnvironment * env,
    const AdventureSpellCastParameters & parameters) const override;
```

**执行步骤:**
1. 获取施法者位置
2. 计算侦察范围
3. 根据配置显示地形或对象
4. 过滤指定类型的对象
5. 更新玩家的地图视野
6. 返回施放结果

## 配置方式

通过JSON配置定义侦察行为：

```json
{
    "filteredObjects": [
        "objectId1",
        "objectId2"
    ],
    "showTerrain": true
}
```

## 继承关系

```
ViewWorldEffect
    └── IAdventureSpellEffect
```

## 相关法术

通常用于实现Heroes III的侦察法术系列：
- **View Earth**: 显示地下矿藏和资源
- **View Air**: 显示天空中的信息
- 其他View类法术

## 侦察机制

ViewWorldEffect的工作原理：
1. **范围计算**: 基于施法者位置和法术等级计算侦察半径
2. **信息过滤**: 根据`filteredObjects`列表决定显示哪些对象
3. **地形显示**: 如果`showTerrain`为true，显示地形信息
4. **视野更新**: 临时或永久地更新玩家的地图视野

## 使用场景

ViewWorldEffect用于：
- 侦察地图上的资源分布
- 发现隐藏的地下矿藏
- 探索未知区域的地形
- 战略规划和决策支持

## 注意事项

- 侦察效果可能是临时的或永久的
- 某些对象可能需要特定的法术才能显示
- 地形显示可能受战争迷雾影响
- 法术效果范围通常受施法者等级影响