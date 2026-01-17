# MapReaderH3M

## 概述

`MapReaderH3M` 类是 VCMI 的 H3M (Heroes 3 Map) 格式二进制读取器。它提供了从 H3M 文件读取各种游戏数据类型的方法，支持不同版本格式的兼容性处理和标识符重新映射。

## 类定义

```cpp
class MapReaderH3M
```

## 构造函数

```cpp
explicit MapReaderH3M(CInputStream * stream);
```
使用输入流初始化读取器。

## 配置方法

### setFormatLevel
```cpp
void setFormatLevel(const MapFormatFeaturesH3M & features);
```
设置地图格式特性，用于确定数据结构的大小和可用性。

### setIdentifierRemapper
```cpp
void setIdentifierRemapper(const MapIdentifiersH3M & remapper);
```
设置标识符重新映射器，用于转换不同版本间的ID。

## 游戏对象ID读取方法

### 神器读取

#### readArtifact
```cpp
ArtifactID readArtifact();
```
读取神器ID（根据格式自动选择位宽）。

#### readArtifact8
```cpp
ArtifactID readArtifact8();
```
读取8位神器ID。

#### readArtifact32
```cpp
ArtifactID readArtifact32();
```
读取32位神器ID。

### 生物读取

#### readCreature32
```cpp
CreatureID readCreature32();
```
读取32位生物ID。

#### readCreature
```cpp
CreatureID readCreature();
```
读取生物ID（根据格式自动选择位宽）。

### 英雄读取

#### readHero
```cpp
HeroTypeID readHero();
```
读取英雄类型ID。

#### readHeroPortrait
```cpp
HeroTypeID readHeroPortrait();
```
读取英雄肖像ID。

### 地形和道路读取

#### readTerrain
```cpp
TerrainId readTerrain();
```
读取地形ID。

#### readRoad
```cpp
RoadId readRoad();
```
读取道路ID。

#### readRiver
```cpp
RiverId readRiver();
```
读取河流ID。

### 技能和法术读取

#### readPrimary
```cpp
PrimarySkill readPrimary();
```
读取主要技能。

#### readSkill
```cpp
SecondarySkill readSkill();
```
读取二级技能。

#### readSpell
```cpp
SpellID readSpell();
```
读取法术ID（根据格式自动选择位宽）。

#### readSpell16
```cpp
SpellID readSpell16();
```
读取16位法术ID。

#### readSpell32
```cpp
SpellID readSpell32();
```
读取32位法术ID。

### 其他读取

#### readGameResID
```cpp
GameResID readGameResID();
```
读取游戏资源ID。

#### readPlayer
```cpp
PlayerColor readPlayer();
```
读取玩家颜色（根据格式自动选择位宽）。

#### readPlayer32
```cpp
PlayerColor readPlayer32();
```
读取32位玩家颜色。

## 位掩码读取方法

### readBitmaskBuildings
```cpp
void readBitmaskBuildings(std::set<BuildingID> & dest, std::optional<FactionID> faction);
```
读取建筑位掩码到集合中。

### readBitmaskFactions
```cpp
void readBitmaskFactions(std::set<FactionID> & dest, bool invert);
```
读取派系位掩码。

### readBitmaskPlayers
```cpp
void readBitmaskPlayers(std::set<PlayerColor> & dest, bool invert);
```
读取玩家位掩码。

### readBitmaskResources
```cpp
void readBitmaskResources(std::set<GameResID> & dest, bool invert);
```
读取资源位掩码。

### readBitmaskHeroClassesSized
```cpp
void readBitmaskHeroClassesSized(std::set<HeroClassID> & dest, bool invert);
```
读取英雄职业位掩码（带大小信息）。

### readBitmaskHeroes
```cpp
void readBitmaskHeroes(std::set<HeroTypeID> & dest, bool invert);
```
读取英雄位掩码。

### readBitmaskHeroesSized
```cpp
void readBitmaskHeroesSized(std::set<HeroTypeID> & dest, bool invert);
```
读取英雄位掩码（带大小信息）。

### readBitmaskArtifacts
```cpp
void readBitmaskArtifacts(std::set<ArtifactID> & dest, bool invert);
```
读取神器位掩码。

### readBitmaskArtifactsSized
```cpp
void readBitmaskArtifactsSized(std::set<ArtifactID> & dest, bool invert);
```
读取神器位掩码（带大小信息）。

