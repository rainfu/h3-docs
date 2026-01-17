<!-- 来源: E:\develop\heroes\vcmi\lib\GameSettings.h -->
# GameSettings类

GameSettings类管理VCMI中的游戏设置，支持基础设置和覆盖设置的组合。

## 类定义
```cpp
class DLL_LINKAGE GameSettings final : public IGameSettings, boost::noncopyable
```

## 嵌套结构体

### SettingOption
```cpp
struct SettingOption
```
设置选项结构体。

**成员:**
- `EGameSettings setting`: 设置枚举值
- `std::string group`: 设置组名
- `std::string key`: 设置键名

## 静态成员

### OPTIONS_COUNT
```cpp
static constexpr int32_t OPTIONS_COUNT = static_cast<int32_t>(EGameSettings::OPTIONS_COUNT);
```
选项总数。

### settingProperties
```cpp
static const std::vector<SettingOption> settingProperties;
```
设置属性列表。

## 构造函数和析构函数
- `GameSettings()`: 构造函数
- `~GameSettings()`: 析构函数

## 主要方法

### 加载设置
- `void loadBase(const JsonNode & input)`: 加载基础设置
- `void addOverride(EGameSettings option, const JsonNode & input)`: 添加覆盖设置
- `void loadOverrides(const JsonNode &)`: 从JSON加载所有覆盖设置

### 获取设置
- `JsonNode getFullConfig() const override`: 获取完整配置
- `const JsonNode & getValue(EGameSettings option) const override`: 获取指定设置的值

### 序列化
- `template<typename Handler> void serialize(Handler & h)`: 序列化支持

## 私有方法
- `JsonNode getAllOverrides() const`: 获取所有覆盖设置的JSON节点

## 私有成员

### 设置存储
- `std::array<JsonNode, OPTIONS_COUNT> baseSettings`: 基础设置
- `std::array<JsonNode, OPTIONS_COUNT> overridenSettings`: 覆盖设置
- `std::array<JsonNode, OPTIONS_COUNT> actualSettings`: 实际设置（基础+覆盖的组合）

## 设计特点

- 支持多层设置覆盖（基础设置 + 地图覆盖 + RMG模板覆盖）
- 提供统一的设置访问接口
- 支持序列化以便保存游戏状态
- 使用数组提供快速访问