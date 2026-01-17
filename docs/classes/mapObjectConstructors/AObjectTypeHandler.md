# AObjectTypeHandler

## 源文件

[AObjectTypeHandler.h](https://github.com/vcmi/vcmi/blob/master/lib/mapObjectConstructors/AObjectTypeHandler.h)

## 类定义

```cpp
class DLL_LINKAGE AObjectTypeHandler : public boost::noncopyable
```

`AObjectTypeHandler` 是负责创建特定类型和子类型的对象的类。它是不可复制的（继承自 `boost::noncopyable`）。

## 继承关系

- 继承自 `boost::noncopyable`

## 成员变量

- `RandomMapInfo rmgInfo` - 随机地图生成信息
- `std::unique_ptr<JsonNode> base` - 描述基础模板的JSON节点
- `std::vector<std::shared_ptr<const ObjectTemplate>> templates` - 对象模板列表
- `SObjectSounds sounds` - 对象声音
- `std::optional<si32> aiValue` - AI值（可选）
- `BattleField battlefield` - 战场类型
- `std::string modScope` - 模组范围
- `std::string typeName` - 类型名称
- `std::string subTypeName` - 子类型名称
- `si32 type` - 类型ID
- `si32 subtype` - 子类型ID
- `bool blockVisit` - 是否阻止访问
- `bool removable` - 是否可移除

## 方法

### 构造函数和析构函数

- `AObjectTypeHandler()` - 默认构造函数
- `virtual ~AObjectTypeHandler()` - 虚析构函数

### 获取器方法

- `si32 getIndex() const` - 获取类型索引
- `si32 getSubIndex() const` - 获取子类型索引
- `std::string getTypeName() const` - 获取类型名称
- `std::string getSubTypeName() const` - 获取子类型名称
- `std::string getJsonKey() const` - 获取JSON键（完整标识符）
- `std::string getModScope() const` - 获取模组范围
- `SObjectSounds getSounds() const` - 获取对象声音
- `BattleField getBattlefield() const` - 获取战场类型
- `const RandomMapInfo & getRMGInfo()` - 获取随机地图生成信息
- `std::optional<si32> getAiValue() const` - 获取AI值
- `std::string getBaseTextID() const` - 获取基础文本ID
- `std::string getNameTranslated() const` - 获取翻译后的名称

### 初始化和配置

- `void init(const JsonNode & input)` - 从JSON结构加载通用数据
- `virtual void initTypeData(const JsonNode & input)` - 类型特定数据的初始化
- `void preInitObject(CGObjectInstance * obj) const` - 对象预初始化
- `virtual void configureObject(CGObjectInstance * object, IGameRandomizer & gameRandomizer) const = 0` - 配置对象属性（纯虚函数）
- `virtual void afterLoadFinalization()` - 加载完成后的最终化处理

### 模板管理

- `void addTemplate(const std::shared_ptr<const ObjectTemplate> & templ)` - 添加模板
- `void addTemplate(JsonNode config)` - 从JSON配置添加模板
- `void clearTemplates()` - 清除所有模板
- `std::vector<std::shared_ptr<const ObjectTemplate>> getTemplates() const` - 获取所有模板
- `std::vector<std::shared_ptr<const ObjectTemplate>> getTemplates(const TerrainId terrainType) const` - 获取指定地形的模板
- `std::vector<std::shared_ptr<const ObjectTemplate>> getMostSpecificTemplates(TerrainId terrainType) const` - 获取最具体的模板
- `virtual std::shared_ptr<const ObjectTemplate> getOverride(TerrainId terrainType, const CGObjectInstance * object) const` - 获取覆盖模板

### 对象创建

- `virtual std::shared_ptr<CGObjectInstance> create(IGameInfoCallback * cb, std::shared_ptr<const ObjectTemplate> tmpl) const = 0` - 创建对象（纯虚函数）

### 文本和名称

- `virtual bool hasNameTextID() const` - 是否提供自定义文本ID
- `virtual std::string getNameTextID() const` - 获取名称文本ID

### 过滤和信息

- `virtual bool objectFilter(const CGObjectInstance * obj, std::shared_ptr<const ObjectTemplate> tmpl) const` - 对象过滤器
- `virtual std::unique_ptr<IObjectInfo> getObjectInfo(std::shared_ptr<const ObjectTemplate> tmpl) const` - 获取对象信息
- `virtual bool isStaticObject()` - 是否为静态对象

### 回调

- `virtual void onTemplateAdded(const std::shared_ptr<const ObjectTemplate>)` - 模板添加时的回调

## 设计特点

- **抽象基类**: 包含纯虚函数 `create` 和 `configureObject`，需要子类实现
- **模板系统**: 支持多种对象模板，根据地形类型选择合适的模板
- **随机地图生成支持**: 包含 `RandomMapInfo` 用于地图生成
- **多语言支持**: 提供文本ID和翻译功能
- **配置驱动**: 从JSON配置初始化，支持模组系统
- **不可复制**: 继承自 `boost::noncopyable` 确保对象不可复制