### readBitmaskSpells
```cpp
void readBitmaskSpells(std::set<SpellID> & dest, bool invert);
```
读取法术位掩码。

### readBitmaskSkills
```cpp
void readBitmaskSkills(std::set<SecondarySkill> & dest, bool invert);
```
读取技能位掩码。

**参数说明：**
- `dest`: 输出集合
- `invert`: 是否反转位掩码（true表示禁用的项目，false表示启用的项目）

## 基础数据类型读取

### readInt3
```cpp
int3 readInt3();
```
读取三维坐标。

### readBool
```cpp
bool readBool();
```
读取布尔值。

### 整数类型读取

#### readUInt8
```cpp
uint8_t readUInt8();
```
读取无符号8位整数。

#### readInt8
```cpp
int8_t readInt8();
```
读取有符号8位整数。

#### readInt8Checked
```cpp
int8_t readInt8Checked(int8_t lowerLimit, int8_t upperLimit);
```
读取有符号8位整数并检查范围。

#### readInt16
```cpp
int16_t readInt16();
```
读取16位整数。

#### readUInt16
```cpp
uint16_t readUInt16();
```
读取无符号16位整数。

#### readUInt32
```cpp
uint32_t readUInt32();
```
读取32位无符号整数。

#### readInt32
```cpp
int32_t readInt32();
```
读取32位整数。

### 字符串和资源读取

#### readBaseString
```cpp
std::string readBaseString();
```
读取基础字符串。

#### readResources
```cpp
void readResources(TResources & resources);
```
读取资源集合。

### 对象模板读取

#### readObjectTemplate
```cpp
std::shared_ptr<ObjectTemplate> readObjectTemplate();
```
读取对象模板。

#### remapTemplate
```cpp
void remapTemplate(ObjectTemplate & tmpl);
```
重新映射对象模板。

### 跳过数据方法

#### skipUnused
```cpp
void skipUnused(size_t amount);
```
跳过未使用的字节。

#### skipZero
```cpp
void skipZero(size_t amount);
```
跳过零填充的字节。

## 私有方法

### remapIdentifier
```cpp
template<class Identifier>
Identifier remapIdentifier(const Identifier & identifier);
```
重新映射标识符。

### readBitmask
```cpp
template<class Identifier>
void readBitmask(std::set<Identifier> & dest, int bytesToRead, int objectsToRead, bool invert);
```
通用位掩码读取方法。

## 私有成员变量

### features
```cpp
MapFormatFeaturesH3M features;
```
地图格式特性。

### remapper
```cpp
MapIdentifiersH3M remapper;
```
标识符重新映射器。

### reader
```cpp
std::unique_ptr<CBinaryReader> reader;
```
二进制读取器。

## 工作原理

### 数据读取流程
1. **初始化**: 使用输入流创建读取器
2. **配置**: 设置格式特性和标识符映射器
3. **读取数据**: 调用相应的读取方法解析二进制数据
4. **标识符转换**: 自动将读取的ID转换为VCMI内部格式
5. **验证**: 对读取的数据进行范围和有效性检查

### 位掩码处理
位掩码用于表示集合数据：

```cpp
// 读取允许的英雄列表
std::set<HeroTypeID> allowedHeroes;
reader.readBitmaskHeroes(allowedHeroes, false); // false = 启用的项目
```

### 版本兼容性
读取器根据格式特性自动选择合适的数据大小：

- **旧版本**: 使用8位或16位ID
- **新版本**: 使用32位ID
- **自动检测**: 根据格式特性选择读取方法

## 使用示例

```cpp
// 创建读取器
MapReaderH3M reader(stream);

// 配置格式和映射器
reader.setFormatLevel(features);
reader.setIdentifierRemapper(remapper);

// 读取各种数据
auto heroId = reader.readHero();
auto creatureId = reader.readCreature();
auto terrainId = reader.readTerrain();

// 读取位掩码
std::set<ArtifactID> artifacts;
reader.readBitmaskArtifacts(artifacts, false);

// 读取坐标
int3 position = reader.readInt3();
```

## 相关类

- `CBinaryReader`: 二进制读取器
- `MapFormatFeaturesH3M`: 格式特性
- `MapIdentifiersH3M`: 标识符映射器
- `CInputStream`: 输入流接口