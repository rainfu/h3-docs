<!-- 来源: E:\develop\heroes\vcmi\lib\RiverHandler.h -->
# RiverHandler头文件

RiverHandler头文件定义了VCMI中河流类型管理的相关类。

## RiverPaletteAnimation结构体

### 定义
```cpp
struct DLL_LINKAGE RiverPaletteAnimation
```

### 成员
- `int32_t start`: 开始循环的颜色索引
- `int32_t length`: 循环的颜色总数

## RiverType类

### 类定义
```cpp
class DLL_LINKAGE RiverType : public EntityT<RiverId>
```

### 主要属性
- `RiverId id`: 河流ID
- `std::string identifier`: 标识符
- `std::string modScope`: 模组范围
- `AnimationPath tilesFilename`: 瓦片文件名
- `std::string shortIdentifier`: 短标识符
- `std::string deltaName`: delta名称
- `std::vector<RiverPaletteAnimation> paletteAnimation`: 调色板动画列表

### 重写方法
- `int32_t getIndex() const override`: 获取索引
- `int32_t getIconIndex() const override`: 获取图标索引
- `std::string getJsonKey() const override`: 获取JSON键
- `std::string getModScope() const override`: 获取模组范围
- `void registerIcons(const IconRegistar & cb) const override`: 注册图标
- `RiverId getId() const override`: 获取河流ID
- `std::string getNameTextID() const override`: 获取名称文本ID
- `std::string getNameTranslated() const override`: 获取翻译后名称

### 其他方法
- `void updateFrom(const JsonNode & data)`: 从数据更新

## RiverTypeService类

### 类定义
```cpp
class DLL_LINKAGE RiverTypeService : public EntityServiceT<RiverId, RiverType>
```

河流类型服务类，继承自实体服务模板类。

## RiverTypeHandler类

### 类定义
```cpp
class DLL_LINKAGE RiverTypeHandler : public CHandlerBase<RiverId, RiverType, RiverType, RiverTypeService>
```

### 构造函数
- `RiverTypeHandler()`: 构造函数

### 主要方法
- `std::shared_ptr<RiverType> loadFromJson(const std::string & scope, const JsonNode & json, const std::string & identifier, size_t index) override`: 从JSON加载河流类型
- `const std::vector<std::string> & getTypeNames() const override`: 获取类型名称列表
- `std::vector<JsonNode> loadLegacyData() override`: 加载遗留数据

## 相关类型

- `RiverId`: 河流ID类型
- `AnimationPath`: 动画路径类型