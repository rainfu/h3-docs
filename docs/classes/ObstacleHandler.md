<!-- 来源: E:\develop\heroes\vcmi\lib\ObstacleHandler.h -->
# ObstacleHandler头文件

ObstacleHandler头文件定义了VCMI中战场障碍物管理的相关类。

## ObstacleInfo类

### 类定义
```cpp
class DLL_LINKAGE ObstacleInfo : public EntityT<Obstacle>
```

### 构造函数
- `ObstacleInfo()`: 默认构造函数
- `ObstacleInfo(Obstacle obstacle, std::string identifier)`: 构造指定障碍物和标识符

### 主要属性
- `Obstacle obstacle`: 障碍物枚举值
- `si32 iconIndex`: 图标索引
- `std::string modScope`: 模组范围
- `std::string identifier`: 标识符
- `AudioPath appearSound`: 出现音效
- `AnimationPath appearAnimation`: 出现动画
- `AnimationPath animation`: 动画
- `std::vector<TerrainId> allowedTerrains`: 允许的地形
- `std::vector<std::string> allowedSpecialBfields`: 允许的特殊战场
- `bool isAbsoluteObstacle`: 是否为绝对障碍物
- `bool isForegroundObstacle`: 是否为前景障碍物
- `si32 width`: 宽度
- `si32 height`: 高度
- `std::vector<si16> blockedTiles`: 被阻塞的瓦片偏移

### 重写方法
- `int32_t getIndex() const override`: 获取索引
- `int32_t getIconIndex() const override`: 获取图标索引
- `std::string getJsonKey() const override`: 获取JSON键
- `std::string getModScope() const override`: 获取模组范围
- `std::string getNameTranslated() const override`: 获取翻译后名称
- `std::string getNameTextID() const override`: 获取名称文本ID
- `void registerIcons(const IconRegistar & cb) const override`: 注册图标
- `Obstacle getId() const override`: 获取障碍物ID

### 主要方法
- `BattleHexArray getBlocked(const BattleHex & hex) const`: 获取被障碍物阻塞的六角格
- `bool isAppropriate(const TerrainId terrainType, const BattleField & specialBattlefield) const`: 检查是否适合放置

## ObstacleService类

### 类定义
```cpp
class DLL_LINKAGE ObstacleService : public EntityServiceT<Obstacle, ObstacleInfo>
```

障碍物服务类，继承自实体服务模板类。

## ObstacleHandler类

### 类定义
```cpp
class ObstacleHandler: public CHandlerBase<Obstacle, ObstacleInfo, ObstacleInfo, ObstacleService>
```

### 主要方法
- `std::shared_ptr<ObstacleInfo> loadFromJson(const std::string & scope, const JsonNode & json, const std::string & identifier, size_t index) override`: 从JSON加载障碍物信息
- `const std::vector<std::string> & getTypeNames() const override`: 获取类型名称列表
- `std::vector<JsonNode> loadLegacyData() override`: 加载遗留数据

## 相关类型

- `Obstacle`: 障碍物枚举类型
- `BattleHexArray`: 战场六角格数组
- `TerrainId`: 地形ID类型
- `BattleField`: 战场类型