# MapFeaturesH3M

## 概述

`MapFeaturesH3M` 结构体定义了不同 Heroes 3 地图格式 (H3M) 的特性信息。它存储了各种游戏元素（如派系、英雄、神器等）的数量限制和可用性标志，用于地图加载和验证。

## 结构体定义

```cpp
struct MapFormatFeaturesH3M
```

## 静态工厂方法

### find
```cpp
static MapFormatFeaturesH3M find(EMapFormat format, uint32_t hotaVersion);
```
根据地图格式和HOTA版本查找对应的特性信息。

**参数：**
- `format`: 地图格式枚举
- `hotaVersion`: HOTA版本号

**返回值：** 对应的格式特性结构体

### 私有工厂方法
```cpp
static MapFormatFeaturesH3M getFeaturesROE();   // 征服者版本特性
static MapFormatFeaturesH3M getFeaturesAB();    // 地下城与城堡版本特性
static MapFormatFeaturesH3M getFeaturesSOD();   // 阴影之城版本特性
static MapFormatFeaturesH3M getFeaturesCHR();   // 地下城英雄版本特性
static MapFormatFeaturesH3M getFeaturesWOG();   // 世界之冠版本特性
static MapFormatFeaturesH3M getFeaturesHOTA(uint32_t hotaVersion); // HOTA版本特性
```

## 元素数量定义

### 位掩码字节数
```cpp
int factionsBytes;      // 派系位掩码字节数
int heroesBytes;        // 英雄位掩码字节数
int artifactsBytes;     // 神器位掩码字节数
int resourcesBytes;     // 资源位掩码字节数
int skillsBytes;        // 技能位掩码字节数
int spellsBytes;        // 法术位掩码字节数
int buildingsBytes;     // 建筑位掩码字节数
```

### 元素总数
```cpp
int factionsCount;           // 派系总数
int heroesCount;             // 英雄总数
int heroesPortraitsCount;    // 英雄肖像总数
int artifactsCount;          // 神器总数
int resourcesCount;          // 资源总数
int creaturesCount;          // 生物总数
int spellsCount;             // 法术总数
int skillsCount;             // 技能总数
int terrainsCount;           // 地形总数
int roadsCount;              // 道路总数
int riversCount;             // 河流总数
int artifactSlotsCount;      // 神器槽位总数
int buildingsCount;          // 建筑总数
```

## 无效标识符

```cpp
int heroIdentifierInvalid;       // 无效英雄标识符 (通常为-1)
int artifactIdentifierInvalid;   // 无效神器标识符 (通常为-1)
int creatureIdentifierInvalid;   // 无效生物标识符 (通常为-1)
int spellIdentifierInvalid;      // 无效法术标识符 (通常为-1)
```

## 版本可用性标志

```cpp
bool levelROE;     // 征服者版本可用
bool levelAB;      // 地下城与城堡版本可用
bool levelSOD;     // 阴影之城版本可用
bool levelCHR;     // 地下城英雄版本可用
bool levelWOG;     // 世界之冠版本可用
bool levelHOTA0;   // HOTA 1.0版本可用
bool levelHOTA1;   // HOTA 1.1版本可用
bool levelHOTA2;   // HOTA 1.2版本可用
bool levelHOTA3;   // HOTA 1.6.0版本可用
bool levelHOTA5;   // HOTA 1.7.0版本可用
bool levelHOTA6;   // HOTA 1.7.1版本可用
bool levelHOTA7;   // HOTA 1.7.2版本可用
bool levelHOTA8;   // HOTA 1.7.3版本可用
```

## 版本特性说明

### ROE (Restoration of Erathia)
- 基础版本，包含核心游戏元素
- 有限的派系、英雄和神器

### AB (Armageddon's Blade)
- 增加了地下城和城堡派系
- 扩展了英雄和神器池

### SOD (Shadow of Death)
- 完整的游戏内容
- 所有8个派系可用
- 完整的英雄、神器和法术列表

### CHR (Chronicles)
- 地下城英雄扩展包内容
- 增加了新的地下城相关内容

### WOG (Wake of Gods)
- 世界之冠扩展包
- 增加了新的派系和游戏元素

### HOTA (Horn of the Abyss)
- 多个版本迭代
- 不断增加新的内容和平衡调整

## 使用场景

`MapFormatFeaturesH3M` 主要用于：

1. **地图加载验证**: 确保地图内容不超过版本限制
2. **兼容性检查**: 验证地图元素在目标版本中的可用性
3. **数据解析**: 根据版本确定位掩码和数组的大小
4. **格式转换**: 在不同版本之间转换地图时使用

## 使用示例

```cpp
// 获取特定格式的特性
auto features = MapFormatFeaturesH3M::find(EMapFormat::SOD, 0);

// 检查英雄数量限制
if (heroCount > features.heroesCount) {
    // 处理超出限制的情况
}

// 验证神器是否在当前版本中可用
if (artifactId >= features.artifactsCount) {
    // 无效神器ID
}
```

## 数据流

1. **版本检测**: 根据地图头信息确定格式和版本
2. **特性查询**: 使用 `find()` 方法获取对应的特性结构体
3. **验证应用**: 在加载和处理地图数据时应用这些限制
4. **错误处理**: 对超出限制的数据进行适当处理

## 相关类

- `EMapFormat`: 地图格式枚举
- `CMapHeader`: 地图头信息类
- `CMapLoader`: 地图加载器类