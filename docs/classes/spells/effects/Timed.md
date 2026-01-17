<!-- 来源: E:\develop\heroes\vcmi\lib\spells\effects\Timed.h -->
# Timed类

Timed类实现了具有时间限制的法术效果，如持续一定回合的增益或减益效果。

## 类定义

```cpp
class Timed : public UnitEffect
```

## 概述

Timed继承自UnitEffect，专门用于实现那些在战斗中持续有限回合的法术效果，如护盾、加速、减速等。

## 成员变量

### 累积属性
```cpp
bool cumulative = false;
```
是否允许效果累积。如果为true，相同类型的效果可以叠加；如果为false，后续效果会替换现有效果。

### 奖励效果
```cpp
std::vector<std::shared_ptr<Bonus>> bonus;
```
存储此效果提供的奖励列表。每个奖励都包含具体的效果类型和数值。

## 主要方法

### apply()
应用时间限制的效果到目标单位：

```cpp
void apply(
    ServerCallback * server,
    const Mechanics * m,
    const EffectTarget & target) const override;
```

**执行步骤:**
1. 计算效果持续时间
2. 转换奖励为标准格式
3. 检查累积规则
4. 应用奖励到目标单位
5. 设置效果到期时间

### convertBonus()
转换奖励配置为标准奖励格式：

```cpp
void convertBonus(
    const Mechanics * m,
    int32_t & duration,
    std::vector<Bonus> & converted) const;
```

**参数:**
- `m`: 法术机制信息
- `duration`: 输出参数，效果持续时间
- `converted`: 输出参数，转换后的奖励列表

### serializeJsonUnitEffect()
序列化效果配置：

```cpp
void serializeJsonUnitEffect(JsonSerializeFormat & handler) override final;
```

## 配置方式

通过JSON配置定义时间效果：

```json
{
    "cumulative": false,
    "bonus": [
        {
            "type": "PRIMARY_SKILL",
            "subtype": "ATTACK",
            "val": 2,
            "duration": 3
        }
    ]
}
```

## 继承关系

```
Timed
    └── UnitEffect
        └── IUnitEffect
```

## 效果类型

Timed类适用于以下类型的法术效果：
- **增益效果**: 提升攻击、防御、速度等属性
- **减益效果**: 降低敌方单位属性
- **状态效果**: 眩晕、冻结、中毒等
- **特殊效果**: 护盾、再生等

## 持续时间机制

- **固定持续时间**: 效果持续指定的回合数
- **等级影响**: 持续时间可能受施法者等级影响
- **累积规则**: 控制相同效果是否可以叠加

## 使用场景

Timed用于实现各种战斗法术：
- **战斗增益**: Haste, Prayer, Bloodlust等
- **战斗减益**: Slow, Curse, Weakness等
- **状态控制**: Blind, Paralyze等
- **防护效果**: Shield, Air Shield等

## 注意事项

- 效果在回合结束时自动移除
- 累积效果需要谨慎配置以避免平衡性问题
- 持续时间为0表示效果立即消失
- 某些效果可能受免疫或抵抗影响