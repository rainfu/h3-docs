<!-- 来源: E:\develop\heroes\vcmi\lib\rmg\RmgMap.h -->
# RmgMap头文件

RmgMap头文件定义了VCMI中随机地图生成器的地图类，用于管理地图生成过程中的所有数据和操作。

## RmgMap类

### 类定义
```cpp
class RmgMap
```

### 构造函数和析构函数
- `RmgMap(const CMapGenOptions& mapGenOptions, IGameInfoCallback * cb)`: 构造函数
- `~RmgMap() = default`: 析构函数

### 地图信息方法
- `int getDecorationsPercentage() const`: 获取装饰百分比
- `CMap & getMap(const CMapGenerator *) const`: 获取地图实例（限制访问）
- `CMapEditManager* getEditManager() const`: 获取编辑管理器
- `const CMapGenOptions& getMapGenOptions() const`: 获取地图生成选项

### 邻居遍历方法
- `void foreach_neighbour(const int3 & pos, const std::function<void(int3 & pos)> & foo) const`: 遍历所有邻居
- `void foreachDirectNeighbour(const int3 & pos, const std::function<void(int3 & pos)> & foo) const`: 遍历直接邻居
- `void foreachDiagonalNeighbour(const int3 & pos, const std::function<void(int3 & pos)> & foo) const`: 遍历对角邻居

### 地块状态检查方法
- `bool isBlocked(const int3 &tile) const`: 检查是否阻挡
- `bool shouldBeBlocked(const int3 &tile) const`: 检查是否应该阻挡
- `bool isPossible(const int3 &tile) const`: 检查是否可能
- `bool isFree(const int3 &tile) const`: 检查是否空闲
- `bool isUsed(const int3 &tile) const`: 检查是否已使用
- `bool isRoad(const int3 &tile) const`: 检查是否道路
- `bool isOnMap(const int3 & tile) const`: 检查是否在地图上

### 地图尺寸方法
- `int levels() const`: 获取层数
- `int width() const`: 获取宽度
- `int height() const`: 获取高度

### 玩家方法
- `PlayerInfo & getPlayer(int playerId)`: 获取玩家信息

### 地块设置方法
- `void setOccupied(const int3 &tile, ETileType state)`: 设置地块占用状态
- `void setRoad(const int3 &tile, RoadId roadType)`: 设置道路

### 地块信息方法
- `TileInfo getTileInfo(const int3 & tile) const`: 获取地块信息
- `TerrainTile & getTile(const int3 & tile) const`: 获取地形地块

### 对象距离方法
- `float getNearestObjectDistance(const int3 &tile) const`: 获取最近对象距离
- `void setNearestObjectDistance(const int3 &tile, float value)`: 设置最近对象距离

### 区域方法
- `TRmgTemplateZoneId getZoneID(const int3& tile) const`: 获取区域ID
- `void setZoneID(const int3& tile, TRmgTemplateZoneId zid)`: 设置区域ID
- `Zones & getZones()`: 获取所有区域
- `Zones getZonesOnLevel(int level) const`: 获取指定层的区域
- `void registerZone(FactionID faction)`: 注册区域
- `ui32 getZoneCount(FactionID faction)`: 获取阵营区域数量
- `ui32 getTotalZoneCount() const`: 获取总区域数量

### 初始化方法
- `void initTiles(CMapGenerator & generator, vstd::RNG & rand)`: 初始化地块
- `void addModificators()`: 添加修改器

### 其他方法
- `bool isAllowedSpell(const SpellID & sid) const`: 检查法术是否允许
- `void dump(bool zoneId) const`: 调试输出

### 私有方法
- `void assertOnMap(const int3 &tile) const`: 断言地块在地图上

### 私有成员
- `std::shared_ptr<MapProxy> mapProxy`: 地图代理
- `Zones zones`: 区域映射
- `std::map<FactionID, ui32> zonesPerFaction`: 按阵营的区域计数
- `ui32 zonesTotal`: 总区域数
- `const CMapGenOptions& mapGenOptions`: 地图生成选项
- `boost::multi_array<TileInfo, 3> tiles`: 地块信息数组
- `boost::multi_array<TRmgTemplateZoneId, 3> zoneColouring`: 区域着色数组

## 类型定义

### Zones类型
```cpp
using Zones = std::map<TRmgTemplateZoneId, std::shared_ptr<Zone>>;
```

### ZonePair类型
```cpp
using ZonePair = std::pair<TRmgTemplateZoneId, std::shared_ptr<Zone>>;
```

### ZoneVector类型
```cpp
using ZoneVector = std::vector<ZonePair>;
```

## 设计特点

- 封装完整的地图生成数据结构
- 提供丰富的地块状态查询接口
- 支持多层地图和区域管理
- 集成修改器系统进行地图生成
- 包含调试和断言功能