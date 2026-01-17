<!-- 来源: E:\develop\heroes\vcmi\lib\GameConstants.h -->
# GameConstants头文件

GameConstants头文件定义了VCMI游戏中的常量和类型别名。

## 包含的头文件

- `"constants/NumericConstants.h"`: 数值常量
- `"constants/Enumerations.h"`: 枚举定义
- `"constants/EntityIdentifiers.h"`: 实体标识符

## 类型别名

### TExpType
```cpp
using TExpType = si64;
```
经验值类型，使用64位有符号整数。

### TQuantity
```cpp
using TQuantity = si32;
```
数量类型，使用32位有符号整数。

### TRmgTemplateZoneId
```cpp
using TRmgTemplateZoneId = int;
```
随机地图生成器模板区域ID类型。

## 设计特点

- 提供统一的类型定义
- 包含所有游戏常量相关的头文件
- 为经验值和数量等重要概念定义专用类型