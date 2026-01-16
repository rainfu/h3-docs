# AdventureSpellRangedEffect类

AdventureSpellRangedEffect类是VCMI中冒险法术范围效果的基类，为具有范围限制的冒险法术提供通用功能。

## 类定义

```cpp
class DLL_LINKAGE AdventureSpellRangedEffect : public IAdventureSpellEffect
{
    int rangeX;
    int rangeY;
    bool ignoreFow;

public:
    AdventureSpellRangedEffect(const JsonNode & config);

    bool isTargetInRange(const IGameInfoCallback * cb, const spells::Caster * caster, const int3 & pos) const;
    std::string getCursorForTarget(const IGameInfoCallback * cb, const spells::Caster * caster, const int3 & pos) const override = 0; //必须在派生类中实现
    bool canBeCastAtImpl(spells::Problem & problem, const IGameInfoCallback * cb, const spells::Caster * caster, const int3 & pos) const override = 0; //必须在派生类中实现
};
```

## 功能说明

AdventureSpellRangedEffect是VCMI冒险法术范围效果的抽象基类，继承自IAdventureSpellEffect接口。它为具有范围限制的冒险法术（如维度门、传送等）提供通用功能，包括范围检查、视野判断等。该类定义了范围限制的X和Y轴距离，并提供检查目标是否在范围内等功能。

## 依赖关系

- [IAdventureSpellEffect](./IAdventureSpellEffect.md): 冒险法术效果接口
- [JsonNode](../json/JsonNode.md): JSON节点
- [IGameInfoCallback](../gameState/IGameInfoCallback.md): 游戏信息回调接口
- [spells::Caster](./Caster.md): 施法者接口
- [spells::Problem](./Problem.md): 问题类
- [int3](../math/int3.md): 三维坐标
- STL库: string等

## 函数注释

### 构造函数
- `AdventureSpellRangedEffect(config)`: 构造函数，使用配置节点初始化范围效果

### 公共方法
- `isTargetInRange(cb, caster, pos)`: 检查指定位置是否在法术范围内

### 纯虚方法（必须在派生类中实现）
- `getCursorForTarget(cb, caster, pos)`: 获取目标位置的光标类型
- `canBeCastAtImpl(problem, cb, caster, pos)`: 检查法术是否可以在指定位置施放