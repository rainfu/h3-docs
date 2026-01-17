# CObjectClassesHandler

## 源文件

[CObjectClassesHandler.h](https://github.com/vcmi/vcmi/blob/master/lib/mapObjectConstructors/CObjectClassesHandler.h)

## 类定义

```cpp
class DLL_LINKAGE CObjectClassesHandler : public IHandlerBase
```

`CObjectClassesHandler` 是负责创建所有冒险地图对象的主类。它管理对象类型处理器并提供对象查询功能。

## 继承关系

- 继承自 `IHandlerBase`

## 内部类

### ObjectClass

```cpp
class DLL_LINKAGE ObjectClass : boost::noncopyable
```

表示对象类别的内部类。

**成员变量:**
- `std::string modScope` - 模组范围
- `std::string identifier` - 标识符
- `si32 id` - ID
- `std::string handlerName` - 处理器名称
- `JsonNode base` - 基础JSON配置
- `std::vector<TObjectTypeHandler> objectTypeHandlers` - 对象类型处理器列表

**方法:**
- `std::string getJsonKey() const` - 获取JSON键
- `std::string getNameTextID() const` - 获取名称文本ID
- `std::string getNameTranslated() const` - 获取翻译后的名称

## 成员变量

- `std::vector< std::unique_ptr<ObjectClass> > mapObjectTypes` - 对象类型列表
- `std::map<std::string, std::function<TObjectTypeHandler()> > handlerConstructors` - 处理器构造函数映射
- `std::vector<std::pair<CompoundMapObjectID, std::function<void(CompoundMapObjectID)>>> objectIdHandlers` - 对象ID处理器
- `TTemplatesContainer legacyTemplates` - 遗留模板容器（仅加载时使用）

## 方法

### 构造函数和析构函数

- `CObjectClassesHandler()` - 构造函数
- `~CObjectClassesHandler()` - 析构函数

### 加载和初始化

- `std::vector<JsonNode> loadLegacyData() override` - 加载遗留数据
- `void loadObject(std::string scope, std::string name, const JsonNode & data) override` - 加载对象
- `void loadObject(std::string scope, std::string name, const JsonNode & data, size_t index) override` - 加载带索引的对象
- `void loadSubObject(const std::string & identifier, JsonNode config, MapObjectID ID, MapObjectSubID subID)` - 加载子对象
- `void removeSubObject(MapObjectID ID, MapObjectSubID subID)` - 移除子对象
- `void beforeValidate(JsonNode & object) override` - 验证前处理
- `void afterLoadFinalization() override` - 加载完成后的最终化

### 对象查询

- `std::set<MapObjectID> knownObjects() const` - 获取已知对象ID集合
- `std::set<MapObjectSubID> knownSubObjects(MapObjectID primaryID) const` - 获取已知子对象ID集合
- `TObjectTypeHandler getHandlerFor(MapObjectID type, MapObjectSubID subtype) const` - 根据ID获取处理器
- `TObjectTypeHandler getHandlerFor(const std::string & scope, const std::string & type, const std::string & subtype) const` - 根据名称获取处理器
- `TObjectTypeHandler getHandlerFor(CompoundMapObjectID compoundIdentifier) const` - 根据复合标识符获取处理器
- `CompoundMapObjectID getCompoundIdentifier(const std::string & scope, const std::string & type, const std::string & subtype) const` - 获取复合标识符
- `CompoundMapObjectID getCompoundIdentifier(const std::string & objectName) const` - 根据对象名称获取复合标识符
- `std::string getObjectName(MapObjectID type, MapObjectSubID subtype) const` - 获取对象名称
- `SObjectSounds getObjectSounds(MapObjectID type, MapObjectSubID subtype) const` - 获取对象声音
- `void resolveObjectCompoundId(const std::string & id, std::function<void(CompoundMapObjectID)> callback)` - 解析对象复合ID
- `std::string getObjectHandlerName(MapObjectID type) const` - 获取对象处理器名称
- `std::string getJsonKey(MapObjectID type) const` - 获取JSON键

### 私有方法

- `TObjectTypeHandler loadSubObjectFromJson(const std::string & scope, const std::string & identifier, const JsonNode & entry, ObjectClass * obj, size_t index)` - 从JSON加载子对象
- `void loadSubObject(const std::string & scope, const std::string & identifier, const JsonNode & entry, ObjectClass * obj)` - 加载子对象
- `void loadSubObject(const std::string & scope, const std::string & identifier, const JsonNode & entry, ObjectClass * obj, size_t index)` - 加载带索引的子对象
- `std::unique_ptr<ObjectClass> loadFromJson(const std::string & scope, const JsonNode & json, const std::string & name, size_t index)` - 从JSON加载对象类
- `void generateExtraMonolithsForRMG(ObjectClass * container)` - 为RMG生成额外纪念碑

## 设计特点

- **处理器管理**: 管理所有对象类型的处理器，支持动态加载和查询
- **复合标识符**: 使用 `CompoundMapObjectID` 提供灵活的对象标识
- **模组支持**: 支持不同模组范围的对象定义
- **遗留兼容**: 包含对H3模板的兼容性处理
- **事件驱动**: 支持对象ID解析的回调机制
- **继承体系**: 继承自 `IHandlerBase` 遵循统一的处理器接口