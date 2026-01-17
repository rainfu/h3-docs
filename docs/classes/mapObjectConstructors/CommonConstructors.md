# CommonConstructors

## 源文件

[CommonConstructors.h](https://github.com/vcmi/vcmi/blob/master/lib/mapObjectConstructors/CommonConstructors.h)

## 概述

`CommonConstructors.h` 定义了VCMI中常见的地图对象构造函数类。这些类都继承自 `CDefaultObjectTypeHandler` 模板类，为不同类型的地图对象提供创建和配置功能。

## 类定义

### CObstacleConstructor

```cpp
class CObstacleConstructor : public CDefaultObjectTypeHandler<CGObjectInstance>
```

障碍物构造函数。

**重写方法:**
- `bool isStaticObject() override` - 返回true，表示为静态对象

### CreatureInstanceConstructor

```cpp
class CreatureInstanceConstructor : public CDefaultObjectTypeHandler<CGCreature>
```

生物实例构造函数。

**重写方法:**
- `bool hasNameTextID() const override` - 返回true
- `std::string getNameTextID() const override` - 返回生物的名称文本ID

### ResourceInstanceConstructor

```cpp
class ResourceInstanceConstructor : public CDefaultObjectTypeHandler<CGResource>
```

资源实例构造函数。

**成员变量:**
- `JsonNode config` - 配置数据
- `GameResID resourceType` - 资源类型

**重写方法:**
- `void initTypeData(const JsonNode & input) override` - 初始化类型数据
- `bool hasNameTextID() const override` - 返回true
- `std::string getNameTextID() const override` - 返回资源的名称文本ID
- `void randomizeObject(CGResource * object, IGameRandomizer & gameRandomizer) const override` - 随机化资源对象

**方法:**
- `GameResID getResourceType() const` - 获取资源类型
- `int getAmountMultiplier() const` - 获取数量倍数
- `int getBaseAmount(vstd::RNG & rng) const` - 获取基础数量

### MineInstanceConstructor

```cpp
class DLL_LINKAGE MineInstanceConstructor : public CDefaultObjectTypeHandler<CGMine>
```

矿场实例构造函数。

**成员变量:**
- `JsonNode config` - 配置数据
- `GameResID resourceType` - 资源类型
- `ui32 defaultQuantity` - 默认数量
- `AnimationPath kingdomOverviewImage` - 王国概览图像

**重写方法:**
- `void initTypeData(const JsonNode & input) override` - 初始化类型数据

**方法:**
- `GameResID getResourceType() const` - 获取资源类型
- `ui32 getDefaultQuantity() const` - 获取默认数量
- `std::string getDescriptionTextID() const` - 获取描述文本ID
- `std::string getDescriptionTranslated() const` - 获取翻译后的描述
- `AnimationPath getKingdomOverviewImage() const` - 获取王国概览图像

### CTownInstanceConstructor

```cpp
class CTownInstanceConstructor : public CDefaultObjectTypeHandler<CGTownInstance>
```

城镇实例构造函数。

**成员变量:**
- `JsonNode filtersJson` - 过滤器JSON
- `const CFaction * faction` - 派系指针
- `std::map<std::string, LogicalExpression<BuildingID>> filters` - 建筑过滤器

**重写方法:**
- `bool objectFilter(const CGObjectInstance * obj, std::shared_ptr<const ObjectTemplate> tmpl) const override` - 对象过滤
- `void initTypeData(const JsonNode & input) override` - 初始化类型数据
- `void initializeObject(CGTownInstance * object) const override` - 初始化城镇对象
- `void randomizeObject(CGTownInstance * object, IGameRandomizer & gameRandomizer) const override` - 随机化城镇对象
- `void afterLoadFinalization() override` - 加载完成后的最终化
- `bool hasNameTextID() const override` - 返回true
- `std::string getNameTextID() const override` - 返回城镇的名称文本ID

### CHeroInstanceConstructor

```cpp
class CHeroInstanceConstructor : public CDefaultObjectTypeHandler<CGHeroInstance>
```

英雄实例构造函数。

**内部结构体:**
```cpp
struct HeroFilter
{
    HeroTypeID fixedHero;
    bool allowMale;
    bool allowFemale;
};
```

**成员变量:**
- `std::map<std::string, HeroFilter> filters` - 英雄过滤器
- `const CHeroClass * heroClass` - 英雄职业指针

**重写方法:**
- `std::shared_ptr<const ObjectTemplate> getOverride(TerrainId terrainType, const CGObjectInstance * object) const override` - 获取覆盖模板
- `void initTypeData(const JsonNode & input) override` - 初始化类型数据
- `void randomizeObject(CGHeroInstance * object, IGameRandomizer & gameRandomizer) const override` - 随机化英雄对象
- `bool hasNameTextID() const override` - 返回true
- `std::string getNameTextID() const override` - 返回英雄的名称文本ID

### BoatInstanceConstructor

```cpp
class DLL_LINKAGE BoatInstanceConstructor : public CDefaultObjectTypeHandler<CGBoat>
```

船只实例构造函数。

**成员变量:**
- `std::vector<std::shared_ptr<Bonus>> bonuses` - 加成列表
- `EPathfindingLayer layer` - 寻路层
- `bool onboardAssaultAllowed` - 是否允许从船上攻击
- `bool onboardVisitAllowed` - 是否允许从船上访问对象
- `AnimationPath actualAnimation` - 实际动画（OH3船只）
- `AnimationPath overlayAnimation` - 覆盖动画（波浪）
- `std::array<AnimationPath, PlayerColor::PLAYER_LIMIT_I> flagAnimations` - 旗帜动画

**重写方法:**
- `void initTypeData(const JsonNode & config) override` - 初始化类型数据
- `void initializeObject(CGBoat * object) const override` - 初始化船只对象

**方法:**
- `AnimationPath getBoatAnimationName() const` - 获取船只动画名称（用于船厂预览）

## 设计特点

- **模板继承**: 所有构造函数都继承自 `CDefaultObjectTypeHandler<T>` 模板类
- **类型特化**: 每个构造函数针对特定的地图对象类型（如城镇、英雄、资源等）
- **配置驱动**: 支持从JSON配置初始化对象属性
- **随机化支持**: 提供对象属性随机化功能，用于地图生成
- **过滤系统**: 支持基于逻辑表达式的对象过滤
- **多语言支持**: 为对象提供文本ID和翻译功能