# ConnectionsPlacer

## 源文件

[ConnectionsPlacer.h](https://github.com/vcmi/vcmi/blob/master/lib/rmg/modificators/ConnectionsPlacer.h)

## 类定义

```cpp
class ConnectionsPlacer: public Modificator
```

`ConnectionsPlacer` 是随机地图生成器中的连接放置器，负责在不同区域之间创建连接路径和传送门。

## 继承关系

- 继承自 `Modificator`

## 成员变量

- `std::vector<rmg::ZoneConnection> dConnections` - 待处理的连接列表
- `std::vector<rmg::ZoneConnection> dCompleted` - 已完成的连接列表
- `std::map<TRmgTemplateZoneId, rmg::Tileset> dNeighbourZones` - 邻近区域映射

## 方法

### 主要处理方法

- `void process() override` - 执行连接放置的主要处理逻辑
- `void init() override` - 初始化连接放置器

### 连接添加和处理

- `void addConnection(const rmg::ZoneConnection& connection)` - 添加连接到待处理列表
- `void placeMonolithConnection(const rmg::ZoneConnection& connection)` - 放置单向石碑连接
- `void forcePortalConnection(const rmg::ZoneConnection & connection)` - 强制创建传送门连接
- `void selfSideDirectConnection(const rmg::ZoneConnection & connection)` - 创建本侧直接连接
- `void selfSideIndirectConnection(const rmg::ZoneConnection & connection)` - 创建本侧间接连接
- `void otherSideConnection(const rmg::ZoneConnection & connection)` - 创建对侧连接
- `void createBorder()` - 创建边界

### 辅助方法

- `bool shouldGenerateRoad(const rmg::ZoneConnection& connection) const` - 判断是否应该生成道路
- `void collectNeighbourZones()` - 收集邻近区域
- `std::pair<Zone::Lock, Zone::Lock> lockZones(std::shared_ptr<Zone> otherZone)` - 锁定区域

## 设计特点

- **连接管理**: 管理区域间的各种连接类型（直接、间接、传送门等）
- **状态跟踪**: 维护待处理和已完成的连接列表
- **区域协作**: 与邻近区域协调创建连接
- **路径生成**: 支持道路和传送门的自动生成
- **线程安全**: 通过区域锁定机制确保并发安全