<!-- 来源: E:\develop\heroes\vcmi\lib\spells\adventure\AdventureSpellEffect.h -->
# AdventureSpellEffect类

AdventureSpellEffect.h定义了VCMI冒险地图法术效果系统的核心接口和实现类。

## 枚举定义

### ESpellCastResult
定义法术施放的结果状态：

```cpp
enum class ESpellCastResult : int8_t
{
    OK,      // 施放成功
    CANCEL,  // 施放失败但不是错误，不会消耗法力
    PENDING, // 等待中
    ERROR    // 发生错误，例如玩家的无效请求
};
```

## 核心接口

### IAdventureSpellEffect
冒险法术效果的抽象基类：

```cpp
class IAdventureSpellEffect
{
public:
    virtual ~IAdventureSpellEffect() = default;

    // 应用冒险效果
    virtual ESpellCastResult applyAdventureEffects(
        SpellCastEnvironment * env,
        const AdventureSpellCastParameters & parameters) const;

    // 开始施放
    virtual ESpellCastResult beginCast(
        SpellCastEnvironment * env,
        const AdventureSpellCastParameters & parameters,
        const AdventureSpellMechanics & mechanics) const;

    // 结束施放
    virtual void endCast(
        SpellCastEnvironment * env,
        const AdventureSpellCastParameters & parameters) const;

    // 检查是否可以施放
    virtual bool canBeCastImpl(
        spells::Problem & problem,
        const IGameInfoCallback * cb,
        const spells::Caster * caster) const;

    // 检查是否可以在指定位置施放
    virtual bool canBeCastAtImpl(
        spells::Problem & problem,
        const IGameInfoCallback * cb,
        const spells::Caster * caster,
        const int3 & pos) const;

    // 获取目标位置的光标
    virtual std::string getCursorForTarget(
        const IGameInfoCallback * cb,
        const spells::Caster * caster,
        const int3 & pos) const;
};
```

## 实现类

### AdventureSpellEffect
基础的冒险法术效果实现：

```cpp
class AdventureSpellEffect final : public IAdventureSpellEffect
{
public:
    AdventureSpellEffect() = default;
    // 默认实现所有虚函数
};
```

### AdventureSpellRangedEffect
支持范围限制的冒险法术效果：

```cpp
class DLL_LINKAGE AdventureSpellRangedEffect : public IAdventureSpellEffect
{
    int rangeX;     // X轴范围
    int rangeY;     // Y轴范围
    bool ignoreFow; // 是否忽略战争迷雾

public:
    AdventureSpellRangedEffect(const JsonNode & config);

    // 检查目标是否在范围内
    bool isTargetInRange(
        const IGameInfoCallback * cb,
        const spells::Caster * caster,
        const int3 & pos) const;

    // 必须在派生类中实现的纯虚函数
    virtual std::string getCursorForTarget(
        const IGameInfoCallback * cb,
        const spells::Caster * caster,
        const int3 & pos) const override = 0;

    virtual bool canBeCastAtImpl(
        spells::Problem & problem,
        const IGameInfoCallback * cb,
        const spells::Caster * caster,
        const int3 & pos) const override = 0;
};
```

## 生命周期

冒险法术效果的执行流程：

1. **beginCast()**: 施放开始，进行前置检查和准备
2. **applyAdventureEffects()**: 应用实际的冒险效果
3. **endCast()**: 施放结束，进行清理工作

## 配置方式

AdventureSpellRangedEffect通过JSON配置：

```json
{
    "rangeX": 10,
    "rangeY": 10,
    "ignoreFow": false
}
```

## 相关类

- `AdventureSpellMechanics`: 冒险法术机制
- `AdventureSpellCastParameters`: 施放参数
- `SpellCastEnvironment`: 施放环境
- `spells::Caster`: 法术施放者
- `spells::Problem`: 问题报告

## 设计模式

使用**模板方法模式**：
- `IAdventureSpellEffect`定义算法骨架
- 具体实现类提供特定的步骤实现
- `AdventureSpellRangedEffect`提供范围检查的基础实现

## 扩展性

通过继承`IAdventureSpellEffect`，可以实现各种类型的冒险法术效果：
- 传送类法术
- 侦察类法术
- 地形修改类法术
- 资源获取类法术