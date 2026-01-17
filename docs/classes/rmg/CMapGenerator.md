# CMapGenerator

## 概述

`CMapGenerator` 类是 VCMI 随机地图生成器（RMG）的核心引擎。该类负责协调整个地图生成过程，包括区域划分、对象放置、连接建立和配置管理。它继承自 `Load::Progress` 以提供生成进度反馈。

## 类定义

```cpp
class DLL_LINKAGE CMapGenerator: public Load::Progress
```

## Config 内部结构体

### 概述
地图生成器的配置参数结构体。

### 水域宝藏配置
```cpp
std::vector<CTreasureInfo> waterTreasure;
```
水域宝藏信息列表。

### 守卫配置
```cpp
int shipyardGuard;      // 船坞守卫强度
int mineExtraResources; // 矿井额外资源
int minGuardStrength;   // 最小守卫强度
```

### 道路配置
```cpp
std::string defaultRoadType;    // 默认道路类型
std::string secondaryRoadType;  // 次要道路类型
```

### 宝藏和奖励配置
```cpp
int treasureValueLimit;  // 宝藏价值限制
std::vector<int> prisonExperience;     // 监狱经验值
std::vector<int> prisonValues;         // 监狱价值
std::vector<int> scrollValues;         // 卷轴价值
int pandoraMultiplierGold;             // 潘多拉金币倍数
int pandoraMultiplierExperience;       // 潘多拉经验倍数
int pandoraMultiplierSpells;           // 潘多拉法术倍数
int pandoraSpellSchool;                // 潘多拉法术学派
int pandoraSpell60;                    // 潘多拉60级法术
std::vector<int> pandoraCreatureValues; // 潘多拉生物价值
std::vector<int> questValues;           // 任务价值
std::vector<int> questRewardValues;     // 任务奖励价值
int seerHutValue;                      // 先知小屋价值
```

### 性能配置
```cpp
bool singleThread;  // 是否单线程
```

## 构造函数

```cpp
explicit CMapGenerator(CMapGenOptions& mapGenOptions, IGameInfoCallback * cb, int RandomSeed);
```
构造地图生成器。

**参数：**
- `mapGenOptions`: 地图生成选项
- `cb`: 游戏信息回调
- `RandomSeed`: 随机种子

## 析构函数

```cpp
~CMapGenerator();
```
析构函数（因 std::unique_ptr 而必需）。

## 配置访问

### getConfig
```cpp
const Config & getConfig() const;
```
获取配置的常量引用。

### getMapGenOptions
```cpp
const CMapGenOptions& getMapGenOptions() const;
```
获取地图生成选项的常量引用。

## 主要生成方法

### generate
```cpp
std::unique_ptr<CMap> generate();
```
生成完整的随机地图。

**返回值：** 生成的地图对象的唯一指针

## 状态查询方法

### getNextMonlithIndex
```cpp
int getNextMonlithIndex();
```
获取下一个单石索引。

### getPrisonsRemaining
```cpp
int getPrisonsRemaining() const;
```
获取剩余监狱数量。

### getZonePlacer
```cpp
std::shared_ptr<CZonePlacer> getZonePlacer() const;
```
获取区域放置器。

### getAllPossibleQuestArtifacts
```cpp
const std::vector<ArtifactID> & getAllPossibleQuestArtifacts() const;
```
获取所有可能的任务神器。

### getAllPossibleHeroes
```cpp
const std::vector<HeroTypeID> getAllPossibleHeroes() const;
```
获取所有可能的英雄。

### getZoneWater
```cpp
Zone * getZoneWater() const;
```
获取水域区域。

### getRandomSeed
```cpp
int getRandomSeed() const;
```
获取随机种子。

## 神器管理

### banQuestArt
```cpp
void banQuestArt(const ArtifactID & id);
```
禁止指定的任务神器。

### unbanQuestArt
```cpp
void unbanQuestArt(const ArtifactID & id);
```
取消禁止指定的任务神器。

## 水域宝藏

### addWaterTreasuresInfo
```cpp
void addWaterTreasuresInfo();
```
添加水域宝藏信息。

## 私有成员

### 核心组件
```cpp
std::unique_ptr<vstd::RNG> rand;        // 随机数生成器
int randomSeed;                         // 随机种子
CMapGenOptions& mapGenOptions;          // 地图生成选项
Config config;                          // 配置
std::unique_ptr<RmgMap> map;            // RMG地图
std::shared_ptr<CZonePlacer> placer;    // 区域放置器
```

### 连接管理
```cpp
std::vector<rmg::ZoneConnection> connectionsLeft;  // 剩余连接
```

### 索引管理
```cpp
int monolithIndex;                      // 单石索引
std::vector<ArtifactID> questArtifacts; // 任务神器列表
```

## 私有生成方法

### loadConfig
```cpp
void loadConfig();
```
加载配置。

### getMapDescription
```cpp
MetaString getMapDescription() const;
```
获取地图描述。

### 初始化方法
```cpp
void initPrisonsRemaining();    // 初始化剩余监狱
void initQuestArtsRemaining();  // 初始化剩余任务神器
void addPlayerInfo();           // 添加玩家信息
void addHeaderInfo();           // 添加头部信息
```

### 生成阶段
```cpp
void genZones();   // 生成区域
void fillZones();  // 填充区域
```

## 工作原理

### 生成流程
地图生成按以下阶段进行：

1. **初始化**: 加载配置，设置随机种子
2. **区域生成**: 创建和划分地图区域
3. **区域填充**: 在每个区域内放置对象
4. **连接建立**: 创建区域间的路径和连接
5. **后处理**: 验证和优化生成的地图

### 配置系统
支持详细的生成参数配置：

```json
{
  "waterTreasure": [...],
  "shipyardGuard": 1500,
  "defaultRoadType": "dirt",
  "treasureValueLimit": 5000,
  "singleThread": false
}
```

### 随机性控制
使用可重现的随机数生成：

```cpp
CMapGenerator generator(options, callback, seed);
// 使用相同种子会生成相同地图
auto map1 = generator.generate();
auto map2 = generator.generate(); // 相同结果
```

### 进度报告
继承 `Load::Progress` 提供生成进度：

```cpp
class MyProgressListener : public Load::Progress
{
    void progress(float percent) override
    {
        std::cout << "Generation: " << percent << "%" << std::endl;
    }
};
```

## 使用示例

```cpp
// 创建生成选项
CMapGenOptions options;
options.setWidth(72);
options.setHeight(72);
options.setPlayers(2);

// 创建生成器
CMapGenerator generator(options, gameCallback, 12345);

// 生成地图
auto map = generator.generate();

// 获取配置信息
const auto& config = generator.getConfig();
int guardStrength = config.shipyardGuard;

// 查询状态
auto artifacts = generator.getAllPossibleQuestArtifacts();
auto heroes = generator.getAllPossibleHeroes();
```

## 扩展机制

### 修改器系统
通过区域的修改器系统扩展功能：

```cpp
// 在区域中添加自定义修改器
zone.addModificator<MyCustomModificator>();
```

### 配置覆盖
支持运行时配置覆盖：

```cpp
auto& config = generator.getConfig();
// 修改配置
config.minGuardStrength = 2000;
```

## 性能优化

- **多线程支持**: 可配置单线程或多线程生成
- **内存管理**: 使用智能指针管理资源
- **缓存优化**: 重复计算结果缓存
- **进度反馈**: 实时生成进度报告

## 相关类

- `CMapGenOptions`: 地图生成选项
- `RmgMap`: RMG地图类
- `Zone`: 区域类
- `CZonePlacer`: 区域放置器
- `Load::Progress`: 进度报告接口