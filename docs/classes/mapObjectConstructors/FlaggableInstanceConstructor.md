# FlaggableInstanceConstructor

## 源文件

[FlaggableInstanceConstructor.h](https://github.com/vcmi/vcmi/blob/master/lib/mapObjectConstructors/FlaggableInstanceConstructor.h)

## 类定义

```cpp
class FlaggableInstanceConstructor final : public CDefaultObjectTypeHandler<FlaggableMapObject>
```

`FlaggableInstanceConstructor` 是可插旗地图对象实例的构造函数，负责创建可以被玩家占领并提供收益的对象。

## 继承关系

- 继承自 `CDefaultObjectTypeHandler<FlaggableMapObject>`
- 使用 `final` 关键字，禁止进一步继承

## 成员变量

- `std::vector<std::shared_ptr<Bonus>> providedBonuses` - 该类型对象提供的加成列表
- `std::string visitMessageTextID` - 英雄访问时显示的消息文本ID
- `ResourceSet dailyIncome` - 该对象每天为所有者提供的资源收入

## 方法

### 重写的方法

- `void initTypeData(const JsonNode & config) override` - 初始化类型数据
- `void initializeObject(FlaggableMapObject * object) const override` - 初始化可插旗对象

### 公共方法

- `const std::string & getVisitMessageTextID() const` - 获取访问消息文本ID
- `const std::vector<std::shared_ptr<Bonus>> & getProvidedBonuses() const` - 获取提供的加成
- `const ResourceSet & getDailyIncome() const` - 获取每日收入

## 设计特点

- **收益系统**: 支持每日资源收入和加成效果
- **占领机制**: 对象可以被玩家占领并提供持续收益
- **消息系统**: 支持英雄访问时的自定义消息
- **不可继承**: 使用 `final` 确保这是对象层次的最终实现
- **配置驱动**: 从JSON配置初始化所有属性