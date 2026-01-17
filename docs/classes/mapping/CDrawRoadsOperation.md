# CDrawRoadsOperation

## 概述

`CDrawRoadsOperation` 是 VCMI 地图编辑系统中的道路绘制操作类。该文件包含了一个通用的线条绘制模板类 `CDrawLinesOperation` 以及两个具体实现：道路绘制和河流绘制操作。

## 类层次结构

```
CMapOperation
  └── CDrawLinesOperation<T>
      ├── CDrawRoadsOperation (RoadId)
      └── CDrawRiversOperation (RiverId)
```

## CDrawLinesOperation 模板类

### 模板参数
- `T`: 线条类型，可以是 `RoadId` 或 `RiverId`

### 公共方法

#### execute
```cpp
void execute() override;
```
执行绘制操作。

#### undo
```cpp
void undo() override;
```
撤销绘制操作。

#### redo
```cpp
void redo() override;
```
重做绘制操作。

### 保护成员

#### LinePattern 结构体
```cpp
struct LinePattern
{
    std::string data[9];           // 3x3图案数据
    std::pair<int, int> roadMapping;   // 道路映射
    std::pair<int, int> riverMapping;  // 河流映射
    bool hasHFlip;                 // 是否支持水平翻转
    bool hasVFlip;                 // 是否支持垂直翻转
};
```
定义线条图案的结构，包含3x3的图案数据和映射信息。

#### ValidationResult 结构体
```cpp
struct ValidationResult
{
    ValidationResult(bool result): result(result), flip(0){};
    bool result;  // 验证结果
    int flip;     // 翻转类型
};
```
图案验证结果。

### 纯虚方法

#### executeTile
```cpp
virtual void executeTile(TerrainTile & tile, T type) = 0;
```
在指定地形块上执行线条绘制。

#### canApplyPattern
```cpp
virtual bool canApplyPattern(const LinePattern & pattern) const = 0;
```
检查是否可以应用指定的图案。

#### needUpdateTile
```cpp
virtual bool needUpdateTile(const TerrainTile & tile) const = 0;
```
检查地形块是否需要更新。

#### tileHasSomething
```cpp
virtual bool tileHasSomething(const int3 & pos) const = 0;
```
检查指定位置是否有内容。

#### updateTile
```cpp
virtual void updateTile(TerrainTile & tile, const LinePattern & pattern, const int flip) = 0;
```
使用指定图案更新地形块。

#### getIdentifier
```cpp
virtual T getIdentifier(TerrainTile & tile) const = 0;
```
获取地形块的标识符。

### 静态成员

#### patterns
```cpp
static const std::vector<LinePattern> patterns;
```
预定义的线条图案集合。

### 私有方法

#### drawLines
```cpp
void drawLines(CTerrainSelection selection, T type);
```
绘制线条的核心实现。

## CDrawRoadsOperation 类

### 构造函数
```cpp
CDrawRoadsOperation(CMap * map, const CTerrainSelection & terrainSel, RoadId roadType, vstd::RNG * gen);
```

**参数：**
- `map`: 目标地图
- `terrainSel`: 地形选择区域
- `roadType`: 道路类型ID
- `gen`: 随机数生成器

### getLabel
```cpp
std::string getLabel() const override;
```
获取操作的标签，用于撤销/重做系统。

## CDrawRiversOperation 类

类似 `CDrawRoadsOperation`，但用于绘制河流。

### 构造函数
```cpp
CDrawRiversOperation(CMap * map, const CTerrainSelection & terrainSel, RiverId roadType, vstd::RNG * gen);
```

## 工作原理

1. **图案系统**: 使用预定义的3x3图案来创建连续的道路/河流
2. **智能连接**: 根据周围地形自动选择合适的连接图案
3. **翻转支持**: 支持水平和垂直翻转以适应不同方向
4. **撤销支持**: 完整的撤销/重做功能
5. **地形验证**: 在应用图案前验证地形的适用性

## 使用示例

```cpp
// 创建道路绘制操作
CTerrainSelection selection = getSelectedTerrain();
CDrawRoadsOperation* op = new CDrawRoadsOperation(map, selection, RoadId::DIRT, rng);

// 执行操作
op->execute();

// 可以撤销
op->undo();
```

## 相关类

- `CMapOperation`: 地图操作基类
- `CTerrainSelection`: 地形选择
- `TerrainTile`: 地形块
- `RoadId`: 道路ID类型
- `RiverId`: 河流ID类型