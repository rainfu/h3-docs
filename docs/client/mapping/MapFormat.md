# MapFormat

## 概述

`MapFormat.h` 定义了 VCMI 支持的地图格式枚举。这个枚举用于标识不同版本的 Heroes 3 地图文件格式，以及 VCMI 自己的原生格式。

## 枚举定义

```cpp
enum class EMapFormat : uint8_t
```

## 枚举值

### INVALID
```cpp
INVALID = 0
```
无效格式，用于错误处理。

### ROE (Restoration of Erathia)
```cpp
ROE = 0x0e  // 14 (十进制)
```
征服者版本的地图格式。Heroes 3 的基础版本。

### AB (Armageddon's Blade)
```cpp
AB = 0x15   // 21 (十进制)
```
地下城与城堡版本的地图格式。第一个扩展包。

### SOD (Shadow of Death)
```cpp
SOD = 0x1c  // 28 (十进制)
```
阴影之城版本的地图格式。完整的游戏版本。

### CHR (Chronicles)
```cpp
CHR = 0x1d  // 29 (十进制)
```
地下城英雄版本的地图格式。地下城英雄扩展包。

### HOTA (Horn of the Abyss)
```cpp
HOTA = 0x20  // 32 (十进制)
```
深渊号角版本的地图格式。非官方扩展包。

### WOG (Wake of Gods)
```cpp
WOG = 0x33   // 51 (十进制)
```
众神苏醒版本的地图格式。另一个非官方扩展包。

### VCMI
```cpp
VCMI = 0x64  // 100 (十进制)
```
VCMI 原生地图格式。用于 VCMI 特定的增强功能。

## 版本历史

### 官方版本
- **ROE**: Heroes 3 基础游戏
- **AB**: 第一个扩展包，增加了地下城和城堡派系
- **SOD**: 完整版，包含所有官方内容

### 非官方扩展
- **CHR**: 地下城英雄 - 专注于地下城派系的扩展
- **HOTA**: 深渊号角 - 流行的非官方扩展，增加了新派系和游戏机制
- **WOG**: 众神苏醒 - 另一个非官方扩展

### VCMI 原生
- **VCMI**: VCMI 专用的格式，支持额外的游戏特性和改进

## 格式检测

地图格式通常通过文件头部的魔数 (magic number) 来识别：

- ROE: 0x0e (14)
- AB: 0x15 (21)
- SOD: 0x1c (28)
- CHR: 0x1d (29)
- HOTA: 0x20 (32)
- WOG: 0x33 (51)
- VCMI: 0x64 (100)

## 使用场景

`EMapFormat` 枚举用于：

1. **地图加载**: 根据格式选择合适的加载器
2. **兼容性检查**: 验证地图元素在目标版本中的可用性
3. **格式转换**: 在不同版本之间转换地图
4. **功能限制**: 根据版本限制某些游戏特性

## 使用示例

```cpp
// 检查地图格式
EMapFormat format = detectMapFormat(fileData);
switch (format) {
    case EMapFormat::ROE:
        // 处理ROE格式地图
        break;
    case EMapFormat::SOD:
        // 处理SOD格式地图
        break;
    case EMapFormat::VCMI:
        // 处理VCMI原生格式地图
        break;
    default:
        // 无效或不支持的格式
        break;
}
```

## 相关类

- `MapFeaturesH3M`: 地图格式特性定义
- `CMapLoader`: 地图加载器类
- `CMapService`: 地图服务类