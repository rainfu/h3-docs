# CMapOperation

## 概述

`CMapOperation` 是 VCMI 地图编辑系统的操作基类。该文件定义了完整的地图操作框架，支持撤销/重做功能，包括地形绘制、对象操作等各种地图编辑操作。

## 类层次结构

```
CMapOperation (抽象基类)
├── CComposedOperation (复合操作)
├── CDrawTerrainOperation (绘制地形)
├── CClearTerrainOperation (清除地形)
├── CInsertObjectOperation (插入对象)
├── CMoveObjectOperation (移动对象)
└── CRemoveObjectOperation (移除对象)
```

## CMapOperation 基类

### 概述
所有地图操作的抽象基类，定义了操作的基本接口。

### 构造函数
```cpp
explicit CMapOperation(CMap * map);
```

### 纯虚方法

#### execute
```cpp
virtual void execute() = 0;
```
执行操作。

#### undo
```cpp
virtual void undo() = 0;
```
撤销操作。

#### redo
```cpp
virtual void redo() = 0;
```
重做操作。

#### getLabel
```cpp
virtual std::string getLabel() const = 0;
```
获取操作的显示名称，用于撤销/重做历史。

### 常量定义

#### 翻转模式常量
```cpp
static const int FLIP_PATTERN_HORIZONTAL = 1;
static const int FLIP_PATTERN_VERTICAL = 2;
static const int FLIP_PATTERN_BOTH = 3;
```
图案翻转模式定义。

### 保护方法

#### extendTileAround
```cpp
MapRect extendTileAround(const int3 & centerPos) const;
```
扩展指定位置周围的地块矩形。

#### extendTileAroundSafely
```cpp
MapRect extendTileAroundSafely(const int3 & centerPos) const;
```
安全地扩展地块矩形，不会超出地图边界。

## CComposedOperation 类

### 概述
复合操作类，可以包含多个子操作。

### 构造函数
```cpp
CComposedOperation(CMap * map);
```

### 公共方法

#### addOperation
```cpp
void addOperation(std::unique_ptr<CMapOperation> && operation);
```
添加子操作到复合操作中。

## CDrawTerrainOperation 类

### 概述
绘制地形操作，支持智能地形过渡和装饰物生成。

### 构造函数
```cpp
CDrawTerrainOperation(CMap * map, CTerrainSelection terrainSel, TerrainId terType, int decorationsPercentage, vstd::RNG * gen);
```

**参数：**
- `terrainSel`: 要绘制地形的选择区域
- `terType`: 地形类型ID
- `decorationsPercentage`: 装饰物百分比 (0-100)
- `gen`: 随机数生成器

### 私有结构体

#### ValidationResult
```cpp
struct ValidationResult
{
    bool result;
    std::string transitionReplacement;
    int flip;
};
```
地形视图验证结果。

#### InvalidTiles
```cpp
struct InvalidTiles
{
    std::set<int3> foreignTiles;
    std::set<int3> nativeTiles;
    bool centerPosValid;
};
```
无效地块信息。

### 核心功能

1. **智能过渡**: 根据周围地形自动选择合适的过渡图案
2. **装饰物生成**: 在地形上随机生成装饰物
3. **视图更新**: 自动更新受影响的地形视图
4. **撤销支持**: 保存操作前的地形状态

## CClearTerrainOperation 类

### 概述
清除并初始化地形操作。

### 构造函数
```cpp
CClearTerrainOperation(CMap * map, vstd::RNG * gen);
```

## 对象操作类

### CInsertObjectOperation
```cpp
CInsertObjectOperation(CMap * map, std::shared_ptr<CGObjectInstance> obj);
```
插入地图对象操作。

### CMoveObjectOperation
```cpp
CMoveObjectOperation(CMap * map, CGObjectInstance * obj, const int3 & targetPosition);
```
移动地图对象操作。

### CRemoveObjectOperation
```cpp
CRemoveObjectOperation(CMap * map, CGObjectInstance * obj);
```
移除地图对象操作。

## 操作执行流程

1. **创建操作**: 使用相应的构造函数创建操作对象
2. **执行操作**: 调用 `execute()` 方法
3. **撤销操作**: 调用 `undo()` 方法恢复状态
4. **重做操作**: 调用 `redo()` 方法重新执行

## 撤销/重做机制

每个操作都维护必要的状态信息以支持撤销：

- **地形操作**: 保存每个地块的原始地形类型
- **对象操作**: 保存对象的状态和位置信息
- **复合操作**: 依次撤销/重做所有子操作

## 使用示例

```cpp
// 创建地形绘制操作
CTerrainSelection selection = getSelectedArea();
auto operation = std::make_unique<CDrawTerrainOperation>(
    map, selection, TerrainId::GRASS, 20, rng);

// 执行操作
operation->execute();

// 撤销操作
operation->undo();

// 添加到撤销管理器
undoManager.addOperation(std::move(operation));
```

## 相关类

- `CMap`: 地图类
- `CTerrainSelection`: 地形选择
- `CGObjectInstance`: 地图对象实例
- `CMapUndoManager`: 撤销管理器
- `TerrainId`: 地形ID类型