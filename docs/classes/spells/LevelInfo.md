# CSpell::LevelInfo结构

CSpell::LevelInfo结构是VCMI中法术等级信息的结构体，用于定义法术在不同等级时的属性和效果。

## 类定义

```cpp
struct LevelInfo
{
    si32 cost = 0;
    si32 power = 0;

    bool smartTarget = true;
    bool clearTarget = false;
    bool clearAffected = false;
    std::vector<int> range = { 0 };

    //TODO: 当AI理解特殊效果时移除这两个
    std::vector<std::shared_ptr<Bonus>> effects; //已弃用
    std::vector<std::shared_ptr<Bonus>> cumulativeEffects; //已弃用

    JsonNode battleEffects;
    JsonNode adventureEffect;
};
```

## 功能说明

CSpell::LevelInfo是VCMI法术系统中定义法术等级信息的结构体。它包含法术在特定等级的成本、力量、目标选择行为、范围以及其他效果。这个结构体允许法术在不同等级时有不同的表现，是实现法术升级系统的关键组件。

## 依赖关系

- [Bonus](../bonuses/Bonus.md): 奖励类
- [JsonNode](../json/JsonNode.md): JSON节点
- STL库: vector, shared_ptr等

## 成员变量说明

- `cost`: 法术施放成本（通常是法力值），默认为0
- `power`: 法术力量，影响法术效果的强度，默认为0
- `smartTarget`: 智能目标选择标志，如果为真，则法术会选择最优目标，默认为true
- `clearTarget`: 清除目标标志，如果为真，则在施法后清除目标列表，默认为false
- `clearAffected`: 清除受影响单位标志，如果为真，则在施法后清除受影响单位列表，默认为false
- `range`: 法术影响范围，以六角网格为单位的数组，默认为{0}
- `effects`: 法术效果奖励列表（已弃用），这些效果会在法术施放时应用
- `cumulativeEffects`: 累积效果奖励列表（已弃用），这些效果会在法术持续时间内累积
- `battleEffects`: 战斗法术效果的JSON配置节点
- `adventureEffect`: 冒险法术效果的JSON配置节点