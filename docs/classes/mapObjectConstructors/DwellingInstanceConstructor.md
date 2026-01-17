# DwellingInstanceConstructor

## 源文件

[DwellingInstanceConstructor.h](https://github.com/vcmi/vcmi/blob/master/lib/mapObjectConstructors/DwellingInstanceConstructor.h)

## 类定义

```cpp
class DwellingInstanceConstructor : public CDefaultObjectTypeHandler<CGDwelling>
```

`DwellingInstanceConstructor` 是住宅（生物生产建筑）实例的构造函数，负责创建和配置可以生产生物的建筑。

## 继承关系

- 继承自 `CDefaultObjectTypeHandler<CGDwelling>`

## 成员变量

- `std::vector<std::vector<const CCreature *>> availableCreatures` - 可生产的生物列表
- `JsonNode guards` - 守卫配置
- `bool bannedForRandomDwelling` - 是否禁止用于随机住宅
- `AnimationPath kingdomOverviewImage` - 王国概览图像

## 方法

### 重写的方法

- `bool objectFilter(const CGObjectInstance * obj, std::shared_ptr<const ObjectTemplate> tmpl) const override` - 对象过滤
- `void initTypeData(const JsonNode & input) override` - 初始化类型数据
- `void onTemplateAdded(const std::shared_ptr<const ObjectTemplate>) override` - 模板添加时的回调
- `bool hasNameTextID() const override` - 返回true
- `void initializeObject(CGDwelling * object) const override` - 初始化住宅对象
- `void randomizeObject(CGDwelling * object, IGameRandomizer & gameRandomizer) const override` - 随机化住宅对象

### 公共方法

- `bool isBannedForRandomDwelling() const` - 检查是否禁止用于随机住宅
- `bool producesCreature(const CCreature * crea) const` - 检查是否生产指定生物
- `std::vector<const CCreature *> getProducedCreatures() const` - 获取可生产的生物列表
- `AnimationPath getKingdomOverviewImage() const` - 获取王国概览图像

## 设计特点

- **生物生产**: 管理住宅可以生产的不同生物类型
- **守卫系统**: 支持配置守卫生物
- **随机化控制**: 可以禁止某些住宅用于随机地图生成
- **王国集成**: 提供王国概览的视觉表示
- **模板回调**: 在添加模板时进行额外处理