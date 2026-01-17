<!-- 来源: E:\develop\heroes\vcmi\lib\RoadHandler.h -->
# RoadHandler头文件

RoadHandler头文件定义了VCMI中道路类型管理的相关类。

## RoadType类

### 类定义
```cpp
class DLL_LINKAGE RoadType : public EntityT<RoadId>
```

### 主要属性
- `RoadId id`: 道路ID
- `std::string identifier`: 标识符
- `std::string modScope`: 模组范围
- `AnimationPath tilesFilename`: 瓦片文件名
- `std::string shortIdentifier`: 短标识符
- `ui8 movementCost`: 移动成本

### 重写方法
- `int32_t getIndex() const override`: 获取索引
- `int32_t getIconIndex() const override`: 获取图标索引
- `std::string getJsonKey() const override`: 获取JSON键
- `std::string getModScope() const override`: 获取模组范围
- `void registerIcons(const IconRegistar & cb) const override`: 注册图标
- `RoadId getId() const override`: 获取道路ID
- `std::string getNameTextID() const override`: 获取名称文本ID
- `std::string getNameTranslated() const override`: 获取翻译后名称

### 其他方法
- `void updateFrom(const JsonNode & data)`: 从数据更新

## RoadTypeService类

### 类定义
```cpp
class DLL_LINKAGE RoadTypeService : public EntityServiceT<RoadId, RoadType>
```

道路类型服务类，继承自实体服务模板类。

## RoadTypeHandler类

### 类定义
```cpp
class DLL_LINKAGE RoadTypeHandler : public CHandlerBase<RoadId, RoadType, RoadType, RoadTypeService>
```

### 构造函数
- `RoadTypeHandler()`: 构造函数

### 主要方法
- `std::shared_ptr<RoadType> loadFromJson(const std::string & scope, const JsonNode & json, const std::string & identifier, size_t index) override`: 从JSON加载道路类型
- `const std::vector<std::string> & getTypeNames() const override`: 获取类型名称列表
- `std::vector<JsonNode> loadLegacyData() override`: 加载遗留数据

## 相关类型

- `RoadId`: 道路ID类型
- `AnimationPath`: 动画路径类型