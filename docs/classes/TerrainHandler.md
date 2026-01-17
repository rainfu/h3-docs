<!-- 来源: E:\develop\heroes\vcmi\lib\TerrainHandler.h -->
# TerrainHandler头文件

TerrainHandler头文件定义了VCMI中地形类型的处理类，包括地形属性、通行性和视觉效果。

## TerrainPaletteAnimation结构体

### 结构体定义
```cpp
struct DLL_LINKAGE TerrainPaletteAnimation
```

### 成员变量
- `int32_t start`: 循环起始颜色索引
- `int32_t length`: 循环颜色总数

### 序列化支持
- `template <typename Handler> void serialize(Handler& h)`: 序列化方法

## TerrainType类

### 类定义
```cpp
class DLL_LINKAGE TerrainType : public EntityT<TerrainId>
```

### 枚举类型
```cpp
enum PassabilityType : ui8
```
- `WATER = 2`: 水域地形
- `SURFACE = 4`: 地面地形
- `SUBTERRANEAN = 8`: 地下地形
- `ROCK = 16`: 岩石地形

### 主要属性
- `std::string identifier`: 标识符
- `std::string modScope`: 模组范围
- `TerrainId id`: 地形ID
- `ui8 passabilityType`: 通行类型
- `std::vector<BattleField> battleFields`: 战斗场地
- `std::vector<TerrainId> prohibitTransitions`: 禁止过渡地形
- `ColorRGBA minimapBlocked`: 小地图阻挡颜色
- `ColorRGBA minimapUnblocked`: 小地图通行颜色
- `std::string shortIdentifier`: 短标识符
- `std::vector<AudioPath> musicFilename`: 音乐文件名
- `AnimationPath tilesFilename`: 地形文件名
- `std::string terrainViewPatterns`: 地形视图模式
- `AudioPath horseSound`: 马匹音效
- `AudioPath horseSoundPenalty`: 马匹惩罚音效
- `std::vector<TerrainPaletteAnimation> paletteAnimation`: 调色板动画
- `TerrainId rockTerrain`: 岩石地形
- `RiverId river`: 河流
- `int moveCost`: 移动成本
- `bool transitionRequired`: 是否需要过渡

### 继承的方法
- `int32_t getIndex() const override`: 获取索引
- `int32_t getIconIndex() const override`: 获取图标索引
- `std::string getJsonKey() const override`: 获取JSON键
- `std::string getModScope() const override`: 获取模组范围
- `void registerIcons(const IconRegistar & cb) const override`: 注册图标
- `TerrainId getId() const override`: 获取ID
- `void updateFrom(const JsonNode & data)`: 从JSON更新
- `std::string getNameTextID() const override`: 获取名称文本ID
- `std::string getNameTranslated() const override`: 获取翻译名称

### 内联方法
- `bool isLand() const`: 是否为陆地
- `bool isWater() const`: 是否为水域
- `bool isRock() const`: 是否为岩石
- `bool isPassable() const`: 是否可通行
- `bool isSurface() const`: 是否为地面
- `bool isUnderground() const`: 是否为地下
- `bool isTransitionRequired() const`: 是否需要过渡

## TerrainTypeService类

### 类定义
```cpp
class DLL_LINKAGE TerrainTypeService : public EntityServiceT<TerrainId, TerrainType>
```

## TerrainTypeHandler类

### 类定义
```cpp
class DLL_LINKAGE TerrainTypeHandler : public CHandlerBase<TerrainId, TerrainType, TerrainType, TerrainTypeService>
```

### 主要方法
- `std::shared_ptr<TerrainType> loadFromJson(const std::string & scope, const JsonNode & json, const std::string & identifier, size_t index) override`: 从JSON加载地形类型
- `const std::vector<std::string> & getTypeNames() const override`: 获取类型名称列表
- `std::vector<JsonNode> loadLegacyData() override`: 加载遗留数据

## 设计特点

- 支持多种地形类型（水域、地面、地下、岩石）
- 提供通行性判断和移动成本计算
- 支持地形过渡和视觉效果
- 集成音频和动画资源管理