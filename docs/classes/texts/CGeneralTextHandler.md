# CGeneralTextHandler

## 概述

`CGeneralTextHandler` 是VCMI的文本处理核心类，负责管理游戏中的所有文本数据。它继承自 `TextLocalizationContainer`，提供了对游戏文本、本地化字符串和遗留格式文本的统一访问接口。

## 继承关系

```cpp
TextLocalizationContainer
└── CGeneralTextHandler
```

## 主要功能

CGeneralTextHandler 提供了以下核心功能：

1. **文本数据管理**: 存储和管理所有游戏文本
2. **遗留兼容**: 支持原版Heroes III的文本格式
3. **本地化支持**: 处理多语言文本和编码转换
4. **文本容器**: 提供各种预定义文本集合的访问
5. **语言检测**: 自动检测游戏安装的语言和编码

## 核心组件

### 遗留文本容器

#### LegacyTextContainer
```cpp
class LegacyTextContainer
{
    std::string operator [](size_t index) const;
};
```
- **功能**: 提供与旧代码兼容的文本访问API
- **用法**: `container[index]` 返回指定索引的文本字符串

#### LegacyHelpContainer
```cpp
class LegacyHelpContainer
{
    std::pair<std::string, std::string> operator[](size_t index) const;
};
```
- **功能**: 提供帮助文本访问，包含标题和内容
- **返回值**: pair<标题, 内容>

### 预定义文本集合

#### 基础文本
- **allTexts**: 所有游戏文本
- **arraytxt**: 数组文本
- **jktexts**: JK文本（可能用于调试）
- **heroscrn**: 英雄屏幕文本
- **overview**: 王国概览窗口文本

#### 颜色和时间
- **capColors**: 玩家颜色名称（首字母大写）
- **turnDurations**: 回合持续时间文本

#### 城镇相关
- **tcommands**: 城镇屏幕文本
- **hcommands**: 城镇大厅屏幕文本
- **fcommands**: 堡垒屏幕文本
- **tavernInfo**: 酒馆信息文本

#### 帮助系统
- **zelp**: 帮助文本容器

#### 地图对象
- **advobtxt**: 冒险地图对象文本
- **restypes**: 资源类型名称
- **seerEmpty**: 先知空文本
- **seerNames**: 先知名称
- **tentColors**: 帐篷颜色

#### 技能系统
- **levels**: 技能等级文本
- **primarySkillNames**: 主属性技能名称

## 核心方法

### 文本查询

#### findStringsWithPrefix
```cpp
std::vector<std::string> findStringsWithPrefix(const std::string & prefix);
```
- **参数**: `prefix` - 字符串前缀
- **返回值**: 所有以指定前缀开头的字符串列表
- **功能**: 查找具有特定前缀的所有文本

#### pluralText
```cpp
int32_t pluralText(int32_t textIndex, int32_t count) const;
```
- **参数**:
  - `textIndex`: 基础文本索引
  - `count`: 数量
- **返回值**: 对应的复数形式文本索引
- **功能**: 根据数量返回正确的复数文本

### 语言和编码检测

#### detectInstallParameters (静态)
```cpp
static void detectInstallParameters();
```
- **功能**: 检测Heroes III文件的编码和语言设置

#### getPreferredLanguage (静态)
```cpp
static std::string getPreferredLanguage();
```
- **返回值**: 用户偏好的语言名称
- **功能**: 获取用户设置的首选语言

#### getInstalledLanguage (静态)
```cpp
static std::string getInstalledLanguage();
```
- **返回值**: Heroes III文本文件的语言
- **功能**: 获取安装的游戏语言

#### getInstalledEncoding (静态)
```cpp
static std::string getInstalledEncoding();
```
- **返回值**: Heroes III文本文件的编码
- **功能**: 获取安装的游戏文本编码

### 内部方法

#### readToVector
```cpp
void readToVector(const std::string & sourceID, const std::string & sourceName);
```
- **功能**: 从指定源读取文本数据到向量

## 使用场景

### 访问预定义文本
```cpp
// 获取全局文本处理器
const auto& textHandler = LIBRARY->generaltexth;

// 获取玩家颜色名称
std::string redColor = textHandler.capColors[0]; // "Red"

// 获取主属性技能名称
std::string attackName = textHandler.primarySkillNames[0]; // "Attack"
```

### 查找相关文本
```cpp
// 查找所有英雄相关的文本
auto heroTexts = textHandler.findStringsWithPrefix("hero");

// 查找技能相关的文本
auto skillTexts = textHandler.findStringsWithPrefix("skill");
```

### 处理复数形式
```cpp
// 获取正确的复数文本
int textIndex = textHandler.pluralText(baseIndex, itemCount);
std::string pluralText = textHandler.allTexts[textIndex];
```

### 访问帮助文本
```cpp
// 获取帮助文本（标题和内容）
auto [title, content] = textHandler.zelp[helpIndex];
```

### 语言设置
```cpp
// 检测安装参数
CGeneralTextHandler::detectInstallParameters();

// 获取语言信息
std::string preferredLang = CGeneralTextHandler::getPreferredLanguage();
std::string installedLang = CGeneralTextHandler::getInstalledLanguage();
std::string encoding = CGeneralTextHandler::getInstalledEncoding();
```

## 设计意图

CGeneralTextHandler 的设计目的是为了：

1. **向后兼容**: 保持与原版Heroes III文本格式的兼容性
2. **统一管理**: 集中管理所有游戏文本资源
3. **本地化支持**: 支持多语言和字符编码转换
4. **性能优化**: 预加载和缓存常用文本
5. **扩展性**: 支持模组添加自定义文本
6. **类型安全**: 通过专用容器类提供类型安全访问

## 注意事项

- **单例模式**: 通常作为全局单例使用
- **线程安全**: 文本访问通常是线程安全的
- **内存管理**: 文本数据在程序启动时加载
- **编码处理**: 自动处理不同字符编码的转换
- **索引有效性**: 使用前应验证文本索引的有效性

这个类是VCMI本地化系统的核心，为游戏提供了完整的文本处理和多语言支持功能。