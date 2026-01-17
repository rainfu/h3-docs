<!-- 来源: E:\develop\heroes\vcmi\lib\ScriptHandler.h -->
# ScriptHandler头文件

ScriptHandler头文件定义了VCMI中脚本处理的类，仅在启用脚本功能时有效。

## scripting命名空间

### 类型定义
- `using ModulePtr = std::shared_ptr<Module>`: 模块智能指针
- `using ScriptPtr = std::shared_ptr<ScriptImpl>`: 脚本实现智能指针
- `using ScriptMap = std::map<std::string, ScriptPtr>`: 脚本映射

## ScriptImpl类

### 类定义
```cpp
class DLL_LINKAGE ScriptImpl : public Script
```

### 枚举
```cpp
enum class Implements
```
- `ANYTHING`: 任何实现
- `BATTLE_EFFECT`: 战斗效果

### 主要属性
- `Implements implements`: 实现类型
- `std::string identifier`: 标识符
- `std::string sourcePath`: 源文件路径
- `std::string sourceText`: 源文本
- `std::string code`: 编译后代码
- `ModulePtr host`: 宿主模块

### 构造函数和析构函数
- `ScriptImpl(const ScriptHandler * owner_)`: 构造函数
- `virtual ~ScriptImpl()`: 虚析构函数

### 主要方法
- `void compile(vstd::CLoggerBase * logger)`: 编译脚本
- `void serializeJson(vstd::CLoggerBase * logger, JsonSerializeFormat & handler)`: JSON序列化
- `void serializeJsonState(JsonSerializeFormat & handler)`: 序列化状态
- `std::shared_ptr<Context> createContext(const Environment * env) const override`: 创建上下文
- `const std::string & getName() const override`: 获取名称
- `const std::string & getSource() const override`: 获取源代码
- `void performRegistration(Services * services) const`: 执行注册

### 私有方法
- `void resolveHost()`: 解析宿主

## PoolImpl类

### 类定义
```cpp
class DLL_LINKAGE PoolImpl : public Pool
```

### 构造函数
- `PoolImpl(const Environment * ENV)`: 构造环境池
- `PoolImpl(const Environment * ENV, ServerCallback * SRV)`: 构造带服务器回调的环境池

### 主要方法
- `std::shared_ptr<Context> getContext(const Script * script) override`: 获取脚本上下文
- `void serializeState(const bool saving, JsonNode & data) override`: 序列化状态

### 私有成员
- `std::map<const Script *, std::shared_ptr<Context>> cache`: 上下文缓存
- `JsonNode state`: 状态数据
- `const Environment * env`: 环境指针
- `ServerCallback * srv`: 服务器回调指针

## ScriptHandler类

### 类定义
```cpp
class DLL_LINKAGE ScriptHandler : public IHandlerBase, public Service
```

### 构造函数和析构函数
- `ScriptHandler()`: 构造函数
- `virtual ~ScriptHandler()`: 虚析构函数

### 主要属性
- `ScriptMap objects`: 脚本对象映射
- `ModulePtr erm`: ERM模块
- `ModulePtr lua`: Lua模块

### 主要方法
- `const Script * resolveScript(const std::string & name) const`: 解析脚本
- `std::vector<JsonNode> loadLegacyData() override`: 加载遗留数据
- `ScriptPtr loadFromJson(vstd::CLoggerBase * logger, const std::string & scope, const JsonNode & json, const std::string & identifier) const`: 从JSON加载脚本
- `void loadObject(std::string scope, std::string name, const JsonNode & data) override`: 加载对象
- `void loadObject(std::string scope, std::string name, const JsonNode & data, size_t index) override`: 加载带索引的对象
- `void performRegistration(Services * services) const override`: 执行注册
- `void run(std::shared_ptr<Pool> pool) const override`: 运行脚本池

### 序列化支持
- `template <typename Handler> void serialize(Handler & h)`: 序列化支持

### 私有方法
- `void loadState(const JsonNode & state)`: 加载状态
- `void saveState(JsonNode & state)`: 保存状态

## 编译条件

- 仅在`SCRIPTING_ENABLED`定义时有效
- 需要包含`<vcmi/scripting/Service.h>`头文件

## 设计特点

- 支持多种脚本语言（ERM、Lua）
- 提供脚本编译和执行环境
- 支持上下文缓存和状态序列化
- 实现服务接口用于注册和运行