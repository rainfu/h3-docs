# CRewardableConstructor

## 源文件

[CRewardableConstructor.h](https://github.com/vcmi/vcmi/blob/master/lib/mapObjectConstructors/CRewardableConstructor.h)

## 类定义

```cpp
class DLL_LINKAGE CRewardableConstructor : public AObjectTypeHandler
```

`CRewardableConstructor` 是可奖励地图对象的构造函数，负责创建和配置提供奖励的对象。

## 继承关系

- 继承自 `AObjectTypeHandler`

## 成员变量

- `Rewardable::Info objectInfo` - 可奖励对象信息
- `bool blockVisit` - 是否阻止访问

## 方法

### 重写的方法

- `void initTypeData(const JsonNode & config) override` - 初始化类型数据
- `bool hasNameTextID() const override` - 返回true，表示有自定义名称文本ID
- `std::shared_ptr<CGObjectInstance> create(IGameInfoCallback * cb, std::shared_ptr<const ObjectTemplate> tmpl = nullptr) const override` - 创建对象
- `void configureObject(CGObjectInstance * object, IGameRandomizer & gameRandomizer) const override` - 配置对象
- `std::unique_ptr<IObjectInfo> getObjectInfo(std::shared_ptr<const ObjectTemplate> tmpl) const override` - 获取对象信息

### 公共方法

- `Rewardable::Configuration generateConfiguration(IGameInfoCallback * cb, IGameRandomizer & gameRandomizer, MapObjectID objectID, const std::map<std::string, JsonNode> & presetVariables) const` - 生成奖励配置

### 私有方法

- `void assignBonuses(std::vector<std::shared_ptr<Bonus>> & bonuses, MapObjectID objectID) const` - 分配加成

## 设计特点

- **奖励系统**: 专门处理提供奖励的地图对象
- **配置生成**: 能够根据游戏状态和随机化器生成奖励配置
- **加成分配**: 支持为对象分配各种加成效果
- **信息管理**: 包含完整的可奖励对象信息结构
- **访问控制**: 支持阻止访问的配置选项