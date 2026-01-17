<!-- 来源: E:\develop\heroes\vcmi\lib\rmg\CMapGenerator.h -->
# CMapGenerator头文件

CMapGenerator头文件定义了VCMI中随机地图生成器的核心类，用于生成完整的随机地图。

## Config结构体

### 结构体定义
```cpp
struct Config
```

### 水上宝藏配置
- `std::vector<CTreasureInfo> waterTreasure`: 水上宝藏信息

### 守卫和资源配置
- `int shipyardGuard`: 船坞守卫
- `int mineExtraResources`: 矿井额外资源
- `int minGuardStrength`: 最小守卫强度

### 道路配置
- `std::string defaultRoadType`: 默认道路类型
- `std::string secondaryRoadType`: 次要道路类型

### 宝藏和监狱配置
- `int treasureValueLimit`: 宝藏价值限制
- `std::vector<int> prisonExperience`: 监狱经验值
- `std::vector<int> prisonValues`: 监狱价值
- `std::vector<int> scrollValues`: 卷轴价值

### 潘多拉魔盒配置
- `int pandoraMultiplierGold`: 潘多拉魔盒金币倍数
- `int pandoraMultiplierExperience`: 潘多拉魔盒经验倍数
- `int pandoraMultiplierSpells`: 潘多拉魔盒法术倍数
- `int pandoraSpellSchool`: 潘多拉魔盒法术学派
- `int pandoraSpell60`: 潘多拉魔盒60级法术
- `std::vector<int> pandoraCreatureValues`: 潘多拉魔盒生物价值

### 任务和先知小屋配置
- `std::vector<int> questValues`: 任务价值
- `std::vector<int> questRewardValues`: 任务奖励价值
- `int seerHutValue`: 先知小屋价值

### 性能配置
- `bool singleThread`: 单线程模式

## CMapGenerator类

### 继承关系
```cpp
class DLL_LINKAGE CMapGenerator: public Load::Progress
```

### 构造函数
- `CMapGenerator(CMapGenOptions& mapGenOptions, IGameInfoCallback * cb, int RandomSeed)`: 构造函数

### 析构函数
- `~CMapGenerator()`: 析构函数

### 配置和选项方法
- `const Config & getConfig() const`: 获取配置
- `const CMapGenOptions& getMapGenOptions() const`: 获取地图生成选项

### 地图生成方法
- `std::unique_ptr<CMap> generate()`: 生成地图

### 辅助方法
- `int getNextMonlithIndex()`: 获取下一个巨石索引
- `int getPrisonsRemaining() const`: 获取剩余监狱数量
- `std::shared_ptr<CZonePlacer> getZonePlacer() const`: 获取区域放置器
- `const std::vector<ArtifactID> & getAllPossibleQuestArtifacts() const`: 获取所有可能的任务神器
- `const std::vector<HeroTypeID> getAllPossibleHeroes() const`: 获取所有可能的英雄
- `void banQuestArt(const ArtifactID & id)`: 禁止任务神器
- `void unbanQuestArt(const ArtifactID & id)`: 取消禁止任务神器
- `Zone * getZoneWater() const`: 获取水上区域
- `void addWaterTreasuresInfo()`: 添加水上宝藏信息
- `int getRandomSeed() const`: 获取随机种子

### 私有成员
- `std::unique_ptr<vstd::RNG> rand`: 随机数生成器
- `int randomSeed`: 随机种子
- `CMapGenOptions& mapGenOptions`: 地图生成选项引用
- `Config config`: 配置
- `std::unique_ptr<RmgMap> map`: RMG地图
- `std::shared_ptr<CZonePlacer> placer`: 区域放置器
- `std::vector<rmg::ZoneConnection> connectionsLeft`: 剩余连接
- `int monolithIndex`: 巨石索引
- `std::vector<ArtifactID> questArtifacts`: 任务神器列表

### 私有生成方法
- `void loadConfig()`: 加载配置
- `MetaString getMapDescription() const`: 获取地图描述
- `void initPrisonsRemaining()`: 初始化剩余监狱
- `void initQuestArtsRemaining()`: 初始化剩余任务神器
- `void addPlayerInfo()`: 添加玩家信息
- `void addHeaderInfo()`: 添加头部信息
- `void genZones()`: 生成区域
- `void fillZones()`: 填充区域

## 设计特点

- 继承自Load::Progress，支持进度报告
- 包含完整的地图生成流水线（区域生成、填充、对象放置）
- 支持高度可配置的宝藏、守卫和奖励系统
- 提供任务神器和监狱的管理机制
- 支持单线程和多线程生成模式
- 使用随机数生成器确保可重现的结果