# Services接口

Services接口是VCMI中服务访问的抽象接口，提供对各种游戏服务的统一访问。

## 类定义

```cpp
class DLL_LINKAGE Services
{
public:
    virtual ~Services() = default;

    virtual const ArtifactService * artifacts() const = 0;
    virtual const CreatureService * creatures() const = 0;
    virtual const FactionService * factions() const = 0;
    virtual const HeroClassService * heroClasses() const = 0;
    virtual const HeroTypeService * heroTypes() const = 0;
    virtual const ResourceTypeService * resources() const = 0;
#if SCRIPTING_ENABLED
    virtual const scripting::Service * scripts() const = 0;
#endif
    virtual const spells::Service * spells() const = 0;
    virtual const SkillService * skills() const = 0;
    virtual const BattleFieldService * battlefields() const = 0;
    virtual const ObstacleService * obstacles() const = 0;
    virtual const IGameSettings * engineSettings() const = 0;

    virtual const spells::effects::Registry * spellEffects() const = 0;
    virtual spells::effects::Registry * spellEffects() = 0;
    //TODO: put map object types registry access here
};
```

## 功能说明

Services是VCMI中服务访问的中心接口，提供对各种游戏服务的统一访问点。它聚合了游戏中各个领域的服务，如道具、生物、种族、英雄等。通过这个接口，系统组件可以获得对各种服务的访问权限，从而实现功能的解耦和模块化。

## 依赖关系

- [ArtifactService](../artifacts/ArtifactService.md): 道具服务
- [CreatureService](../creatures/CreatureService.md): 生物服务
- [FactionService](../factions/FactionService.md): 种族服务
- [HeroClassService](../heroes/HeroClassService.md): 英雄职业服务
- [HeroTypeService](../herotypes/HeroTypeService.md): 英雄类型服务
- [ResourceTypeService](../resources/ResourceTypeService.md): 资源类型服务
- [SkillService](../skills/SkillService.md): 技能服务
- [BattleFieldService](../battle/BattleFieldService.md): 战场服务
- [ObstacleService](../obstacles/ObstacleService.md): 障碍物服务
- [IGameSettings](../settings/IGameSettings.md): 游戏设置接口
- [spells::Service](../spells/SpellService.md): 法术服务
- [spells::effects::Registry](../spells/SpellEffectRegistry.md): 法术效果注册表

## 函数注释

- `~Services()`: 虚析构函数
- `artifacts()`: 返回道具服务的常量指针
- `creatures()`: 返回生物服务的常量指针
- `factions()`: 返回种族服务的常量指针
- `heroClasses()`: 返回英雄职业服务的常量指针
- `heroTypes()`: 返回英雄类型服务的常量指针
- `resources()`: 返回资源类型服务的常量指针
- `scripts()`: 返回脚本服务的常量指针（仅在启用脚本时）
- `spells()`: 返回法术服务的常量指针
- `skills()`: 返回技能服务的常量指针
- `battlefields()`: 返回战场服务的常量指针
- `obstacles()`: 返回障碍物服务的常量指针
- `engineSettings()`: 返回游戏引擎设置的常量指针
- `spellEffects() const`: 返回法术效果注册表的常量指针
- `spellEffects()`: 返回法术效果注册表的指针