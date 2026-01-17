<!-- 来源: E:\develop\heroes\vcmi\lib\CConfigHandler.h -->
# CConfigHandler头文件

CConfigHandler头文件定义了VCMI中配置管理的相关类，包括设置存储、设置监听器和设置访问器。

## SettingsStorage类

### 类定义
```cpp
class DLL_LINKAGE SettingsStorage
```

### 构造函数和析构函数
- `SettingsStorage()`: 构造函数，初始化配置结构
- `~SettingsStorage()`: 析构函数
- `void init(const std::string & dataFilename, const std::string & schema)`: 初始化配置

### 主要方法
- `const JsonNode & operator[](const std::string & value) const`: 读取访问，类似JsonNode::operator[]
- `const JsonNode & toJsonNode() const`: 转换为JsonNode

### 公共成员
- `const NodeAccessor<Settings> write`: 获取写访问权限
- `const NodeAccessor<SettingsListener> listen`: 获取监听器访问权限

### 私有方法
- `JsonNode & getNode(const std::vector<std::string> & path)`: 获取指定路径的节点
- `void invalidateNode(const std::vector<std::string> &changedPath)`: 使节点无效并通知监听器
- `Settings get(const std::vector<std::string> & path)`: 获取设置

### 私有成员
- `std::set<SettingsListener*> listeners`: 监听器集合
- `JsonNode config`: 配置数据
- `std::string dataFilename`: 数据文件名
- `std::string schema`: 模式

## NodeAccessor模板类

### 类定义
```cpp
template<typename Accessor>
struct DLL_LINKAGE NodeAccessor
```

### 构造函数
- `NodeAccessor(SettingsStorage & _parent, std::vector<std::string> _path)`: 构造节点访问器

### 运算符重载
- `NodeAccessor<Accessor> operator[](const std::string & nextNode) const`: 访问子节点
- `NodeAccessor<Accessor> operator()(std::vector<std::string> _path) const`: 直接设置路径
- `operator Accessor() const`: 转换为访问器类型

## SettingsListener类

### 类定义
```cpp
class DLL_LINKAGE SettingsListener
```

### 构造函数和析构函数
- `SettingsListener(const SettingsListener &sl)`: 拷贝构造函数
- `~SettingsListener()`: 析构函数

### 主要方法
- `void operator()(std::function<void(const JsonNode&)> _callback)`: 设置回调函数

### 私有方法
- `void nodeInvalidated(const std::vector<std::string> & changedPath)`: 节点无效时执行回调
- `void terminate()`: 终止监听器

### 私有成员
- `SettingsStorage &parent`: 父设置存储
- `std::vector<std::string> path`: 节点路径
- `std::function<void(const JsonNode&)> callback`: 回调函数
- `bool wasTerminated`: 是否已终止

## Settings类

### 类定义
```cpp
class DLL_LINKAGE Settings
```

### 构造函数和析构函数
- `Settings(SettingsStorage &_parent, const std::vector<std::string> &_path)`: 构造函数
- `~Settings()`: 析构函数，自动保存修改的配置

### 运算符重载
- `JsonNode* operator->()`: 获取节点指针
- `const JsonNode* operator->() const`: 获取常量节点指针
- `JsonNode & operator[](const std::string & value)`: 访问子节点
- `const JsonNode & operator[](const std::string & value) const`: 访问常量子节点

### 私有成员
- `SettingsStorage &parent`: 父设置存储
- `std::vector<std::string> path`: 节点路径
- `JsonNode &node`: 节点引用
- `JsonNode copy`: 节点副本

## 全局实例

- `extern DLL_LINKAGE SettingsStorage settings`: 主设置存储
- `extern DLL_LINKAGE SettingsStorage persistentStorage`: 持久化存储
- `extern DLL_LINKAGE SettingsStorage keyBindingsConfig`: 按键绑定配置