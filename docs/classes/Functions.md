<!-- 来源: E:\develop\heroes\vcmi\lib\rmg\Functions.h -->
# Functions头文件

Functions头文件定义了VCMI中随机地图生成器的工具函数和异常类。

## rmgException异常类

### 类定义
```cpp
class rmgException : public std::exception
```

### 构造函数
- `explicit rmgException(const std::string& _Message)`: 构造函数

### 主要方法
- `const char *what() const noexcept override`: 获取异常消息

## 工具函数

### replaceWithCurvedPath函数
```cpp
void replaceWithCurvedPath(rmg::Path & path, Zone & zone, const int3 & src, bool onlyStraight = true)
```
用曲线路径替换路径。

### collectDistantTiles函数
```cpp
rmg::Tileset collectDistantTiles(const Zone & zone, int distance)
```
收集区域中距离指定距离的地块。

### chooseRandomAppearance函数
```cpp
int chooseRandomAppearance(vstd::RNG & generator, si32 ObjID, TerrainId terrain)
```
为指定对象ID和地形选择随机外观。

## 设计特点

- 提供RMG相关的工具函数
- 包含自定义异常类用于错误处理
- 支持路径生成和地块收集
- 提供对象外观随机化功能