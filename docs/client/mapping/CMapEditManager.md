# CMapEditManager

## 概述

`CMapEditManager` 是 VCMI 地图编辑系统的核心管理类。该文件包含了两个主要组件：撤销/重做管理器 (`CMapUndoManager`) 和地图编辑管理器 (`CMapEditManager`)。

## CMapUndoManager 类

### 概述
撤销/重做管理器，负责保存和恢复地图编辑操作的历史记录。

### 公共方法

#### 构造函数和析构函数
```cpp
CMapUndoManager();
~CMapUndoManager();
```

#### undo
```cpp
void undo();
```
撤销最后一次操作。

#### redo
```cpp
void redo();
```
重做最后一次撤销的操作。

#### clearAll
```cpp
void clearAll();
```
清除所有撤销/重做历史记录。

#### getUndoRedoLimit
```cpp
int getUndoRedoLimit() const;
```
获取撤销/重做限制数量。

#### setUndoRedoLimit
```cpp
void setUndoRedoLimit(int value);
```
设置撤销/重做限制数量。设置为0将禁用撤销/重做功能。

#### peekRedo
```cpp
const CMapOperation * peekRedo() const;
```
查看下一个可以重做的操作（不执行）。

#### peekUndo
```cpp
const CMapOperation * peekUndo() const;
```
查看下一个可以撤销的操作（不执行）。

#### addOperation
```cpp
void addOperation(std::unique_ptr<CMapOperation> && operation);
```
添加新的操作到撤销历史中。通常由客户端代码调用。

#### setUndoCallback
```cpp
void setUndoCallback(std::function<void(bool, bool)> functor);
```
设置撤销/重做状态变化时的回调函数。

**回调参数：**
- `bool`: 是否允许撤销
- `bool`: 是否允许重做

### 私有成员
- `undoStack`: 撤销操作栈
- `redoStack`: 重做操作栈
- `undoRedoLimit`: 撤销/重做限制
- `undoCallback`: 状态变化回调

## CMapEditManager 类

### 概述
地图编辑管理器，提供绘制地形、放置对象等地图编辑功能。

### 构造函数和析构函数
```cpp
CMapEditManager(CMap * map);
~CMapEditManager();
```

### 基本方法

#### getMap
```cpp
CMap * getMap();
```
获取当前编辑的地图对象。

### 地形编辑方法

#### clearTerrain
```cpp
void clearTerrain(vstd::RNG * gen);
```
清除地形。地面层填充水，地下层填充岩石。

#### drawTerrain
```cpp
void drawTerrain(TerrainId terType, int decorationsPercentage, vstd::RNG * gen);
```
在当前地形选择区域绘制地形。操作完成后自动清除选择。

**参数：**
- `terType`: 地形类型ID
- `decorationsPercentage`: 装饰物百分比 (0-100)
- `gen`: 随机数生成器

#### drawRoad
```cpp
void drawRoad(RoadId roadType, vstd::RNG * gen);
```
在当前地形选择区域绘制道路。操作完成后自动清除选择。

#### drawRiver
```cpp
void drawRiver(RiverId riverType, vstd::RNG * gen);
```
在当前地形选择区域绘制河流。操作完成后自动清除选择。

### 对象操作方法

#### insertObject
```cpp
void insertObject(std::shared_ptr<CGObjectInstance> obj);
```
在地图上插入单个对象。

#### insertObjects
```cpp
void insertObjects(const std::set<std::shared_ptr<CGObjectInstance>> & objects);
```
在地图上插入多个对象。

#### moveObject
```cpp
void moveObject(CGObjectInstance* obj, const int3 & pos);
```
移动对象到指定位置。

#### removeObject
```cpp
void removeObject(CGObjectInstance* obj);
```
从地图上移除单个对象。

#### removeObjects
```cpp
void removeObjects(std::set<CGObjectInstance*> & objects);
```
从地图上移除多个对象。

### 选择管理方法

#### getTerrainSelection
```cpp
CTerrainSelection & getTerrainSelection();
```
获取地形选择对象，用于选择要编辑的地形区域。

#### getObjectSelection
```cpp
CObjectSelection & getObjectSelection();
```
获取对象选择对象，用于选择要编辑的地图对象。

#### getUndoManager
```cpp
CMapUndoManager & getUndoManager();
```
获取撤销管理器，用于撤销/重做操作。

### 私有方法

#### execute
```cpp
void execute(std::unique_ptr<CMapOperation> && operation);
```
执行地图操作并添加到撤销历史中。

## 工作流程

1. **创建管理器**: 使用目标地图初始化 `CMapEditManager`
2. **选择区域**: 使用 `getTerrainSelection()` 或 `getObjectSelection()` 选择编辑区域
3. **执行操作**: 调用相应的绘制或对象操作方法
4. **撤销/重做**: 通过 `getUndoManager()` 访问撤销功能

## 使用示例

```cpp
// 创建地图编辑管理器
CMapEditManager editManager(map);

// 清除地形
editManager.clearTerrain(rng);

// 绘制草地地形
CTerrainSelection& selection = editManager.getTerrainSelection();
// ... 设置选择区域 ...
editManager.drawTerrain(TerrainId::GRASS, 20, rng);

// 撤销操作
editManager.getUndoManager().undo();
```

## 相关类

- `CMapOperation`: 地图操作基类
- `CMap`: 地图类
- `CTerrainSelection`: 地形选择
- `CObjectSelection`: 对象选择
- `CGObjectInstance`: 地图对象实例